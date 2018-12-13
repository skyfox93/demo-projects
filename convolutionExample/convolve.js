const catPic=document.querySelector('#catpic');
  catPic.addEventListener('load', run);
  function run (){
    const canvas=document.getElementById('canvas'); let ctx= canvas.getContext('2d');
  canvas.width=catPic.naturalWidth;
  canvas.height=catPic.naturalHeight;
  ctx.drawImage(catPic,0,0,canvas.width,canvas.height);
  const imageData=ctx.getImageData(0,0, canvas.width,canvas.height);

//[0,-1,0,-1,5,-1,0,-1,0]
//[.111,.111,.111,.111,.111,.111,.111,.111,.111]


  const filteredData= Filters.convolute(imageData,[0,-1,0,-1,5,-1,0,-1,0]
,0);
  ctx.putImageData(filteredData,0,0);
}

Filters={};
Filters.tmpCanvas = document.createElement('canvas');
Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

Filters.createImageData = function(w,h) {
  return this.tmpCtx.createImageData(w,h);
};
Filters.convolute = function(pixels, weights, opaque){
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;
  // pad output by the convolution matrix
  var w = sw;
  var h = sh;
  var output = Filters.createImageData(w, h);
  var dst = output.data;
  // go through the destination image pixels
  var alphaFac = opaque ? 1 : 0;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      // current x cordinate = sx
      // current y coordinate = sy
      var sy = y;
      var sx = x;
      // position of current pixel in imageDataArray
      var dstOff = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
        /* find the surrounding pixels and set their x and y coodinates
         start at current pixel, go back half a side, then iterate forward
         so that the current pixel is in the center of the grid.*/
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          /*check to make sure that the pixel exists. For example, if you are
           at the right edge of the image, then there is no pixel to the right*/
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {

            /*find where the surrounding pixel is in the image pixels array*/
            var srcOff = (scy*sw+scx)*4;
            /* find the weight, that is, the corresponding value in the matrix
             then, sum the total. Since we are iterating through all
             the surrounding pixels, this process will be repeated for each.*/
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      // assign the CENTER pixel the value of the weighted sum
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};
