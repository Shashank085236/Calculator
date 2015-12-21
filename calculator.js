/**
 * Created by SHASHANK on 19-12-2015.
 * Library to perform simple mathematical functions such as Add, Sub, Multiply and Divide
 */


;(function(global){
    var Math = function(){
        // A trick not to use new every time a client needs to use the API
        return new Math.init();
    }

    Math.init = function(){}

    // public methods
    Math.prototype = {
        add : function(a,b){
            return a+b;
        },
        sub : function(a,b){
            return a-b;
        },
        multiply : function(a,b){
            return a*b;
        },
        divide : function(a,b){
            return a/b;
        }
    }


    // We make sure prototype of Math.init is same as Calulator.prototype
    // so that our all functions written in Math.prototype is accessible.
    Math.init.prototype = Math.prototype;

    // Exposing Math to outer world.
    // Now API is accessible using C$
    global.Math = global.C$ = Math;

}(this));

var Calculator = {
    operationsAllowed: ['+','-','*','/'],
    numbers_pressed : [],
    numbers_actions : [],
    display : 0,

clear : function(){
    this.numbers_pressed = [];
    this.numbers_actions = [];
    this.display = 0;
},

evaluate : function(){
    if(this.numbers_actions.length < 3){
        this.clear();
    }
    else{

        var num1 = parseFloat(this.numbers_actions[0]);
        var num2 = parseFloat(this.numbers_actions[2]);
        var action = this.numbers_actions[1];
        var actions = {
            '+' : C$().add,
            '-' : C$().sub,
            '*' : C$().multiply,
            '/' : C$().divide
        }
        console.log('num1: '+num1+' num2: '+num2+' action: '+action);
        var result = actions[action](num1,num2);
        this.numbers_pressed.push(result);
        this.numbers_actions = [];
        this.display = result;
    }
},

handleAction : function(action){
    if(action === 'cl'){
        this.clear();
    }
    else if(action === '='){
        var num2 = Calculator.numbers_pressed.join('');
        this.numbers_actions.push(num2);
        this.numbers_pressed = [];
        this.evaluate();
    }
    else{
        if(Calculator.isOperator(action)){
            //save the first number and operator
            var num1 = this.numbers_pressed.join('');
            this.numbers_actions.push(num1);
            this.numbers_actions.push(action);
            this.numbers_pressed = [];
            this.display = num1;

        }else{
            this.numbers_pressed.push(action);
            this.display = Calculator.numbers_pressed.join('');
        }
    }
    return this.display;
},
    isOperator : function(action){
  for(var index in this.operationsAllowed){
      if(action === this.operationsAllowed[index]){
          return true;
      }
  }
        return false;
}


}


$( document ).ready(function() {

    $( ".number" ).on( "click", function() {
        var number = $( this ).text().trim();
        $('#display').val(Calculator.handleAction(number));
    });

    $( ".action" ).on( "click", function() {
        var action = $( this ).text().trim();
        $('#display').val(Calculator.handleAction( action ));
    });

})

