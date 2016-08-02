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

import type { DailyConsumption } from './food';

export type BMI = number;
export type Gram = number;
export type Kcal = number;
export type Kilograms = number;
export type Meter = number;
export type Ml = number;

export function roundTwoDecimals(decimal:number) {
  return Math.round(100 * decimal) / 100;
}

export function positiveValue(value:number): ?number {
  return value > 0 ? value: null;
}

export function positiveComputedValue(value:?number, compute: (input:number) => number): ?number {
  return value != null ? positiveValue(compute(value)): null;
}

export function accumulateNutrition(dailyConsumption: DailyConsumption, need: string): number {
  return Object.values(dailyConsumption).reduce((previous, current) => {
    return previous + current.reduce((previous, current) => {
      return previous + current[need];
    }, 0)
  }, 0);
}

export function computeGramByAmount(foodWeight: Gram, foodAmount: Gram): Gram {
  return foodWeight * foodAmount;
}

export function computeKcalByAmount(energyPerUnit: Kcal, numberOfUnits: number) {
  return energyPerUnit * numberOfUnits;
}

export function computeMlByAmount(liquidPerUnit: Ml, numberOfUnits: number) {
  return liquidPerUnit * numberOfUnits;
}

export const computeBMI: (weight:Kilograms, height:Meter) => BMI = (weight, height) =>
                           height > 0 ? weight / Math.pow(height, 2) : NaN;

export const computeKcal: (weight:Kilograms) => Kcal = (weight) => weight*30;

export const computeProtein: (weight:Kilograms) => Gram = (weight) => weight*1;

export const computeFluid: (weight:Kilograms) => Ml = (weight) => weight*30;
