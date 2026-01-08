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

  // Check existing elements first
  const existing = root.querySelectorAll(selector);
  existing.forEach(el => callback(el));

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // Check if the added node itself matches
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches && node.matches(selector)) {
            callback(node);
          }
          // Check descendants of the added node
          if (node.querySelectorAll) {
            const descendants = node.querySelectorAll(selector);
            descendants.forEach(el => callback(el));
          }
        }
      });
    });
  });

  observer.observe(root, {
    childList: true,
    subtree: true,
  });

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
}

// Watch for attribute changes on a specific element
function watchAttributes(element, attributeNames, callback) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes') {
        const attributeName = mutation.attributeName;
        const oldValue = mutation.oldValue;
        const newValue = element.getAttribute(attributeName);

        callback({
          name: attributeName,
          oldValue,
          newValue,
          target: mutation.target,
        });
      }
    });
  });

  observer.observe(element, {
    attributes: true,
    attributeFilter: attributeNames,
    attributeOldValue: true,
  });

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
}

// DOM change recorder for undo/redo functionality
function createDOMRecorder(root) {
  const history = [];
  let currentIndex = -1;
  let isUndoing = false;

  const observer = new MutationObserver((mutations) => {
    if (isUndoing) return;

    // If we've undone some changes, clear the redo history
    if (currentIndex < history.length - 1) {
      history.splice(currentIndex + 1);
    }

    const record = {
      mutations: mutations.map((m) => ({
        type: m.type,
        target: m.target,
        addedNodes: Array.from(m.addedNodes).map(n => n.cloneNode(true)),
        removedNodes: Array.from(m.removedNodes).map(n => n.cloneNode(true)),
        previousSibling: m.previousSibling,
        nextSibling: m.nextSibling,
        attributeName: m.attributeName,
        oldValue: m.oldValue,
        newValue: m.type === 'attributes' ? m.target.getAttribute(m.attributeName) : null,
      })),
      timestamp: Date.now(),
    };

    history.push(record);
    currentIndex = history.length - 1;
  });

  observer.observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
  });

  return {
    undo() {
      if (currentIndex < 0) return false;

      isUndoing = true;
      const record = history[currentIndex];

      // Reverse the mutations
      record.mutations.slice().reverse().forEach((m) => {
        if (m.type === 'childList') {
          // Remove added nodes
          m.addedNodes.forEach(node => {
            const current = m.target.querySelector(\`[data-undo-id="\${node.dataset?.undoId}"]\`) ||
                           Array.from(m.target.childNodes).find(n => n.isEqualNode && n.isEqualNode(node));
            if (current) current.remove();
          });
          // Re-add removed nodes
          m.removedNodes.forEach(node => {
            if (m.nextSibling) {
              m.target.insertBefore(node, m.nextSibling);
            } else {
              m.target.appendChild(node);
            }
          });
        } else if (m.type === 'attributes') {
          if (m.oldValue === null) {
            m.target.removeAttribute(m.attributeName);
          } else {
            m.target.setAttribute(m.attributeName, m.oldValue);
          }
        } else if (m.type === 'characterData') {
          m.target.textContent = m.oldValue;
        }
      });

      currentIndex--;
      isUndoing = false;
      return true;
    },

    redo() {
      if (currentIndex >= history.length - 1) return false;

      isUndoing = true;
      currentIndex++;
      const record = history[currentIndex];

      // Replay the mutations
      record.mutations.forEach((m) => {
        if (m.type === 'childList') {
          m.removedNodes.forEach(node => node.remove?.());
          m.addedNodes.forEach(node => {
            if (m.nextSibling) {
              m.target.insertBefore(node.cloneNode(true), m.nextSibling);
            } else {
              m.target.appendChild(node.cloneNode(true));
            }
          });
        } else if (m.type === 'attributes') {
          if (m.newValue === null) {
            m.target.removeAttribute(m.attributeName);
          } else {
            m.target.setAttribute(m.attributeName, m.newValue);
          }
        }
      });

      isUndoing = false;
      return true;
    },

    canUndo() {
      return currentIndex >= 0;
    },

    canRedo() {
      return currentIndex < history.length - 1;
    },

    getHistory() {
      return [...history];
    },

    disconnect() {
      observer.disconnect();
    },
  };
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
  testCases: [
    {
      input: { selector: '.dynamic-widget', action: 'add-element' },
      expectedOutput: 'callback called with new element',
      description: 'watchForElement calls callback when matching element is added',
    },
    {
      input: { selector: '.widget', action: 'add-nested-element' },
      expectedOutput: 'callback called for descendants of added nodes',
      description: 'watchForElement checks descendants of added nodes',
    },
    {
      input: { element: 'div', attributeNames: ['class', 'disabled'] },
      expectedOutput: { name: 'class', oldValue: 'old', newValue: 'new' },
      description: 'watchAttributes tracks attribute changes with old and new values',
    },
    {
      input: { action: 'undo' },
      expectedOutput: 'mutation reversed',
      description: 'createDOMRecorder undo() reverses the last DOM change',
    },
    {
      input: { action: 'redo' },
      expectedOutput: 'mutation replayed',
      description: 'createDOMRecorder redo() replays an undone change',
    },
    {
      input: { action: 'disconnect' },
      expectedOutput: 'observer stopped',
      description: 'cleanup/disconnect stops observing DOM changes',
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
