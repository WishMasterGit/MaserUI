MaserUI.ListBox = function (game, settings, atlas, sliderBackImage, sliderImage) {
    "use strict";
    MaserUI.StackPanel.call(this, game, settings);
    this.slider = new MaserUI.Slider(game, {width:settings.width * 0.2, height:settings.height},atlas, sliderBackImage, sliderImage);
    this.slider.setAlignment([MaserUI.Panel.Alignment.right,MaserUI.Panel.Alignment.top]);
    this.slider.setPivot(new Phaser.Point(1, 0));
    this.slider.setRelativeSize(0.2, 0.99);
    this.slider.restrictWidthStretching = true;
    this.addChild(this.slider);
    this.slider.valueChanged.add(this.onScroll, this);
};
MaserUI.ListBox.prototype = Object.create(MaserUI.StackPanel.prototype);
MaserUI.ListBox.prototype.constructor = MaserUI.ListBox;
MaserUI.ListBox.prototype.onScroll = function (value) {
    "use strict";
    var nextPosition = (this.totalHeight - this.height/this.scale.y) * value;

    if (this.height/this.scale.y <= (this.totalHeight - nextPosition)) {
        this.startPosition = -nextPosition;
    }
};

/**
 * Bring slider element to the top of the display
 */
MaserUI.ListBox.prototype.bringSliderToTop = function () {
    "use strict";
    if (this.slider !== null) {
        this.addChild(this.slider);
    }
};