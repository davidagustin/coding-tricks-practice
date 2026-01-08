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
  id: 'event-delegation',
  title: 'Event Delegation Pattern',
  difficulty: 'medium',
  category: 'DOM/Browser',
  description: `<h2>In-Depth Explanation</h2>

<p>Event delegation is a pattern where you attach a single event listener to a parent element to handle events for all of its children, including elements added dynamically after the page loads.</p>

<p><strong>How it works:</strong> Events in the DOM "bubble up" from the target element through its ancestors. By listening on a parent element, you can catch events from any descendant and use <code>event.target</code> to determine which child triggered the event.</p>

<p>Key concepts:</p>
<ul>
  <li><strong>Event Bubbling</strong>: Events propagate from the target element up through the DOM tree</li>
  <li><strong>event.target</strong>: The actual element that triggered the event</li>
  <li><strong>event.currentTarget</strong>: The element the listener is attached to</li>
  <li><strong>Element.matches()</strong>: Check if an element matches a CSS selector</li>
  <li><strong>Element.closest()</strong>: Find the closest ancestor matching a selector</li>
</ul>

<h2>Importance</h2>

<p>Event delegation is crucial for modern web development because:</p>

<ul>
  <li><strong>Memory Efficiency</strong>: One listener instead of many reduces memory usage</li>
  <li><strong>Dynamic Elements</strong>: Works with elements added after page load (AJAX, SPA)</li>
  <li><strong>Performance</strong>: Fewer event listeners means faster page initialization</li>
  <li><strong>Cleaner Code</strong>: Centralized event handling logic</li>
  <li><strong>Framework Foundation</strong>: React, Vue, and Angular use delegation internally</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Event delegation is used extensively in:</p>

<ul>
  <li><strong>Dynamic Lists</strong>: Handle clicks on list items that are added/removed</li>
  <li><strong>Tables</strong>: Handle row actions in large data tables</li>
  <li><strong>Forms</strong>: Validate multiple form fields with one listener</li>
  <li><strong>Menus/Dropdowns</strong>: Handle menu item clicks</li>
  <li><strong>Modals/Dialogs</strong>: Close on background click</li>
  <li><strong>Infinite Scroll</strong>: Handle clicks on dynamically loaded content</li>
  <li><strong>Drag and Drop</strong>: Track events across multiple draggable items</li>
</ul>

<p><strong>Challenge:</strong> Implement a delegation helper that attaches an event listener to a parent element and filters events based on a CSS selector.</p>`,
  examples: [
    {
      input: `delegate(document.getElementById('list'), 'click', 'li', handleClick)`,
      output: `handleClick called when any <li> inside #list is clicked`,
      explanation: 'One listener handles all list items, even those added later',
    },
    {
      input: `delegate(form, 'input', 'input[type="text"]', validate)`,
      output: `validate called for each text input change`,
      explanation: 'Filter events to only text inputs within the form',
    },
    {
      input: `delegate(table, 'click', '.delete-btn', handleDelete)`,
      output: `handleDelete called when any .delete-btn in table is clicked`,
      explanation: 'Handle delete button clicks in dynamically generated table rows',
    },
  ],
  starterCode: `// TODO: Implement event delegation helper
// Should attach listener to parent and filter by selector
function delegate(parent, eventType, selector, handler) {
  // 1. Add event listener to parent element
  // 2. In the listener, check if event.target matches the selector
  // 3. If it matches, call the handler with the event
  // 4. Consider using closest() for nested elements
  // 5. Return a cleanup function to remove the listener
}

// TODO: Implement a delegated click handler for a todo list
// Should handle: toggle complete, delete, edit
function setupTodoList(container) {
  // Use delegate() to handle:
  // - Clicking .toggle-btn toggles 'completed' class on parent li
  // - Clicking .delete-btn removes the parent li
  // - Clicking .edit-btn dispatches custom 'edit' event with todo text
}

// Test structure (simulated DOM)
const mockContainer = {
  listeners: {},
  addEventListener(type, fn) { this.listeners[type] = fn; },
  removeEventListener(type) { delete this.listeners[type]; },
  querySelector(sel) { return null; }
};

// Usage example:
// const cleanup = delegate(mockContainer, 'click', '.item', (e) => {
//   console.log('Item clicked:', e.target);
// });
// cleanup(); // removes the listener`,
  solution: `function delegate(parent, eventType, selector, handler) {
  const listener = (event) => {
    // Find the actual target that matches the selector
    // Using closest() handles clicks on nested elements
    const target = event.target.closest(selector);

    // Check if the matched element is within our parent
    if (target && parent.contains(target)) {
      // Call handler with the matched element as context
      handler.call(target, event, target);
    }
  };

  parent.addEventListener(eventType, listener);

  // Return cleanup function
  return () => parent.removeEventListener(eventType, listener);
}

function setupTodoList(container) {
  // Handle toggle complete
  const cleanupToggle = delegate(container, 'click', '.toggle-btn', (event, target) => {
    const li = target.closest('li');
    if (li) {
      li.classList.toggle('completed');
    }
  });

  // Handle delete
  const cleanupDelete = delegate(container, 'click', '.delete-btn', (event, target) => {
    const li = target.closest('li');
    if (li) {
      li.remove();
    }
  });

  // Handle edit - dispatch custom event
  const cleanupEdit = delegate(container, 'click', '.edit-btn', (event, target) => {
    const li = target.closest('li');
    if (li) {
      const text = li.querySelector('.todo-text')?.textContent || '';
      li.dispatchEvent(new CustomEvent('edit', {
        bubbles: true,
        detail: { text, element: li }
      }));
    }
  });

  // Return combined cleanup
  return () => {
    cleanupToggle();
    cleanupDelete();
    cleanupEdit();
  };
}

// Advanced: Delegation with event options
function delegateWithOptions(parent, eventType, selector, handler, options = {}) {
  const { capture = false, once = false, passive = false } = options;

  const listener = (event) => {
    const target = event.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, event, target);
      if (once) {
        parent.removeEventListener(eventType, listener, { capture });
      }
    }
  };

  parent.addEventListener(eventType, listener, { capture, passive });
  return () => parent.removeEventListener(eventType, listener, { capture });
}`,
  testCases: [
    {
      input: { parent: 'container', eventType: 'click', selector: '.item' },
      expectedOutput: true,
      description: 'delegate returns a cleanup function',
    },
    {
      input: { target: '.item', selector: '.item' },
      expectedOutput: true,
      description: 'handler is called when target matches selector',
    },
    {
      input: { target: '.other', selector: '.item' },
      expectedOutput: false,
      description: 'handler is not called when target does not match',
    },
    {
      input: { target: '.item span', selector: '.item' },
      expectedOutput: true,
      description: 'closest() finds parent matching selector for nested clicks',
    },
  ],
  hints: [
    'Use event.target.closest(selector) to handle clicks on nested elements inside the target',
    'Always verify the matched element is inside the parent with parent.contains(target)',
    'Return a cleanup function that calls removeEventListener for proper memory management',
    'Consider passing the matched element as a second argument to the handler',
  ],
};
