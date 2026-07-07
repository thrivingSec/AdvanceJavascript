/**
 * Abstraction is delivering only the essential information to the outer world masking the background
 * details.
 * It is a design and programming method that seperates interface from the implementation.
 * Eg: To drive a car, one need not to understand the mechanical and the matterial physics implemented to
 * build the car, how the engine burs the fuel to move the piston and generate torque etc..all you need to
 * know is how to use the interface like stearing, clutch, breaks, accelarator, geat etc to drive
 * successfully.
 * 
 * Abstraction using classes:
 * - Using acces modifiers to prevent direct access and using getter and setter to interact with the 
 * secure properties and methods in a controlled fashion. Classes can choose which data member are visble
 * to the ouside word and which of then are hidden.
 */


class Camera {
  #model;
  constructor(model){
    this.#model = model;
  }
  // Internal step wise implementation of clicking a picture
  #activateFlash(){
    // Step1 of clicking a picture
    // Complex implementation
    console.log("Flash is turned on!");
  }
  #adjustFocus(){
    // Step2 of clicking a picture
    // Complex implementation
    console.log("Focus adjusted!");
  }
  #processImage(){
    // Step3 of clicking a picture
    // Complex implementation
    console.log("Image proccessed and save to the local storage");
  }
  // Interface to interact with the implementation of clicking a picture
  clickPicture(){
    this.#activateFlash();
    this.#adjustFocus();
    this.#processImage();
    console.log("Using the camera model: " + this.#model + "picture clicked successfully.");
  }
}

const cam1 = new Camera("HD_Camera");
cam1.clickPicture();

/**
 * Abstract Class
 * An abstract class is a class that can not be instantiated on it own and is designed to be a super/base 
 * class. It can serve as a super class for other classes that share a common structure or behaviour.
 * Ab abstract class delivers abstration by serving as a template for the sub classes, allowing for the 
 * defination of a common interface without specifying the complete implementation details.
 * 
 * Design Strategy
 * Abstraction divides the code into two categories, interface and implemtation.
 * When creating a component, keep the interface seperate from the implementation so that even if the 
 * implementation changes the interface to ineract with the implementation reamin unchanges. hence all 
 * other objects using/dependent on the interface do not get affected and only needs recompilation.
 * Hence this makes code modular and maintainable.
 */

// JavaScript does not have a native abstract keyword. One can mimic this behavior in JavaScript by throwing errors inside the constructor and placeholder methods.

// Simulating an Abstract Class
class Vehicle {
  constructor(){
    if(this.constructor === Vehicle){
      throw new Error("Abstract classes can not be instanciated.")
    }
  }
  startEngine(){
    // Left empty, to be implemeted withing the subclass
    throw new Error("Abstract method 'startEngine()' must only be implemented accessed via sub classes." )
  }
}

class Car extends Vehicle {
  #model;
  constructor(model){
    super();
    this.#model = model;
  }
  startEngine(){
    console.log(`Starting engine of the ${this.#model}`);
  }
}

class Bike extends Vehicle {
  #model;
  constructor(model){
    super();
    this.#model = model;
  }
}

const c1 = new Car("Nexa");
c1.startEngine(); // Starting engine of the Nexa
const b1 = new Bike("Hero");
b1.startEngine(); // error


