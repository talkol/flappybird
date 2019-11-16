AFRAME.registerComponent("player", {

  init: function() {
    let camera = document.createElement("a-entity");
    camera.setAttribute("camera", "");
    camera.setAttribute("look-controls", "");
    camera.setAttribute("wasd-controls", "");
    camera.setAttribute("position", {y:1.6});
    this.el.appendChild(camera);
  }
  
});