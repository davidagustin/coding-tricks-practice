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
  id: 'type-narrowing',
  title: 'Type Narrowing',
  difficulty: 'easy',
  category: 'TypeScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>Type narrowing is the process of refining a variable's type from a broader type to a more specific one within a conditional block. TypeScript's control flow analysis automatically narrows types based on type guards.</p>

<p>The three main built-in type guards are:</p>
<ul>
  <li><code>typeof</code>: Checks primitive types (string, number, boolean, undefined, object, function, symbol, bigint)</li>
  <li><code>instanceof</code>: Checks if an object is an instance of a class or constructor function</li>
  <li><code>in</code>: Checks if a property exists on an object</li>
</ul>

<p>When you use these guards in conditional statements, TypeScript automatically narrows the type within that block, allowing you to safely access properties and methods specific to the narrowed type.</p>

<h2>Importance</h2>

<p>Type narrowing is essential because:</p>

<ul>
  <li><strong>Type Safety</strong>: Ensures you only access properties that exist on the narrowed type</li>
  <li><strong>Union Type Handling</strong>: Enables safe handling of union types by narrowing to specific members</li>
  <li><strong>Runtime Checks</strong>: Adds runtime validation that TypeScript can understand</li>
  <li><strong>Error Prevention</strong>: Prevents "property does not exist" errors at compile time</li>
  <li><strong>IDE Support</strong>: Enables better autocomplete within narrowed blocks</li>
  <li><strong>Code Clarity</strong>: Makes code intent explicit and self-documenting</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Type narrowing is used extensively in real-world TypeScript:</p>

<ul>
  <li><strong>API Responses</strong>: Handling different response types (success vs error)</li>
  <li><strong>Event Handling</strong>: Narrowing event types in DOM event handlers</li>
  <li><strong>Form Validation</strong>: Processing different input types</li>
  <li><strong>State Management</strong>: Handling different state shapes in reducers</li>
  <li><strong>Error Handling</strong>: Distinguishing between Error instances and other thrown values</li>
  <li><strong>Polymorphism</strong>: Working with class hierarchies</li>
  <li><strong>Discriminated Unions</strong>: Narrowing based on discriminant properties</li>
  <li><strong>Unknown Data</strong>: Safely processing data from external sources</li>
</ul>

<p><strong>Challenge:</strong> Use typeof, instanceof, and in operators to narrow types and safely access properties.</p>`,
  examples: [
    {
      input: `function processValue(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase(); // TypeScript knows value is string
  }
  return value.toFixed(2); // TypeScript knows value is number
}`,
      output: `"HELLO" or "42.00"`,
      explanation: 'typeof narrows the union type to the specific primitive type',
    },
    {
      input: `class Dog { bark() { return 'woof'; } }
class Cat { meow() { return 'meow'; } }

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    return animal.bark(); // TypeScript knows animal is Dog
  }
  return animal.meow(); // TypeScript knows animal is Cat
}`,
      output: `"woof" or "meow"`,
      explanation: 'instanceof narrows to the specific class type',
    },
    {
      input: `interface Bird { fly(): void; }
interface Fish { swim(): void; }

function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    animal.fly(); // TypeScript knows animal is Bird
  } else {
    animal.swim(); // TypeScript knows animal is Fish
  }
}`,
      output: `Calls appropriate method`,
      explanation: 'The in operator narrows based on property existence',
    },
  ],
  starterCode: `// TODO: Use type narrowing with typeof, instanceof, and in operators

// Task 1: Use typeof to narrow string | number | boolean
function describeValue(value: string | number | boolean): string {
  // TODO: Return "String: <value>" for strings
  // TODO: Return "Number: <value>" for numbers
  // TODO: Return "Boolean: <value>" for booleans
  // Your code here
}

// Task 2: Use instanceof to narrow class types
class Car {
  drive() { return 'Driving a car'; }
}

class Bicycle {
  pedal() { return 'Pedaling a bicycle'; }
}

function useVehicle(vehicle: Car | Bicycle): string {
  // TODO: Use instanceof to call the appropriate method
  // Your code here
}

// Task 3: Use 'in' operator to narrow object types
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownPerson = Admin | Employee;

function printPersonInfo(person: UnknownPerson): string {
  // TODO: Use 'in' to check for 'privileges' or 'startDate'
  // Return "Admin: <name>, Privileges: <count>" for Admin
  // Return "Employee: <name>, Started: <date>" for Employee
  // Your code here
}

// Test your implementations
console.log(describeValue('hello'));
console.log(describeValue(42));
console.log(describeValue(true));
console.log(useVehicle(new Car()));
console.log(useVehicle(new Bicycle()));
console.log(printPersonInfo({ name: 'Alice', privileges: ['create', 'delete'] }));
console.log(printPersonInfo({ name: 'Bob', startDate: new Date('2023-01-15') }));`,
  solution: `// Task 1: Use typeof to narrow string | number | boolean
function describeValue(value: string | number | boolean): string {
  if (typeof value === 'string') {
    return \`String: \${value}\`;
  } else if (typeof value === 'number') {
    return \`Number: \${value}\`;
  } else {
    return \`Boolean: \${value}\`;
  }
}

// Task 2: Use instanceof to narrow class types
class Car {
  drive() { return 'Driving a car'; }
}

class Bicycle {
  pedal() { return 'Pedaling a bicycle'; }
}

function useVehicle(vehicle: Car | Bicycle): string {
  if (vehicle instanceof Car) {
    return vehicle.drive();
  } else {
    return vehicle.pedal();
  }
}

// Task 3: Use 'in' operator to narrow object types
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownPerson = Admin | Employee;

function printPersonInfo(person: UnknownPerson): string {
  if ('privileges' in person) {
    return \`Admin: \${person.name}, Privileges: \${person.privileges.length}\`;
  } else {
    return \`Employee: \${person.name}, Started: \${person.startDate.toISOString().split('T')[0]}\`;
  }
}

// Test your implementations
console.log(describeValue('hello'));
console.log(describeValue(42));
console.log(describeValue(true));
console.log(useVehicle(new Car()));
console.log(useVehicle(new Bicycle()));
console.log(printPersonInfo({ name: 'Alice', privileges: ['create', 'delete'] }));
console.log(printPersonInfo({ name: 'Bob', startDate: new Date('2023-01-15') }));`,
  testCases: [
    {
      input: ['hello'],
      expectedOutput: 'String: hello',
      description: 'describeValue handles string type',
    },
    {
      input: [42],
      expectedOutput: 'Number: 42',
      description: 'describeValue handles number type',
    },
    {
      input: [true],
      expectedOutput: 'Boolean: true',
      description: 'describeValue handles boolean type',
    },
    {
      input: ['Car'],
      expectedOutput: 'Driving a car',
      description: 'useVehicle calls drive() for Car',
    },
    {
      input: ['Bicycle'],
      expectedOutput: 'Pedaling a bicycle',
      description: 'useVehicle calls pedal() for Bicycle',
    },
    {
      input: [{ name: 'Alice', privileges: ['create', 'delete'] }],
      expectedOutput: 'Admin: Alice, Privileges: 2',
      description: 'printPersonInfo identifies Admin by privileges property',
    },
    {
      input: [{ name: 'Bob', startDate: '2023-01-15' }],
      expectedOutput: 'Employee: Bob, Started: 2023-01-15',
      description: 'printPersonInfo identifies Employee by startDate property',
    },
  ],
  hints: [
    'Use typeof for primitive types: typeof value === "string" narrows to string',
    'Use instanceof for class instances: value instanceof ClassName narrows to that class',
    'Use the in operator to check property existence: "propertyName" in object',
    'TypeScript automatically narrows the type after each check, so else branches have the remaining types',
    'The in operator is especially useful when narrowing between interfaces or object types',
  ],
};
