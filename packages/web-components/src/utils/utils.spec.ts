import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  let mathRandomSpy: jest.SpyInstance;

  afterEach(() => {
    if (mathRandomSpy) {
      mathRandomSpy.mockRestore();
    }
  });

  it('should return a string formatted with prefix when a prefix is provided', () => {
    const key = createNamespaceKey('cbp-button');
    expect(key.startsWith('cbp-button-')).toBe(true);
    expect(key.length).toBe('cbp-button-'.length + 5);
  });

  it('should return only a 5-character string when prefix is omitted or undefined', () => {
    const key1 = createNamespaceKey();
    const key2 = createNamespaceKey(undefined);

    expect(key1).not.toContain('-');
    expect(key1.length).toBe(5);
    expect(key2).not.toContain('-');
    expect(key2.length).toBe(5);
  });

  it('should return only a 5-character string when prefix is an empty string', () => {
    const key = createNamespaceKey('');
    expect(key).not.toContain('-');
    expect(key.length).toBe(5);
  });

  it('should produce deterministic output when Math.random is mocked', () => {
    const mockRandomValue = 0.123456789;
    mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(mockRandomValue);

    const expectedSuffix = (mockRandomValue + 1).toString(26).slice(2, 7);

    expect(createNamespaceKey('test-prefix')).toBe(`test-prefix-${expectedSuffix}`);
    expect(createNamespaceKey()).toBe(expectedSuffix);
  });

  it('should generate distinct keys across consecutive invocations', () => {
    const key1 = createNamespaceKey('cbp-tooltip');
    const key2 = createNamespaceKey('cbp-tooltip');
    expect(key1).not.toBe(key2);
  });
});
