const canvas = document.getElementById('gameplay');
const ctx = canvas.getContext('2d');    
let requestId;
let vampireFrames = 0;
let gravity = 9.0;
let obstacles = []
let PumpkinToAdd = [];

function clearCanvas (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function vampireAnimation (){ 
    if (vampireFrames % 20 === 0){
        if (vampire.animate === 4){
            vampire.animate = 0;
        } else {
            vampire.animate++;
        }
    }
}

function checkCollisions (){
    if (vampire.x <= 0 ){
        vampire.x = canvas.width - vampire.width;
    } else if (vampire.x > canvas.width) {
        vampire.x = 0;
    }

    obstacles.forEach((zombies, i) => {
        if(vampire.isTouching(zombies)){
            obstacles.splice(i, 1);
            vampire.hp--;
        }
    })

    if (vampire.x < block.x + block.width && vampire.x + vampire.width > block.x &&
     vampire.y < block.y + block.height && vampire.y + vampire.height > block.y) {
        vampire.vx = 0;
        vampire.vy = 0;
     }
     

    if (vampire.x < block.x1 + block.width && vampire.x + vampire.width > block.x1 &&
        vampire.y < block.y1 + block.height && vampire.y + vampire.height > block.y1) {
           vampire.vx = 0;
           vampire.vy = 0;
        }
    
}

/* function moveRandomDirection(zombies) {
    const randomDirection = Math.random() < 0.5 ? 'left' : 'right';
  
    if (randomDirection === 'left') {
      zombies.moveLeft();
    } else {
      zombies.moveRight();
    }
  } */

function generateZombies (){
    if (vampireFrames % 150 === 0){
        const randomPosition = Math.floor(Math.random() * canvas.width - 50)
        const zombies = new Zombie(randomPosition);
        obstacles.push(zombies)
/*         moveRandomDirection(zombies); */
    }
}

function generatePumpkin (){
    if (vampireFrames % 500 === 0){
        const randomPosition = Math.floor(Math.random() * canvas.width - 50)
        const pumpkin = new Pumpkin(randomPosition);
        PumpkinToAdd.push(pumpkin)
/*         moveRandomDirection(zombies); */
    }
}
function drawPumpkin (){
    PumpkinToAdd.forEach(pumpkin => pumpkin.draw())
}

function drawZombies(){
    obstacles.forEach(zombies => zombies.draw())
}

function updateGame() {
    vampireFrames++;
    clearCanvas();
    background.draw();
    vampireAnimation();
    vampire.draw();
    vampire.x += vampire.vx; 
    vampire.y += vampire.vy; 
    vampire.y += gravity;
    block.draw(); 
    generateZombies();
    drawZombies(); 
/*     zombies.x += zombies.vx; */
    generatePumpkin ();
    drawPumpkin ();
    checkCollisions();
    drawInfo();
    gameOver();
    if (requestId){
        requestAnimationFrame(updateGame);
    }
}

function gameOver(){
    if (vampire.hp === 0){
        ctx.font = '100px Verdana'
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 2;
        ctx.strokeText('Game Over', canvas.width/2 -300, canvas.height/2)
    }
}

function drawInfo(){
    ctx.font = '24px Verdana'
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 2;
    ctx.strokeText(`HP: ${vampire.hp}`, 50, 30)
}

function startGame(){
    if(!requestId){
        requestId = requestAnimationFrame(updateGame);
    }
}

window.onload = () => {
    startGame();
}

// CLASSES

class Background {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.img = new Image();
        this.img.src = '/sources/Battleground.png';
        this.img.onload = () => {
            this.draw()
        }
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

class Vampire {
    constructor() {
        this.width = 100;
        this.height = 120;
        this.y =  150;
        this.x = 200;
        this.vx = 0;
        this.vy = 0;
        this.animate = 0; // Movimiento de izquierda a derecha
        this.position = 0;
        this.jumpStreng = 14;
        this.hp = 3;
        this.img = new Image();
        this.img.src = '/sources/vampireSprite.png'
        this.img.onload = () => {
            this.draw()
        }
    }

    draw (){
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height 
        } else {
            this.vy++
        } 

        ctx.drawImage(
            this.img,
            (this.animate * 400) / 5,
            (this.position * 450) / 4,
            400/5,
            450/4,
            this.x,
            this.y,
            this.width,
            this.height
        )
        
        //ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Color rojo con transparencia
        //ctx.fillRect(this.x, this.y, 50, 100);
        
    }

    moveLeft() {
        this.vx -= 3;
        if (this.vx < -3) { this.vx = -3}
        this.position = 2;
        if (this.vx === 0){this.position = 0}
    }
    
    moveRight() {
        this.vx += 3;
        if (this.vx > 3) {this.vx = 3}
        this.position = 1;
        if (this.vx === 0){this.position = 0}
    }

    jump(){
        this.vy = -2*this.jumpStreng;
        this.position = 3;
    }

    isTouching(obstacle) {
        return (
        this.x < obstacle.x + obstacle.width && this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height && this.y + this.height > obstacle.y
        )
    }
}

class Block {
    constructor() {
        this.x = 100;
        this.y = 200;
        this.x1 = 500;
        this.y1 = 250;
        this.width = 150;
        this.height = 30;
        this.img = new Image();
        this.img.src = '/sources/block.png';
        this.img.onload = () => {
            this.draw()
        }
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img, this.x1, this.y1, this.width, this.height)
    }

}

class Zombie {
    constructor(x) {
        this.width = 50;
        this.height = 80;
        this.y =  canvas.height;
        this.x = x;
        this.animate = 0; // Movimiento de izquierda a derecha
        this.position = 0;
        this.img = new Image();
        this.img.src = '/sources/zombieSprite.png'
        this.img.onload = () => {
            this.draw()
        }
    }

    draw (){
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height 
        } else {
            this.vy++
        } 

        ctx.drawImage(
            this.img,
            (this.animate * 260) / 8,
            (this.position * 128) / 2,
            260/8,
            128/2,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    moveLeft() {
        this.vx --;
        this.position = 1;
    }
    
    moveRight() {
        this.vx ++;
        this.position = 0;
    }

    isTouching(obstacle) {
        return (
        this.x < obstacle.x + obstacle.width && this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height && this.y + this.height > obstacle.y
        )
    }
}

class Pumpkin {
    constructor(x) {
        this.x = x;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.img = new Image();
        this.img.src = '/sources/pumpkinSprite.png';
    }

    draw() {
        this.y++;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } 
} 

// INSTANCES
const background = new Background();
const vampire = new Vampire();
const block = new Block();
const zombies = new Zombie();
const pumpkin = new Pumpkin();

// LISTENERS

document.addEventListener('keydown', e => {
    switch (e.keyCode){
    case 37:
        vampire.moveLeft()
        return;
    case 39:
        vampire.moveRight()
        return;
    case 38:
        vampire.jump()
        return;
}})
