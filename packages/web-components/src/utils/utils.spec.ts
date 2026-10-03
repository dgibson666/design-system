import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a key without prefix when no arguments are provided', () => {
    const key = createNamespaceKey();
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate a key without prefix when prefix is undefined', () => {
    const key = createNamespaceKey(undefined);
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate a key without prefix when prefix is an empty string', () => {
    const key = createNamespaceKey('');
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[a-z0-9]{5}$/);
    expect(key.startsWith('-')).toBe(false);
  });

  it('should prepend prefix followed by a hyphen when prefix is provided', () => {
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);
    expect(typeof key).toBe('string');
    expect(key.startsWith(`${prefix}-`)).toBe(true);
    expect(key.length).toBe(prefix.length + 1 + 5);
    expect(key).toMatch(new RegExp(`^${prefix}-[a-z0-9]{5}$`));
  });

  it('should handle various prefix string formats', () => {
    const prefixes = ['test', 'component-id', '123'];
    prefixes.forEach(prefix => {
      const key = createNamespaceKey(prefix);
      expect(key.startsWith(`${prefix}-`)).toBe(true);
      expect(key.length).toBe(prefix.length + 1 + 5);
    });
  });

  it('should produce deterministic output when Math.random is mocked', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);

    const keyWithPrefix = createNamespaceKey('my-prefix');
    expect(keyWithPrefix).toBe('my-prefix-35bmk');

    const keyWithoutPrefix = createNamespaceKey();
    expect(keyWithoutPrefix).toBe('35bmk');
  });

  it('should generate unique keys across multiple invocations', () => {
    const keysCount = 100;
    const generatedKeys = new Set<string>();

    for (let i = 0; i < keysCount; i++) {
      generatedKeys.add(createNamespaceKey());
    }

    expect(generatedKeys.size).toBe(keysCount);
  });
});
