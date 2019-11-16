AFRAME.registerComponent("track", {
  
  schema: {
    pipes: {type: 'int', default: 5},
    radius: {type: 'number', default: 50},
    speed: {type: 'number', default: 0.1}
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
    
    this.playerDegrees = 10;
    this.player = document.createElement("a-entity");
    this.player.setAttribute("player", "");
    this.player.setAttribute("position", this.degreesToPosition(this.playerDegrees));
    this.player.setAttribute("rotation", this.degreesToPlayerRotation(this.playerDegrees));
    this.el.appendChild(this.player);
  },
  
  tick: function (time) {
    this.playerDegrees += this.data.speed;
    let position = this.degreesToPosition(this.playerDegrees);
    this.player.object3D.position.set(position.x, position.y, position.z);
    let rotation = this.degreesToPlayerRotation(this.playerDegrees);
    this.player.object3D.rotation.y = THREE.Math.degToRad(rotation.y);
  },
  
});