var questions = [{
    question:"3*4= ",
    answer:12,
    topValue:16,
    leftValue:23
  }, {
    question:"2+3= ",
    answer:"5",
    topValue:35,
    leftValue:30
},{
  question:"10-3= ",
  answer:7,
    topValue:25,
    leftValue:50
    },{
  question:"20-7= ",
  answer:13,
    topValue:70,
    leftValue:50
    },{
  question:"10+8= ",
  answer:18,
    topValue:50,
    leftValue:10
    },{
  question:"8+7 = ",
  answer:15,
    topValue:60,
    leftValue:80
    },{
  question:"5*4= ",
  answer:20,
    topValue:15,
    leftValue:70
    },{
  question:"21:3= ",
  answer:7,
    topValue:30,
    leftValue:80
  },{
  question:"23-7= ",
  answer:16,
    topValue:60,
    leftValue:20
    },{
  question:"4*8= ",
  answer:32,
    topValue:50,
    leftValue:60
    },{
  question:"5*5= ",
  answer:25,
    topValue:0,
    leftValue:0
    },{
  question:"7*8= ",
  answer:56,
    topValue:0,
    leftValue:0
    },{
  question:"4*6= ",
  answer:24,
    topValue:0,
    leftValue:0
    },{
  question:"19+3= ",
  answer:22,
    topValue:0,
    leftValue:0
    },{
  question:"32-9= ",
  answer:23,
    topValue:0,
    leftValue:0
    },{
  question:"24+8= ",
  answer:32,
    topValue:0,
    leftValue:0
    },{
  question:"7+19= ",
  answer:26,
    topValue:0,
    leftValue:0
    },{
  question:"5+28= ",
  answer:33,
    topValue:0,
    leftValue:0
    },{
  question:"21*2= ",
  answer:42,
    topValue:0,
    leftValue:0
    },{
  question:"53-12= ",
  answer:41,
    topValue:0,
    leftValue:0
  }];

var currentQuestion =0;
var previousQuestion= 0;
var vector =[0,0,0,0,0,0,0,0,0,0];
var topRabbitValue = 25;
var leftRabbitValue = 80;
var ok=0;
var helpOk = 0;
var maximLeft;
var maximTop;
var anotherQuestion= 0;
var code;
 var idQuestion;
 var enterWasPressed;
var w = window.innerWidth;
var h = window.innerHeight;
var remainQuestions = questions.length;
var AVATAR_HELP_TITLE_MESSAGE = "Ajutor";
var AVATAR_HELP_CONTENT_MESSAGE = "Raspunde la fiecare intrebare corect pentru a-l ajuta pe iepuras sa manance tot";

(function()
{
	$(".modal").modal({backdrop: false});
	$("#succesModal").modal('hide');
	$("#errorModal").modal('hide');
	$("#endModal").modal('hide');
	$("#startModal").modal('show');
	$("#helpModal").modal('hide');
	  $('[data-toggle="tooltip"]').tooltip();
var listOfQuestions= displayImagesAndQuestions();
$('#content-div').append(listOfQuestions);
  $("#mesaj").css("visibility", "hidden");

setQuestionsPositions();

displayImage();
displayPageElements();

$(window).resize(function() 
{  w = window.innerWidth;
   h = window.innerHeight;
   setQuestionsPositions();
   displayPageElements();
});

$('.imagine').on('click',hideMessages);
$('#content-div').on('click',hideHelp);

$('body').on('click',hideMessages);
$("#imagineHelp").on('click',function(e)
{ 
    $("#helpModal").modal('show');
	helpOk = 1;

});


$('#restartButton').on('click',function(e)
{
	window.location.href="index.html";
});

$("#startButton").on('click',function(e)
  {
    $("#mesaj").css("visibility", "hidden");
  });

$(".question").on('click',function(e)
  {    
       previousQuestion = currentQuestion;
       currentQuestion = $(this).attr('id');
       setTheQuestions(previousQuestion,currentQuestion);
       setMaximPositions();
       var auxiliarVariable = $("#nou"+ currentQuestion).offset();
       $('#rabbitGame').animate({
            top: auxiliarVariable.top-maximTop,left:auxiliarVariable.left+maximLeft},250);  
  });

$(".question").keydown(function (e) 
  {
     enterWasPressed=0;
     code = e.keyCode || e.which;
     idQuestion = $(this).attr('id');
     if (code == 13)
        {  enterWasPressed= 1;
          previousQuestion = currentQuestion;
          currentQuestion = $(this).attr('id');
          setTheQuestions(previousQuestion,currentQuestion);
        }  
  });
})();

//functions 

function hideMessages()
{
	$("#succesModal").modal('hide');
	$("#errorModal").modal('hide');
}

function hideHelp()
{
	 // $("#avatar-content-div").empty();
	 	$("#helpModal").modal('hide');
}
function setMaximPositions()
{

   if ($(window).width()> 1500)
      {
          maximLeft = 140;
          maximTop = -10;
      }
    if ( $(window).width()< 1500 && $(window).width()> 800 )
      {
          maximLeft = 90;
          maximTop = 10;
      }
    if ( $(window).width()< 800)
       {
          maximLeft = 50;
          maximTop=40;
       }
}
function displayPageElements()
{  
    setRabbitPosition();
    setQuestionsPositions();
    setMaximPositions();
    $('.images').css('width',($(window).width()*0.3)+'px');
    $('.tableQuestions').css('width',($(window).width()*0.07)+'px');
 }

function displayImage()
  {
     var im='<img class="img-responsive" id="rabbitGame" src="images/bunny.png">';
     $("#content-div").append(im);
  }

  function displayHelp()
  {
     var im='<img class="img-responsive" id="imagineHelp" src="images/help.png">';
     $("body").append(im);
  }
function setRabbitPosition()
{ 
  var w = window.innerWidth;
  var h = window.innerHeight;
  newPos= new Object();
  
  if(ok == 0)
   {
     newPos.left = leftRabbitValue*w/100;
     newPos.top = topRabbitValue*h/100;
     $("#rabbitGame").offset(newPos);
     ok = 1;
   }
  else
   {
     var auxiliarVariable = $("#nou"+currentQuestion).offset();
     newPos.left = auxiliarVariable.left;
     newPos.top = auxiliarVariable.top;
     $("#rabbitGame").offset(newPos);
   }
}

 function displayImagesAndQuestions()
{
     var output="";
     var aux;
     var lungime = questions.length;
   
     for(var j = 0 ; j< vector.length; j++)
     { 
        while(vector[j] == 0)
        {
	        var random = Math.floor((Math.random() *lungime )+ 1);
	     	var ok =0;
	     	for (var i =0;i< vector.length; i++) 
	     	  if(vector[i] == random)
	     	 	   ok =1;

	     	if (ok == 0) 
	     	  vector[j] = random;

        }

        
        output+='<div  class="question " id="'+( + j )+'"> <div class="images"></div><div id="t' + j + '" class="tableQuestions"><div class ="nou" id="nou'+j +'">' +(j+1)+")"+ questions[random-1].question + '<input class="textBox" type="text" class="inputStyle" id="input' + j + '" name="answer"></input></div></div></div>';
     }
     return output;
}
function setQuestionsPositions()
  { 
    for(var j = 0; j<questions.length; j++)
        {
          newPos = new Object();
          newPos.left = questions[j].leftValue*w/100;
          newPos.top = questions[j].topValue*h/100;
          $("#"+ j ).offset(newPos);
        }
  }

  function setTheQuestions(previousQuestion,currentQuestion)
{
        var w = window.innerWidth;
       var h = window.innerHeight;
       $("#mesaj").removeClass("warning");
       $("#mesaj").html("");
       
         var aux =$("#input"+previousQuestion).val();
       if (aux.length > 0 )
       {
       choice(previousQuestion);
       enterWasPressed = 0;
      }
      
       $("#t"+previousQuestion).css('background','#F5A9F2');
       $("#t"+currentQuestion).css('background','red');

       $("#t"+currentQuestion).addClass("currentQuestion");
       var isVisible = $('#' + previousQuestion).is(':visible');

       if (isVisible == true )
          $('#input'+previousQuestion).val('');

       if (isVisible == true && currentQuestion != previousQuestion )
                $("#t" + previousQuestion).removeClass("currentQuestion");

      
}

function choice(idQuestion)
{          var aux =vector[idQuestion]-1;
         var answer = questions[aux].answer;
         var userAnswer = $("#input"+idQuestion).val();

         if (answer == userAnswer)
                {
                	var output = $("#usr").val();
                if (output.length>0)
                  $("#myDialogText").text("Bravo,"+ output+" .Iepurasul a mancat incat un morcov");
                else 
                  $("#myDialogText").text("Iepurasul a mancat incat un morcov.");

                $("#"+idQuestion).css("visibility", "hidden");
                $("#succesModal").modal('show').delay(2000).fadeOut();


                remainQuestions--;
                if(remainQuestions == 0)
                    {
                   
                       $("#succesModal").modal('hide');
                       $("#endModal").modal('show').show();                    
                       $("#rabbit").css("visibility", "hidden");
                       $("#rabbitGame").css("visibility", "hidden"); 
                      
                    }
              }
         else
                {
                 
                   $('#input'+idQuestion).val('');
                     $("#errorModal").modal('show').show();
                }
}

function handleCloseAvatarBtnClickEvent()
{

    $("#avatar-content-div").empty();
}

