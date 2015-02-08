// ========================= Construction =========================
/**
 *
 * @param game
 * @param settings
 * @param text
 * @param style
 * @constructor
 */
MaserUI.TextBlock = function (game, settings, text, style) {
    "use strict";
    MaserUI.Panel.call(this, game, settings);
    this.textField = new Phaser.Text(game, 1, 1, text, style);
    this.textField.anchor.setTo(0.5, 0.5);
    this.textField.x = this.width * 0.5;
    this.textField.y = this.height * 0.5;
    this.addChild(this.textField);
    this.resizeToFitText();
};



// ========================= Prototype =========================
MaserUI.TextBlock.prototype = Object.create(MaserUI.Panel.prototype);
MaserUI.TextBlock.prototype.constructor = MaserUI.TextBlock;

// ========================= Methods =========================
MaserUI.TextBlock.prototype.setText = function (text) {
    "use strict";
    this.textField.setText(text);
};
MaserUI.TextBlock.prototype.setAnchorTo = function (pivotX, pivotY) {
    "use strict";
    this.textField.anchor.setTo(pivotX, pivotY);
};
MaserUI.TextBlock.prototype.resizeToFitText = function() {
    "use strict";
    this.texture.frame.height = this.textField.height;
    this.texture.frame.width = this.textField.width;
    this.textField.x = this.textField.width * 0.5;
    this.textField.y = this.textField.height * 0.5;
    this.OriginalSize = new Phaser.Point(this.textField.width, this.textField.height);
};

// ========================= Properties =========================
Object.defineProperty(MaserUI.TextBlock.prototype, "TextHeight", {
    get: function() {
        "use strict";
        return this.textField.height;
    }
});

// ========================= Update =========================
MaserUI.TextBlock.prototype.update = function () {
    "use strict";

};