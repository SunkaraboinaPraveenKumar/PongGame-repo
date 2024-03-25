let userpaddle=document.getElementById("userpaddle");
let aipaddle=document.getElementById("aipaddle");
let ball=document.getElementById("ball");
let gamebox=document.querySelector(".gamebox");
let zpressed=false;
let xpressed=false;

let userscore=document.getElementById("userscore");
let aiscore=document.getElementById("aiscore");


document.addEventListener("keydown",keyPressed);
document.addEventListener("keyup",keyUpReleased);

function keyPressed(e){
    if(e.key==='z'){
        zpressed=true;
        // console.log(e.key);
    }
    else if(e.key=='x'){
        xpressed=true;
        // console.log(e.key);
    }
}
function keyUpReleased(e){
    if(e.key=='z'){
        zpressed=false;
        // console.log(e.key);
    }
    else if(e.key=='x'){
        xpressed=false;
        // console.log(e.key);
    }
}

//ball movement in 2d will have some veloxity in x and y directions
//update the position of the ball by adding velocity to the position of ball
//and we will also check if ball is hitting the wall or the paddle
//if hitting the wall we will change the direction 
// else if it hits the paddle we will change the direction of the ball and increase its speed
// the formula is => v^2=vx^2+vy^2;
let Vx=-2;
let Vy=-3;
let V=Math.sqrt(Vx*Vx+Vy*Vy);
function reset(){
    ball.style.left="50%";
    ball.style.right="50%";
    Vx=-2;
    Vy=-3;
    V=Math.sqrt(Vx*Vx+Vy*Vy);
}
function checkcollision(activepaddle){
    let balltop=ball.offsetTop;
    let ballbottom=ball.offsetTop+ball.offsetHeight;
    let ballleft=ball.offsetLeft;
    let ballright=ball.offsetLeft+ball.offsetWidth;

    let paddletop=activepaddle.offsetTop;
    let paddlebottom=activepaddle.offsetTop+activepaddle.offsetHeight;
    let paddleleft=activepaddle.offsetLeft;
    let paddleright=activepaddle.offsetLeft+activepaddle.offsetWidth;

    if(ballbottom>paddletop
        &&balltop<paddlebottom
        &&ballright>paddleleft
        &&ballleft<paddleright){
            //console.log("collision!");
            return true;
        }
    return false;
}
function gameloop(){
    if(ball.offsetLeft<0){
        aiscore.innerHTML=parseInt(aiscore.innerHTML)+1;
        reset();
        // Vx=-Vx;
    }
    if(ball.offsetLeft>gamebox.offsetWidth-ball.offsetWidth){
        userscore.innerHTML=parseInt(userscore.innerHTML)+1;
        reset();
    }
    if(ball.offsetTop<0){
        Vy=-Vy;
    }
    if(ball.offsetTop>gamebox.offsetHeight-ball.offsetHeight){
        Vy=-Vy;
    }
    let paddle=(ball.offsetLeft<gamebox.offsetWidth/2)?userpaddle:aipaddle;
    //console.log(paddle);

    let ballCenterY=ball.offsetTop+ball.offsetHeight/2;
    let paddleCenterY=ball.offsetTop+paddle.offsetHeight/2;
    let angle=0;
    if(checkcollision(paddle)){
        if(paddle==userpaddle){
            if(ballCenterY>paddleCenterY){
                angle=-Math.PI/4;
            }
            else if(ballCenterY<paddleCenterY){
                angle=Math.PI/4;
            }
            else{
                angle=0;
            }
        }
        else if(paddle==aipaddle){
            if(ballCenterY>paddleCenterY){
                angle=3*(-Math.PI/4);
            }
            else if(ballCenterY<paddleCenterY){
                angle=3*Math.PI/4;
            }
            else{
                angle=0;
            }
        }
        V=V+0.2;
        Vx=V*Math.cos(angle);
        Vy=V*Math.sin(angle);
    }

    let aidelay=0.8;
    aipaddle.style.top=
    aipaddle.offsetTop+(ball.offsetTop-aipaddle.offsetTop
    -aipaddle.offsetHeight/2)*aidelay+"px";

    ball.style.left=ball.offsetLeft+Vx+"px";
    ball.style.top=ball.offsetTop+Vy+"px";
    if(zpressed&&userpaddle.offsetTop>50){
        userpaddle.style.top = userpaddle.offsetTop-5+"px";
    }
    if(xpressed&&userpaddle.offsetTop<gamebox.offsetHeight-userpaddle.offsetHeight+45){
        userpaddle.style.top=userpaddle.offsetTop+5+"px";
    }
    requestAnimationFrame(gameloop);
}
gameloop();
