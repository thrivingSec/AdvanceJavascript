/**
 * Object Oriented Programming enables to model the real world in the software programs.
 * A programming style that divides the code into pieces of objects that can communicate with each other.
 * An object in OOPs resembels a real world entity that has its own set of attributes and behaviours.
 * Fundamental ideal is to combine attributes and behaviours into a single unit, that will promote modularity, 
 * reusability and maintability. 
 * 
 * 
 * Object Oriented Programming is a programming paradigm that focuses on implementing real wold objects.
 * The identification of code objects similar to real life objects and structuring code using classes and 
 * objects signifies the use of OOP principle.
 * Classes and Objects are fundamental building blocks of the OOP concept.
 * A class is blueprint of a object
 * An object is instance of a class
 */

// class Student {

//   // data/properties
//   name;
//   age;
//   nos;
//   rollnumber;

//   // behaviours/funtionalities
//   studying(){
//     console.log("Student is studing");
//   }
//   sleep(){
//     console.log("Student is sleeping");
//   }
//   play(){
//     console.log("Student is playing");
//   }
// }

// const student1 = new Student() // srijan is a student
// student1.age = 24;
// student1.name = "Srijan";
// student1.nos = 5;
// student1.rollnumber = 1234;
// console.log(student1.name, student1.nos);
// student1.studying();
// student1.play();
// student1.sleep();


class Student {
  name;
  age;
  nos;
  rollnumber;
  constructor(name, age, nos, rollnumber){
    this.name = name;
    this.age = age;
    this.nos = nos;
    this.rollnumber = rollnumber;
  }

  studying(){
    console.log("Student is studing.");
  }
  sleeping(){
    console.log("Student is sleeping");
  }
  playing(){
    console.log("Student is playing");
  }
}

const student1 = new Student("Srijan", 24, 5, 1234);
console.log(student1.name, student1.age);
student1.playing();

student1.age = 25;
console.log(student1.age);
