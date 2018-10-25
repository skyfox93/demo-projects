function texturize(canvas){
	var context=canvas.getContext('2d');
	var imageData3=context.getImageData(0,0,canvas.width,canvas.height);
//stackBlurImage('canvas1',5);
 
var imageData2=context.getImageData(0,0,canvas.width,canvas.height);

var imageData=context.getImageData(0,0,canvas.width,canvas.height);

 var pixedges=[];var pixedges2=[];
for(var r=1;r<canvas.height-1;r+=1){
///CALCULATE THE DIFFERENCE BETWEEN EACH PIXEL AND IT'S NEIGHBOR
/// WE WILL USE THIS TO ADJUST WHICH DETAILS WE ARE KEEPING AND WHICH WE ARE BLURING
	
	
	
///HORIZONTAL EDGES
for(var c=canvas.width-1;c>1;c--){var disp=c*4+r*canvas.width*4;
 pixedges.push(
	 // edge from last pixel
Math.abs(imageData2.data[disp]-imageData2.data[disp-4])
	 //edge from front pixel+
+ Math.abs(imageData2.data[disp]-imageData2.data[disp+4]));
								  
								  
/// VERTICAL EDGES
pixedges2.push(
Math.abs(imageData2.data[disp]-imageData2.data[disp-4*canvas.width])+
Math.abs(imageData2.data[disp]-imageData2.data[disp+4*canvas.width]));


			 }}


/// FOR FIFTEN ITERATIONS, BLUR THE IMAGE BORDERS UP AND DOWN
for(var t=0;t<10;t++){ pixcount=0;

for(var r=1;r<canvas.height-1;r+=1){

for(var c=canvas.width-1;c>1;c--){var disp=c*4+r*canvas.width*4;
var pixedge=pixedges[pixcount];
pixcount++;
if (pixedge<35){



 imageData.data[disp]=(imageData2.data[disp]+imageData2.data[disp+4]+imageData2.data[disp-4])/3 ;

 imageData.data[disp+1]=(imageData2.data[disp+1]+imageData2.data[disp+5]+imageData2.data[disp-3])/3; 

 imageData.data[disp+2]=(imageData2.data[disp+2]+imageData2.data[disp+6]+imageData2.data[disp-2])/3 ;


}}


}
					  
pixcount=0;
for(var r=1;r<canvas.height-1;r+=1){

for(var c=canvas.width-1;c>1;c--){var disp=c*4+r*canvas.width*4;
var pixedge=pixedges2[pixcount];
pixcount++;
if (pixedge<35){



 imageData2.data[disp]=(imageData.data[disp]+imageData.data[disp+4*canvas.width]+imageData.data[disp-4*canvas.width])/3 ;

 imageData2.data[disp+1]=(imageData.data[disp+1]+imageData.data[disp+4*canvas.width+1]+imageData.data[disp-4*canvas.width+1])/3; 

 imageData2.data[disp+2]=(imageData.data[disp+2]+imageData.data[disp+4*canvas.width+2]+imageData.data[disp-4*canvas.width+2])/3 ;


}}


}


}


// USE BLURRED IMAGE TO CALCULATE WHAT A SHARPENED IMAGE WOULD LOOK LIKE

for (var i=0;i<imageData2.data.length;i+=4){
var diff=imageData3.data[i]-imageData2.data[i];
if(Math.abs(diff)<50)
{
imageData2.data[i]=imageData2.data[i]+diff*3;
imageData2.data[i+1]=imageData2.data[i+1]+diff*3;

imageData2.data[i+2]=imageData2.data[i+2]+diff*3;
}
else
{imageData2.data[i]=(imageData3.data[i]);

imageData2.data[i+1]=(imageData3.data[i+1]);

imageData2.data[i+2]=(imageData3.data[i+2]);}}
context.putImageData(imageData2,0,0);}