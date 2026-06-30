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
  console.log("Status 1:", systemStatus); // undefined
  var systemStatus = "Offline";
  console.log("Status 2:", systemStatus); // Offline
}

checkSystem();

// Problem 2: TDZ and Scope
// Will this code run successfully, or will it throw an error? Explain the mechanics of the Temporal Dead Zone in relation to the logger function.

let maxConnections = 100;

function logger() {
    console.log("Max connections allowed:", maxConnections);
    let maxConnections = 500;
}

logger(); // Reference Error

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