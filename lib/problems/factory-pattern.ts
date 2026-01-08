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
  id: 'factory-pattern',
  title: 'Factory Pattern',
  difficulty: 'medium',
  category: 'Design Patterns',
  description: `<h2>In-Depth Explanation</h2>

<p>The Factory pattern is a creational design pattern that provides an interface for creating objects without specifying their exact classes. It encapsulates object creation logic, making code more modular and easier to extend.</p>

<p>Key characteristics of Factory:</p>
<ol>
  <li>Encapsulates object creation logic in one place</li>
  <li>Returns objects that implement a common interface</li>
  <li>Decouples client code from concrete implementations</li>
  <li>Makes it easy to add new types without modifying existing code</li>
</ol>

<p>Types of Factory patterns:</p>
<ul>
  <li><strong>Simple Factory</strong>: Single method that creates different types based on input</li>
  <li><strong>Factory Method</strong>: Defines an interface for creating objects, lets subclasses decide</li>
  <li><strong>Abstract Factory</strong>: Creates families of related objects</li>
</ul>

<h2>Importance</h2>

<p>The Factory pattern is crucial because:</p>

<ul>
  <li><strong>Single Responsibility</strong>: Isolates object creation code</li>
  <li><strong>Open/Closed Principle</strong>: Add new types without modifying existing code</li>
  <li><strong>Loose Coupling</strong>: Client doesn't need to know concrete classes</li>
  <li><strong>Testability</strong>: Easy to mock factories in tests</li>
  <li><strong>Flexibility</strong>: Change implementation without affecting clients</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Factory pattern is widely used:</p>

<ul>
  <li><strong>UI Components</strong>: Creating different button/input types</li>
  <li><strong>Database Connections</strong>: Creating connections to different databases</li>
  <li><strong>Payment Processing</strong>: Creating different payment handlers</li>
  <li><strong>Document Generation</strong>: PDF, Word, HTML document creators</li>
  <li><strong>Notification Systems</strong>: Email, SMS, Push notification senders</li>
  <li><strong>Game Development</strong>: Creating different enemy/character types</li>
</ul>

<p><strong>Challenge:</strong> Implement a NotificationFactory that creates different notification handlers (Email, SMS, Push) based on the type specified.</p>`,
  examples: [
    {
      input: `const emailNotifier = NotificationFactory.create('email');
emailNotifier.send('Hello!');`,
      output: `"Sending email: Hello!"`,
      explanation: 'Factory creates an email notification handler',
    },
    {
      input: `const smsNotifier = NotificationFactory.create('sms');
smsNotifier.send('Your code is 1234');`,
      output: `"Sending SMS: Your code is 1234"`,
      explanation: 'Factory creates an SMS notification handler',
    },
  ],
  starterCode: `// TODO: Implement a Notification interface and concrete implementations
// Each notification type should have a send(message) method

// Email notification handler
class EmailNotification {
  send(message) {
    // Return formatted string: "Sending email: <message>"
  }
}

// SMS notification handler
class SMSNotification {
  send(message) {
    // Return formatted string: "Sending SMS: <message>"
  }
}

// Push notification handler
class PushNotification {
  send(message) {
    // Return formatted string: "Sending push notification: <message>"
  }
}

// TODO: Implement the NotificationFactory
class NotificationFactory {
  // Static method to create notifications based on type
  static create(type) {
    // Return the appropriate notification handler based on type
    // Types: 'email', 'sms', 'push'
    // Throw error for unknown types
  }
}

// Test
const email = NotificationFactory.create('email');
console.log(email.send('Welcome to our service!'));

const sms = NotificationFactory.create('sms');
console.log(sms.send('Your verification code is 123456'));

const push = NotificationFactory.create('push');
console.log(push.send('You have a new message'));`,
  solution: `// Interface for notifications
interface Notification {
  send(message: string): string;
}

// Email notification handler
class EmailNotification implements Notification {
  send(message: string): string {
    return \`Sending email: \${message}\`;
  }
}

// SMS notification handler
class SMSNotification implements Notification {
  send(message: string): string {
    return \`Sending SMS: \${message}\`;
  }
}

// Push notification handler
class PushNotification implements Notification {
  send(message: string): string {
    return \`Sending push notification: \${message}\`;
  }
}

// NotificationFactory
class NotificationFactory {
  static create(type: string): Notification {
    switch (type.toLowerCase()) {
      case 'email':
        return new EmailNotification();
      case 'sms':
        return new SMSNotification();
      case 'push':
        return new PushNotification();
      default:
        throw new Error(\`Unknown notification type: \${type}\`);
    }
  }
}

// Test
const email = NotificationFactory.create('email');
console.log(email.send('Welcome to our service!'));

const sms = NotificationFactory.create('sms');
console.log(sms.send('Your verification code is 123456'));

const push = NotificationFactory.create('push');
console.log(push.send('You have a new message'));`,
  testCases: [
    {
      input: { type: 'email', message: 'Hello!' },
      expectedOutput: 'Sending email: Hello!',
      description: 'Email notification sends correctly',
    },
    {
      input: { type: 'sms', message: 'Your code is 1234' },
      expectedOutput: 'Sending SMS: Your code is 1234',
      description: 'SMS notification sends correctly',
    },
    {
      input: { type: 'push', message: 'New message' },
      expectedOutput: 'Sending push notification: New message',
      description: 'Push notification sends correctly',
    },
    {
      input: { type: 'EMAIL', message: 'Test' },
      expectedOutput: 'Sending email: Test',
      description: 'Factory handles case-insensitive types',
    },
    {
      input: { type: 'unknown', message: 'Test' },
      expectedOutput: 'Error: Unknown notification type: unknown',
      description: 'Factory throws error for unknown types',
    },
  ],
  hints: [
    'Use a switch statement or object literal for mapping types to classes',
    'Each notification class should implement the same interface (send method)',
    'Use template literals for formatting output strings',
    'Consider making the factory method case-insensitive with toLowerCase()',
    'Throw descriptive errors for unknown types to help debugging',
  ],
};
