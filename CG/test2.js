var canvas;
var context;

window.onload = function() {
    canvas = document.getElementById("fillingCanvas");
    context = canvas.getContext('2d');
}

//设置矩形的属性
const RectX = 250;
const RectY = 100;
const MaxWidth = 100;
const MaxHeight = 150;
var width1 = 1;
var width2 = 1;
var height1 = 1;
var height2 = 1;

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}


function drawRectangle() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath()
    context.rect(RectX, RectY, MaxWidth, MaxHeight);
    context.strokeStyle = 'black'
    context.lineWidth = 1;
    context.stroke();
}

//生成随机着色点
var dotX = RectX; 
var dotY = RectY;

function createDot() {
    dotX = randomFromTo(RectX, RectX + MaxWidth);
    dotY = randomFromTo(RectY, RectY + MaxHeight);
}

function drawFrame() {
 
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(dotX, dotY);
    context.lineTo(dotX, dotY - height1);
    context.strokeStyle = 'red'
    context.lineWidth = 1;
    context.stroke();

    context.beginPath();
    context.moveTo(dotX, dotY);
    context.lineTo(dotX, dotY + height2);
    context.strokeStyle = 'red'
    context.lineWidth = 1;
    context.stroke();

    if(RectY + height1 < dotY) { height1 += 1 };
    if(dotY + height2 < RectY + MaxHeight) { height2 += 1 };


    if (height1 + height2 == MaxHeight) {
        context.beginPath();
        context.rect(dotX, RectY, width1, MaxHeight);
        context.fillStyle = 'red';
        context.fill();
        
        context.beginPath();
        context.moveTo(dotX, RectY);
        context.lineTo(dotX, RectY + MaxHeight);
        context.lineTo(dotX - width2, RectY + MaxHeight);
        context.lineTo(dotX - width2, RectY);
        context.lineTo(dotX, RectY);
        context.fillStyle = 'red';
        context.fill();

        if(width1 < (MaxWidth + RectX - dotX)) { width1 += 1; }
        if(width2 < (dotX - RectX)) { width2 += 1; }
    }
    context.beginPath()
    context.rect(RectX, RectY, MaxWidth, MaxHeight);
    context.strokeStyle = 'black'
    context.lineWidth = 1;
    context.stroke();

 

    if(width1 < (MaxWidth + RectX - dotX) || width2 < (dotX - RectX)) {
        setTimeout(drawFrame, 20);
    }
}

function clearCanvas() {
    // Remove all the images.
    width1 = 0;
    width2 = 0;
    height1 = 0;
    height2 = 0;
    // Clear the canvas 
     context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update the display.

}





// var rectangles = [];

// function drawRectangles() {
//     // Clear the canvas.
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     // Go through all the circles.
//     for(var i=0; i<rectangles.length; i++) {
//         var rectangle = rectangles[i];

//         // Draw the circle.
//         context.globalAlpha = 1;
//         context.strokeStyle = "black";
//         context.lineWidth = 1;
//         context.beginPath();
//         context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        
//         context.stroke(); 
//     }
// }

// //添加矩形
// function addRectangle() {
//     var x = 280;
//     var y = 180;
//     var width = 80;
//     var height = 60;

//     // 将属性值赋给圆
//     var rectangle = new Rectangle(x, y, width, height);
//     // 将此圆存储到圆的数组
//     rectangles.push(rectangle);
 
//     drawRectangles();
// }

// function clearCanvas() {
//     // Remove all the images.

//     rectangles = [];

//     // Clear the canvas 
//      context.clearRect(0, 0, canvas.width, canvas.height);
    
//     // Update the display.
//     drawRectangles();
// }

// function randomFromTo(from, to) {
//     return Math.floor(Math.random() * (to - from + 1) + from);
// }

// var dotX;
// var dotY;

// // 添加初始着色点
// function addDot() {
//     context.beginPath();
//     dotX = randomFromTo(rectangles[0].x, rectangles[0].x+rectangles[0].width);
//     dotY = randomFromTo(rectangles[0].y, rectangles[0].y+rectangles[0].height);
//     context.moveTo(dotX, dotY);
//     context.lineTo(dotX, dotY);
//     context.strokeStyle = 'red';
//     context.lineWidth = 1;
//     context.stroke();
// }

// function scanLines() {
//     context.beginPath();
//     context.moveTo(dotX, rectangles[0].y);
//     context.lineTo(dotX, rectangles[0].y + rectangles[0].height);
//     context.strokeStyle = 'red';
//     context.lineWidth = 1; 
//     context.stroke();
// }

// // 扫描上色
// function fillRectangle() {

//     while(dotX < rectangles[0].x + rectangles[0].width) {
//         setTimeout(scanLines(), 100);
//         dotX +=1;
//     }
// }