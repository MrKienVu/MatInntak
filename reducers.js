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

function firstReducer(state = { value: 0 }, action: Action) {
  if (action.type === 'INCREMENT' && action.incrIndex === 0) {
    return {...state, value: state.value + 2 };
  }

  return state;
}

function secondReducer(state = { value: 0 }, action: Action) {
  if (action.type === 'DECREMENT' && action.decrIndex === 1) {
    return {...state, value: state.value - 1 };
  }

  return state;
}

const app = combineReducers({firstReducer, secondReducer});

export default app;
