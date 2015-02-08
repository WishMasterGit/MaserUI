var MaserUI = require("../../../../../build/maserUI");
var Demo = function () {
    "use strict";
};
module.exports = Demo;

// ========================= Prototype =========================
Demo.prototype = {

    // region ========================= Creation =========================
    create: function () {
        "use strict";
        var rootPanel = new MaserUI.Panel(this.game,{
            width:100,
            height:100,
            backColor:"#FFFF00",
            alignment:[MaserUI.Panel.Alignment.center],
            pivot:[0.5,0.5]
        });
        this.game.add.existing(rootPanel);
    }

    // endregion


};
