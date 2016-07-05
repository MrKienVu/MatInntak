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

export type BMI = number;
export type Gram = number;
export type Kcal = number;
export type Kilograms = number;
export type Meter = number;
export type Ml = number;

export const computeBMI: (weight:Kilograms, height:Meter) => BMI = (weight, height) =>
                           height > 0 ? weight / Math.pow(height, 2) : NaN;

export const computeKcal: (weight:Kilograms) => Kcal = (weight) => weight*30;

export const computeProtein: (weight:Kilograms) => Gram = (weight) => weight;

export const computeFluid: (weight:Kilograms) => Ml = (weight) => weight*30;
