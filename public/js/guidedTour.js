/* Guided Tour for MCP Hub
 * Lightweight vanilla JS walkthrough that highlights key UI components.
 * Steps: filesystem demo card, demo modal, code playground, tutorials section.
 */
(function () {
  const steps = [
    {
      selector: '[data-demo="filesystem"]',
      text: 'Click here to explore how MCP interacts with your file system.'
    },
    {
      selector: '#demoModal',
      text: 'This modal provides a step-by-step story of the demo.'
    },
    {
      selector: '#playground',
      text: 'Use the live code playground to test MCP snippets.'
    },
    {
      selector: '#tutorials',
      text: 'Watch full video tutorials to deepen your understanding.'
    }
  ];

  let current = -1;
  let overlay, tooltip;

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'tour-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 9998
    });
    document.body.appendChild(overlay);

    tooltip = document.createElement('div');
    tooltip.className = 'tour-tooltip';
    Object.assign(tooltip.style, {
      position: 'fixed',
      maxWidth: '300px',
      background: '#fff',
      color: '#333',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      zIndex: 9999
    });
    document.body.appendChild(tooltip);
  }

  function showStep(index) {
    if (index >= steps.length) return endTour();
    current = index;
    const step = steps[index];
    const el = document.querySelector(step.selector);
    if (!el) return next();

    const rect = el.getBoundingClientRect();
    tooltip.textContent = step.text;
    tooltip.appendChild(createControls());
    tooltip.style.top = `${rect.bottom + 10 + window.scrollY}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function createControls() {
    const controls = document.createElement('div');
    controls.style.marginTop = '12px';
    const nextBtn = document.createElement('button');
    nextBtn.textContent = current === steps.length - 1 ? 'Done' : 'Next';
    nextBtn.style.padding = '6px 12px';
    nextBtn.style.cursor = 'pointer';
    nextBtn.onclick = next;
    controls.appendChild(nextBtn);
    return controls;
  }

  function next() {
    showStep(current + 1);
  }

  function endTour() {
    overlay.remove();
    tooltip.remove();
  }

  window.startGuidedTour = function () {
    createOverlay();
    showStep(0);
  };
})(); 