var game = new MainGame();
game.init();
function MainGame()
{
    this.counter = 0;
    this.i = 0;
    this.rectangle;
    this.rectangleX = 0;
    this.rectangleY = 0;
    this.fieldMoveDown;
    this.downcounter = 0;
    this.arrayOfRectangle = [];
    this.newrectanglelist = [];
    this.gameBodyContainer = document.getElementById("wrapper");
    this.arrayLength;
    this.rednum;
    this.rednumCount;
    this.redIndexArray = [];
    this.aquaIndexArray = [];
    this.fieldInterval = 10;
    this.fastMove = 0;
    this.downInc = 3;
    this.increment = 1;
    this.fastMoveCounter = 0;
    this.opponentRectangleArray = [];
    this.opponentContainer;
    var aa;
    var opponentObject;
    var that = this;
    this.init = function() {
        that.createAdditionalRectangle();
        that.createRectangleMainbody();
        that.createRedrectangle();
    };

    this.createRectangleMainbody = function() {
        for (i = 0; i < 650; i += 30)
        {
            that.rectangle = document.createElement("div");
            that.rectangle.className = "rectangle";
            that.gameBodyContainer.appendChild(that.rectangle);
            that.rectangleX = getrandom(0, 350);
            that.rectangleY = i;
            that.rectangle.style.top = that.rectangleY + "px";
            that.rectangle.style.left = that.rectangleX + "px";
            that.rectangle.style.color = "red";
            that.arrayOfRectangle.push(that.rectangle);
        }
    };

    this.createAdditionalRectangle = function() {
        for (i = -5000; i < -10; i += 30)
        {
            that.rectangle = document.createElement("div");
            that.rectangle.className = "rectangle";
            that.gameBodyContainer.appendChild(that.rectangle);
            that.rectangleX = getrandom(0, 350);
            that.rectangleY = i;
            that.rectangle.style.top = that.rectangleY + "px";
            that.rectangle.style.left = that.rectangleX + "px";
            that.rectangle.style.color = "red";
            that.arrayOfRectangle.push(that.rectangle);
        }
    };

    this.createRedrectangle = function()
    {
        that.arrayLength = that.arrayOfRectangle.length;
        for (var i = 0; i < 30; i++)
        {
            var redIndex = getrandom(0, that.arrayLength);
            var redIndexInt = parseInt(redIndex);
            if (i < 15)
            {
                that.arrayOfRectangle[redIndexInt].className = "redRectangle";
                that.redIndexArray.push(redIndexInt);
            }
            else
            {
                that.arrayOfRectangle[redIndexInt].className = "aquaRectangle";
                that.aquaIndexArray.push(redIndexInt);

            }
        }
        aa = new PlayerClass(that);
        aa.getArray();
        opponentObject = new Opponent(that);
        opponentObject.createOpponent();
        that.mainGameLoop();
        that.fieldMoveDown = setInterval(that.mainGameLoop, 1);

    };
    this.mainGameLoop = function() {
        that.counter++;
        if (that.counter % that.downInc == 0) {
            that.rectangleMoveToDown(that.fastMove);
        }
        if (that.counter % 1 == 0) {
            aa.manageJump();
        }
    }

    function getrandom(start, end) {
        return Math.random() * (end - start) + start;
    }

    this.getOpponent = function(opponenentarray, aaa)
    {
        that.opponentRectangleArray = opponenentarray;
        that.opponentContainer = aaa;
    };
    this.rectangleMoveToDown = function(fastMove)
    {
        that.downcounter++;
        that.fastMove = fastMove;

        if (that.fastMove == 1)
        {
            if (that.fastMoveCounter < 5)
            {
                that.downInc = 3;
                that.increment = 50;
                that.downcounter += 49;
                that.fastMoveCounter++;
            }
            else
            {
                that.fastMove = 0;
                that.fastMoveCounter = 0;
                that.downInc = 3;
                that.increment = 1;
            }

        }

        for (var i = 0; i < that.arrayOfRectangle.length; i++)
        {
            var aa = that.arrayOfRectangle[i].style.top;
            var aaInt = parseInt(aa);
            var topFinal = aaInt + that.increment;
            that.arrayOfRectangle[i].style.top = topFinal + "px";
            if (topFinal > 630)
            {
                that.gameBodyContainer.removeChild(that.arrayOfRectangle[i]);
                that.arrayOfRectangle.splice(i, 1);
            }
        }
        if (that.downcounter > 5000)
        {
            clearInterval(that.fieldMoveDown);
            alert("level 1 Completed");
        }
    };
}



function PlayerClass(game1)
{
    this.game = game1;
    var goUp = 1;
    this.player;
    this.bullet;
    this.bulletX;
    this.bulletY;
    this.bulletCreated = 0;
    this.playerX = 200;
    this.playerY = 500;
    this.counterup = 0;
    this.movePlayerUp;
    this.movePlayerDown;
    this.gameBodyContainerPlayer;
    this.arrayRectangle = [];
    this.arrayRedrectangle = [];
    var mainGameObject;
    var that = this;

    this.getArray = function()
    {
        that.arrayRectangle = that.game.arrayOfRectangle;
        that.gameBodyContainerPlayer = that.game.gameBodyContainer;
        that.createPlayer();
    };
    this.createPlayer = function()
    {
        that.player = document.createElement("div");
        that.player.className = "player";
        that.game.gameBodyContainer.appendChild(that.player);
        that.player.style.left = that.playerX + "px";
        that.player.style.top = that.playerY + "px";
    };

    this.movePlayerUpward = function()
    {

        if (that.counterup < 109)
        {
            that.counterup += 1;
            that.playerY--;
            that.player.style.top = that.playerY + "px";
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
        }
    };

    this.manageJump = function() {

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

    this.moveBulletUp = function()
    {

        that.bulletY -= 1;
        that.bullet.style.top = that.bulletY + "px";
        if(that.bulletY<10)
        {
            that.bulletCreated=0;
            that.game.gameBodyContainer.removeChild(that.bullet);
        }

    };

    this.movePlayerDownward = function()
    {

        that.playerY += 1;
        that.player.style.top = that.playerY + "px";
        that.detectcollide();
        that.player.style.color = "red";
        if (that.playerY > 640)
        {
            alert("GAME OVER PLAYER MOVED DOWN");
        }

    };


    this.createBullet = function()
    {
        that.bullet = document.createElement("div");
        that.bullet.className = "bullet";
        that.bulletX = that.playerX + 10;
        that.bullet.style.left = that.bulletX + "px";
        that.bulletY=that.playerY;
        that.bullet.style.top = that.bulletY + "px";
        that.game.gameBodyContainer.appendChild(that.bullet);
        that.bulletCreated = 1;
    };

    this.detectcollide = function()
    {
        for (var i = 0; i < that.arrayRectangle.length; i++)
        {
            var topofrectangle = that.arrayRectangle[i].style.top;
            var tr = parseInt(topofrectangle);
            var leftofretangle = that.arrayRectangle[i].style.left;
            var lr = parseInt(leftofretangle);
            var rr = lr + 50;
            var pr = that.playerX + 30;
            var pl = that.playerX;
            if (tr == that.playerY + 40 && pl < rr && pr > lr)
            {

                if (that.arrayRectangle[i].className == "redRectangle")
                {
                    that.game.gameBodyContainer.removeChild(that.arrayRectangle[i]);
                    that.arrayRectangle.splice(i, 1);
                }
                else if (that.arrayRectangle[i].className == "aquaRectangle")
                {
                    mainGameObject = new MainGame(that);
                    that.game.fastMove = 1;
                    var ee = mainGameObject.rectangleMoveToDown(that.game.fastMove);
                    goUp = 1;
                }
                else if (that.arrayRectangle[i].className == "opponent")
                {
                    alert("GAME OVER(YOU ARE COLLIDED WITH OPPONENT)");
                }
                else {
                    that.arrayRectangle[i].style.backgroundColor = "green";
                    goUp = 1;
                }
            }

        }
    };


    document.onkeydown = function(e) {


        switch (e.keyCode) {
            case 37:
                {
                    that.playerX -= 30;
                    that.player.style.left = that.playerX + "px";
                    if (that.playerX < 0)
                    {
                        that.playerX = 370;
                        that.player.style.left = that.playerX + "px";
                    }

                    break;
                }

            case 38:
                {
                    that.createBullet();
                    that.bulletCreated = 1;
                    break;
                }

            case 39:
                {
                    that.playerX += 30;
                    that.player.style.left = that.playerX + "px";
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

function Opponent(getMain)
{
    this.mainGameObj = getMain;
    this.opponents;
    this.randnum;
    this.intRandnum;
    this.container;
    this.opponentArray = [];
    var that = this;
    this.getArray = function(array, container)
    {
        that.rectanglelist = array;
        that.container = container;
    };

    this.createOpponent = function()
    {
        that.randnum = that.mainGameObj.arrayOfRectangle.length;
        that.intRandnum = parseInt(this.randnum / 6);
        for (var i = 0; i < that.intRandnum; i++)
        {
            var randnum = getrandom(0, that.randnum);
            var aa = parseInt(randnum);
            if (that.mainGameObj.arrayOfRectangle[aa].className = "rectangle") {
                var topp = that.mainGameObj.arrayOfRectangle[aa].style.top;
                var topInt = parseInt(topp) - 30;
                if (topInt < 450)
                {
                    that.opponents = document.createElement("div");
                    that.opponents.className = "opponent";
                    that.mainGameObj.gameBodyContainer.appendChild(that.opponents);

                    var left = that.mainGameObj.arrayOfRectangle[aa].style.left;
                    var leftInt = parseInt(left) + 10;
                    that.opponents.style.top = topInt + "px";
                    that.opponents.style.left = leftInt + "px";
                    that.mainGameObj.arrayOfRectangle.push(that.opponents);
                }
            }

        }
    };
    function getrandom(start, end) {
        return Math.random() * (end - start) + start;
    }
}








