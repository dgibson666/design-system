import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a key with the given prefix', () => {
    const key = createNamespaceKey('cbp-button');
    expect(key.startsWith('cbp-button-')).toBe(true);
  });

  it('should generate a key matching prefix-[a-z0-9]{5} format when prefix is provided', () => {
    const prefix = 'cbp-accordion';
    const key = createNamespaceKey(prefix);
    const regex = new RegExp(`^${prefix}-[a-z0-9]{5}$`);
    expect(key).toMatch(regex);
  });

  it('should generate a key without prefix or hyphen when prefix is omitted or undefined', () => {
    const keyOmitted = createNamespaceKey();
    const keyUndefined = createNamespaceKey(undefined);

    expect(keyOmitted).toMatch(/^[a-z0-9]{5}$/);
    expect(keyUndefined).toMatch(/^[a-z0-9]{5}$/);
    expect(keyOmitted.includes('-')).toBe(false);
    expect(keyUndefined.includes('-')).toBe(false);
  });

  it('should generate a key without leading hyphen when prefix is empty string', () => {
    const key = createNamespaceKey('');
    expect(key).toMatch(/^[a-z0-9]{5}$/);
    expect(key.startsWith('-')).toBe(false);
  });

  it('should generate unique keys on repeated invocations', () => {
    const keys = new Set<string>();
    const count = 100;

    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('cbp-test'));
    }

    expect(keys.size).toBe(count);
  });

  it('should generate expected key format with mocked Math.random', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    // (1 + 0.123456789).toString(26) -> "1.3090680..."
    // .slice(2, 7) extracts 5 chars after decimal point
    const expectedSuffix = (1 + 0.123456789).toString(26).slice(2, 7);

    const keyWithPrefix = createNamespaceKey('test');
    expect(keyWithPrefix).toBe(`test-${expectedSuffix}`);

    const keyWithoutPrefix = createNamespaceKey();
    expect(keyWithoutPrefix).toBe(expectedSuffix);
  });
});
