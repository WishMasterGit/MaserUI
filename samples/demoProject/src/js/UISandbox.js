/**
 * The class used for testing the game ui layout will be extracted to the own module soon
 * @param game - instance of the game
 * @constructor
 */
var UISandbox = function (game) {
    "use strict";
    this.game = game;

};

UISandbox.prototype = {
    worldTransformDemo: function () {

        var rootPanel = new Panel(this.game,{
            width:100,
            height:100,
            backColor:"#FFFF00",
            alignment:[Panel.Alignment.center],
            pivot:[0.5,0.5]
        });

        var panel = new Panel(this.game, {
            width:50,
            height:50,
            backColor:"00FF00",
            alignment:[Panel.Alignment.center],
            pivot:[0.5,0.5]
        });

        var panel1 = new Panel(this.game, {
            width:25,
            height:25,
            backColor:"#FF0000",
            alignment:[Panel.Alignment.center],
            pivot:[0.5,0.5]
        });
        panel1.scale.x = 1.2;
        panel1.scale.y = 1.2;
        panel.addChild(panel1);


        rootPanel.scale.x = 2.5;
        rootPanel.scale.y = 2.5;
        rootPanel.addChild(panel);
        //rootPanel.setRelativeSize(0.5, 0.5);
        this.game.add.existing(rootPanel);
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
    },
    stackPanelTest: function () {
        "use strict";
        var stackPanel = new StackPanel(this.game, {
            width:100,
            height:220,
            backColor:"#FFFFFF",
            alignment:[Panel.Alignment.center],
            pivot:[0.5,0.5]
        });
        var panel = new Panel(this.game, {
            width:100,
            height:100,
            backColor:"#FF0000"
        });
        stackPanel.addItem(panel);
        var panel = new Panel(this.game, {
            width:100,
            height:100,
            backColor:"#FFFF00"
        });
        stackPanel.addItem(panel);
        var panel = new Panel(this.game, {
            width:100,
            height:100,
            backColor:"#FF00FF"});
        var panel1 = new Panel(this.game, {
            width:50,
            height:50, backColor:"#0000FF"});
        panel.addChild(panel1);
        stackPanel.addItem(panel);
        stackPanel.scale.x = 1.5;
        stackPanel.scale.y = 1.5;
        this.game.add.existing(stackPanel);
    },
    sliderTest: function () {
        "use strict";
        var slider = new Slider(this.game, {width:100,height:500},"gameAtlas", "clues_scrollbar_line.png", "clues_scrollbar_nub.png");
        slider.setAlignment([Panel.Alignment.right]);
        slider.setRelativeSize(.2, 1);
        slider.setPivot(new Phaser.Point(0.5, 0.5));
        this.game.add.existing(slider);
    },
    listBoxTest: function () {
        "use strict";
        var listBox = new ListBox(this.game, {width:100, height:500}, "gameAtlas", "clues_scrollbar_line.png", "clues_scrollbar_nub.png");
        listBox.setAlignment([Panel.Alignment.center]);
        listBox.setPivot(new Phaser.Point(0.5, 0.5));

        var panel = new Panel(this.game, {width:100, height:100, backColor:"#FF0000"});
        listBox.addItem(panel);
        var panel = new Panel(this.game, {width:100, height:100, backColor:"#FFFF00"});
        listBox.addItem(panel);
        var panel = new Panel(this.game, {width:100, height:100, backColor:"#FF0000"});
        listBox.addItem(panel);
        var panel = new Panel(this.game, {width:100, height:100, backColor:"#FFFF00"});
        listBox.addItem(panel);
        var panel = new Panel(this.game, {width:100, height:100, backColor:"#FF0000"});
        listBox.addItem(panel);
        var panel = new Panel(this.game, {width:100, height:100, backColor:"#FFFF00"});
        listBox.addItem(panel);
        var panel = new Panel(this.game, {width:100, height:100, backColor:"#FF0000"});
        listBox.addItem(panel);
        var panel = new Panel(this.game, {width:100, height:100, backColor:"#FFFF00"});
        listBox.addItem(panel);
        var panel = new Panel(this.game, {width:100, height:100, backColor:"#FF0000"});
        listBox.addItem(panel);
        var panel = new Panel(this.game, {width:100, height:100, backColor:"#FFFF00"});
        listBox.addItem(panel);
        var panel = new Panel(this.game, {width:100, height:100, backColor:"#FF00FF"});
        var panel1 = new Panel(this.game, {width:50, height:50, backColor:"#0000FF"});

        panel.addChild(panel1);
        listBox.addItem(panel);
        listBox.scale.y = 1.2;
        listBox.scale.x = 1.2;
        this.game.add.existing(listBox);
    }
};