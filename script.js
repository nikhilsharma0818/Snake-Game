var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake food
var foodX ;
var foodY ;
//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

var velocityX = 0;
var velocityY = 0;
var gameOver = false;
var snakebody = [];
 
window.onload = function(){
    board = document.getElementById('board');
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");
    placefood();
    document.addEventListener("keyup",changeDirection);
    setInterval(update, 1000/5);
    
}
 function update(){
    if (gameOver){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height)

    context.fillStyle = "red";
    context.fillRect(foodX , foodY , blocksize , blocksize);
     if(snakeX == foodX && snakeY == foodY){
        snakebody.push([foodX , foodY])
        placefood();
     }
     for (let i = snakebody.length -1; i >0 ; i--){
        snakebody[i] = snakebody [i-1];
      }  
      if (snakebody.length){
        snakebody[0] = [snakeX, snakeY]
      }

    context.fillStyle = "lime";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX , snakeY, blocksize , blocksize);
    for(i=0 ; i< snakebody.length; i++){
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize)
    }

    // game over Conditions
    if ( snakeX < 0|| snakeX > cols*blocksize || snakeY < 0 ||snakeY > rows*blocksize){
        gameOver = true;
        alert('Game Over')
    } 
    for (let i = 0 ;i < snakebody.length ; i++){
      if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]){
        gameOver = true;
        alert("Game Over")
      }
    }    
 }
function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY!=1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY!=-1){
        velocityX = 0;
        velocityY = +1;
    }
    else if (e.code == "ArrowLeft" && velocityX!=+1){
        velocityX = -1;
        velocityY = 0;
    }
   else  if (e.code == "ArrowRight" && velocityX!=-1){
        velocityX = 1;
        velocityY = 0;
    }
}

  function placefood(){
    foodX = Math.floor(Math.random ()* cols) * blocksize;
    foodY = Math.floor(Math.random ()* rows )*blocksize;
  }