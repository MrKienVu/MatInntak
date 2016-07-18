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
import NeedsRegistrationPage from './components/PatientRegistration/NeedsRegistrationPage'
import PatientRegistrationPage from './components/PatientRegistration/PatientRegistrationPage';
import LiquidRegistrationPage from './components/FoodRegistration/LiquidRegistrationPage';
import store from './store';

const pages = {
  'RegisterLiquid': LiquidRegistrationPage,
  'RegisterPatient': PatientRegistrationPage,
  'RegisterNeeds': NeedsRegistrationPage,
  'StartPage': StartPage,
};

const Page = (props) => {
  const DisplayPage = pages[props.pageName];
  return <DisplayPage />
}

const ConnectedPage = connect(
  (state) => ({
    pageName: state.routing.name,
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
