var canvas;
var canvasBg;
var ctx;//=canvas.getContext('2d');
var ctxBg;
var myImage;
//var bullet=new Image();
//var bomb=new Image();
var myImageArray;
var keys=[];
var Player1,player2,enemy1,enemy2;
var preKeyPress,preKeyPress2,flag=1,flag2=1;
var bulletLoop,enemyLoop;
//var tankSX=0, tankSY=0,enemySX=0,enemySY=40;
//var bulletX,bulletY,oldBulletX,oldBulletY,bulletLoop;
//var oldTankX,oldTankY;
//var preTankXX,preTankYY,preSpaceBarPress=0,postSpaceBarPress,enemyBulletFlag=1;
//var direction=3,enemyBulletX,enemyBulletY;
//var tankXX=tankX,tankYY=tankY,oldTankXX,oldTankYY;//oldtankXX,YY are for making current position of tank in myImagearray value !=0

//flag--one bullet on screen at any time even space bar is pressed continuosly
//bulletflag--not to change bullet direction when tank direction is changed while the bullet is stiil on its course 
//enemybulletflag--one bullet at any time for enemy tank

function Tank(tankX,tankY,tankSX,tankSY,image){
	this.tankX=tankX;
	this.tankY=tankY;
	this.tankSX=tankSX;
	this.tankSY=tankSY;
	this.tankXX=tankX;
	this.tankYY=tankY;
	this.oldTankX=tankX;
	this.oldTankY=tankY;
	this.image=image;
	this.dir="dir";
	this.l=0;
	this.m=0;
	this.n=0;
	this.f=0;
	//this.ctx=canvas.getContext('2d');
	tankImage.onload=function(){
		ctx.drawImage(image,tankSX,tankSY,40,40,tankX,tankY,40,40);
	};
}
//declare tank image object
var tankImage=new Image();
tankImage.src="tank_20.png";

var bulletImage=new Image();
bulletImage.src="bullet.png";


//to find modulus 
Number.prototype.mod = function(n) {
return ((this%n)+n)%n;
}

//to generate random integer btw 0-4
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function(){
myImageArray=([[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
			   [5,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,3,3,1,1,5],
			   [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1,1,5],
			   [5,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1,1,5],
			   [5,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1,1,5],
			   [5,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1,1,5],
			   [5,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1,1,5],
			   [5,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1,1,5],
			   [5,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1,1,5],
			   [5,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1,1,5],
			   [5,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1,1,5],
			   [5,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1,1,5],
			   [5,1,3,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,3,3,1,1,5],
			   [5,1,3,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,3,3,1,1,5],
			   [5,1,3,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,3,3,1,1,5],
			   [5,1,3,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,3,3,1,1,5],
			   [5,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,3,3,0,1,1,3,3,1,1,5],
			   [5,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,3,3,0,1,1,3,3,1,1,5],
			   [5,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,3,3,0,1,1,3,3,1,1,5],
			   [5,1,1,1,3,3,3,3,0,0,2,2,1,1,0,0,1,1,0,0,0,0,3,1,1,3,3,1,1,5],
			   [5,1,1,1,3,3,3,3,0,0,2,2,1,1,0,0,1,1,0,0,0,0,3,1,1,3,3,1,1,5],
			   [5,1,1,1,3,3,3,3,0,0,2,2,1,1,0,0,1,1,0,0,0,0,3,1,1,3,3,1,1,5],
			   [5,4,3,3,3,3,1,1,0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,1,1,3,3,1,1,5],
			   [5,4,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,1,1,3,3,1,1,5],
			   [5,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,3,3,1,1,5],
			   [5,3,3,3,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,3,3,1,1,5],
			   [5,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,3,3,1,1,5],
			   [5,0,0,0,1,1,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,1,3,3,1,1,5],
			   [5,0,0,0,1,1,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,1,3,3,1,1,5],
			   [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]]);

canvas=document.getElementById("screen");
ctx=canvas.getContext('2d');
//canvasBg=document.getElementById("bg");
//ctxBg=canvas.getContext('2d');
drawBg();
//enemy1.drawEnemy();
 
// 
Player1=new Tank(8*20,27*20,0,0,tankImage);
Player2=new Tank(16*20,27*20,0,0,tankImage);
enemy1=new enemy(1*20,1*20,40,40,tankImage);
enemy2=new enemy(17*20,1*20,40,40,tankImage);
window.addEventListener('keydown', whichKeyDown,true);
// window.addEventListener('keydown', function (e) {
//     keys[e.keyCode] = true;
//     whichKeyDown(e);

// });
// window.addEventListener('keyup', function (e) {
//     keys[e.keyCode] = false;
// });
Player1.drawTank();
Player2.drawTank();
});

var drawBg=function(){
		
		myImage=new Image();
		myImage.src='sprites_20.png';
		
		//myImage.onload=function(){
			for (var i = 0; i < 30; i++) {
				for (var j = 0; j < 30; j++) {
					switch(myImageArray[j][i]){
						case 0:break;
						case 1:ctx.drawImage(myImage,0,0,20,20,i*20,j*20,20,20);
							  break;
				        case 2:ctx.drawImage(myImage,20,0,20,20,i*20,j*20,20,20);
				              break;
				        case 3:ctx.drawImage(myImage,0,20,20,20,i*20,j*20,20,20);
				              break;
				        case 4:ctx.drawImage(myImage,20,20,20,20,i*20,j*20,20,20);
				              break;
				        case 5:ctx.drawImage(myImage,40,0,20,20,i*20,j*20,20,20);
				              break;
					}
				};
			};
//creating player1 object


// enemy.onload=function(){
// 		ctx.drawImage(tank,enemySX,enemySY,40,40,enemyX,enemyY,40,40);
// 	};
// 	enemy.src='tanks.png';
// 	enemy1.onload=function(){
// 		ctx.drawImage(tank,enemySX,enemySY,40,40,27*20,1*20,40,40);
// 	};
// 	enemy1.src='tanks.png';
//};
};

Tank.prototype.drawTank=function(){

	ctx.clearRect(this.oldTankX,this.oldTankY,40,40);	
	ctx.drawImage(this.image,this.tankSX,this.tankSY,40,40,this.tankX,this.tankY,40,40);
	drawBg();
};

Tank.prototype.left=function(){
	this.oldTankX=this.tankX;
	this.oldTankY=this.tankY;
	this.tankYY=this.tankY;
	this.tankXX=this.tankX;

	this.dir="left";

	var a=this.tankY%20;
	var b=this.tankX%20;
	//var l,m,n;

	if(a!=0)this.tankYY=this.tankY-a;
        if(b!=0)this.tankXX=this.tankX+(20-b);
        if(a!=0 ){
       		 this.l=myImageArray[this.tankYY/20][(this.tankXX/20)-1];
       		 this.m=myImageArray[(this.tankYY/20)+1][(this.tankXX/20)-1];
       		 this.n=myImageArray[(this.tankYY/20)+2][(this.tankXX/20)-1];
       		}
       	else{
       		this.l=myImageArray[this.tankYY/20][(this.tankXX/20)-1];
       		this.m=myImageArray[(this.tankYY/20)+1][(this.tankXX/20)-1];
       		this.n=0;
       	}
        
        if(this.tankX>=2.5 && (this.l==0|| this.l==3) && (this.m==0 || this.m==3) && (this.n==0 || this.n==3) )
          this.tankX = this.tankX - 2;

            this.tankSX=40;
            this.tankSY=40;
};
Tank.prototype.right=function(){
	this.oldTankX=this.tankX;
	this.oldTankY=this.tankY;
	this.tankYY=this.tankY;
	this.tankXX=this.tankX;

	this.dir="right";

	var a=this.tankY%20;
	var b=this.tankX%20;
	//var l,m,n;

	 	if(a!=0)this.tankYY=this.tankY-a;
        if(b!=0)this.tankXX=this.tankX-b;
        if(a!=0 ){
       		 this.l=myImageArray[this.tankYY/20][(this.tankXX/20)+2];
       		 this.m=myImageArray[(this.tankYY/20)+1][(this.tankXX/20)+2];
       		 this.n=myImageArray[(this.tankYY/20)+2][(this.tankXX/20)+2];
       		}
       	else{
       		this.l=myImageArray[this.tankYY/20][(this.tankXX/20)+2];
       		this.m=myImageArray[(this.tankYY/20)+1][(this.tankXX/20)+2];
       		this.n=0;
       	}
        if(this.tankX<=597.5 && (this.l==0|| this.l==3) && (this.m==0 || this.m==3) && (this.n==0 || this.n==3) )
          this.tankX = this.tankX + 2;

            this.tankSX=40;
            this.tankSY=0;
};
Tank.prototype.up=function(){
	this.oldTankX=this.tankX;
	this.oldTankY=this.tankY;
	this.tankYY=this.tankY;
	this.tankXX=this.tankX;

	this.dir="up";
	this.f=0;
	var a=this.tankY%20;
	var b=this.tankX%20;
	//var l,m,n;

		if(a!=0)this.tankYY=this.tankY+(20-a);
        if(b!=0)this.tankXX=this.tankX-b;
        if(b!=0 ){
       		 this.l=myImageArray[(this.tankYY/20)-1][(this.tankXX/20)];
       		 this.m=myImageArray[(this.tankYY/20)-1][(this.tankXX/20)+1];
       		 this.n=myImageArray[(this.tankYY/20)-1][(this.tankXX/20)+2];
       		}
       	else{
       		this.l=myImageArray[(this.tankYY/20)-1][(this.tankXX/20)];
       		this.m=myImageArray[(this.tankYY/20)-1][(this.tankXX/20)+1];
       		this.n=0;
       	}
       	// if((this.tankY==enemy1.enemyY-20) && ((this.tankX>enemy1.enemyX+20) || (this.tankX+20<enemy1.enemyX)))
       	// 	this.f=1;
       		// if((Player1.tankY==Player2.tankY-20) && ((Player1.tankX>Player2.tankX+20) || (Player1.tankX+20<Player2.tankX)))
       		// this.f=1;
        if(this.tankY>=2.5 && (this.l==0|| this.l==3) && (this.m==0 || this.m==3) && (this.n==0 || this.n==3) && (this.f==0) )
          this.tankY = this.tankY - 2;

            this.tankSX=0;
            this.tankSY=0;
};
Tank.prototype.down=function(){
	this.oldTankX=this.tankX;
	this.oldTankY=this.tankY;
	this.tankYY=this.tankY;
	this.tankXX=this.tankX;

	this.dir="down";

	var a=this.tankY%20;
	var b=this.tankX%20;
	//var l,m,n;

	 	if(a!=0)this.tankYY=this.tankY-a;
        if(b!=0)this.tankXX=this.tankX-b;
        if(b!=0 ){
       		 this.l=myImageArray[(this.tankYY/20)+2][(this.tankXX/20)];
       		 this.m=myImageArray[(this.tankYY/20)+2][(this.tankXX/20)+1];
       		 this.n=myImageArray[(this.tankYY/20)+2][(this.tankXX/20)+2];
       		}
       	else{
       		this.l=myImageArray[(this.tankYY/20)+2][(this.tankXX/20)];
       		this.m=myImageArray[(this.tankYY/20)+2][(this.tankXX/20)+1];
       		this.n=0;
       	}
        if(this.tankY<540 && (this.l==0|| this.l==3) && (this.m==0 || this.m==3) && (this.n==0 || this.n==3) )
          this.tankY = this.tankY + 2;
    
            this.tankSX=0;
            this.tankSY=40;

    
};

function bullet(bulletX,bulletY,bulletSX,bulletSY,image){
	this.bulletX=bulletX;
	this.bulletY=bulletY;
	this.bulletSX=bulletSX;
	this.bulletSY=bulletSY;
	this.image=image;
	this.oldBulletX=bulletX;
	this.oldBulletY=bulletY;
	this.bulletXX=bulletX;
	this.bulletYY=bulletY;
	this.flag=1;
	this.bulletFlag=1;
	this.bulletLoop=0;

}

var player1Bullet,player2Bullet;

bullet.prototype.drawBulletUp=function(){
	this.bulletXX=this.bulletX;
	this.bulletYY=this.bulletY;
	var a=(this.bulletX).mod(20);
	var b=(this.bulletY).mod(20);
	flag=0;
	flag2=0;
	//bulletFlag=0;
	//switch(preKeyPress){//in which direction should bullet go forward
		//case 38://up
			ctx.clearRect(this.bulletX,this.bulletY,3,15);
			this.bulletY=this.bulletY-3;
			if(a!=0)this.bulletXX=(this.bulletXX-a)/20;else this.bulletXX=this.bulletXX/20;
			if(b!=0)this.bulletYY=(this.bulletYY+(20-b))/20;else this.bulletYY=this.bulletYY/20;
			
			if(this.bulletY>21 && myImageArray[this.bulletYY-1][this.bulletXX]==0){
				ctx.drawImage(this.image,0,0,3,15,this.bulletX,this.bulletY,3,15);
			}
			else if(a<5){
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY-1][this.bulletXX]=0;
				myImageArray[this.bulletYY-1][this.bulletXX-1]=0;
				//bomb.src="bomb.png";
				//bomb.onload=function(){
				//ctx.drawImage(bomb,0,0,20,22,bulletXX*20,(bulletYY-1)*20,20,23);
				
			//};
			//bomb.src="bomb.png";
			// bomb.onload=function(){
				
				//ctx.drawImage(bomb,0,0,20,22,(bulletXX-1)*20,(bulletYY-1)*20,20,23);
			// };
			
				
				ctx.clearRect(this.bulletXX*20,(this.bulletYY-1)*20,20,20);
				ctx.clearRect((this.bulletXX-1)*20,(this.bulletYY-1)*20,20,20);
				//ctx.clearRect(bulletXX*20,(bulletYY-1)*20,20,20);
				//ctx.clearRect((bulletXX-1)*20,(bulletYY-1)*20,20,20);
				flag=1;
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;

			}
			else if(a>20){
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY-1][this.bulletXX]=0;
				myImageArray[this.bulletYY-1][this.bulletXX+1]=0;

				ctx.clearRect(this.bulletXX*20,(this.bulletYY-1)*20,20,20);
				ctx.clearRect((this.bulletXX+1)*20,(this.bulletYY-1)*20,20,20);
				flag=1;
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}
			else{
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY-1][this.bulletXX]=0;
				ctx.clearRect(this.bulletXX*20,(this.bulletYY-1)*20,20,20);
				flag=1;
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}
			//break;
			//bomb.src="bomb.png";
		}
	bullet.prototype.drawBulletDown=function(){
		this.bulletXX=this.bulletX;
		this.bulletYY=this.bulletY;
		var a=(this.bulletX).mod(20);
		var b=(this.bulletY).mod(20);
		flag=0;
		flag2=0;
		this.bulletFlag=0;
		//case 40://down
			ctx.clearRect(this.bulletX,this.bulletY,3,15);
			this.bulletY=this.bulletY+3;
			if(a!=0)this.bulletXX=(this.bulletXX-a)/20;else this.bulletXX=this.bulletXX/20;
			if(b!=0)this.bulletYY=(this.bulletYY-b)/20;else this.bulletYY=this.bulletYY/20;

			if(this.bulletY<=579 && myImageArray[this.bulletYY][this.bulletXX]==0)
				ctx.drawImage(this.image,0,0,3,15,this.bulletX,this.bulletY,3,15);
			else if(a<5){
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY][this.bulletXX]=0;
				myImageArray[this.bulletYY][this.bulletXX-1]=0;
				ctx.clearRect(this.bulletXX*20,(this.bulletYY)*20,20,20);
				ctx.clearRect((this.bulletXX-1)*20,(this.bulletYY)*20,20,20);
				flag=1;
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;

			}
			else if(a>20){
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY][this.bulletXX]=0;
				myImageArray[this.bulletYY][this.bulletXX+1]=0;
				ctx.clearRect(this.bulletXX*20,(this.bulletYY)*20,20,20);
				ctx.clearRect((this.bulletXX+1)*20,(this.bulletYY)*20,20,20);
				flag=1;
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}
			else{
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY][this.bulletXX]=0;
				ctx.clearRect(this.bulletXX*20,(this.bulletYY)*20,20,20);
				flag=1;
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}
			//break;
		}
	bullet.prototype.drawBulletRight=function(){
		//var bulletXX=bulletX;
		//var bulletYY=bulletY;
		this.bulletXX=this.bulletX;
		this.bulletYY=this.bulletY;
		var a=(this.bulletX).mod(20);
		var b=(this.bulletY).mod(20);
		flag=0;
		flag2=0;
		this.bulletFlag=0;
		//case 39://right
			
			
			ctx.clearRect(this.bulletX,this.bulletY,15,3);
			this.bulletX=this.bulletX+3;
			if(a!=0)this.bulletXX=(this.bulletXX-a)/20;else this.bulletXX=this.bulletXX/20;
			if(b!=0)this.bulletYY=(this.bulletYY-b)/20;else this.bulletYY=this.bulletYY/20;
			if(this.bulletX<=579 && myImageArray[this.bulletYY][this.bulletXX]==0)
				ctx.drawImage(this.image,0,0,15,3,this.bulletX,this.bulletY,15,3);
			else if(b<5){
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY][this.bulletXX]=0;
				myImageArray[this.bulletYY-1][this.bulletXX]=0;
				ctx.clearRect(this.bulletXX*20,(this.bulletYY)*20,20,20);
				ctx.clearRect((this.bulletXX)*20,(this.bulletYY-1)*20,20,20);
				flag=1;
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;

			}
			else if(b>20){
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY+1][this.bulletXX]=0;
				myImageArray[this.bulletYY][this.bulletXX]=0;
				ctx.clearRect(this.bulletXX*20,(this.bulletYY)*20,20,20);
				ctx.clearRect((this.bulletXX)*20,(this.bulletYY+1)*20,20,20);
				flag=1;
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}
			else{
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY][this.bulletXX]=0;
				ctx.clearRect(this.bulletXX*20,this.bulletYY*20,20,20);
				flag=1;	
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}		
			//break;
		}
		
	bullet.prototype.drawBulletLeft=function(){
		this.bulletXX=this.bulletX;
		this.bulletYY=this.bulletY;
		var a=(this.bulletX).mod(20);
		var b=(this.bulletY).mod(20);
		flag=0;
		flag2=0;
		this.bulletFlag=0;
		//case 37://left
			ctx.clearRect(this.bulletX,this.bulletY,15,3);
			this.bulletX=this.bulletX-3;
			if(a!=0)this.bulletXX=(this.bulletXX+(20-a))/20;else this.bulletXX=this.bulletXX/20;
			if(b!=0)this.bulletYY=(this.bulletYY-b)/20;else this.bulletYY=this.bulletYY/20;
			if(this.bulletX>21 && myImageArray[this.bulletYY][this.bulletXX-1]==0)
				ctx.drawImage(this.image,0,0,15,3,this.bulletX,this.bulletY,15,3);
			else if(b<5){
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY][this.bulletXX-1]=0;
				myImageArray[this.bulletYY-1][this.bulletXX-1]=0;
				ctx.clearRect((this.bulletXX-1)*20,(this.bulletYY)*20,20,20);
				ctx.clearRect((this.bulletXX-1)*20,(this.bulletYY-1)*20,20,20);
				flag=1;
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;

			}
			else if(b>20){
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY+1][this.bulletXX-1]=0;
				myImageArray[this.bulletYY][this.bulletXX-1]=0;
				ctx.clearRect((this.bulletXX-1)*20,(this.bulletYY)*20,20,20);
				ctx.clearRect((this.bulletXX-1)*20,(this.bulletYY+1)*20,20,20);
				flag=1;
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}
			else{
				clearInterval(this.bulletLoop);
				myImageArray[this.bulletYY][this.bulletXX-1]=0;
				ctx.clearRect((this.bulletXX-1)*20,this.bulletYY*20,20,20);
				flag=1;
				flag2=1;
				this.bulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}
			//break;
		}
bullet.prototype.bulletDown=function(){
		//bulletX=tankX+19.3;
    	//bulletY=tankY+50;
    	this.bulletX=this.bulletX+19.3;
    	this.bulletY=this.bulletY+42;
    	//bullet.onload=function(){
			ctx.drawImage(this.image,0,0,3,15,this.bulletX,this.bulletY,3,15);
		//};
		//bullet.src='bullet.png';	
		//bind binds the obj when setinterval call it from 2nd time or else use explicit closure --see note for ref
    	this.bulletLoop=setInterval(this.drawBulletDown.bind(this), 1000 / 100);
}
bullet.prototype.bulletRight=function(){
		this.bulletX=this.bulletX+40;
    	this.bulletY=this.bulletY+18.5;
    	//bullet.onload=function(){
			ctx.drawImage(this.image,0,0,15,3,this.bulletX,this.bulletY,15,3);
		//};
		//bullet.src='bullet.png';	
    	this.bulletLoop=setInterval(this.drawBulletRight.bind(this), 1000 / 100);
}
bullet.prototype.bulletLeft=function(){
		this.bulletX=this.bulletX-20;
    	this.bulletY=this.bulletY+18.5;
    	//bullet.onload=function(){
			ctx.drawImage(this.image,0,0,15,3,this.bulletX,this.bulletY,15,3);
		//};
		//bullet.src='bullet.png';	
    	this.bulletLoop=setInterval(this.drawBulletLeft.bind(this), 1000 / 100);
}
bullet.prototype.bulletUp=function(){
		this.bulletX=this.bulletX+19;
    	this.bulletY=this.bulletY-17;
    	//this.image.onload=function(){
			ctx.drawImage(this.image,0,0,3,15,this.bulletX,this.bulletY,3,15);
		//};
		//bullet.src='bullet.png';	
    	this.bulletLoop=setInterval(this.drawBulletUp.bind(this), 1000 / 100);
}

function whichKeyDown(evt) {

	if(!preKeyPress)preKeyPress=38;
	if(!preKeyPress2)preKeyPress2=87;

	var keyPress=evt.keyCode;
        switch (keyPress) {

          // Left arrow.
        case 37:
        	Player1.left();
          break;

          // Right arrow.
        case 39:
       		Player1.right();
          break;

          // Down arrow
        case 40:
       		Player1.down();
          break;

          // Up arrow 
        case 38:
        	Player1.up();
          break;

           // Left arrow.
        case 65:
        	Player2.left();
          break;

          // Right arrow.
        case 68:
       		Player2.right();
          break;

          // Down arrow
        case 83:
       		Player2.down();
          break;

          // Up arrow 
        case 87:
        	Player2.up();
          break;
        case 32:
        if(flag==1 ){
        	player1Bullet=new bullet(Player1.tankX,Player1.tankY,0,0,bulletImage);
        	switch(preKeyPress){
        		case 40://down
		        	
		        	player1Bullet.bulletDown();

		        	break;
        	
		        case 39://right
		        	player1Bullet.bulletRight();
		        	break;
		        case 37://left
		        	player1Bullet.bulletLeft();
		        	break;
        		case 38://up
		        	player1Bullet.bulletUp();

		        	break;
		    }
		}
		break;
		case 70:
        if(flag2==1 ){
        	player2Bullet=new bullet(Player2.tankX,Player2.tankY,0,0,bulletImage);
        	switch(preKeyPress2){
        		case 83://down
		        	
		        	player2Bullet.bulletDown();

		        	break;
        	
		        case 68://right
		        	player2Bullet.bulletRight();
		        	break;
		        case 65://left
		        	player2Bullet.bulletLeft();
		        	break;
        		case 87://up
		        	player2Bullet.bulletUp();

		        	break;
		    }
		}
        
        break;
      }
		//preSpaceBarPress=keyPress;
      if(keyPress==37 || keyPress==38 || keyPress==39 || keyPress==40){
        preKeyPress=keyPress;
       }
       if(keyPress==65 || keyPress==68 || keyPress==83 || keyPress==87){
       	preKeyPress2=keyPress;
       }
       //else {//if(keyPress==37 || keyPress==38 || keyPress==39 || keyPress==40) {
       //	postSpaceBarPress=keyPress;
       //}
       Player2.drawTank();
       Player1.drawTank();

    }
    // var enemyTank=new Image();
    // enemyTank.src="";
function enemy(enemyX,enemyY,enemySX,enemySY,image){
	this.enemyX=enemyX;
	this.enemyY=enemyY;
	this.enemySX=enemySX;
	this.enemySY=enemySY;
	this.image=image;
	this.enemyYY=enemyX;
	this.enemyYY=enemyY;
	this.oldEnemyY=enemyY;
	this.oldEnemyX=enemyX;
	this.enemyBulletX=enemyX;
	this.enemyBulletY=enemyY;
	this.enemyBulletXX=enemyX;
	this.enemyBulletYY=enemyY;
	this.direction=3;
	this.enemyBulletFlag=1;
	this.enemyBulletLoop=0;
	this.enemyBullet=bulletImage;
	ctx.drawImage(this.image,40,40,40,40,this.enemyX,this.enemyY,40,40);
	this.enemyLoop=setInterval(this.drawEnemy.bind(this), 1000 / 40);
	this.enemyBulletLoop=setInterval(this.drawEnemyBullet.bind(this),2000)
}

enemy.prototype.drawEnemy=function(){
	this.enemyYY=this.enemyY;
	this.enemyXX=this.enemyX;
	var a=this.enemyY%20;
	var b=this.enemyX%20;
	
	this.oldEnemyY=this.enemyY;
	this.oldEnemyX=this.enemyX;
	var l,m,m,p=1;
	switch (this.direction) {

          // Left arrow.
        case 0:
        
    	//ctx.drawImage(bullet,0,0,15,3,bulletX,bulletY,15,3);
        if(a!=0)this.enemyYY=this.enemyY-a;
        if(b!=0)this.enemyXX=this.enemyX+(20-b);
        if(a!=0 ){
       		 l=myImageArray[this.enemyYY/20][(this.enemyXX/20)-1];
       		 m=myImageArray[(this.enemyYY/20)+1][(this.enemyXX/20)-1];
       		 n=myImageArray[(this.enemyYY/20)+2][(this.enemyXX/20)-1];
       		}
       	else{
       		l=myImageArray[this.enemyYY/20][(this.enemyXX/20)-1];
       		m=myImageArray[(this.enemyYY/20)+1][(this.enemyXX/20)-1];
       		n=0;
       	}
       	if(this.enemyX<=this.tankX+40 && Math.abs(this.enemyY-this.tankY)<40 && this.enemyX>this.tankX)p=0;
        
        if(this.enemyX>=2.5 && l==0 && m==0 && n==0 && p!=0)
          this.enemyX = this.enemyX - 2;
        else
        	this.direction=getRandomInt(0,3);

            this.enemySX=40;
            this.enemySY=40;
            //bulletLoop=setInterval(drawBulletLeft, 1000 / 400);
          break;

          // Right arrow.
        case 2:
        
    	//ctx.drawImage(bullet,0,0,15,3,bulletX,bulletY,15,3);
        if(a!=0)this.enemyYY=this.enemyY-a;
        if(b!=0)this.enemyXX=this.enemyX-b;
        if(a!=0 ){
       		 l=myImageArray[this.enemyYY/20][(this.enemyXX/20)+2];
       		 m=myImageArray[(this.enemyYY/20)+1][(this.enemyXX/20)+2];
       		 n=myImageArray[(this.enemyYY/20)+2][(this.enemyXX/20)+2];
       		}
       	else{
       		l=myImageArray[this.enemyYY/20][(this.enemyXX/20)+2];
       		m=myImageArray[(this.enemyYY/20)+1][(this.enemyXX/20)+2];
       		n=0;
       	}
       	if(this.enemyX>=this.tankX-40 && Math.abs(this.enemyY-this.tankY)<40 && this.enemyX<this.tankX)p=0;
        if(this.enemyX<=597.5 && l==0 && m==0 && n==0 && p!=0)
          this.enemyX = this.enemyX + 2;
      	else
        	this.direction=getRandomInt(0,3);

            this.enemySX=40;
            this.enemySY=0;
            //bulletLoop=setInterval(drawBulletRight, 1000 / 400);
          break;

          // Down arrow
        case 3:
        
		//ctx.drawImage(bullet,0,0,3,15,bulletX,bulletY,3,15);
        if(a!=0)this.enemyYY=this.enemyY-a;
        if(b!=0)this.enemyXX=this.enemyX-b;
        if(b!=0 ){
       		 l=myImageArray[(this.enemyYY/20)+2][(this.enemyXX/20)];
       		 m=myImageArray[(this.enemyYY/20)+2][(this.enemyXX/20)+1];
       		 n=myImageArray[(this.enemyYY/20)+2][(this.enemyXX/20)+2];
       		}
       	else{
       		l=myImageArray[(this.enemyYY/20)+2][(this.enemyXX/20)];
       		m=myImageArray[(this.enemyYY/20)+2][(this.enemyXX/20)+1];
       		n=0;
       	}
       	if(Math.abs(this.enemyX-this.tankX)<40 && this.enemyY>=this.tankY-40 && this.enemyY<this.tankY)p=0;
        if(this.enemyY<540 && l==0 && m==0 && n==0 && p!=0)
          this.enemyY = this.enemyY + 2;
    	else
        	this.direction=getRandomInt(0,3);

            this.enemySX=0;
            this.enemySY=40;
            //bulletLoop=setInterval(drawBulletDown, 1000 / 400);
          break;

          // Up arrow 
        case 1:
        
    	//ctx.drawImage(bullet,0,0,3,15,bulletX,bulletY,3,15);
        if(a!=0)this.enemyYY=this.enemyY+(20-a);
        if(b!=0)this.enemyXX=this.enemyX-b;
        if(b!=0 ){
       		 l=myImageArray[(this.enemyYY/20)-1][(this.enemyXX/20)];
       		 m=myImageArray[(this.enemyYY/20)-1][(this.enemyXX/20)+1];
       		 n=myImageArray[(this.enemyYY/20)-1][(this.enemyXX/20)+2];
       		}
       	else{
       		l=myImageArray[(this.enemyYY/20)-1][(this.enemyXX/20)];
       		m=myImageArray[(this.enemyYY/20)-1][(this.enemyXX/20)+1];
       		n=0;
       	}
       	if(Math.abs(this.enemyX-this.tankX)<40 && this.enemyY<=this.tankY+40 && this.enemyY>this.tankY)p=0;
        if(this.enemyY>=2.5 && l==0 && m==0 && n==0 && p!=0)
          this.enemyY = this.enemyY - 2;
      	else
        	this.direction=getRandomInt(0,3);

            this.enemySX=0;
            this.enemySY=0;
           // bulletLoop=setInterval(drawBulletUp, 1000 / 400);
          break;
      }
	ctx.clearRect(this.oldEnemyX,this.oldEnemyY,40,40);	
	ctx.drawImage(this.image,this.enemySX,this.enemySY,40,40,this.enemyX,this.enemyY,40,40);
}
//var enemyBullet=new Image();

enemy.prototype.drawEnemyBullet=function(){
	if(this.enemyBulletFlag==1){
		switch(this.direction){
			case 0:
				this.enemyBulletX=this.enemyX-16;
    			this.enemyBulletY=this.enemyY+20.5;
    			//enemyBullet.onload=function(){
    			ctx.drawImage(bulletImage,0,0,15,3,this.enemyBulletX,this.enemyBulletY,15,3);
    		//};
				this.enemyBulletLoop=setInterval(this.drawEnemyBulletLeft.bind(this), 1000 / 100);
				break;
			case 1:
				this.enemyBulletX=this.enemyX+20.5;
    			this.enemyBulletY=this.enemyY-13;
    			ctx.drawImage(bulletImage,0,0,3,15,this.enemyBulletX,this.enemyBulletY,3,15);
				this.enemyBulletLoop=setInterval(this.drawEnemyBulletUp.bind(this), 1000 / 100);
				break;
			case 2:
				this.enemyBulletX=this.enemyX+52;
    			this.enemyBulletY=this.enemyY+20.5;
    			ctx.drawImage(bulletImage,0,0,15,3,this.enemyBulletX,this.enemyBulletY,15,3);
				this.enemyBulletLoop=setInterval(this.drawEnemyBulletRight.bind(this), 1000 / 100);
				break;
			case 3:
				this.enemyBulletX=this.enemyX+20.5;
				this.enemyBulletY=this.enemyY+40;
				ctx.drawImage(bulletImage,0,0,3,15,this.enemyBulletX,this.enemyBulletX,3,15);
				this.enemyBulletLoop=setInterval(this.drawEnemyBulletDown.bind(this), 1000 / 100);
				break;
		}
		//enemyBullet.src="bullet.png";
	}
	
}

enemy.prototype.drawEnemyBulletUp=function(){
	this.enemyBulletXX=this.enemyBulletX;
	this.enemyBulletYY=this.enemyBulletY;
	var a=this.enemyBulletX.mod(20);
	var b=this.enemyBulletY.mod(20);
	//flag=0;
	this.enemyBulletFlag=0;
	//switch(preKeyPress){//in which direction should bullet go forward
		//case 38://up
			ctx.clearRect(this.enemyBulletX,this.enemyBulletX,3,15);
			this.enemyBulletX=this.enemyBulletX-3;
			if(a!=0)this.enemyBulletXX=(this.enemyBulletXX-a)/20;else this.enemyBulletXX=this.enemyBulletXX/20;
			if(b!=0)this.enemyBulletYY=(this.enemyBulletYY+(20-b))/20;else this.enemyBulletYY=this.enemyBulletYY/20;
			
			if(this.enemyBulletX>21 && myImageArray[this.enemyBulletYY-1][this.enemyBulletXX]==0){
				ctx.drawImage(this.enemyBullet,0,0,3,15,this.enemyBulletX,this.enemyBulletX,3,15);
			}
			else if(a<5){
				clearInterval(this.enemyBulletLoop);
				if(myImageArray[this.enemyBulletYY-1][this.enemyBulletXX]!=5)
				myImageArray[this.enemyBulletYY-1][this.enemyBulletXX]=0;
				if(myImageArray[this.enemyBulletYY-1][this.enemyBulletXX-1]!=5)
				myImageArray[this.enemyBulletYY-1][this.enemyBulletXX-1]=0;
				// bomb.src="bomb.png";
				// bomb.onload=function(){
				// ctx.drawImage(bomb,0,0,20,22,enemyBulletXX*20,(enemyBulletYY-1)*20,20,23);
				
			//};
			//bomb.src="bomb.png";
			// bomb.onload=function(){
				
				//ctx.drawImage(bomb,0,0,20,22,(enemyBulletXX-1)*20,(enemyBulletYY-1)*20,20,23);
			// };
			
				
				ctx.clearRect(this.enemyBulletXX*20,(this.enemyBulletYY-1)*20,20,20);
				ctx.clearRect((this.enemyBulletXX-1)*20,(this.enemyBulletYY-1)*20,20,20);
				//ctx.clearRect(bulletXX*20,(bulletYY-1)*20,20,20);
				//ctx.clearRect((bulletXX-1)*20,(bulletYY-1)*20,20,20);
				//flag=1;
				this.enemyBulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;

			}
			else if(a>20){
				clearInterval(this.enemyBulletLoop);
				if(myImageArray[this.enemyBulletYY-1][this.enemyBulletXX]!=5)
				myImageArray[this.enemyBulletYY-1][this.enemyBulletXX]=0;
				if(myImageArray[this.enemyBulletYY-1][this.enemyBulletXX+1]!=5)
				myImageArray[this.enemyBulletYY-1][this.enemyBulletXX+1]=0;

				ctx.clearRect(this.enemyBulletXX*20,(this.enemyBulletYY-1)*20,20,20);
				ctx.clearRect((this.enemyBulletXX+1)*20,(this.enemyBulletYY-1)*20,20,20);
				//flag=1;
				this.enemyBulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}
			else{
				clearInterval(this.enemyBulletLoop);
				if(myImageArray[this.enemyBulletYY][this.enemyBulletXX-1]!=5)
				myImageArray[this.enemyBulletYY-1][this.enemyBulletXX]=0;
				ctx.clearRect(this.enemyBulletXX*20,(this.enemyBulletYY-1)*20,20,20);
				//flag=1;
				this.enemyBulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}
			//break;
			//bomb.src="bomb.png";
	}
enemy.prototype.drawEnemyBulletDown=function(){
	this.enemyBulletXX=this.enemyBulletX;
	this.enemyBulletYY=this.enemyBulletY;
	var a=this.enemyBulletX.mod(20);
	var b=this.enemyBulletY.mod(20);
	//flag=0;
	this.enemyBulletFlag=0;
	//case 40://down
		ctx.clearRect(this.enemyBulletX,this.enemyBulletY,3,15);
		this.enemyBulletY=this.enemyBulletY+3;
		if(a!=0)this.enemyBulletXX=(this.enemyBulletXX-a)/20;else this.enemyBulletXX=this.enemyBulletXX/20;
		if(b!=0)this.enemyBulletYY=(this.enemyBulletYY-b)/20;else this.enemyBulletYY=this.enemyBulletYY/20;

		if(this.enemyBulletY<=579 && myImageArray[this.enemyBulletYY][this.enemyBulletXX]==0)
			ctx.drawImage(this.enemyBullet,0,0,3,15,this.enemyBulletX,this.enemyBulletY,3,15);
		else if(a<5){
			clearInterval(this.enemyBulletLoop);
			if(myImageArray[this.enemyBulletYY][this.enemyBulletXX]!=5)
			myImageArray[this.enemyBulletYY][this.enemyBulletXX]=0;
			if(myImageArray[this.enemyBulletYY][this.enemyBulletXX-1]!=5)
			myImageArray[this.enemyBulletYY][this.enemyBulletXX-1]=0;
			ctx.clearRect(this.enemyBulletXX*20,(this.enemyBulletYY)*20,20,20);
			ctx.clearRect((this.enemyBulletXX-1)*20,(this.enemyBulletYY)*20,20,20);
			//flag=1;
			this.enemyBulletFlag=1;
			//if(postSpaceBarPress!=32)
			//preKeyPress=postSpaceBarPress;

		}
		else if(a>20){
			clearInterval(this.enemyBulletLoop);
			if(myImageArray[this.enemyBulletYY][this.enemyBulletXX]!=5)
			myImageArray[this.enemyBulletYY][this.enemyBulletXX]=0;
			if(myImageArray[this.enemyBulletYY][this.enemyBulletXX+1]!=5)
			myImageArray[this.enemyBulletYY][this.enemyBulletXX+1]=0;
			ctx.clearRect(this.enemyBulletXX*20,(this.enemyBulletYY)*20,20,20);
			ctx.clearRect((this.enemyBulletXX+1)*20,(this.enemyBulletYY)*20,20,20);
			//flag=1;
			this.enemyBulletFlag=1;
			//if(postSpaceBarPress!=32)
			//preKeyPress=postSpaceBarPress;
		}
		else{
			clearInterval(this.enemyBulletLoop);
			if(myImageArray[this.enemyBulletYY][this.enemyBulletXX]!=5)
			myImageArray[this.enemyBulletYY][this.enemyBulletXX]=0;
			ctx.clearRect(this.enemyBulletXX*20,(this.enemyBulletYY)*20,20,20);
			//flag=1;
			this.enemyBulletFlag=1;
			//if(postSpaceBarPress!=32)
			//preKeyPress=postSpaceBarPress;
		}
		//break;
	}
enemy.prototype.drawEnemyBulletRight=function(){
	this.enemyBulletXX=this.enemyBulletX;
	this.enemyBulletYY=this.enemyBulletY;
	var a=this.enemyBulletX.mod(20);
	var b=this.enemyBulletY.mod(20);
	//flag=0;
	this.enemyBulletFlag=0;
	//case 39://right
		
		
		ctx.clearRect(this.enemyBulletX,this.enemyBulletY,15,3);
		this.enemyBulletX=this.enemyBulletX+3;
		if(a!=0)this.enemyBulletXX=(this.enemyBulletXX-a)/20;else this.enemyBulletXX=this.enemyBulletXX/20;
		if(b!=0)this.enemyBulletYY=(this.enemyBulletYY-b)/20;else this.enemyBulletYY=this.enemyBulletYY/20;
		if(this.enemyBulletX<=579 && myImageArray[this.enemyBulletYY][this.enemyBulletXX]==0)
			ctx.drawImage(this.enemyBullet,0,0,15,3,this.enemyBulletX,this.enemyBulletY,15,3);
		else if(b<5){
			clearInterval(this.enemyBulletLoop);
			if(myImageArray[this.enemyBulletYY][this.enemyBulletXX]!=5)
			myImageArray[this.enemyBulletYY][this.enemyBulletXX]=0;
			if(myImageArray[this.enemyBulletYY-1][this.enemyBulletXX]!=5)
			myImageArray[this.enemyBulletYY-1][this.enemyBulletXX]=0;
			ctx.clearRect(this.enemyBulletXX*20,(this.enemyBulletYY)*20,20,20);
			ctx.clearRect((this.enemyBulletXX)*20,(this.enemyBulletYY-1)*20,20,20);
			//flag=1;
			this.enemyBulletFlag=1;
			//if(postSpaceBarPress!=32)
			//preKeyPress=postSpaceBarPress;

		}
		else if(b>20){
			clearInterval(this.enemyBulletLoop);
			if(myImageArray[this.enemyBulletYY+1][this.enemyBulletXX]!=5)
			myImageArray[this.enemyBulletYY+1][this.enemyBulletXX]=0;
			if(myImageArray[this.enemyBulletYY][this.enemyBulletXX]!=5)
			myImageArray[this.enemyBulletYY][this.enemyBulletXX]=0;
			ctx.clearRect(this.enemyBulletXX*20,(this.enemyBulletYY)*20,20,20);
			ctx.clearRect((this.enemyBulletXX)*20,(this.enemyBulletYY+1)*20,20,20);
			//flag=1;
			this.enemyBulletFlag=1;
			//if(postSpaceBarPress!=32)
			//preKeyPress=postSpaceBarPress;
		}
		else{
			clearInterval(this.enemyBulletLoop);
			if(myImageArray[this.enemyBulletYY][this.enemyBulletXX]!=5)
			myImageArray[this.enemyBulletYY][this.enemyBulletXX]=0;
			ctx.clearRect(this.enemyBulletXX*20,this.enemyBulletYY*20,20,20);
			//flag=1;	
			this.enemyBulletFlag=1;
			//if(postSpaceBarPress!=32)
			//preKeyPress=postSpaceBarPress;
		}		
		//break;
	}
enemy.prototype.drawEnemyBulletLeft=function(){
		this.enemyBulletXX=this.enemyBulletX;
		this.enemyBulletYY=this.enemyBulletY;
		var a=this.enemyBulletX.mod(20);
		var b=this.enemyBulletY.mod(20);
		//flag=0;
		this.enemyBulletFlag=0;
		//case 37://left
			ctx.clearRect(this.enemyBulletX,this.enemyBulletY,15,3);
			this.enemyBulletX=this.enemyBulletX-3;
			if(a!=0)this.enemyBulletXX=(this.enemyBulletXX+(20-a))/20;else this.enemyBulletXX=this.enemyBulletXX/20;
			if(b!=0)this.enemyBulletYY=(this.enemyBulletYY-b)/20;else this.enemyBulletYY=this.enemyBulletYY/20;
			if(this.enemyBulletX>21 && myImageArray[this.enemyBulletYY][this.enemyBulletXX-1]==0)
				ctx.drawImage(this.enemyBullet,0,0,15,3,this.enemyBulletX,this.enemyBulletY,15,3);
			else if(b<5){
				clearInterval(this.enemyBulletLoop);
				if(myImageArray[this.enemyBulletYY][this.enemyBulletXX-1]!=5)
				myImageArray[this.enemyBulletYY][this.enemyBulletXX-1]=0;
				if(myImageArray[this.enemyBulletYY-1][this.enemyBulletXX-1]!=5)
				myImageArray[this.enemyBulletYY-1][this.enemyBulletXX-1]=0;
				ctx.clearRect((this.enemyBulletXX-1)*20,(this.enemyBulletYY)*20,20,20);
				ctx.clearRect((this.enemyBulletXX-1)*20,(this.enemyBulletYY-1)*20,20,20);
				//flag=1;
				this.enemyBulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;

			}
			else if(b>20){
				clearInterval(this.enemyBulletLoop);
				if(myImageArray[this.enemyBulletYY+1][this.enemyBulletXX-1]!=5)
				myImageArray[this.enemyBulletYY+1][this.enemyBulletXX-1]=0;
				if(myImageArray[this.enemyBulletYY][this.enemyBulletXX-1]!=5)
				myImageArray[this.enemyBulletYY][this.enemyBulletXX-1]=0;
				ctx.clearRect((this.enemyBulletXX-1)*20,(this.enemyBulletYY)*20,20,20);
				ctx.clearRect((this.enemyBulletXX-1)*20,(this.enemyBulletYY+1)*20,20,20);
				//flag=1;
				this.enemyBulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}
			else{
				clearInterval(this.enemyBulletLoop);
				if(myImageArray[this.enemyBulletYY][this.enemyBulletXX-1]!=5)
				myImageArray[this.enemyBulletYY][this.enemyBulletXX-1]=0;
				ctx.clearRect((this.enemyBulletXX-1)*20,this.enemyBulletYY*20,20,20);
				//flag=1;
				this.enemyBulletFlag=1;
				//if(postSpaceBarPress!=32)
				//preKeyPress=postSpaceBarPress;
			}
			//break;
		}