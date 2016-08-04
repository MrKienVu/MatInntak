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

import React from 'react';
import { AppRegistry } from 'react-native';
import { connect, Provider } from 'react-redux'

import StartPage from './components/StartPage';
import FeverRegistrationPage from './components/PatientRegistration/FeverRegistrationPage'
import FoodRegistrationPage from './components/FoodRegistration/FoodRegistrationPage'
import LiquidRegistrationPage from './components/FoodRegistration/LiquidRegistrationPage';
import NeedsRegistrationPage from './components/PatientRegistration/NeedsRegistrationPage'
import PatientRegistrationPage from './components/PatientRegistration/PatientRegistrationPage';
import TodaysIntakePage from './components/todaysIntake/TodaysIntakePage';
import LiquidAmountRegistrationPage from './components/FoodRegistration/LiquidAmountRegistrationPage';
import MealRegistrationPage from './components/FoodRegistration/MealRegistrationPage';
import MealAmountRegistrationPage from './components/FoodRegistration/MealAmountRegistrationPage';
import SnackRegistrationPage from './components/FoodRegistration/SnackRegistrationPage';
import SnackAmountRegistrationPage from './components/FoodRegistration/SnackAmountRegistrationPage';
import DishRegistrationPage from './components/FoodRegistration/DishRegistrationPage';
import DishSpecifyPortionPage from './components/FoodRegistration/DishSpecifyPortionPage';
import DinnerMenuPage from './components/FoodRegistration/DinnerMenuPage';

import store from './store';

const pages = {
  'RegisterDinner': DinnerMenuPage,
  'RegisterDish': DishRegistrationPage,
  'RegisterDishAmount': DishSpecifyPortionPage,
  'RegisterFood': FoodRegistrationPage,
  'RegisterLiquid': LiquidRegistrationPage,
  'RegisterLiquidAmount': LiquidAmountRegistrationPage,
  'RegisterMeal': MealRegistrationPage,
  'RegisterMealAmount': MealAmountRegistrationPage,
  'RegisterNeeds': NeedsRegistrationPage,
  'RegisterPatient': PatientRegistrationPage,
  'RegisterSnack': SnackRegistrationPage,
  'RegisterSnackAmount': SnackAmountRegistrationPage,
  'StartPage': StartPage,
  'RegisterFever': FeverRegistrationPage,
  'TodaysIntake': TodaysIntakePage,
};

const Page = (props) => {
  const DisplayPage = pages[props.pageName];
  return <DisplayPage />
}

const ConnectedPage = connect(
  (state) => ({
    pageName: state.routing.pageStack[state.routing.pageStack.length - 1],
  }),
)(Page);

const ReduxApp = () => (
  <Provider store={store}>
    <ConnectedPage />
  </Provider>
);

export const registerApp = () => {
  AppRegistry.registerComponent('matinntak', () => ReduxApp);
};
