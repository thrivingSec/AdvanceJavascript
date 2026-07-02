# Execution Context & The Call Stack

An Execution Context is an abstract container or environment created by the JavaScript engine to evaluate and execute code. It manages everything required for the code to run, including its variables, functions, scope chains, and the value of the keyword.

• Global Execution Context (GEC):
The default environment created when a script first loads. It handles all code not inside a function. Only one GEC exists per program.

• Function Execution Context (FEC):
A completely new environment created dynamically whenever a function is invoked. Each function call gets its own distinct context.

• Eval Execution Context:
A separate environment created for code run inside an function (rarely used due to security issues).

The Two Phases of Execution Context
Every execution context is evaluated and processed in two distinct phases:

Every Execution Context goes through two distinct phases:

Phase 1: The Memory Creation Phase (Allocation)
The engine scans your code from top to bottom before executing a single line. It allocates memory space for variables and functions.

- Variables declared with var are allocated and initialized with the value undefined.

- Variables declared with let and const are allocated but remain uninitialized.

- Function declarations are allocated and stored entirely in memory.

Phase 2: The Code Execution Phase
The engine runs through the code again, line by line. It assigns the actual values to your variables and executes function calls.

The Call Stack
To keep track of all these contexts, the engine uses the Call Stack—a Last-In, First-Out (LIFO) data structure.

- The GEC is pushed to the bottom of the stack.

- When a function is called, its FEC is pushed on top of the stack.

- When the function returns, its FEC is popped off the stack, and memory is flagged for Garbage Collection.

# Hoisting Mechanics

"Hoisting" is often taught as "JavaScript moves your variables to the top of the file." This is a misconception. Code doesn't physically move. Hoisting is simply the result of the Memory Creation Phase happening before the Execution Phase.

Here is how different declarations behave when hoisted:

var num = 10; // memory allocation phase -> num(stack memory -> GEC) -> undefined(heap memory)[memory allocate and 'undefined' value assign]
let num1 = 10; // memory allocation phase -> num1(stack memeroy -> GEC) -> memroy allocation but value is not assingne in that memeory address, i.e, not initailized yet
// var -> allocation + initalization
// since initiallized with 'undefined' so in execution phase if the varible is accessed before assignment/initalization -> does not gives any error -> generates bug the the code(intiuitively wrong)
// let/conts -> allocation
// since not initalized yet hence accessing the var in execution phase before initializing it gives a error. -> intiuitively right

# The Temporal Dead Zone (TDZ):

This is the period between entering the execution context (when memory is allocated for let/const) and the actual line where the variable is initialized. Accessing the variable in this zone throws a ReferenceError. It is JavaScript's way of forcing you to write cleaner, safer code.
