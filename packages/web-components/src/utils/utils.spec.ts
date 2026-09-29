import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('with prefix', () => {
    it('should generate a key formatted as {prefix}-{randomKey} when a prefix is provided', () => {
      const prefix = 'cbp-button';
      const result = createNamespaceKey(prefix);

      expect(result).toMatch(/^cbp-button-[a-z0-9]{5}$/);
      expect(result.startsWith(`${prefix}-`)).toBe(true);
      expect(result.length).toBe(prefix.length + 1 + 5);
    });

    it('should support complex multi-hyphen prefixes', () => {
      const prefix = 'cbp-table-live-region';
      const result = createNamespaceKey(prefix);

      expect(result).toMatch(/^cbp-table-live-region-[a-z0-9]{5}$/);
      expect(result.startsWith(`${prefix}-`)).toBe(true);
      expect(result.length).toBe(prefix.length + 1 + 5);
    });
  });

  describe('without prefix or falsy prefix', () => {
    it('should generate a 5-character key without prefix when called with no arguments', () => {
      const result = createNamespaceKey();

      expect(result).toMatch(/^[a-z0-9]{5}$/);
      expect(result.length).toBe(5);
    });

    it('should generate a 5-character key without prefix when passed undefined', () => {
      const result = createNamespaceKey(undefined);

      expect(result).toMatch(/^[a-z0-9]{5}$/);
      expect(result.length).toBe(5);
    });

    it('should generate a 5-character key without prefix when passed empty string', () => {
      const result = createNamespaceKey('');

      expect(result).toMatch(/^[a-z0-9]{5}$/);
      expect(result.length).toBe(5);
    });

    it('should generate a 5-character key without prefix when passed null', () => {
      const result = createNamespaceKey(null as unknown as string);

      expect(result).toMatch(/^[a-z0-9]{5}$/);
      expect(result.length).toBe(5);
    });
  });

  describe('deterministic behavior and randomness', () => {
    it('should return deterministic random suffix when Math.random is mocked', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.123456789);

      // (0.123456789 + 1).toString(26) -> "1.365313936a798"
      // .slice(2, 7) -> "36531"
      const expectedSuffix = (0.123456789 + 1).toString(26).slice(2, 7);
      const prefix = 'cbp-tooltip';
      const result = createNamespaceKey(prefix);

      expect(result).toBe(`${prefix}-${expectedSuffix}`);
    });

    it('should generate unique keys across multiple invocations', () => {
      const keys = new Set<string>();
      const count = 100;

      for (let i = 0; i < count; i++) {
        keys.add(createNamespaceKey('cbp-dropdown'));
      }

      expect(keys.size).toBe(count);
    });
  });
});
