var Game = require('containers/game/game.js');

$('.content').html(new Game().render().elem);
