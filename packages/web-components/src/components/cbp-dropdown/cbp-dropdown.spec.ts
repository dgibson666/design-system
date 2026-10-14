import { newSpecPage } from '@stencil/core/testing';
import { CbpDropdown } from './cbp-dropdown';
import { CbpDropdownItem } from '../cbp-dropdown-item/cbp-dropdown-item';

describe('cbp-dropdown reordering', () => {
  it('reorders slotted multi-select dropdown items when reorder is true', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `
        <cbp-dropdown multiple reorder value="AK">
          <cbp-dropdown-item value="AL">
            <cbp-checkbox><input type="checkbox" value="AL" />Alabama</cbp-checkbox>
          </cbp-dropdown-item>
          <cbp-dropdown-item value="AK">
            <cbp-checkbox><input type="checkbox" value="AK" checked />Alaska</cbp-checkbox>
          </cbp-dropdown-item>
          <cbp-dropdown-item value="AZ">
            <cbp-checkbox><input type="checkbox" value="AZ" />Arizona</cbp-checkbox>
          </cbp-dropdown-item>
        </cbp-dropdown>
      `,
    });

    await page.waitForChanges();

    const dropdown = page.root as HTMLCbpDropdownElement;
    await dropdown.multiSelectReorderSelected();
    await page.waitForChanges();

    const items = Array.from(dropdown.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)')) as HTMLCbpDropdownItemElement[];
    const values = items.map(item => item.value);
    expect(values).toEqual(['AK', 'AL', 'AZ']);
  });

  it('reorders JSON multi-select dropdown items when reorder is true', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `
        <cbp-dropdown multiple reorder></cbp-dropdown>
      `,
    });

    const dropdown = page.rootInstance as any;
    const items = [
      { label: 'Alabama', value: 'AL' },
      { label: 'Alaska', value: 'AK', selected: true },
      { label: 'Arizona', value: 'AZ' }
    ];
    dropdown.items = items;
    await page.waitForChanges();

    await dropdown.multiSelectReorderSelected();
    await page.waitForChanges();

    const renderedItems = Array.from(page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)')) as HTMLCbpDropdownItemElement[];
    const values = renderedItems.map(item => item.value);
    expect(values).toEqual(['AK', 'AL', 'AZ']);
  });
});
