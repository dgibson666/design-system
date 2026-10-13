import { newSpecPage } from '@stencil/core/testing';
import { CbpDropdown } from './cbp-dropdown';
import { CbpDropdownItem } from '../cbp-dropdown-item/cbp-dropdown-item';
import { CbpCheckbox } from '../cbp-checkbox/cbp-checkbox';

describe('cbp-dropdown multi-select reordering', () => {
  it('reorders slotted multi-select items with selected items at the top on initial load', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem, CbpCheckbox],
      html: `
        <cbp-dropdown multiple name="multiselect">
          <cbp-dropdown-item value="AL">Alabama</cbp-dropdown-item>
          <cbp-dropdown-item value="AK" selected>Alaska</cbp-dropdown-item>
          <cbp-dropdown-item value="AZ">Arizona</cbp-dropdown-item>
        </cbp-dropdown>
      `,
    });

    await page.waitForChanges();

    const items = page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)');
    expect(items.length).toBe(3);
    // Alaska (AK) was selected, so it should be reordered to the first position
    expect((items[0] as HTMLCbpDropdownItemElement).value).toBe('AK');
    expect((items[1] as HTMLCbpDropdownItemElement).value).toBe('AL');
    expect((items[2] as HTMLCbpDropdownItemElement).value).toBe('AZ');
  });

  it('reorders slotted multi-select items when an unselected item is clicked', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem, CbpCheckbox],
      html: `
        <cbp-dropdown multiple name="multiselect">
          <cbp-dropdown-item value="AL">Alabama</cbp-dropdown-item>
          <cbp-dropdown-item value="AK">Alaska</cbp-dropdown-item>
          <cbp-dropdown-item value="AZ">Arizona</cbp-dropdown-item>
        </cbp-dropdown>
      `,
    });

    await page.waitForChanges();

    let items = page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)');
    expect((items[0] as HTMLCbpDropdownItemElement).value).toBe('AL');

    // Simulate clicking Arizona (AZ)
    const azItem = items[2] as HTMLElement;
    azItem.dispatchEvent(
      new CustomEvent('dropdownItemClick', {
        bubbles: true,
        detail: { host: azItem, label: 'Arizona', value: 'AZ' },
      })
    );

    await page.waitForChanges();

    items = page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)');
    // Arizona is now selected, so it should move to the top
    expect((items[0] as HTMLCbpDropdownItemElement).value).toBe('AZ');
  });

  it('reorders JSON items for multi-select dropdowns', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem, CbpCheckbox],
      html: `<cbp-dropdown multiple></cbp-dropdown>`,
    });

    const dropdown = page.rootInstance as CbpDropdown;
    dropdown.items = [
      { label: 'Alabama', value: 'AL' },
      { label: 'Alaska', value: 'AK', selected: true },
      { label: 'Arizona', value: 'AZ' },
    ];

    await page.waitForChanges();

    const items = page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)');
    expect(items.length).toBe(3);
    expect((items[0] as HTMLCbpDropdownItemElement).value).toBe('AK');
  });

  it('does not reorder single-select dropdowns', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem, CbpCheckbox],
      html: `
        <cbp-dropdown name="singleselect">
          <cbp-dropdown-item value="AL">Alabama</cbp-dropdown-item>
          <cbp-dropdown-item value="AK" selected>Alaska</cbp-dropdown-item>
          <cbp-dropdown-item value="AZ">Arizona</cbp-dropdown-item>
        </cbp-dropdown>
      `,
    });

    await page.waitForChanges();

    const items = page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)');
    // Single select order should remain unchanged
    expect((items[0] as HTMLCbpDropdownItemElement).value).toBe('AL');
    expect((items[1] as HTMLCbpDropdownItemElement).value).toBe('AK');
    expect((items[2] as HTMLCbpDropdownItemElement).value).toBe('AZ');
  });
});
