var TOP_LANE = 64;
var MIDDLE_LANE = 148;
var BOTTOM_LANE = 232;

var PLAYER_START_POS_X = 200;
var PLAYER_START_POS_Y = 401;

var GOAL_POS_X = 201;
var GOAL_POS_Y = -39;

var PLAYER_MOVE_UP = -88;
var PLAYER_MOVE_DOWN = 88;
var PLAYER_MOVE_LEFT = -100;
var PLAYER_MOVE_RIGHT = 100

var GAME_CANVAS_BORDER_LEFT = 0;
var GAME_CANVAS_BORDER_RIGHT = 400;
var GAME_CANVAS_BORDER_TOP = -58;
var GAME_CANVAS_BORDER_BOTTOM = 401;

var ENTITY_WIDTH = 101;
var ENTITY_HEIGHT = 150;

var COLLISION_HITBOX_REDUCE = 2.5;

var maxCreatedEnemies = 3;
var baseEnemySpeed = 20;

var starCount = 0;
var starGoal = 3;

//random number helper function
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//create a set of enemies and assign a 
//random lane, speed and respawn trigger number
function createEnemies() {
    for (var i = 0; i < maxCreatedEnemies; i++) {
        var enemy = new Enemy(randomNum(0,2), baseEnemySpeed * randomNum(5,18), randomNum(0,300));
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
    this.width = ENTITY_WIDTH;
    this.height = ENTITY_HEIGHT;
    this.speed = speed;
    this.x = GAME_CANVAS_BORDER_RIGHT + ENTITY_WIDTH;
    if (lane === 0){
        this.y = TOP_LANE;
    } else if (lane === 1) {
        this.y = MIDDLE_LANE;    
    } else if (lane === 2) {
        this.y = BOTTOM_LANE;
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
        
    if (this.x >= GAME_CANVAS_BORDER_RIGHT + ENTITY_WIDTH && numToRespawn === this.respawnNum) {
        this.x = GAME_CANVAS_BORDER_LEFT - ENTITY_WIDTH;
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
    this.width = ENTITY_WIDTH;
    this.height = ENTITY_HEIGHT;
    this.x = PLAYER_START_POS_X;
    this.y = PLAYER_START_POS_Y;
};

Player.prototype.handleInput = function(key) {
     if (player.x > GAME_CANVAS_BORDER_LEFT) {
        if (key === 'left') {
            this.x += PLAYER_MOVE_LEFT;
        }
     }
     if (player.x < GAME_CANVAS_BORDER_RIGHT) {
        if (key === 'right') {
            this.x += PLAYER_MOVE_RIGHT;
        }
    }
    if (player.y > GAME_CANVAS_BORDER_TOP) {
        if (key === 'up') {
            this.y += PLAYER_MOVE_UP;
        }
    }    
    if (player.y < GAME_CANVAS_BORDER_BOTTOM) {
        if (key === 'down') {
            this.y += PLAYER_MOVE_DOWN;
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

/****************************************************
 * 
 * Star class. Collectable objects player must pick up to advance to next level
 *
 ****************************************************/
var Star = function(lane, xPos) {
    this.sprite = 'images/Star.png';
    this.x = xPos;
    if (lane === 0){
        this.y = TOP_LANE;
    } else if (lane === 1) {
        this.y = MIDDLE_LANE;    
    } else if (lane === 2) {
        this.y = BOTTOM_LANE;
    }
    this.width = ENTITY_WIDTH;
    this.height = ENTITY_HEIGHT;
};

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function createStars() {
    //for (var i = 0; allStars.length < maxCreatedStars; i++){
        var star = new Star(randomNum(0,2), Math.round(randomNum(0,400)/100)*100);
        allStars.push(star);
  //  }
}

/****************************************************
 * 
 * Goal class. The goal player must reach after collecting all the stars to advance to next level
 *
 ****************************************************/
var Goal = function() {
    this.sprite = 'images/Selector.png';
    this.x = GOAL_POS_X;
    this.y = GOAL_POS_Y;
    this.width = ENTITY_WIDTH;
    this.height = ENTITY_HEIGHT;
}

Goal.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allStars = [];
         
var allEnemies = [];

var player = new Player;

var goal = new Goal;
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

