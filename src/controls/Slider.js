/**
 * Slider that can be used as a scroll control
 * @param game
 * @param width
 * @param height
 * @param sliderBackImage key of image of slider background
 * @param sliderImage key of image of slider controller
 * @constructor
 */
MaserUI.Slider = function (game, settings, atlas, sliderBackImage, sliderImage) {
    "use strict";
    this.game = game;
    MaserUI.Panel.call(this, game, settings);
    this.sliderImage = new Phaser.Image(this.game, settings.width/2, 0, atlas, sliderImage);
    this.sliderImage.anchor = new Phaser.Point(0.5,0.5);

    this.sliderBackImage = new Phaser.Image(this.game, settings.width/2, 0, atlas, sliderBackImage);
    this.sliderBackImage.anchor = new Phaser.Point(0.5,0);
    this.sliderBackImage.height = settings.height;
    this.valueChanged = new Phaser.Signal();

    this.addChild(this.sliderBackImage);
    this.addChild(this.sliderImage);

    this.inputEnabled = true;
    this.events.onInputUp.add(this.onSliderbackgroundClick, this);

    this.sliderImage.inputEnabled = true;
    this.sliderImage.input.priorityID = 1;
    this.sliderImage.events.onInputDown.add(this.onSlideStart, this);
    this.game.input.onUp.add(this.onSlideEnd, this);

};
MaserUI.Slider.prototype = Object.create(MaserUI.Panel.prototype);
MaserUI.Slider.prototype.constructor = MaserUI.Slider;
MaserUI.Slider.prototype.onSliderbackgroundClick = function () {
    "use strict";
    this.sliderImage.y = this.toLocal(new Phaser.Point(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY)).y;
    var value = this.sliderImage.y / (this.height);
    value = Phaser.Math.roundTo(value, -2);
    value = Phaser.Math.clamp(value, 0, 1);
    this.valueChanged.dispatch(value);
};
MaserUI.Slider.prototype.onSlideStart = function () {
    "use strict";
    this.slide = true;
};
MaserUI.Slider.prototype.onSlideEnd = function () {
    "use strict";
    this.slide = false;
};

MaserUI.Slider.prototype.update = function () {
    "use strict";

    var activePointer = this.game.input.activePointer;
    if (activePointer.isDown && this.slide === true) {
        var y = this.toLocal(new Phaser.Point(activePointer.worldX, activePointer.worldY)).y;
        this.sliderImage.y = y;
    }

    if (this.sliderImage.y <= this.sliderImage.height/2) {
        this.sliderImage.y = this.sliderImage.height/2;
    }
    if (this.sliderImage.y > this.getLocalBounds().height - this.sliderImage.height/2) {
        this.sliderImage.y = this.getLocalBounds().height-this.sliderImage.height/2;
    }

    if (this.slide) {
        var value = (this.sliderImage.y - this.sliderImage.height/2) / (this.getLocalBounds().height - this.sliderImage.height);
        value = Phaser.Math.roundTo(value, -2);
        value = Phaser.Math.clamp(value, 0, 1);
        //this.game.debug.text("value: " + value, 100, 430);
        this.valueChanged.dispatch(value);
    }
    //this.game.debug.spriteInfo(this, 32, 180);
    ////this.game.debug.inputInfo(32, 32);
    //this.game.debug.spriteInputInfo(this, 32, 130);
    //this.game.debug.pointer(activePointer);
    //this.game.debug.spriteBounds(this);
    //this.game.debug.text(this.toLocal(new Phaser.Point(activePointer.worldX, activePointer.worldY)), 100, 380);
   // this.game.debug.text(this.getLocalBounds(), 100, 400);
    //if(this.slide){
    //  if(this.sliderImage.position.y + this.sliderImage.height*0.5 < 0) {
    //      this.sliderImage.position.y = - this.sliderImage.height*0.5 ;
    //      return;
    //  }
    //  if(this.sliderImage.position.y + this.sliderImage.height*0.5 > this.sliderBackImage.height )
    //  {
    //      this.sliderImage.position.y = this.sliderBackImage.height - this.sliderImage.height*0.5 ;
    //  }
    //}
};