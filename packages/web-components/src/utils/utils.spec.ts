import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a key formatted with the provided prefix and random suffix', () => {
    const key = createNamespaceKey('cbp-button');
    expect(key).toMatch(/^cbp-button-[a-z0-9]{5}$/);
  });

  it('should generate a key without prefix or leading hyphen when prefix is omitted', () => {
    const key = createNamespaceKey();
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate a key without prefix or leading hyphen when prefix is empty string', () => {
    const key = createNamespaceKey('');
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should produce predictable output when Math.random is mocked', () => {
    const mockRandomValue = 0.5;
    jest.spyOn(Math, 'random').mockReturnValue(mockRandomValue);

    const expectedSuffix = (mockRandomValue + 1).toString(26).slice(2, 7);
    const keyWithPrefix = createNamespaceKey('cbp-modal');
    const keyWithoutPrefix = createNamespaceKey();

    expect(keyWithPrefix).toBe(`cbp-modal-${expectedSuffix}`);
    expect(keyWithoutPrefix).toBe(expectedSuffix);
  });

  it('should generate unique keys across multiple invocations', () => {
    const keys = new Set<string>();
    const count = 100;

    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('cbp-test'));
    }

    expect(keys.size).toBe(count);
  });
});
