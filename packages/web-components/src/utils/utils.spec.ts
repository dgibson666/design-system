import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a 5-character key when no prefix is provided', () => {
    const key = createNamespaceKey();
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
  });

  it('should generate a key prefixed with the given string and a hyphen', () => {
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);
    expect(key.startsWith('cbp-button-')).toBe(true);
    expect(key.length).toBe(prefix.length + 1 + 5);
  });

  it('should handle undefined prefix explicitly', () => {
    const key = createNamespaceKey(undefined);
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key.includes('-')).toBe(false);
  });

  it('should handle empty string prefix without adding a leading hyphen', () => {
    const key = createNamespaceKey('');
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key.includes('-')).toBe(false);
  });

  it('should handle null as prefix gracefully', () => {
    const key = createNamespaceKey(null as any);
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key.includes('-')).toBe(false);
  });

  it('should produce deterministic output when Math.random is mocked', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const expectedSuffix = (1.123456789).toString(26).slice(2, 7);

    const keyWithPrefix = createNamespaceKey('cbp-test');
    expect(keyWithPrefix).toBe(`cbp-test-${expectedSuffix}`);

    const keyWithoutPrefix = createNamespaceKey();
    expect(keyWithoutPrefix).toBe(expectedSuffix);
  });

  it('should generate distinct keys on consecutive calls', () => {
    const key1 = createNamespaceKey('cbp-item');
    const key2 = createNamespaceKey('cbp-item');
    expect(key1).not.toEqual(key2);
  });
});
