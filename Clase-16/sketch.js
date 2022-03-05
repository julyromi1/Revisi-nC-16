var trex, trex_running, edges;
var groundImage;
var invisibleground;
var cloud;
var cloudImage;
var cactus10;
var Score=0;
var cloudsgroup;
var cactusgroup;
var JUGANDO = 1;
var FIN = 0;
var estadodejuego= JUGANDO;
var trexdead;
var GAMEOVER;
var RESTART;
var terminado;
var again;
var sound1;
var sound2;
var sound3;

function preload(){
  trex_running = loadAnimation("trex1.png","trex4.png","trex3.png");
  groundImage = loadImage("ground2.png");
  cloudImage= loadImage("cloud.png");
  cactus1= loadImage ("obstacle1.png");
  cactus2= loadImage ("obstacle2.png");
  cactus3= loadImage ("obstacle3.png");
  cactus4= loadImage ("obstacle4.png");
  cactus5= loadImage ("obstacle5.png");
  cactus6= loadImage ("obstacle6.png");
  trexdead= loadImage ("trex_collided.png");
  GAMEOVER= loadImage ("gameOver.png");
  RESTART= loadImage ("restart.png");
  sound1=loadSound("checkPoint.mp3");
  sound2=loadSound("die.mp3");
  sound3=loadSound("jump.mp3");
}

function setup(){
  createCanvas(600,200);
  
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stop", trexdead);
  terminado = createSprite (300,100);
  again = createSprite (300, 140);
  terminado.addImage (GAMEOVER);
  again.addImage (RESTART);
  terminado.scale=.8;
  again.scale=.3;
  terminado.visible=false;
  again.visible=false;
  // para hacerlos invisibles si llevan true es para hacerlos visibles.
  
  edges = createEdgeSprites();
  cactusgroup=new Group ();
  cloudsgroup=new Group ();
  
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  //
  ground=createSprite(300, 198, 600, 5);
  ground.addImage(groundImage);
  invisibleground=createSprite(300,200, 600, 5);
  invisibleground.visible=false;
  trex.setCollider ("circle",0,0,50);
  //setCollider sirve para establecer un radio de collision entre  tu sprite y tu siguiente sprite.
  //trex.debug=true;


}


function draw()
{
  //establecer color de fondo.
  background("white");

  if (estadodejuego == JUGANDO)
  {
  ground.velocityX=-5;
  Score+=Math.round(getFrameRate()/60);
  if (Score%100==0){
  sound2.play();

  }
  if(keyDown("space")&& trex.y>=160)
  {
    trex.velocityY = -10;
    //console.log(trex.y); 
    sound3.play();
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  if (ground.x<0)
  {
    ground.x=300;
  }
  createcloud();
  createcactus();
  if (cactusgroup.isTouching (trex))
  {
  estadodejuego=FIN;
  sound2.play();

  }



  }
  else if (estadodejuego==FIN){
  
  ground.velocityX=0;
  cactusgroup.setVelocityXEach(0);
  cloudsgroup.setVelocityXEach(0);
  trex.changeAnimation ("stop", trexdead);
  //cangeAnimation sirve para cambiar la animación.
  cactusgroup.setLifetimeEach (-1);
  cloudsgroup.setLifetimeEach (-1);
  trex.velocityY=0;
  terminado.visible=true;
  again.visible=true;
  if (mousePressedOver(again)){
  console.log ("funcion resert");
  }
  }
  text ("score..." + Score, 500, 50);

    //cargar la posición Y del Trex
  //console.log(trex.y)
  
  //hacer que el Trex salte al presionar la barra espaciadora
  
  //evitar que el Trex caiga
  trex.collide(edges[3])
  //collide sirve para hacer que tu sprite coche con un borde en especifíco.
  drawSprites();
}
function createcloud(){
if (frameCount%100==0) {
  cloud=createSprite (550,50,70, 50);
  cloud.velocityX=-5;
  cloud.addImage(cloudImage);
  cloud.y=Math.round(random(50, 120))
  cloud.depth=trex.depth;
  trex.depth+=1;
  cloud.lifetime=120;
  cloudsgroup.add (cloud);
}
}
function createcactus (){
if (frameCount%90==0){
cactus10=createSprite (550, 180, 30,45);
cactus10.velocityX=-5;
var aleatorio=Math.round(random (1, 6));
switch(aleatorio){
case 1:cactus10.addImage(cactus1);
break;
case 2:cactus10.addImage (cactus2);
break;
case 3:cactus10.addImage (cactus3);
break;
case 4:cactus10.addImage (cactus4);
break;
case 5:cactus10.addImage (cactus5);
break;
case 6:cactus10.addImage (cactus6);
break;
default:break;
}
cactus10.lifetime=120;
cactus10.scale=.6;
cactusgroup.add (cactus10);
}
}