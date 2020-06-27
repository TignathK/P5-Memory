var showImages=true;
// various Click related vaiables
var newClick=false;//Mouse clicked inside canvasWidth
var firstClick= false; //first grid object is clickes and dispayed
var firstClickTime=0; // time of click for the fisrtimage
var secondClick=false;// secondClick status after firstClick
var secondClickTime=0;// time for secondClick
var numClicks =0;// numClicks since start of the program

var startTime;
var gameDuration;
var pairMatched=0;
var totalPairs=8;

var waitingTime1st = 5; // waiting time for the second click
var waitingTime2nd = 2; // Waiting time to display both images if not identical
var firstGridId =[0,0]; // temporary pointer for first image dispayes
var secondGridId= [0,0]; // temporary pointer for the second image dispayed.
var pairMatch=false;
var gridWidth; // RasterWidth
var gridHeight;// RasterHeight
var numGrids=4; //Number of Row and Columns
var gridNo = {X:0, Y:0};
var canvasWidth=820;
var canvasHeight=820;
var baseID= [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];//Reset Value for image ID
var imageID= [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];// address of images in grid after shuffle
var gridImageNo=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; // pointer to imageSet element in the grid
var currentGridImageNo=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];// Actual  pinters after click
var gridIndex;
var imageSet=[];// loaded Images Element Zero reserved for backface
var imageName=["Bunny","Frosch", "Maulwurf", "Tomoto", "Smiley01", "Smiley02","Smiley03","Smiley04" ];// list of card images

// Message Board canvas


function setup() {
    // log Start time
    startTime = new Date();
    //writeMessage("Hallo World - Game started", 10,30);
    //writeMessage(startTime, 10,50);

    createCanvas(canvasWidth, canvasHeight);
    textSize(12);
    stroke(255, 0, 237);
    strokeWeight(4);
    gridWidth=(canvasWidth-20)/numGrids;
    gridHeight= (canvasHeight-20)/numGrids;

    // Create backface Image and load
    imageSet[0]=createGraphics(gridWidth,gridHeight);
    star(imageSet[0],gridWidth,gridHeight);

    // Crearte Imagebuffers
    // load Images in imageSet
    for (var i1=1;i1<=8;i1++){
      imageSet[i1]=createGraphics(gridWidth,gridHeight);
      loadImageSet(imageSet[i1], imageName[i1-1]);
    }

    // Shuffkle deck
    imageID=baseID;
    for (var j=0;j<numGrids;j++)
    { for (var i =0; i < numGrids; i++)
    { gridIndex = round(random(0,15));
    //  text(gridIndex, 10,j*20);
    while (imageID[gridIndex]< 0) {gridIndex =round(random(0,15));}
    gridImageNo[i][j]= imageID[gridIndex];
    imageID[gridIndex]=-1;
    }}
    //text(imageID, 0,0);

    }

function draw() {
    background(255, 255, 247);
    stroke(255, 0, 237);
    strokeWeight(4);


    for(var i=0; i<numGrids+1;i++)
    {var lineY = 20 + (i * gridHeight);
        line(20, lineY, canvasWidth, lineY);}
    for(var j=0; j<numGrids+1;j++)
    {var lineX = 20 + (j * gridWidth);
        line(lineX, 20,lineX, canvasHeight);
        }

// backfaces in raster
        for ( l=0;l<numGrids;l++)
          { for (k =0; k < numGrids; k++)
          {
           image(imageSet[0], k*200+20, l*200+20);
         }}

        strokeWeight(1);
        textSize(20);

        gameActive();// Monitor of timeout or matched pair etc

  // Draw Image
      for ( l=0;l<numGrids;l++)
        { for (k =0; k < numGrids; k++)
        {
         //text("Image No" + gridImageNo[k][l], k*200+100, l*200+100);
         if (showImages) {image(imageSet[(currentGridImageNo[k][l])], k*200+20, l*200+20);}
       }}

   }


      function loadImageSet(leftBuffer, imageSpec) {
          leftBuffer.background(0, 0, 0);
          leftBuffer.stroke(100,100,100);
        //  "Bunny","Frosch", "Maulwurf", "Tomoto", "Smiley01", "Smiley02","Smiley03","Smeily04"
          switch (imageSpec) {
            case "Bunny":
            bunny(leftBuffer,gridWidth,gridHeight);
            break;
            case "Frosch":
            frosch(leftBuffer,gridWidth,gridHeight);
            break;
            case "Maulwurf":
            maulwurf(leftBuffer,gridWidth,gridHeight);
            break;
            case "Tomoto":
            tomato(leftBuffer,gridWidth,gridHeight);
            break;
            case "Smiley01":
            smile01(leftBuffer,gridWidth,gridHeight);
            break;
            case "Smiley02":
            smile02(leftBuffer,gridWidth,gridHeight);
            break;
            case "Smiley03":
            smile03(leftBuffer,gridWidth,gridHeight);
            break;
            case "Smiley04":
            smile04(leftBuffer,gridWidth,gridHeight);
            break;
          }
          }


          function bunny(bufferName,cardWidth, cardHeight) {
            var augenGrosse =20;
            var zahnLaenge =20;

            bufferName.rect(0,0,cardWidth, cardHeight);
            bufferName.fill(100,0,100);
            //ellipse(150, 70, 60, 120);  // left ear
            //ellipse(240, 70, 60, 120);  // right ear
            bufferName.ellipse(60, 50, 45, 90);  // left ear
            bufferName.ellipse(140, 50, 45, 90);  // right ear

            //ellipse(200, 170, 150, 150);    // face
            bufferName.ellipse(100, 135, 125, 125);    // face

            bufferName.fill(0, 0, 0);
            //ellipse(170, 150, augenGrosse, augenGrosse);  // left eye
          //  ellipse(230, 150, augenGrosse, augenGrosse);  // right eye

            bufferName.ellipse(80, 120, augenGrosse, augenGrosse);  // left eye
            bufferName.ellipse(120, 120, augenGrosse, augenGrosse);  // right eye
            //line(150, 200, 250, 200);   // mouth
            //line(150, 200, 250, 200);   // mouth
            bufferName.line(80, 150, 125, 150);   // mouth
            //line(150, 200, 250, 200);   // mouth

            bufferName.fill(255,255,255);
            bufferName.rect(90, 150, 12, zahnLaenge); // left tooth
            bufferName.rect(102,150, 12, zahnLaenge); // right tooth


          }

          function tomato(bufferName,cardWidth, cardHeight){
            bufferName.background(255, 255, 255);
            bufferName.rect(0,0,cardWidth, cardHeight);
            bufferName.fill(0,255,0);
            // tomato
            bufferName.noStroke();
            bufferName.fill(224, 90, 90);
            bufferName.ellipse(75, 100, 125, 125);
            bufferName.ellipse(125, 100, 125, 125);

            // stem
            bufferName.fill(48, 130, 31);
            bufferName.rect(100, 25, 12, 28);
          }
          function maulwurf(bufferName,cardWidth, cardHeight){
            bufferName.background(255, 255, 255);
            bufferName.rect(0,0,cardWidth, cardHeight);
            bufferName.fill(0,255,0);
            bufferName.noStroke();
            var moleX=100;
            var moleY=100;
            bufferName.fill(125, 93, 43);
            bufferName.ellipse(moleX, moleY, 120, 120); // face
            bufferName.fill(255, 237, 209);
            bufferName.ellipse(moleX, moleY+20, 66, 56);
            bufferName.fill(0, 0, 0);
            bufferName.ellipse(moleX-20, moleY-30, 10, 15); // eyes
            bufferName.ellipse(moleX+20, moleY-30, 10, 15);
            bufferName.ellipse(moleX, moleY-10, 20, 20); // nose
            bufferName.ellipse(moleX, moleY+20, 30, 10); // mouth
          }

          function frosch(bufferName,cardWidth, cardHeight)
          {
          var x = 100;
          var y = 100;
          bufferName.background(255, 255, 255);
          bufferName.rect(0,0,cardWidth, cardHeight);
          bufferName.fill(0,255,0);
          bufferName.noStroke();

          bufferName.fill(30, 204, 91); // a nice froggy green!

          bufferName.ellipse(x, y, 190, 100); // face
          bufferName.ellipse(x - 50, y - 50, 40, 40); // left eye socket
          bufferName.ellipse(x + 50, y - 50, 40, 40); // right eye socket

          bufferName.fill(255, 255, 255); // for the whites of the eyes!
          bufferName.ellipse(x - 50, y - 50, 30, 30); // left eyeball
          bufferName.ellipse(x + 50, y - 50, 30, 30); // right eyeball
          bufferName.fill(0, 0, 0);
          bufferName.ellipse(x, y, 150,75); // mouth
          bufferName.rect(x - 55, y - 55, 10, 10); // left eyeball
          bufferName.rect(x + 45, y - 55, 10, 10); // right eyeball

          }

          function smile01(bufferName,cardWidth, cardHeight) {
            var augenGrosse =20;
            var zahnLaenge =15;

            bufferName.rect(0,0,cardWidth, cardHeight);
            bufferName.fill(100,0,100);
            bufferName.stroke(0,0,0);
            bufferName.strokeWeight(3);
            bufferName.fill(255, 238, 0);
            bufferName.ellipse(100, 100, 150, 150);
            bufferName.fill(0, 0, 0);
            bufferName.ellipse(75, 75, 20, 20);
            bufferName.ellipse(125, 75, 20, 20);
            bufferName.noFill();
            bufferName.arc(100,100,75,75,radians(30),radians(145));

          }

          function smile02(bufferName,cardWidth, cardHeight) {
            var augenGrosse =20;
            var zahnLaenge =15;

            bufferName.rect(0,0,cardWidth, cardHeight);
            bufferName.fill(100,0,100);
            bufferName.stroke(0,0,0);
            bufferName.strokeWeight(3);
            bufferName.fill(255, 153, 0);
            bufferName.ellipse(100, 100, 150, 150);
            bufferName.fill(0, 0, 0);
            bufferName.ellipse(75, 75, 20, 20);
            bufferName.ellipse(125, 75, 20, 20);
            bufferName.noFill();
            bufferName.arc(100,150,75,-75,radians(-165),radians(-15));

          }


          function smile03(bufferName,cardWidth, cardHeight) {
            var augenGrosse =20;
            var zahnLaenge =15;

            bufferName.rect(0,0,cardWidth, cardHeight);
            bufferName.fill(100,0,100);
            bufferName.stroke(0,0,0);
            bufferName.strokeWeight(3);
            bufferName.fill(255, 238, 0);
            bufferName.ellipse(100, 100, 150, 150);
            bufferName.fill(0, 0, 0);
            bufferName.ellipse(75, 75, 20, 20);
            bufferName.ellipse(125, 75, 20, 20);
            bufferName.noFill();
            bufferName.noFill();
            bufferName.arc(101,110,100,40,radians(15),radians(160));
            bufferName.arc(102,100,90,90,radians(30),radians(145));

          }

          function smile04(bufferName,cardWidth, cardHeight) {
            var augenGrosse =20;
            var zahnLaenge =15;

            bufferName.rect(0,0,cardWidth, cardHeight);
            bufferName.fill(100,0,100);
            bufferName.stroke(0,0,0);
            bufferName.strokeWeight(3);
            bufferName.fill(255, 238, 0);
            bufferName.ellipse(100, 100, 150, 150);
            bufferName.fill(0, 0, 0);
            bufferName.ellipse(75, 75, 20, 20);
            bufferName.ellipse(125, 75, 20, 20);
            bufferName.noFill();
            bufferName.noFill();
            bufferName.arc(102,100,90,90,radians(30),radians(145));
            bufferName.fill(255, 0, 0);
            bufferName.noStroke();

            bufferName.ellipse (70,75,25,25);
            bufferName.ellipse(80,75,25,25);
            bufferName.triangle(56,75,94,75,75,100);

            bufferName.ellipse (120,75,25,25);
            bufferName.ellipse(130,75,25,25);
            bufferName.triangle(106,75,144,75,125,100);

          }

          function star(bufferName,cardWidth, cardHeight) {
            bufferName.fill(0,255,0);
            bufferName.rect(0,0,cardWidth, cardHeight);
            bufferName.fill(100,0,100);
            bufferName.stroke(0,0,0);
            bufferName.strokeWeight(3);
            bufferName.fill(255,0,0);
            x=100; y=100; radius1=30; radius2=70; npoints=5;
            var angle = TWO_PI / npoints;
            var halfAngle = angle / 2.0;
            bufferName.beginShape();
            for (var a = 0; a < TWO_PI; a += angle) {
              var sx = x + cos(a) * radius2;
              var sy = y + sin(a) * radius2;
              vertex(sx, sy);
              sx = x + cos(a + halfAngle) * radius1;
              sy = y + sin(a + halfAngle) * radius1;
              vertex(sx, sy);
            }
            bufferName.endShape(CLOSE);
          }

          function mouseClicked(){
            clickProcess();
              }

          function touchEnded(){
            clickProcess();
          }

          function clickProcess() {
            var xx,yy;
              var currentTime = new Date();
              var validClick = false; //Set validclick as false to start
              if (pairMatched < totalPairs) numClicks++; //increament numClicks
            if (mouseX>20 && mouseX<820 && mouseY>20 && mouseY<820) // If mouse is inside canvas
             {

               // check grid coordinates
               xx  = floor((mouseX-20)/gridWidth);
               yy = floor((mouseY-20)/gridHeight);

               //time=time(); // time of Click

               // clicked on aon open card ie. Imageindex not equal to zero
               if (currentGridImageNo[xx][yy]!=0) {validClick= false;} else
                {validClick=true;}

               switch (validClick)
               {
                case true:
                    switch (firstClick) {
                      case false:
                        if (firstClickTime == 0)
                            { firstClickTime= currentTime.getHours()*3600+ currentTime.getMinutes()*60+currentTime.getSeconds();
                              firstClick=true;
                              currentGridImageNo[xx][yy] = gridImageNo[xx][yy];
                              firstGridId[0]= xx;
                              firstGridId[1] = yy;
                              //writeMessage(("firstClick:"+ currentGridImageNo[xx][yy]) +" " +(firstClickTime), 20,50);

                            }
                        break;
                      case true:
                           switch (secondClick) {
                             case false:
                               if (secondClickTime==0){
                                  secondClick= true;
                                  secondClickTime= currentTime.getHours()*3600+currentTime.getMinutes()*60+currentTime.getSeconds();
                                  firstClickTime=secondClickTime;
                                  currentGridImageNo[xx][yy] = gridImageNo[xx][yy];
                                  secondGridId[0] = xx;
                                  secondGridId[1] = yy;
                                  if (currentGridImageNo[xx][yy]==currentGridImageNo[firstGridId[0]][firstGridId[1]]) {pairMatch=true;}
                                  //writeMessage(("SecondClick  "+ currentGridImageNo[xx][yy]), 30,70);
                                  if (pairMatch) { pairMatched++;}
                                  if (pairMatched >= totalPairs){
                                    gameDuration=new Date();
                                  if (pairMatched>= totalPairs){
                                      //writeMessage("Game over"+(gameDuration-startTime)/1000 + "seconds  "+ numClicks+ " clicks", 10,150);
                                    }
                                    //gameDuration= gameDuration-startTime;
                                  }
                               }
                               break;
                            case true:
                            break;
                            default:

                           }
                      break;
                      default:
                     }
                break;

                case false: // abandom processing
                break;
                default:
               }

            }

            }
            function gameActive(){
              //  Reset cards in case of time out and no match
                   var presentTime; // Read clock
                   var cDate= new Date();
                   presentTime = cDate.getHours()*3600+cDate.getMinutes()*60+cDate.getSeconds();
                   switch (pairMatch)  // case when pairMatch-start

                     {  case true:
                        firstClick=false; secondClick=false; firstClickTime=0; secondClickTime=0;pairMatch=false;
                        break;
                       case false:// Pair not matched yet
                            switch (secondClick) // SecondClick case pairMatch false and sec-start
                              { case true: //secondclick on
                                //writeMessage(("secondClick  "+ secondClick), 30,70);
                                if ((secondClickTime + waitingTime2nd) < presentTime){
                                  firstClick=false; secondClick=false; firstClickTime=0; secondClickTime=0;pairMacth=false;
                                  currentGridImageNo[firstGridId[0]] [firstGridId[1]]=0;
                                  currentGridImageNo[secondGridId[0]] [secondGridId[1]]=0;
                                }
                                break; //secondClick on end
                              case false: //secondClick false
                               if ( firstClick && ((firstClickTime+waitingTime1st) < presentTime)) {
                                //writeMessage(("presentTime  "+ presentTime), 30,110);
                                firstClick=false; secondClick=false; firstClickTime=0; secondClickTime=0;pairMatch=false;
                                currentGridImageNo[firstGridId[0]] [firstGridId[1]]=0;
                                }
                               break;
                              default:
                            } //secondClick false end
                            break;
                      case true: // Pairs are matched
                      firstClick=false; secondClick=false; firstClickTime=0; secondClickTime=0;pairMatch=false;
                       break;
                     default:

                   } // case end pairMatch

            }

        function writeMessage(message, x,y){
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.rect(0,0,300,800);
        ctx.font = "20px Georgia";
        ctx.fillText(message, x, y);
      }
