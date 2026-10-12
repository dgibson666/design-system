import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a namespace key with the specified prefix', () => {
    const key = createNamespaceKey('cbp-button');
    expect(key).toMatch(/^cbp-button-[a-z0-9]{5}$/);
    expect(key.startsWith('cbp-button-')).toBe(true);
  });

  it('should generate a key without a prefix when no prefix is provided', () => {
    const key = createNamespaceKey();
    expect(key).toMatch(/^[a-z0-9]{5}$/);
    expect(key).not.toContain('-');
  });

  it('should generate a key without a prefix when an empty string prefix is provided', () => {
    const key = createNamespaceKey('');
    expect(key).toMatch(/^[a-z0-9]{5}$/);
    expect(key).not.toContain('-');
  });

  it('should generate unique keys across multiple invocations', () => {
    const keys = new Set<string>();
    const count = 100;
    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('cbp-test'));
    }
    expect(keys.size).toBe(count);
  });

  it('should produce deterministic output when Math.random is mocked', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const expectedSuffix = (1 + 0.123456789).toString(26).slice(2, 7);
    const keyWithPrefix = createNamespaceKey('cbp-tooltip');
    expect(keyWithPrefix).toBe(`cbp-tooltip-${expectedSuffix}`);

    const keyWithoutPrefix = createNamespaceKey();
    expect(keyWithoutPrefix).toBe(expectedSuffix);
  });

  it('should generate a suffix of length 5 consisting of valid base-26 characters', () => {
    const key = createNamespaceKey('prefix');
    const parts = key.split('-');
    const suffix = parts[parts.length - 1];
    expect(suffix.length).toBe(5);
    expect(suffix).toMatch(/^[0-9a-z]{5}$/);
  });
});
