// 存储圆的属性
function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isSelected = false;
}

// 存储帆船的属性
/* 一个等腰的倒梯形，一个直角三角形桅杆
 * 先确定左上角的顶点(x, y)
 * 根据smallWidth, bigWidth, height, mast(桅杆）)来确定其它的点
 * 设定桅杆位于梯形大底边的终点，直角三角形的直角位于桅杆的1/3处，长度也为桅杆的1/3
 */
function Ship(x, y, smallWidth, bigWidth, height, mast) {
    this.x = x;
    this.y = y;
    this.smallWidth = smallWidth;
    this.bigWidth = bigWidth;
    this.height = height;
    this.mast = mast;

}


// 存储轿车的属性
/* 利用贝塞尔曲线绘制流线型
 * 先确定左上角的顶点(x, y)
 * 设汽车除流线外的长度为 a + b + a
 * 设汽车除去流线外的高度为 h
 */
function Car(x, y, a, b, h) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.b = b;
    this.h = h;
}

// 存储三角形的属性
/* 确定一个三角形
 * (x1, y1)
 * (x2, y2)
 * (x3, y3)
 */
function Triangle(x1, y1, x2, y2, x3, y3, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.color = color;
}

// 存储所有三角形
var triangles = [];

// 存储所有汽车
var cars = [];

// 存储所有帆船
var ships = [];

// 存储所有圆
var circles = [];

var canvas;
var context;

// 加载绘图上下文
window.onload = function() {
    canvas = document.getElementById('drawingCanvas');
    context = canvas.getContext('2d');


    // addCircle();
    // addShip();    
    // addCar();
};

// 画出所有汽车
function drawCars() {
    context.clearRect(-canvas.width, -canvas.height, 3*canvas.width, 3*canvas.height);

    for(let i = 0; i < cars.length; i++) {
        let car = cars[i];
        context.globalAlpha = 0.85;
        context.beginPath();
        context.moveTo(car.x, car.y);
        context.lineTo(car.x + car.a, car.y);
        context.bezierCurveTo(car.x + car.a*1.5, car.y - car.a/2, car.x + car.a/2 + car.b,
            car.y - car.a/2, car.x + car.a + car.b, car.y);
        context.lineTo(car.x + car.a*2 + car.b, car.y);
        context.lineTo(car.x + car.a*2 + car.b, car.y +car.h);
        context.lineTo(car.x, car.y + car.h);
        context.bezierCurveTo(car.x - car.a/4, car.y + car.h*2/3, car.x - car.a/5,
            car.y + car.h/3, car.x, car.y);
        context.lineTo(car.x, car.y);
        context.fillStyle = 'red';
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.fill();
        context.stroke();
        
        context.beginPath();
        context.arc(car.x + car.a, car.y + car.h, car.h*0.75, 0, Math.PI);
        context.arc(car.x + car.a + car.b, car.y + car.h, car.h*0.75, 0, Math.PI);
        context.closePath();
        context.fillStyle = 'black';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.fill();
        context.stroke(); 

    }
}

// 画出所有圆
function drawCircles() {
    // Clear the canvas.
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // Go through all the circles.
    for(var i=0; i<circles.length; i++) {
        var circle = circles[i];

        // Draw the circle.
        context.globalAlpha = 0.85;
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
        context.fillStyle = circle.color;
        context.strokeStyle = "black";
        context.lineWidth = 1;
        
        context.fill();
        context.stroke(); 
    }
}

// 画出所有三角形
function drawTriangles() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < triangles.length; i++) {
        let triangle = triangles[i];

        context.globalAlpha = 0.85;
        context.beginPath();
        context.moveTo(triangle.x1, triangle.y1);
        context.lineTo(triangle.x2, triangle.y2);
        context.lineTo(triangle.x3, triangle.y3);
        context.lineTo(triangle.x1, triangle.y1);
        context.fillStyle = triangle.color;
        context.strokeStyle = 'black';
        context.lineWidth = 3;

        context.fill();
        context.stroke();
    }
}

function drawShips() {
    // Clear the canvas 
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < ships.length; i++) {
        var ship = ships[i];

       // Draw the ship.
      context.globalAlpha = 0.85;
      context.beginPath();
      context.moveTo(ship.x, ship.y);
      context.lineTo(ship.x + ship.bigWidth, ship.y);
      context.lineTo(ship.x + (ship.bigWidth + ship.smallWidth) / 2, ship.y + ship.height);
      context.lineTo(ship.x + (ship.bigWidth - ship.smallWidth) / 2, ship.y + ship.height);
      context.lineTo(ship.x, ship.y);
    
      context.fillStyle = 'brown';
      context.strokeStyle = 'black';
      context.lineWidth = 3;
      context.fill();
      context.stroke();

      context.beginPath();
      context.moveTo(ship.x + ship.bigWidth/2, ship.y);
      context.lineTo(ship.x + ship.bigWidth/2, ship.y - ship.mast);
      context.lineTo(ship.x + ship.bigWidth/2 - ship.mast/3, ship.y - ship.mast/3);
      context.lineTo(ship.x + ship.bigWidth/2, ship.y - ship.mast/3);

      context.fillStyle = 'rgb(230, 226, 193)';
      context.strokeStyle = 'black';
      context.lineWidth = 5;
      context.fill();
      context.stroke();

    }
}

// 绘制三角形
function addTriangle() {
    const x1 = 280;
    const y1 = 250;
    const x2 = 360;
    const y2 = 250;
    const x3 = 320;
    const y3 = 200;
    const color = 'orange';
    
    let triangle = new Triangle(x1, y1, x2, y2, x3, y3, color);
    triangles.push(triangle);
    drawTriangles();
}

function addTriangles(x1, y1, x2, y2, x3, y3, color) {
    let triangle = new Triangle(x1, y1, x2, y2, x3, y3, color);
    triangles.push(triangle);

    drawTriangles();
}

// 绘制汽车
function addCar() {
    var x = 300;
    var y = 200;
    var a = 20;
    var b = 50;
    var h = 10;

    var car = new Car(x, y, a, b, h);
    cars.push(car);

    drawCars();
}

// 绘制帆船
function addShip() {
    var x = 450;
    var y = 300;
    var smallWidth = 80;
    var bigWidth = 120;
    var height = 30;
    var mast = 80;

    // 将属性值赋给船
    var ship = new Ship(x, y, smallWidth, bigWidth, height, mast);
    // 将此圆存储到圆的数组
    ships.push(ship);
 
    drawShips();
}

//绘制圆
function addCircle() {
    var radius = 30;
    var x = 300;
    var y = 200;
    var color = 'purple';

    // 将属性值赋给圆
    var circle = new Circle(x, y, radius, color);
    // 将此圆存储到圆的数组
    circles.push(circle);
 
    drawCircles();
}

function addRandomCircle() {
    // Give the circle a random size and position.
    var radius = randomFromTo(10, 60);
    var x = randomFromTo(0, canvas.width);
    var y = randomFromTo(0, canvas.height);

    // Give the circle a random color.
    var colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
    var color = colors[randomFromTo(0, 8)];

    // Create the new circle.
    var circle = new Circle(x, y, radius, color);

    // Store it in the array.
    circles.push(circle);

    // Redraw the canvas.
    drawCircles();
}

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function clearCanvas() {
    // Remove all the images.
    circles = [];
    ships = [];
    cars = [];
    triangles = [];

    // Clear the canvas 
     context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update the display.
    // drawCircles();
    // drawShips();
    drawTriangles();
}

// 还原圆
function restoreCircle() {
    clearCanvas();
    addCircle();
}

// 还原帆船
function restoreShip() {
    clearCanvas();
    addShip();
}

// 还原轿车
function restoreCar() {
    clearCanvas();
    addCar();
}

// 还原三角形
function restoreTriangle() {
    clearCanvas();
    addTriangle();
}



// 平移
function translateCircle() {
    circles[0].x += randomFromTo(-circles[0].radius, circles[0].radius);
    circles[0].y += randomFromTo(-circles[0].radius, circles[0].radius);;
    drawCircles();
}

// 缩放
function scaleCircle() {
    circles[0].radius *= (randomFromTo(75, 125)/100);
    drawCircles();
} 

// 缩放帆船
function scaleShip() {
    let change = (randomFromTo(75, 125)/100);
    ships[0].bigWidth *= change;
    ships[0].smallWidth *= change;
    ships[0].mast *= change;
    ships[0].height *= change;
    drawShips();
} 

// 旋转轿车
function rotateCar() {
    context.save();
    context.translate(300, 200);
    cars[0].x = 0;
    cars[0].y = 0; 
    context.rotate(Math.PI/180*randomFromTo(-360, 360));
    drawCars();
    context.restore();
}

// 绘制四边形
function drawQuadrangle(x1, y1, x2, y2, x3, y3, x4, y4, color) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.globalAlpha = 0.85;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.lineTo(x4, y4);
    context.lineTo(x1, y1);
    context.fillStyle = color;
    context.lineWidth = 3;
    context.strokeStyle = 'black';
    context.fill();
    context.stroke();

}

// 剪裁三角形
function cutTriangle() {
    // 取三角形
    let t = triangles[0];

    let xa = randomFromTo(t.x1, t.x2);
    let ya = xa*(t.y2 - t.y1)/(t.x2 - t.x1) + (t.x1*t.y2 - t.y1*t.x2)/(t.x1-t.x2);
    let xb = randomFromTo(t.x2, t.x3);
    let yb = xb*(t.y3 - t.y2)/(t.x3 - t.x2) + (t.x2*t.y3 - t.y2*t.x3)/(t.x2-t.x3);
    
    drawQuadrangle(t.x1, t.y1, xa, ya, xb, yb, t.x3, t.y3, t.color);

}

// 画一个矩形，然后用扫描线填充算法进行