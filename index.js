const canvas = document.getElementById('gameplay');
const ctx = canvas.getContext('2d');    
let requestId;
let vampireFrames = 0;
let gravity = 9.8;

function clearCanvas (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function vampireAnimation (){ 
    if (vampireFrames % 5 === 0){

    }
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
        this.x =  40;
        this.y = canvas.height - 200;
        this.vx = 0;
        this.vy = 0;
        this.animate = 0; // Movimiento de izquierda a derecha
        this.position = 0;
        this.jumpStreng = 10;
        this.hp = 3;
        this.img = new Image();
        this.img.src = '/sources/vampireWalk.png'
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
            (this.animate * 1024) / 8,
            this.position,
            1024/8,
            128,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    moveLeft() {
        this.vx -= 3;
        this.position = 1;
    }
    
    moveRight() {
        this.vx += 3;
        this.position = 2;
    }

    jump(){
        this.vy = -2*this.jumpStreng;
    }

}

// INSTANCES
const background = new Background();
const vampire = new Vampire();

// LISTENERS

document.addEventListener('Keydown', e => {
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