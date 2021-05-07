var balloon,balloonImage1,balloonImage2;
var position,database; 


function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition = database.ref('balloon/height');
    balloonPosition.on("value",readHeight,showError);

 }

function draw() {
  background(bg);

  if(keyDown(UP_ARROW)){
    updataHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.01;
  }

  else if(keyDown(DOWN_ARROW)){
    updataHeight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   balloon.scale=balloon.scale +0.01;
  }

  drawSprites();

}

  function updataHeight(x,y){
    database.ref('balloon/height').set({
        'x': height.x + x,
        'y': height.y + y
    }
    ) 
}

function readHeight(data){
    height = data.val();
    console.log(height.x);
    console.log(height.y);
    balloon.x = height.x;
    balloon.y = height.y;

}
function showError(){
    console.log("Error in writing to the database");
  }
