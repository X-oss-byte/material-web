/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '../../elevation/elevation.js';

import {html} from 'lit';

import {Button} from './button.js';

/**
 * A filled tonal button component.
 */
export class FilledTonalButton extends Button {
  protected override renderElevation() {
    return html`<md-elevation></md-elevation>`;
  }
}
