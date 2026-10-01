import { newSpecPage } from '@stencil/core/testing';
import { CbpDropdown } from '../cbp-dropdown';
import { CbpDropdownItem } from '../../cbp-dropdown-item/cbp-dropdown-item';

describe('cbp-dropdown multi-select reordering', () => {
  it('reorders JSON items so that selected items appear at the start', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `
        <cbp-dropdown
          multiple
          items='[{"label":"Alpha","value":"A"},{"label":"Beta","value":"B"},{"label":"Gamma","value":"G"}]'
          value="B"
        ></cbp-dropdown>
      `,
    });

    await page.waitForChanges();
    const dropdown = page.root as HTMLCbpDropdownElement;
    const items = dropdown.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)');
    expect(items.length).toBe(3);
    expect((items[0] as HTMLCbpDropdownItemElement).value).toBe('B');
    expect((items[1] as HTMLCbpDropdownItemElement).value).toBe('A');
    expect((items[2] as HTMLCbpDropdownItemElement).value).toBe('G');
  });

  it('reorders slotted items so that selected items appear at the start', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `
        <cbp-dropdown multiple>
          <cbp-dropdown-item value="A">Alpha</cbp-dropdown-item>
          <cbp-dropdown-item value="B" selected>Beta</cbp-dropdown-item>
          <cbp-dropdown-item value="G">Gamma</cbp-dropdown-item>
        </cbp-dropdown>
      `,
    });

    await page.waitForChanges();
    const dropdownInstance = page.rootInstance;
    dropdownInstance.multiSelectReorderSelected();
    await page.waitForChanges();

    const items = page.root.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)');
    expect((items[0] as HTMLCbpDropdownItemElement).value).toBe('B');
    expect((items[1] as HTMLCbpDropdownItemElement).value).toBe('A');
    expect((items[2] as HTMLCbpDropdownItemElement).value).toBe('G');
  });

  it('reorders options when clearSelections is called', async () => {
    const page = await newSpecPage({
      components: [CbpDropdown, CbpDropdownItem],
      html: `
        <cbp-dropdown
          multiple
          items='[{"label":"Alpha","value":"A"},{"label":"Beta","value":"B"},{"label":"Gamma","value":"G"}]'
          value="B"
        ></cbp-dropdown>
      `,
    });

    await page.waitForChanges();
    const dropdown = page.rootInstance;
    await dropdown.clearSelections();
    await page.waitForChanges();

    expect(dropdown.value).toEqual([]);
  });
});
