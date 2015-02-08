(function(){

/**
 * @namespace MaserUI
 */
var MaserUI = MaserUI || {
        VERSION: 0.1
    };
/**
 * @class Panel
 * @constructor
 * @extends Phaser.Image
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {Object} [settings] - settings for ui panel
 * @param {string} [settings.backAtlas] - if you want to set background image, you should set atlas and back imqge
 * @param {string} [settings.backImage] - if you want to set background image, you should set atlas and back imqge
 * @param {string} [settings.backColor] - if you want to have solid background color, set this to "#FFFFFF" color format, if you will leave this empty as well as images panel will be transparent
 * @param {number} [settings.width] - absolute width
 * @param {number} [settings.height] - absolute height
 * @param {number[]} [settings.relativeSize] - array of two numbers from 0 to 1, for width and height accordingly, for example [0.5,0.5] if one of them 0 than than absolute size will be used instead
 * @param {Panel.Alignment[]} [settings.alignment] - array of alignments that will be assigned to the object
 * @param {number[]} [settings.heightBounds] - array of height bounds [min,max] 0 - means that there no bound
 * @param {number[]} [settings.widthBounds] - array of width bounds [min,max] 0 - means that there no bound
 * @param {Panel.StretchOptions} [settings.stretch] stretching option (fill,uniform etc..)
 * @param {number[]} [settings.pivot] pivot point, array contains two numbers for width and height, from 0 to 1, for example [1,1]
 * @param {number[]} [settings.margins] left, top, right, bottom
 */
MaserUI.Panel = function (game, settings) {
    "use strict";
    this.game = game;
    this.settings = {};
    this.assignSettings(settings);

    // Set default image to a texture
    if (this.settings.backAtlas && this.settings.backImage) {
        Phaser.Image.call(this, this.game, 0, 0, this.settings.backAtlas, this.settings.backImage);
        // If we loaded an image and we are not overriding the dimensions, then set the original size to the image's size
        if (!this.settings.width && !this.settings.height) {
            this.settings.originalSize.x = this.width;
            this.settings.originalSize.y = this.height;
        }
    }
    // Or draw a colored rectangle to represent this panel
    else if (this.settings.backColor !== null && this.settings.backColor !== undefined) {
        this.setBackColor.call(this, this.settings.width, this.settings.height, this.settings.backColor);
        Phaser.Image.call(this, game, 0, 0, this.backColor);
    }
    // If no image settings were passed, then draw a yellow rectangle
    else {
        this.setBackColor.call(this, this.settings.width, this.settings.height, "0xfff000", 0);
        Phaser.Image.call(this, game, 0, 0, this.backColor);
    }
};

MaserUI.Panel.prototype = Object.create(Phaser.Image.prototype);
MaserUI.Panel.prototype.constructor = MaserUI.Panel;

/**
 * Panel.Alignment array contains information about anchor
 * @type {*[]}
 */
MaserUI.Panel.prototype.alignment = "free";

// ========================= Settings =========================
/**
 * @method MaserUI.Panel#assignSettings
 * @memberof MaserUI.Panel
 * @param settings
 */
MaserUI.Panel.prototype.assignSettings = function(settings){
    "use strict";
    this.settings = settings;
    if(this.settings == null) { // jshint ignore:line
        this.settings = {};
    }
    var result = this.settings;
    if (!result.alignment) { result.alignment = [MaserUI.Panel.Alignment.free]; }
    if (!result.margins) { result.margins = [0, 0, 0, 0]; }
    if (!result.restrictWidthStretching) { result.restrictWidthStretching = false; }
    if (!result.restrictHeightStretching) { result.restrictHeightStretching = false; }
    if (!result.stretch) { result.stretch = MaserUI.Panel.StretchOptions.none; }
    if (!result.widthBounds) { result.widthBounds = []; }
    if (!result.heightBounds) { result.heightBounds = []; }

    // Points
    if (!result.offset) { result.offset = new Phaser.Point(0, 0); }
    else { result.offset = new Phaser.Point(result.offset[0], result.offset[1]); }
    if (!result.pivot) { result.pivot = new Phaser.Point(0,0); }
    else { result.pivot = new Phaser.Point(result.pivot[0],result.pivot[1]); }
    if (!result.width && !result.height) { result.originalSize = new Phaser.Point(1, 1); }
    else { result.originalSize = new Phaser.Point(result.width, result.height); }
    if (!result.relativeSize) { result.relativeSize = new Phaser.Point(0, 0); }
    else { result.relativeSize = new Phaser.Point(result.relativeSize[0], result.relativeSize[1]); }
};


// ========================= Properties =========================
/**
 * Alignment array that contains values for current panel (top,bottom,left,right)
 * which will be use to set the anchor position for the panel
 */
Object.defineProperty(MaserUI.Panel.prototype, "Alignment", {
    get: function () {
        "use strict";
        return this.settings.alignment;
    },
    set: function (value) {
        "use strict";
        this.setAlignment(value);
    }
});

Object.defineProperty(MaserUI.Panel.prototype, "Offset", {
    get: function () {
        "use strict";
        return this.settings.offset;
    },
    set: function (value) {
        "use strict";
        this.setOffset(value);
    }
});

Object.defineProperty(MaserUI.Panel.prototype, "OriginalSize", {
    get: function () {
        "use strict";
        return this.settings.originalSize;
    },
    set: function (value) {
        "use strict";
        this.settings.originalSize = value;
    }
});

Object.defineProperty(MaserUI.Panel.prototype, "ParentWidth", {
    get: function () {
        "use strict";
        return this.parent.width;
    }
});

Object.defineProperty(MaserUI.Panel.prototype, "ParentHeight", {
    get: function () {
        "use strict";
        return this.parent.height;
    }
});

/**
 * Size relative to parent container, set Phaser.Point with values from [0,0] to [0,1]
 * if set "undefined" will use absolute size,
 */
Object.defineProperty(MaserUI.Panel.prototype, "RelativeSize", {
    get: function () {
        "use strict";
        return this.settings.relativeSize;
    },
    set: function (value) {
        "use strict";
        this.settings.relativeSize = value;
    }
});

Object.defineProperty(MaserUI.Panel.prototype, "RestrictHeightStretching", {
    get: function () {
        "use strict";
        return this.settings.restrictHeightStretching;
    },
    set: function (value) {
        "use strict";
        this.settings.restrictHeightStretching = value;
    }
});

Object.defineProperty(MaserUI.Panel.prototype, "RestrictWidthStretching", {
    get: function () {
        "use strict";
        return this.settings.restrictWidthStretching;
    },
    set: function (value) {
        "use strict";
        this.settings.restrictWidthStretching = value;
    }
});

Object.defineProperty(MaserUI.Panel.prototype, "Stretch", {
    get: function () {
        "use strict";
        return this.settings.stretch;
    },
    set: function (value) {
        "use strict";
        this.settings.stretch = value;
    }
});


// ========================= Getters =========================
MaserUI.Panel.prototype.getMargin = function (alignment) {
    "use strict";
    switch(alignment) {
        case MaserUI.Panel.Alignment.left: return this.settings.margins[0];
        case MaserUI.Panel.Alignment.top: return this.settings.margins[1];
        case MaserUI.Panel.Alignment.right: return this.settings.margins[2];
        case MaserUI.Panel.Alignment.bottom: return this.settings.margins[3];
        default: return 0;
    }
};

// ========================= Setters =========================
/**
 * Array that contains Panel.Alignment settings
 * @param alignmentArray
 */
MaserUI.Panel.prototype.setAlignment = function (alignmentArray) {
    "use strict";
    this.settings.alignment = alignmentArray;
};

/**
* [private] sets the back color of the panel if there no back color then transparent
* @param width
* @param height
* @param backColor
*/
MaserUI.Panel.prototype.setBackColor = function (width, height, backColor, alpha) {
    "use strict";
    this.backColor = this.game.make.bitmapData(width, height);

    if (!backColor) {
        this.color = {
            a: 0,
            b: 0,
            r: 0,
            g: 0
        };
    }
    else {
        this.color = Phaser.Color.hexToColor(backColor);
        if (alpha === null || alpha === undefined) {
            this.color.a = 1;
        }
        else {
            this.color.a = alpha;
        }
    }
    this.backColor.fill(this.color.r, this.color.g, this.color.b, this.color.a);
};

MaserUI.Panel.prototype.setBackImage = function (backAtlas, backImage) {
    "use strict";
    //if(this.backgroundImage === null || this.backgroundImage === undefined){
    //    this.loadTexture
    this.loadTexture(backAtlas, backImage);
    //Phaser.Image.call(this, this.game, 0, 0,  backAtlas, backImage);
    //}
    //else{
    //this.backgroundImage.loadTexture(backAtlas,backImage);
    //}
};

/**
 * sets height bounds, if min = 0 - there now min bound (absolute or relative size will be used instead,
 * if max == 0 - there no max limitation(absolute or relative size will be used instead)
 * @param min
 * @param max
 */
MaserUI.Panel.prototype.setHeightBounds = function (min, max) {
    "use strict";
    this.settings.heightBounds = [min, max];
};

MaserUI.Panel.prototype.setLinkedAnchors = function (left, top, right, bottom) {
    "use strict";
    this.linkedLeft = left;
    this.linkedTop = top;
    this.linkedRight = right;
    this.linkedBottom = bottom;
};

MaserUI.Panel.prototype.setMargins = function (left, top, right, bottom) {
    "use strict";
    this.settings.margins = [left, top, right, bottom];
};

MaserUI.Panel.prototype.setOffset = function (offset) {
    "use strict";
    this.settings.offset = offset;
};

/**
 * Set the pivot point of the panel values from [0,0] to [1,1]
 * @param pivotPoint
 */
MaserUI.Panel.prototype.setPivot = function (pivotPoint) {
    "use strict";
    this.settings.pivot = pivotPoint;
};

/**
 * Sets relative size
 * @param width
 * @param height
 */
MaserUI.Panel.prototype.setRelativeSize = function (width, height) {
    "use strict";
    this.settings.relativeSize = new Phaser.Point(width, height);
};

/**
 * sets width bounds, if min = 0 - there now min bound (absolute or relative size will be used instead,
 * if max == 0 - there no max limitation(absolute or relative size will be used instead)
 * @param min
 * @param max
 */
MaserUI.Panel.prototype.setWidthBounds = function (min, max) {
    "use strict";
    this.settings.widthBounds = [min, max];
};


// ========================= Checks =========================
MaserUI.Panel.prototype.checkPanelBounds = function () {
    "use strict";
    if (this.width < this.settings.widthBounds[0] && this.settings.widthBounds[0] !== 0) {
        this.width = this.settings.widthBounds[0];
    }
    if (this.width > this.settings.widthBounds[1] && this.settings.widthBounds[1] !== 0) {
        this.width = this.settings.widthBounds[1];
    }
    if (this.height < this.settings.heightBounds[0] && this.settings.heightBounds[0] !== 0) {
        this.height = this.settings.heightBounds[0];
    }
    if (this.height > this.settings.heightBounds[1] && this.settings.heightBounds[1] !== 0) {
        this.height = this.settings.heightBounds[1];
    }
};

MaserUI.Panel.prototype.checkLinkedAnchors = function () {
    "use strict";
};


// ========================= Update =========================
/**
 * Whenever a panel adds a child, it will immediately update the child's transform and size
 * @param child
 */
MaserUI.Panel.prototype.addChild = function (child) {
    "use strict";
    Phaser.Image.prototype.addChild.call(this, child);
    //if (typeof child.updateTransform === "function") {
    //    child.updateTransform();
    //}
};

// ========================= Update =========================
MaserUI.Panel.prototype.update = function () {
    "use strict";
    //this.processSize();
    for (var i = 0, len = this.children.length; i < len; i++) {
        this.children[i].update();
    }
};

MaserUI.Panel.prototype.updateTransform = function () {
    "use strict";
    if (!this.visible) { return; }
    this.displayObjectUpdateTransform();

    //PIXI.DisplayObject.prototype.updateTransform.call( this );
    if (this._cacheAsBitmap) { return; }
    for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i].updateTransform();
    }
};

MaserUI.Panel.prototype.displayObjectUpdateTransform = function () {
    "use strict";

    //this.height = this.parent.height;

    // Create some matrix refs for easy access
    var pt = this.parent.worldTransform;
    var wt = this.worldTransform;
    // Temporary matrix variables
    var a, b, c, d, tx, ty;

    // This gets the real width of parent and child
    var width = this.texture.frame.width;
    var height = this.texture.frame.height;
    var parentWidth = this.parent.width;
    var parentHeight = this.parent.height;
    if (this.parent.texture) {
        parentWidth = this.parent.texture.frame.width;
        parentHeight = this.parent.texture.frame.height;
    }

    var w0 = parentWidth * (1 - this.anchor.x);
    var w1 = parentWidth * -this.anchor.x;

    var h0 = parentHeight * (1 - this.anchor.y);
    var h1 = parentHeight * -this.anchor.y;

    var x3 = pt.a * w0 + pt.c * h0; // parent width
    var y3 = pt.d * h0 + pt.b * w0; // parent height

    //console.log("values",w0,w1,h0,h1,x1,y1,x2,y2,x3,y3,x4,y4,this.scale.x,this.scale.y,this.settings.originalSize.x,this.settings.originalSize.y,width,height,this.settings.stretch);
    //I f the panel is set to a relative size, this is what will happen
    if (this.settings.relativeSize) {
        if (this.settings.relativeSize.x !== 0) {
            this.scale.x = (x3 * this.settings.relativeSize.x) / width;
        }
        if (this.settings.relativeSize.y !== 0) {
            this.scale.y = (y3 * this.settings.relativeSize.y) / height;
        }
        if(this.restrictWidthStretching && this.scale.x > this.scale.y){
            this.scale.x = this.scale.y;
        }
        if(this.restrictHeightStretching){console.log("restr",this.restrictHeightStretching  ,this.scale.y ,this.scale.x);}
        if(this.restrictHeightStretching  && this.scale.y > this.scale.x){
            this.scale.y = this.scale.x;
        }
    }

    // Panels can't be both relative size and stretching, so if this will override the relative size if it's set
    // Add some sort of scaling rule
    var scale;
    switch (this.settings.stretch) {
        case MaserUI.Panel.StretchOptions.fill:
            //this.scale.x = pt.a;
            //this.scale.y = pt.d;
            this.width = x3;
            this.height = y3;
            break;

        case MaserUI.Panel.StretchOptions.uniform:
            if (this.settings.relativeSize.x !== 0) {
                this.scale.x = this.scale.y = Math.min(x3 * this.settings.relativeSize.x / this.settings.originalSize.x, y3 / this.settings.originalSize.y);
            }
            else if (this.settings.relativeSize.y !== 0) {
                this.scale.x = this.scale.y = Math.min(x3 / this.settings.originalSize.x, y3 * this.settings.relativeSize.y / this.settings.originalSize.y);
            }
            else {
                this.scale.x = this.scale.y = Math.min(x3 * this.settings.relativeSize.x / this.settings.originalSize.x, y3 * this.settings.relativeSize.y / this.settings.originalSize.y);
            }
            break;

        case MaserUI.Panel.StretchOptions.uniformToFill:
            this.scale.x = 1 / this.parent.scale.x;
            this.scale.y = 1 / this.parent.scale.y;
            var ratioH = this.width / this.height;
            var ratioV = this.height / this.width;
            if (this.parent.width >= this.parent.height && this.width !== this.parent.width) {
                this.width = this.ParentWidth;
                this.height = this.ParentWidth * ratioV;

            }
            else if (this.parent.width < this.parent.height && this.height !== this.parent.height) {
                this.height = this.ParentHeight;
                this.width = this.ParentHeight * ratioH;
            }
            break;

    }

    this.checkPanelBounds();

    // calculating final transformation matrix based on above settings
    a = this.scale.x;
    d = this.scale.y;
    wt.a = a * pt.a;
    wt.b = a * pt.b;
    wt.c = d * pt.c;
    wt.d = d * pt.d;

    tx = this.position.x - this.settings.pivot.x * width * a;
    ty = this.position.y - this.settings.pivot.y * height * d;

    var gwt = this.game.stage.worldTransform;
    wt.a = a * gwt.a;
    wt.b = a * gwt.b;
    wt.c = d * gwt.c;
    wt.d = d * gwt.d;

    wt.tx = tx * pt.a + ty * pt.c + pt.tx;
    wt.ty = tx * pt.b + ty * pt.d + pt.ty;


    // Anchoring once the scale has been applied
    if (this.settings.alignment.indexOf(MaserUI.Panel.Alignment.free) < 0) {
        if (this.settings.alignment.indexOf(MaserUI.Panel.Alignment.center) >= 0) {
            wt.tx = x3 * 0.5 + pt.tx + tx;
            wt.ty = y3 * 0.5 + pt.ty + ty;
        }
        if (this.settings.alignment.indexOf(MaserUI.Panel.Alignment.top) >= 0) {
            if (this.settings.alignment.length === 1) {
                wt.tx = x3 * 0.5 + pt.tx + tx;
            }
            wt.ty = pt.ty + ty;
        }
        if (this.settings.alignment.indexOf(MaserUI.Panel.Alignment.bottom) >= 0) {
            if (this.settings.alignment.length === 1) {
                wt.tx = x3 * 0.5 + pt.tx + tx;
            }
            wt.ty = y3 + pt.ty + ty;
        }
        if (this.settings.alignment.indexOf(MaserUI.Panel.Alignment.left) >= 0) {
            wt.tx = pt.tx + tx;
            if (this.settings.alignment.length === 1) {
                wt.ty = y3 * 0.5 + pt.ty + ty;
            }
        }
        if (this.settings.alignment.indexOf(MaserUI.Panel.Alignment.right) >= 0) {
            wt.tx = x3 + pt.tx + tx;
            if (this.settings.alignment.length === 1) {
                wt.ty = y3 * 0.5 + pt.ty + ty;
            }
        }
    }

    var bounds;

    if (this.linkedLeft) {
        bounds =  this.linkedLeft.getBounds();
        var lwt = this.linkedLeft.worldTransform;
        wt.tx = lwt.tx + bounds.width;
    }
    if (this.linkedRight) {
        bounds =  this.linkedRight.getBounds();
        if( this.settings.alignment.indexOf(MaserUI.Panel.Alignment.right) >= 0) {
            var rwt = this.linkedRight.worldTransform;
            wt.tx = rwt.tx - this.width;
            console.log(rwt.tx , bounds.x , this.width);
        }
        else {
            this.width = bounds.x - wt.tx;
        }
    }
    if (this.linkedTop) {
        bounds =  this.linkedTop.getBounds();
        var twt = this.linkedTop.worldTransform;
        wt.ty = twt.ty + bounds.height;
    }
    if (this.linkedBottom) {
        bounds =  this.linkedBottom.getBounds();
        this.height = bounds.y - wt.ty;
    }

    // multiply the alphas..
    this.worldAlpha = this.alpha * this.parent.worldAlpha;
    //  Custom callback?
    if (this.transformCallback) {
        this.transformCallback.call(this.transformCallbackContext, wt, pt);
    }
};


// ========================= Enums =========================
/**
 * stretching options
 * @type {{fill: string, uniform: string, uniformToFill: string}}
 */
MaserUI.Panel.StretchOptions = {
    none: "none",
    fill: "fill", //fill and skew
    uniform: "uniform", //use smallest width or height
    uniformToFill: "uniformToFill" // use biggest width or height
};
Object.freeze(MaserUI.Panel.StretchOptions);

/**
 * alignment options
 * @type {{free: string, top: string, left: string, right: string, bottom: string, center: string}}
 */
MaserUI.Panel.Alignment = {
    free: "free",
    top: "top",
    left: "left",
    right: "right",
    bottom: "bottom",
    center: "center"
};

Object.freeze(MaserUI.Panel.Alignment);
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
    module.exports = MaserUI;
}).call(this);
