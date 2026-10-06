import { newSpecPage } from '@stencil/core/testing';
import { CbpDropdown } from './cbp-dropdown';
import { CbpDropdownItem } from '../cbp-dropdown-item/cbp-dropdown-item';

describe('cbp-dropdown multi-select reordering', () => {
  it('reorders slotted selected items to the top on initial load', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `
        <cbp-dropdown multiple name="test-dropdown">
          <cbp-dropdown-item value="opt1">Option 1</cbp-dropdown-item>
          <cbp-dropdown-item value="opt2" selected>Option 2</cbp-dropdown-item>
          <cbp-dropdown-item value="opt3">Option 3</cbp-dropdown-item>
          <cbp-dropdown-item value="opt4" selected>Option 4</cbp-dropdown-item>
        </cbp-dropdown>
      `,
    });

    const items = Array.from(page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
    const values = items.map(item => (item as HTMLCbpDropdownItemElement).value);

    expect(values).toEqual(['opt2', 'opt4', 'opt1', 'opt3']);
  });

  it('reorders JSON selected items to the top on initial load', async () => {
    const jsonItems = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2', selected: true },
      { label: 'Option 3', value: 'opt3' },
      { label: 'Option 4', value: 'opt4', selected: true },
    ];

    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `<cbp-dropdown multiple name="test-dropdown"></cbp-dropdown>`,
    });

    const dropdown = page.root as HTMLCbpDropdownElement;
    dropdown.items = jsonItems;
    await page.waitForChanges();

    const items = Array.from(page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
    const values = items.map(item => (item as HTMLCbpDropdownItemElement).value);

    expect(values).toEqual(['opt2', 'opt4', 'opt1', 'opt3']);
  });

  it('reorders slotted items when an item is selected via user click', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `
        <cbp-dropdown multiple name="test-dropdown">
          <cbp-dropdown-item value="opt1">Option 1</cbp-dropdown-item>
          <cbp-dropdown-item value="opt2">Option 2</cbp-dropdown-item>
          <cbp-dropdown-item value="opt3">Option 3</cbp-dropdown-item>
        </cbp-dropdown>
      `,
    });

    const itemsBefore = Array.from(page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)')) as HTMLCbpDropdownItemElement[];
    // Click Option 3 to select it
    const opt3 = itemsBefore.find(item => item.value === 'opt3')!;
    opt3.dispatchEvent(new CustomEvent('dropdownItemClick', { detail: { host: opt3, label: 'Option 3', value: 'opt3' }, bubbles: true }));
    await page.waitForChanges();

    const itemsAfter = Array.from(page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)')) as HTMLCbpDropdownItemElement[];
    const valuesAfter = itemsAfter.map(item => item.value);

    expect(valuesAfter).toEqual(['opt3', 'opt1', 'opt2']);
  });

  it('reorders items when deselected via user click', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `
        <cbp-dropdown multiple name="test-dropdown">
          <cbp-dropdown-item value="opt1">Option 1</cbp-dropdown-item>
          <cbp-dropdown-item value="opt2" selected>Option 2</cbp-dropdown-item>
          <cbp-dropdown-item value="opt3">Option 3</cbp-dropdown-item>
        </cbp-dropdown>
      `,
    });

    const itemsBefore = Array.from(page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)')) as HTMLCbpDropdownItemElement[];
    expect(itemsBefore.map(item => item.value)).toEqual(['opt2', 'opt1', 'opt3']);

    // Click Option 2 to deselect it
    const opt2 = itemsBefore.find(item => item.value === 'opt2')!;
    opt2.selected = true;
    opt2.dispatchEvent(new CustomEvent('dropdownItemClick', { detail: { host: opt2, label: 'Option 2', value: 'opt2' }, bubbles: true }));
    await page.waitForChanges();

    const itemsAfter = Array.from(page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)')) as HTMLCbpDropdownItemElement[];
    expect(opt2.selected).toBe(false);
    expect(itemsAfter.map(item => item.value)).toEqual(['opt2', 'opt1', 'opt3']);
  });
});
