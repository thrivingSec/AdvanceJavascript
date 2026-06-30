# The Scope Chain

- In JavaScript, Scope refers to the current context of code, determining the accessibility of variables.

- Global Scope: Variables declared outside any function or block are accessible everywhere.

- Function/Local Scope: Variables declared inside a function are strictly accessible only within that function.

- Block Scope: Variables declared with let or const inside a set of curly braces {} are scoped to that block. Note: var is function-scoped and completely ignores block scope.

- Lexical Environment: "Lexical" simply means where the code is physically written in your file. When the JS engine executes a function, it creates a "Lexical Environment" to store local variables.

- Outer Environment Reference: Crucially, it also attaches an Outer Environment Reference—a link to the lexical environment of its parent. If the engine can't find a variable locally, it travels up this "Scope Chain" until it hits the Global Scope.

# Closures

A Closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In plain English: a function remembers its outer variables even after the outer function has finished executing.

- Lexical scoping retention: When a function returns another function, the inner function maintains a "backpack" of the outer function's variables, preventing them from being garbage-collected.

- Data hiding and encapsulation: Because closures trap variables, we can use them to create private states that cannot be modified directly from the outside, which is vital for secure backend logic.

- IIFEs (Immediately Invoked Function Expressions): Before let and const existed, developers used IIFEs—functions that run the moment they are defined—to create instant function scopes and prevent polluting the global namespace.

- The stale closure problem: This is one of the most heavily tested concepts in JS interviews. If you use var in a loop with an asynchronous callback (like setTimeout), var leaks to the function scope. By the time the async callback runs, the loop has already finished, and all callbacks reference the final mutated value of that single var instance. Using let fixes this by binding a fresh block scope for every single iteration.
