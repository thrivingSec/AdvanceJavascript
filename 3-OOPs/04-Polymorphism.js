/**
 * Similar to polymorphism in life.
 * polimorphism = multiple forms
 * The ability of a single function or method or operator to behave/work in different ways based on object 
 * it is acting upon or actual need.
 * A phenomenon that allown an object to have several different forms and behaviours.
 */

/**
 * Types of polymorhphism in JavaScript
 * 1. Method Overriding
 * 2. Duck Typing(Interface - Free Polymorphism)
 * 3. Method Overloading(Simulated)
 */

// Method Overriding: When a child class redefines a method tha alreadiy exist in the parent class and that method is already inherited, then the new defination of the method overtakes when invoded from the object of the child class.

class PaymentGateway {
  processPayment(amount){
    console.log(`Processing generic payment of ${amount}`);
  }
}

class PaypalPayment extends PaymentGateway{
  // overriding the processPayment method in the sub class
  processPayment(amount){
    console.log(`Processing payment of ${amount} via paypal APIs.`);
  }
}

class stripePayment extends PaymentGateway{
  // overriding the processPayment mehtod in the sub class
  processPayment(amount){
    console.log(`Proceesing payment of ${amount} via stripe tokens.`);
  }
}

function completePayment(gateway, amount){
  gateway.processPayment(amount);
}

completePayment(new PaypalPayment(), 100); // Processing payment of 100 via paypal APIs.
completePayment(new stripePayment(), 100); // Proceesing payment of 100 via stripe tokens.

// Duck Typing: Any object can be passed into a function as long as it exposes the property or method the function expects, regardless of its class hierarchy.

const textFile = {
  save: function(){
    console.log("Saving the text file in the local storage.");
  }
}

const cloudStorage = {
  save: function(){
    console.log("Saving the medias on cloud storage.");
  }
}


function executeBackup(target){
  target.save();
}

executeBackup(textFile); //Saving the text file in the local storage.
executeBackup(cloudStorage); // Saving the medias on cloud storage.

// Method Overrloading(Simulated)
/**
 * In static languages, method overloading allows multiple functions to share the exact same name but have 
 * different parameter signatures (different counts or types).
 * JavaScript does not support native method overloading. If you define two functions with the same name, 
 * the second one completely overwrites the first. To achieve overloading, you must simulate it using 
 * conditional checks inside a single function.
 */

class Plotter {
  draw(val1, val2){
    if(val2 === undefined){
      console.log(`Drawing a square with edges ${val1}`);
    }else{
      console.log(`Drawing a rectangle with length ${val1} and breath ${val2}`);
    }
  }
}

const shapes = new Plotter();
shapes.draw(10);
shapes.draw(10, 20);

// Functions can also behave differently based on argument types.