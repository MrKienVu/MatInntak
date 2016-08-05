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
import { constructConsumedFoodItem } from './logic/food';
import _ from 'lodash';

import type { Action } from './actions';
import type { ConsumedFoodItem, DailyConsumption } from './logic/food';
import type { Kcal, Ml, Gram } from './logic/needs';

const initialRouting = { pageStack: ['StartPage'], navBarTitle: '', navBarSubTitle: '' };

function routing(state = initialRouting, action: Action) {
  if (action.type === 'GO_TO_PAGE' && (state.pageStack.length === 0 || action.name !== state[state.pageStack.length - 1])) {
    return {
      pageStack: [...state.pageStack, action.name],
      navBarTitle: action.navBarTitle || '',
      navBarSubTitle: action.navBarSubTitle || '',
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

export type Pasient = {
  energy: Kcal,
  liquid: Ml,
  protein: Gram,
}

const initialPatient = {
  energy: 2400,
  liquid: 2400,
  protein: 80,
}

export function patient(state: Pasient = initialPatient, action: Action) {
  if (action.type === 'REGISTER_NEEDS') {
    return {
      ...state,
      energy: action.energy,
      liquid: action.liquid,
      protein: action.protein,
    };
  }

  return state;
}

const initialConsumption = {
  consumedDinner: [],
  consumedLiquids: [],
  consumedMeals: [],
  consumedSnacks: [],
}

export function consumption(state: DailyConsumption = initialConsumption, action: Action) {
  if (action.type === 'REGISTER_FOOD') {
    switch (action.consumedFood.category) {
      case 'Dish': return {...state, consumedDinners: addConsumedItem(action.consumedFood, state.consumedDinner) };
      case 'Liquid': return {...state, consumedLiquids: addConsumedItem(action.consumedFood, state.consumedLiquids) };
      case 'Meal':   return {...state, consumedMeals: addConsumedItem(action.consumedFood, state.consumedMeals) };
      case 'Snack':  return {...state, consumedSnacks: addConsumedItem(action.consumedFood, state.consumedSnacks) };
    }
  }

  if (action.type === 'REMOVE_FOOD') {
    return removeConsumedItem(action.consumedFood, state);
  }

  if (action.type === 'EDIT_FOOD') {
    return editConsumedItem(action.consumedFood, action.newAmount, state);
  }

  return state;
}

function addConsumedItem(item: any, alreadyConsumed: Array<ConsumedFoodItem>) {
  alreadyConsumed.push(item);
  return alreadyConsumed;
}

function editConsumedItem(
  consumedFood: ConsumedFoodItem,
  newAmount: number,
  state: DailyConsumption,
): DailyConsumption {
  state = removeConsumedItem(consumedFood, state);
  consumedFood = constructConsumedFoodItem(consumedFood.category, consumedFood.consumed, newAmount, consumedFood.time);
  switch (consumedFood.category) {
    case 'Dinner': return {...state, consumedDinners: addConsumedItem(consumedFood, state.consumedDinner) };
    case 'Liquid': return {...state, consumedLiquids: addConsumedItem(consumedFood, state.consumedLiquids) };
    case 'Meal':   return {...state, consumedMeals: addConsumedItem(consumedFood, state.consumedMeals) };
    case 'Snack':  return {...state, consumedSnacks: addConsumedItem(consumedFood, state.consumedSnacks) };
  }

  return state;
}

function removeConsumedItem(consumedItem: ConsumedFoodItem, dailyConsumption: DailyConsumption): DailyConsumption {
  const doesNotMatch = (item) => {
    console.log("Comparing", item, "with", consumedItem);
    return !_.isEqual(item, consumedItem)
  };
  return {
    consumedDinner: dailyConsumption.consumedDinner.filter(doesNotMatch),
    consumedLiquids: dailyConsumption.consumedLiquids.filter(doesNotMatch),
    consumedMeals: dailyConsumption.consumedMeals.filter(doesNotMatch),
    consumedSnacks: dailyConsumption.consumedSnacks.filter(doesNotMatch),
  };
}

const initialAmount = {
  food: null,
  consumedFood: null,
  editing: false,
  value: 0.0,
}

export function amount(state: any = initialAmount, action: Action) {
  switch (action.type) {
    case 'REGISTER_AMOUNT':
      return {
        ...state,
        editing: false,
        food: action.food,
        value: action.value,
      };
    case 'EDIT_AMOUNT':
      return {
        ...state,
        editing: true,
        consumedFood: action.consumedFood,
        value: action.consumedFood.amount / action.consumedFood.consumed.weight,
      };
    case 'SELECT_AMOUNT': return {...state, value: action.value };
    case 'INCREASE_AMOUNT': return {...state, value: state.value + action.step };
    case 'DECREASE_AMOUNT': return {...state, value: state.value - action.step };
    default: return state;
  }
}

const app = combineReducers({routing, patient, consumption, amount});

export default app;
