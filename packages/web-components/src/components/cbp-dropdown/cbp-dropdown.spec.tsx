import { newSpecPage } from '@stencil/core/testing';
import { CbpDropdown } from './cbp-dropdown';
import { CbpDropdownItem } from '../cbp-dropdown-item/cbp-dropdown-item';

const getItemValue = (item: any) => item.getAttribute('value') || item.value;

describe('cbp-dropdown multi-select reordering', () => {
  it('reorders slotted multi-select dropdown items with selected options at the top', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `
        <cbp-dropdown multiple>
          <cbp-dropdown-item value="opt1">Option 1</cbp-dropdown-item>
          <cbp-dropdown-item value="opt2" selected>Option 2</cbp-dropdown-item>
          <cbp-dropdown-item value="opt3">Option 3</cbp-dropdown-item>
        </cbp-dropdown>
      `,
    });

    const items = Array.from(page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
    expect(getItemValue(items[0])).toBe('opt2');
    expect(getItemValue(items[1])).toBe('opt1');
    expect(getItemValue(items[2])).toBe('opt3');
  });

  it('reorders JSON multi-select dropdown items with selected options at the top', async () => {
    const jsonItems = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2', selected: true },
      { label: 'Option 3', value: 'opt3' },
    ];

    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `
        <cbp-dropdown multiple items='${JSON.stringify(jsonItems)}'></cbp-dropdown>
      `,
    });

    const items = Array.from(page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
    expect(getItemValue(items[0])).toBe('opt2');
    expect(getItemValue(items[1])).toBe('opt1');
    expect(getItemValue(items[2])).toBe('opt3');
  });

  it('reorders slotted items when an item is toggled via dropdownItemClick', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `
        <cbp-dropdown multiple>
          <cbp-dropdown-item value="opt1">Option 1</cbp-dropdown-item>
          <cbp-dropdown-item value="opt2">Option 2</cbp-dropdown-item>
          <cbp-dropdown-item value="opt3">Option 3</cbp-dropdown-item>
        </cbp-dropdown>
      `,
    });

    const itemsBefore = Array.from(page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
    expect(getItemValue(itemsBefore[0])).toBe('opt1');

    // Simulate clicking on Option 3
    itemsBefore[2].dispatchEvent(new CustomEvent('dropdownItemClick', {
      detail: { host: itemsBefore[2], label: 'Option 3', value: 'opt3' },
      bubbles: true,
    }));

    await page.waitForChanges();

    const itemsAfter = Array.from(page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
    expect(getItemValue(itemsAfter[0])).toBe('opt3');
    expect(getItemValue(itemsAfter[1])).toBe('opt1');
    expect(getItemValue(itemsAfter[2])).toBe('opt2');
  });
});
