const HealthCounter = require('../models-health/health-counter');

describe('HealthCounter', () => {
  let healthCounter;

  beforeEach(() => {
    healthCounter = new HealthCounter(3, 5);
  });

  // ===== INITIALIZATION TESTS =====
  describe('Initialization', () => {
    it('should initialize with default values', () => {
      const counter = new HealthCounter();
      expect(counter.getHealth()).toBe(3);
      expect(counter.getMaxHealth()).toBe(5);
    });

    it('should initialize with custom values', () => {
      const counter = new HealthCounter(4, 10);
      expect(counter.getHealth()).toBe(4);
      expect(counter.getMaxHealth()).toBe(10);
    });

    it('should throw error if initial health is negative', () => {
      expect(() => new HealthCounter(-1, 5)).toThrow('Health cannot be negative');
    });

    it('should throw error if max health is less than 1', () => {
      expect(() => new HealthCounter(1, 0)).toThrow('Max health must be at least 1');
    });

    it('should throw error if initial health exceeds max health', () => {
      expect(() => new HealthCounter(10, 5)).toThrow('Initial health cannot exceed max health');
    });
  });

  // ===== DAMAGE TESTS =====
  describe('Taking Damage', () => {
    it('should reduce health by 1 when no amount specified', () => {
      healthCounter.takeDamage();
      expect(healthCounter.getHealth()).toBe(2);
    });

    it('should reduce health by specified amount', () => {
      healthCounter.takeDamage(2);
      expect(healthCounter.getHealth()).toBe(1);
    });

    it('should not reduce health below 0', () => {
      healthCounter.takeDamage(10);
      expect(healthCounter.getHealth()).toBe(0);
    });

    it('should throw error if damage is negative', () => {
      expect(() => healthCounter.takeDamage(-1)).toThrow('Damage amount cannot be negative');
    });

    it('should add to health history', () => {
      healthCounter.takeDamage();
      const history = healthCounter.getHealthHistory();
      expect(history[history.length - 1]).toBe(2);
    });
  });

  // ===== HEALING TESTS =====
  describe('Healing', () => {
    it('should increase health by 1 when no amount specified', () => {
      healthCounter.takeDamage(2);
      healthCounter.heal();
      expect(healthCounter.getHealth()).toBe(2);
    });

    it('should increase health by specified amount', () => {
      healthCounter.takeDamage(3);
      healthCounter.heal(2);
      expect(healthCounter.getHealth()).toBe(2);
    });

    it('should not exceed max health', () => {
      healthCounter.heal(5);
      expect(healthCounter.getHealth()).toBe(5);
    });

    it('should throw error if heal amount is negative', () => {
      expect(() => healthCounter.heal(-1)).toThrow('Heal amount cannot be negative');
    });

    it('should add to health history', () => {
      healthCounter.takeDamage(2);
      healthCounter.heal(1);
      const history = healthCounter.getHealthHistory();
      expect(history[history.length - 1]).toBe(2);
    });
  });

  // ===== STATUS CHECK TESTS =====
  describe('Status Checks', () => {
    it('should return true for isAlive when health > 0', () => {
      expect(healthCounter.isAlive()).toBe(true);
    });

    it('should return false for isAlive when health = 0', () => {
      healthCounter.takeDamage(3);
      expect(healthCounter.isAlive()).toBe(false);
    });

    it('should return true for isFullHealth when health equals max', () => {
      expect(healthCounter.isFullHealth()).toBe(true);
    });

    it('should return false for isFullHealth when health < max', () => {
      healthCounter.takeDamage();
      expect(healthCounter.isFullHealth()).toBe(false);
    });
  });

  // ===== HEALTH PERCENTAGE TESTS =====
  describe('Health Percentage', () => {
    it('should return 100 when at full health', () => {
      expect(healthCounter.getHealthPercentage()).toBe(100);
    });

    it('should return 60 when health is 3 out of 5', () => {
      expect(healthCounter.getHealthPercentage()).toBe(60);
    });

    it('should return 0 when health is 0', () => {
      healthCounter.takeDamage(3);
      expect(healthCounter.getHealthPercentage()).toBe(0);
    });

    it('should return correct percentage for various health values', () => {
      healthCounter.takeDamage(1);
      expect(healthCounter.getHealthPercentage()).toBe(40);
      healthCounter.takeDamage(1);
      expect(healthCounter.getHealthPercentage()).toBe(20);
    });
  });

  // ===== RESET TESTS =====
  describe('Reset', () => {
    it('should reset health to 3 by default', () => {
      healthCounter.takeDamage(3);
      healthCounter.reset();
      expect(healthCounter.getHealth()).toBe(3);
    });

    it('should reset health to specified amount', () => {
      healthCounter.takeDamage(2);
      healthCounter.reset(5);
      expect(healthCounter.getHealth()).toBe(5);
    });

    it('should clear health history on reset', () => {
      healthCounter.takeDamage();
      const historyBefore = healthCounter.getHealthHistory().length;
      healthCounter.reset();
      const historyAfter = healthCounter.getHealthHistory().length;
      expect(historyAfter).toBe(1);
    });

    it('should throw error if reset value is out of bounds', () => {
      expect(() => healthCounter.reset(-1)).toThrow();
      expect(() => healthCounter.reset(10)).toThrow();
    });
  });

  // ===== HEALTH HISTORY TESTS =====
  describe('Health History', () => {
    it('should track initial health', () => {
      const history = healthCounter.getHealthHistory();
      expect(history[0]).toBe(3);
    });

    it('should track health changes over time', () => {
      healthCounter.takeDamage();
      healthCounter.takeDamage();
      healthCounter.heal();
      const history = healthCounter.getHealthHistory();
      expect(history).toEqual([3, 2, 1, 2]);
    });

    it('should return a copy of history array', () => {
      const history = healthCounter.getHealthHistory();
      history.push(999);
      const historyAgain = healthCounter.getHealthHistory();
      expect(historyAgain[historyAgain.length - 1]).not.toBe(999);
    });
  });

  // ===== MAX HEALTH MODIFICATION TESTS =====
  describe('Max Health Modification', () => {
    it('should set max health to new value', () => {
      healthCounter.setMaxHealth(10);
      expect(healthCounter.getMaxHealth()).toBe(10);
    });

    it('should clamp current health if it exceeds new max', () => {
      healthCounter.setMaxHealth(2);
      expect(healthCounter.getHealth()).toBe(2);
    });

    it('should throw error if max health < 1', () => {
      expect(() => healthCounter.setMaxHealth(0)).toThrow('Max health must be at least 1');
    });
  });

  // ===== INTEGRATION TESTS =====
  describe('Integration Scenarios', () => {
    it('should handle multiple ghost collisions', () => {
      // First collision
      healthCounter.takeDamage(1);
      expect(healthCounter.getHealth()).toBe(2);
      expect(healthCounter.isAlive()).toBe(true);

      // Second collision
      healthCounter.takeDamage(1);
      expect(healthCounter.getHealth()).toBe(1);
      expect(healthCounter.isAlive()).toBe(true);

      // Third collision - game over
      healthCounter.takeDamage(1);
      expect(healthCounter.getHealth()).toBe(0);
      expect(healthCounter.isAlive()).toBe(false);
    });

    it('should handle power-up healing', () => {
      healthCounter.takeDamage(2);
      expect(healthCounter.getHealth()).toBe(1);

      // Power-up heals 2 health
      healthCounter.heal(2);
      expect(healthCounter.getHealth()).toBe(3);
    });

    it('should track game progress through history', () => {
      healthCounter.takeDamage(1); // Ghost collision
      healthCounter.takeDamage(1); // Another ghost
      healthCounter.heal(1); // Power-up
      healthCounter.takeDamage(1); // Another ghost

      const history = healthCounter.getHealthHistory();
      expect(history).toEqual([3, 2, 1, 2, 1]);
    });

    it('should survive multiple damage events but die on final hit', () => {
      const maxHealth = healthCounter.getMaxHealth();
      
      // Take damage max-1 times
      for (let i = 1; i < maxHealth; i++) {
        healthCounter.takeDamage();
        expect(healthCounter.isAlive()).toBe(true);
      }

      // Final hit
      healthCounter.takeDamage();
      expect(healthCounter.isAlive()).toBe(false);
    });
  });
});