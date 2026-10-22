import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a non-empty string when called without arguments', () => {
    const key = createNamespaceKey();
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[0-9a-p]{5}$/);
  });

  it('should return a 5-character key when prefix is undefined', () => {
    const key = createNamespaceKey(undefined);
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[0-9a-p]{5}$/);
  });

  it('should return a 5-character key when prefix is an empty string', () => {
    const key = createNamespaceKey('');
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[0-9a-p]{5}$/);
  });

  it('should prefix the generated key with prefix and a hyphen when prefix is provided', () => {
    const prefix = 'cbp-tooltip';
    const key = createNamespaceKey(prefix);
    expect(typeof key).toBe('string');
    expect(key.startsWith('cbp-tooltip-')).toBe(true);
    expect(key.length).toBe(prefix.length + 1 + 5);
    expect(key).toMatch(/^cbp-tooltip-[0-9a-p]{5}$/);
  });

  it('should work correctly with various custom prefixes', () => {
    const prefixes = ['cbp-button', 'cbp-checkbox', 'cbp-table-live-region', 'custom_key_123'];
    prefixes.forEach(prefix => {
      const key = createNamespaceKey(prefix);
      expect(key.startsWith(`${prefix}-`)).toBe(true);
      expect(key.length).toBe(prefix.length + 1 + 5);
      const expectedRegex = new RegExp(`^${prefix}-[0-9a-p]{5}$`);
      expect(key).toMatch(expectedRegex);
    });
  });

  it('should produce deterministic output when Math.random is mocked', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    // (0.5 + 1).toString(26) -> "1.d00000..."
    // slice(2, 7) -> "d0000"
    const expectedSuffix = (0.5 + 1).toString(26).slice(2, 7);

    const keyWithoutPrefix = createNamespaceKey();
    expect(keyWithoutPrefix).toBe(expectedSuffix);

    const keyWithPrefix = createNamespaceKey('test-prefix');
    expect(keyWithPrefix).toBe(`test-prefix-${expectedSuffix}`);
  });

  it('should generate unique keys on repeated calls', () => {
    const keys = new Set<string>();
    const count = 100;
    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('cbp-test'));
    }
    expect(keys.size).toBe(count);
  });
});
