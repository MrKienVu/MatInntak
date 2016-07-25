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

export type Liquid = {name: string, icon: string, hot: boolean};

export const liquids: Array<Liquid> = [
  { name: 'Kaffe', icon: 'opacity', hot: true },
  { name: 'Te', icon: 'opacity', hot: true },
  { name: 'Melk', icon: 'opacity', hot: false },
  { name: 'Juice', icon: 'opacity', hot: false },
  { name: 'Saft', icon: 'opacity', hot: false },
  { name: 'Water', icon: 'opacity', hot: false },
  { name: 'Brus', icon: 'opacity', hot: false },
];
