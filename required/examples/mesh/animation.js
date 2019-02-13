var app = new PIXI.Application();
document.body.appendChild(app.view);

PIXI.heaven.settings.MESH_PLUGIN='spriteHeaven';
PIXI.loader
    .add('required/assets/basics/fighter.json')
    .load(onAssetsLoaded);

function onAssetsLoaded() {
    // create an array of textures from an image path
    var frames = [];

    for (var i = 0; i < 30; i++) {
        var val = i < 10 ? '0' + i : i;

        // magically works since the spritesheet was loaded with the pixi loader
        frames.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
    }

    // animation with rope
    var rope = new PIXI.heaven.mesh.Rope(undefined, 3, 2, 2);
    rope.anchor.set(0.5);
    rope.x = 200;
    rope.y = 200;
    app.stage.addChild(rope);

    // animation with plane
    var plane = new PIXI.heaven.mesh.Plane(undefined, 5, 5);
    plane.anchor.set(0.5);
    plane.x = 600;
    plane.y = 250;
    app.stage.addChild(plane);

    var timeLine = 0;

    new PIXI.heaven.AnimationState(frames, false).bind(rope);
    new PIXI.heaven.AnimationState(frames, false).bind(plane);

    app.ticker.add(function(deltaTime) {
        timeLine += deltaTime;

        rope.animState.update(deltaTime * 0.3);
        plane.animState.update(deltaTime * 0.3);

        rope.points[1].x = Math.cos(timeLine * 0.05) * 20;
        rope.points[1].y = Math.sin(timeLine * 0.1) * 10;

        var vertices = plane.vertices;
        var calculatedVertices = plane.calculatedVertices;
        var index = 0;
        for (var r = 0; r < 5; r++) {
            for (var c = 0; c < 5; c++) {
                var x = calculatedVertices[index * 2];
                var y = calculatedVertices[index * 2 + 1];
                vertices[index * 2] = x + Math.sin((index * 0.2) + timeLine * 0.05) * 15;
                vertices[index * 2 + 1] = y + Math.sin((index * 0.3) + timeLine * 0.05) * 10;
                index++;
            }
        }

    });

}
