

// import celerx from 'celerx'  //Import the  s module

var canvas;                             //Var for canvas
var canvasContext;        //context
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) {
  //Function to make paddle move according to mouse
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function handleMouseClick(evt) {
  //Function to disable
	if(showingWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
}



window.onload = function() {
  // celerx.start();
	canvas = document.getElementById('gameScreen');
	canvasContext = canvas.getContext('2d');
  canvasContext.font="25px ariel";
  canvasContext.textAlign="center";

  //canvasContext.drawImage("download.jpeg",10,10);
 //canvas.style.backgroundImage="url('download.jpeg')"


	var framesPerSecond = 30;
	setInterval(function() {
			moveEverything();
      // canvas.style.backgroundImage="url('download.jpeg')"
			drawEverything();
		}, 1000/framesPerSecond);

	canvas.addEventListener('mousedown', handleMouseClick);

	canvas.addEventListener('mousemove',
		function(evt) {
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
		});
}

function ballReset() {

	if(player1Score >= WINNING_SCORE ||
		player2Score >= WINNING_SCORE) {

		showingWinScreen = true;
    const match = celerx.getMatch();
    seed(match && match.sharedRandomSeed, {global : true})

	}
  //sound("jumpsounds.mp3");
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY - 35) {
		paddle2Y = paddle2Y + 6;
	} else if(paddle2YCenter > ballY + 35) {
		paddle2Y = paddle2Y - 6;
	}
}

function moveEverything() {
	if(showingWinScreen) {
		return;
	}

	computerMovement();

	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;

	if(ballX < 0) {
		if(ballY > paddle1Y &&
			ballY < paddle1Y+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY
					-(paddle1Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		} else {
			player2Score++; // must be BEFORE ballReset()
			ballReset();
		}
	}
	if(ballX > canvas.width) {
		if(ballY > paddle2Y &&
			ballY < paddle2Y+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY
					-(paddle2Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		} else {
			player1Score++;
       // must be BEFORE ballReset()

			ballReset();
		}
	}
	if(ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
	if(ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
}

function drawNet() {
	for(var i=0;i<canvas.height;i+=40) {
		colorRect(canvas.width/2-1,i,2,20,'white');
	}
}

function drawEverything() {
	// next line blanks out the screen with black
  /************************************/
  // const match = celerx.getMatch();
  // seed(match && match.sharedRandomSeed, {global : true})




   colorRect(0,0,canvas.width,canvas.height,'black');
  //canvas.style.backgroundImage="url('download.jpeg')"

	if(showingWinScreen) {
		canvasContext.fillStyle = 'white';

		if(player1Score >= WINNING_SCORE) {
      canvasContext.font = "25px Arial";
			canvasContext.fillText("Hurray !! You Won !", 400, 200);
      //celerx.submitScore(WINNING_SCORE); //////////////////////////////////////////
      //sound("Ta Da-SoundBible.com-1884170640.wav");
		} else if(player2Score >= WINNING_SCORE) {
      canvasContext.font = "25px Arial";
			canvasContext.fillText("You Lost !!", 400, 200);
      //celerx.submitScore(WINNING_SCORE);     //////////////////////////////////////////``
      //sound("losing.mp3");
		}
    canvasContext.fillText("Click to Play!!", 400, 500);
    /************************************/

		return;
	}
  // function sound(mp){
  //   var music = new Audio(mp);
  //   music.play();
  // }

	drawNet();

	// this is left player paddle
	colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

	// this is right computer paddle
	colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

	// next line draws the ball
	colorCircle(ballX, ballY, 10, 'white');


	canvasContext.fillText(player1Score, 200, 100);
	canvasContext.fillText(player2Score, canvas.width-200, 100);
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
	canvasContext.fill();
}

function colorRect(leftX,topY, width,height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY, width,height);
}
// function colorRect1(leftX,topY,width,height,)
