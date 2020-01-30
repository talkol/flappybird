AFRAME.registerComponent("button", {

  init: function() {
    let el = this.el;
    
    window.addEventListener("keydown", function (evt) {
      if (evt.keyCode === 32) {
        el.emit("click", evt, true);  
      }
    });
    
    let right = document.createElement("a-entity");
    right.setAttribute("vive-controls", "hand:right; model:false;");
    right.setAttribute("oculus-touch-controls", "hand:right; model:false;");
    right.setAttribute("gearvr-controls", "hand:right; model:false;");
    right.setAttribute("windows-motion-controls", "hand:right; model:false;");
    right.addEventListener("triggerdown", function (evt) {
      el.emit("click", evt, true);  
    });
    right.addEventListener("bbuttondown", function (evt) {
      let scene = document.querySelector('a-scene');
      scene.exitVR();
    });
    this.el.appendChild(right);
    
    let left = document.createElement("a-entity");
    left.setAttribute("vive-controls", "hand:left; model:false;");
    left.setAttribute("oculus-touch-controls", "hand:left; model:false;");
    left.setAttribute("gearvr-controls", "hand:left; model:false;");
    left.setAttribute("windows-motion-controls", "hand:left; model:false;");
    left.addEventListener("triggerdown", function (evt) {
      el.emit("click", evt, true);  
    });
    this.el.appendChild(left);
  }
  
});