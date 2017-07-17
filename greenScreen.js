var loadedBgImg = null; 
var loadedFgImg = null; 
var bgImg;
var fgImg;
var bgEmpty;
var fgEmpty;
var greenThreshold = 250;


 
function loadBgImg(){ // Loads background image into canvas 1
	var bgFileInput = document.getElementById("bgFileIn");
  	loadedBgImg = new SimpleImage(bgFileInput);
 	bgImg = document.getElementById("bgImg");
  	loadedBgImg.drawTo(bgImg);  
}


function loadFgImg(){ // Loads foreground image into canvas 2
  	var fgFileInput = document.getElementById("fgFileIn");
  	loadedFgImg = new SimpleImage(fgFileInput);
  	fgImg = document.getElementById("fgImg");
  	loadedFgImg.drawTo(fgImg);  
}



function clearBgImage(){ // Clears bgImage by generating a whitebox over canvas 1
	        bgEmpty = new SimpleImage(loadedBgImg.getWidth(), loadedBgImg.getHeight());

		for (var pixel of bgEmpty.values()){
		pixel.setRed(255);
		pixel.setBlue(255);
		pixel.setGreen(255);
	}
			bgEmpty.drawTo(bgImg);
}



function clearFgImage(){ // Clears fgImage by generating a whitebox over canvas 2
	        fgEmpty = new SimpleImage(loadedFgImg.getWidth(), loadedFgImg.getHeight());

		for (var pixel of fgEmpty.values()){
		pixel.setRed(255);
		pixel.setBlue(255);
		pixel.setGreen(255);
	}
			fgEmpty.drawTo(fgImg);
}




function createComposite(){ // combines fgImage and bgImage into output (composite) image

	if (loadedBgImg == null || !loadedBgImg){ // checks to see that file is loaded
		alert("The Background Image is not loaded, please try again.");
	}

	if (loadedFgImg == null || !loadedFgImg){ // checks to see that file is loaded
		alert("The Foreground Image is not loaded, please try again.");
	}

	var output = new SimpleImage(loadedFgImg.getWidth(), loadedFgImg.getHeight()); // creates new image that will be overwritten with bgImage and fgImage pixels

	for (var pixel of loadedFgImg.values()){
    var currentPixX = pixel.getX();
	var currentPixY = pixel.getY();
       
    if(pixel.getGreen() > greenThreshold){ // if fgImage pixel is greater than preset threshold, overwrite output image with bgImage pixel
    	var bgPixel = loadedBgImg.getPixel(currentPixX, currentPixY);
    	output.setPixel(currentPixX, currentPixY, bgPixel);
    }
    else{ // else overwrite output image with fgImage pixel
    	output.setPixel(currentPixX, currentPixY, pixel);
    }
}
        output.drawTo(bgImg);    
        clearFgImage();
}



function clearCanvas(){ //clears both canvases
	clearBgImage();
	clearFgImage();
}