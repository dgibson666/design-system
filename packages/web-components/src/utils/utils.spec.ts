import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a namespace key with a prefix', () => {
    const prefix = 'cbp-tooltip';
    const key = createNamespaceKey(prefix);

    expect(key.startsWith('cbp-tooltip-')).toBe(true);
    expect(key.length).toBe(prefix.length + 1 + 5);
  });

  it('should generate a namespace key without a prefix when no argument is passed', () => {
    const key = createNamespaceKey();

    expect(key).not.toContain('-');
    expect(key.length).toBe(5);
  });

  it('should generate a namespace key without a prefix when undefined is passed', () => {
    const key = createNamespaceKey(undefined);

    expect(key).not.toContain('-');
    expect(key.length).toBe(5);
  });

  it('should handle an empty string prefix', () => {
    const key = createNamespaceKey('');

    expect(key.startsWith('-')).toBe(false);
    expect(key.length).toBe(5);
  });

  it('should generate unique keys across multiple calls', () => {
    const keys = new Set<string>();
    const count = 100;

    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('test'));
    }

    expect(keys.size).toBe(count);
  });

  it('should generate deterministic key suffix when Math.random is mocked', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    const expectedSuffix = (1.5).toString(26).slice(2, 7);
    const keyWithPrefix = createNamespaceKey('my-component');
    const keyWithoutPrefix = createNamespaceKey();

    expect(keyWithPrefix).toBe(`my-component-${expectedSuffix}`);
    expect(keyWithoutPrefix).toBe(expectedSuffix);
  });
});
