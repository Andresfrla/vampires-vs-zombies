const canvas = document.getElementById('gameplay');
const ctx = canvas.getContext('2d');    
let requestId;
let vampireFrames = 0;
let gravity = 9.0;
let obstacles = []

function clearCanvas (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function vampireAnimation (){ 
    if (vampireFrames % 10 === 0){
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
}

function generateZombies (){
    if (vampireFrames % 150 === 0){
        const randomPosition = Math.floor(Math.random() * canvas.width - 50)
        const zombies = new Zombie(randomPosition);
        obstacles.push(zombies)
    }
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
    checkCollisions();
    if (requestId){
        requestAnimationFrame(updateGame);
    }
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
        this.width = 150;
        this.height = 150;
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
            (this.animate * 640) / 5,
            (this.position * 512) / 4,
            640/5,
            512/4,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    moveLefth() {
        this.vx -= 3;
        if (this.vx < -3) { this.vx = -3}
        this.position = 2;
        if (this.vx === 0){this.position = 0}
    }
    
    moveRigth() {
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
        this.width = 200;
        this.height = 40;
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
        this.width = 150;
        this.height = 150;
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
            (this.animate * 768) / 8,
            (this.position * 192) / 2,
            768/8,
            192/2,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    moveLefth() {
        this.position = 1;
    }
    
    moveRigth() {
        this.position = 0;
    }

    isTouching(obstacle) {
        return (
        this.x < obstacle.x + obstacle.width && this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height && this.y + this.height > obstacle.y
        )
    }
}

// INSTANCES
const background = new Background();
const vampire = new Vampire();
const block = new Block();
const zombies = new Zombie();

// LISTENERS

document.addEventListener('keydown', e => {
    switch (e.keyCode){
    case 37:
        vampire.moveLefth()
        return;
    case 39:
        vampire.moveRigth()
        return;
    case 38:
        vampire.jump()
        return;
}})
