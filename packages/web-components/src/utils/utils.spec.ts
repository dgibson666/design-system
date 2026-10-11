import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format namespace key with provided prefix', () => {
    const key = createNamespaceKey('cbp-button');
    expect(key).toMatch(/^cbp-button-[a-z0-9]{5}$/);
  });

  it('should format namespace key without prefix when undefined or no argument is passed', () => {
    const keyNoArg = createNamespaceKey();
    expect(keyNoArg).toMatch(/^[a-z0-9]{5}$/);

    const keyUndefined = createNamespaceKey(undefined);
    expect(keyUndefined).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should format namespace key without prefix when empty string is passed', () => {
    const keyEmpty = createNamespaceKey('');
    expect(keyEmpty).toMatch(/^[a-z0-9]{5}$/);
    expect(keyEmpty.startsWith('-')).toBe(false);
  });

  it('should produce deterministic key when Math.random is mocked', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const expectedSuffix = (0.123456789 + 1).toString(26).slice(2, 7);

    const keyWithPrefix = createNamespaceKey('cbp-tooltip');
    expect(keyWithPrefix).toBe(`cbp-tooltip-${expectedSuffix}`);

    const keyWithoutPrefix = createNamespaceKey();
    expect(keyWithoutPrefix).toBe(expectedSuffix);
  });

  it('should generate unique keys across multiple invocations', () => {
    const count = 100;
    const keys = new Set<string>();

    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('prefix'));
    }

    expect(keys.size).toBe(count);
  });
});
