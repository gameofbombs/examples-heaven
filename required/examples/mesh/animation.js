var app = new PIXI.Application();
document.body.appendChild(app.view);

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

    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    var anim = new PIXI.extras.AnimatedSprite(frames, false);

    // animation with rope
    var rope = new PIXI.heaven.mesh.Rope(anim.texture, 3, 2, 2);
    rope.anchor.set(0.5);
    rope.x = 200;
    rope.y = 200;
    app.stage.addChild(rope);

    // animation with plane
    var plane = new PIXI.heaven.mesh.Plane(anim.texture, 5, 5)
    plane.anchor.set(0.5);
    plane.x = 600;
    plane.y = 250;
    app.stage.addChild(plane);

    var timeLine = 0;

    app.ticker.add(function(deltaTime) {
        timeLine += deltaTime;

        anim.update(deltaTime * 0.3);

        rope.texture = anim.texture;
        rope.points[1].x = Math.cos(timeLine * 0.05) * 20;
        rope.points[1].y = Math.sin(timeLine * 0.1) * 10;


        plane.texture = anim.texture;
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
