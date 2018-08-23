 let gameScene = new Phaser.Scene('Game');

 let config = {
   type: Phaser.AUTO,
   width: 800,
   height: 600,
   backgroundColor: "#b8f1f2",

   physics:{
     default: 'arcade',
     arcade:{
       gravity: 0
     }
   },
   scene:{
     preload: preload,
     create: create,
     update:update
   }

 };


 // declare variable
let player;
let enemy;
let bananaGroup;
let txtPlayerLife;
let txtBananaCollected;

let currentBanana = 0;
let allBananas  = 15;

let playerLives = 0;
let playerHealth = 100;
let arrowControls;

let gameOver = false;

let game = new Phaser.Game(config);


function preload(){
   this.load.image('player','assets/lady.png');
   this.load.image('banana','assets/banana.png');
   this.load.image('monkey','assets/monkey.png');

}

function create(){
  player = this.physics.add.image(400, 300, 'player');
  player.setScale(0.25);

  enemy = this.physics.add.image(100,100,'monkey');
  enemy.setScale(0.25);

  this.physics.world.enable([enemy]);

  enemy.body.setVelocity(100, 200).setBounce(1,1).setCollideWorldBounds(true);

  player.setCollideWorldBounds(true);

  bananaGroup = this.physics.add.staticGroup({
    key: 'banana',
    frameQuantity:20,
    immovable: true
  });

   let bananaChildren = bananaGroup.getChildren();

    for(let a = 0; a < bananaChildren.length; a++){
      //declare the co-ordinate ,set the min and max of  y and x
      let x = Phaser.Math.Between(50,790);
      let y = Phaser.Math.Between(50,550);
      bananaChildren[a].setPosition(x,y);
    }

    bananaGroup.refresh();

    //display the banana playerCollected and player's lives
    txtBananaCollected = this.add.text(10, 10, 'Bananas Collected: 0', { font: '14px Courier', fill: '#000000' });
    txtPlayerLife = this.add.text(10, 30, 'Player Health: 3', { font: '14px Courier', fill: '#000000' });
    gameOver = this.add.text(250, 300, ' ', { font: '50px Courier', fill: '#000000' });

    //declare arrow keys as player controller
    arrowControls = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(player,bananaGroup,playerCollectsBananas);
    this.physics.add.collider(player,enemy,playerEnemyCol,null,this);
  /*  if(this.physics.add.collider(player,enemy,callback)){
      console.log("collide");
      this.physics.pause();
      playerHealth = 0;

      player.setTint(0xff0000);
      gameOver.setText('Game Over');
      gameOver = true;
    }*/
    //

}



function update(){

    txtBananaCollected.setText('Bananas Collected: ' + currentBanana);
    txtPlayerLife.setText('Player Health: ' + playerHealth);

    // if (gameOver)
    // {
    //     return;
    // }

    player.setVelocity(0);

    if (arrowControls.left.isDown)
    {
        player.setVelocityX(-200);
    }
    else if (arrowControls.right.isDown)
    {
        player.setVelocityX(200);
    }

    if (arrowControls.up.isDown)
    {
        player.setVelocityY(-200);
    }
    else if (arrowControls.down.isDown)
    {
        player.setVelocityY(200);
    }
}

function playerCollectsBananas(player, banana){
  //destory banana
    bananaGroup.killAndHide(banana);
  //disable body of the destoried banana
    banana.body.enable  = false;
    currentBanana = Phaser.Math.MaxAdd(currentBanana, 1, allBananas);
  //txtBananaCollected.setText('Bananas Collected: ' + currentBanana);
  //currentHealth = Phaser.Math.MaxAdd(currentHealth, 10, maxHealth)
  //banana.body.enable  = false;

}

 function playerEnemyCol(player, enemy){
   console.log("collide");
   this.physics.pause();
   playerHealth = 0;

   player.setTint(0xff0000);
   gameOver.setText('Game Over');
   //gameOver = true;

}
