var State = {
  boot: require('./states/boot.js')
};

/**
 * Initialization file...where the magic happens.
 */
(function() {
  'use strict';

  var game;

  game = new Phaser.Game(800, 800, Phaser.AUTO, 'game');

  game.state.add('Boot', State.boot);
  game.state.start('Boot');
})();
