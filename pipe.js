const FLOOR_HEIGHT = -8;
const DEFAULT_HEIGHT = 8;

AFRAME.registerComponent("pipe", {
  
  schema: {
    height: {type: 'int', default: DEFAULT_HEIGHT}, // of the bottom pipe
    gap: {type: 'number', default: 3}
  },
  
  init: function() {
    
    let bot = document.createElement("a-entity");
    let top = document.createElement("a-entity");
    
    let bBox1 = document.createElement("a-box");
    let bBox2 = document.createElement("a-box");
    let bRing1 = document.createElement("a-ring");
    let bRing2 = document.createElement("a-ring");
    let bCyl1 = document.createElement("a-cylinder");
    let bCyl2 = document.createElement("a-cylinder");
    
    let tBox1 = document.createElement("a-box");
    let tBox2 = document.createElement("a-box");
    let tRing1 = document.createElement("a-ring");
    let tRing2 = document.createElement("a-ring");
    let tCyl1 = document.createElement("a-cylinder");
    let tCyl2 = document.createElement("a-cylinder");
    
    bBox1.setAttribute("color", "#746038");
    bBox2.setAttribute("color", "#746038");
    bRing1.setAttribute("color", "#7cae44");
    bRing2.setAttribute("color", "#7cae44");
    bCyl1.setAttribute("color", "#85bc48");
    bCyl2.setAttribute("color", "#7cae44");
    
    tBox1.setAttribute("color", "#e9fcdb");
    tBox2.setAttribute("color", "#e9fcdb");
    tRing1.setAttribute("color", "#7cae44");
    tRing2.setAttribute("color", "#7cae44");
    tCyl1.setAttribute("color", "#85bc48");
    tCyl2.setAttribute("color", "#7cae44");
    
    const BOT_HEIGHT = this.data.height;
    bCyl1.setAttribute("height", BOT_HEIGHT);
    bCyl2.setAttribute("height", 1);
    bBox1.setAttribute("position", {y:FLOOR_HEIGHT+0.1});
    bBox2.setAttribute("position", {y:FLOOR_HEIGHT+0.1});
    bRing1.setAttribute("position", {y:FLOOR_HEIGHT+BOT_HEIGHT});
    bRing2.setAttribute("position", {y:FLOOR_HEIGHT+BOT_HEIGHT-1});
    bCyl1.setAttribute("position", {y:FLOOR_HEIGHT+BOT_HEIGHT/2});
    bCyl2.setAttribute("position", {y:FLOOR_HEIGHT+BOT_HEIGHT-0.5});
    bBox1.setAttribute("depth", 0.2);
    bBox2.setAttribute("depth", 0.2);
    
    const TOP_HEIGHT = 16 - this.data.height;
    tCyl1.setAttribute("height", TOP_HEIGHT);
    tCyl2.setAttribute("height", 1);
    tBox1.setAttribute("position", {y:FLOOR_HEIGHT+0.1});
    tBox2.setAttribute("position", {y:FLOOR_HEIGHT+0.1});
    tRing1.setAttribute("position", {y:FLOOR_HEIGHT+TOP_HEIGHT});
    tRing2.setAttribute("position", {y:FLOOR_HEIGHT+TOP_HEIGHT-1});
    tCyl1.setAttribute("position", {y:FLOOR_HEIGHT+TOP_HEIGHT/2});
    tCyl2.setAttribute("position", {y:FLOOR_HEIGHT+TOP_HEIGHT-0.5});
    tBox1.setAttribute("depth", 0.2);
    tBox2.setAttribute("depth", 0.2);
    
    bBox1.setAttribute("width", 2.5);
    bBox1.setAttribute("height", 2.5);
    bBox2.setAttribute("width", 2.5);
    bBox2.setAttribute("height", 2.5);
    bRing1.setAttribute("radius-inner", 1.19);
    bRing1.setAttribute("radius-outer", 1.35);
    bRing2.setAttribute("radius-inner", 1.19);
    bRing2.setAttribute("radius-outer", 1.35);
    bCyl1.setAttribute("radius", 1.2);
    bCyl2.setAttribute("radius", 1.34);
    bBox1.setAttribute("rotation", {x:-90, y:0, z:0});
    bBox2.setAttribute("rotation", {x:-90, y:-45, z:0});
    bRing1.setAttribute("rotation", {x:-90, y:0, z:0});
    bRing2.setAttribute("rotation", {x:-270, y:-180, z:0});
    bCyl1.setAttribute("material", {side:"double"});
    bCyl1.setAttribute("open-ended", true);
    bCyl2.setAttribute("open-ended", true);
    
    tBox1.setAttribute("width", 2.5);
    tBox1.setAttribute("height", 2.5);
    tBox2.setAttribute("width", 2.5);
    tBox2.setAttribute("height", 2.5);
    tRing1.setAttribute("radius-inner", 1.19);
    tRing1.setAttribute("radius-outer", 1.35);
    tRing2.setAttribute("radius-inner", 1.19);
    tRing2.setAttribute("radius-outer", 1.35);
    tCyl1.setAttribute("radius", 1.2);
    tCyl2.setAttribute("radius", 1.34);
    tBox1.setAttribute("rotation", {x:-90, y:0, z:0});
    tBox2.setAttribute("rotation", {x:-90, y:-45, z:0});
    tRing1.setAttribute("rotation", {x:-90, y:0, z:0});
    tRing2.setAttribute("rotation", {x:-270, y:-180, z:0});
    tCyl1.setAttribute("material", {side:"double"});
    tCyl1.setAttribute("open-ended", true);
    tCyl2.setAttribute("open-ended", true);
    
    top.setAttribute("rotation", {x:-180, y:-180, z:0});
    top.setAttribute("position", {x:0, y:this.data.gap, z:0});
    
    bot.appendChild(bBox1);
    bot.appendChild(bBox2);
    bot.appendChild(bRing1);
    bot.appendChild(bRing2);
    bot.appendChild(bCyl1);
    bot.appendChild(bCyl2);
    
    top.appendChild(tBox1);
    top.appendChild(tBox2);
    top.appendChild(tRing1);
    top.appendChild(tRing2);
    top.appendChild(tCyl1);
    top.appendChild(tCyl2);
    
    this.el.appendChild(bot);
    this.el.appendChild(top);
    
  }
  
});