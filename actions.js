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

import type { FoodItem, ConsumedFoodItem } from './logic/food';
import type { Kcal, Ml, Gram } from './logic/needs';

export type GoToPageAction = {
  type: 'GO_TO_PAGE',
  name: PageName,
  navBarTitle?: string,
  navBarSubTitle?: string,
}

export type RegisterAmountAction = {
  type: 'REGISTER_AMOUNT',
  food: FoodItem,
}

export type EditAmountAction = {
  type: 'EDIT_AMOUNT',
  consumedFood: ConsumedFoodItem,
}

export type RegisterNeedsAction = {
  type: 'REGISTER_NEEDS',
  energy: Kcal,
  liquid: Ml,
  protein: Gram,
}

export type RegisterFoodAction = {
  type: 'REGISTER_FOOD',
  consumedFood: ConsumedFoodItem,
}

export type EditFoodAction = {
  type: 'EDIT_FOOD',
  consumedFood: ConsumedFoodItem,
  newAmount: number,
}

export type RemoveFoodAction = {
  type: 'REMOVE_FOOD',
  consumedFood: ConsumedFoodItem,
}

export type IncreaseAmountAction = {
  type: 'INCREASE_AMOUNT',
  step: number,
}

export type DecreaseAmountAction = {
  type: 'DECREASE_AMOUNT',
  step: number,
}

export type SelectAmountAction = {
  type: 'SELECT_AMOUNT',
  value: number,
}

export type GoToPreviousPageAction = {
  type: 'GO_TO_PREVIOUS_PAGE',
}

export type ResetAppAction = {
  type: 'RESET_APP',
}

export type Action = GoToPageAction
                   | IncreaseAmountAction
                   | DecreaseAmountAction
                   | SelectAmountAction
                   | RegisterNeedsAction
                   | RegisterFoodAction
                   | RegisterAmountAction
                   | EditAmountAction
                   | EditFoodAction
                   | RemoveFoodAction
;

export type PageName = 'RegisterNeeds'
                     | 'RegisterPatient'
                     | 'StartPage'
                     | 'RegisterDinner'
                     | 'RegisterDish'
                     | 'RegisterDishAmount'
                     | 'RegisterFever'
                     | 'RegisterFood'
                     | 'RegisterLiquid'
                     | 'RegisterLiquidAmount'
                     | 'RegisterMeal'
                     | 'RegisterMealAmount'
                     | 'RegisterSnack'
                     | 'RegisterSnackAmount'
                     | 'TodaysIntake'
;

export function showRegisterNeedsPage(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterNeeds' }
}

export function showRegisterPatientPage(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterPatient' }
}

export function registerNeeds(energy: Kcal, liquid: Ml, protein: Gram): RegisterNeedsAction {
  return { type: 'REGISTER_NEEDS', energy: energy, liquid: liquid, protein: protein };
}

export function editFood(consumedFood: ConsumedFoodItem, newAmount: number): EditFoodAction {
  return { type: 'EDIT_FOOD', consumedFood: consumedFood, newAmount: newAmount };
}

export function registerFood(consumedFood: ConsumedFoodItem): RegisterFoodAction {
  return { type: 'REGISTER_FOOD', consumedFood: consumedFood };
}

export function removeFood(consumedFood: ConsumedFoodItem): RemoveFoodAction {
  return { type: 'REMOVE_FOOD', consumedFood: consumedFood };
}

export function resetApp(): ResetAppAction {
  return { type: 'RESET_APP' }
}

export function showFeverRegistrationPage() {
  return { type: 'GO_TO_PAGE', name: 'RegisterFever'}
}

export function showTodaysIntakePage() {
  return { type: 'GO_TO_PAGE', name: 'TodaysIntake' }
}

export function showPreviousPage() {
  return { type: 'GO_TO_PREVIOUS_PAGE' }
}

export function showRegisterFoodPage(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterFood' }
}

export function showDinnerMenuPage(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterDinner' }
}

export function showRegisterLiquidPage(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterLiquid' }
}

export function showRegisterDishPage(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterDish'}
}
export function showRegisterMealPage(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterMeal' }
}

export function showRegisterSnackPage(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterSnack'}
}

export function showMealAmountPage(mealName: string): GoToPageAction {
  return {
    type: 'GO_TO_PAGE',
    name: 'RegisterMealAmount',
    navBarTitle: mealName,
    navBarSubTitle: 'Frokost, lunsj og kveldsmat',
  }
}

export function showDishAmountPage(dishName: string): GoToPageAction {
  return {
    type: 'GO_TO_PAGE',
    name: 'RegisterDishAmount',
    navBarTitle: dishName,
    navBarSubTitle: 'Middag',
  };
}

export function showLiquidAmountPage(liquidName: string): GoToPageAction {
  return {
    type: 'GO_TO_PAGE',
    name: 'RegisterLiquidAmount',
    navBarTitle: liquidName,
    navBarSubTitle: 'Drikke',
  }
}

export function showSnackAmountPage(snackName: string): GoToPageAction {
  return {
    type: 'GO_TO_PAGE',
    name: 'RegisterSnackAmount',
    navBarTitle: snackName,
    navBarSubTitle: 'Mellommåltid',
  }
}

export function registerAmount(food: FoodItem): RegisterAmountAction {
  return {
    type: 'REGISTER_AMOUNT',
    food: food,
  };
}

export function editAmount(consumedFood: ConsumedFoodItem): EditAmountAction {
  return {
    type: 'EDIT_AMOUNT',
    consumedFood: consumedFood,
  };
}

export function increaseAmount(step: number): IncreaseAmountAction {
  return { type: 'INCREASE_AMOUNT', step: step }
}

export function decreaseAmount(step: number): DecreaseAmountAction {
  return { type: 'DECREASE_AMOUNT', step: step }
}

export function selectAmount(value: number): SelectAmountAction {
  return { type: 'SELECT_AMOUNT', value: value }
}
