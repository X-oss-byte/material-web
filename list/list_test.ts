/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// import 'jasmine'; (google3-only)
import './list.js';
import './list-item.js';

import {html} from 'lit';

import {Environment} from '../testing/environment.js';
import {createTokenTests} from '../testing/tokens.js';

import {ListHarness} from './harness.js';
import {MdList} from './list.js';
import {MdListItem} from './list-item.js';

describe('<md-list>', () => {
  const env = new Environment();

  describe('.styles', () => {
    createTokenTests(MdList.styles);
  });

  describe('keyboard navigation', () => {
    it('non-nagivable key does nothing', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
        </md-list>`);

      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(0);
      expect(third.tabIndex).toEqual(-1);

      await listHarness.keypress('k');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(0);
      expect(third.tabIndex).toEqual(-1);
    });

    it('ArrowDown activates the next item', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
        </md-list>`);

      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(0);
      expect(third.tabIndex).toEqual(-1);

      await listHarness.pressHandledKey('ArrowDown');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);
    });

    it('ArrowDown will loop around', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);

      await listHarness.pressHandledKey('ArrowDown');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(-1);
    });

    it('ArrowDown will do nothing if nothing is selectable', async () => {
      const root = env.render(html`
          <md-list>
            <md-list-item disabled></md-list-item>
            <md-list-item disabled></md-list-item>
          </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const [first, second] = Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);

      await listHarness.pressHandledKey('ArrowDown');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
    });

    it('ArrowDown does not activate disabled items', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="0"></md-list-item>
          <md-list-item disabled></md-list-item>
          <md-list-item></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(-1);

      await listHarness.pressHandledKey('ArrowDown');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);
    });

    it('ArrowDown will select itself if its the only activatable', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="0"></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const first = root.querySelector('md-list-item')!;

      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);

      await listHarness.pressHandledKey('ArrowDown');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
    });

    it('ArrowUp activates the previous item', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(0);
      expect(third.tabIndex).toEqual(-1);

      await listHarness.pressHandledKey('ArrowUp');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(-1);
    });

    it('activatePreviousItem will loop around', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item></md-list-item>
          <md-list-item></md-list-item>
          <md-list-item></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(-1);

      await listHarness.pressHandledKey('ArrowUp');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);
    });

    it('ArrowUp will return null if nothing is selectable', async () => {
      const root = env.render(html`
          <md-list>
            <md-list-item disabled></md-list-item>
            <md-list-item disabled></md-list-item>
          </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const [first, second] = Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);

      await listHarness.pressHandledKey('ArrowUp');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
    });

    it('ArrowUp does not activate disabled items', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item disabled></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);

      await listHarness.pressHandledKey('ArrowUp');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(-1);
    });

    it('ArrowUp will select itself if its the only activatable', async () => {
      const root = env.render(html`
          <md-list>
            <md-list-item></md-list-item>
          </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const first = root.querySelector('md-list-item')!;

      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);

      await listHarness.pressHandledKey('ArrowUp');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
    });

    it('Home will select the first item if something is already selected',
       async () => {
         const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
          <md-list-item></md-list-item>
        </md-list>`);
         const listEl = root.querySelector('md-list')!;
         const listHarness = new ListHarness(listEl);
         const [first, second, third] =
             Array.from(root.querySelectorAll('md-list-item'));

         await env.waitForStability();

         expect(first.tabIndex).toEqual(-1);
         expect(second.tabIndex).toEqual(0);
         expect(third.tabIndex).toEqual(-1);

         await listHarness.pressHandledKey('Home');
         await env.waitForStability();

         expect(first.tabIndex).toEqual(0);
         expect(second.tabIndex).toEqual(-1);
         expect(third.tabIndex).toEqual(-1);
       });

    it('Home will select the first activatable item if first is non-activatable',
       async () => {
         const root = env.render(html`
        <md-list>
          <md-list-item disabled></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
        </md-list>`);
         const listEl = root.querySelector('md-list')!;
         const listHarness = new ListHarness(listEl);
         const [first, second, third] =
             Array.from(root.querySelectorAll('md-list-item'));

         await env.waitForStability();

         expect(first.tabIndex).toEqual(-1);
         expect(second.tabIndex).toEqual(-1);
         expect(third.tabIndex).toEqual(0);

         await listHarness.pressHandledKey('Home');
         await env.waitForStability();

         expect(first.tabIndex).toEqual(-1);
         expect(second.tabIndex).toEqual(0);
         expect(third.tabIndex).toEqual(-1);
       });

    it('Home will select the first item if it is already selected',
       async () => {
         const root = env.render(html`
        <md-list>
          <md-list-item tabindex="0"></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
        </md-list>`);
         const listEl = root.querySelector('md-list')!;
         const listHarness = new ListHarness(listEl);
         const [first, second, third] =
             Array.from(root.querySelectorAll('md-list-item'));

         await env.waitForStability();

         expect(first.tabIndex).toEqual(0);
         expect(second.tabIndex).toEqual(-1);
         expect(third.tabIndex).toEqual(-1);

         await listHarness.pressHandledKey('Home');
         await env.waitForStability();

         expect(first.tabIndex).toEqual(0);
         expect(second.tabIndex).toEqual(-1);
         expect(third.tabIndex).toEqual(-1);
       });

    it('End will select the last item if something is already selected',
       async () => {
         const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
        </md-list>`);
         const listEl = root.querySelector('md-list')!;
         const listHarness = new ListHarness(listEl);
         const [first, second, third] =
             Array.from(root.querySelectorAll('md-list-item'));

         await env.waitForStability();

         expect(first.tabIndex).toEqual(-1);
         expect(second.tabIndex).toEqual(0);
         expect(third.tabIndex).toEqual(-1);

         await listHarness.pressHandledKey('End');
         await env.waitForStability();

         expect(first.tabIndex).toEqual(-1);
         expect(second.tabIndex).toEqual(-1);
         expect(third.tabIndex).toEqual(0);
       });

    it('End will select the last activatable item if last is non-activatable',
       async () => {
         const root = env.render(html`
        <md-list>
          <md-list-item></md-list-item>
          <md-list-item></md-list-item>
          <md-list-item disabled></md-list-item>
        </md-list>`);
         const listEl = root.querySelector('md-list')!;
         const listHarness = new ListHarness(listEl);
         const [first, second, third] =
             Array.from(root.querySelectorAll('md-list-item'));

         await env.waitForStability();

         expect(first.tabIndex).toEqual(0);
         expect(second.tabIndex).toEqual(-1);
         expect(third.tabIndex).toEqual(-1);

         await listHarness.pressHandledKey('End');
         await env.waitForStability();

         expect(first.tabIndex).toEqual(-1);
         expect(second.tabIndex).toEqual(0);
         expect(third.tabIndex).toEqual(-1);
       });

    it('End will select the last item if it is already selected', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const listHarness = new ListHarness(listEl);
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);

      await listHarness.pressHandledKey('End');
      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);
    });
  });

  describe('activate items methods', () => {
    it('List will activate only first item by default', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item></md-list-item>
          <md-list-item></md-list-item>
          <md-list-item></md-list-item>
        </md-list>`);
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(-1);
    });

    it('List will activate only first activatable item by default',
       async () => {
         const root = env.render(html`
        <md-list>
          <md-list-item disabled></md-list-item>
          <md-list-item></md-list-item>
          <md-list-item></md-list-item>
        </md-list>`);
         const [first, second, third] =
             Array.from(root.querySelectorAll('md-list-item'));

         await env.waitForStability();

         expect(first.tabIndex).toEqual(-1);
         expect(second.tabIndex).toEqual(0);
         expect(third.tabIndex).toEqual(-1);
       });

    it('List will activate first activatable item if all are tabindex -1',
       async () => {
         const root = env.render(html`
          <md-list>
            <md-list-item tabindex="-1"></md-list-item>
            <md-list-item tabindex="-1"></md-list-item>
            <md-list-item tabindex="-1"></md-list-item>
          </md-list>`);
         const [first, second, third] =
             Array.from(root.querySelectorAll('md-list-item'));

         await env.waitForStability();

         expect(first.tabIndex).toEqual(0);
         expect(second.tabIndex).toEqual(-1);
         expect(third.tabIndex).toEqual(-1);
       });

    it('List will activate first activatable item if defined by user',
       async () => {
         const root = env.render(html`
          <md-list>
            <md-list-item tabindex="-1"></md-list-item>
            <md-list-item tabindex="2"></md-list-item>
            <md-list-item tabindex="1"></md-list-item>
          </md-list>`);
         const [first, second, third] =
             Array.from(root.querySelectorAll('md-list-item'));

         await env.waitForStability();

         expect(first.tabIndex).toEqual(-1);
         expect(second.tabIndex).toEqual(0);
         expect(third.tabIndex).toEqual(-1);
       });

    it('activateNextItem activates the next item', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(0);
      expect(third.tabIndex).toEqual(-1);

      const nextItem = listEl.activateNextItem();
      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);
      expect(nextItem).toEqual(third);
    });

    it('activateNextItem will loop around', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);

      const nextItem = listEl.activateNextItem();
      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(-1);
      expect(nextItem).toEqual(first);
    });

    it('activateNextItem will return null if nothing is selectable',
       async () => {
         const root = env.render(html`
          <md-list>
          </md-list>`);
         const listEl = root.querySelector('md-list')!;

         await env.waitForStability();

         const nextItem = listEl.activateNextItem();
         await env.waitForStability();

         expect(nextItem).toBeNull();
       });

    it('activateNextItem does not activate disabled items', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item></md-list-item>
          <md-list-item disabled></md-list-item>
          <md-list-item></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(-1);

      const nextItem = listEl.activateNextItem();
      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);
      expect(nextItem).toEqual(third);
    });

    it('activateNextItem will return itself if it is the only activatable item',
       async () => {
         const root = env.render(html`
        <md-list>
          <md-list-item tabindex="0"></md-list-item>
        </md-list>`);
         const listEl = root.querySelector('md-list')!;
         const first = root.querySelector('md-list-item')!;

         await env.waitForStability();

         expect(first.tabIndex).toEqual(0);

         const nextItem = listEl.activateNextItem();
         await env.waitForStability();

         expect(first.tabIndex).toEqual(0);
         expect(nextItem).toEqual(first);
       });

    it('activatePreviousItem activates the previous item', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
          <md-list-item tabindex="-1"></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(0);
      expect(third.tabIndex).toEqual(-1);

      const nextItem = listEl.activatePreviousItem();
      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(-1);
      expect(nextItem).toEqual(first);
    });

    it('activatePreviousItem will loop around', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item></md-list-item>
          <md-list-item></md-list-item>
          <md-list-item></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(-1);

      const nextItem = listEl.activatePreviousItem();
      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);
      expect(nextItem).toEqual(third);
    });

    it('activatePreviousItem will return null if nothing is selectable',
       async () => {
         const root = env.render(html`
          <md-list>
          </md-list>`);
         const listEl = root.querySelector('md-list')!;

         await env.waitForStability();

         const nextItem = listEl.activatePreviousItem();
         await env.waitForStability();

         expect(nextItem).toBeNull();
       });

    it('activatePreviousItem does not activate disabled items', async () => {
      const root = env.render(html`
        <md-list>
          <md-list-item tabindex="-1"></md-list-item>
          <md-list-item disabled></md-list-item>
          <md-list-item tabindex="0"></md-list-item>
        </md-list>`);
      const listEl = root.querySelector('md-list')!;
      const [first, second, third] =
          Array.from(root.querySelectorAll('md-list-item'));

      await env.waitForStability();

      expect(first.tabIndex).toEqual(-1);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(0);

      const nextItem = listEl.activatePreviousItem();
      await env.waitForStability();

      expect(first.tabIndex).toEqual(0);
      expect(second.tabIndex).toEqual(-1);
      expect(third.tabIndex).toEqual(-1);
      expect(nextItem).toEqual(first);
    });

    it('activatePreviousItem will return itself if its activatable',
       async () => {
         const root = env.render(html`
          <md-list>
            <md-list-item></md-list-item>
          </md-list>`);
         const listEl = root.querySelector('md-list')!;
         const first = root.querySelector('md-list-item')!;

         await env.waitForStability();

         expect(first.tabIndex).toEqual(0);

         const nextItem = listEl.activatePreviousItem();
         await env.waitForStability();

         expect(first.tabIndex).toEqual(0);
         expect(nextItem).toEqual(first);
       });
  });
});

describe('<md-list-item>', () => {
  const env = new Environment();

  describe('.styles', () => {
    createTokenTests(MdListItem.styles);
  });

  describe('rendering', () => {
    it('self-describes as a list-item', async () => {
      const root = env.render(html`
          <md-list-item>
          </md-list-item>`);

      const listItemEl = root.querySelector('md-list-item')!;

      await env.waitForStability();

      expect(listItemEl.hasAttribute('md-list-item')).toBeTrue();
    });
  });

  it('disabled overrides tabIndex', async () => {
    const root = env.render(html`<md-list-item></md-list-item>`);

    const listItem = root.querySelector('md-list-item')!;

    await env.waitForStability();

    const internalRoot =
        listItem.renderRoot.querySelector('#item') as HTMLElement;

    expect(internalRoot.tabIndex).toBe(0);

    listItem.disabled = true;

    await env.waitForStability();

    expect(listItem.disabled).toBeTrue();
    expect(internalRoot.tabIndex).toBe(-1);
  });

  it('supportingText is rendered only when set', async () => {
    const root = env.render(html`<md-list-item></md-list-item>`);

    const listItem = root.querySelector('md-list-item')!;

    await env.waitForStability();

    let supporingTextEl = listItem.renderRoot.querySelector('.supporting-text');

    expect(supporingTextEl).toBeNull();

    listItem.supportingText = 'Yolo';

    await env.waitForStability();

    supporingTextEl = listItem.renderRoot.querySelector('.supporting-text');
    expect(supporingTextEl).toBeTruthy();
  });

  it('trailingSupportingText is rendered only when set', async () => {
    const root = env.render(html`<md-list-item></md-list-item>`);

    const listItem = root.querySelector('md-list-item')!;

    await env.waitForStability();

    let supporingTextEl =
        listItem.renderRoot.querySelector('.trailing-supporting-text');

    expect(supporingTextEl).toBeNull();

    listItem.trailingSupportingText = 'Yolo';

    await env.waitForStability();

    supporingTextEl =
        listItem.renderRoot.querySelector('.trailing-supporting-text');
    expect(supporingTextEl).toBeTruthy();
  });

  it('only one "with-*-line" class is set at a time', async () => {
    const root = env.render(html`<md-list-item></md-list-item>`);

    const listItem = root.querySelector('md-list-item')!;

    await env.waitForStability();

    const rootEl = listItem.renderRoot.querySelector('#item') as HTMLElement;

    expect(rootEl.classList.contains('with-one-line')).toBeTrue();
    expect(rootEl.classList.contains('with-two-line')).toBeFalse();
    expect(rootEl.classList.contains('with-three-line')).toBeFalse();

    listItem.multiLineSupportingText = true;

    await env.waitForStability();

    expect(rootEl.classList.contains('with-one-line')).toBeTrue();
    expect(rootEl.classList.contains('with-two-line')).toBeFalse();
    expect(rootEl.classList.contains('with-three-line')).toBeFalse();

    listItem.multiLineSupportingText = false;
    listItem.supportingText = 'YOLO';

    await env.waitForStability();

    expect(rootEl.classList.contains('with-one-line')).toBeFalse();
    expect(rootEl.classList.contains('with-two-line')).toBeTrue();
    expect(rootEl.classList.contains('with-three-line')).toBeFalse();

    listItem.multiLineSupportingText = true;

    await env.waitForStability();

    expect(rootEl.classList.contains('with-one-line')).toBeFalse();
    expect(rootEl.classList.contains('with-two-line')).toBeFalse();
    expect(rootEl.classList.contains('with-three-line')).toBeTrue();
  });

  it('ripple and focus ring not rendered on noninteractive', async () => {
    const root = env.render(html`<md-list-item></md-list-item>`);

    const listItem = root.querySelector('md-list-item')!;

    await env.waitForStability();

    let rippleEl = listItem.renderRoot.querySelector('md-ripple');
    let focusRingEl = listItem.renderRoot.querySelector('md-focus-ring');

    expect(rippleEl).toBeTruthy();
    expect(focusRingEl).toBeTruthy();

    listItem.noninteractive = true;

    await env.waitForStability();

    rippleEl = listItem.renderRoot.querySelector('md-ripple');
    focusRingEl = listItem.renderRoot.querySelector('md-focus-ring');

    expect(rippleEl).toBeNull();
    expect(focusRingEl).toBeNull();
  });
});

describe('<md-list-item> link', () => {
  const env = new Environment();

  describe('.styles', () => {
    createTokenTests(MdListItem.styles);
  });

  it('setting href renders an anchor tag', async () => {
    const root = env.render(
        html`<md-list-item href="https://google.com"></md-list-item>`);

    const listItem = root.querySelector('md-list-item')!;

    await env.waitForStability();

    const internalRoot =
        listItem.renderRoot.querySelector('#item') as HTMLElement;

    expect(internalRoot.tagName).toBe('A');
  });

  it('setting type and href does not render a role', async () => {
    const root = env.render(
        html`<md-list-item type="menuitem" href="https://google.com"></md-list-item>`);

    const listItem = root.querySelector('md-list-item')!;

    await env.waitForStability();

    const internalRoot =
        listItem.renderRoot.querySelector('#item') as HTMLElement;

    expect(internalRoot.hasAttribute('role')).toBe(false);
  });

  it('setting target without href renders nothing', async () => {
    const root =
        env.render(html`<md-list-item target="_blank"></md-list-item>`);

    const listItem = root.querySelector('md-list-item')!;

    await env.waitForStability();

    const internalRoot =
        listItem.renderRoot.querySelector('#item') as HTMLElement;

    expect(internalRoot.hasAttribute('target')).toBe(false);
  });
});
