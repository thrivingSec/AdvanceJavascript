/**
 * Execution Context Binding(this)
 * 'this' does not refers to the function or the functions lexial scope.
 * 'this' is a binding, that is create when the function is invoked and its refrences is determined
 * entirely from the call site(how the function is invoked).
 * 
 * Default Global Binding: When the funtion is invoked plainly inside the code, then 'this' referes
 * to the global object. In node.js this is the global.
 * To set 'this' to undefined we have to use Strict Mode("use strict").
 * 
 * Implicit Binding: Whent the function is called as a method of an object (eg. db.connect()).
 * In these cases 'this' refers to the Object before ".connect()".
 * 
 * Dynamic Binding and Lexial Binding: When a function is called inside a block or a fucntion then 
 * for regualr functions 'this' is determined at execution time based on the caller. For arrow 
 * functions completely bypass this rule; they use lexical binding. An arrow function does not have 
 * its own this; it inherits this from the surrounding (parent) scope exactly where it was written.
 */

class DatabaseConnection {
  connectionString;

  constructor(connectionString) {
    this.connectionString = connectionString;
  }

  // Regular function: Dynamic 'this'
  connectRegular() {
    setTimeout(function() {
      // TRAP: 'this' defaults to the Node timeout object here, not the DatabaseConnection
      console.log(`Connecting via regular to: ${this.connectionString}`);
    }, 100);
  }

  // Arrow function: Lexical 'this'
  connectArrow() {
    setTimeout(() => {
      // SUCCESS: The arrow function inherits 'this' from the connectArrow method
      console.log(`Connecting via arrow to: ${this.connectionString}`);
    }, 100);
  }
}

const db = new DatabaseConnection("postgres://localhost:5432/mydb");
db.connectRegular(); // Logs: "Connecting via regular to: undefined"
db.connectArrow();   // Logs: "Connecting via arrow to: postgres://localhost:5432/mydb"

/**
 * Explicit Binding Mechanism
 * In JavaScript functions are objects and their execution context the value of 'this' is determined 
 * dynamically in the execution phase based on how the function is invoked. 
 * Explicit Binding Mechanism allows to manually and explicitly set the context for 'this'
 * regardless of how they were invoked.
 * Explicit Binding Mechanism provides us three methods:
 * call(), apply(), bind() 
 */

/**
 * The call() method invokes the function immediately and changes the execution context to the object 
 * passed as the first argument. Any subsequent arguments are passed to the function individually, 
 * separated by commas.
 * Syntax: functionName.call(thisArg, arg1, arg2, ...)
 * Best use case: When you want to borrow a method from an object and run it right away with specific
 * parameters.
 */

const person = {name:"Srijan"}

function greet(greeting, punctuation){
  console.log(`${greeting} ${this.name}${punctuation}`);
}

greet.call(person, "Hello", "!")

/**
 * The apply() method functions exactly like call() with one structural difference: it accepts arguments as a 
 * single array (or array-like object) rather than listing them one by one. It still executes the function 
 * immediately.
 * Syntax: functionName.apply(thisArg, [arg1, arg2, ...])
 * Best use case: When your function arguments are already bundled together inside an array or generated 
 * dynamically
 */

const user = {
  name:"Alice"
}

function introduce(city, country){
  console.log(`Hi, I'm ${this.name}. I'm from ${city}, ${country}.`);
}

introduce.apply(user, ["Tokyo", "Japan"]);


/**
 * Unlike call() and apply(), bind() does not execute the function immediately. Instead, it generates and 
 * returns a brand-new copy of the function with the this context permanently locked to the object you provided. 
 * You can invoke this new function later whenever you want.
 * Syntax: const newFunc = functionName.bind(thisArg, arg1, arg2, ...)
 * Best use case: When setting up event listeners, asynchronous callbacks, or storing a custom-configured 
 * function for future execution
 */
const user1 = {
  name:"Dina"
}
const dinaIntroduce = introduce.bind(user1, "Tokyo"); // supports partial application(curring) and full application

dinaIntroduce("Japan");

/**
 * Function (The Constructor): The global blueprint used to manufacture function objects.
 * Function.prototype: The shared warehouse containing call(), apply(), and bind().
 * myFunction: Your custom function object, which keeps a wireless "link" pointing back to that shared warehouse
 */
function myFunction(){}

console.log(myFunction.hasOwnProperty("call")); // false
console.log(myFunction.hasOwnProperty("bind")); // false
console.log(myFunction.hasOwnProperty("apply")); // false

console.log(Function.prototype.hasOwnProperty("call")); // true
console.log(Function.prototype.hasOwnProperty("bind")); // true
console.log(Function.prototype.hasOwnProperty("apply")); // true

console.log(myFunction.prototype === Function.prototype); // false
console.log(Object.getPrototypeOf(myFunction) === Function.prototype); //true

/**
 * JavaScript does not have traditional "classes" like Java or C#. It uses a prototypal delegation model. A 
 * prototype is simply a regular JavaScript object that other objects can secretly link to.
 * 
 * __proto__ vs. prototype: Every time you write a function, JavaScript secretly attaches a brand new, empty 
 * object to it called .prototype. The property .prototype only exists on the factory (the function). 
 * Conversely, JavaScript created a hidden, specialized property on the instance called __proto__. __proto__ is 
 * the actual internal link (the map) that points back to the constructor's .prototype.
 * 
 * Constructor Functions & new: When you invoke a function with the new keyword, the engine creates a brand new, 
 * empty object. It points the this keyword inside the factory to that new empty object. Crucially, it secretly 
 * links the new object's __proto__ to the constructor's .prototype. Finally, it returns the object.
 * 
 * Object.create(): This is a built-in tool that allows you to directly create a new object and manually set its 
 * __proto__ to an existing object, establishing prototypal inheritance without constructor functions.
 * 
 * ES6 Classes: JavaScript classes are completely fake; JavaScript did not change how it works behind the 
 * scenes. The class keyword is just syntactic sugar over the same constructor functions and prototype chaining 
 * that has always existed.
 */

// Modern ES6 Class Approach
class Server {
  constructor(port) {
    this.port = port;
  }
  start() {
    console.log(`Server listening on ${this.port}`);
  }
}

// Raw Prototypal Approach (What JS actually does)
function PrototypalServer(port) {
  this.port = port; // 'this' bound by the 'new' keyword
}

// Manually attaching the method to the master manual (prototype)
PrototypalServer.prototype.start = function() {
  console.log(`Server listening on ${this.port}`);
};

const app1 = new Server(8080);
const app2 = new PrototypalServer(3000);

// Proof that 'class' is just a function
console.log(typeof Server); // Logs: "function"


// Problem 1: The Express Route Trap (Output & Explanation)
// You are building an Express.js controller. Predict the output of this code when the handleRequest function is triggered. Explain exactly why it behaves this way and provide two different ways to fix it.

const authController = {
  
  sercretKey:"super_secret_key",
  
  verifyToken:function(){
    console.log("Verifying the token using: " + this.sercretKey);
  }
}

function simulateExpressRoute(callback){
  callback();
}

simulateExpressRoute(authController.verifyToken); // Verifying the token using undefined
authController.verifyToken();

class AuthController {
  sercretKey;
  constructor(key){
    this.sercretKey = key; 
  }
  verifyToken1(){
    console.log(`Verifying the token1 using: ${this.sercretKey}`);
  }
  verifyToken2(){
    setTimeout(function verifyToken(){
      console.log(`Verifying the token2 using: ${this.sercretKey}`);
    }, 0)
    // verifyToken();
  }
  verifyToken3(){
    const verifyToken = () => {
      console.log(`Verifying the token3 using: ${this.sercretKey}`);
    }
    verifyToken()
  }
}

const controller = new AuthController("secret_key");

controller.verifyToken1(); // logs properly
controller.verifyToken3(); // logs properly
controller.verifyToken2(); // undefined

// Problem 2: 

/**
 * Problem 3: Prototypal Translation (Refactoring)
 * You are handed a modern ES6 class that inherits from another class. Translate this entire snippet into 
 * pre-ES6 code using standard constructor functions, .prototype, and Object.create().
 */

// class Request {
//   constructor(url) {
//     this.url = url;
//   }
//   send() {
//     console.log(`Sending to ${this.url}`);
//   }
// }

// class PostRequest extends Request {
//   constructor(url, payload) {
//     super(url);
//     this.payload = payload;
//   }
//   sendData() {
//     console.log(`Sending ${this.payload} to ${this.url}`);
//   }
// }

function Request(url){
  this.url = url;
}
Request.prototype.send = function(){
  console.log(`Sending to ${this.url}`);
}

function PostRequest(url, payload){
  Request.call(this, url)
  this.payload = payload;
}
PostRequest.prototype = Object.create(Request.prototype);
PostRequest.prototype.sendData = function(){
  console.log(`Sending ${this.payload} to ${this.url}`);
}

const postReq = new PostRequest("http://localhost:3000", "payload");
postReq.send();
postReq.sendData();
