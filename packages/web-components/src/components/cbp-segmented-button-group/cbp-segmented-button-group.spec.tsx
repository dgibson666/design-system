import { newSpecPage } from '@stencil/core/testing';
import { SegmentedButtonGroup } from './cbp-segmented-button-group';
import { CbpButton } from '../cbp-button/cbp-button';

describe('cbp-segmented-button-group', () => {
  it('renders child buttons enabled by default when group is not disabled', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group>
          <cbp-button value="sm">Small</cbp-button>
          <cbp-button value="md">Medium</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    const buttons = page.root.querySelectorAll('cbp-button');
    expect(buttons[0].disabled).toBeFalsy();
    expect(buttons[1].disabled).toBeFalsy();
  });

  it('disables all child buttons when disabled attribute is set on group', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group disabled>
          <cbp-button value="sm">Small</cbp-button>
          <cbp-button value="md">Medium</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    const buttons = page.root.querySelectorAll('cbp-button');
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[1].disabled).toBe(true);
  });

  it('dynamically disables and enables child buttons when disabled property changes', async () => {
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
    const buttons = page.root.querySelectorAll('cbp-button');

    group.disabled = true;
    await page.waitForChanges();

    expect(buttons[0].disabled).toBe(true);
    expect(buttons[1].disabled).toBe(true);

    group.disabled = false;
    await page.waitForChanges();

    expect(buttons[0].disabled).toBe(false);
    expect(buttons[1].disabled).toBe(false);
  });

  it('does not allow button click interactions when group is disabled', async () => {
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
    const clickSpy = jest.fn();
    group.addEventListener('segmentedButtonGroupClick', clickSpy);

    const buttonElement = page.root.querySelector('cbp-button');
    buttonElement.click();
    await page.waitForChanges();

    expect(clickSpy).not.toHaveBeenCalled();
  });
});
