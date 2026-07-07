// Implementation of call, apply and bind methods that exists on the global Function.prototype

// call
Function.prototype.myCall = function(context, ...args){
  
  if(typeof this !== "function"){
    throw new Error(`${this} is not a function`);
  }

  if(context === null || context === undefined){
    context = globalThis;
  }else{
    context = Object(context)
  }

  const uniqueKey = Symbol("uniqueFunctionKey");
  
  context[uniqueKey] = this;
  
  const result = context[uniqueKey](...args);
  
  delete context[uniqueKey];
  
  return result;
}
// apply
Function.prototype.myApply = function(context, args){
  if(typeof this !== "function"){
    throw new Error(`${this} is not a function.`);
  }
  if(context === null || context === undefined){
    context = globalThis;
  }else{
    context = Object(context);
  }

  const uniqueKey = Symbol("uniqueFunctionKey");
  context[uniqueKey] = this;
  let result;
  try {
    result = context[uniqueKey](...args);
  } catch (error) {
    console.log(error);
    return
  }
  delete context[uniqueKey];
  return result;
}
// bind
Function.prototype.myBind = function(context, ...initialArgs){
  if(typeof this !== "function"){
    throw new Error(`${this} is not a function.`)
  }
  
  if(context === null || context ===  undefined){
    context = globalThis;
  }else{
    context = Object(context);
  }

  return (...finalArgs) => {
    const uniqueKey = Symbol("functionUniqueKey");
    context[uniqueKey] = this;
    let result;
    try {
      result = context[uniqueKey](...initialArgs, ...finalArgs)
    } catch (error) {
      console.log(error);
      return
    }
    delete context[uniqueKey];
    return result;
  }
}

const person = {name:"Srijan"}

function greet(greeting, punctuation){
  console.log(`${greeting} ${this.name}${punctuation}`);
}

greet.myCall(person, "Hello", "!");
greet.myApply(person, ["Hello", "!"]);
const greetSrijan = greet.myBind(person, "Hello");
greetSrijan("!");

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

function PostRequest(url,payload){
  this.payload = payload
  Request.call(this, url);
}

PostRequest.prototype = Object.create(Request.prototype);
PostRequest.prototype.sendData = function(){
  console.log(`Sending ${this.payload} to ${this.url}`);
}

const newReq = new PostRequest("http://localhost", "Hello");
newReq.send();
newReq.sendData();