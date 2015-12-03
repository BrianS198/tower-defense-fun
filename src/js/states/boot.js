/**
 * State - Boot
 */
var Boot = function() {};

(function(Boot) {
  'use strict';

  Boot.prototype = {

    /**
     * Phaser Create Method
     */
    create: function() {
      console.log('Game started!');
    }
  };

  return Boot;
})(Boot);

module.exports = Boot;
