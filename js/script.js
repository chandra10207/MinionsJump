var game = new MainGame();
//playAudio("music/mainbg.mp3");
function startGame() {
    
    document.getElementById("menuscreen").style.display = "none";
game.init();
}
function MainGame()
{
    this.counter = 0;
    this.i = 0;
    this.rectangle;
    this.rectangleX = 0;
    this.rectangleY = 0;
    this.rectangleMoveDown;
    this.downcounter = 0;
    this.arrayOfRectangle = [];    
    this.gameBodyContainer = document.getElementById("wrapper");
    this.arrayLength;   
    this.breakRectangleIndexArray = [];
    this.springRectangleIndexArray = [];
    this.fieldInterval = 10;
    this.fastMove = 0;
    this.downInc = 3;
    this.increment = 2;
    this.fastMoveCounter = 0;
    this.opponentArray = [];
    this.gameLevel=1;
    var playerObj;
    var that = this;
    this.init = function () {
        var playerfrmDOM = document.getElementsByClassName("player")[0];
        that.score = 0;
        that.breakRectangleIndexArray = [];
        that.springRectangleIndexArray = [];
        
       

        for (var i = 0; i < that.arrayOfRectangle.length; i++) {

            that.gameBodyContainer.removeChild(that.arrayOfRectangle[i]);
        }

        for (var i = 0; i < that.opponentArray.length; i++) {

            that.gameBodyContainer.removeChild(that.opponentArray[i]);
        }
        that.arrayOfRectangle = [];
        that.opponentArray = [];
       
        //that.gameBodyContainer.removeChild(playerfrmDOM);
        


        that.createNormalAdditionalRectangle();
        that.createNormalRectangle();
        that.createBreakrectangle();
        that.createSpringrectangle();
        playerObj = new Player(that);
        playerObj.init();
        that.rectangleMoveDown = setInterval(that.mainGameLoop, 8);
    };

    this.createNormalRectangle = function() {
        for (i = 600; i >0; i -= 30)
        {
            that.rectangle = document.createElement("div");
            that.rectangle.className = "normalRectangle";
            that.gameBodyContainer.appendChild(that.rectangle);
            that.rectangleX = getrandom(0, 350);
            that.rectangleY = i;
            that.rectangle.style.top = that.rectangleY + "px";
            that.rectangle.style.left = that.rectangleX + "px";
//            that.rectangle.innerHTML=i;
            that.rectangle.style.color = "red";
            that.arrayOfRectangle.push(that.rectangle);
        }
    };

    this.createNormalAdditionalRectangle = function() {
        for (i = -5000; i < -10; i += 30)
        {
            that.rectangle = document.createElement("div");
            that.rectangle.className = "normalRectangle";
            that.gameBodyContainer.appendChild(that.rectangle);
            that.rectangleX = getrandom(0, 350);
            that.rectangleY = i;
            that.rectangle.style.top = that.rectangleY + "px";
            that.rectangle.style.left = that.rectangleX + "px";
            //that.rectangle.innerHTML=i;
            that.rectangle.style.color = "red";
            that.arrayOfRectangle.push(that.rectangle);
        }
    };

    this.createBreakrectangle = function()
    {
        that.arrayLength = that.arrayOfRectangle.length;
        var breakRectangleLength=parseInt(that.arrayLength/10);
        for (var i = 0; i < breakRectangleLength; i++)
        {
            var breakRectangleIndex = getrandom(0, that.arrayLength);
            var breakRectangleIndexInt = parseInt(breakRectangleIndex);        
            that.arrayOfRectangle[breakRectangleIndexInt].className = "breakRectangle";
            that.breakRectangleIndexArray.push(breakRectangleIndexInt); 
        }
        
    };
    
    this.createSpringrectangle = function()
    {
        var springRectangleLength=parseInt(that.arrayLength/15);
        for (var i = 0; i < springRectangleLength; i++)
        {
            var springRectangleIndex = getrandom(0, that.arrayLength);
            var springRectangleIndexInt = parseInt(springRectangleIndex);           
            that.arrayOfRectangle[springRectangleIndexInt].className = "springRectangle";
            that.springRectangleIndexArray.push(springRectangleIndexInt);            
        }        
    };
    
    this.mainGameLoop = function() {
//        window.requestAnimationFrame(that.mainGameLoop);
        that.counter++;
        if (that.counter % that.downInc == 0)
        {
            that.rectangleMoveToDown(that.fastMove);
        }
        if (that.counter % 1 == 0)
        {
            playerObj.managePlayerJump();
        }
    };

    function getrandom(start, end) {
        return Math.random() * (end - start) + start;
    }
    
    this.forClearInterval=function()
    {
        clearInterval(that.rectangleMoveDown);
    };
    
    this.rectangleMoveToDown = function(fastMove)
    {
        that.downcounter+=2;
        that.fastMove = fastMove;
        if (that.fastMove == 1)
        {
            if (that.fastMoveCounter < 20)
            {
                that.downInc = 1;
                that.increment = 10;
                that.downcounter += 8;
                that.fastMoveCounter++;
            }
            else
            {
                that.fastMove = 0;
                that.fastMoveCounter = 0;
                that.downInc = 3;
                that.increment =2;
            }
        }
        for (var i = 0; i < that.arrayOfRectangle.length; i++)
        {
            var aa = that.arrayOfRectangle[i].style.top;
            var aaInt = parseInt(aa);
            var topFinal = aaInt + that.increment;
            that.arrayOfRectangle[i].style.top = topFinal + "px";
            if (topFinal > 620)
            {
                that.gameBodyContainer.removeChild(that.arrayOfRectangle[i]);
                that.arrayOfRectangle.splice(i, 1);
            }
        }
        for (var i = 0; i < that.opponentArray.length; i++)
        {
            var aa = that.opponentArray[i].style.top;
            var aaInt = parseInt(aa);
            var topFinal = aaInt + that.increment;
            that.opponentArray[i].style.top = topFinal + "px";
            if (topFinal > 570)
            {
                that.gameBodyContainer.removeChild(that.opponentArray[i]);
                that.opponentArray.splice(i, 1);
            }
        }
        if (that.downcounter > 5100)
        {            
            that.forClearInterval();
            alert("LEVEL 1 COMPLETED");

            document.getElementById("wrapper").removeChild(that.player);
            document.getElementById("playbtn").style.background = "url(images/playagain.png)";
            document.getElementById("menuscreen").style.display = "block";
        }
    };
}



function Player(thatMainGame)
{
    this.mainGameObj = thatMainGame;
    var goUp = 1;
    this.player;
    this.bullet;
    this.bulletX;
    this.bulletY;
    this.bulletCreated = 0;
    this.playerX = 200;
    this.playerY = 400;
    this.counterup = 0;
    this.movePlayerUp;
    this.movePlayerDown;
    var opponentObj;
    var that = this;

    this.init = function()
    {
        opponentObj=new Opponent(that);
        opponentObj.init();
        that.createPlayer();
    };
    this.createPlayer = function()
    {
        that.player = document.createElement("div");
        that.player.className = "player";
        that.mainGameObj.gameBodyContainer.appendChild(that.player);
        that.player.style.left = that.playerX + "px";
        that.player.style.top = that.playerY + "px";
    };    

    this.managePlayerJump = function() {
        
        if (that.bulletCreated == 1)
        {
            that.moveBulletUp();
        }
        if (goUp == 1) {
            that.movePlayerUpward();

        } else {
            that.movePlayerDownward();
        }
    };

    this.movePlayerUpward = function()
    {
        if (that.counterup <50)
        {
            that.counterup += 1;
            that.playerY-=2;
            that.player.style.top = that.playerY + "px";
            
//            that.player.style.backgroundImage="url('../images/moveUp.png')";
            that.opponentPlayerCollide();
            if (that.playerY < 0)
            {
                that.playerY = 200;
            }
            that.player.style.color = "red";
        }
        else
        {
            goUp = 0;
            that.counterup = 0;
//            that.player.style.backgroundImage="url('../images/minionRight.png')";
        }
    };
    
    this.movePlayerDownward = function()
    {
        that.playerY += 2;
        that.player.style.top = that.playerY + "px";        
        that.detectPlayerRectanglecollide();
        that.opponentPlayerCollide();
        that.player.style.color = "red";
        if (that.playerY > 570)
        {
           
            that.mainGameObj.forClearInterval();

            document.getElementById("wrapper").removeChild(that.player);
            try {
                document.getElementById("wrapper").removeChild(that.bullet);
           
            } catch(e) {

            }
            playAudio("music/mainbg.mp3");
            //playAudio("music/ohhhh.mp3");
            document.getElementById("playbtn").style.background = "url(images/playagain.png)";
            document.getElementsByClassName("ScoreDiv")[0].innerHTML = "Current Score :- "+thatMainGame.score;
            document.getElementById("menuscreen").style.display = "block";
        }
    };
   
    this.changeOpponentImage=function()
    {
        for(var i=0;i<that.mainGameObj.opponentArray.length;i++)
        {
            var opX=parseInt(that.mainGameObj.opponentArray[i].style.left);
            if(opX<that.playerX)
            {
                that.mainGameObj.opponentArray[i].style.backgroundPosition=-201+"px";
            }
            
            else
            {
                that.mainGameObj.opponentArray[i].style.backgroundPosition=-102+"px";
            }
            
        }
        };
        
    this.createBullet = function()
    {
        that.bullet = document.createElement("div");
        that.bullet.className = "bullet";
        that.bulletX = that.playerX + 20;
        that.bullet.style.left = that.bulletX + "px";
        that.bulletY=that.playerY;
        that.bullet.style.top = that.bulletY + "px";
        that.mainGameObj.gameBodyContainer.appendChild(that.bullet);
        that.bulletCreated = 1;
    };
    
    this.moveBulletUp = function()
    {
        that.bulletY -= 3;
        that.bullet.style.top = that.bulletY + "px";
        that.bulletOpponentCollide();
        if(that.bulletY<10)
        {
            that.bulletCreated=0;
            that.mainGameObj.gameBodyContainer.removeChild(that.bullet);
        }
    };
    
    
    this.detectPlayerRectanglecollide = function()
    {
        
        for (var i = 0; i < that.mainGameObj.arrayOfRectangle.length; i++)
        {
            var topofrectangle = that.mainGameObj.arrayOfRectangle[i].style.top;
            var tr = parseInt(topofrectangle);
            var leftofretangle = that.mainGameObj.arrayOfRectangle[i].style.left;
            var lr = parseInt(leftofretangle);
            var rr = lr + 50;
            var pr = that.playerX + 50;
            var pl = that.playerX;
            if (tr == that.playerY + 60 && pl < rr && pr > lr)
//            if(that.playerX<lr+50 && that.playerX+30>lr && that.playerY<tr+20 && 40+that.playerY>tr )
            {
                if (that.mainGameObj.arrayOfRectangle[i].className == "breakRectangle")
                {
                    that.mainGameObj.gameBodyContainer.removeChild(that.mainGameObj.arrayOfRectangle[i]);
                    that.mainGameObj.arrayOfRectangle.splice(i, 1);
                    thatMainGame.score -= 50;
                }
                else if (that.mainGameObj.arrayOfRectangle[i].className == "springRectangle")
                {
                    that.mainGameObj.fastMove = 1;
                    thatMainGame.score += 1000;
                    that.mainGameObj.rectangleMoveToDown(that.mainGameObj.fastMove);
                    goUp = 1;
                }
                else {
                    that.mainGameObj.arrayOfRectangle[i].style.backgroundColor = "green";
                    goUp = 1;
                    thatMainGame.score += 100;
                }
            }

        }
    };


    this.opponentPlayerCollide = function () {
        for (var i = 0; i < that.mainGameObj.opponentArray.length; i++) {
            var opX = parseInt(that.mainGameObj.opponentArray[i].style.left);
            var opY = parseInt(that.mainGameObj.opponentArray[i].style.top);
            if (that.playerX < opX + 50 && that.playerX + 50 > opX && that.playerY < opY + 60 && 60 + that.playerY > opY) {

                playAudio("music/ohhhh.mp3");
                document.getElementById("wrapper").removeChild(that.player);
                try {
                    document.getElementById("wrapper").removeChild(that.bullet);

                } catch(e) {
                }

                document.getElementById("playbtn").style.background = "url(images/playagain.png)";
                document.getElementsByClassName("ScoreDiv")[0].innerHTML = "Current Score :- " + thatMainGame.score;

                document.getElementById("menuscreen").style.display = "block";
                that.mainGameObj.forClearInterval();
            }
        }
    };
    
    
    this.bulletOpponentCollide=function ()
    {
        for(var i=0;i<that.mainGameObj.opponentArray.length;i++)
        {
        var opX=parseInt(that.mainGameObj.opponentArray[i].style.left);
        var opY=parseInt(that.mainGameObj.opponentArray[i].style.top);              
        if (that.bulletX < opX + 50 && that.bulletX + 10 > opX && that.bulletY < opY + 60 &&   40 + that.bulletY > opY) {
            thatMainGame.score += 1000;
            playAudio("music/yeah.mp3");
            that.mainGameObj.gameBodyContainer.removeChild(that.mainGameObj.opponentArray[i]);
            that.mainGameObj.gameBodyContainer.removeChild(that.bullet);
            that.mainGameObj.opponentArray.splice(i, 1);            
            }
        }      
    }
    
    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                {
                    that.playerX -= 30;
                    that.player.style.left = that.playerX + "px";
                    that.player.style.backgroundPosition=0+"px";
                    that.changeOpponentImage();
                    if (that.playerX < 0)
                    {
                        that.playerX = 370;
                        that.player.style.left = that.playerX + "px";
                    }
                    break;
                }

            case 38:
                {
                    if(that.bulletCreated==0)
                    {
                    that.createBullet();
                    that.bulletCreated = 1;
                }
                    break;                    
                }

            case 39:
                {
                    that.playerX += 30;
                    that.player.style.left = that.playerX + "px";
                    that.player.style.backgroundPosition=-50+"px";
                    that.changeOpponentImage();
                    if (that.playerX > 370)
                    {
                        that.playerX = 0;
                        that.player.style.left = that.playerX + "px";
                    }
                    break;
                }
        }
    };
}

function Opponent(playerthat)
{
    this.playerRectObj = playerthat;
    this.opponent;
    this.opponentNum;
    this.opponentX;
    this.opponentY;
    this.container;    
    this.opcObj;
    var that = this;
    this.init=function ()
    {
        that.createOpponent();
    };
    
    this.createOpponent = function()
    {
        that.opponentNum = parseInt(that.playerRectObj.mainGameObj.arrayLength /20);
        for (var i = 0; i < that.opponentNum; i++)
        {
            var randnum = getrandom(15, that.playerRectObj.mainGameObj.arrayLength);
            var opponentIndex = parseInt(randnum);
            if (that.playerRectObj.mainGameObj.arrayOfRectangle[opponentIndex].className == "normalRectangle")
            {
                var ot = that.playerRectObj.mainGameObj.arrayOfRectangle[opponentIndex].style.top;
                that.opponentY = parseInt(ot) - 60;
                if (that.opponentY < 200)
                {
                    that.opponent = document.createElement("div");
                    that.opponent.className = "opponent";
                    that.playerRectObj.mainGameObj.gameBodyContainer.appendChild(that.opponent);
                    var ol = that.playerRectObj.mainGameObj.arrayOfRectangle[opponentIndex].style.left;
                    that.opponentX = parseInt(ol);
                    that.opponent.style.top = that.opponentY + "px";
                    that.opponent.style.left = that.opponentX + "px";
                    that.playerRectObj.mainGameObj.opponentArray.push(that.opponent);
                }
            }

        }        
    };
    
    
    function getrandom(start, end) {
        return Math.random() * (end - start) + start;
    }
}







