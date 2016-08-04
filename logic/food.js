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

import type { Gram, Kcal, Ml } from './needs';

import {
  computeGramByAmount,
  computeKcalByAmount,
  computeMlByAmount,
} from './needs';

export type DailyConsumption = {
  consumedDinner: Array<ConsumedFoodItem>,
  consumedLiquids: Array<ConsumedFoodItem>,
  consumedMeals: Array<ConsumedFoodItem>,
  consumedSnacks: Array<ConsumedFoodItem>,
}

export type ConsumedFoodItem = {
  category: FoodCategory,
  consumed: FoodItem,
  amount: Gram,
  energy: Kcal,
  liquid: Ml,
  protein: Gram,
  time: Date,
};

export type FoodCategory = 'Dish' | 'Liquid' | 'Meal' | 'Snack';
export type FoodItem = Dish | Liquid | Meal | Snack;
export type Dinner = {name: string, icon: string};
export type Dish = { name: string, energy: Kcal, liquid: Ml, protein: Gram, weight: Gram, icon?: string, quantity: number, unit: string, };
export type Liquid = {name: string, energy: Kcal, liquid: Ml, protein: Gram, weight: Gram, icon?: string, hot?: boolean};
export type Meal   = {name: string, energy: Kcal, liquid: Ml, protein: Gram, weight: Gram, icon?: string};
export type Snack  = {name: string, energy: Kcal, liquid: Ml, protein: Gram, weight: Gram, icon?: string};

export function constructConsumedFoodItem(
    category: FoodCategory, foodItem: FoodItem, amount: number, time?: Date): ConsumedFoodItem {
  return {
    category: category,
    consumed: foodItem,
    amount: computeGramByAmount(foodItem.weight, amount),
    energy: computeKcalByAmount(foodItem.energy, amount),
    liquid: computeMlByAmount(foodItem.liquid, amount),
    protein: computeGramByAmount(foodItem.protein, amount),
    time: time || new Date(),
  };
}
