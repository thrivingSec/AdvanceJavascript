/**
 * Similar to inheritance in real life, like child inherits characteristics from its parents.
 * Inheritance is a way of creating a class from the existing class.
 * The derived/sub/child class inherits properties and functionalities from its base/super/parent class 
 * and may also have its own set of properties and functionalities. 
 * 
 * To extent our idea of inheritance we implement genralization and specialization.
 * Class -> Vehicle ->  Generalization
 *     (is - a) 
 * Class -> Motorcycle -> Specialization
 * Class -> Car -> Specialization
 * Class -> Truck -> Specialization
 * 
 * Class -> Animal ->  Generalization
 *     (is - a) 
 * Class -> Lion -> Specialization
 * Class -> Dog -> Specialization
 * Class -> Leopard -> Specialization
 * Class -> Elephant -> Specialization
 * 
 * Class -> Employee ->  Generalization
 *     (is - a) 
 * Class -> Accountant -> Specialization
 * Class -> Developer -> Specialization
 * Class -> HR -> Specialization
 * Class -> Sales -> Specialization
 * 
 * Use inheritance when "is-a" relationship is identified b/w objects
 * Inheritance is applied when objects exhibits hierarchial relationship, signifying genralization and 
 * specialization.
 * 
 * Do not reinvent the wheel
 * Private memebers are not inherited
 * Public and Protected members are inherted
 * 
 * Types of inheritance in JavaScript
 * 1. Single inheritance
 * 2. Multi level inheritance
 * 3. hierarchial inheritance
 * 4. Multiple inheritance
 */

// Base/Super/Parent Class
class Employee{
  _name;
  _employeeId;
  
  constructor(name){
    this._name = name;
    this._employeeId = Math.floor(Math.random()*90000 + 10000)
  }

  display(){
    console.log(this._name + " has id: " + this._employeeId);
  }

}

// Single Inheritance: A single child class inherits directly from a single parent class.
class Developer extends Employee{
  #progLang;
  constructor(name, lang){
    super(name);
    this.#progLang = lang
  }
  show(){
    console.log(this.name + " is a " + this.#progLang + "developer.");
  }
}

// Multi Level Inheritance: A child class acts as a parent class for another child class, creating an extended chain of inheritance.
class Executive extends Employee{
  constructor(name){
    super(name)
  }
  makeExecDecisions(){
    console.log(this._name + " is a executive, making executive decisions.");
  }
}

class CEO extends Executive {
  constructor(name){
    super(name);
  }
  leadCompany(){
    console.log(this._name + " is the CEO, who is leading the company.");
  }
}

// Hierarchial Inheritance: A single parent class serves as the foundation for multiple distinct child classes.
class SalesManager extends Employee{
  constructor(name){
    super(name);
  }
  hostSales(){
    console.log(this._name + " is the sales manager, hanlding the sales");
  }
}

class MarketingManager extends Employee {
  constructor(name){
    super(name);
  }
  createMarketingStrategy(){
    console.log(this._name + " is making a marketing strategy.");
  }
}

// Multiple Inheritance (via Mixins)JavaScript classes cannot natively extend more than one class at a time (class Derived extends Base1, Base2 will throw a syntax error). To bypass this limitation, developers use Mixins—functions that merge the properties and methods of multiple source objects into a target class prototype.

function SalesManager(name){
  this.name = name;
}
SalesManager.prototype.hostSales = function(){
  console.log(this.name + " is the sales manager, hanlding the sales");
}

function MarketingManager(name){
  this.name = name;
}
MarketingManager.prototype.createMarketingStrategy = function(){
  console.log(this.name + " is making a maketing strategy.");
}

class BusinessDevelopmentManager {

}
Object.assign(BusinessDevelopmentManager.prototype, SalesManager.prototype, MarketingManager.prototype);
