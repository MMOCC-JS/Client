var gui = require('./gui/index');

var stats = new Stats();
var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x000000});

window.addEventListener('load', function() {
    stats.dom.style.left = 'initial';
    stats.dom.style.right = '0px';

    document.body.appendChild(stats.dom);
    document.body.appendChild(renderer.view);

    PIXI.loader.add('spritesheets/gui.json').load(onGuiLoaded);
});

var stage = new PIXI.Container();

function createWindow(styleName, width, height) {
    return new gui.Window(styleName, width, height);
}

function createSidebar(height) {
    return new gui.Sidebar(renderer.view.height, [
        {
             name: 'navigator',
            text: 'Rooms',
            click: function() {
                console.log('Navigator');
            }
        },
        {
            name: 'shop',
            text: 'Shop',
            click: function() {
                console.log('Shop');
            }
        },
        {
            name: 'inventory',
            text: 'Inventory',
            click: function() {
                console.log('Inventory');
            }
        }
    ]);
}

function onGuiLoaded() {
    var sidebar = createSidebar(renderer.view.height);
    stage.addChild(sidebar);

    var blue = createWindow('blue', 250, 326);
    blue.x = 100;
    blue.y = 50;
    stage.addChild(blue);

    var black = createWindow('black', 250, 326);
    black.x = 300;
    black.y = 100;
    stage.addChild(black);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    stats.begin();
    renderer.render(stage);
    stats.end();
}