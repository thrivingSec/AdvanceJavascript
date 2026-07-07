/**
 * "The Scope Chain"
 * - In JavaScript, Scope refers to the current context of code, determining the accessibility of variables.
 * 
 * - Global Scope: Variables declared outside any function or block are accessible everywhere.
 * 
 * - Function/Local Scope: Variables declared inside a function are strictly accessible only within that 
 *   function.
 * 
 * - Block Scope: Variables declared with let or const inside a set of curly braces {} are scoped to that   
 *   block. Note: var is function-scoped and completely ignores block scope.
 * 
 * - Lexical Environment: "Lexical" simply means where the code is physically written in your file. When the
 *   JS engine executes a function, it creates a "Lexical Environment" to store local variables.
 * 
 * - Outer Environment Reference: Crucially, it also attaches an Outer Environment Reference—a link to the 
 *   lexical environment of its parent. If the engine can't find a variable locally, it travels up this "Scope 
 *   Chain" until it hits the Global Scope.
 * 
 * "Closures"
 * A Closure is the combination of a function bundled together (enclosed) with references to its surrounding 
 * state (the lexical environment). In plain English: a function remembers its outer variables even after the 
 * outer function has finished executing.
 * 
 * - Lexical scoping retention: When a function returns another function, the inner function maintains a 
 *   "backpack" of the outer function's variables, preventing them from being garbage-collected.
 * 
 * - Data hiding and encapsulation: Because closures trap variables, we can use them to create private states 
 *   that cannot be modified directly from the outside, which is vital for secure backend logic.
 * 
 * - IIFEs (Immediately Invoked Function Expressions): Before let and const existed, developers used
 *   IIFEs—functions that run the moment they are defined—to create instant function scopes and prevent\
 *   polluting the global namespace.
 * 
 * - The stale closure problem: This is one of the most heavily tested concepts in JS interviews. If you use 
 *   var in a loop with an asynchronous callback (like setTimeout), var leaks to the function scope. By the 
 *   time the async callback runs, the loop has already finished, and all callbacks reference the final 
 *   mutated value of that single var instance. Using let fixes this by binding a fresh block scope for every 
 *   single iteration.
 */

function createBankAccount(accountHolder, accountBalance) {
    const userName = accountHolder;
    let balance = accountBalance;
    // deposit, withdraw, getBalance
    return {
        deposit: function (amount) {
            balance += amount;
            console.log(`Amount ${amount} deposited successfully in ${userName}'s account.`);
        },
        withdraw: function (amount) {
            if (amount <= balance) {
                balance -= amount;
                console.log(`Amount ${amount} withdrawn successfully from ${userName}'s account.`);
            }
        },
        getBalance: function () {
            return balance;
        },
    };
}
const srijanAccount = createBankAccount("Srijan", 100);
const { deposit, withdraw, getBalance } = srijanAccount;
console.log("Starting balance: ", getBalance());
console.log(deposit(50));
console.log(withdraw(10));
console.log("Final balance: ", getBalance());

// The 'var' issue
for(var i = 0; i < 3; i++){
    setTimeout(() => {console.log(`The value of i is ${i}`)}, 100);
}

for(let i = 0; i < 3; i++){
    setTimeout(() => {console.log(`The value of i is ${i}`)}, 100);
}

// Problem 1: Predict the exact output of the following code and explain why step-by-step to the "interviewer".
var myVar = 10;

function executeCode() {
  console.log(myVar); // undefined
  var myVar = 20;
  console.log(myVar); // 20
}

executeCode();
console.log(myVar); // 10


// Problem 2: Write a function called createOnceFunction that takes a callback function as an argument. It should return a new function that can only be executed exactly one time. If the new function is called a second or third time, it should return undefined and not execute the original callback.

function createOneFuntion(callback){
    let executed = false;
    let result;
    return function(){
        if(!executed){
            result = callback();
            executed = true;
            return result
        }
        return undefined
    }
}

let intialApp = createOneFuntion(() => {
    console.log("One time callback from the create one function.");
    return true
})
console.log(intialApp()); // One time callback from the create one function. and true
console.log(intialApp()); // undefined

// Problem 3: You are handed the following buggy legacy code by a junior developer. They want it to log 0, 1, 2, 3, 4 with a 1-second delay between each log. However, you are strictly not allowed to change var i = 0 to let i = 0.Using your knowledge of closures and IIFEs, rewrite the inside of the loop to fix the stale closure problem.
// for (var i = 0; i < 5; i++) {
//   setTimeout(function() {
//     console.log(i);
//   }, i * 1000);
// }

for(var i = 0; i < 5; i++){
    let j = i;
    setTimeout(function(){
        console.log(j)
    }, 1000)
};


