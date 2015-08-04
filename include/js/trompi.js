var Trompi = function() {
    var canvas;
    var context;
    var images = {};
    var totalResources = 2;
    var numResourcesLoaded = 0;
    var fps = 2;
    var x = 0;
    var y = 0;
    var timeBtwBlinks = 2000;
    var timeBtwMouthMovements = 1000;

    var canvasWidth = 150;
    var canvasHeight = 182;

    var fpsInterval = setInterval(updateFPS, 1000);
    var numFramesDrawn = 0;
    var curFPS = 0;

    var blinkTimer;
    var talkTimer;

    var mouth_opened = false;
    var timeToBlink = false;
    var timeToTalk = false;

    function updateFPS() {
        curFPS = numFramesDrawn;
        numFramesDrawn = 0;
    }

    function show(canvasParentId) {
        $("#trompi-canvas").remove();
        canvasParent = document.getElementById(canvasParentId);
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.setAttribute('id', 'trompi-canvas');
        canvasParent.appendChild(canvas);

        context = canvas.getContext("2d");

         loadImage("soricel_vesel");
        loadImage("soricel_vesel_coada_sus");
        loadImage("soricel_vesel_coada_jos");

        setInterval(redraw, 1000 / fps);
        startBlinking();
    }

    function loadImage(name) {
        images[name] = new Image();
        images[name].src = "include/images/soricel/" + name + ".png";
    }

    function redraw() {

        canvas.width = canvas.width; // clears the canvas 

        context.drawImage(images["soricel_vesel"], x, y);

        if (timeToTalk) {
            if (mouth_opened) {
            context.drawImage(images["soricel_vesel_coada_sus"], x - 2, y + 0);
            mouth_opened = false;
        }
        else {
            mouth_opened = true;
        }
            timeToTalk = false;
        }

        if (!timeToBlink) {
            context.drawImage(images["soricel_vesel_coada_jos"], x - 2, y + 0);
        }
        timeToBlink = false;

        //context.font = "bold 12px sans-serif";
        //context.fillText("fps: " + curFPS + "/" + fps + " (" + numFramesDrawn + ")", 0, 15);

        ++numFramesDrawn;
    }

    function startTalking() {
        talkTimer = setInterval(updateTalk, timeBtwMouthMovements);
    }

    function startBlinking() {
        blinkTimer = setInterval(updateBlink, timeBtwBlinks);
    }

    function stopTalking() {
        clearInterval(talkTimer);
        timeToTalk = false;
    }

    function stopBlinking() {
        clearInterval(blinkTimer);
        timeToBlink = false;
    }

    function updateBlink() { 
        timeToBlink = true;
    }

    function updateTalk() {
        timeToTalk = true;
    }

    return _this = {
        show:           show,
        startTalking:   startTalking,
        stopTalking:    stopTalking,
        startBlinking:  startBlinking,
        stopBlinking:   stopBlinking
    }
}



var Trompi_sad = function() {
    var canvas;
    var context;
    var images = {};
    var totalResources = 2;
    var numResourcesLoaded = 0;
    var fps = 4;
    var x = 0;
    var y = 0;
    var timeBtwBlinks = 1200;
    var timeBtwMouthMovements = 1500;

    var canvasWidth = 150;
    var canvasHeight = 182;

    var fpsInterval = setInterval(updateFPS, 1000);
    var numFramesDrawn = 0;
    var curFPS = 0;

    var blinkTimer;
    var talkTimer;

    var mouth_opened = false;
    var timeToBlink = false;
    var timeToTalk = false;

    function updateFPS() {
        curFPS = numFramesDrawn;
        numFramesDrawn = 0;
    }

    function show(canvasParentId) {
        $("#trompi-canvas").remove();
        canvasParent = document.getElementById(canvasParentId);
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.setAttribute('id', 'trompi-canvas');
        canvasParent.appendChild(canvas);

        context = canvas.getContext("2d");

        loadImage("soricel_trist");
        loadImage("lacrima_mare");
        loadImage("lacrima_mica");

        setInterval(redraw, 1000 / fps);
        startBlinking();
		startTalking();
    }

    function loadImage(name) {
        images[name] = new Image();
        images[name].src = "include/images/soricel/" + name + ".png";
    }

    function redraw() {

        canvas.width = canvas.width; // clears the canvas 

        context.drawImage(images["soricel_trist"], x, y);

        if (timeToTalk) {
           
            context.drawImage(images["lacrima_mare"], x + 60, y + 52);
          
        }
       
        timeToTalk = false;
    

        if (!timeToBlink) {
            context.drawImage(images["lacrima_mica"], x + 60, y + 72);
			
        }
        timeToBlink = false;
	
        //context.font = "bold 12px sans-serif";
        //context.fillText("fps: " + curFPS + "/" + fps + " (" + numFramesDrawn + ")", 0, 15);

        ++numFramesDrawn;
    }

    function startTalking() {
        talkTimer = setInterval(updateTalk, timeBtwBlinks);
    }

    function startBlinking() {
        blinkTimer = setInterval(updateBlink, timeBtwBlinks);
    }
	
    function stopTalking() {
        clearInterval(talkTimer);
        timeToTalk = false;
    }

    function stopBlinking() {
        clearInterval(blinkTimer);
        timeToBlink = false;
    }

    function updateBlink() { 
        timeToBlink = true;
    }

    function updateTalk() {
        timeToTalk = true;
    }

    return _this = {
        show:           show,
        startTalking:   startTalking,
        stopTalking:    stopTalking,
        startBlinking:  startBlinking,
        stopBlinking:   stopBlinking
    }
}