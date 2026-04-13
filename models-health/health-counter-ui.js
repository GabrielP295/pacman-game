/**
 * Health Counter UI Renderer
 * Renders the health counter display in the DOM
 */

export class HealthCounterUI {
  /**
   * Initialize the UI renderer
   * @param {HealthCounter} healthCounter - The health counter instance
   * @param {string} containerId - ID of the container element (default: 'health-display')
   * @param {object} options - Display options
   */
  constructor(healthCounter, containerId = 'health-display', options = {}) {
    this.healthCounter = healthCounter;
    this.containerId = containerId;
    this.options = {
      style: options.style || 'hearts', // 'hearts', 'bar', 'text', or 'combined'
      color: options.color || '#FFD700', // Gold for pacman theme
      damageColor: options.damageColor || '#FF4444', // Red
      healColor: options.healColor || '#44FF44', // Green
      showLabel: options.showLabel !== false,
      animateDamage: options.animateDamage !== false,
    };

    this.initializeDOM();
  }

  /**
   * Initialize or get the container element
   */
  initializeDOM() {
    let container = document.getElementById(this.containerId);
    
    if (!container) {
      container = document.createElement('div');
      container.id = this.containerId;
      document.body.insertBefore(container, document.getElementById('game-board'));
    }

    container.className = 'health-counter-container';
    container.innerHTML = '';

    // Create label if enabled
    if (this.options.showLabel) {
      const label = document.createElement('div');
      label.className = 'health-label';
      label.textContent = 'Health';
      container.appendChild(label);
    }

    // Create display based on style
    if (this.options.style === 'hearts' || this.options.style === 'combined') {
      this.createHeartsDisplay(container);
    }
    
    if (this.options.style === 'bar' || this.options.style === 'combined') {
      this.createBarDisplay(container);
    }
    
    if (this.options.style === 'text') {
      this.createTextDisplay(container);
    }

    this.render();
  }

  /**
   * Create hearts display
   */
  createHeartsDisplay(container) {
    const heartsContainer = document.createElement('div');
    heartsContainer.id = 'health-hearts';
    heartsContainer.className = 'health-hearts-display';
    container.appendChild(heartsContainer);
  }

  /**
   * Create health bar display
   */
  createBarDisplay(container) {
    const barContainer = document.createElement('div');
    barContainer.className = 'health-bar-container';

    const barFill = document.createElement('div');
    barFill.id = 'health-bar-fill';
    barFill.className = 'health-bar-fill';

    const barBackground = document.createElement('div');
    barBackground.className = 'health-bar-background';
    barBackground.appendChild(barFill);

    barContainer.appendChild(barBackground);
    container.appendChild(barContainer);
  }

  /**
   * Create text display
   */
  createTextDisplay(container) {
    const textDisplay = document.createElement('div');
    textDisplay.id = 'health-text';
    textDisplay.className = 'health-text-display';
    container.appendChild(textDisplay);
  }

  /**
   * Render the current health state
   */
  render() {
    const currentHealth = this.healthCounter.getHealth();
    const maxHealth = this.healthCounter.getMaxHealth();
    const healthPercentage = this.healthCounter.getHealthPercentage();

    // Update hearts
    if (this.options.style === 'hearts' || this.options.style === 'combined') {
      this.updateHeartsDisplay(currentHealth, maxHealth);
    }

    // Update bar
    if (this.options.style === 'bar' || this.options.style === 'combined') {
      this.updateBarDisplay(healthPercentage);
    }

    // Update text
    if (this.options.style === 'text') {
      this.updateTextDisplay(currentHealth, maxHealth);
    }
  }

  /**
   * Update hearts display
   */
  updateHeartsDisplay(current, max) {
    const heartsContainer = document.getElementById('health-hearts');
    if (!heartsContainer) return;

    heartsContainer.innerHTML = '';

    for (let i = 0; i < max; i++) {
      const heart = document.createElement('span');
      heart.className = 'health-heart';
      heart.innerHTML = i < current ? '❤️' : '🖤';
      heart.dataset.index = i;
      heartsContainer.appendChild(heart);
    }
  }

  /**
   * Update bar display
   */
  updateBarDisplay(percentage) {
    const barFill = document.getElementById('health-bar-fill');
    if (!barFill) return;

    barFill.style.width = percentage + '%';
    
    // Change color based on health
    if (percentage > 50) {
      barFill.style.backgroundColor = this.options.color;
    } else if (percentage > 25) {
      barFill.style.backgroundColor = '#FFA500'; // Orange
    } else {
      barFill.style.backgroundColor = this.options.damageColor;
    }
  }

  /**
   * Update text display
   */
  updateTextDisplay(current, max) {
    const textDisplay = document.getElementById('health-text');
    if (!textDisplay) return;

    textDisplay.textContent = `${current} / ${max}`;
    
    // Change color based on health
    if (current > max * 0.5) {
      textDisplay.style.color = this.options.color;
    } else if (current > max * 0.25) {
      textDisplay.style.color = '#FFA500';
    } else {
      textDisplay.style.color = this.options.damageColor;
    }
  }

  /**
   * Animate damage taken
   */
  animateDamage() {
    if (!this.options.animateDamage) return;

    const container = document.getElementById(this.containerId);
    if (container) {
      container.classList.add('health-damage-animation');
      setTimeout(() => {
        container.classList.remove('health-damage-animation');
      }, 300);
    }
  }

  /**
   * Animate healing
   */
  animateHeal() {
    if (!this.options.animateDamage) return;

    const container = document.getElementById(this.containerId);
    if (container) {
      container.classList.add('health-heal-animation');
      setTimeout(() => {
        container.classList.remove('health-heal-animation');
      }, 300);
    }
  }

  /**
   * Update display after health change
   */
  update() {
    this.render();
  }

  /**
   * Get the container element
   */
  getContainer() {
    return document.getElementById(this.containerId);
  }

  /**
   * Change display style
   */
  setStyle(newStyle) {
    this.options.style = newStyle;
    this.initializeDOM();
  }
}

// Export for use in Node/Jest
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HealthCounterUI;
}