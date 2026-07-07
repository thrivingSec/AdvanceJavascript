/**
 * Let say that we are creating a video game and we need a army of space robotos.
 * Each robot will have a name, energy level, funtionality to shoot
 */

// Approach one is to create a factory function that returns a robot object with required property and functionality
function createRobot(name){
  return {
    name,
    energyLevel:100,
    attack: function(){
      console.log(this.name + " fires a laser! Pew pew!");
    }
  }
}
let robto1 = createRobot("R1");
robto1.attack()
/**
 * Problem:
 * It does work, but there is a massive, hidden problem here. Imagine our game gets super popular, and
 * suddenly we have 10,000 robots running around on the screen.
 * Because of how we wrote our code, every single one of those 10,000 robots is carrying its own personal,
 * identical copy of the attack function. It's like giving 10,000 soldiers a heavy, 500-page manual on
 * "How to Shoot" to carry in their backpacks. It eats up a ton of your computer's memory, slowing the
 * game down.
 * The root cause of this problem is that JavaScript objects are completely isolated entities by default
 * When you define a function directly inside the object-creation process (like we did with attack), the
 * computer's memory allocates brand new space for that exact same logic every single time a new object is
 * born. The objects don't share anything with each other.
 */

/**
 * The Solution: Prototypes
 * Instead of putting a heavy "How to Shoot" manual in every single robot's backpack, what if we just kept
 * one single master manual in the center of the room?
 * If a robot is told to attack, it first checks its own backpack. If it doesn't know how to attack, it
 * secretly looks at the master manual in the center of the room to figure it out.
 * In JavaScript, this "shared master manual" is called a Prototype.
 * A prototype is simply a regular JavaScript object that other objects can secretly link to. If an object
 * is asked to do something it doesn't know how to do, it will ask its prototype for help.
 */

// Approach 2: Building with Prototypes
// Step1: Create the master-manual(prototype)
const robotMasterManual = {
  attack:function(){
    this.energyLevel -= 10;
    console.log(this.name + " fires a laser! Pew Pew!");
  },
  reBoost: function(){
    this.energyLevel = 100;
    console.log(this.name + " is fully charged.");  
  }
}

// Step:2 Create a robot factory funtion the links each robot object to the robot master manual prototype.
function createSmartRobot(name){
  // create a new robot object and link it to the prototype
  const newRobot = Object.create(robotMasterManual);
  
  // Hydrate the newRobot object with required properties
  newRobot.name = name;
  newRobot.energyLevel = 100;
  
  return newRobot
}

const robot2 = createSmartRobot("A1");
console.log(robot2.name); // A1
console.log(robot2.energyLevel); // 100
robot2.attack(); // A1 fires the laser! Pew Pew!

/**
 * robot2 -> createSmartRobot{name, energyLevel} -> robotMasterManual{attack, reBoost}
 * robot2.attack -> checks createSmartRobot for the attack property doesnot finds it then goes the to
 * prototypal object liked to it, grabs the attack funtion then call the function, since the function is
 * called from the createSmartRobot, "this" inside the function points to createSmartRobot{name,
 * energyLevel}
 */

/**
 * This invisible lifeline connecting the object to its manual is called the Prototype Chain. It saves
 * memory, keeps things organized, and is the absolute core of how JavaScript works. In fact, when you
 * create an array in JavaScript and use .push(), you aren't writing the push function yourself—your array
 * is just looking up the master Array prototype to find it!
 */


// How JavaScript(Engine) implements Prototype internally?
/**
 * 1. Functions as Factories(Constructor Function)
 * 2. __proto__
 * 3. Inheritance
 * 4. Class
 */

/**
 * In our previous factory, we created an object called robotMasterManual, and then we had to manually use
 * Object.create(robotMasterManual) every single time we wanted a new robot.
 * But what if we have a factory that builds hundreds of different things? Creating master manuals by
 * hand, managing them, and remembering to link them every time is tedious and error-prone. What if
 * another developer joins the team and forgets to link the manual? We'd have robots that don't know how
 * to shoot!
 * 
 * The root cause is that our object-creation process is too manual. We are treating the "factory" (the
 * function that builds the robot) and the "manual" (the prototype) as two completely separate things.
 * They aren't naturally bundled together.
 */


// Solution: Constructor Functions and .prototype
/**
 * In JavaScript funtions are not just lines of code, they are actual objects. 
 * Everytime we write a function, javascript engine creates and attaches a brand new, empty object to it
 * called prototype. 
 */

// We capitalize the funtion name to sinal it's a "Factory" (Constructor). 
function RobotFactory(name){
  this.name = name;
  this.energyLevel = 100;
}

// The JavaScript Engine automatically gives it a .prototype object.
// We place our attack function inside the prototype
RobotFactory.prototype.attack = function(){
  console.log(this.name + " fires a laser! Pew Pew!");
}

/**
 * Now we have a factory that directly holds the manual, but how do we tell the factory to create a robot
 */

let r2d2 = new RobotFactory("R2-D2");
console.log(r2d2.name); // "R2-D2"
console.log(r2d2.energyLevel); // 100
r2d2.attack() // "R2-D2 fires a lases! Pew Pew!"

/**
 * What exactly did that new keyword just do?
 * It did four invisible things step-by-step:
 * - It created a brand new, empty object {}.
 * - It pointed the this keyword inside the factory to that new empty object.
 * - Crucial step: It secretly linked the new object to RobotFactory.prototype.
 * - It returned the object so we could save it as r2d2.
 */

console.log(r2d2.prototype); // undefined

/**
 * If the link is undefined, how in the world does r2d2 know where to find the attack function? If a robot
 * doesn't have the manual, and doesn't know where the manual is, the whole system breaks!
 * 
 * The root cause of this confusion is naming. The property .prototype only exists on the factory (the
 * function). But the instance (the robot) needs a map in its backpack to find that manual. If we called
 * that map prototype as well, things would get incredibly confusing. People would accidentally overwrite
 * it when trying to add data to the robot.
 * 
 * The Solution: __proto__ (Dunder Proto)
 * JavaScript created a hidden, specialized property on the instance called __proto__ (short for
 * double-underscore prototype).
 * Think of it like this:
 * - RobotFactory.prototype is the actual, physical Master Manual sitting in the factory manager's office
 * - r2d2.__proto__ is a treasure map tucked inside R2-D2's backpack that points directly to that office.
 */

console.log(r2d2.__proto__ === RobotFactory.prototype); // true
console.log(Object.getPrototypeOf(r2d2) === RobotFactory.prototype); // true

/**
 * When you type r2d2.attack(), JavaScript says:
 * - "R2-D2, do you have attack?" -> "No."
 * - "Okay, let me read your __proto__ map."
 * - "Ah, it points to RobotFactory.prototype. Let me check there." -> "Found it!"
 * Note: Today, instead of directly using __proto__ (which is considered a bit outdated to type out
 * directly), we usually use a built-in tool called Object.getPrototypeOf(r2d2) to read the map. But the
 * underlying concept is exactly the same!
 */

/**
 * Prototypal Inheritance
 * The Problem: Expanding the Army
 * Our game is evolving. We now need a FlyingRobot. A Flying Robot is exactly like a normal Robot (it has
 * a name, battery, and can attack), but it has an extra ability: it can fly.
 * If we create a totally separate FlyingRobotFactory and rewrite the attack function for it, we are back
 * to square one! We are duplicating the "How to Shoot" manual, wasting computer memory.
 * The Root Cause
 * The root cause is that our master manuals are isolated. The FlyingRobot manual doesn't know that the
 * Robot manual exists.
 * So how can we solve this problem?
 * The Solution: The Prototype Chain
 * What if one master manual could have its own secret map (__proto__) pointing to another master manual?
 */

function FlyingRobotFactory(name){
  RobotFactory.call(this, name);
}

FlyingRobotFactory.prototype = Object.create(RobotFactory.prototype);
console.log(FlyingRobotFactory.prototype === RobotFactory.prototype);
console.log(FlyingRobotFactory.prototype.__proto__ === RobotFactory.prototype);
FlyingRobotFactory.prototype.fly = function(){
  console.log(this.name + " is flying! Wee Wee!");
}

const flyingJatt = new FlyingRobotFactory("FLying Jatt");
flyingJatt.fly() // Flying Jatt is flying! Wee Wee!
flyingJatt.attack() // Flyong Jatt fires a laser! Pew Pew!

// Time to make things Sytactically beautifull and intuitive
/**
 * Modern class Syntax
 * The Problem: Ugly, Confusing Code
 * Look at Phase 3 again. RobotFactory.call(this, name)? Object.create(RobotFactory.prototype)?
 * To developers coming from languages like Java, Python, or C++, this looked like absolute gibberish. It
 * was clunky, hard to read, and easy to mess up. People hated typing it.
 * The Root Cause
 * The root cause is that JavaScript's prototypal inheritance is incredibly powerful, but the syntax used
 * to wire it together was very mechanical and raw. It forced developers to manually plug the wires
 * together.
 * So how can we solve this problem?
 * The Solution: Syntactic Sugar (The class Keyword)
 * In 2015, JavaScript introduced the class keyword. But here is the massive, mind-blowing secret: 
 * JavaScript classes are completely fake. JavaScript did not change how it works behind the scenes. It 
 * did not get rid of prototypes, __proto__, or constructor functions. It just created a beautiful, clean 
 * "mask" that hides the ugly wiring from Phase 3. We call this "syntactic sugar"—it makes the code 
 * sweeter to write.
 */
// RobotFactory -> Constructor Function
// FlyingRobotFactory -> Constructor Function inherits properties from the RobotFactory

class Robot{
  _name;
  _battery;
  constructor(name){
    this._name = name;
    this._battery = 100;
  }
  getRobotName(){
    return this._name;
  }
  getRobotCurrentBattery(){
    return this._battery;
  }
  attack(){
    this._battery -= 10;
    console.log(this._name + " is firing laser! Pew Pew!");
  }
  reBoost(){
    if(this._battery < 50){
      this._battery = 100;
      console.log(this._name + " is completely charged.");
      return
    }
    console.log("Can charge only when the battery is lest than 50 percent.");
  }
}
// A Class is internally a constructor funtion -> which is an object -> Which has a prototype by default

let r1 = new Robot("R1");
console.log(r1.getRobotName());
console.log(r1.getRobotCurrentBattery());
r1.attack()
console.log(r1.getRobotCurrentBattery());
r1.attack()
console.log(r1.getRobotCurrentBattery());
r1.attack()
console.log(r1.getRobotCurrentBattery());
r1.attack()
console.log(r1.getRobotCurrentBattery());
r1.reBoost();
r1.attack()
console.log(r1.getRobotCurrentBattery());
r1.attack()
console.log(r1.getRobotCurrentBattery());
r1.reBoost()
console.log(r1.getRobotCurrentBattery());

class FlyingRobot extends Robot{
  #isFlying;
  constructor(name){
    super(name);
    this.#isFlying = false;
  }
  fly(){
    this.#isFlying = true
    console.log(this._name + " is Flying");
  }
  land(){
    this.#isFlying = false;
    console.log(this._name + " has landed");
  }
  isRobotFlying(){
    return this.#isFlying
  }
}

let f1 = new FlyingRobot("F1");
console.log(f1.getRobotName());
console.log(f1.getRobotCurrentBattery());
f1.attack()
console.log(f1.getRobotCurrentBattery());
f1.attack()
console.log(f1.getRobotCurrentBattery());
f1.attack()
console.log(f1.getRobotCurrentBattery());
f1.attack()
console.log(f1.getRobotCurrentBattery());
f1.reBoost();
f1.attack()
console.log(f1.getRobotCurrentBattery());
f1.attack()
console.log(f1.getRobotCurrentBattery());
f1.reBoost()
console.log(f1.getRobotCurrentBattery());
console.log(f1.isRobotFlying());
f1.fly();
console.log(f1.isRobotFlying());
f1.land();
console.log(f1.isRobotFlying());

// Final nail in the coffin
console.log(typeof Robot);
/**
 * Behind the beautiful class, constructor, extends, and super keywords, JavaScript is doing the exact 
 * same prototype linking we did by hand.
 */