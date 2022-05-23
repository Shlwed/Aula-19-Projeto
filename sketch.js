var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var death, deathImg ;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  deathImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  death = createSprite(200,200,50,50);
  death.scale = 0.3
  death.addImage(deathImg);
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function spawnDoors() {
  if(frameCount%240===0){
  door = createSprite(200,-50);
  door.addImage(doorImg);
  door.x = Math.round(random(120,400));
  door.velocityY = 1;
  door.lifetime = 800;
  doorsGroup.add(door);
  climber = createSprite(200,10);
  climber.addImage(climberImg);  
  climber.velocityY = 1;  
  climber.x = door.x;  
  climber.lifetime = 800;
  climbersGroup.add(climber);  
  death.depth = door.depth;
  death.depth +=1 
  invisibleBlock = createSprite(200,15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  invisibleBlock.x = door.x;
  invisibleBlock.velocityY = 1;
  invisibleBlockGroup.add(invisibleBlock) 
}
}

function draw() {
  background(200);
  drawSprites();
  if(tower.y > 400){
    tower.y = 300
  }
   
  if(gameState==="play"){
    spawnDoors()
  
    if(keyDown("space")){
      death.velocityY = -10
    }
    if(keyDown("right_arrow")){
      death.x = death.x+3
    }
    if(keyDown("left_arrow")){
      death.x = death.x-3
    }
    death.velocityY = death.velocityY+0.8
  
  
  
    
    
    
      if(invisibleBlockGroup.isTouching(death)||death.y>600){
        death.destroy();
        gameState = "end"
      }
  }
  if(gameState==="end"){
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("Game Over",230,250)
  };
  }
