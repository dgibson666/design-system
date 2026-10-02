import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a namespace key with the provided prefix', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const expectedSuffix = (1.123456789).toString(26).slice(2, 7);
    const key = createNamespaceKey('cbp-button');
    expect(key.startsWith('cbp-button-')).toBe(true);
    expect(key).toBe(`cbp-button-${expectedSuffix}`);
  });

  it('should generate a key without a prefix when no prefix is provided', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const expectedSuffix = (1.123456789).toString(26).slice(2, 7);
    const key = createNamespaceKey();
    expect(key).toBe(expectedSuffix);
    expect(key.length).toBe(5);
  });

  it('should generate a key without prefix when prefix is an empty string', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const expectedSuffix = (1.123456789).toString(26).slice(2, 7);
    const key = createNamespaceKey('');
    expect(key).toBe(expectedSuffix);
    expect(key.length).toBe(5);
  });

  it('should correctly format keys with multi-hyphenated prefixes', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const expectedSuffix = (1.123456789).toString(26).slice(2, 7);
    const key = createNamespaceKey('cbp-table-live-region');
    expect(key).toBe(`cbp-table-live-region-${expectedSuffix}`);
  });

  it('should generate unique keys on consecutive calls', () => {
    const key1 = createNamespaceKey('cbp-test');
    const key2 = createNamespaceKey('cbp-test');
    expect(key1).not.toBe(key2);
  });

  it('should return a string of length prefix + 1 + 5 when prefix is supplied', () => {
    const prefix = 'my-custom-prefix';
    const key = createNamespaceKey(prefix);
    expect(key.length).toBe(prefix.length + 1 + 5);
  });
});
