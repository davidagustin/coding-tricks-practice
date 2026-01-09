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
  id: 'mutation-observer',
  title: 'MutationObserver for DOM Changes',
  difficulty: 'medium',
  category: 'DOM/Browser',
  description: `<h2>In-Depth Explanation</h2>

<p>MutationObserver provides a way to watch for changes being made to the DOM tree. It's designed to replace the older Mutation Events (like DOMNodeInserted) which had performance problems.</p>

<p><strong>What it can observe:</strong></p>
<ul>
  <li><strong>childList</strong>: Changes to child elements (additions/removals)</li>
  <li><strong>attributes</strong>: Changes to element attributes</li>
  <li><strong>characterData</strong>: Changes to text content</li>
  <li><strong>subtree</strong>: Observe all descendants, not just direct children</li>
  <li><strong>attributeOldValue</strong>: Record the previous attribute value</li>
  <li><strong>characterDataOldValue</strong>: Record the previous text content</li>
  <li><strong>attributeFilter</strong>: Only observe specific attributes</li>
</ul>

<p><strong>MutationRecord properties:</strong></p>
<ul>
  <li><code>type</code>: 'childList', 'attributes', or 'characterData'</li>
  <li><code>target</code>: The node that changed</li>
  <li><code>addedNodes</code>: NodeList of added nodes</li>
  <li><code>removedNodes</code>: NodeList of removed nodes</li>
  <li><code>attributeName</code>: Name of changed attribute</li>
  <li><code>oldValue</code>: Previous value (if enabled)</li>
</ul>

<h2>Importance</h2>

<p>MutationObserver is essential for:</p>

<ul>
  <li><strong>Third-party Integration</strong>: React to changes made by external scripts</li>
  <li><strong>Framework Development</strong>: Core to how reactive frameworks work</li>
  <li><strong>Browser Extensions</strong>: Monitor page changes for content scripts</li>
  <li><strong>Accessibility</strong>: Track focus and ARIA attribute changes</li>
  <li><strong>Performance</strong>: Much more efficient than polling or Mutation Events</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>MutationObserver is used for:</p>

<ul>
  <li><strong>Dynamic Content</strong>: Initialize components when new elements appear</li>
  <li><strong>Form Validation</strong>: React to dynamically added form fields</li>
  <li><strong>Ad Blocking</strong>: Detect and remove injected ad elements</li>
  <li><strong>Undo/Redo</strong>: Track DOM changes for history management</li>
  <li><strong>Live Editors</strong>: Track changes in contenteditable elements</li>
  <li><strong>Testing</strong>: Wait for async DOM updates in tests</li>
  <li><strong>Analytics</strong>: Track DOM modifications for user behavior analysis</li>
</ul>

<p><strong>Challenge:</strong> Implement utilities using MutationObserver to watch for DOM changes and react accordingly.</p>`,
  examples: [
    {
      input: `watchForElement('.dynamic-widget', initWidget)`,
      output: `initWidget called when .dynamic-widget is added to DOM`,
      explanation: 'Automatically initialize widgets that are dynamically loaded',
    },
    {
      input: `watchAttributes(element, ['class', 'disabled'], onChange)`,
      output: `onChange called with { name: 'class', oldValue, newValue }`,
      explanation: 'Track specific attribute changes on an element',
    },
    {
      input: `observeTextChanges(textNode, onTextChange)`,
      output: `onTextChange called with old and new text content`,
      explanation: 'Monitor text content changes in contenteditable or form fields',
    },
  ],
  starterCode: `// TODO: Watch for elements matching selector to be added to DOM
// Should call callback when matching elements appear
function watchForElement(selector, callback, options = {}) {
  // 1. Create MutationObserver
  // 2. Configure to watch childList and subtree
  // 3. Check addedNodes for matching elements
  // 4. Also check descendants of added nodes
  // 5. Return cleanup function
}

// TODO: Watch for attribute changes on a specific element
// Should track old and new values
function watchAttributes(element, attributeNames, callback) {
  // 1. Create observer with attributes: true
  // 2. Use attributeFilter to limit which attributes
  // 3. Enable attributeOldValue for change tracking
  // 4. Call callback with attribute name, old value, new value
}

// TODO: Create a DOM change recorder for undo/redo
// Should record changes and provide undo capability
function createDOMRecorder(root) {
  // 1. Watch all changes (childList, attributes, characterData)
  // 2. Store mutations in a history array
  // 3. Provide undo() method to reverse last change
  // 4. Provide redo() method to reapply undone change
}

// Test (simulated - MutationObserver doesn't exist in Node)
const mockObserver = {
  observe: (target, config) => console.log('Observing:', config),
  disconnect: () => console.log('Disconnected'),
  takeRecords: () => []
};

// Usage:
// const cleanup = watchForElement('.modal', (modal) => {
//   console.log('Modal added:', modal);
//   initializeModal(modal);
// });`,
  solution: `// Watch for elements matching selector to be added to DOM
function watchForElement(selector, callback, options = {}) {
  const root = options.root || document.body;

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the added node matches
            if (node.matches && node.matches(selector)) {
              callback(node);
            }
            // Check descendants of added node
            if (node.querySelectorAll) {
              const matches = node.querySelectorAll(selector);
              matches.forEach(match => callback(match));
            }
          }
        }
      }
    }
  });

  observer.observe(root, {
    childList: true,
    subtree: true
  });

  // Return cleanup function
  return () => observer.disconnect();
}

// Watch for attribute changes on a specific element
function watchAttributes(element, attributeNames, callback) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        callback({
          name: mutation.attributeName,
          oldValue: mutation.oldValue,
          newValue: element.getAttribute(mutation.attributeName)
        });
      }
    }
  });

  observer.observe(element, {
    attributes: true,
    attributeFilter: attributeNames,
    attributeOldValue: true
  });

  return () => observer.disconnect();
}

// Create a DOM change recorder for undo/redo
function createDOMRecorder(root) {
  const history = [];
  let undoneHistory = [];

  const observer = new MutationObserver((mutations) => {
    const records = mutations.map(mutation => ({
      type: mutation.type,
      target: mutation.target,
      addedNodes: [...mutation.addedNodes],
      removedNodes: [...mutation.removedNodes].map(node => ({
        node: node.cloneNode(true),
        nextSibling: mutation.nextSibling
      })),
      attributeName: mutation.attributeName,
      oldValue: mutation.oldValue,
      newValue: mutation.type === 'attributes'
        ? mutation.target.getAttribute(mutation.attributeName)
        : null
    }));

    history.push(records);
    undoneHistory = []; // Clear redo history on new change
  });

  observer.observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true
  });

  return {
    undo() {
      if (history.length === 0) return false;

      const records = history.pop();
      undoneHistory.push(records);

      // Reverse the mutations
      for (let i = records.length - 1; i >= 0; i--) {
        const record = records[i];
        if (record.type === 'childList') {
          // Remove added nodes
          record.addedNodes.forEach(node => node.remove());
          // Re-add removed nodes
          record.removedNodes.forEach(({ node, nextSibling }) => {
            record.target.insertBefore(node, nextSibling);
          });
        } else if (record.type === 'attributes') {
          if (record.oldValue === null) {
            record.target.removeAttribute(record.attributeName);
          } else {
            record.target.setAttribute(record.attributeName, record.oldValue);
          }
        }
      }
      return true;
    },

    redo() {
      if (undoneHistory.length === 0) return false;

      const records = undoneHistory.pop();
      history.push(records);

      // Re-apply the mutations
      for (const record of records) {
        if (record.type === 'childList') {
          record.removedNodes.forEach(({ node }) => node.remove());
          record.addedNodes.forEach(node => record.target.appendChild(node));
        } else if (record.type === 'attributes') {
          if (record.newValue === null) {
            record.target.removeAttribute(record.attributeName);
          } else {
            record.target.setAttribute(record.attributeName, record.newValue);
          }
        }
      }
      return true;
    },

    getHistory() {
      return history;
    },

    disconnect() {
      observer.disconnect();
    }
  };
}

// Test (simulated - MutationObserver doesn't exist in Node)
const mockObserver = {
  observe: (target, config) => console.log('Observing:', config),
  disconnect: () => console.log('Disconnected'),
  takeRecords: () => []
};

console.log('watchForElement defined:', typeof watchForElement === 'function');
console.log('watchAttributes defined:', typeof watchAttributes === 'function');
console.log('createDOMRecorder defined:', typeof createDOMRecorder === 'function');`,
  testCases: [
    {
      input: { fn: 'watchForElement', selector: '.modal' },
      expectedOutput: true,
      description: 'watchForElement returns cleanup function',
    },
    {
      input: { fn: 'watchAttributes', attributes: ['class', 'disabled'] },
      expectedOutput: true,
      description: 'watchAttributes tracks specified attributes',
    },
    {
      input: { fn: 'createDOMRecorder', operation: 'undo' },
      expectedOutput: true,
      description: 'createDOMRecorder provides undo capability',
    },
    {
      input: { fn: 'createDOMRecorder', operation: 'redo' },
      expectedOutput: true,
      description: 'createDOMRecorder provides redo capability',
    },
  ],
  hints: [
    'Use mutation.addedNodes to get newly added elements, but also check their descendants with querySelectorAll',
    'Enable attributeOldValue: true to access the previous attribute value in the callback',
    'Always call observer.disconnect() in cleanup to prevent memory leaks',
    'Use node.matches(selector) to check if an element matches a CSS selector',
    'For undo/redo, clone removed nodes before they are removed from the DOM',
  ],
};
