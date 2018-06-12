/*global MATH*/
/*global TEA*/

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame || window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000/60);
    };
})();

var GAME = GAME || {};
GAME.mainLoop = function(canvas, ctx) {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = 'rgb(234, 248, 109)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    var delta = (Date.now() - GAME.lastCalledTime)/1000;
    GAME.lastCalledTime = Date.now();
    
    GAME.time += delta;
    
    var sin, cos;
    var rot1, rot2, rot3;
    var angle = -2 * delta;
    sin = Math.sin(angle);
    cos = Math.cos(angle);
    rot1 = new MATH.Matrix(
        [cos, 0, -sin], 
        [0, 1, 0],
        [sin, 0, cos]);
        
    angle = 0.05 * Math.sin(GAME.time);
    sin = Math.sin(angle);
    cos = Math.cos(angle);
    rot2 = new MATH.Matrix(
        [1, 0, 0],
        [0, cos, -sin],
        [0, sin, cos]);
    
    var movement = rot1.matMult(rot2);
    
    //GAME.tetra.translate([0, 0, -5]);
    //GAME.tetra.globalTransform(rotation);
    //GAME.tetra.translate([0, 0, 5]);
    
    angle = 0.5 * delta;
    sin = Math.sin(angle);
    cos = Math.cos(angle);
    rot3 = new MATH.Matrix(
        [cos, 0, -sin], 
        [0, 1, 0],
        [sin, 0, cos]);
        
    
    GAME.cube.localTransform(rot1);
    GAME.tetra.localTransform(rot3);
    GAME.teapot.localTransform(movement);
    
    
    //GAME.tetra.draw(canvas, ctx);
    //GAME.cube.draw(canvas, ctx);
    GAME.teapot.draw(canvas, ctx);
    
    
    
    // ctx.fillStyle = "white";
    // ctx.font = "30px Arial";
    // ctx.fillText(String(1/delta).slice(0, 5),10,50);
    
    window.requestAnimFrame(function() {
        GAME.mainLoop(canvas, ctx);
    });
};

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

GAME.time = 0;

GAME.lastCalledTime = Date.now();

GAME.mainLoop(canvas, ctx);