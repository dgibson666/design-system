import { newSpecPage } from '@stencil/core/testing';
import { SegmentedButtonGroup } from './cbp-segmented-button-group';
import { CbpButton } from '../cbp-button/cbp-button';

describe('cbp-segmented-button-group', () => {
  it('renders default button group', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group>
          <cbp-button value="1">One</cbp-button>
          <cbp-button value="2">Two</cbp-button>
        </cbp-segmented-button-group>
      `,
    });
    expect(page.root).toBeTruthy();
  });

  it('propagates disabled state to child buttons when disabled attribute is present', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group disabled>
          <cbp-button value="1">One</cbp-button>
          <cbp-button value="2">Two</cbp-button>
        </cbp-segmented-button-group>
      `,
    });
    await page.waitForChanges();

    const group = page.root;
    expect(group.hasAttribute('disabled')).toBe(true);

    const buttons = group.querySelectorAll('cbp-button');
    buttons.forEach((btn) => {
      expect(btn.disabled).toBe(true);
    });
  });

  it('updates child buttons dynamically when disabled property changes', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group>
          <cbp-button value="1">One</cbp-button>
          <cbp-button value="2">Two</cbp-button>
        </cbp-segmented-button-group>
      `,
    });
    await page.waitForChanges();

    const group = page.root;
    const buttons = group.querySelectorAll('cbp-button');
    expect(buttons[0].disabled).toBeFalsy();

    group.disabled = true;
    await page.waitForChanges();

    buttons.forEach((btn) => {
      expect(btn.disabled).toBe(true);
    });
  });

  it('does not emit segmentedButtonGroupClick when group is disabled', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup, CbpButton],
      html: `
        <cbp-segmented-button-group disabled>
          <cbp-button value="1">One</cbp-button>
          <cbp-button value="2">Two</cbp-button>
        </cbp-segmented-button-group>
      `,
    });
    await page.waitForChanges();

    const group = page.root;
    const clickSpy = jest.fn();
    group.addEventListener('segmentedButtonGroupClick', clickSpy);

    const button = group.querySelector('cbp-button');
    button.click();
    await page.waitForChanges();

    expect(clickSpy).not.toHaveBeenCalled();
  });
});
