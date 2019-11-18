AFRAME.registerComponent("dialog", {
  
  init: function() {    
    let background = document.createElement("a-plane");
    background.setAttribute("color", "#ded895");
    background.setAttribute("width", 0.7);
    background.setAttribute("height", 0.5);
    background.setAttribute("opacity", 0.93);
    background.setAttribute("material", {shader: "flat"});
    this.el.appendChild(background);
    
    let cta = document.createElement("a-text");
    cta.setAttribute("value", "Click to flap.");
    cta.setAttribute("align", "center");
    cta.setAttribute("width", 1.5);
    cta.setAttribute("font", "aileronsemibold");
    cta.setAttribute("color", "#000");
    cta.setAttribute("position", {y: 0.11})
    this.el.appendChild(cta);
    
    let tscore = document.createElement("a-text");
    tscore.setAttribute("value", "SCORE");
    tscore.setAttribute("align", "center");
    tscore.setAttribute("width", 0.8);
    tscore.setAttribute("font", "aileronsemibold");
    tscore.setAttribute("color", "#e86102");
    tscore.setAttribute("position", {x:-0.12, y: -0.02})
    this.el.appendChild(tscore);
    
    let tbest = document.createElement("a-text");
    tbest.setAttribute("value", "BEST");
    tbest.setAttribute("align", "center");
    tbest.setAttribute("width", 0.8);
    tbest.setAttribute("font", "aileronsemibold");
    tbest.setAttribute("color", "#e86102");
    tbest.setAttribute("position", {x:0.12, y: -0.02})
    this.el.appendChild(tbest);
    
    this.score = document.createElement("a-text");
    this.score.setAttribute("value", "0");
    this.score.setAttribute("align", "center");
    this.score.setAttribute("width", 4);
    this.score.setAttribute("font", "aileronsemibold");
    this.score.setAttribute("color", "#fff");
    this.score.setAttribute("position", {x:-0.11, y: -0.10})
    this.el.appendChild(this.score);
    
    this.best = document.createElement("a-text");
    this.best.setAttribute("value", "0");
    this.best.setAttribute("align", "center");
    this.best.setAttribute("width", 4);
    this.best.setAttribute("font", "aileronsemibold");
    this.best.setAttribute("color", "#fff");
    this.best.setAttribute("position", {x:0.13, y: -0.10})
    this.el.appendChild(this.best);
  }
  
});