/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';

import {ListItemRole, MenuItemEl} from '../../../menu/internal/menuitem/menu-item.js';
import {createRequestDeselectionEvent, createRequestSelectionEvent, SelectOption} from '../shared.js';

/**
 * @fires close-menu Closes the encapsulating menu on
 * @fires request-selection Requests the parent md-select to select this element
 * (and deselect others if single-selection) when `selected` changed to `true`.
 * @fires request-deselection Requests the parent md-select to deselect this
 * element when `selected` changed to `false`.
 */
export class SelectOptionEl extends MenuItemEl implements SelectOption {
  /**
   * Form value of the option.
   */
  @property() value = '';

  /**
   * Whether or not this option is selected.
   */
  @property({type: Boolean}) selected = false;

  override readonly type: ListItemRole = 'option';

  override willUpdate(changed: PropertyValues<SelectOptionEl>) {
    if (changed.has('selected')) {
      // Synchronize selected -> active but not the other way around because
      // active is used for keyboard navigation and doesn't mean the option
      // should be selected if active.
      this.active = this.selected;
      this.ariaSelected = this.selected ? 'true' : 'false';
      // By default active = true focuses the element. We want to prevent that
      // in this case because we set active = this.selected and that may mess
      // around with menu's restore focus function once the menu closes.
      this.focusOnActivation = false;
    }

    super.willUpdate(changed);
  }

  override updated(changed: PropertyValues<SelectOptionEl>) {
    super.updated(changed);
    // Restore the active = true focusing behavior which happens in
    // super.updated() if it was turned off.
    this.focusOnActivation = true;

    // Do not dispatch event on first update / boot-up.
    if (changed.has('selected') && changed.get('selected') !== undefined) {
      // This section is really useful for when the user sets selected on the
      // option programmatically. Most other cases (click and keyboard) are
      // handled by md-select because it needs to coordinate the
      // single-selection behavior.
      if (this.selected) {
        this.dispatchEvent(createRequestSelectionEvent());
      } else {
        this.dispatchEvent(createRequestDeselectionEvent());
      }
    }
  }

  protected override getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      selected: this.selected,
    };
  }
}
