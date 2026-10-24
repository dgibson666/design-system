import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a 5-character string when called without arguments', () => {
    const key = createNamespaceKey();
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[0-9a-p]{5}$/);
  });

  it('should return a 5-character string when called with undefined', () => {
    const key = createNamespaceKey(undefined);
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[0-9a-p]{5}$/);
  });

  it('should prefix the generated key when a prefix string is provided', () => {
    const prefix = 'cbp-tooltip';
    const key = createNamespaceKey(prefix);
    expect(key.startsWith(`${prefix}-`)).toBe(true);
    const suffix = key.slice(prefix.length + 1);
    expect(suffix.length).toBe(5);
    expect(suffix).toMatch(/^[0-9a-p]{5}$/);
  });

  it('should handle an empty string prefix as no prefix', () => {
    const key = createNamespaceKey('');
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[0-9a-p]{5}$/);
  });

  it('should format correctly with various prefix strings', () => {
    expect(createNamespaceKey('cbp-button')).toMatch(/^cbp-button-[0-9a-p]{5}$/);
    expect(createNamespaceKey('custom-field-123')).toMatch(/^custom-field-123-[0-9a-p]{5}$/);
  });

  it('should generate deterministic output when Math.random is mocked', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    // (1.5).toString(26) -> "1.d000000000000..."
    // .slice(2, 7) -> "d0000"
    const expectedSuffix = (1.5).toString(26).slice(2, 7);

    expect(createNamespaceKey()).toBe(expectedSuffix);
    expect(createNamespaceKey('cbp-test')).toBe(`cbp-test-${expectedSuffix}`);
  });

  it('should produce different keys on successive calls', () => {
    const key1 = createNamespaceKey('test');
    const key2 = createNamespaceKey('test');
    // Note: while extremely unlikely to collide, Math.random could theoretically collide.
    // In normal execution, two successive calls should not be identical.
    expect(key1).not.toBe(key2);
  });
});
