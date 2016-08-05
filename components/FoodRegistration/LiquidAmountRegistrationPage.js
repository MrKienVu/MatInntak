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
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import NavigationBar from '../NavigationBar';
import { SpecifyAmount } from './SpecifyAmount';
import { Button, SelectableGridLayout, SeparatorText } from './common';
import { amountRegistrationState, amountRegistrationDispatcher } from './amountRegistration';
import { colors, dimens } from '../../style';
import { icons } from '../../graphics';

import type { MenuItem } from './common';
import type { Liquid, ConsumedFoodItem } from '../../logic/food';

type Step = { key: string, icon: string, multiplier: number};
const steps: Array<Step> = [
  { key: 'Kvart', icon: icons.quarterGlass, multiplier: 1 },
  { key: 'Halvt', icon: icons.halfGlass, multiplier: 2 },
  { key: 'Trekvart', icon: icons.threeQuarterGlass, multiplier: 3 },
  { key: 'Helt', icon: icons.wholeGlass, multiplier: 4 },
];

function getSelectedItemKey(amountStep: number, amount: number): string {
  const selectedItem = steps.find(item => (item.multiplier * amountStep === amount));
  return selectedItem ? selectedItem.key : '';
}

function getMenuItems(amountStep: number, selectAmount: (amount: number) => void): Array<MenuItem> {
  return steps.map(item => ({
    key: item.key,
    name: item.key + " (" + amountStep * item.multiplier + " dl)",
    icon: item.icon,
    action: () => selectAmount(amountStep * item.multiplier),
  }));
}

function selectStep(liquid: Liquid) {
  return liquid.hot ? 0.25 : 0.5;
}

class LiquidAmountRegistrationPage extends Component {
  props: {
    amount: number,
    decreaseAmount: () => void,
    increaseAmount: () => void,
    editing: boolean,
    item: Liquid,
    consumedItem: ConsumedFoodItem,
    navBarTitle: string,
    navBarSubTitle: string,
    showRegisterFoodPage: () => void,
    selectAmount: () => void,
    showPreviousPage: () => void,
    editItem: () => void,
    registerItem: () => void,
  };
  state: {
    specify: boolean,
    amountStep: number,
  };
  constructor(props: any) {
    super(props);
    this.state = {
      specify: false,
      amountStep: selectStep(this.props.item),
    };
  }
  enableSpecify = () => { this.setState({specify: true}) };
  disableSpecify = () => { this.setState({specify: false}) };
  selectAmount = (amount: number) => {
    amount === this.props.amount ? this.props.selectAmount(0) :
                                   this.props.selectAmount(amount);
  };
  confirmAmount = () => {
    this.props.editing ? this.props.editItem(this.props.consumedItem, this.props.amount) :
                         this.props.registerItem(this.props.item, this.props.amount)
  };
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
                       interval={this.state.amountStep}
                       cancelAction={this.disableSpecify}
                       increaseAmount={this.props.increaseAmount}
                       decreaseAmount={this.props.decreaseAmount}
                       confirmAction={this.confirmAmount}
                       text={"Angi mengde i dl"}/> :
        <PickAmount amount={this.props.amount}
                    amountStep={this.state.amountStep}
                    items={getMenuItems(this.state.amountStep, this.selectAmount)}
                    confirmAmount={this.confirmAmount}
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
  <SelectableGridLayout color={colors.liquid} items={items} defaultItem={getSelectedItemKey(amountStep, amount)} />
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
          disabled={amount === 0}
          style={{fontWeight: 'bold', width: dimens.mediumButton}} />
  <SeparatorText text="eller" />
  <Button text="Angi mengde"
          color={colors.deepBlue}
          style={{width: dimens.mediumButton}} inverted={true} action={specifyAction} />
  </View>
  </ScrollView>
);

const ConnectedPage = connect(
  (state) => amountRegistrationState(state),
  (dispatch) => amountRegistrationDispatcher(dispatch, 'Liquid'),
)(LiquidAmountRegistrationPage);

export default ConnectedPage;
