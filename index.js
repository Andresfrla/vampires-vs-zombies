const canvas = document.getElementById('gameplay');
const ctx = canvas.getContext('2d');    
let requestId;
let vampireFrames = 0;
let gravity = 9.8;
let blocks = []

function clearCanvas (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function vampireAnimation (){ 
    if (vampireFrames % 5 === 0){
        if (vampire.animate === 16){
            vampire.animate = 0;
        } else {
            vampire.animate++;
        }
    }
}

/* function renderBlock (){
    block.draw();
} */

/*     function plataform () {blocks.forEach((block) => {
        renderBlock(block);
    });*/

function updateGame() {
    vampireFrames++;
    clearCanvas();
    background.draw();
    vampireAnimation();
    vampire.draw();
    vampire.x += vampire.vx; 
    vampire.y += vampire.vy; 
    vampire.y += gravity;
    //plataform()
    // git 
/*     block.draw();  */
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
            (this.animate * 2048) / 16,
            this.position,
            2048/16,
            128,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    moveLefth() {
        this.vx -= 3;
        // limite de velocidad 
    }
    
    moveRigth() {
        this.vx += 3;
    }

    jump(){
        this.vy = -2*this.jumpStreng;
    }

}

class Block {
    constructor() {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.img = new Image();
        this.img.src = '/sources/block.png';
        this.img.onload = () => {
            this.draw()
        }
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

// INSTANCES
const background = new Background();
const vampire = new Vampire();

/* const block = new Block(); */

/* blocks.push(new Block(100, 200, 50, 50)); // First block at position (100, 200)
blocks.push(new Block(300, 150, 80, 40)); // Second block at position (300, 150)
blocks.push(new Block(200, 350, 60, 60)); */ // Third block at position (200, 350)


// LISTENERS

document.addEventListener('keydown', e => {
    console.log(vampire)
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

