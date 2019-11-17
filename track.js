AFRAME.registerComponent("track", {
  
  schema: {
    pipes: {type: 'int', default: 10},
    radius: {type: 'number', default: 50},
    speed: {type: 'number', default: 0.1},
    jump: {type: 'number', default: 0.1},
    gravity: {type: 'number', default: -0.003}
  },

  degreesToPosition: function(degrees) {
    let radians = THREE.Math.degToRad(degrees);
    let z = Math.cos(radians) * this.data.radius;
    let x = -1 * Math.sin(radians) * this.data.radius;
    return {x, y:0, z};
  },
  
  degreesToPlayerRotation: function(degrees) {
    return {y: 90-degrees}
  },
  
  init: function() {
    for (let i=0; i<this.data.pipes; i++) {
      let degrees = 360/this.data.pipes*i;
      let pipe = document.createElement("a-entity");
      pipe.setAttribute("pipe", "");
      pipe.setAttribute("position", this.degreesToPosition(degrees));
      this.el.appendChild(pipe);
    }
    
    this.jumpTicksLeft = 0;
    this.playerVerticalSpeed = 0;
    this.playerDegrees = 10;
    this.player = document.createElement("a-entity");
    this.player.setAttribute("player", "");
    this.player.setAttribute("position", this.degreesToPosition(this.playerDegrees));
    this.player.setAttribute("rotation", this.degreesToPlayerRotation(this.playerDegrees));
    this.el.appendChild(this.player);
    
    let button = document.createElement("a-entity");
    button.setAttribute("button", "");
    this.el.appendChild(button);
    let self = this;
    this.el.addEventListener("click", function (evt) {
      self.clicked(evt);
    });
  },
  
  clicked: function (evt) {
    this.playerVerticalSpeed = this.data.jump;
  },
  
  tick: function (time) {
    this.playerVerticalSpeed += this.data.gravity;
    this.player.object3D.position.y += this.playerVerticalSpeed;
    if (this.player.object3D.position.y < FLOOR_HEIGHT) {
      this.player.object3D.position.y = FLOOR_HEIGHT;
    }
    
    this.playerDegrees += this.data.speed;
    let position = this.degreesToPosition(this.playerDegrees);
    this.player.object3D.position.x = position.x;
    this.player.object3D.position.z = position.z;
    
    let rotation = this.degreesToPlayerRotation(this.playerDegrees);
    this.player.object3D.rotation.y = THREE.Math.degToRad(rotation.y);
  },
  
});