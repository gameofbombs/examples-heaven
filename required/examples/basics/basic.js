let app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

// create a new Sprite from an image path
let bunny = new PIXI.heaven.Sprite(PIXI.Texture.fromImage('required/assets/basics/bunny.png'));

// Let us invert the colors!
bunny.color.setLight(0.0, 0.0, 0.0);
bunny.color.setDark(1.0, 1.0, 1.0);

// center the sprite's anchor point
bunny.anchor.set(0.5);
bunny.scale.set(3.0);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

// Listen for animate update
app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    bunny.rotation += 0.1 * delta;
});
