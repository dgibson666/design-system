import { newSpecPage } from '@stencil/core/testing';
import { SegmentedButtonGroup } from './cbp-segmented-button-group';
import { CbpButton } from '../cbp-button/cbp-button';

describe('cbp-segmented-button-group', () => {
  it('renders disabled state and propagates disabled prop to child buttons', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group disabled>
          <cbp-button value="sm">Small</cbp-button>
          <cbp-button value="md">Medium</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    const group = page.root as HTMLCbpSegmentedButtonGroupElement;
    expect(group.disabled).toBe(true);

    const buttons = page.root.querySelectorAll('cbp-button');
    buttons.forEach((btn) => {
      expect((btn as any).disabled).toBe(true);
    });
  });

  it('updates child buttons when disabled prop changes', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group>
          <cbp-button value="sm">Small</cbp-button>
          <cbp-button value="md">Medium</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    const group = page.root as HTMLCbpSegmentedButtonGroupElement;
    expect(group.disabled).toBeFalsy();

    group.disabled = true;
    await page.waitForChanges();

    const buttons = page.root.querySelectorAll('cbp-button');
    buttons.forEach((btn) => {
      expect((btn as any).disabled).toBe(true);
    });
  });
});
