import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  describe('when no prefix is provided or prefix is empty', () => {
    it('should return a 5-character string when called with no arguments', () => {
      const key = createNamespaceKey();
      expect(typeof key).toBe('string');
      expect(key.length).toBe(5);
      expect(key).toMatch(/^[0-9a-z]{5}$/);
    });

    it('should return a 5-character string when called with undefined', () => {
      const key = createNamespaceKey(undefined);
      expect(typeof key).toBe('string');
      expect(key.length).toBe(5);
      expect(key).toMatch(/^[0-9a-z]{5}$/);
    });

    it('should return a 5-character string when called with an empty string', () => {
      const key = createNamespaceKey('');
      expect(typeof key).toBe('string');
      expect(key.length).toBe(5);
      expect(key).toMatch(/^[0-9a-z]{5}$/);
    });
  });

  describe('when prefix is provided', () => {
    it('should prepend the prefix and a hyphen', () => {
      const prefix = 'cbp-button';
      const key = createNamespaceKey(prefix);

      expect(key.startsWith('cbp-button-')).toBe(true);
      expect(key.length).toBe(prefix.length + 1 + 5);

      const suffix = key.slice(prefix.length + 1);
      expect(suffix).toMatch(/^[0-9a-z]{5}$/);
    });

    it('should correctly format custom prefixes containing numbers, hyphens, and underscores', () => {
      const prefix = 'test-field_123';
      const key = createNamespaceKey(prefix);

      expect(key.startsWith(`${prefix}-`)).toBe(true);
      expect(key.length).toBe(prefix.length + 1 + 5);
    });
  });

  describe('uniqueness and deterministic behavior', () => {
    it('should generate unique keys on multiple invocations', () => {
      const generatedKeys = new Set<string>();
      const iterations = 100;

      for (let i = 0; i < iterations; i++) {
        generatedKeys.add(createNamespaceKey('cbp-item'));
      }

      expect(generatedKeys.size).toBe(iterations);
    });

    it('should produce predictable keys when Math.random is mocked', () => {
      const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.123456789);

      const keyWithPrefix = createNamespaceKey('my-key');
      expect(keyWithPrefix).toBe('my-key-35bmk');

      const keyWithoutPrefix = createNamespaceKey();
      expect(keyWithoutPrefix).toBe('35bmk');

      mathRandomSpy.mockRestore();
    });
  });
});
