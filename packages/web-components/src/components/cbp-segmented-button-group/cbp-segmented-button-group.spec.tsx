import { newSpecPage } from '@stencil/core/testing';
import { SegmentedButtonGroup } from './cbp-segmented-button-group';
import { CbpButton } from '../cbp-button/cbp-button';

describe('cbp-segmented-button-group', () => {
  it('renders default enabled group', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group name="size">
          <cbp-button value="sm">Small</cbp-button>
          <cbp-button value="md">Medium</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    const group = page.root;
    expect(group).toHaveAttribute('role');
    expect(group.getAttribute('role')).toBe('group');

    const buttons = page.root.querySelectorAll('cbp-button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].hasAttribute('disabled')).toBe(false);
    expect(buttons[1].hasAttribute('disabled')).toBe(false);

    const hiddenInput = page.root.querySelector('input[type="hidden"]');
    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput.hasAttribute('disabled')).toBe(false);
  });

  it('disables child buttons and hidden input when disabled prop is set on group', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group disabled name="size">
          <cbp-button value="sm">Small</cbp-button>
          <cbp-button value="md">Medium</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    const buttons = page.root.querySelectorAll('cbp-button');
    expect(buttons[0].hasAttribute('disabled')).toBe(true);
    expect(buttons[1].hasAttribute('disabled')).toBe(true);

    const hiddenInput = page.root.querySelector('input[type="hidden"]');
    expect(hiddenInput.hasAttribute('disabled')).toBe(true);
  });

  it('updates child buttons when disabled prop changes on group', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group name="size">
          <cbp-button value="sm">Small</cbp-button>
          <cbp-button value="md" disabled>Medium</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    const groupEl = page.root as HTMLCbpSegmentedButtonGroupElement;
    const buttons = page.root.querySelectorAll('cbp-button');

    expect(buttons[0].hasAttribute('disabled')).toBe(false);
    expect(buttons[1].hasAttribute('disabled')).toBe(true);

    // Disable group
    groupEl.disabled = true;
    await page.waitForChanges();

    expect(buttons[0].hasAttribute('disabled')).toBe(true);
    expect(buttons[1].hasAttribute('disabled')).toBe(true);

    // Enable group
    groupEl.disabled = false;
    await page.waitForChanges();

    // Button 0 should be enabled, Button 1 should remain disabled (its initial state)
    expect(buttons[0].hasAttribute('disabled')).toBe(false);
    expect(buttons[1].hasAttribute('disabled')).toBe(true);
  });
});
