var app = new PIXI.Application(800, 600, {backgroundColor: 0x020222, autoStart: true});
document.body.appendChild(app.view);

//create texture for rope
let renderTexture = PIXI.RenderTexture.create(200, 200);
let circle = new PIXI.Graphics();
for (let x = 0; x < 100; x++) {
    let comp = 150 + Math.round(Math.random() * 80)
    let col = (comp << 16) + (comp << 8) + comp;
    let sign1 = Math.random() > 0.5 ? 1 : -1;
    let sign2 = Math.random() > 0.5 ? 1 : -1;
    let rnd1 = Math.pow(Math.random(), 1.8);
    let rnd2 = Math.pow(Math.random(), 1.8);
    let x = 100 + sign1 * (rnd1) * 80;
    let y = 100 + sign2 * (rnd2) * 80;
    let scale = 3 + Math.random() * 11;
    circle.beginFill(col, 0.5 * (1 - (x / 200)));//
    circle.drawCircle(x, y, scale);
    circle.drawCircle(x + 4, y, scale);
    circle.drawCircle(x + 8, y, scale);
    circle.drawCircle(x + 12, y, scale);
    circle.drawCircle(x + 16, y, scale);
}
circle.endFill();
app.renderer.render(circle, renderTexture);

//Get the texture for rope.
let trailTexture = renderTexture
let historyX = [];
let historyY = [];
//historySize determines how long the trail will be.
let historySize = 180;
//ropeSize determines how smooth the trail will be.
let ropeSize = 60;
let points = [];

//Create history array.
let rope;

let phase = 0;
// Listen for animate update
app.ticker.add(function (delta) {
    var time = (new Date()).getTime();////
    let speedphase = 0.02 * (Math.cos(time / 2000));
    phase += (0.06 + speedphase);
    let pc = Math.cos(phase);
    pos = {
        x: 100 + 350 * (pc * 0.5 + 0.8) + 300 * (Math.sin(phase / 2) * 0.5),
        y: 200 + 200 * (Math.sin(phase) * (1 + (Math.sin(phase / 2) / 5))),
    };
    if (!rope) {
        for (let i = 0; i < historySize; i++) {
            historyX.push(pos.x);
            historyY.push(pos.y);
        }

        //Init rope points.
        for (let i = 0; i < ropeSize; i++)
            points.push(new PIXI.heaven.mesh.RopePoint(pos.x, pos.y));

        //Create the rope
        rope = new PIXI.heaven.mesh.Rope(trailTexture, points, 3);

        rope.enableColors();
        rope.blendMode = PIXI.BLEND_MODES.ADD;
        app.stage.addChild(rope);
    }


    let d;
    let scaleF = function (i) {
        return 0.5 + 0.5 * (i / rope.points.length) - speedphase
    };
    let pcabs = Math.abs(speedphase * 25);

    for (let i = 0; i < points.length; i++) {
        const vn = i / points.length;
        let R = 0. + 0.3 * (1 - vn) + pcabs,
            G = 0. + 0.3 * (1 - vn ) + pcabs,
            B = 1;

        points[i].color.setLight(R, G, B);
        // points[i].color.setDark(R, G, B);
    }

    //Setting rope width
    for (let x = 0; x < rope.points.length; ++x) {
        rope.points[x].scale = scaleF(x)
    }


    //Update the train pos to history
    historyX.pop();
    historyX.unshift(pos.x);
    historyY.pop();
    historyY.unshift(pos.y);

    //Update the points to correspond with history.
    for (let i = 0; i < ropeSize; i++) {
        let p = points[i];

        //Smooth the curve with cubic interpolation to prevent sharp edges.
        let ix = cubicInterpolation(historyX, i / ropeSize * historySize);
        let iy = cubicInterpolation(historyY, i / ropeSize * historySize);

        p.x = ix;
        p.y = iy;

    }
});

//


/**
 * Cubic interpolation based on https://github.com/osuushi/Smooth.js
 * @param    k
 * @return
 */
function clipInput(k, arr) {
    if (k < 0)
        k = 0;
    if (k > arr.length - 1)
        k = arr.length - 1;
    return arr[k];
}

function getTangent(k, factor, array) {
    return factor * (clipInput(k + 1, array) - clipInput(k - 1, array)) / 2;
}

function cubicInterpolation(array, t, tangentFactor) {
    if (tangentFactor == null) tangentFactor = 1;

    let k = Math.floor(t);
    let m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
    let p = [clipInput(k, array), clipInput(k + 1, array)];
    t -= k;
    let t2 = t * t;
    let t3 = t * t2;
    return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
}
