'use strict';

var game = new Phaser.Game(1600, 1200, Phaser.AUTO, 'Demo'); 

game.state.add('Boot', require('./states/boot'));
game.state.add('Demo', require('./states/demo'));

game.state.start('Boot');