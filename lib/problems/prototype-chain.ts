export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  starterCode: string;
  solution: string;
  testCases: Array<{
    input: unknown;
    expectedOutput: unknown;
    description?: string;
  }>;
  hints: string[];
}

export const problem: Problem = {
  id: 'prototype-chain',
  title: 'Prototype Inheritance and the Prototype Chain',
  difficulty: 'hard',
  category: 'JavaScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>JavaScript uses prototypal inheritance, where objects can inherit directly from other objects. Every object has an internal <code>[[Prototype]]</code> link (accessible via <code>__proto__</code> or <code>Object.getPrototypeOf()</code>) that points to another object.</p>

<p>Key concepts in the prototype chain:</p>
<ul>
  <li><strong>[[Prototype]]</strong>: Internal link to the prototype object</li>
  <li><strong>prototype property</strong>: A property on constructor functions that becomes [[Prototype]] of instances</li>
  <li><strong>Prototype Chain</strong>: The linked list of prototypes, ending at null</li>
  <li><strong>Property Lookup</strong>: JavaScript walks up the chain until it finds the property or reaches null</li>
  <li><strong>Object.create()</strong>: Creates objects with a specific prototype</li>
  <li><strong>Constructor Functions</strong>: Functions used with 'new' to create objects</li>
</ul>

<p>The distinction between <code>prototype</code> (property on functions) and <code>[[Prototype]]</code> (internal link on all objects) is crucial and often confusing.</p>

<h2>Importance</h2>

<p>Understanding prototypes is fundamental because:</p>

<ul>
  <li><strong>JavaScript Core</strong>: Prototypes are how JavaScript implements inheritance</li>
  <li><strong>Class Syntax</strong>: ES6 classes are syntactic sugar over prototypes</li>
  <li><strong>Built-in Methods</strong>: All array/object methods come from prototypes</li>
  <li><strong>Performance</strong>: Methods on prototype are shared, saving memory</li>
  <li><strong>Debugging</strong>: Understanding the chain helps debug 'undefined' errors</li>
  <li><strong>Library Design</strong>: Many libraries extend prototypes or use prototype patterns</li>
  <li><strong>Interview Essential</strong>: Commonly tested in advanced JavaScript interviews</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Prototype knowledge is applied in:</p>

<ul>
  <li><strong>Extending Built-ins</strong>: Adding methods to Array.prototype (carefully!)</li>
  <li><strong>Polyfills</strong>: Implementing missing methods on older browsers</li>
  <li><strong>OOP Patterns</strong>: Creating inheritance hierarchies</li>
  <li><strong>Mixins</strong>: Composing behavior from multiple sources</li>
  <li><strong>Method Borrowing</strong>: Using methods from other objects</li>
  <li><strong>Duck Typing</strong>: Checking for methods rather than types</li>
  <li><strong>Framework Internals</strong>: Understanding React components, Vue objects</li>
  <li><strong>Memory Optimization</strong>: Sharing methods across instances</li>
</ul>

<p><strong>Challenge:</strong> Implement prototype-based inheritance patterns, understand the prototype chain, and create objects with custom prototypes.</p>`,
  examples: [
    {
      input: `function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return this.name + ' speaks'; };
const dog = new Animal('Rex');
console.log(dog.speak());`,
      output: `Rex speaks`,
      explanation: 'dog inherits speak() from Animal.prototype',
    },
    {
      input: `const proto = { greet() { return 'Hello'; } };
const obj = Object.create(proto);
console.log(obj.greet());`,
      output: `Hello`,
      explanation: 'Object.create sets proto as the [[Prototype]] of obj',
    },
  ],
  starterCode: `// TODO: Create a Shape constructor function with:
// - Constructor takes 'color' parameter and stores it as this.color
// - Shape.prototype.getColor() returns the color
// - Shape.prototype.describe() returns 'A [color] shape'

function Shape(color) {
  // Store color on the instance
}

// Add getColor method to prototype


// Add describe method to prototype


// TODO: Create a Rectangle that inherits from Shape
// - Constructor takes color, width, height
// - Rectangle.prototype.getArea() returns width * height
// - Rectangle.prototype.describe() returns 'A [color] rectangle with area [area]'
// Make sure instanceof works: new Rectangle() instanceof Shape === true

function Rectangle(color, width, height) {
  // Call Shape constructor with color
  // Store width and height
}

// Set up prototype chain (Rectangle inherits from Shape)


// Add getArea method to Rectangle.prototype


// Override describe method


// TODO: Create an object using Object.create with a custom prototype
// The prototype should have a method 'greet' that returns 'Hello, ' + this.name
// Create an instance with name 'World'

const greeterProto = {
  // Add greet method
};

const greeter = null; // Use Object.create and set name property


// TODO: Implement a function that returns the prototype chain of an object as an array
// Example: getPrototypeChain([]) should return [Array.prototype, Object.prototype, null]

function getPrototypeChain(obj) {
  // Return array of prototypes in the chain
  return [];
}

// Test
const shape = new Shape('red');
console.log(shape.getColor()); // red
console.log(shape.describe()); // A red shape

const rect = new Rectangle('blue', 4, 5);
console.log(rect.getColor()); // blue (inherited)
console.log(rect.getArea()); // 20
console.log(rect.describe()); // A blue rectangle with area 20
console.log(rect instanceof Shape); // true
console.log(rect instanceof Rectangle); // true

console.log(greeter.greet()); // Hello, World

console.log(getPrototypeChain([])); // [Array.prototype, Object.prototype, null]`,
  solution: `// Shape constructor function
function Shape(color) {
  this.color = color;
}

// Add getColor method to prototype
Shape.prototype.getColor = function() {
  return this.color;
};

// Add describe method to prototype
Shape.prototype.describe = function() {
  return 'A ' + this.color + ' shape';
};

// Rectangle constructor that inherits from Shape
function Rectangle(color, width, height) {
  // Call Shape constructor with color
  Shape.call(this, color);
  // Store width and height
  this.width = width;
  this.height = height;
}

// Set up prototype chain (Rectangle inherits from Shape)
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

// Add getArea method to Rectangle.prototype
Rectangle.prototype.getArea = function() {
  return this.width * this.height;
};

// Override describe method
Rectangle.prototype.describe = function() {
  return 'A ' + this.color + ' rectangle with area ' + this.getArea();
};

// Create greeter prototype with greet method
const greeterProto = {
  greet: function() {
    return 'Hello, ' + this.name;
  }
};

// Create instance using Object.create
const greeter = Object.create(greeterProto);
greeter.name = 'World';

// Function to get prototype chain
function getPrototypeChain(obj) {
  const chain = [];
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    chain.push(proto);
    proto = Object.getPrototypeOf(proto);
  }
  chain.push(null);
  return chain;
}`,
  testCases: [
    {
      input: { type: 'shape', color: 'red' },
      expectedOutput: { getColor: 'red', describe: 'A red shape' },
      description: 'Shape constructor and prototype methods work'
    },
    {
      input: { type: 'rectangle', color: 'blue', width: 4, height: 5 },
      expectedOutput: { getColor: 'blue', getArea: 20, describe: 'A blue rectangle with area 20' },
      description: 'Rectangle inherits from Shape and has own methods'
    },
    {
      input: { type: 'instanceof', color: 'green', width: 3, height: 4 },
      expectedOutput: { isShape: true, isRectangle: true },
      description: 'instanceof works correctly with prototype chain'
    },
    {
      input: { type: 'greeter' },
      expectedOutput: 'Hello, World',
      description: 'Object.create with custom prototype works'
    },
    {
      input: { type: 'chain', value: [] },
      expectedOutput: 3,
      description: 'getPrototypeChain returns correct chain length for array'
    },
  ],
  hints: [
    'Use Shape.call(this, color) to call the parent constructor with the correct "this"',
    'Set Rectangle.prototype = Object.create(Shape.prototype) to establish inheritance',
    'Always restore the constructor property after setting up prototype inheritance',
    'Object.getPrototypeOf() returns the [[Prototype]] of an object',
    'The prototype chain ends when Object.getPrototypeOf() returns null',
    'Methods on the prototype are shared by all instances, saving memory',
  ],
};
