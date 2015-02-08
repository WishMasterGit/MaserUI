/**
 *
 * @param game
 * @param settings
 * @param atlas
 * @param callback
 * @param callbackContext
 * @param upFrame
 * @param downFrame
 * @constructor
 */
MaserUI.Button = function (game, settings, atlas, callback, callbackContext, upFrame, downFrame) {
    'use strict';
    MaserUI.Panel.call(this, game, settings);
    this.game = game;
    // Create button
    this.button = new Phaser.Button(game, 0, 0, atlas, callback, callbackContext, upFrame, upFrame, downFrame, upFrame);
    this.button.anchor.setTo(0.5, 0.5);
    this.button.x = this.width * 0.5;
    this.button.y = this.height * 0.5;
    this.addChild(this.button);
};


// ========================= Prototype =========================
MaserUI.Button.prototype = Object.create(MaserUI.Panel.prototype);
MaserUI.Button.prototype.constructor = MaserUI.Button;

// ========================= Update =========================
/**
 * Automatically called by World.update
 */
MaserUI.Button.prototype.update = function () {
    "use strict";
};

// ========================= Labels =========================
MaserUI.Button.prototype.addLabel = function (game, settings, text, style) {
    "use strict";
    this.label = new MaserUI.TextBlock(game, settings, text, style);
    this.label.setAlignment([MaserUI.Panel.Alignment.center]);
    this.label.setPivot(new Phaser.Point(0.5, 0.5));
    this.label.Stretch = MaserUI.Panel.StretchOptions.uniform;
    this.label.inputEnabled = false;
    this.addChild(this.label);
};
MaserUI.Button.prototype.setText = function (text) {
    "use strict";
    if (this.label !== undefined) {
        this.label.setText(text);
    }
};
MaserUI.Button.prototype.setStyle = function (style) {
    "use strict";
    if (this.label !== undefined) {
        this.label.setStyle(style);
    }
};


// ========================= Methods =========================
MaserUI.Button.prototype.flipHorizontal = function () {
    "use strict";
    this.button.scale.x = -1;
};
MaserUI.Button.prototype.flipVertical = function () {
    "use strict";
    this.button.scale.y = -1;
};