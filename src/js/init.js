var State = {
  Boot: require('./states/boot.js')
};

/**
 * Initialization file...where the magic happens.
 */
(function() {
  'use strict';

  var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

  game.state.add('Boot', State.Boot);
  game.state.start('Boot');
})();
