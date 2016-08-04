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
  ScrollView,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../NavigationBar'
import {
  registerFood,
  selectAmount,
  showDishAmountPage,
  showPreviousPage,
  showRegisterFoodPage,
  showTodaysIntakePage,
  registerAmount,
} from '../../actions';
import { colors, dimens } from '../../style';
import { icons } from '../../graphics';
import { dish } from './foodItems';
import { Button, SelectableGridLayout, SeparatorText } from './common';
import { constructConsumedFoodItem } from '../../logic/food';

import type { MenuItem } from './common';
import type { Dish } from '../../logic/food';

type Portion = { key: string, icon: string, size: number};
const portions: Array<Portion> = [
  { key: 'Kvart', icon: icons.quarterGlass, size: 0.25 },
  { key: 'Halvt', icon: icons.halfGlass, size: 0.5 },
  { key: 'Trekvart', icon: icons.threeQuarterGlass, size: 0.75 },
  { key: 'Hel', icon: icons.wholeGlass, size: 1 },
];

function getDishPortions(selectAmount: (portion: number) => void) : Array<MenuItem> {
  return portions.map(item => (
    {
      key: item.key,
      name: item.key,
      icon: item.icon,
      action: () => selectAmount(item.size),
    }
  ));
}

class DishRegistrationPage extends Component {
  props: {
    portion: number,
    dish: Array<Dish>,
    registerDish: () => void,
    showFrontPage: () => void,
    showDishAmountPage: () => void,
    showPreviousPage: () => void,
    selectAmount: (portion: number) => void,
  };
  constructor(props: any) {
    super(props);
  };
  showDishAmountPage = () => { this.props.showDishAmountPage(); };
  registerDish = () => { this.props.registerDish(this.props.dish[0], this.props.portion); };
  selectAmount = (portion: number) => {this.props.selectAmount(portion); };
  render() {
    return (
      <View style={{
        backgroundColor: colors.divider,
        flex: 1,
      }}>
        <NavigationBar currentPage="Middag"
                       showFrontPage={this.props.showFrontPage}
                       goBack={this.props.showPreviousPage}
                       color={colors.dinner} />
        <ScrollView>
          <View style={{
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
             <Text style={{
               color: colors.darkGrey,
               fontSize: 36,
               marginTop: 30}}>
               {'En hel porsjon består av:'} </Text>
             <Text style={{
               color: colors.darkGrey,
               fontSize: 20,
               marginTop: 20,
               marginBottom: 20}}>
               { dish.map(dish =>
                ((dish.quantity) + ' ' + dish.name.toLowerCase() + ', ')) }
               </Text>
          </View>
          <View style={{height: 6, backgroundColor: colors.divider}}/>
          <SelectableGridLayout color={colors.dinner} items={getDishPortions(this.selectAmount)} />
          <View style={{
            marginVertical: 64,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: 160,
          }}>
              <Button action={this.registerDish}
                      text="Registrer"
                      color={colors.dinner}
                      style={{fontWeight: 'bold', width: dimens.bigButton}} />
              <SeparatorText text="eller" />
              <Button action={this.showDishAmountPage}
                      text="Bare spist deler av retten"
                      color={colors.dinner}
                      style={{fontStyle: 'italic', width: dimens.bigButton}}
                      inverted={true} />
          </View>
        </ScrollView>
      </View>
    );
  }
}



const ConnectedPage = connect(
  (state) => ({
    dish: dish,
    portion: state.amountSelector.value,
  }),
  (dispatch) => ({
    showFrontPage: () => dispatch(showRegisterFoodPage()),
    showPreviousPage: () => dispatch(showPreviousPage()),
    showDishAmountPage: (dish: Dish) => {
      dispatch(registerAmount(dish));
      dispatch(showDishAmountPage(dish.name));
    },
    selectAmount: (portion: number) => { dispatch(selectAmount(portion)); },
    registerDish: (dish: Dish, amount: number) => {
      dispatch(registerFood(constructConsumedFoodItem('Dish', dish, amount)));
      dispatch(showTodaysIntakePage());
    },
  }),
)(DishRegistrationPage);

export default ConnectedPage;
