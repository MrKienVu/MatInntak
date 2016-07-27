/*
 * Copyright (c) 2016, University of Oslo, Norway All rights reserved.
 *
 * This file is part of "UiO Software Information Inventory".
 *
 * "UiO Software Information Inventory" is free software: you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at
 * your option) any later version.
 *
 * "UiO Software Information Inventory" is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
 * License for more details.
 *
 * You should have received a copy of the GNU General Public License along with "UiO Software Information Inventory". If
 * not, see <http://www.gnu.org/licenses/>
 *
 * @flow
 *
 */

import { combineReducers } from 'redux';
import type { Action } from './actions';

const initialRouting = { pageStack: ['StartPage'], navBarTitle: '', navBarSubTitle: '' };

function routing(state = initialRouting, action: Action) {
  if (action.type === 'GO_TO_PAGE' && (state.pageStack.length === 0 || action.name !== state[state.pageStack.length - 1])) {
    return {
      pageStack: [...state.pageStack, action.name],
      navBarTitle: action.navBarTitle || '',
      navBarSubTitle: action.navBarSubTitle || '',
      liquid: action.liquid || null,
      snack: action.snack || null,
     };
  }

  if (action.type === 'GO_TO_PREVIOUS_PAGE') {
    return { pageStack: state.pageStack.slice(0, state.pageStack.length - 1) };
  }

  if (action.type === 'RESET_APP') {
    return initialRouting;
  }

  return state;
}

const initialAmount = { value: 0.0 };

export function amountSelector(state: any = initialAmount, action: Action) {
  switch (action.type) {
    case 'INCREASE_AMOUNT':
      return { value: state.value + action.step };
    case 'DECREASE_AMOUNT':
      return { value: state.value - action.step };
    case 'SELECT_AMOUNT':
      return { value: action.amount };
    default:
      return state;
  }
}

const app = combineReducers({routing, amountSelector});

export default app;
