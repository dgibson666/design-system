import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  let mathRandomSpy: jest.SpyInstance;

  afterEach(() => {
    if (mathRandomSpy) {
      mathRandomSpy.mockRestore();
    }
  });

  it('should generate a string when called with no arguments', () => {
    const key = createNamespaceKey();
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).not.toContain('-');
  });

  it('should generate a string when called with undefined', () => {
    const key = createNamespaceKey(undefined);
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).not.toContain('-');
  });

  it('should generate a string with a prefix followed by a hyphen when prefix is provided', () => {
    const prefix = 'cbp-tooltip';
    const key = createNamespaceKey(prefix);
    expect(typeof key).toBe('string');
    expect(key.startsWith(`${prefix}-`)).toBe(true);
    expect(key.length).toBe(prefix.length + 1 + 5);
  });

  it('should handle empty string as prefix without adding a hyphen', () => {
    const key = createNamespaceKey('');
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key.startsWith('-')).toBe(false);
  });

  it('should generate deterministic output when Math.random is mocked', () => {
    mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.123456789);

    const key = createNamespaceKey('cbp-button');
    expect(key).toBe('cbp-button-35bmk');
  });

  it('should generate unique keys across multiple invocations', () => {
    const keys = new Set<string>();
    const count = 100;
    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('cbp-test'));
    }
    expect(keys.size).toBe(count);
  });
});
