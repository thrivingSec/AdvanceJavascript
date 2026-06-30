# Funtion Exection Context (FEC)

When you define and call a function, the JavaScript engine manages memory using two main regions: the Memory Heap (an unstructured memory pool for objects and complex data) and the Call Stack (a structured, Last-In-First-Out data structure tracking execution).

1. Defining the Function (Memory Creation Phase)
   Before any code is executed line-by-line, the JavaScript engine scans the script during the parsing and compilation phase.

   • Object Allocation in the Heap: Functions in JavaScript are actually first-class objects. The engine allocates a block of memory in the Memory Heap to store the function's source code string, its compiled bytecode, internal properties (like linking to its outer environment also know as scope chaining), and the name property.

   • Identifier Registration via Hoisting: The engine registers the function’s name (identifier) inside the Variable Environment of the current execution context (usually the Global Execution Context).

   • Reference Pairing: Instead of saving the massive function code directly in the variable list, the engine stores a memory address pointer in the Call Stack's environment that points directly to the function object's location over in the Memory Heap.

2. Calling the Function (Execution Phase)
   When the line of code that invokes the function (e.g., ) is executed, the engine shifts into high gear:

   • Pushing a New Stack Frame: The engine creates a brand new Function Execution Context (FEC). This context is packed into a chunk of memory called a "stack frame" and immediately pushed to the top of the Call Stack.

   • Allocating Local Memory: Inside this new stack frame, a local memory space is provisioned:

   • An object is initialized to collect the parameters passed in.

   • Parameters and local variables (declared with var, let, or const) are registered.

   • Primitive values (like numbers or booleans) are saved directly inside this stack frame. Any objects or nested functions declared inside this function are allocated out in the Memory Heap, with their pointers stored locally on the stack.

   • Tracking Scope and Closure: The stack frame sets up a reference to its outer scope (the Scope Chain), which dictates what variables the function has access to outside of its own borders.

3. Returning from the Function (Cleanup Phase)
   Once the engine hits a statement or reaches the closing curly brace of the function:

   • Popping the Frame: The function's execution context is immediately popped off the Call Stack. The control flow moves right back to the stack frame directly underneath it.

   • Immediate Stack Reclamation: The memory used by that specific stack frame (local variables, primitives, and parameters) is instantly wiped and reclaimed by the CPU.

   • Asynchronous Garbage Collection: The items remaining in the Memory Heap behave differently. If the local variables or the function object itself are no longer reachable by any active parts of the program, the engine's built-in Garbage Collector will mark them and automatically free that heap memory during its next background cycle.
