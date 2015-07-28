(function()
{
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
var listOfQuestions= displayImagesAndQuestions();
var win = window.innerWidth;
var hin = window.innerHeight;
var topRabbitValue;
var leftRabbitValue;
var ok=0;
var maximLeft;
var maximTop;

$('body').append(listOfQuestions);

topRabbitValue= 25;
leftRabbitValue= 80;
setQuestionsPositions();
displayStartMessage();
displayImage();
displayPageElements();

$(window).on('resize',displayPageElements);

function displayPageElements()
{
    if ($(window).width()>1500)
    {
        maximLeft = 100;
        maximTop = -5;
    }
    if ($(window).width()<1500 && $(window).width()>800)
    {
        maximLeft = 40;
        maximTop = 10;
    }
    if ($(window).width()<800)
     {
        maximLeft = 20;
        maximTop=40;

     }

    setRabbitPosition();
    setQuestionsPositions();
    $('.images').css('width',($(window).width()*0.3)+'px');
    $('#rabbitGame').css('width',($(window).width()/1.5*0.07)+'px');
    $('#mesaj').css('font-size',($(window).width()/3*0.02)+'px');
    $('.tableQuestions').css('font-size',($(window).width()/2*0.015)+'px');
    $('.tableQuestions').css('width',($(window).width()*0.05)+'px');
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
     newPos.left = leftRabbitValue*w/100;
     newPos.top = topRabbitValue*h/100;
     $("#rabbitGame").offset(newPos);
     ok = 1;
   }
  else
   {
     var auxiliarVariable = $("#"+currentQuestion).offset();
     newPos.left=auxiliarVariable.left+maximLeft;
     newPos.top = auxiliarVariable.top-maximTop;
     $("#rabbitGame").offset(newPos);
   }
}

function displayStartMessage()
 {
  $("#mesaj").html("Iepurasului ii este foame.Il ajuti sa manance tot?").show().delay(3000).fadeOut();
  $("#mesaj").addClass("warning");
 }

function displayImagesAndQuestions()
{
     var output="";
     var aux;
     for(var j = 0 ; j< questions.length; j++)
         output+='<div class="question" id="'+( + j )+'"><div class="images"><img class="img-responsive" type="image" id="imageCarrot" src="images/carrot.png"></div><div id="t'+j+'" class="tableQuestions"><div id="nou">'+questions[j].question+'<input class="textBox" type="text" class="inputStyle" id="input'+j+'" name="answer"></input></div></div></div>';

     return output;
}

function setQuestionsPositions()
  { var w = window.innerWidth;
    var h = window.innerHeight;
    for(var j = 0; j<questions.length; j++)
        {
          newPos = new Object();
          newPos.left = questions[j].leftValue*w/100;
          newPos.top = questions[j].topValue*h/100;
          $("#"+j).offset(newPos);
        }
  }

$(".question").on('click',function(e)
  {
       var w = window.innerWidth;
       var h = window.innerHeight;
       $("#mesaj").removeClass("warning");
       $("#mesaj").html("");
       previousQuestion = currentQuestion;
       currentQuestion = $(this).attr('id');
       var auxiliarVariable = $("#"+currentQuestion).offset();
       newPos= new Object();
       newPos.left=auxiliarVariable.left+maximLeft;
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


$(".question").keydown(function (e) 
  {
     var code = e.keyCode || e.which;
     if(code == 13) { 
         var idQuestion = $(this).attr('id');
         var answer = questions[idQuestion].answer;
         var userAnswer = $("#input"+idQuestion).val();

         if (answer == userAnswer)
             {  $("#mesaj").addClass("success");
                $("#mesaj").html("   Iepurasul a mancat inca un morcov!!").show().delay(2000).fadeOut();
                $(this).css("visibility", "hidden");
                remainQuestions--;
                if(remainQuestions == 0)
                    {
                       $("#mesaj").removeClass("success").removeClass("error").addClass("warning");
                       $("#mesaj").html("Iepurasul a mancat tot si pleaca la somn!!"+ "&#9786").css({"position": "relative", "top": "500px", "left": "500px"}).show().delay(3000).fadeOut();
                       $("#rabbit").css("visibility", "hidden");
                       $("#rabbitGame").css("visibility", "hidden"); 
                       var output ='<button type="button"><a href = "../mariana_animation/index.html">Reincepe joc!</button>';
                       $('body').append(output);
                    }
                }
                else
                {
                   $("#mesaj").removeClass("success").addClass("error");
                   $("#mesaj").html("Raspunsul nu este corect!Mai incearca"+"&#9785").show().delay(3000).fadeOut();
                   $('#input'+idQuestion).val('');
                }
           }
  });

})();