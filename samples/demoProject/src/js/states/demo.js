var MaserUI = require("../../../../../build/maserUI");
var Panel = MaserUI.Panel;
var Demo = function () {
    "use strict";
};
module.exports = Demo;

// ========================= Prototype =========================
Demo.prototype = {

    // region ========================= Creation =========================
    create: function () {
        "use strict";
        this.panelsDemo();
    },
    panelsDemo: function () {
        "use strict";
        var rootPanel = new Panel(this.game, {
            backColor:"#FF0000",
            alignment:[Panel.Alignment.center],
            pivot:[0.5,0.5],
            relativeSize:[0.5,0.5]
        });
        rootPanel.scale.x = 0.5;
        rootPanel.scale.y = 0.5;

        var panel = new Panel(this.game, {
            width:50,
            height:50,
            backColor:"00FF00",
            alignment:[Panel.Alignment.left],
            pivot:[0,0.5]
        });
        rootPanel.addChild(panel);

        var panel = new Panel(this.game, {
            width:50,
            height:50,
            backColor:"#00FF00",
            alignment:[Panel.Alignment.right],
            pivot:[1,0.5]
        });
        rootPanel.addChild(panel);

        var panel = new Panel(this.game, {
            width:50,
            height:50,
            backColor:"#00FF00",
            alignment:[Panel.Alignment.top],
            pivot:[0.5,0]
        });
        rootPanel.addChild(panel);

        var panel = new Panel(this.game, {
            width:50,
            height:50,
            backColor:"#00FF00",
            alignment:[Panel.Alignment.bottom],
            pivot:[0.5,1]
        });
        rootPanel.addChild(panel);

        var panel1 = new Panel(this.game, {
            width:50,
            height:50,
            backColor:"#0000FF",
            alignment:[Panel.Alignment.center],
            pivot:[0.5,0.5]
        });
        rootPanel.addChild(panel1);
        var centerBottom = new Panel(this.game, {
            width:50,
            height:50,
            backColor:"#00FFFF",
            pivot:[0.5,0.5],
            alignment:[Panel.Alignment.center]

        });
        centerBottom.setLinkedAnchors(undefined,panel1,undefined,panel);
        rootPanel.addChild(centerBottom);

        var panel1 = new Panel(this.game, {
            width:20,
            height:20,
            backColor:"#FFFFFF",
            alignment:[Panel.Alignment.center],
            pivot:[0.5,0.5]
        });
        panel.addChild(panel1);

        var leftTop = new Panel(this.game, {
            backColor:"#FFFF00",
            alignment:[Panel.Alignment.top, Panel.Alignment.left],
            relativeSize:[0.1,0.1]
        });
        this.game.add.existing(leftTop);

        var rightTop = new Panel(this.game, {
            backColor:"#FFFF00",
            alignment:[ Panel.Alignment.right, Panel.Alignment.top],
            pivot:[1, 0],
            relativeSize:[0.1, 0.1]
        });
        this.game.add.existing(rightTop);

        var leftBottom = new Panel(this.game, {
            backColor:"#FFFF00",
            alignment:[Panel.Alignment.bottom, Panel.Alignment.left],
            pivot:[0,1],
            relativeSize:[0.1,0.1]
        });
        this.game.add.existing(leftBottom);

        var rightBottom = new Panel(this.game, {
            backColor:"#FFFF00",
            alignment:[Panel.Alignment.bottom, Panel.Alignment.right],
            pivot:[1,1],
            relativeSize:[0.1,0.1]
        });
        this.game.add.existing(rightBottom);

        var bottomPanel = new Panel(this.game, {
            width:300,
            height:50,
            backColor:"#00FFFF",
            pivot:[0.5,1]
        });
        bottomPanel.setLinkedAnchors(leftBottom,undefined,rightBottom);
        this.game.add.existing(bottomPanel);

        var leftPanel = new Panel(this.game, {
            width:300,
            height:50,
            backColor:"#00FFFF",
            pivot:[0,0]

        });
        leftPanel.setLinkedAnchors(undefined,leftTop,undefined,leftBottom);
        this.game.add.existing(leftPanel);

        this.game.add.existing(rootPanel);
    }

    // endregion


};
