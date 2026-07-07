/**
 * "Execution Context and The Call Stack"
 * Exection context is an abstract container or an environment created by the JavaScript engine to evaluate 
 * and execute code. It manages everything required for the code to run, including its variables, functions, 
 * scope chains and the value of the keywords.
 * 
 * There are main two types of exectuion context:
 * 
 * 1. Global Execution Context(GEC):
 * - It is an environment created when the script first loads. 
 * - It handles all the code that is not inside a function.
 * - Only one GEC exists per program 
 * 
 * 2. Function Execution Context:
 * - It is an environment created when a function is invoked during the execution of code. 
 * - Each function gets its own distinct FEC.
 * 
 * There are two phases of execution context:
 * Every execution context is evaluated and excuted in two phases.
 * 
 * The two distict phases of execution context are:
 * 
 * 1. Phase 1: Memory Creation Phase (Allocation Phase)
 * The engine scans the code before exectuing a single line and allocates memory to all the varibales and 
 * the functions. Also the GEC in created which holds all the code and other stuff and is loaded at the 
 * bottom of stack memory.
 * 
 * - Variables declared with var keyword allocated and intialized with undefined.
 * - Varibales declared with let, const keyword are only allocated but not initalized.
 * - Fuction declerations are stored directly in the heap memory and there references are stored in the 
 *   pointer registered in the stack memeory. Also for functuion expression the behavior is same as for var, 
 *   let and const.
 * 
 * 2. Phase 2: Execution Phase
 * Engine again runs through the code line by line. It assign the exact values to the variables and execute 
 * the function calls.
 * 
 * The Call Stack (Stack Memory)
 * To manage all these exectuion context, the engine uses Stack (Last in, first out) data structure
 * 
 * - GEC is pushed to the bottom of call stack.
 * - When a fucntion is called, FEC is created and pushed on top of the stack.
 * - When the function returs, the FEC is popped of the stack and the memory is flagged for the garbage
 *   collection.
 * 
 * "Hoisting"
 * "Hoisting" is often taught as "JavaScript moves your variables to the top of the file." This is a 
 * misconception. Code doesn't physically move. Hoisting is simply the result of the Memory Creation Phase 
 * happening before the Execution Phase.
 * 
 * Here is how different declarations behave when hoisted:
 * var num = 10; // memory allocation phase -> num(stack memory -> GEC) -> undefined(heap memory)[memory 
 * allocate and 'undefined' value assign]
 * let num1 = 10; // memory allocation phase -> num1(stack memeroy -> GEC) -> memroy allocation but value is 
 * not assingne in that memeory address, i.e, not initailized yet
 * // var -> allocation + initalization
 * // since initiallized with 'undefined' so in execution phase if the varible is accessed before assignment/
 * initalization -> does not gives any error -> generates bug the the code(intiuitively wrong)
 * // let/conts -> allocation
 * // since not initalized yet hence accessing the var in execution phase before initializing it gives a 
 * error. -> intiuitively right
 * 
 * The Temporal Dead Zone (TDZ):
 * This is the period between entering the execution context (when memory is allocated for let/const) and 
 * the actual line where the variable is initialized. Accessing the variable in this zone throws a 
 * ReferenceError. It is JavaScript's way of forcing you to write cleaner, safer code.
 * 
 * Fucntion Exectuion Context (FEC)
 * When you define and call a function, the JavaScript engine manages memory using two main regions: the 
 * Memory Heap (an unstructured memory pool for objects and complex data) and the Call Stack (a structured, 
 * Last-In-First-Out data structure tracking execution).
 * 
 * 1. Defining the Function (Memory Creation Phase)
 * Before any code is executed line-by-line, the JavaScript engine scans the script during the parsing and 
 * compilation phase.
 * 
 * - Object Allocation in the Heap: Functions in JavaScript are actually first-class objects. The engine 
 *   allocates a block of memory in the Memory Heap to store the function's source code string, its compiled 
 *   bytecode, internal properties (like linking to its outer environment also know as scope chaining), and 
 *   the name property.
 * 
 * - Identifier Registration via Hoisting: The engine registers the function’s name (identifier) inside the 
 *   Variable Environment of the current execution context (usually the Global Execution Context).
 * 
 * - Reference Pairing: Instead of saving the massive function code directly in the variable list, the 
 *   engine stores a memory address pointer in the Call Stack's environment that points directly to the 
 *   function object's location over in the Memory Heap.
 * 
 * 2. Calling the Function (Execution Phase)
 * When the line of code that invokes the function (e.g., ) is executed, the engine shifts into high gear:
 * 
 * - Pushing a New Stack Frame: The engine creates a brand new Function Execution Context (FEC). This 
 *   context is packed into a chunk of memory called a "stack frame" and immediately pushed to the top of 
 *   the Call Stack.
 * 
 * - Allocating Local Memory: Inside this new stack frame, a local memory space is provisioned:
 *
 * - An object is initialized to collect the parameters passed in.
 *  
 * - Parameters and local variables (declared with var, let, or const) are registered.
 * 
 * - Primitive values (like numbers or booleans) are saved directly inside this stack frame. Any objects or 
 *   nested functions declared inside this function are allocated out in the Memory Heap, with their 
 *   pointers stored locally on the stack.
 * 
 * - Tracking Scope and Closure: The stack frame sets up a reference to its outer scope (the Scope Chain), 
 *   which dictates what variables the function has access to outside of its own borders.
 * 
 * 3. Returning from the Function (Cleanup Phase)Once the engine hits a statement or reaches the closing curly
 * brace of the function:
 * 
 * - Popping the Frame: The function's execution context is immediately popped off the Call Stack. The control 
 *   flow moves right back to the stack frame directly underneath it.
 * 
 * - Immediate Stack Reclamation: The memory used by that specific stack frame (local variables, primitives, 
 *   and parameters) is instantly wiped and reclaimed by the CPU.
 * 
 * - Asynchronous Garbage Collection: The items remaining in the Memory Heap behave differently. If the local 
 *   variables or the function object itself are no longer reachable by any active parts of the program, the 
 *   engine's built-in Garbage Collector will mark them and automatically free that heap memory during its 
 *   next background cycle.
 */


// MEMORY PHASE:
// 'employee' is allocated and set to undefined.
// 'getRole' is fully stored in memory.

console.log("Logging employee: ", employee); // undefined
console.log(getJob()); // "Backend Engineer"

var employee = "Alice";
function getJob(){
  return "Backend Engineer"
}
console.log("Logging employee: ", employee); // Alice

// TDZ
try {
  console.log(dbConfig)
} catch (error) {
  console.log(error.message??"Reference error");
}; // Accessing the dbConfig variable in temporal dead zone hence referece error

const dbConfig = {
  db:"Postgres",
  user:"admin"
} // In memeory phase -> dbConfig(Call Stack -> GEC) -> allocated but not initalized
console.log(dbConfig.db);

// Hoisting in function declaration vs expression
console.log(startServer());

function startServer(){
  return "Server is running."
}

console.log(connectdb()); // TypeError

var connectdb = function(){
  return "Connected to the database."
}

// Problem 1: The Hoisting Trap
// Predict the exact output of the following code and explain the engine's step-by-step logic (Memory vs. Execution phases).
var systemStatus = "Online";

function checkSystem() {
  console.log("Status 1:", systemStatus); // Status 1: undefined
  var systemStatus = "Offline";
  console.log("Status 2:", systemStatus); // STatus 2: Offline
}

checkSystem();

// Problem 2: TDZ and Scope
// Will this code run successfully, or will it throw an error? Explain the mechanics of the Temporal Dead Zone in relation to the logger function.

let maxConnections = 100;

function logger() {
  console.log("Max connections allowed:", maxConnections); // Reference Error
  let maxConnections = 500;
}

logger();

// Problem 3: The Stack and Expressions
// Predict the output of the following execution flow. Pay close attention to how the engine parses variables versus functions.

console.log(typeof processData); // undefined
console.log(typeof fetchUser); // function

var processData = function() {
  return "Processing...";
};

function fetchUser() {
  return "Alice";
}

var fetchUser = "Bob";

console.log(typeof fetchUser); // string