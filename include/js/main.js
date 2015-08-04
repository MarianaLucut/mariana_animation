/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
/*************************************************/
/*************************************************/

var DEFAULT_HELP_TITLE = "Ajutor";
var DEFAULT_HELP_CONTENT = "";
var DEFAULT_HELP_AUDIO_PATH = "include/audio/help.mp3"; 

var DEFAULT_GAME_COMPLETED_TITLE = "Bravo!";
var DEFAULT_GAME_COMPLETED_CONTENT = "";
var DEFAULT_GAME_COMPLETED_AUDIO_PATH = "include/audio/correct.mp3";

var DEFAULT_GAME_NOT_COMPLETED_TITLE = "Mai încearcă!"
var DEFAULT_GAME_NOT_COMPLETED_CONTENT = ""
var DEFAULT_GAME_NOT_COMPLETED_AUDIO_PATH = "include/audio/wrong.mp3";

var scaleFactor = 1; // 1 means no scaling
var trompi;

var isGameMuted = false;

$(document).ready(function () {

    enableTooltipsIfIsNotTouchDevice();

    setAudioGameVolumFromGlobalBookVolume();

    resize();
	$(window).resize(function() {
		resize();	
	});
    setTimeout(function() {
        $(window).trigger('resize');
    }, 1000);

    $('body').on('click', '#play-pause-btn', handlePlayPauseBtnClickEvent);
    $('body').on('click', '#stop-btn', handleStopBtnClickEvent);
    $('body').on('click', '#close-btn-popover', handleCloseAvatarBtnClickEvent);

    $("#muted-img").click( handleClickMuteUnmuteEvent );
});


function enableTooltipsIfIsNotTouchDevice()
{   
    // if is not touch device
    if (!("ontouchstart" in document.documentElement))
    {
        $('[data-toggle="tooltip"]').tooltip();
    }
}

function handleClickMuteUnmuteEvent()
{   
    $("audio").prop("muted",!isGameMuted);

    if(isGameMuted) {
        $(this).attr("id", "unmute-img");
        isGameMuted = false;
    }
    else {
        $(this).attr("id", "muted-img");
        isGameMuted = true;
    }
}

function setAudioGameVolumFromGlobalBookVolume()
{
    var myPage = document.location.toString().split('?muted=');    
    var isParentMuted = myPage[1] ? myPage[1] : '';
    if(isParentMuted === "true")
    {
        $("#unmute-img").attr("id", "muted-img");
        isGameMuted = true;
    }
}
//used in all games for resizing and scaling their content
//resizes the #wrapper-div width and height keeping the aspect ratio and scales the content of the #content-div
function resize()
{
	var maxWidth  = $('#content-div').css("width").replace("px", "");
	var maxHeight = $('#content-div').css("height").replace("px", "");

    var availableWidth = window.innerWidth;
    var availableHeight = window.innerHeight;

    //do not scale if available resolution is bigger than max resolution
    if(availableWidth >= maxWidth && availableHeight >= maxHeight) {
        $('#content-div').css({'-webkit-transform': ''});
        $('#content-div').css({'-moz-transform': ''});
        $('#content-div').css({'-ms-transform': ''}); 
        $('#content-div').css({'-o-transform': ''});
	    $('#content-div').css({'transform': ''});
        $('#wrapper-div').css({ width: maxWidth, height: maxHeight });
        scaleFactor = 1;
        return;
    }
    
    scaleFactor = Math.min(availableWidth/maxWidth, availableHeight/maxHeight);    

    $('#content-div').css({'-webkit-transform': 'scale(' + scaleFactor + ')'});
    $('#content-div').css({'-moz-transform': 'scale(' + scaleFactor + ')'});
    $('#content-div').css({'-ms-transform': 'scale(' + scaleFactor + ')'});
    $('#content-div').css({'-o-transform': 'scale(' + scaleFactor + ')'});
    $('#content-div').css({'transform': 'scale(' + scaleFactor + ')'});
    $('#wrapper-div').css({ width: availableWidth, height: availableHeight });
}

//used to fix the offset bug of draggable elements when the content is scaled
function startDrag(ui)
{
    ui.position.left = 0;
    ui.position.top = 0;
}

//used to fix the offset bug of draggable elements when the content is scaled
function drag(ui)
{
    var changeLeft = ui.position.left - ui.originalPosition.left; 
    var newLeft = ui.originalPosition.left + changeLeft / scaleFactor; 

    var changeTop = ui.position.top - ui.originalPosition.top; 
    var newTop = ui.originalPosition.top + changeTop / scaleFactor;

    ui.position.left = newLeft;
    ui.position.top = newTop;        
}

function showAvatarHelpFirst(title, content, audio_path)
{   
    if(title == "") title = DEFAULT_HELP_TITLE;
    if(content == "") content = DEFAULT_HELP_CONTENT;
    if(audio_path == "") audio_path = DEFAULT_HELP_AUDIO_PATH;

    emptyAvatarContent();

    $("<div></div>")
        .attr("id", "avatar-div-first")
        .attr("data-toggle", "popover")
        .attr("data-title", title)
        .attr("data-content", content)
        .attr("data-placement", "right")
        .appendTo("#avatar-content-div-first")

    trompi = new Trompi();
    trompi.show("avatar-div-first");
    trompi.startTalking();

    $('#avatar-div-first').popover({trigger: 'manual'}).popover('show');
    $("#avatar-content-div-first > .popover > .popover-title").addClass("popover-title-help");
    $("#avatar-content-div-first > .popover > .popover-content").addClass("popover-content-help");
    $("#avatar-content-div-first > .popover").addClass("animated bounceInRight");
    
    appendCloseBtnToPopover();
    appendAvatarPlayerControls();
    appendAvatarAudio(audio_path);
}

function showAvatarHelp(title, content, audio_path)
{   
    if(title == "") title = DEFAULT_HELP_TITLE;
    if(content == "") content = DEFAULT_HELP_CONTENT;
    if(audio_path == "") audio_path = DEFAULT_HELP_AUDIO_PATH;

    emptyAvatarContent();

    $("<div></div>")
        .attr("id", "avatar-div")
        .attr("data-toggle", "popover")
        .attr("data-title", title)
        .attr("data-content", content)
        .attr("data-placement", "right")
        .appendTo("#avatar-content-div")

    trompi = new Trompi();
    trompi.show("avatar-div");
    trompi.startTalking();

    $('#avatar-div').popover({trigger: 'manual'}).popover('show');
    $("#avatar-content-div > .popover > .popover-title").addClass("popover-title-help");
    $("#avatar-content-div > .popover > .popover-content").addClass("popover-content-help");
    $("#avatar-content-div > .popover").addClass("animated bounceInRight");
    
    appendCloseBtnToPopover();
    appendAvatarPlayerControls();
    appendAvatarAudio(audio_path);
}

function showAvatarGameCompleted(title, content, audio_path)
{
    if(title == "") title = DEFAULT_GAME_COMPLETED_TITLE;
    if(content == "") content = DEFAULT_GAME_COMPLETED_CONTENT;
    if(audio_path == "") audio_path = DEFAULT_GAME_COMPLETED_AUDIO_PATH;

    emptyAvatarContent();

    $("<div></div>")
        .attr("id", "avatar-div")
        .attr("data-toggle", "popover")
        .attr("data-title", title)
        .attr("data-content", content)
        .attr("data-placement", "right")
        .appendTo("#avatar-content-div")

    trompi = new Trompi();
    trompi.show("avatar-div");
    trompi.startTalking();


    $('#avatar-div').popover({trigger: 'manual'}).popover('show');
    $("#avatar-content-div > .popover > .popover-title").addClass("popover-title-game-completed");
    $("#avatar-content-div > .popover > .popover-content").addClass("popover-content-game-completed");
    $("#avatar-content-div > .popover").addClass("animated bounceInRight");

    appendCloseBtnToPopover();
    appendAvatarPlayerControls();
    appendAvatarAudio(audio_path);
}

function showAvatarGameNotCompleted(title, content, audio_path)
{
    if(title == "") title = DEFAULT_GAME_NOT_COMPLETED_TITLE;
    if(content == "") content = DEFAULT_GAME_NOT_COMPLETED_CONTENT;
    if(audio_path == "") audio_path = DEFAULT_GAME_NOT_COMPLETED_AUDIO_PATH;
        
    emptyAvatarContent();

    $("<div></div>")
        .attr("id", "avatar-div")
        .attr("data-toggle", "popover")
        .attr("data-title", title)
        .attr("data-content", content)
        .attr("data-placement", "right")
        .appendTo("#avatar-content-div")

    trompi = new Trompi_sad();
    trompi.show("avatar-div");
    trompi.startTalking();

    $('#avatar-div').popover({trigger: 'manual'}).popover('show');
    $("#avatar-content-div > .popover > .popover-title").addClass("popover-title-game-not-completed");
    $("#avatar-content-div > .popover > .popover-content").addClass("popover-content-game-not-completed");
    $("<img>")
        .attr("id", "try-again-avatar-btn")
        .attr("src", "include/images/repeta.png")
        .addClass("try-again")
        .appendTo("#avatar-content-div > .popover > .popover-title");
    $("#avatar-content-div > .popover").addClass("animated bounceInRight");

    appendCloseBtnToPopover();
    appendAvatarPlayerControls();
    appendAvatarAudio(audio_path);
}

function appendCloseBtnToPopover()
{
    $("<img></img>")
        .attr("id", "close-btn-popover")
        .attr("src", "include/images/close.png")
        .appendTo("#avatar-content-div > .popover > .popover-content")
}

function appendAvatarAudio(audio_path)
{
    var $player = $("<audio></audio>")
                    .attr("id", "avatar-audio")
                    .attr("onended", "handleAudioEndedEvent()")
                    .attr("ontimeupdate", "updateProgressBar()")
                    .attr("preload", "none")
                    .addClass("avatar-player")
                    .appendTo("#game-content-div")

    $("<source></source>")
        .attr("src", audio_path)
        .attr("type", "audio/mpeg")
        .appendTo("#avatar-audio")

    $player.prop("muted",isGameMuted);
    playAvatarAudio();
}

function appendAvatarPlayerControls()
{
    $("<div></div>")
        .attr("id", "avatar-player-controls-div")
        .appendTo("#avatar-div")

    $("<img></img>")
        .attr("id", "play-pause-btn")
        .attr("src", "include/images/play.png")
		.attr('data-toggle', "tooltip")
		.attr('data-placement',"right")
		.attr('title',"Start/Pauza")
        .addClass("avatar-player-controls play-pause-btn-class")
        .appendTo("#avatar-player-controls-div")

    $("<img></img>")
        .attr("id", "stop-btn")
        .attr("src", "include/images/stop.png")
		.attr('data-toggle', "tooltip")
		.attr('data-placement',"right")
		.attr('title',"Stop")
        .addClass("avatar-player-controls stop-btn-class")
        .appendTo("#avatar-player-controls-div")

    $("<progress></progress>")
        .attr("id", "progress-bar-audio-avatar")
        .attr("value", 0)
        .attr("max", 1)
        .appendTo("#avatar-player-controls-div")
}

function emptyAvatarContent()
{
    $("#avatar-audio").remove();
    $("#avatar-content-div").empty();
}

function handlePlayPauseBtnClickEvent()
{
    if($(this).attr("src") == "include/images/play.png") 
    {
        playAvatarAudio();

    }
    else
    {
        pauseAvatarAudio();
 
    }
}

function handleStopBtnClickEvent()
{
    $("#avatar-audio").trigger("pause");
    $("#avatar-audio").prop("currentTime", 0);
    $("#play-pause-btn").attr("src", "include/images/play.png");

}

function playAvatarAudio()
{   
    $("#avatar-audio").trigger("play");
    $("#play-pause-btn").attr("src", "include/images/pause.png");
}

function pauseAvatarAudio()
{
    $("#avatar-audio").trigger("pause");
    $("#play-pause-btn").attr("src", "include/images/play.png");
}

function handleAudioEndedEvent()
{
    $("#play-pause-btn").attr("src", "include/images/play.png");

}

function handleCloseAvatarBtnClickEvent()
{
    $("#avatar-audio").remove();
    $("#avatar-content-div").empty();
}

function updateProgressBar()
{
    var currentTime = $("#avatar-audio").prop("currentTime");
    var duration = $("#avatar-audio").prop("duration");
    $('#progress-bar-audio-avatar').attr("value", currentTime / duration);
}

function shuffle(array) 
{
    var counter = array.length, temp, index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}