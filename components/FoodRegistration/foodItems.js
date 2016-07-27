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

import type { Liquid, Snack, Dish, Dinner } from '../../logic/food';

export const liquids: Array<Liquid> = [
  { name: 'Kaffe', energy: 50, liquid: 100, protein: 0, weight: 100, icon: 'opacity', hot: true },
  { name: 'Te', energy: 50, liquid: 100, protein: 0, weight: 100, icon: 'opacity', hot: true },
  { name: 'Melk', energy: 50, liquid: 100, protein: 2, weight: 103, icon: 'opacity', hot: false },
  { name: 'Juice', energy: 50, liquid: 100, protein: 0, weight: 100, icon: 'opacity', hot: false },
  { name: 'Saft', energy: 50, liquid: 100, protein: 0, weight: 100, icon: 'opacity', hot: false },
  { name: 'Water', energy: 0, liquid: 100, protein: 0, weight: 100, icon: 'opacity', hot: false },
  { name: 'Brus', energy: 50, liquid: 100, protein: 0, weight: 100, icon: 'opacity', hot: false },
];

export const snacks: Array<Snack> = [
  { name: 'Bolle', energy: 50, liquid: 10, protein: 2, weight: 100, icon: 'opacity'},
  { name: 'Kake', energy: 50, liquid: 10, protein: 5, weight: 50, icon: 'opacity'},
  { name: 'Kjeks', energy: 50, liquid: 0, protein: 2, weight: 50, icon: 'opacity'},
  { name: 'Smurt lefse', energy: 50, liquid: 10, protein: 3, weight: 50, icon: 'opacity'},
  { name: 'Fruktskål', energy: 50, liquid: 10, protein: 0, weight: 50, icon: 'opacity'},
  { name: 'Banan', energy: 50, liquid: 10, protein: 0, weight: 50, icon: 'opacity'},
  { name: 'Eple', energy: 50, liquid: 50, protein: 0, weight: 50, icon: 'opacity'},
  { name: 'Appelsin', energy: 50, liquid: 80, protein: 0, weight: 50, icon: 'opacity'},
  { name: 'Clementin', energy: 50, liquid: 80, protein: 0, weight: 50, icon: 'opacity'},
  { name: 'Pære', energy: 50, liquid: 50, protein: 0, weight: 50, icon: 'opacity'},
  { name: 'Druer', energy: 50, liquid: 60, protein: 0, weight: 50, icon: 'opacity'},
  { name: 'Melon', energy: 50, liquid: 90, protein: 0, weight: 50, icon: 'opacity'},
];

export const dinner: Array<Dinner> = [
  { name: 'Kjøttkaker', icon: 'opacity' },
  { name: 'Kalkunfilet', icon: 'opacity' },
  { name: 'Fiskeboller', icon: 'opacity' },
  { name: 'Pannekaker', icon: 'opacity' },
  { name: 'Bringebærfromasj', icon: 'opacity' },
];

export const dish: Array<Dish> = [
  { name: 'Kjøttkaker', energy: 100, liquid: 10, protein: 2, weight: 50, icon: 'opacity', quantity: 2, unit: 'stk'},
  { name: 'Poteter', energy: 100, liquid: 10, protein: 2, weight: 50, icon: 'opacity', quantity: 3, unit: 'stk'},
  { name: 'Ertestuing', energy: 100, liquid: 10, protein: 2, weight: 50, icon: 'opacity', quantity: 3, unit: 'ss '},
  { name: 'Saus', energy: 100, liquid: 10, protein: 2, weight: 50, icon: 'opacity',  quantity: 0, unit: 'ss'},
];
