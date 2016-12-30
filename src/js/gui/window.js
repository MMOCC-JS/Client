function Window(styleName, width, height) {
    PIXI.Container.call(this);

    var tl = PIXI.Sprite.fromFrame('gui/window/' + styleName + '/tl'),
        tr = PIXI.Sprite.fromFrame('gui/window/' + styleName + '/tr'),
        tmTexture = PIXI.Texture.fromFrame('gui/window/' + styleName + '/tm'),
        tm = new PIXI.extras.TilingSprite(tmTexture, width - tr.width - tl.width, tmTexture.height);
        //tm = new PIXI.Sprite(tmTexture);

        bl = PIXI.Sprite.fromFrame('gui/window/' + styleName + '/bl'),
        br = PIXI.Sprite.fromFrame('gui/window/' + styleName + '/br'),
        bmTexture = PIXI.Texture.fromFrame('gui/window/' + styleName + '/bm'),
        bm = new PIXI.extras.TilingSprite(bmTexture, width - br.width - bl.width, bmTexture.height);

        mlTexture = PIXI.Texture.fromFrame('gui/window/' + styleName + '/ml'),
        ml = new PIXI.extras.TilingSprite(mlTexture, mlTexture.width, height - tl.height - bl.height);
        mrTexture = PIXI.Texture.fromFrame('gui/window/' + styleName + '/mr'),
        mr = new PIXI.extras.TilingSprite(mrTexture, mrTexture.width, height - tr.height - br.height);

        content = new PIXI.Graphics();

    content.beginFill(0xFFFFFF);
    content.drawRect(tl.width, tl.height, width - tr.width - tl.width, height - tr.height - br.height);
    content.endFill();

    this.addChild(content);

    tl.position.set(0, 0);
    tm.position.set(tl.width, 0);
    tr.position.set(width - tr.width, 0);

    this.addChild(tl);
    this.addChild(tm);
    this.addChild(tr);

    bl.position.set(0, height - bl.height);
    bm.position.set(bl.width, height - bm.height);
    br.position.set(width - br.width, height - br.height);

    this.addChild(bl);
    this.addChild(bm);
    this.addChild(br);

    ml.position.set(0, tl.height);
    mr.position.set(width - mr.width, tr.height);

    this.addChild(ml);
    this.addChild(mr);

    this.cacheAsBitmap = true;
}

Window.prototype = Object.create(PIXI.Container.prototype);
Window.prototype.constructor = Window;
module.exports = Window;