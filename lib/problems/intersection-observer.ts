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
  id: 'intersection-observer',
  title: 'IntersectionObserver for Lazy Loading',
  difficulty: 'medium',
  category: 'DOM/Browser',
  description: `<h2>In-Depth Explanation</h2>

<p>The IntersectionObserver API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or the viewport. It's far more performant than scroll event listeners.</p>

<p><strong>Key Concepts:</strong></p>
<ul>
  <li><strong>Root</strong>: The element used as the viewport (null = browser viewport)</li>
  <li><strong>Root Margin</strong>: Margin around the root, can grow/shrink the intersection area</li>
  <li><strong>Threshold</strong>: Percentage of target visibility that triggers callback (0-1)</li>
  <li><strong>isIntersecting</strong>: Boolean indicating if target is intersecting</li>
  <li><strong>intersectionRatio</strong>: How much of the target is visible (0-1)</li>
</ul>

<p><strong>Advantages over scroll listeners:</strong></p>
<ul>
  <li>Runs on a separate thread - doesn't block main thread</li>
  <li>Batches callbacks efficiently</li>
  <li>No need for debouncing/throttling</li>
  <li>Works with any scrollable container, not just window</li>
</ul>

<h2>Importance</h2>

<p>IntersectionObserver is essential for modern web performance:</p>

<ul>
  <li><strong>Performance</strong>: Much more efficient than scroll event listeners</li>
  <li><strong>Core Web Vitals</strong>: Crucial for Largest Contentful Paint (LCP) optimization</li>
  <li><strong>Battery Life</strong>: Reduces CPU usage on mobile devices</li>
  <li><strong>Native Support</strong>: Built into browsers, no library needed</li>
  <li><strong>Accuracy</strong>: Precise visibility calculations without manual math</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>IntersectionObserver is used for:</p>

<ul>
  <li><strong>Lazy Loading Images</strong>: Load images only when they're about to be visible</li>
  <li><strong>Infinite Scroll</strong>: Detect when user reaches end of content</li>
  <li><strong>Analytics</strong>: Track which content users actually see</li>
  <li><strong>Animations</strong>: Trigger animations when elements enter viewport</li>
  <li><strong>Video Autoplay</strong>: Play/pause videos based on visibility</li>
  <li><strong>Sticky Headers</strong>: Detect when to show/hide sticky navigation</li>
  <li><strong>Ad Viewability</strong>: Track when ads are actually viewed</li>
</ul>

<p><strong>Challenge:</strong> Implement a lazy loading system using IntersectionObserver that loads images when they enter the viewport.</p>`,
  examples: [
    {
      input: `lazyLoad('.lazy-img', { rootMargin: '100px' })`,
      output: `Images load 100px before entering viewport`,
      explanation: 'Preloads images slightly before they become visible for smoother UX',
    },
    {
      input: `<img data-src="photo.jpg" class="lazy-img">`,
      output: `<img src="photo.jpg" class="lazy-img loaded">`,
      explanation: 'data-src is moved to src when image enters viewport',
    },
    {
      input: `observeVisibility(element, { threshold: 0.5 }, callback)`,
      output: `callback fires when 50% of element is visible`,
      explanation: 'Threshold controls how much visibility triggers the callback',
    },
  ],
  starterCode: `// TODO: Implement lazy loading with IntersectionObserver
// Should observe elements and load images when visible
function lazyLoad(selector, options = {}) {
  // 1. Select all elements matching the selector
  // 2. Create IntersectionObserver with callback
  // 3. In callback, check if entry.isIntersecting
  // 4. If intersecting, copy data-src to src
  // 5. Unobserve element after loading
  // 6. Return cleanup function
}

// TODO: Implement infinite scroll detection
// Should call loadMore when sentinel enters viewport
function setupInfiniteScroll(sentinelSelector, loadMore, options = {}) {
  // 1. Find the sentinel element (usually at bottom of list)
  // 2. Create observer that triggers loadMore
  // 3. Handle loading state to prevent multiple calls
  // 4. Return cleanup function
}

// TODO: Implement visibility tracker for analytics
// Should track how long elements are visible
function trackVisibility(selector, onVisibilityChange) {
  // 1. Track when elements enter/exit viewport
  // 2. Calculate time spent visible
  // 3. Call onVisibilityChange with element and duration
}

// Test (simulated - IntersectionObserver doesn't exist in Node)
const mockObserver = {
  observe: (el) => console.log('Observing:', el),
  unobserve: (el) => console.log('Unobserving:', el),
  disconnect: () => console.log('Disconnected')
};

// Usage example:
// const cleanup = lazyLoad('.lazy-img', { rootMargin: '50px' });
// cleanup(); // stops observing all images`,
  solution: `// Lazy loading with IntersectionObserver
function lazyLoad(selector, options = {}) {
  const elements = document.querySelectorAll(selector);

  const observerOptions = {
    root: options.root || null,
    rootMargin: options.rootMargin || '0px',
    threshold: options.threshold || 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Handle images with data-src
        if (element.dataset.src) {
          element.src = element.dataset.src;
          delete element.dataset.src;
        }

        // Handle background images with data-bg
        if (element.dataset.bg) {
          element.style.backgroundImage = \`url(\${element.dataset.bg})\`;
          delete element.dataset.bg;
        }

        // Add loaded class for styling/animations
        element.classList.add('loaded');

        // Stop observing this element
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe all elements
  elements.forEach((el) => observer.observe(el));

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
}

// Infinite scroll detection
function setupInfiniteScroll(sentinelSelector, loadMore, options = {}) {
  const sentinel = document.querySelector(sentinelSelector);
  if (!sentinel) return () => {};

  let isLoading = false;

  const observerOptions = {
    root: options.root || null,
    rootMargin: options.rootMargin || '100px',
    threshold: options.threshold || 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoading) {
        isLoading = true;

        // Call loadMore and wait for it to complete
        Promise.resolve(loadMore()).finally(() => {
          isLoading = false;
        });
      }
    });
  }, observerOptions);

  observer.observe(sentinel);

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
}

// Visibility tracker for analytics
function trackVisibility(selector, onVisibilityChange) {
  const elements = document.querySelectorAll(selector);
  const visibilityData = new Map();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;
      const data = visibilityData.get(element) || { totalTime: 0, lastEnter: null };

      if (entry.isIntersecting) {
        // Element entered viewport
        data.lastEnter = Date.now();
        visibilityData.set(element, data);
        onVisibilityChange({
          element,
          isVisible: true,
          intersectionRatio: entry.intersectionRatio,
          totalTimeVisible: data.totalTime,
        });
      } else if (data.lastEnter) {
        // Element left viewport
        const duration = Date.now() - data.lastEnter;
        data.totalTime += duration;
        data.lastEnter = null;
        visibilityData.set(element, data);
        onVisibilityChange({
          element,
          isVisible: false,
          intersectionRatio: 0,
          totalTimeVisible: data.totalTime,
          lastViewDuration: duration,
        });
      }
    });
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

  elements.forEach((el) => {
    visibilityData.set(el, { totalTime: 0, lastEnter: null });
    observer.observe(el);
  });

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
}

// Test (simulated - IntersectionObserver doesn't exist in Node)
const mockObserver = {
  observe: (el) => console.log('Observing:', el),
  unobserve: (el) => console.log('Unobserving:', el),
  disconnect: () => console.log('Disconnected')
};

// Usage example:
// const cleanup = lazyLoad('.lazy-img', { rootMargin: '50px' });
// cleanup(); // stops observing all images`,
  testCases: [
    {
      input: { selector: '.lazy-img', options: { rootMargin: '100px' } },
      expectedOutput: 'images preload 100px before viewport',
      description: 'lazyLoad preloads images before they enter viewport',
    },
    {
      input: { element: 'img[data-src]', action: 'intersect' },
      expectedOutput: 'data-src copied to src, element unobserved',
      description: 'lazyLoad copies data-src to src when element intersects',
    },
    {
      input: { sentinel: '.sentinel', action: 'intersect' },
      expectedOutput: 'loadMore() called',
      description: 'setupInfiniteScroll calls loadMore when sentinel is visible',
    },
    {
      input: { action: 'visibility-enter' },
      expectedOutput: { isVisible: true, intersectionRatio: 1 },
      description: 'trackVisibility reports when element enters viewport',
    },
    {
      input: { action: 'visibility-exit' },
      expectedOutput: { isVisible: false, lastViewDuration: 'number' },
      description: 'trackVisibility reports duration when element exits viewport',
    },
  ],
  hints: [
    'Use entry.isIntersecting to check if element is in viewport',
    'Always unobserve elements after loading to prevent memory leaks',
    'Use rootMargin to start loading before elements are visible for smoother UX',
    'Return a cleanup function that calls observer.disconnect()',
    'Use threshold array [0, 0.5, 1] to track partial visibility',
  ],
};
