/*global MATH*/
/*global TEA*/

var i, j;
var allVertices = [];
var allNormals = [];
var allFaces = [];
var start, end;
var line;
var entries;



for (i = 0; i < TEA.length; i++) {
    if (TEA[i] === "v" && TEA[i + 1] !== "n") {
        start = i + 2;
        end = TEA.indexOf('\n', i);
        line = TEA.slice(start, end);
        allVertices.push(line.split(" "));
    }
    if (TEA[i] === "v" && TEA[i + 1] === "n" && false) {
        start = i + 3;
        end = TEA.indexOf('\n', i);
        line = TEA.slice(start, end);
        allNormals.push(line.split(" "));
    }
    if (TEA[i] === "f") {
        start = i + 2;
        end = TEA.indexOf('\n', i);
        line = TEA.slice(start, end);
        entries = line.split(" ").slice();
        
        for (j = 0; j < entries.length; j++) {
            entries[j] = entries[j].split('//'); 
        }
        allFaces.push(entries.slice());
        //console.log(entries);
    }
}

var GAME = GAME || {};

for (i = 0; i < allVertices.length; i++) {
    allVertices[i] = new MATH.Vector(Number(allVertices[i][0]), Number(allVertices[i][1]), Number(allVertices[i][2]));
}

for (i = 0; i < allVertices.length; i++) {
    //allNormals[i] = new MATH.Vector(Number(allNormals[i][0]), Number(allNormals[i][1]), Number(allNormals[i][2]));
}

var faces = [];
var v1, v2, v3;
for (i = 0; i < allFaces.length; i++) {
    v1 = allVertices[Number(allFaces[i][0][0]) - 1];
    v2 = allVertices[Number(allFaces[i][1][0]) - 1];
    v3 = allVertices[Number(allFaces[i][2][0]) - 1];
    faces[i] = new MATH.Polygon([v1, v2, v3]);
}


var e1, e2, e3;
e1 = new MATH.Vector(1, 0, 0);
e2 = new MATH.Vector(0, 1, 0);
e3 = new MATH.Vector(0, 0, 1);

var origin = new MATH.Vector(0, -0.5, 3);

GAME.teapot = new MATH.Polyhedron(origin, [e1, e2, e3], faces);

var a, b, c, d, e, f, g, h;
var f1, f2, f3, f4, f5, f6;

e1 = new MATH.Vector(1, 0, 0);
e2 = new MATH.Vector(0, 1, 0);
e3 = new MATH.Vector(0, 0, 1);

a = new MATH.Vector(-1, -1, -1);
b = new MATH.Vector(1, -1, -1);
c = new MATH.Vector(0, -1, Math.sqrt(3)/2);
d = a.add(b.add(c)).scale(1/3).add(new MATH.Vector(0, 1.5, 0));


f1 = new MATH.Polygon([a, b, c]);
f2 = new MATH.Polygon([a, c, d]);
f3 = new MATH.Polygon([b, d, c]);
f4 = new MATH.Polygon([a, d, b]);

origin = new MATH.Vector(2, 3, 10);

GAME.tetra = new MATH.Polyhedron(origin, [e1, e2, e3], [f1, f2, f3, f4]);

a = new MATH.Vector(-1.0, -1.0, -1.0);
b = new MATH.Vector(-1.0, -1.0, 1.0);
c = new MATH.Vector(-1.0, 1.0, -1.0);
d = new MATH.Vector(-1.0, 1.0, 1.0);
e = new MATH.Vector(1.0, -1.0, -1.0);
f = new MATH.Vector(1.0, -1.0, 1.0);
g = new MATH.Vector(1.0, 1.0, -1.0);
h = new MATH.Vector(1.0, 1.0, 1.0);

f1 = new MATH.Polygon([a, b, d, c]);
f2 = new MATH.Polygon([a, e, f, b]);
f3 = new MATH.Polygon([a, c, g, e]);
f4 = new MATH.Polygon([b, f, h, d]);
f5 = new MATH.Polygon([g, c, d, h]);
f6 = new MATH.Polygon([e, g, h, f]);

origin = new MATH.Vector(-4, -2, 7);

GAME.cube = new MATH.Polyhedron(origin, [e1, e2, e3], [f1, f2, f3, f4, f5, f6]);

GAME.camera = new MATH.Vector(0, 0, 1);

