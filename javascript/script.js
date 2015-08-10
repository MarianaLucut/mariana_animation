var questions = [{
    question:"1)3*4= ",
    answer:12,
    topValue:16,
    leftValue:23
  }, {
    question:"2)2+3= ",
    answer:"5",
    topValue:35,
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
    leftValue:10
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
    topValue:30,
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

var topRabbitValue = 25;
var leftRabbitValue = 80;
var ok=0;
var maximLeft;
var maximTop;
var anotherQuestion= 0;
var code;
 var idQuestion;
 var enterWasPressed;
var w = window.innerWidth;
var h = window.innerHeight;
var remainQuestions = questions.length;

(function()
{
	$(".modal").modal({backdrop: false});
// $('.modal').css({'width': '200px'});
	$('.modal').modal('show');
var listOfQuestions= displayImagesAndQuestions();
$('#content').append(listOfQuestions);
  $("#mesaj").css("visibility", "hidden");

setQuestionsPositions();
displayStartMessage();
displayImage();
displayPageElements();
$(window).resize(function(){
 w = window.innerWidth;
 h = window.innerHeight;
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
     $("#content").append(im);
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

function displayStartMessage()
 {

  $("#mesaj").append("Iepurasului ii este foame.Il ajuti sa manance tot?").show();
 $("#mesaj").addClass("warning");
  var output = '<button id="startButton" type="button">OK!</button>';
  $("#mesaj").append(output);
 }

 function displayImagesAndQuestions()
{
     var output="";
     var aux;
     for(var j = 0 ; j< questions.length; j++)
         output+='<div  class="question img-responsive" id="'+( + j )+'"> <div class="images"></div><div id="t' + j + '" class="tableQuestions"><div class ="nou" id="nou'+j +'">' + questions[j].question + '<input class="textBox" type="text" class="inputStyle" id="input' + j + '" name="answer"></input></div></div></div>';
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
{ 
         var answer = questions[idQuestion].answer;
         var userAnswer = $("#input"+idQuestion).val();

         if (answer == userAnswer)

             {  $("#mesaj").css("visibility", "");
                $("#mesaj").addClass("success");
                $("#mesaj").html("   Iepurasul a mancat inca un morcov!!").show().delay(2000).fadeOut();
                $("#"+idQuestion).css("visibility", "hidden");

                remainQuestions--;
                if(remainQuestions == 0)
                    {
                       $("#mesaj").removeClass("success").removeClass("error").addClass("warning");
                        $("#mesaj").css("visibility", "");
                       $("#mesaj").empty().append("Iepurasul a mancat tot si pleaca la somn!!"+ "&#9786").css({"position": "relative", "top": "500px", "left": "500px"}).show().delay(3000).fadeOut();
                       $("#rabbit").css("visibility", "hidden");
                       $("#rabbitGame").css("visibility", "hidden"); 
                       var output ='<div id="restart"> <button  type="button"><a href = "index.html" >Reincepe joc!</button></div>';
                       $('body').append(output);
                       $("#restart").css("text-align","center");
                    }
              }
         else
                {
                   $("#mesaj").css("visibility", "");
                   $("#mesaj").removeClass("success").addClass("error");
                   $("#mesaj").empty().append("Raspunsul nu este corect!Mai incearca").show().delay(3000).fadeOut();
                   $('#input'+idQuestion).val('');
                }
}

