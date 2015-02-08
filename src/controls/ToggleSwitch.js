// ========================= Construction =========================
MaserUI.ToggleButton = function (game, isToggledOn) {
    "use strict";
    MaserUI.Panel.call(this, game, {width:102, height:63, relativeSize:[0.2,0], stretch:MaserUI.Panel.StretchOptions.uniform});

    // Add backing
    this.backing = new Phaser.Sprite(game, 0, 0, "gameAtlas", "toggle_off.png");
    this.backing.anchor.setTo(0.5, 0.5);
    this.addChild(this.backing);

    // Add fill
    this.fill = new Phaser.Sprite(game, 0, 0, "gameAtlas", "toggle_on.png");
    this.fill.anchor.setTo(0.5, 0.5);
    this.addChild(this.fill);

    // Add button
    this.switch = new Phaser.Sprite(game, 0, 0, "gameAtlas", "toggle_switch.png");
    this.switch.anchor.setTo(0.5, 0.5);
    this.switch.scale.x = this.switch.scale.y = 1;
    this.addChild(this.switch);

    // Initialize state
    this.setState(isToggledOn);
};
// ========================= Prototype =========================
MaserUI.ToggleButton.prototype = Object.create(MaserUI.Panel.prototype);
MaserUI.ToggleButton.prototype.constructor = MaserUI.ToggleButton;

// ========================= Methods =========================
MaserUI.ToggleButton.prototype.setState = function (isToggledOn) {
    "use strict";
    this.isToggledOn = isToggledOn;
    if (this.isToggledOn) {
        this.fill.scale.x = this.fill.scale.y = 1;
        this.switch.x = this.backing.width * 0.23;
    }
    else {
        this.fill.scale.x = this.fill.scale.y = 0;
        this.switch.x = this.backing.width * -0.23;
    }
};

MaserUI.ToggleButton.prototype.toggle = function () {
    "use strict";
    if (this.isToggledOn) {
        this.toggleOff();
    }
    else {
        this.toggleOn();
    }
};

MaserUI.ToggleButton.prototype.toggleOn = function () {
    "use strict";
    // Change state
    this.isToggledOn = true;

    // Animate fill
    var fillTween = this.game.add.tween(this.fill.scale);
    fillTween.to({x:1, y:1}, 0.16 * 1000, Phaser.Easing.Cubic.Out);
    fillTween.start();

    // Animate switch
    var switchTween = this.game.add.tween(this.switch);
    switchTween.to({x:this.backing.width * 0.23}, 0.08 * 1000, Phaser.Easing.Cubic.Out);
    switchTween.start();
};

MaserUI.ToggleButton.prototype.toggleOff = function () {
    "use strict";
    // Change state
    this.isToggledOn = false;

    // Animate fill
    var fillTween = this.game.add.tween(this.fill.scale);
    fillTween.to({x:0, y:0}, 0.16 * 1000, Phaser.Easing.Cubic.Out);
    fillTween.start();

    // Animate switch
    var switchTween = this.game.add.tween(this.switch);
    switchTween.to({x:this.backing.width * -0.23}, 0.08 * 1000, Phaser.Easing.Cubic.Out);
    switchTween.start();
};