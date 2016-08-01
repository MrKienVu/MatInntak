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
import {
  decreaseAmount,
  increaseAmount,
  selectAmount,
  showPreviousPage,
  showRegisterFoodPage,
  showTodaysIntakePage,
  registerFood,
} from '../../actions';

import { SpecifyAmount } from './SpecifyAmount';
import { Button, SelectableGridLayout, SeparatorText } from './common';
import { colors, dimens } from '../../style';
import { icons } from '../../graphics';
import { constructConsumedFoodItem } from './foodItems';

import type { MenuItem } from './common';
import type { Liquid } from './foodItems';

const quarterStep = 0.25;
const halfStep = 0.50;

function selectStep(liquid: Liquid) {
  return liquid.hot ? quarterStep : halfStep;
}

type Step = { key: string, icon: string, multiplier: number};
const steps: Array<Step> = [
  { key: 'Kvart', icon: icons.quarterGlass, multiplier: 1 },
  { key: 'Halvt', icon: icons.halfGlass, multiplier: 2 },
  { key: 'Trekvart', icon: icons.threeQuarterGlass, multiplier: 3 },
  { key: 'Helt', icon: icons.wholeGlass, multiplier: 4 },
];

function getSelectedItemKey(amountStep: number, amount: number): string {
  for (const item of steps) {
    if (item.multiplier * amountStep == amount) {
      return item.key;
    }
  }

  return '';
}

function getMenuItems(amountStep: number, selectAmount: (amount: number) => void): Array<MenuItem> {
  return steps.map(item => (
    {
      key: item.key,
      name: item.key + " (" + amountStep * item.multiplier + " dl)",
      icon: item.icon,
      action: () => selectAmount(amountStep * item.multiplier),
    }
  ));
}

class LiquidAmountRegistrationPage extends Component {
  props: {
    amount: number,
    amountStep: number,
    decreaseAmount: () => void,
    increaseAmount: () => void,
    liquid: Liquid,
    navBarTitle: string,
    navBarSubTitle: string,
    showRegisterFoodPage: () => void,
    registerLiquid: () => void,
    selectAmount: () => void,
    showPreviousPage: () => void,
  };
  state: {specify: boolean};
  constructor(props: any) {
    super(props);
    this.state = {specify: false};
  }
  enableSpecify = () => { this.setState({specify: true}) };
  disableSpecify = () => { this.setState({specify: false}) };
  selectAmount = (amount: number) => { this.props.selectAmount(amount); };
  registerLiquid = () => { this.props.registerLiquid(this.props.liquid, this.props.amount) };
  render() {
    return (
      <View style={{
        backgroundColor: colors.divider,
        flex: 1,
      }}>
      <NavigationBar currentPage={this.props.navBarTitle}
                     caption={this.props.navBarSubTitle}
                     showFrontPage={this.props.showRegisterFoodPage}
                     goBack={this.props.showPreviousPage}
                     color={colors.deepBlue} />
      { this.state.specify ?
        <SpecifyAmount amount={this.props.amount}
                       color={colors.deepBlue}
                       interval={this.props.amountStep}
                       cancelAction={this.disableSpecify}
                       increaseAmount={this.props.increaseAmount}
                       decreaseAmount={this.props.decreaseAmount}
                       confirmAction={this.registerLiquid}
                       text={"Angi mengde i dl"}/> :
        <PickAmount amount={this.props.amount}
                    amountStep={this.props.amountStep}
                    items={getMenuItems(this.props.amountStep, this.selectAmount)}
                    confirmAmount={this.registerLiquid}
                    specifyAction={this.enableSpecify} />
      }
      </View>
    );
  }
}

const PickAmount = ({amount, amountStep, items, confirmAmount, specifyAction}: {
  amount: number,
  amountStep: number,
  items: Array<MenuItem>,
  confirmAmount: () => void,
  specifyAction: () => void,
}) => (
  <ScrollView>
  <SelectableGridLayout items={items} defaultItem={getSelectedItemKey(amountStep, amount)} />
  <View style={{
    marginVertical: 64,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 200,
  }}>
  <Button action={confirmAmount}
          text="Registrer"
          color={colors.deepBlue}
          style={{fontWeight: 'bold', width: dimens.mediumButton}} />
  <SeparatorText text="eller" />
  <Button text="Angi mengde"
          color={colors.deepBlue}
          style={{width: dimens.mediumButton}} inverted={true} action={specifyAction} />
  </View>
  </ScrollView>
);

const ConnectedPage = connect(
  (state) => ({
    navBarTitle: state.routing.navBarTitle,
    navBarSubTitle: state.routing.navBarSubTitle,
    amount: state.amountSelector.value,
    liquid: state.routing.liquid,
    amountStep: selectStep(state.routing.liquid),
  }),
  (dispatch) => ({
    showRegisterFoodPage: () => dispatch(showRegisterFoodPage()),
    showPreviousPage: () => dispatch(showPreviousPage()),
    increaseAmount: (amountStep: number) => dispatch(increaseAmount(amountStep)),
    decreaseAmount: (amountStep: number) => dispatch(decreaseAmount(amountStep)),
    selectAmount: (amount: number) => {
      dispatch(selectAmount(amount));
    },
    registerLiquid: (liquid: Liquid, amount: number) => {


      console.log("Registered liquid:", liquid.name, amount);
      dispatch(registerFood(constructConsumedFoodItem('Liquid', liquid, amount)));
      dispatch(showTodaysIntakePage());
    },
  }),
)(LiquidAmountRegistrationPage);

export default ConnectedPage;
