/**
 * Encapsulation bind data and methods together inside a capsule called class.
 * Augmented meaning:
 * Provides a layer of security
 * Hides internal implementation of code and data in a class
 * Exposes only necessary information to the external world
 * As we are hiding data from the external world or the outer classes, encapsulation is also known as "Data
 * Hiding".
 * The goal is to implement classes in a way that prevents unauthorized access to or modification of the
 * original content of a class from the object instance of the class. The underlying algorithm of one
 * class should not be known to another class, but the two classes can still communicate.
 */

class Student {
  #name; // private property -> to access it in the outside code we need to create a getter functionality
  #age;
  #rollNumber;
  #currentFee;
  constructor(name, age, rollNumber, currentFee){
    this.#name = name;
    this.#age = age;
    this.#rollNumber = rollNumber;
    this.#currentFee = currentFee;
  }
  
  getName(){
    console.log(`Name of the student is ${this.#name}`);
  }
  getAge(){
    return this.#age;
  }
  getRollNumber(){
    return this.#rollNumber
  }
  setRollNumber(newRollNumber){
    this.#rollNumber = newRollNumber;
  }
  studying(){
    console.log("Student is studing.");
  }
  playing(){
    console.log("Student is playing.");
  }
  sleeping(){
    console.log("Student is sleeping");
  }
  #calculateFine(n){
    return n*(0.1*this.#currentFee)
  }
  lateFine(n){
    const fine = this.#calculateFine(n);
    console.log(`Fine for ${n} months is ${fine}`);
  }
}

const student1 = new Student("Srijan", 24, 1234, 1000);
student1.getName();
student1.studying();
console.log("Current roll number: ", student1.getRollNumber());
student1.setRollNumber(1324);
console.log("Roll number updated to: ", 1324);

console.log("Udated roll number: ", student1.getRollNumber());
student1.lateFine(3);