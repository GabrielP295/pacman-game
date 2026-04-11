/**
 * Health Counter System for Pacman Game
 * Manages pacman's lives/health with max and min constraints
 */

class HealthCounter {
  /**
   * Initialize the health counter with a starting amount
   * @param {number} initialHealth - Starting health value (default: 3)
   * @param {number} maxHealth - Maximum health allowed (default: 5)
   */
  constructor(initialHealth = 3, maxHealth = 5) {
  this.validateNonNegativeHealth(initialHealth);
  this.validateMinMaxHealth(maxHealth);
  this.validateInitialNotExceedsMax(initialHealth, maxHealth);

  this.health = initialHealth;
  this.maxHealth = maxHealth;
  this.healthHistory = [initialHealth];
}

validateNonNegativeHealth(initialHealth) {
  if (initialHealth < 0) {
    throw new Error('Health cannot be negative');
  }
}

validateMinMaxHealth(maxHealth) {
  if (maxHealth < 1) {
    throw new Error('Max health must be at least 1');
  }
}
  
validateInitialNotExceedsMax(initialHealth, maxHealth) {
  if (initialHealth > maxHealth) {
    throw new Error('Initial health cannot exceed max health');
  }
}

  /**
   * Reduce health by a specified amount
   * @param {number} amount - Amount to reduce (default: 1)
   * @returns {number} Remaining health
   */
  takeDamage(amount = 1) {
    if (amount < 0) {
      throw new Error('Damage amount cannot be negative');
    }

    this.health = Math.max(0, this.health - amount);
    this.healthHistory.push(this.health);
    return this.health;
  }

  /**
   * Restore health by a specified amount
   * @param {number} amount - Amount to restore (default: 1)
   * @returns {number} Current health after healing
   */
  heal(amount = 1) {
    if (amount < 0) {
      throw new Error('Heal amount cannot be negative');
    }

    this.health = Math.min(this.maxHealth, this.health + amount);
    this.healthHistory.push(this.health);
    return this.health;
  }

  /**
   * Check if pacman is alive
   * @returns {boolean} True if health > 0, false otherwise
   */
  isAlive() {
    return this.health > 0;
  }

  /**
   * Check if at full health
   * @returns {boolean} True if health equals max health
   */
  isFullHealth() {
    return this.health === this.maxHealth;
  }

  /**
   * Reset health to initial state
   * @param {number} newHealth - Health to reset to (optional)
   */
  reset(newHealth = 3) {
    if (newHealth < 0 || newHealth > this.maxHealth) {
      throw new Error(`Health must be between 0 and ${this.maxHealth}`);
    }
    this.health = newHealth;
    this.healthHistory = [newHealth];
  }

  /**
   * Get current health
   * @returns {number} Current health value
   */
  getHealth() {
    return this.health;
  }

  /**
   * Get health as a percentage
   * @returns {number} Health percentage (0-100)
   */
  getHealthPercentage() {
    return (this.health / this.maxHealth) * 100;
  }

  /**
   * Get max health
   * @returns {number} Maximum health value
   */
  getMaxHealth() {
    return this.maxHealth;
  }

  /**
   * Get health history
   * @returns {array} Array of all health values over time
   */
  getHealthHistory() {
    return [...this.healthHistory];
  }

  /**
   * Set max health (clamps current health if needed)
   * @param {number} newMax - New maximum health
   */
  setMaxHealth(newMax) {
    if (newMax < 1) {
      throw new Error('Max health must be at least 1');
    }
    this.maxHealth = newMax;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  }
}

// Export for use in Node/Jest
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HealthCounter;
}