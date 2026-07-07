/**
 * JavaScript is stricly-single thread. It has one call stack -> It can only execute a single 
 * instruction at a time. Hence to prevent the enitre exectuion thread from getting freezed by a 
 * database network operation, it relies on asyncronous architecture.
 */
/**
 * Let say database.getUser() -> asysnchronous process -> In legacy JavaScript to handle these 
 * async calls we needed callbacks -> callbacks are the function passed into another function to be 
 * executed later -> getUser method would be defined in a way that it accepts a callback function 
 * which will be called after the execution of business logic i.e network call to get the user from 
 * its it.
 */

// Legacy callback way of handling async processes -> prone to callback hell and IoC
// database.getUser(userId, (error, user) => {
//   if(error) throw error;  
//   database.getPost(user.id, (error, post) => {
//     if(error) throw error;
//     console.log(post);
//   })
// })

/**
 * Following problems occour when dealing with the async ops. using callbacks
 * 
 * Callback Hell: When multile asynchronous operations depends on each othen and callback functions
 * get nested horizontally, creating a unrechable pyramid of doom.
 * 
 * Inversion of Control (IoC): The large architectural issue is when we pass our callbacks to the
 * function of third party libraries (eg. database drivers) then we loose the control over the 
 * callbacks. We have to trust the third party libray that it will execute the callback exactly 
 * once not multiple times and not swallow the errors.
 * 
 * Abysmal Readability: Code is meant to be read from top to bottom, but callback hell forces your 
 * eyes to move horizontally across multiple levels of indentation.
 */

// A classic representation of Callback Hell
// getUserData(userId, function(user) {
//     getOrders(user.id, function(orders) {
//         getPaymentDetails(orders[0].id, function(payment) {
//             processPayment(payment.amount, function(receipt) {
//                 console.log("Payment successful! Receipt: ", receipt);
//             }, function(paymentError) {
//                 console.error("Payment failed", paymentError);
//             });
//         }, function(detailsError) {
//             console.error("Could not fetch payment details", detailsError);
//         });
//     }, function(ordersError) {
//         console.error("Could not fetch orders", ordersError);
//     });
// }, function(userError) {
//     console.error("Could not fetch user", userError);
// });

// Deeper analysis on Callback Hell
/**
 * Execution of Callback Hell inside the memory.
 */
setTimeout(function step1() {
  setTimeout(function step2() {
    setTimeout(function step3() {
      console.log("Exit");
    }, 1000);
  }, 1000);
}, 1000);

/**
 * Phase 1: Trigger the chain of callbacks
 * Step 1: When the script executes -> setTimeout is registered in the callstack -> FEC stack 
 * frame is pushed on top of GEC.
 * Step 2: Event-Loop will give the task of timer to a thread from its tread pool and tag the 
 * step1() fucntion with the timer.
 * Step 3: SetTimout function execution is completed and the stack frame is now flagged for garbage 
 * collection and pust out from the call stack.
 * 
 * Phase 2: After the timer is complete.
 * Step 1: Event-Loop pushes the callback function i.e step1 into the callback queue.
 * Step 2: Based on the priority of timer callbacks, when the call stack is empty it will be pushed 
 * into the call stack.
 * Step 3: A new stack frame witth the FEC of step1 is registered on top of GEC.
 * Step 4: When the logic inside the step1 function executes, setTimeout is registered in the call 
 * stack, FEC of setTimeout is pushed insite the stack fram on top of the FEC on step1.
 * Step 5: setTimeout of step 1 will register a timer and attach a callback function step2 to it.
 * Step 6: setTimeout is pushed out of the call stack.
 * Step 7: step1 is pushed out of the call stack.
 * 
 * Phase 3: After the timer is complete.
 * Step 1: step2 is pushed in the callback queue and then in the callstack by the event loop
 * Step 2: setTimeout is pushed on top on step 2, which registeres a timer with the callback of 
 * step3 function.
 * Step 4: setTimeout is pushed out of the memeory and then step2 is also pused out the memeory of 
 * call stack
 * 
 * Phase 4: After the time is complete.
 * Step 1: step3 funciton is pushed in the call stack on top of GEC
 * Step 2: Output is ogged.
 * Step 3: step3 function is removed from the call stack 
 * 
 * So we see that the depth of call stack reache to 2 stack frame a max, hence it si establised that callback hell is not a memory problem or execution problem, it is more likely a mental and structural problem for the developer.
 */