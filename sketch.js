var backgroundImage, bg;
var waiting_screen;
var gameState = 0;
var playButton;
var player, playerImage;
var enemyBulletImage, enemyBulletGroup, enemyBullet2Group, enemyBullet3Group;
var enemy, enemy2, enemy3;
var meteoroid, meteoroidImage;
var boss, bossImage, bossBullet, bossBulletImage;
var bulletImage, bulletGroup;
var playerMoving = false;
var enemyMoving = false;
var life = 3;
var score = 0
var heartImage, heart1, heart2, heart3;
var hellImage, END;



function preload() {
  playerImage = loadImage("./assets/spaceShip.png")
  backgroundImage = loadImage("./assets/background.png");
  bulletImage = loadImage("./assets/bullet.png")

  heartImage = loadImage("./assets/heart.png");
  hellImage = loadImage("./assets/hell.png");

  waiting_screen = loadImage("./assets/backgroundwaiting.png");

  
  enemyBulletImage = loadImage("./assets/es3bullet.png");
  
  meteoroidImage = loadImage("./assets/meteoroids.png");

  bossImage = loadImage("./assets/boss.png");
  bossBulletImage = loadImage("./assets/bossb.png");
  enemyImage = loadImage("./assets/es3.png");
  
  
}

//BP
function setup() {
  canvas = createCanvas(windowWidth,windowHeight);

  bg = createSprite(width/2 + 405 ,height/2,width,2);
  bg.addImage(backgroundImage);
  bg.scale = 2.42
  bg.visible = false;
    
  playButton = createButton("start");
  playButton.position(width/2-100, height/2);
  playButton.class("customButton");

  player = createSprite(width/2 - 100,height/2,40,40);
  player.addImage(playerImage);
  player.scale = .5;
  player.visible = false;
  
  enemy = createSprite(2000, height/2-250,20,20);
  enemy.addImage(enemyImage);
  enemy.scale = 0.4
  enemy.visible = false;
  
  enemy2 = createSprite(2000, height/2,20,20);
  enemy2.addImage(enemyImage);
  enemy2.scale = 0.4
  enemy2.visible = false;
  
  enemy3 = createSprite(2000, height/2 +250,20,20);
  enemy3.addImage(enemyImage);
  enemy3.scale = 0.4
  enemy3.visible = false;

  heart1 = createSprite(width/2 - 100 , height/2-280, 20, 20);
  heart1.addImage(heartImage);
  heart1.scale = .1
  heart1.visible = false;
  
  heart2 = createSprite(width/2 - 40 , height/2-280, 20, 20);
  heart2.addImage(heartImage);
  heart2.scale = .1
  heart2.visible = false;
  
  heart3 = createSprite(width/2 +20 , height/2-280, 20, 20);
  heart3.addImage(heartImage);
  heart3.scale = .1
  heart3.visible = false;
  


  bulletGroup = new Group()
  enemyBulletGroup = new Group();
  enemyBullet2Group = new Group();
  enemyBullet3Group = new Group();
 
}

//BP
function draw() {
 

    if(gameState === 0){
      background(waiting_screen);
        playButton.mousePressed(()=>{
            gameState = 1;
            playButton.hide();
        });
    }
    
    
    if(gameState === 1){
      bg.visible = true;
      player.visible = true;
      enemy.visible = true;
      enemy2.visible = true;
      enemy3.visible = true;
      
      playerMovement();
      enemyConrols();

      if(life === 3){
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
      }
      if(life === 2){
        heart1.visible = true;
        heart2.visible = true;
        heart3.visble = false;
      }
      if(life === 1){
        heart1.visible = true;
        heart2.visible = false;
        heart3.visible = false;
      }

      if(player.position.x <800){
        playerMoving = true;
      }else{
        playerMoving = false;
        
      }
      if(keyWentDown("space")){
        bullet();
      }  


      if(bulletGroup.collide(enemy)){
        score +=1
        //bulletGroup.destroyEach()
        //enemy.destroy();
        //enemyBulletGroup.destroyEach();
      }

      if(bulletGroup.collide(enemy2)){
        score +=1
        //bulletGroup.destroyEach()
        //enemy2.destroy();
        //enemyBullet2Group.destroyEach();
      }

      if(bulletGroup.collide(enemy3)){
        score +=1
        //bulletGroup.destroyEach()
        //enemy3.destroy();
        //enemyBullet3Group.destroyEach();
      }

      if(enemyBulletGroup.collide(player)||enemyBullet2Group.collide(player)||enemyBullet3Group.collide(player)){
        life -=1;
        //player.destroy();
        //enemyBulletGroup.destroyEach();
        //enemyBullet2Group.destroyEach();
        //enemyBullet3Group.destroyEach();
      }

      if(life === 0){
        gameState = END;
        heart1.visible = false;
      }

      if(score === 3){
        gameState = 2
      }
    }

    if(gameState === 2){

    }

    if(gameState === END){
      background(hellImage);
      gameOver();
    }
  


  drawSprites();
}




function bullet(){
    var bullet = createSprite(player.position.x + 50,player.position.y, 20, 20);
    bullet.addImage("bullet",bulletImage);
    bullet.scale = .1;
    bullet.velocity.x = 20;
    bulletGroup.add(bullet);
}


function playerMovement(){
if (keyDown("UP_ARROW")){
  player.position.y -= 3
}
if (keyDown("DOWN_ARROW")){
  player.position.y +=3
}
if (playerMoving){
  player.position.x +=3
}
camera.position.x = player.position.x + 400;

}


function enemyConrols(){
  if(enemy.position.x > 1800){
    enemyMoving = true;
  }else{
    enemyMoving = false;
    enemy.velocity.x = 0
    enemy2.velocity.x = 0
    enemy3.velocity.x = 0

    if(frameCount % 100000000 === 0){
      enemyBullets();
      
    }

    

  }
  if(player.position.x > 800 && enemyMoving){
    enemy.velocity.x -=.1
    enemy2.velocity.x -=.1
    enemy3.velocity.x -=.1
  }
}


function enemyBullets(){
  var enemyBullet = createSprite(enemy.position.x - 50, enemy.position.y, 20, 20);
  enemyBullet.addImage("bullet1",enemyBulletImage);
  enemyBullet.scale = 0.06;
  enemyBullet.velocity.x -=5;
  enemyBulletGroup.add(enemyBullet);

  var enemyBullet2 = createSprite(enemy2.position.x - 50, enemy2.position.y, 20, 20);
  enemyBullet2.addImage("bullet2",enemyBulletImage);
  enemyBullet2.scale = 0.06;
  enemyBullet2.velocity.x -=5
  enemyBullet2Group.add(enemyBullet2);

  var enemyBullet3 = createSprite(enemy3.position.x - 50, enemy3.position.y, 20, 20);
  enemyBullet3.addImage("bullet3",enemyBulletImage);
  enemyBullet3.scale = 0.06;
  enemyBullet3.velocity.x -=5
  enemyBullet3Group.add(enemyBullet3);
}

function gameOver(){
  swal({
    title : `Game Over`,
    text : `You lost all of your heart :(`,
    imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  })
}