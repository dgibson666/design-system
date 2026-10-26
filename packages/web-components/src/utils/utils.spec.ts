import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a key without prefix when no prefix argument is provided', () => {
    const key = createNamespaceKey();
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).not.toContain('-');
  });

  it('should prefix the generated key with prefix and hyphen when prefix is provided', () => {
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);
    expect(key.startsWith('cbp-button-')).toBe(true);

    const suffix = key.replace('cbp-button-', '');
    expect(suffix.length).toBe(5);
  });

  it('should generate a key without leading hyphen when prefix is empty string', () => {
    const key = createNamespaceKey('');
    expect(key.length).toBe(5);
    expect(key.startsWith('-')).toBe(false);
  });

  it('should format suffix using base-26 characters', () => {
    const key = createNamespaceKey('test');
    const suffix = key.replace('test-', '');
    expect(/^[0-9a-z]+$/.test(suffix)).toBe(true);
  });

  it('should produce deterministic key when Math.random is mocked', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);

    const expectedValue = (1 + 0.123456789).toString(26).slice(2, 7);

    const keyWithPrefix = createNamespaceKey('cbp-dropdown');
    expect(keyWithPrefix).toBe(`cbp-dropdown-${expectedValue}`);

    const keyWithoutPrefix = createNamespaceKey();
    expect(keyWithoutPrefix).toBe(expectedValue);
  });

  it('should generate unique keys across multiple invocations', () => {
    const keys = new Set<string>();
    const count = 100;
    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('cbp-item'));
    }
    expect(keys.size).toBe(count);
  });
});
