import { newSpecPage } from '@stencil/core/testing';
import { SegmentedButtonGroup } from './cbp-segmented-button-group';
import { CbpButton } from '../cbp-button/cbp-button';

describe('cbp-segmented-button-group disabled state', () => {
  it('renders correctly when enabled', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group>
          <cbp-button value="1">Option 1</cbp-button>
          <cbp-button value="2">Option 2</cbp-button>
        </cbp-segmented-button-group>
      `,
    });
    expect(page.root.hasAttribute('disabled')).toBe(false);
  });

  it('sets disabled property on child buttons when disabled attribute is present', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group disabled>
          <cbp-button value="1">Option 1</cbp-button>
          <cbp-button value="2">Option 2</cbp-button>
        </cbp-segmented-button-group>
      `,
    });
    expect(page.root.hasAttribute('disabled')).toBe(true);
    const buttons = page.root.querySelectorAll('cbp-button');
    buttons.forEach(button => {
      expect(button.hasAttribute('disabled')).toBe(true);
    });
  });

  it('dynamically disables child buttons when disabled property is updated', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group>
          <cbp-button value="1">Option 1</cbp-button>
          <cbp-button value="2">Option 2</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    const group = page.root as any;
    group.disabled = true;
    await page.waitForChanges();

    const buttons = page.root.querySelectorAll('cbp-button');
    buttons.forEach(button => {
      expect(button.hasAttribute('disabled')).toBe(true);
    });
  });
});
