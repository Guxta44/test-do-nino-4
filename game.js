const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 300,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 500 }, debug: false }
    },
    scene: { preload, create, update }
};

let dino, cursors, ground, obstacles, scoreText, score = 0;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('ground', 'ground.png');
    this.load.image('dino', 'dino.png');
    this.load.image('cactus', 'cactus.png');
}

function create() {
    ground = this.add.tileSprite(400, 280, 800, 40, 'ground');
    this.physics.add.existing(ground, true);

    dino = this.physics.add.sprite(100, 250, 'dino').setScale(0.5);
    dino.setCollideWorldBounds(true);
    dino.setGravityY(1000);

    obstacles = this.physics.add.group();
    
    cursors = this.input.keyboard.createCursorKeys();
    
    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#000' });
    
    this.physics.add.collider(dino, ground);
    this.physics.add.collider(dino, obstacles, gameOver, null, this);
    
    this.time.addEvent({ delay: 1500, callback: spawnObstacle, callbackScope: this, loop: true });
}

function update() {
    if (cursors.space.isDown && dino.body.touching.down) {
        dino.setVelocityY(-400);
    }
    ground.tilePositionX += 5;
    score += 1;
    scoreText.setText('Score: ' + score);
}

function spawnObstacle() {
    let obstacle = obstacles.create(800, 260, 'cactus').setScale(0.5);
    obstacle.setVelocityX(-200);
    obstacle.setCollideWorldBounds(false);
}

function gameOver() {
    this.physics.pause();
    scoreText.setText('Game Over! Score: ' + score);
}
