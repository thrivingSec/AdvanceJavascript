
// Closures: A Closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).
// When a function returns another function, the inner function maintains a "backpack" of the outer function's variables, preventing them from being garbage-collected.
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


