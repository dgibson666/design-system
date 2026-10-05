import { newSpecPage } from '@stencil/core/testing';
import { SegmentedButtonGroup } from './cbp-segmented-button-group';
import { CbpButton } from '../cbp-button/cbp-button';

describe('cbp-segmented-button-group', () => {
  it('renders disabled state on group and propagates disabled to child buttons and hidden input', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group disabled name="test-group">
          <cbp-button value="sm">Small</cbp-button>
          <cbp-button value="md">Medium</cbp-button>
          <cbp-button value="lg">Large</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    await page.waitForChanges();

    const group = page.root;
    expect(group.hasAttribute('disabled')).toBe(true);

    const buttons = page.root.querySelectorAll('cbp-button');
    buttons.forEach((button) => {
      expect((button as any).disabled).toBe(true);
    });

    const hiddenInput = page.root.querySelector('input[type="hidden"]');
    expect(hiddenInput.hasAttribute('disabled')).toBe(true);
  });

  it('dynamically toggles disabled property on child buttons when group disabled prop changes', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group>
          <cbp-button value="sm">Small</cbp-button>
          <cbp-button value="md">Medium</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    await page.waitForChanges();

    const groupElement = page.root;

    // Initially enabled
    let buttons = page.root.querySelectorAll('cbp-button');
    expect((buttons[0] as any).disabled).toBeFalsy();

    // Dynamically disable
    (groupElement as any).disabled = true;
    await page.waitForChanges();

    buttons = page.root.querySelectorAll('cbp-button');
    buttons.forEach((button) => {
      expect((button as any).disabled).toBe(true);
    });

    // Dynamically re-enable
    (groupElement as any).disabled = false;
    await page.waitForChanges();

    buttons = page.root.querySelectorAll('cbp-button');
    buttons.forEach((button) => {
      expect((button as any).disabled).toBe(false);
    });
  });

  it('ignores button clicks when group is disabled', async () => {
    const clickSpy = jest.fn();

    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group disabled value="sm">
          <cbp-button value="sm">Small</cbp-button>
          <cbp-button value="md">Medium</cbp-button>
        </cbp-segmented-button-group>
      `,
    });

    page.root.addEventListener('segmentedButtonGroupClick', clickSpy);
    await page.waitForChanges();

    const secondButton = page.root.querySelectorAll('cbp-button')[1];

    // Trigger button click on child button
    secondButton.dispatchEvent(new CustomEvent('buttonClick', {
      detail: {
        nativeElement: secondButton.querySelector('button'),
        host: secondButton,
        value: 'md'
      },
      bubbles: true
    }));

    await page.waitForChanges();

    expect(clickSpy).not.toHaveBeenCalled();
    expect((page.rootInstance as any).value).toEqual('sm');
  });
});
