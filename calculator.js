function init(){
  var calculation = "", decimal = false,
      operators = ["*",'/',"+","-"];

  //helper function: returns an equation from the given string based on the
  //given operator
  function matchOperator(string,operator){
    var pattern = new RegExp('((\\d|\\d\\.)+\\'+operator+')*[\\d\\.]+','g');
    return string.match(pattern);
  }

  //helper function: returns an arithmetic calculation based on the given
  //operator
  function arithmetic(x,y,operator){
    switch(operator){
      case "+":
        return x+y;
      case "-":
        return x-y;
      case "*":
        return x*y;
      case "/":
        return x/y;
    }
  }

  //helper function: Calculates the string by operating over each equation that
  //has gotten matched in MDAS fashion.
  function calculateString(string){
    operators.forEach(function(operator){
      var equations = matchOperator(string,operator);
      if(equations){
        equations.forEach(function(equation){
          var value = equation.split(operator).reduce(function(x,y){
                return arithmetic(parseFloat(x),parseFloat(y),operator);
          });
          string = string.replace(equation,value);
        });
      }
    })

    return string;
  }

  //helper function: clears the output screen and calculation string value
  function clear(){
      decimal = false;
      calculation = "";
      $("#output").text("");
  }

  $("span").click(function(){

    var btnVal = $(this).text(), number = parseInt(btnVal),
        lastStringVal = calculation[calculation.length - 1];

    //check if the value is a number type
    if(!isNaN(number)){
        calculation += btnVal;
        $("#output").text(calculation);
    }

    //button check for Cancel/Erase and its functionality
    if(btnVal == "C"){
        clear();
    }

    //check if the value is an operator
    if(isNaN(number) && btnVal != "." && btnVal != "C"){

        //check if the value is anything but an equal operator AND
        //see if the last string value is an operator
        if(btnVal != "=" && !/\+|-|\*|\//.test(lastStringVal) && calculation.length != 0){
          calculation += btnVal;
          $("#output").text(calculation);
          decimal = false;
        }

        //print output when the value is the equal operator
        if(btnVal == "="){
          var output = calculateString(calculation);
          clear();
          $("#output").text(output);
          calculation += output;
        }
    }


    //check if the value is a period/decimal button AND see if
    //the string has already been declared as a decimal so the user can't
    //consecutively print out multiple periods/decimals from the calculator
    if(btnVal == "." && !decimal){

        //check if the last string value in the calculation variable is a digit.
        //If the last string value is not a digit/number type:
        if(!/\d/.test(lastStringVal)){
          //Add a Zero(0) and a Period(.) to the calculation string.
            decimal = true;
            calculation += 0 + btnVal;
            $("#output").text(calculation);
        }

        //Else just add a period to the string.
        else{
            decimal = true;
            calculation += btnVal;
            $("#output").text(calculation);
        }
    }

 })
}



$(document).ready(function(){
  init();
})
