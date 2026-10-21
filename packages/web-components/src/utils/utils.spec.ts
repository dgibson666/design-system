import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  it('should generate a key with the given prefix', () => {
    const key = createNamespaceKey('cbp-tooltip');
    expect(key).toMatch(/^cbp-tooltip-[a-z0-9]{5}$/);
  });

  it('should generate keys for various component prefixes', () => {
    const buttonKey = createNamespaceKey('cbp-button');
    const checkboxKey = createNamespaceKey('cbp-checkbox');

    expect(buttonKey).toMatch(/^cbp-button-[a-z0-9]{5}$/);
    expect(checkboxKey).toMatch(/^cbp-checkbox-[a-z0-9]{5}$/);
  });

  it('should generate a key without a prefix when no argument is provided', () => {
    const key = createNamespaceKey();
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate a key without prefix when prefix is empty string', () => {
    const key = createNamespaceKey('');
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should produce unique keys on consecutive calls', () => {
    const key1 = createNamespaceKey('prefix');
    const key2 = createNamespaceKey('prefix');
    expect(key1).not.toEqual(key2);
  });

  it('should generate predictable output when Math.random is mocked', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const key = createNamespaceKey('test');
    const expectedRandomPart = (1.123456789).toString(26).slice(2, 7);
    expect(key).toBe(`test-${expectedRandomPart}`);
    spy.mockRestore();
  });
});
