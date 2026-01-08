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
  id: 'strategy-pattern',
  title: 'Strategy Pattern',
  difficulty: 'medium',
  category: 'Design Patterns',
  description: `<h2>In-Depth Explanation</h2>

<p>The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from clients that use it.</p>

<p>Key components of Strategy pattern:</p>
<ol>
  <li><strong>Strategy Interface</strong>: Common interface for all strategies</li>
  <li><strong>Concrete Strategies</strong>: Different algorithm implementations</li>
  <li><strong>Context</strong>: Uses a strategy and can switch between them</li>
  <li><strong>Client</strong>: Chooses which strategy to use</li>
</ol>

<p>Benefits of Strategy pattern:</p>
<ul>
  <li><strong>Open/Closed Principle</strong>: Add new strategies without modifying existing code</li>
  <li><strong>Eliminates Conditionals</strong>: Replace if/else or switch with polymorphism</li>
  <li><strong>Runtime Switching</strong>: Change algorithms at runtime</li>
  <li><strong>Isolation</strong>: Each strategy is isolated and testable</li>
  <li><strong>Reusability</strong>: Strategies can be reused across contexts</li>
</ul>

<h2>Importance</h2>

<p>Strategy pattern is essential because:</p>

<ul>
  <li><strong>Algorithm Selection</strong>: Choose algorithms based on runtime conditions</li>
  <li><strong>Clean Code</strong>: Avoids complex conditional logic</li>
  <li><strong>Testability</strong>: Each strategy can be tested independently</li>
  <li><strong>Flexibility</strong>: Easy to add new behaviors</li>
  <li><strong>Configuration</strong>: Algorithms can be configured externally</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Strategy pattern is used in many scenarios:</p>

<ul>
  <li><strong>Sorting</strong>: Different sorting algorithms (quicksort, mergesort, etc.)</li>
  <li><strong>Payment Processing</strong>: Credit card, PayPal, crypto strategies</li>
  <li><strong>Compression</strong>: ZIP, GZIP, RAR compression strategies</li>
  <li><strong>Validation</strong>: Different validation rules for different contexts</li>
  <li><strong>Shipping</strong>: Different shipping rate calculators</li>
  <li><strong>Authentication</strong>: OAuth, JWT, Basic auth strategies</li>
  <li><strong>Caching</strong>: LRU, LFU, FIFO eviction strategies</li>
</ul>

<p><strong>Challenge:</strong> Implement a PaymentProcessor that can use different payment strategies (CreditCard, PayPal, Crypto) interchangeably.</p>`,
  examples: [
    {
      input: `const processor = new PaymentProcessor(new CreditCardStrategy());
processor.pay(100);`,
      output: `"Paid $100 using Credit Card"`,
      explanation: 'PaymentProcessor uses CreditCard strategy',
    },
    {
      input: `processor.setStrategy(new PayPalStrategy());
processor.pay(50);`,
      output: `"Paid $50 using PayPal"`,
      explanation: 'Strategy can be changed at runtime',
    },
  ],
  starterCode: `// TODO: Implement the Strategy pattern for payment processing

// Payment Strategy interface (conceptual)
// Each strategy must implement: pay(amount) => string

// Credit Card payment strategy
class CreditCardStrategy {
  constructor(cardNumber, cvv) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  pay(amount) {
    // Return: "Paid $[amount] using Credit Card ending in [last 4 digits]"
  }
}

// PayPal payment strategy
class PayPalStrategy {
  constructor(email) {
    this.email = email;
  }

  pay(amount) {
    // Return: "Paid $[amount] using PayPal account [email]"
  }
}

// Cryptocurrency payment strategy
class CryptoStrategy {
  constructor(walletAddress, currency = 'BTC') {
    this.walletAddress = walletAddress;
    this.currency = currency;
  }

  pay(amount) {
    // Return: "Paid $[amount] using [currency] to wallet [first 6 chars]..."
  }
}

// TODO: Implement the PaymentProcessor context
class PaymentProcessor {
  constructor(strategy) {
    // Set initial strategy
  }

  setStrategy(strategy) {
    // Allow changing strategy at runtime
  }

  pay(amount) {
    // Delegate to current strategy
    // Throw error if no strategy set
  }
}

// Test
const creditCard = new CreditCardStrategy('4111111111111234', '123');
const paypal = new PayPalStrategy('user@example.com');
const crypto = new CryptoStrategy('0x1234567890abcdef', 'ETH');

const processor = new PaymentProcessor(creditCard);
console.log(processor.pay(100));

processor.setStrategy(paypal);
console.log(processor.pay(50));

processor.setStrategy(crypto);
console.log(processor.pay(75));`,
  solution: `// Strategy interface (TypeScript)
interface PaymentStrategy {
  pay(amount: number): string;
}

class CreditCardStrategy implements PaymentStrategy {
  private cardNumber: string;
  private cvv: string;

  constructor(cardNumber: string, cvv: string) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  pay(amount: number): string {
    const lastFour = this.cardNumber.slice(-4);
    return \`Paid $\${amount} using Credit Card ending in \${lastFour}\`;
  }
}

class PayPalStrategy implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  pay(amount: number): string {
    return \`Paid $\${amount} using PayPal account \${this.email}\`;
  }
}

class CryptoStrategy implements PaymentStrategy {
  private walletAddress: string;
  private currency: string;

  constructor(walletAddress: string, currency: string = 'BTC') {
    this.walletAddress = walletAddress;
    this.currency = currency;
  }

  pay(amount: number): string {
    const shortWallet = this.walletAddress.slice(0, 6);
    return \`Paid $\${amount} using \${this.currency} to wallet \${shortWallet}...\`;
  }
}

class PaymentProcessor {
  private strategy: PaymentStrategy | null;

  constructor(strategy?: PaymentStrategy) {
    this.strategy = strategy || null;
  }

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  pay(amount: number): string {
    if (!this.strategy) {
      throw new Error('No payment strategy set');
    }
    return this.strategy.pay(amount);
  }
}

// Usage
const creditCard = new CreditCardStrategy('4111111111111234', '123');
const paypal = new PayPalStrategy('user@example.com');
const crypto = new CryptoStrategy('0x1234567890abcdef', 'ETH');

const processor = new PaymentProcessor(creditCard);
console.log(processor.pay(100)); // "Paid $100 using Credit Card ending in 1234"

processor.setStrategy(paypal);
console.log(processor.pay(50)); // "Paid $50 using PayPal account user@example.com"

processor.setStrategy(crypto);
console.log(processor.pay(75)); // "Paid $75 using ETH to wallet 0x1234..."`,
  testCases: [
    {
      input: { strategy: 'creditCard', cardNumber: '4111111111111234', cvv: '123', amount: 100 },
      expectedOutput: 'Paid $100 using Credit Card ending in 1234',
      description: 'CreditCardStrategy formats payment with last 4 digits of card',
    },
    {
      input: { strategy: 'paypal', email: 'john@example.com', amount: 50 },
      expectedOutput: 'Paid $50 using PayPal account john@example.com',
      description: 'PayPalStrategy formats payment with email address',
    },
    {
      input: { strategy: 'crypto', wallet: '0xABCDEF123456', currency: 'ETH', amount: 200 },
      expectedOutput: 'Paid $200 using ETH to wallet 0xABCD...',
      description: 'CryptoStrategy formats payment with currency and truncated wallet',
    },
    {
      input: { strategy: 'none', amount: 100 },
      expectedOutput: { error: 'No payment strategy set' },
      description: 'PaymentProcessor throws error when no strategy is set',
    },
    {
      input: { strategy: 'switch', initialStrategy: 'creditCard', newStrategy: 'paypal', amount: 75 },
      expectedOutput: 'Paid $75 using PayPal account test@test.com',
      description: 'PaymentProcessor can switch strategies at runtime using setStrategy()',
    },
  ],
  hints: [
    'Each strategy class should implement the same pay(amount) method',
    'The PaymentProcessor stores a reference to the current strategy',
    'Use setStrategy() to change the algorithm at runtime',
    'Use string slice() to get portions of card numbers or wallet addresses',
    'Throw an error in PaymentProcessor.pay() if no strategy is set',
    'Consider using TypeScript interfaces to enforce strategy contract',
  ],
};
