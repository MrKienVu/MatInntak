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

import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../NavigationBar'
import { showMealAmountPage, showPreviousPage, showRegisterFoodPage } from '../../actions';
import { SearchBar, GridLayout, GridItem } from './common';
import { colors } from '../../style';
import { meals } from './foodItems';

import type { Meal } from '../../logic/food';

class MealRegistrationPage extends Component {
  render() {
    return(
      <View style={{
        backgroundColor: colors.divider,
        flex: 1,
      }}>
        <NavigationBar currentPage="Frokost, lunsj og kveldsmat"
                       showFrontPage={this.props.showFrontPage}
                       goBack={this.props.showPreviousPage}
                       color={colors.meal}/>
        <ScrollView>
          <SearchBar placeholder="Søk etter matprodukter" color={colors.meal} />
          <GridLayout>{
            meals.map(meal => (
              <GridItem key={meal.name}
                        small={true}
                        color={colors.meal}
                        label={meal.name}
                        icon={meal.icon}
                        action={() => this.props.showMealAmountPage(meal)} />
            ))}
          </GridLayout>
        </ScrollView>
      </View>
    );
  }
}

const ConnectedPage = connect(
  () => ({}),
  (dispatch) => ({
    showMealAmountPage: (meal: Meal) => dispatch(showMealAmountPage(meal)),
    showPreviousPage: () => dispatch(showPreviousPage()),
    showFrontPage: () => dispatch(showRegisterFoodPage()),
  }),
)(MealRegistrationPage);

export default ConnectedPage;
