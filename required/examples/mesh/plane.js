var app = new PIXI.Application();
document.body.appendChild(app.view);

var timeLine = 0;
var scale = 1.75;

var texture = PIXI.Texture.fromImage('required/assets/displacement_BG.jpg');
var strip = new PIXI.heaven.mesh.Plane(texture, 10, 10);
strip.scale.set(scale, scale);
var vertices = strip.vertices;
var calculatedVertices = strip.calculatedVertices;

strip.x = -50;
strip.y = -30;

app.stage.addChild(strip);

var g = new PIXI.Graphics();
g.scale.set(scale, scale);
g.x = strip.x;
g.y = strip.y;
app.stage.addChild(g);

// start animating
app.ticker.add(function() {

    timeLine += 0.05;
    var index = 0;
    for (var r = 0; r < 10; r++) {
        for (var c = 0; c < 10; c++) {
            var x = calculatedVertices[index * 2];
            var y = calculatedVertices[index * 2 + 1];
            vertices[index * 2] = x + Math.sin((index * 2) + timeLine) * 10;
            vertices[index * 2 + 1] = y + Math.sin((index * 3) + timeLine) * 10;
            index++;
        }
    }
    renderVertices(vertices);
});

function renderVertices(vertices) {

    g.clear();

    g.lineStyle(2, 0xffc2c2, 0.5);
    // g.moveTo(vertices[0], vertices[1]);

    var index = 0;
    for (var r = 0; r < 10; r++) {
        for (var c = 0; c < 10; c++) {
            if (c === 0) {
                g.moveTo(vertices[index * 2], vertices[index * 2 + 1]);
            } else {
                g.lineTo(vertices[index * 2], vertices[index * 2 + 1]);
            }
            index++;
        }
    }

    var index = 0;
    for (var c = 0; c < 10; c++) {
        index = c;
        g.moveTo(vertices[index * 2], vertices[index * 2 + 1]);
        for (var r = 0; r < 9; r++) {
            index += 10;
            g.lineTo(vertices[index * 2], vertices[index * 2 + 1]);
        }
    }

    for (var i = 1; i < vertices.length; i++) {
        g.beginFill(0xff0022);
        g.drawCircle(vertices[i * 2], vertices[i * 2 + 1], 6);
        g.endFill();
    }
}
