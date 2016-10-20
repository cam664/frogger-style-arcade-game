var topLane = 64;
var middleLane = 148;
var bottomLane = 232;

var playerStartPosX = 200;
var playerStartPosY = 401;

var playerMoveUp = -92;
var playerMoveDown = 92;
var playerMoveLeft = -100;
var playerMoveRight = 100

var blinking = false;

var gameCanvasBorderLeft = 0;
var gameCanvasBorderRight = 400;
var gameCanvasBorderTop = -58;
var gameCanvasBorderBottom = 401;

var entityWidth = 101;
var entityHeight = 171;

var maxCreatedEnemies = 14;
var baseEnemySpeed = 20;

var collisionHitboxReduce = 2.5;

//random number helper function
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//create a set of enemies and assign a 
//random lane, speed and respawn trigger number
function createEnemies() {
    for (var i = 0; i < maxCreatedEnemies; i++) {
        var enemy = new Enemy(randomNum(0,2), baseEnemySpeed * randomNum(5,21), randomNum(0,300));
        allEnemies.push(enemy);
    }
}

// Enemies our player must avoid
var Enemy = function(lane, speed, respawnNum) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = entityWidth;
    this.height = entityHeight;
    this.speed = speed;
    this.x = gameCanvasBorderRight + entityWidth;
    if (lane === 0){
        this.y = topLane;
    } else if (lane === 1) {
        this.y = middleLane;    
    } else if (lane === 2) {
        this.y = bottomLane;
    }
    this.respawnNum = respawnNum;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

//random chance an enemy from allEnemies array will travel across a lane
Enemy.prototype.respawn = function() {
    var numToRespawn = randomNum(0,300);
        
    if (this.x >= gameCanvasBorderRight + entityWidth && numToRespawn === this.respawnNum) {
        this.x = gameCanvasBorderLeft - entityWidth;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.width = entityWidth;
    this.height = entityHeight;
    this.x = playerStartPosX;
    this.y = playerStartPosY;
    this.blinkFrequency = 200;
    this.blinking = false;
};

Player.prototype.handleInput = function(key) {
     if (player.x > gameCanvasBorderLeft) {
        if (key === 'left') {
            this.x += playerMoveLeft;
        }
     }
     if (player.x < gameCanvasBorderRight) {
        if (key === 'right') {
            this.x += playerMoveRight;
        }
    }
    if (player.y > gameCanvasBorderTop) {
        if (key === 'up') {
            this.y += playerMoveUp;
        }
    }    
    if (player.y < gameCanvasBorderBottom) {
        if (key === 'down') {
            this.y += playerMoveDown;
        }
    }    
    console.log(player.x, player.y);
};

Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.blink = function() {
    if (blinking) {
    ctx.filter = 'brightness(120%)';
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

var player = new Player;
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});

