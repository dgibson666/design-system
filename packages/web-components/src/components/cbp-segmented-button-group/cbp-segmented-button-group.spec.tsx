import { newSpecPage } from '@stencil/core/testing';
import { SegmentedButtonGroup } from './cbp-segmented-button-group';
import { CbpButton } from '../cbp-button/cbp-button';

describe('cbp-segmented-button-group', () => {
  it('renders disabled state correctly', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group disabled>
          <cbp-button value="sm">Small</cbp-button>
          <cbp-button value="md">Medium</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    expect(page.root).toHaveAttribute('disabled');
    const buttons = page.root.querySelectorAll('cbp-button');
    buttons.forEach((button) => {
      expect(button.hasAttribute('disabled')).toBe(true);
    });
  });
});
