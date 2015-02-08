
// ========================= Construction =========================
MaserUI.StackPanel = function (game, settings) {
    "use strict";
    MaserUI.Panel.call(this, game, settings);
    this.items = [];
    this.startPosition = 0;
    this.totalHeight = 0;

    // Add mask
    var mask = new Phaser.Graphics(this.game, 0, 0);
    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, settings.width, settings.height);
    this.addChild(mask);
    this.mask = mask;
};

MaserUI.StackPanel.prototype = Object.create(MaserUI.Panel.prototype);
MaserUI.StackPanel.prototype.constructor = MaserUI.StackPanel;


// ========================= Items =========================
MaserUI.StackPanel.prototype.addItem = function (item) {
    "use strict";
    this.items.push(item);
    this.addChild(item);
};

// ========================= Update =========================
MaserUI.StackPanel.prototype.update = function () {
    "use strict";
    //var activePointer = this.game.input.activePointer;
    //this.game.debug.spriteInfo(this, 32, 130);
    //this.game.debug.pointer(activePointer);
    //this.game.debug.spriteBounds(this);

    var start = this.startPosition;
    this.totalHeight = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        var topMargin = item.getMargin(MaserUI.Panel.Alignment.top) * item.height;
        var bottomMargin = item.getMargin(MaserUI.Panel.Alignment.bottom) * item.height;
        item.position.y = start + topMargin;

        //TODO:[tkachenko] hack should be fixed in panel transformation matrix
        var itemTotalHeight = (item.height + topMargin + bottomMargin);
        this.totalHeight += itemTotalHeight;
        start += itemTotalHeight;

        item.autoCull = true;
    }
    Panel.prototype.update.call(this);
};