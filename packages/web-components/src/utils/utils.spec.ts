import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  let mathRandomSpy: jest.SpyInstance;

  afterEach(() => {
    if (mathRandomSpy) {
      mathRandomSpy.mockRestore();
    }
  });

  it('should prepend the prefix followed by a hyphen when prefix is provided', () => {
    const key = createNamespaceKey('cbp-button');
    expect(key.startsWith('cbp-button-')).toBe(true);
    expect(key.length).toBe('cbp-button-'.length + 5);
  });

  it('should return only the 5-character random string when prefix is omitted', () => {
    const key = createNamespaceKey();
    expect(key).not.toContain('-');
    expect(key.length).toBe(5);
  });

  it('should return only the 5-character random string when prefix is empty', () => {
    const key = createNamespaceKey('');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate a 5-character base-26 random string suffix', () => {
    const key = createNamespaceKey('prefix');
    const suffix = key.slice('prefix-'.length);
    expect(suffix).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate unique keys on consecutive calls', () => {
    const keys = new Set(Array.from({ length: 100 }, () => createNamespaceKey('test')));
    expect(keys.size).toBe(100);
  });

  it('should generate deterministic output when Math.random is mocked', () => {
    mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const keyWithPrefix = createNamespaceKey('cbp-tooltip');
    const expectedSuffix = (0.123456789 + 1).toString(26).slice(2, 7);

    expect(keyWithPrefix).toBe(`cbp-tooltip-${expectedSuffix}`);

    const keyWithoutPrefix = createNamespaceKey();
    expect(keyWithoutPrefix).toBe(expectedSuffix);
  });
});
