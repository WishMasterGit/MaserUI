var Boot = function () {
};

Boot.prototype = {

    preload: function () {
        "use strict";
        console.log("boot started");
    },

    create: function () {
        "use strict";
        this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.state.start('Demo');
    }
};

module.exports = Boot;
