var questions = [{
    question:"1)3*4= ",
    answer:12,
    topValue:13,
    leftValue:15
  }, {
    question:"2)2+3= ",
    answer:"5",
    topValue:30,
    leftValue:30
},{
  question:"3)10-3= ",
  answer:7,
    topValue:25,
    leftValue:50
    },{
  question:"4)20-7= ",
  answer:13,
    topValue:70,
    leftValue:50
    },{
  question:"5)10+8= ",
  answer:18,
    topValue:50,
    leftValue:40
    },{
  question:"6)8+7 = ",
  answer:15,
    topValue:60,
    leftValue:80
    },{
  question:"7)5*4= ",
  answer:20,
    topValue:15,
    leftValue:70
    },{
  question:"8)21:3= ",
  answer:7,
    topValue:40,
    leftValue:80
  },{
  question:"9)23-7= ",
  answer:16,
    topValue:60,
    leftValue:20
    },{
  question:"10)4*8= ",
  answer:32,
    topValue:50,
    leftValue:60
  }];

var currentQuestion =0;
var previousQuestion= 0;
var remainQuestions = questions.length;

var win = window.innerWidth;
var hin = window.innerHeight;
var topRabbitValue = 25;
var leftRabbitValue = 80;
var ok=0;
var maximLeft;
var maximTop;
var anotherQuestion= 0;
var code;
 var idQuestion;

var AVATAR_HELP_TITLE_MESSAGE = "Ajutor";
var AVATAR_HELP_CONTENT_MESSAGE = "Ținând butonul mouse-ului apăsat, ordonează crescător numerele de pe etichete pentru a afla câte scufundări au făcut copiii.";

(function()
{
var listOfQuestions= displayImagesAndQuestions();
$('body').append(listOfQuestions);
setQuestionsPositions();
displayStartMessage();
displayImage();
displayPageElements();
$(window).on('resize',displayPageElements);
$("#mesaj").hide();
  showAvatarHelpFirst("", AVATAR_HELP_CONTENT_MESSAGE, ""); 

function displayPageElements()
{   if ($(window).width()>1500)
      {
          maximLeft = 0;
          maximTop = -10;
      }
    if ( $(window).width()< 1500 && $(window).width()> 800 )
      {
          maximLeft = 0;
          maximTop = 10;
      }
    if ( $(window).width() < 800 )
       {
          maximLeft = 0;
          maximTop=0;
       }
    setRabbitPosition();
    setQuestionsPositions();
    // $('.images').css('width',($(window).width()*0.3)+'px');
    // //$('#rabbitGame').css('width',($(window).width()/1.5*0.07)+'px');
    // // // $('#mesaj').css('font-size',($(window).width()/3*0.03)+'px');
    // // // $('.tableQuestions').css('font-size',($(window).width()/2*0.015)+'px');
    // $('.tableQuestions').css('width',($(window).width()*0.07)+'px');
 }

function displayImage()
  {
     var im='<img  id="rabbitGame" src="images/bunny.png">';
  	 $("#imagesDiv").append(im);
  }

function setRabbitPosition()
{ 
  var w = window.innerWidth;
  var h = window.innerHeight;
  newPos= new Object();
  
  if(ok == 0)
   {
     newPos.left = leftRabbitValue*w;
     newPos.top = topRabbitValue*h;
     $("#rabbitGame").offset(newPos);
     ok = 1;
   }
  else
   {
     var auxiliarVariable = $( "#" + currentQuestion ).offset();
     newPos.left = auxiliarVariable.left+maximLeft;
     newPos.top = auxiliarVariable.top-maximTop;
     $("#rabbitGame").offset(newPos);
   }
}

function displayStartMessage()
 {

  $("#mesaj").append("Iepurasului ii este foame.Il ajuti sa manance tot?").show();
 $("#mesaj").addClass("warning");
  var output = '<button id="startButton" type="button">OK!</button>';
  $("#mesaj").append(output);
 }

$("#startButton").on('click',function(e)
{
  $("#mesaj").css("visibility", "hidden");
});

function displayImagesAndQuestions()
{
     var output="";
     var aux;
     for(var j = 0 ; j< questions.length; j++)
         output+='<div class="question" id="'+( + j )+'"> <div class="images"/><div id="t' + j + '" class="tableQuestions"><div id="nou">' 
         + questions[j].question + '<input class="textBox" type="text" class="inputStyle" id="input' + j + '" name="answer"/></div></div></div>';
     return output;
}
// <div class="images"><img class="img-responsive" type="image" id="imageCarrot" src="images/carrot.png"></div>

function setQuestionsPositions()
  { var w = window.innerWidth;
    var h = window.innerHeight;
    for(var j = 0; j<questions.length; j++)
        {
          newPos = new Object();
          newPos.left = questions[j].leftValue*w;
          newPos.top = questions[j].topValue*h;
          $("#"+ j ).offset(newPos);
        }
  }

$(".question").on('click',function(e)
  {    
       var w = window.innerWidth;
       var h = window.innerHeight;
       $("#mesaj").removeClass("warning");
       $("#mesaj").html("");
       previousQuestion = currentQuestion;

       if ($("#input"+currentQuestion).val()!=0)
       choice(previousQuestion);

       currentQuestion = $(this).attr('id');
       $("#t"+previousQuestion).css('background','#F5A9F2');
       $("#t"+currentQuestion).css('background','red');

       var auxiliarVariable = $("#"+currentQuestion).offset();
       newPos= new Object();
       newPos.left = auxiliarVariable.left+maximLeft;
       newPos.top = auxiliarVariable.top-maximTop;

       $("#t"+currentQuestion).addClass("currentQuestion");
       var isVisible = $('#' + previousQuestion).is(':visible');

       if (isVisible == true )
      	  $('#input'+previousQuestion).val('');

       if (isVisible == true && currentQuestion != previousQuestion)
                $("#t" + previousQuestion).removeClass("currentQuestion");

       $('#rabbitGame').animate({
            top: newPos.top,left:newPos.left},250);
  });

$("body").on('click',function (e) 
{
});
$(".question").keydown(function (e) 
  {
     code = e.keyCode || e.which;
     idQuestion = $(this).attr('id');
         if (code == 13)
     choice(idQuestion);
    
  });

function choice(idQuestion)
{ 
         var answer = questions[idQuestion].answer;
         var userAnswer = $("#input"+idQuestion).val();

         if (answer == userAnswer)
             {  $("#mesaj").addClass("success");
                $("#mesaj").html("   Iepurasul a mancat inca un morcov!!").show().delay(2000).fadeOut();
                $("#"+idQuestion).css("visibility", "hidden");
                remainQuestions--;
                if(remainQuestions == 0)
                    {
                       $("#mesaj").removeClass("success").removeClass("error").addClass("warning");
                       $("#mesaj").html("Iepurasul a mancat tot si pleaca la somn!!"+ "&#9786").css({"position": "relative", "top": "500px", "left": "500px"}).show().delay(3000).fadeOut();
                       $("#rabbit").css("visibility", "hidden");
                       $("#rabbitGame").css("visibility", "hidden"); 
                       var output ='<div id="restart"> <button  type="button"><a href = "../mariana_animation/index.html">Reincepe joc!</button></div>';
                       $('body').append(output);
                       $("#restart").css("text-align","center");
                    }
              }
         else
                {
                   $("#mesaj").removeClass("success").addClass("error");
                   $("#mesaj").html("Raspunsul nu este corect!Mai incearca").show().delay(3000).fadeOut();
                   $('#input'+idQuestion).val('');
                }
      
      // }
    }

})();