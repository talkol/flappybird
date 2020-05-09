AFRAME.registerComponent("track", {

  schema: {
    pipes: {type: 'int', default: 10},
    radius: {type: 'number', default: 50},
    speed: {type: 'number', default: 0.1},
    jump: {type: 'number', default: 0.1},
    gravity: {type: 'number', default: -0.003},
    gap: {type: 'number', default: 3}
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
    this.pipes = [];
    for (let i=0; i<this.data.pipes; i++) {
      let degrees = 360/this.data.pipes*i;
      let height = 8; // of the bottom pipe
      if (i > 0) {
        if (i % 2 == 0) height = Math.floor((Math.random() * 7) + 2); // rand from 2 to 8
        else height = Math.floor((Math.random() * 8) + 8); // rand from 8 to 15
      }
      let pipe = document.createElement("a-entity");
      pipe.setAttribute("pipe", {height, gap: this.data.gap});
      pipe.setAttribute("position", this.degreesToPosition(degrees));
      this.el.appendChild(pipe);
      this.pipes[i] = {degrees, height};
    }

    this.scoreCurrent = 0;
    this.scoreBest = 0;

    this.player = document.createElement("a-entity");
    this.player.setAttribute("player", "");
    this.el.appendChild(this.player);
    this.setState("reset");

    this.dialog = document.createElement("a-entity");
    this.dialog.setAttribute("dialog", "");
    let position = this.degreesToPosition(this.playerDegrees);
    position.x -= 5;
    position.y = 1.6;
    position.z -= 0.8;
    this.dialog.setAttribute("position", position);
    this.dialog.setAttribute("rotation", this.degreesToPlayerRotation(this.playerDegrees));
    this.dialog.setAttribute("scale", {x:5, y:5, z:5});
    this.el.appendChild(this.dialog);

    let button = document.createElement("a-entity");
    button.setAttribute("button", "");
    this.el.appendChild(button);
    let self = this;
    this.el.addEventListener("click", function (evt) {
      self.clicked(evt);
    });
  },

  setState: function (state) {
    this.state = state;
    if (state == "stopped") {
      this.dialog.components.dialog.score.setAttribute("value", this.scoreCurrent);
      this.dialog.components.dialog.best.setAttribute("value", this.scoreBest);
      this.dialog.setAttribute("visible", true);
    } else if (state == "reset") {
      this.playerVerticalSpeed = 0;
      this.nextPipe = 1;
      this.playerDegrees = 10;
      this.player.setAttribute("position", this.degreesToPosition(this.playerDegrees));
      this.player.object3D.position.y = 0;
      this.player.setAttribute("rotation", this.degreesToPlayerRotation(this.playerDegrees));
    } else {
      this.dialog.setAttribute("visible", false);
      if (this.scoreCurrent > this.scoreBest) this.scoreBest = this.scoreCurrent;
      this.scoreCurrent = 0;
    }
  },

  clicked: function (evt) {
    if (this.state == "stopped") {
      audioPlayer.components['sound__menu'].playSound();
      this.setState("reset");
    } else if (this.state == "reset") {
      audioPlayer.components['sound__menu'].playSound();
      this.setState("flying");
    } else {
      audioPlayer.components['sound__flap'].playSound();
      this.playerVerticalSpeed = this.data.jump;
    }
  },

  tick: function (time) {
    if (this.state == "stopped") return;
    if (this.state == "reset") return;
    if (this.collides()) {
      audioPlayer.components['sound__hit'].playSound();
      this.setState("stopped");
      return;
    }

    this.playerVerticalSpeed += this.data.gravity;
    this.player.object3D.position.y += this.playerVerticalSpeed;

    this.playerDegrees += this.data.speed;

    let position = this.degreesToPosition(this.playerDegrees);
    this.player.object3D.position.x = position.x;
    this.player.object3D.position.z = position.z;

    let rotation = this.degreesToPlayerRotation(this.playerDegrees);
    this.player.object3D.rotation.y = THREE.Math.degToRad(rotation.y);
  },

  collides: function () {
    let cameraPosition = new THREE.Vector3();
    this.player.components.player.camera.object3D.getWorldPosition(cameraPosition);

    if (this.player.object3D.position.y < FLOOR_HEIGHT) {
      return true;
    }

    if (this.playerDegrees > this.pipes[this.nextPipe].degrees + 2) {
      if (cameraPosition.y < this.data.gap + DEFAULT_HEIGHT){
        this.scoreCurrent++;
        audioPlayer.components['sound__score'].playSound();
      }
      this.nextPipe++;
      if (this.nextPipe >= this.pipes.length) {
        this.nextPipe = 0;
        this.playerDegrees -= 360;
      }
      return false;
    }

    if (this.playerDegrees > this.pipes[this.nextPipe].degrees - 2) {
      if (cameraPosition.y > this.data.gap + DEFAULT_HEIGHT) return false;
      if (cameraPosition.y > FLOOR_HEIGHT + this.pipes[this.nextPipe].height + this.data.gap) return true;
      if (cameraPosition.y > FLOOR_HEIGHT + this.pipes[this.nextPipe].height) return false;
      return true;
    }

    return false;
  },

});
