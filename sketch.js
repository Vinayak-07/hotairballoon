var ball;
var ballImg;
var bg;
var db,position;

function preLoad(){
    ballImg = loadImage("Hot Air Ballon-02.png");
    bg = loadImage("bg.png");
}
function setup(){
    db = firebase.database(); 
    createCanvas(500,500);
    ball = createSprite(100,350,10,10);
    //ball.addImage(ballImg);
    var path = db.ref("ball/height");
    path.on("value",readPosition,showError);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        updateHeight(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updateHeight(1,0);
    }
    else if(keyDown(UP_ARROW)){
        updateHeight(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        updateHeight(0,+1);
    }
    drawSprites();
}

function updateHeight(x,y){
    db.ref('ball/height').set({
        'x' : position.x + x,
        'y' : position.y + y
    });
    
}
function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("this is an error ;)");
}

