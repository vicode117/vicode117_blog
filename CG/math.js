var MATH = MATH || {};

//ROW-MAJOR ORDER
MATH.Matrix = class extends Array {
    get hom() {
        var res = new MATH.Matrix();
        var i;
        for (i = 0; i < this.numRow; i++) {
            res.push(this[i].slice());
        }
        for (var i = 0; i < this.numRow; i++) {
            res[i].push(0);
        }
        res.push(new Array(res[0].length).fill(0));
        res[this.numRow][this.numCol] = 1;
        return res;
    }
    
    get numCol() {
        return this[0].length;
    }
    
    get numRow() {
        return this.length;
    }
    
    matMult(other) {
        var res;
        var i, j, k;
        if (other instanceof MATH.Matrix) {
            res = new MATH.Matrix(this.numRow);
            var entry;
            for (i = 0; i < this.numRow; i++) {
                res[i] = [];
                for (j = 0; j < other.numCol; j++) {
                    entry = 0;
                    for (k = 0; k < this.numCol; k++) {
                        entry += this[i][k] * other[k][j];
                    }
                    res[i][j] = entry;
                }
            }
            return res;
        }
        else if (other instanceof MATH.Vector) {
            res = new MATH.Vector(this.length).fill(0);
            for (i = 0; i < this.numRow; i++) {
                for (j = 0; j < this.numCol; j++) {
                    res[i] += other[j] * this[i][j];
                }
            }
            return res;
        }
    }
};

MATH.Vector = class Vector extends Array {
    get hom() {
        var res;
        res = this.slice();
        res.push(1);
        return res;
    }
    
    get cart() {
        var res = new MATH.Vector();
        var i;
        for (i = 0; i < this.length - 1; i++) {
            res[i] = this[i]/this[this.length-1];
        }
        return res;
    }
    
    get unit() {
        return this.scale(1/this.norm);
    }
    
    get norm() {
        var res = 0;
        var i;
        for (i = 0; i < this.length; i++) {
            res += this[i] * this[i];
        }
        return Math.sqrt(res);
    }
    
    static average(vectors) {
        var res = vectors[0];
        var i;
        for (i = 1; i < vectors.length; i++) {
            res = res.add(vectors[i]);
        }
        return res.scale(1/vectors.length);
    }
    
    translate(displacement) {
        var disMat = new MATH.Matrix();
        var i, j;
        for (i = 0; i < this.length; i++) {
            disMat[i] = [];
            for(j = 0; j < this.length + 1; j++) {
                if (j === i) { 
                    disMat[i][j] = 1;
                } else {
                    disMat[i][j] = 0;
                }
            }
        }
        disMat[this.length] = [];
        for (i = 0; i < this.length; i++) {
            disMat[this.length][i] = displacement[i];
        }
        disMat[this.length][this.length] = 1;
        return disMat.vecMult(this.hom).cart;
    }
    
    rotate2D(angle) {
        var cos, sin;
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        var rotMat = new MATH.Matrix([cos, -sin], [sin, cos]);
        return rotMat.matMult(this);
    }
    
    dot(other) {
        var i;
        var res = 0;
        for (i = 0; i < this.length; i++) {
            res += this[i] * other[i];
        }
        return res;
    }
    
    cross(other) {
        var x = this[1] * other[2] - this[2] * other[1];
        var y = this[2] * other[0] - this[0] * other[2];
        var z = this[0] * other[1] - this[1] * other[0];
        return new MATH.Vector(x, y, z);
    }
    
    scale(factor) {
        var res = new MATH.Vector();
        var i;
        for (i = 0; i < this.length; i++) {
            res[i] = factor * this[i];
        }
        return res;
    }
    
    add(other) {
        var res = new MATH.Vector();
        var i;
        for (i = 0; i < this.length; i++) {
            res[i] = this[i] + other[i];
        }
        return res;
    }
    
    subtract(other) {
        var res = new MATH.Vector();
        var i;
        for (i = 0; i < this.length; i++) {
            res[i] = this[i] - other[i];
        }
        return res;
    }
};

MATH.Polygon = class {
    constructor(vertices) {
        this.vertices = vertices;
        this.size = this.vertices.length;
    }
    
    get normal() {
        var side1 = this.vertices[1].subtract(this.vertices[0]);
        var side2 = this.vertices[2].subtract(this.vertices[1]);
        return side1.cross(side2);
    }
    
    translate(displacement) {
        var res = [];
        var i;
        for (i = 0; i < this.size; i++) {
            res[i] = this.vertices[i].add(displacement);
        }
        this.vertices = res;
    }
    
    aff_transfrom(matrix) {
        var res = [];
        var i;
        for (i = 0; i < this.size; i++) {
            res[i] = matrix.matMult(this.vertices[i].hom);
            res[i] = res[i].cart;
        }
        this.vertices = res;
    }
    
    transform(matrix) {
        var res = [];
        var i;
        for (i = 0; i < this.size; i++) {
            res[i] = matrix.matMult(this.vertices[i]);
        }
        this.vertices = res;
    }
};

MATH.Polyhedron = class {
    constructor(origin, coords, faces) {
        this.origin = origin;
        this.coords = coords;
        this.faces = faces;
        this.size = this.faces.length;
    }
    
    get e1() {
        return this.coords[0];
    }
    get e2() {
        return this.coords[1];
    }
    get e3() {
        return this.coords[2];
    }
    
    
    translate(displacement) {
        this.origin = this.origin.add(displacement);
    }
    
    aff_transfrom(matrix) {
        var i;
        for (i = 0; i < 3; i++) {
            this.coords[i] = matrix.matMult(this.coords[i]);
        }
    }
    
    localTransform(matrix) {
        var i;
        for (i = 0; i < 3; i++) {
            this.coords[i] = matrix.matMult(this.coords[i]);
        }
    }
    globalTransform(matrix) {
        var i;
        for (i = 0; i < 3; i++) {
            this.coords[i] = matrix.matMult(this.coords[i]);
        }
        this.origin = matrix.matMult(this.origin);
    }
    
    draw(canvas, ctx) {
        var i, j, k;
        var width = canvas.width;
        var height = canvas.height;
        var color;
        
        var vertices;
        var homCoordChange = new MATH.Matrix(
            [this.e1[0], this.e2[0], this.e3[0], this.origin[0]],
            [this.e1[1], this.e2[1], this.e3[1], this.origin[1]],
            [this.e1[2], this.e2[2], this.e3[2], this.origin[2]],
            [0,          0,          0,          1             ]);
        var projection = new MATH.Matrix(
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0.001, 0]);
        var oneShot = projection.matMult(homCoordChange);
        
        var coordChange = new MATH.Matrix(
            [this.e1[0], this.e2[0], this.e3[0]],
            [this.e1[1], this.e2[1], this.e3[1]],
            [this.e1[2], this.e2[2], this.e3[2]]);
        
        var tot;
        var image, next;
        var v1, v2;
        
        function surfacePoint(face) {
            return homCoordChange.matMult(MATH.Vector.average(face.vertices).hom).cart;
        }
        
        var facesToDraw = new Array(this.size);
        var distances = new Array(this.size);
        var length = 0;
        for (i = 0; i < this.size; i++) {
            v1 = coordChange.matMult(this.faces[i].normal);
            v2 = surfacePoint(this.faces[i]);
            color = Math.round(256 * - v1.unit.dot(v2.unit));
            if (color > 0) {
                facesToDraw[length] = [this.faces[i].vertices, String(color)];
                distances[length] = v2.norm;
                length++;
            }
        }
        
        var max, temp;
        
        for (i = 0; i < length; i++){
            //set minimum to this position
            max = i;
    
            //check the rest of the array to see if anything is smaller
            for (j=i+1; j < length; j++){
                if (distances[j] > distances[max]){
                    max = j;
                }
            }
    
            //if the minimum isn't in the position, swap it
            if (i != max){
                temp = distances[max];
                distances[max] = distances[i];
                distances[i] = temp;
                
                temp = facesToDraw[max];
                facesToDraw[max] = facesToDraw[i];
                facesToDraw[i] = temp;
            }
        }
        
        for (i = 0; i < length; i++) {
            vertices = facesToDraw[i][0];
            tot = vertices.length;
            color = facesToDraw[i][1];
            ctx.fillStyle = "rgb(" + color+ "," + color + "," + color + ")";
            ctx.strokeStyle = "rgb(" + color+ "," + color + "," + color + ")";
            ctx.beginPath();
            for (j = 0; j < tot - 1; j++) {
                if (j === 0) {
                    image = oneShot.matMult(vertices[j].hom).cart;
                    ctx.moveTo(Math.round(image[0] + width/2), Math.round(height/2 - image[1]));
                }
                next = oneShot.matMult(vertices[j + 1].hom).cart;
                ctx.lineTo(Math.round(next[0] + width/2), Math.round(height/2 - next[1]));
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    }
};