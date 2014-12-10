
//var mainGamebody = document.getElementById("wrapper");
var game = new MainGame();
game.init();

//var minion=new Player();
//minion.init(mainGamebody);

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
    this.redIndexArray=[];
    this.aquaIndexArray=[];
    this.fieldInterval = 10;
    this.fastMove = 0;
    this.downInc = 3;
    this.increment=1;
    this.fastMoveCounter = 0;
    this.opponentRectangleArray=[];
    this.opponentContainer;
    var aa;
    var opponentObject;
    var that = this;

    this.init = function() {

        that.createAdditionalRectangle();
        that.createRectangleMainbody();
        that.createRedrectangle();
//        var minion=new Player();
//        minion.init();

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
            that.rectangle.innerHTML=i;
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
            that.rectangle.innerHTML=i;
            that.rectangle.style.color = "red";
            that.arrayOfRectangle.push(that.rectangle);
        }
//        var aa=newrectanglelist.length;




    };

    this.createRedrectangle = function()
    {
//        var aa= document.getElementsByClassName("rectangle");
        that.arrayLength = that.arrayOfRectangle.length;

//        alert(that.arrayLength)
//        alert(that.arrayLength);
        for (var i = 0; i < 30; i++)
        {
            var redIndex = getrandom(0, that.arrayLength);
            var redIndexInt = parseInt(redIndex);
//            that.arrayOfRectangle[redIndexInt].className = "aquaRectangle";
//            alert(redIndex)
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
//       aa.init();
        aa.getArray();
        opponentObject=new Opponent(that);
//        opponentObject.getArray(that.arrayOfRectangle,that.gameBodyContainer);
        opponentObject.createOpponent();        
        that.mainGameLoop();
        that.fieldMoveDown = setInterval(that.mainGameLoop, 1);

    };


    this.mainGameLoop = function() {
//        that.fieldMoveDown=window.requestAnimationFrame(that.mainGameLoop);
        that.counter++;
//        alert(that.downInc)
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

this.getOpponent=function (opponenentarray,aaa)
{
    that.opponentRectangleArray=opponenentarray;
    that.opponentContainer=aaa;
//        alert(that.opponentArray)
};
    this.rectangleMoveToDown = function(fastMove)
    {
        that.downcounter++;
        that.fastMove=fastMove;

        if(that.fastMove == 1)
        {
            if (that.fastMoveCounter < 5)
            {
                that.downInc = 3;
                that.increment=50;
                that.downcounter+=49;
                that.fastMoveCounter++;
            }
            else
            {
                that.fastMove = 0;
                that.fastMoveCounter = 0;
                that.downInc = 3;
                that.increment=1;
            }

        }

        for (var i = 0; i < that.arrayOfRectangle.length; i++)
        {
            var aa = that.arrayOfRectangle[i].style.top;
            var aaInt = parseInt(aa);
            var topFinal = aaInt + that.increment;
            that.arrayOfRectangle[i].style.top = topFinal + "px";
//            that.arrayOfRectangle[i].innerHTML=topFinal;
            if (topFinal > 630)
            {
                that.gameBodyContainer.removeChild(that.arrayOfRectangle[i]);
                that.arrayOfRectangle.splice(i,1);
//                that.arrayOfRectangle.pop(that.arrayOfRectangle[i]);
            }
//            var rect=[];
//            rect.push(that.arrayOfRectangle[i]);

            
        }
//        for (var j = 0; j < that.opponentArray.length; j++)
//        {
//            var aa = that.opponentArray[j].style.top;
//            var aaInt = parseInt(aa);
//            var topFinal = aaInt + that.increment;
//            that.opponentArray[j].style.top = topFinal + "px";
//            alert("aa")
////            that.arrayOfRectangle[i].innerHTML=topFinal;
//            if (topFinal > 630)
//            {
//                that.opponentContainer.removeChild(that.opponentArray[j]);
//                that.opponentArray.splice(j,1);
////                that.arrayOfRectangle.pop(that.arrayOfRectangle[i]);
//            }
////            var rect=[];
////            rect.push(that.arrayOfRectangle[i]);
//
//            
//        }
        if (that.downcounter > 5000)
            {
//                that.createAdditionalRectangle();
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
    this.bulletCreated=0;
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
        // that.movePlayerUp = setInterval(that.movePlayerUpward, 1);
//       alert("dsknmgkg"+that.arrayRectangle)
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
//            that.player.innerHTML = that.playerY;
            that.player.style.color = "red";
//            that.detectOpponentCollide();
        }
        else
        {
            goUp = 0;
            that.counterup = 0;
            // that.movePlayerDownward();
            //clearInterval(that.movePlayerUp);
            //that.movePlayerDown = setInterval(that.movePlayerDownward, 1);


        }
    };

    this.manageJump = function() {

if(that.bulletCreated==1)
        {
          that.moveBulletUp();  
        }
        if (goUp == 1) {
            that.movePlayerUpward();

        } else {

            that.movePlayerDownward();
        }
        
        

    };

this.moveBulletUp=function ()
{
    
        that.bulletY-=2;
        that.bullet.style.top=that.bulletY+"px";
    
//        that.game.gameBodyContainer.removeChild(that.bullet);        
    
};

    this.movePlayerDownward = function()
    {

        that.playerY += 1;
        that.player.style.top = that.playerY + "px";
        that.detectcollide();
//            that.redRectangleCollide();
//            that.player.innerHTML = that.playerY;
        that.player.style.color = "red";
        if (that.playerY > 640)
        {
//            alert("Game over");
//            goUp = 1;
            //clearInterval(that.movePlayerDown);
        }
//            var collide = new Player();
//            collide.detectcollide();

//            that.detectOpponentCollide();

    };


this.createBullet=function()
{
   that.bullet=document.createElement("div");
   that.bullet.className="bullet";
   that.bulletX=that.playerX+10;
   that.bullet.style.left=that.bulletX+"px";
   that.bullet.style.top=that.playerY+"px";
   that.game.gameBodyContainer.appendChild(that.bullet);
   that.bulletCreated=1;
};

    this.detectcollide = function()
    {
//        alert(that.playerY+40)
//        that.arrayRectangle = document.getElementsByClassName("rectangle");
//    that.arrayOfRectangle = aa.arrayOfRectangle;
        for (var i = 0; i < that.arrayRectangle.length; i++)
        {
            var topofrectangle = that.arrayRectangle[i].style.top;
            var tr = parseInt(topofrectangle);
//            console.log("hahah"+tr)
            var leftofretangle = that.arrayRectangle[i].style.left;
            var lr = parseInt(leftofretangle);
            var rr = lr + 50;
            var pr = that.playerX + 30;
            var pl = that.playerX;
            if (tr == that.playerY + 40 && pl < rr && pr > lr)
            {
//                var clas=that.arrayRectangle[i].className;
//                alert(clas)
//                alert("deteddf")
//                 moveField();

                if (that.arrayRectangle[i].className == "redRectangle")
                {
                    that.game.gameBodyContainer.removeChild(that.arrayRectangle[i]);
                    that.arrayRectangle.splice(i,1);
//                    that.arrayRedrectangle.pop(that.arrayRedrectangle[i]);
                }
                else if (that.arrayRectangle[i].className == "aquaRectangle")
                {
                    mainGameObject = new MainGame(that);
                    that.game.fastMove = 1;                    
                   var ee= mainGameObject.rectangleMoveToDown(that.game.fastMove);
//                    console.log("vitarfaaf");
                    goUp = 1;

//                    alert("aqua")


                }
                else if(that.arrayRectangle[i].className == "opponent")
                {
//                    alert("game over")
                }
                else {
//var aa= new MainGame();
//aa.rectangleMoveToDown();
//var dd =setInterval(aa.rectangleMoveToDown,10);
                    that.arrayRectangle[i].style.backgroundColor = "green";
                    goUp = 1;
//                    that.game.fastMove=0;
//                    mainGameObject.rectangleMoveToDown(that.game.fastMove);
                    //clearInterval(that.movePlayerDown);
                    //that.movePlayerUp = setInterval(that.movePlayerUpward, 1);
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



function detectCollision()
{




}



//function Detect(Maingame) {
//    this.maingame = MainGame();
//    MainGame().arrayOfRectangle;
//    
//    this.collision = function() {
//        that.maingame.arrayofrectangles.lenght;
//    }
//}





function Opponent(getMain)
{
    this.mainGameObj=getMain;
    this.opponents;
    this.randnum;
    this.intRandnum;
    this.container;
    this.opponentArray=[];
    var that = this;
//    this.rectanglelist = document.getElementsByClassName("rectangle");
    
//    this.container = document.getElementsByClassName("gamebody")[0];

//    this.init = function() {
//        that.createOpponent();
//    };

this.getArray=function (array,container)
{
    that.rectanglelist=array;
    that.container=container;
};

    this.createOpponent = function()
    {
//     that.rectanglelist=that.mainGameObj.arrayOfRectangle;  
//        alert(that.rectanglelist.className)
    that.randnum = that.mainGameObj.arrayOfRectangle.length;
    that.intRandnum = parseInt(this.randnum / 6);
        for (var i = 0; i < that.intRandnum; i++)
        {
            var randnum = getrandom(0, that.randnum);
            var aa = parseInt(randnum);
            if(that.mainGameObj.arrayOfRectangle[aa].className="rectangle")
            {                
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
        
//        var obj=new MainGame();
//        obj.getOpponent(that.rectanglelist,that.container);
        
    };

    function getrandom(start, end) {
        return Math.random() * (end - start) + start;
    }
}








 