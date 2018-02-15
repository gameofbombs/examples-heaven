let app = new PIXI.Application();
document.body.appendChild(app.view);

let count = 0;

//try use direction=4 or 2 instead of direction=0
let strip = new PIXI.heaven.mesh.Rope(PIXI.Texture.fromImage('required/assets/snake.png'), 25, 2, 0);
//points are created automagically.
let points = strip.points;

// we can safely comment width/height, it will be set from texture
strip.width = 600;
strip.height = 70;
strip.position.set(100, 300);
strip.enableColors();

app.stage.addChild(strip);
// start animating
app.ticker.add(function() {

    count += 0.1;

    for (let i = 0; i < points.length; i++) {

        // we are using offset instead of points[i].y
        //points[i].y = Math.sin((i * 0.5) + count) * 30;

        strip.points[i].offset = Math.sin((i * 0.5) + count) * 10;
        //try to uncomment that thing:
        //strip.points[i].scale = Math.sin((i * 0.5) + count+ 1);

        points[i].x = i * strip.width/(points.length-1) + Math.cos((i * 0.3) + count) * 20;


        const R = 0.3 + 0.3 * Math.cos( i * 0.1 + count);
        const G = 0.3 + 0.3 * Math.cos( i * 0.15 + count);
        const B = 0.3 + 0.3 * Math.cos( i * 0.2 + count);

        points[i].color.setLight(R, 1, B);
        points[i].color.setDark(0, G, 0);
    }
    renderPoints();
});

let g = new PIXI.Graphics();
g.x = strip.x;
g.y = strip.y;
app.stage.addChild(g);

function renderPoints () {
    g.clear();
    g.lineStyle(2, 0xffc2c2);
    g.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        g.lineTo(points[i].x, points[i].y);
    }
    for (let i = 1; i < points.length; i++) {
        g.beginFill(0xff0022);
        g.drawCircle(points[i].x, points[i].y, 5);
        g.endFill();
    }
}
