var knife, sword, swordimg;

var monsterImg, monsterImg2;

var PLAY = 1;

var END = 0;

var gameState = 1;

var score;

var gameOverImg, gameOverSound;

var cuttingSound;

function preload(){
  
  swordimg = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  
  fruit2 = loadImage("fruit2.png");
  
  fruit3 = loadImage("fruit3.png");
  
  fruit4 = loadImage("fruit4.png");
  
  monsterImg = loadImage("alien1.png");
  
  monsterImg2 = loadImage("alien2.png");
  
  gameOverImg = loadImage("gameover.png");
  
  cuttingSound = loadSound("knifeSwooshSound.mp3");
  
  gameOverSound = loadSound("gameover.mp3");
  
}
function setup() {
  
  createCanvas(600,600);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordimg);
  sword.scale = 0.7;
  
  score = 0;
  
  fruitGroup = createGroup();
  
  enemyGroup = createGroup();
  
}

function draw(){
  
  background(230);
  
  text("Score:"+score,500,50);
  
  if(sword.isTouching(enemyGroup)) {
      gameState = END;
    
    gameOverSound.play();
    
    }
  
  if(gameState===PLAY) {
    
  fruits();
    
  enemy();
    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    if(fruitGroup.isTouching(sword)) {
      
    fruitGroup.destroyEach();
      
      cuttingSound.play();
      
    score = score+2;
      
   }
    
  }
  
  else if(gameState===END) {
    
    fruitGroup.visible = false;
    
    sword.addImage(gameOverImg);
    
    sword.x = 300;
    sword.y = 300;
    
    fruitGroup.x = 0;
    
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    
    fruitGroup.setLifetimeEach(-1);
    enemyGroup.setLifetimeEach(-1);
    
    }
  
  drawSprites();
  
}

function fruits() {
  
  if(frameCount%80===0) {
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    
if(position == 1) {
  
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
  
    }
    
    else {
      
      if(position == 2) {
        
        fruit.x = 0;
        fruit.velocityX = (7+(score/4));
        
      }
      
     }
    
    rand = Math.round(random(1,4));
    
    if (rand == 1) {
      
      fruit.addImage(fruit1);
      
    }
    else if (rand == 2) {
      
      fruit.addImage(fruit2);
      
    }
    else if (rand == 3) {
      
      fruit.addImage(fruit3);
      
    }
    else {
      
      fruit.addImage(fruit4);
      
    }
    
    fruit.y = Math.round(random(50,340));
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
    
    }
  
}

function enemy() {
  
  if(World.frameCount%200===0) {
    
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImg2);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
    
  }
  
}