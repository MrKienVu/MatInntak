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

import type { Liquid, Snack, ConsumedFoodItem } from './components/FoodRegistration/foodItems';

export type GoToPageAction = {
  type: 'GO_TO_PAGE',
  name: PageName,
  navBarTitle?: string,
  navBarSubTitle?: string,
  liquid?: Liquid,
  snack?: Snack,
}

export type RegisterFoodAction = {
  type: 'REGISTER_FOOD',
  food: ConsumedFoodItem,
}

export type EditFoodAction = {
  type: 'EDIT_FOOD',
  id: string,
}

export type RemoveFoodAction = {
  type: 'REMOVE_FOOD',
  id: string,
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
  amount: number,
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
                   | RegisterFoodAction
                   | EditFoodAction
                   | RemoveFoodAction
;

export type PageName = 'RegisterNeeds'
                     | 'RegisterPatient'
                     | 'StartPage'
                     | 'RegisterFever'
                     | 'RegisterFood'
                     | 'RegisterLiquid'
                     | 'RegisterLiquidAmount'
                     | 'RegisterSnack'
                     | 'RegisterSnackAmount'
                     | 'TodaysIntake'
;

export function registerNeeds(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterNeeds' }
}

export function registerPatient(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterPatient' }
}

export function registerFood(food: ConsumedFoodItem): RegisterFoodAction {
  return { type: 'REGISTER_FOOD', food: food };
}

export function editFood(id: string): EditFoodAction {
  return { type: 'EDIT_FOOD', id: id };
}

export function removeFood(id: string): RemoveFoodAction {
  return { type: 'REMOVE_FOOD', id: id };
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

export function showRegisterLiquidPage(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterLiquid' }
}

export function showLiquidAmountPage(liquid: Liquid): GoToPageAction {
  return {
    type: 'GO_TO_PAGE',
    name: 'RegisterLiquidAmount',
    navBarTitle: liquid.name,
    navBarSubTitle: 'Drikke',
    liquid: liquid,
  }
}

export function showRegisterSnackPage(): GoToPageAction {
  return { type: 'GO_TO_PAGE', name: 'RegisterSnack'}
}

export function showSnackAmountPage(snack: Snack): GoToPageAction {
  return {
    type: 'GO_TO_PAGE',
    name: 'RegisterSnackAmount',
    navBarTitle: snack.name,
    navBarSubTitle: 'Mellommåltid',
    snack: snack,
  }
}

export function increaseAmount(step: number): IncreaseAmountAction {
  return { type: 'INCREASE_AMOUNT', step: step }
}

export function decreaseAmount(step: number): DecreaseAmountAction {
  return { type: 'DECREASE_AMOUNT', step: step }
}

export function selectAmount(amount: number): SelectAmountAction {
  return { type: 'SELECT_AMOUNT', amount: amount }
}
