import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a key without a prefix', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    // (0.123456789 + 1).toString(26) = "1.3283f..." -> slice(2, 7) = "3283f"
    const expectedSuffix = (1.123456789).toString(26).slice(2, 7);
    const key = createNamespaceKey();

    expect(key).toBe(expectedSuffix);
    expect(key.length).toBe(5);
  });

  it('should generate a key with a prefix', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const expectedSuffix = (1.123456789).toString(26).slice(2, 7);
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);

    expect(key).toBe(`${prefix}-${expectedSuffix}`);
    expect(key.startsWith(`${prefix}-`)).toBe(true);
  });

  it('should handle empty string prefix without prepending a hyphen', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const expectedSuffix = (1.123456789).toString(26).slice(2, 7);
    const key = createNamespaceKey('');

    expect(key).toBe(expectedSuffix);
    expect(key.startsWith('-')).toBe(false);
  });

  it('should generate distinct keys across multiple calls', () => {
    const key1 = createNamespaceKey('test');
    const key2 = createNamespaceKey('test');

    expect(key1).not.toBe(key2);
  });
});
