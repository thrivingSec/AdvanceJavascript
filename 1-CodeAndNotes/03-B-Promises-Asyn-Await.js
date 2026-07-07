/**
 * To solve IoC and abysmal readablity Promises were introduced.
 * 
 * Problem Statement: We need some way of handling asynchronous process, i.e if the async ops. 
 * completed successfully or with an error and what next we need to do with the output.
 * 
 * Requirement: An object whose which is registerd in GEC stored in the heap memeory that keeps 
 * track of the execution state of asynchronous process and gives use the ability to execute code 
 * one the async process is compled or failed.
 * 
 * Promises are object representing the eventual completion or failure of asynchronous processes.
 * 
 * A promise function returns a promise object and we can attach our logic to it.
 * 
 * Promise have three state:
 * 1. Pending: Intial state, the async ops. is still running
 * 2. Resolved/Fulfiled: Async. ops. has completed successfully with any error.
 * 3. Rejected: Async. ops. has failed, error returned.
 */
function getUserAccount(userId){
  return new Promise((resolve, reject) => {
    console.log(`[Pending] checking database for the user account details where userId:${userId}`);
    setTimeout(() => {
      const user = {
        "user-123":{username:"Srijan", active:true},
        "user-132":{username:"Akshat", active:false}
      }
      const theUser = user[userId];
      if(!theUser){
        reject(new Error("User account not found"))
      }else{
        resolve(theUser)
      }
    }, 1500)
  })
}

getUserAccount("user-123")
  .then((user) => {console.log(`User found successfully: ${user.username}`)})
  .catch((error) => {console.log(error.message)});

function getUserPost(userId) {
  return getUserAccount(userId)
    .then((user) => {
      if (user.active === true) {
        return new Promise((resolve, reject) => {
          console.log(`[Pending] fetch the post of active user.`);
          setTimeout(() => {
            const post = {
              "user-123": { content: "Hell yeah!" },
              "user-132": { content: "ok" },
            };
            const userPost = post[userId];
            if (!userPost) {
              reject(new Error("Post not found"));
            } else {
              resolve(userPost);
            }
          }, 1500);
        });
      }
    })
    .catch((error) => console.log(error.message));
}


getUserPost("user-123")
 .then(post => console.log(`User post found successfully: ${post.content}`));

/**
 * async/await
 * 
 * async/await is syntactic sugar over Promises. It allows you to write asynchronous, non-blocking 
 * code that reads like synchronous, top-to-bottom code. To catch errors, you wrap the await calls 
 * in standard try/catch blocks.
 */
const fs = require("fs");

async function generateActiveUserSession(userId){
  const user = await getUserAccount(userId);
  if(!user || user.active !== true){
    console.log("User not found/ User is not active");
    return;
  }
  console.log(`Generating session for active user ${user.username}`);
  await fs.writeFile("Session.log", JSON.stringify(user), (error) => {
    if(error) throw error;
  });
  console.log(`Session for the user is created successfully.`);  
}

generateActiveUserSession("user-123");


/**
 * Concurrent promise combinator
 * In we have to run multiple asynchronous operations which are not dependent on each other , then 
 * we can run them concurrently.
 * 
 * JavScript provides tools to run async. ops. concurrently
 * 
 * 1. Promise.all: Resolves when all promises are resolved, rejects immidietly if any rejected
 * 2. Promise.allSettle: Waits for all to finish, regardless of success or failure. Returns an 
 *    array of statuses.
 * 3. Promise.race: Returns the result of first promise to finish(pass or fail).
 * 4. Promise.any: Returns the first promist to fulfill. Ingnores rejection until all rejected.
 * 
 */

async function buildDashboard(userId) {
    // BAD: Sequential execution (takes 3 seconds total)
    // const stats = await getStats(userId); // 1s
    // const friends = await getFriends(userId); // 2s

    // GOOD: Concurrent execution (takes 2 seconds total)
    try {
        const [stats, friends] = await Promise.all([
            getStats(userId), 
            getFriends(userId)
        ]);
        return { stats, friends };
    } catch (error) {
        // If getting stats fails, the entire dashboard fails immediately
        console.error("Dashboard failed to load");
    }
}