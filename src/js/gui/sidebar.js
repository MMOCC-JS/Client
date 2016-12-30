function Sidebar(height, buttons, buttonTextStyle) {
    PIXI.Container.call(this);

    if (buttonTextStyle) {
        this._buttonTextStyle = buttonTextStyle;
    }

    var bg = this._createBackground();
    bg.background.height = height;
    this.addChild(bg);

    for (var index in buttons) {
        var button = this._createButton(index, buttons[index]);
        this.addChild(button);
    }
}

Sidebar.prototype = Object.create(PIXI.Container.prototype);
Sidebar.prototype.constructor = Sidebar;
module.exports = Sidebar;

Sidebar.prototype._buttonTextStyle = {font: '11px Arial', fill: '#FFFFFF'};

Sidebar.prototype._createBackground = function() {
    var logo = PIXI.Sprite.fromFrame('gui/sidebar/logo'),
        bgTexture = PIXI.Texture.fromFrame('gui/sidebar/background'),
        bg = new PIXI.extras.TilingSprite(bgTexture, bgTexture.width, bgTexture);

    var bgContainer = new PIXI.Container();
    bgContainer.logo = logo;
    bgContainer.background = bg;
    bgContainer.addChild(bg);
    bgContainer.addChild(logo);
    bgContainer.cacheAsBitmap = true;

    return bgContainer;
}

Sidebar.prototype._createButton = function(index, button) {
    var self = this;

    var textureOut = PIXI.Texture.fromFrame('gui/sidebar/' + button.name + '_0'),
        textureOver = PIXI.Texture.fromFrame('gui/sidebar/' + button.name + '_1');

    var sprite = new PIXI.Sprite(textureOut);

    // create the shop button
    var spriteText = new PIXI.Text(button.text, this._buttonTextStyle);
    spriteText.position.set(sprite.width / 2 - spriteText.width / 2, sprite.height + 2); // center the text
    sprite.addChild(spriteText);

    sprite.position.set(6, index * 80 + 90);

    // events
    sprite.buttonMode = true;
    sprite.interactive = true;
    sprite
        .on('mouseover', function() {
            this.texture = textureOver;
        })
        .on('mouseout', function() {
            this.texture = textureOut;
        })
        .on('click', function() {
            if (button.click) button.click(this);
        });

    return sprite;
}