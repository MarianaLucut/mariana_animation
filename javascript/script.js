(function()
{
var questions = [{
    question:"1)3*4= ",
    answer:12,
    topValue:130,
    leftValue:150
  }, {
    question:"2)2+3= ",
    answer:"5",
    topValue:300,
    leftValue:300
},{
	question:"3)10-3= ",
	answer:7,
    topValue:250,
    leftValue:500
    },{
  question:"4)20-7= ",
  answer:13,
    topValue:80,
    leftValue:400
    },{
  question:"5)10+8= ",
  answer:18,
    topValue:500,
    leftValue:400
    },{
  question:"6)8+7 = ",
  answer:15,
    topValue:600,
    leftValue:800
    },{
  question:"7)5*4= ",
  answer:20,
    topValue:150,
    leftValue:700
    },{
  question:"8)21:3= ",
  answer:7,
    topValue:400,
    leftValue:800
  },{
  question:"9)23-7= ",
  answer:16,
    topValue:800,
    leftValue:200
    },{
  question:"10)11+13= ",
  answer:24,
    topValue:300,
    leftValue:1000

  }];
  var currentQuestion =0;
  var previousQuestion= 0;
  
 
var remainQuestions = questions.length;
var listOfQuestions=display();
$('body').append(listOfQuestions);
//alert( $("#1").attr("id") );
display2();
displayMessage();


function displayMessage()
{
  $("#mesaj").html("Iepurasului ii este foame.Il ajuti sa manance tot?").show().delay(3000).fadeOut();
$("#mesaj").addClass("warning");
}
 function display()
 {
        var output="";
        var aux;
        for(var j = 0 ; j< questions.length; j++)
        {
        	//output+='<div class="question" id="'+(+j)+'"><table ><tr><td><img id="imageCarrot" class="img-responsive" src="images/carrot.png"></td></tr> <tr><table id="t'+j+'" class="tableQuestions"><td>'+questions[j].question+'<input type="text" class="inputStyle" id="input'+j+'" name="answer"></input></td></table></tr></table></div>';
          output+='<div class="question" id="'+(+j)+'"><div><img id="imageCarrot" class="img-responsive" src="images/carrot.png"></div><div id="t'+j+'" class="tableQuestions">'+questions[j].question+'<input type="text" class="inputStyle" id="input'+j+'" name="answer"></input></div></div>';
        }
        return output;
}

  function display2()
  {
          for(var j = 0; j<questions.length; j++)
        {
          newPos = new Object();
          newPos.left = questions[j].leftValue+10;
          newPos.top = questions[j].topValue;
             $("#"+j).offset(newPos);
        }
  }

  $(".question").on('click',function(e)
  {
       $("#mesaj").removeClass("warning");
       $("#mesaj").html("");
       previousQuestion=currentQuestion;
       currentQuestion=$(this).attr('id');
      $("#t"+currentQuestion).addClass("currentQuestion");
      var isVisible = $('#'+previousQuestion).is(':visible');
         if (isVisible== true && currentQuestion!=previousQuestion)
               $("#t"+previousQuestion).removeClass("currentQuestion");
        var topValue = questions[currentQuestion].topValue-5;
        var leftValue = questions[currentQuestion].leftValue+100;
           $('#imageSource').animate({
                   top: topValue,left:leftValue},300);
  });


  $(".question").keydown(function (e) 
  {
          var code = e.keyCode || e.which;
          if(code == 13) { 
              var idQuestion = $(this).attr('id');
              var answer= questions[idQuestion].answer;
              var userAnswer=$("#input"+idQuestion).val();
          if (answer == userAnswer)
                {  $("#mesaj").addClass("success");
                  $("#mesaj").html("   Iepurasul a mai mancat inca un morcov!!").show().delay(2000).fadeOut();
                  $(this).css("visibility", "hidden");
                  remainQuestions--;
                  if(remainQuestions == 0)
                      {
                        $("#mesaj").removeClass("success").removeClass("error").addClass("warning");
                        $("#mesaj").html("Iepurasul a mancat tot si pleaca la somn!!"+ "&#9786").css({"position": "relative", "top": "500px", "left": "500px"}).show().delay(3000).fadeOut();
                        $("#rabbit").css("visibility", "hidden");
                        $("#imageSource").css("visibility", "hidden"); 
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