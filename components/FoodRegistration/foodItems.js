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

import {
  computeGramByAmount,
  computeKcalByAmount,
} from '../../logic/food';
import type { Gram, Kcal } from '../../logic/needs';
import uuid from 'react-native-uuid';

export type FoodCategory = 'Dinner' | 'Liquid' | 'Meal' | 'Snack';

export type DailyConsumption = {
  consumedDinner: Array<ConsumedFoodItem>,
  consumedLiquids: Array<ConsumedFoodItem>,
  consumedMeals: Array<ConsumedFoodItem>,
  consumedSnacks: Array<ConsumedFoodItem>,
}

export type ConsumedFoodItem = {
  id: Symbol,
  category: FoodCategory,
  consumed: FoodItem,
  amount: Gram,
  energy: Kcal,
  time: Date,
};

export function constructConsumedFoodItem(category: FoodCategory,
                          foodItem: FoodItem, amount: number): ConsumedFoodItem {
  return {
    id: uuid(),
    category: category,
    consumed: foodItem,
    amount: computeGramByAmount(foodItem.weight, amount),
    energy: computeKcalByAmount(foodItem.energy, amount),
    time: new Date(),
  };
}

export type FoodItem = Dinner | Liquid | Meal | Snack;

export type Dinner = {name: string, energy: Kcal, weight: Gram, icon: string};
export type Liquid = {name: string, energy: Kcal, weight: Gram, icon: string, hot: boolean};
export type Meal   = {name: string, energy: Kcal, weight: Gram, icon: string};
export type Snack  = {name: string, energy: Kcal, weight: Gram, icon: string};

const gramPerDl = 100;
export const liquids: Array<Liquid> = [
  { name: 'Kaffe', energy: 100, weight: gramPerDl, icon: 'opacity', hot: true },
  { name: 'Te', energy: 100, weight: gramPerDl, icon: 'opacity', hot: true },
  { name: 'Melk', energy: 100, weight: gramPerDl, icon: 'opacity', hot: false },
  { name: 'Juice', energy: 100, weight: gramPerDl, icon: 'opacity', hot: false },
  { name: 'Saft', energy: 100, weight: gramPerDl, icon: 'opacity', hot: false },
  { name: 'Water', energy: 0, weight: gramPerDl, icon: 'opacity', hot: false },
  { name: 'Brus', energy: 100, weight: gramPerDl, icon: 'opacity', hot: false },
];

export const snacks: Array<Snack> = [
  { name: 'Bolle', energy: 100, weight: 100, icon: 'opacity'},
  { name: 'Kake', energy: 100, weight: 50, icon: 'opacity'},
  { name: 'Kjeks', energy: 100, weight: 50, icon: 'opacity'},
  { name: 'Smurt lefse', energy: 100, weight: 50, icon: 'opacity'},
  { name: 'Fruktskål', energy: 100, weight: 50, icon: 'opacity'},
  { name: 'Banan', energy: 100, weight: 50, icon: 'opacity'},
  { name: 'Eple', energy: 100, weight: 50, icon: 'opacity'},
  { name: 'Appelsin', energy: 100, weight: 50, icon: 'opacity'},
  { name: 'Clementin', energy: 100, weight: 50, icon: 'opacity'},
  { name: 'Pære', energy: 100, weight: 50, icon: 'opacity'},
  { name: 'Druer', energy: 100, weight: 50, icon: 'opacity'},
  { name: 'Melon', energy: 100, weight: 50, icon: 'opacity'},
];
