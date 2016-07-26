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
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from '../NavigationBar'
import {
  showPreviousPage,
  registerFood,
  increaseAmount,
  decreaseAmount,
  selectAmount,
  showTodaysIntakePage,
} from '../../actions';
import { Button, BigButton, SelectableGridLayout } from './common';
import { colors, fontSize, dimens } from '../../style';
import { icons } from '../../graphics';

import type { MenuItem } from './common';
import type { Liquid } from './liquid';

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
  props: {navBarTitle: string,
          navBarSubTitle: string,
          registerFood: () => void,
          registerLiquid: () => void,
          showPreviousPage: () => void,
          increaseAmount: () => void,
          decreaseAmount: () => void,
          selectAmount: () => void,
          amount: number,
          amountStep: number,
          liquid: Liquid,
  };
  state: {specify: boolean};
  constructor(props: any) {
    super(props);
    this.state = {specify: false};
  }
  enableSpecify = () => { this.setState({specify: true}) };
  disableSpecify = () => { this.setState({specify: false}) };
  selectAmount = (amount: number) => { this.props.selectAmount(amount); };
  confirmAmount = () => { this.props.registerLiquid(this.props.liquid, this.props.amount) };
  render() {
    return (
      <View style={{
        backgroundColor: colors.divider,
        flex: 1,
      }}>
      <NavigationBar currentPage={this.props.navBarTitle}
                     caption={this.props.navBarSubTitle}
                     showFrontPage={this.props.registerFood}
                     goBack={this.props.showPreviousPage}
                     color={colors.deepBlue}
                     confirmAmount={() => this.confirmAmount()} />
      { this.state.specify ?
        <SpecifyAmount amount={this.props.amount}
                       amountStep={this.props.amountStep}
                       cancelAction={this.disableSpecify}
                       increaseAmount={this.props.increaseAmount}
                       decreaseAmount={this.props.decreaseAmount}
                       confirmAmount={this.confirmAmount} /> :
        <PickAmount amount={this.props.amount}
                    amountStep={this.props.amountStep}
                    items={getMenuItems(this.props.amountStep, this.selectAmount)}
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
  <SelectableGridLayout items={items} defaultItem={getSelectedItemKey(amountStep, amount)} />
  <View style={{
    marginVertical: 64,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 200,
  }}>
  <Button action={() => confirmAmount()}
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

class SpecifyAmount extends Component {
  props: ({
    amount: number,
    amountStep: number,
    increaseAmount: () => void,
    decreaseAmount: () => void,
    cancelAction: () => void,
    confirmAmount: () => void,
  });
  state: ({incrementerEnabled: boolean, decrementerEnabled: boolean});
  constructor(props: any) {
    super(props)
    this.state = {
      incrementerEnabled: true,
      decrementerEnabled: (this.props.amount > 0),
    };
  }
  increase() {
    if (this.props.amount == 0)
      this.setState({decrementerEnabled: true});
    this.props.increaseAmount(this.props.amountStep);
  };
  decrease() {
    this.props.decreaseAmount(this.props.amountStep);
    if (this.props.amount == 0)
      this.setState({decrementerEnabled: false});
  };
  render() {
    return (
      <View style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 64,
        height: 460,
      }}>
        <SubTitle text="Angi mengde i dl" />
        <AmountSelector increase={() => this.increase()}
                        decrease={() => this.decrease()}
                        amount={this.props.amount}
                        decrementerEnabled={this.state.decrementerEnabled} />
        <BigButton action={this.props.confirmAmount}
                   color={colors.deepBlue}
                   text="Bekreft" />
        <BigButton action={this.props.cancelAction}
                   color={colors.deepBlue}
                   inverted={true}
                   text="Avbryt" />
      </View>
    );
  }
}

const AmountSelector = ({increase, decrease, amount, decrementerEnabled}: {
  amount: number,
  increase: () => void,
  decrease: () => void,
  decrementerEnabled: boolean,
}) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 32,
  }}>
    <ImageButton action={decrease} image={icons.decrement} enabled={decrementerEnabled} />
    <Text style={{
      color: colors.deepBlue,
      fontSize: 52,
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center',
      width: 120,
    }}>
      {amount}
    </Text>
    <ImageButton action={increase} image={icons.increment} enabled={true} />
  </View>
);

const ImageButton = ({image, action, enabled}: {
  action: () => void,
  enabled?: boolean,
  image: string,
}) => (
  <TouchableOpacity activeOpacity={enabled ? 0.8 : 1} onPress={enabled ? action : null} style={{
    margin: 24,
  }}>
    <Icon name={image} size={70} color={enabled ? colors.deepBlue : colors.lightGrey} />
  </TouchableOpacity>
);

const SubTitle = ({text}) => (
  <Text style={{
    color: colors.darkGrey,
    fontSize: 36,
  }}>
    {text}
  </Text>
);

export const SeparatorText = ({text}: {text: string}) => (
  <Text style={{color: colors.darkGrey, fontSize: fontSize.small, fontStyle: 'italic'}}>
    {text}
  </Text>
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
    registerFood: () => dispatch(registerFood()),
    showPreviousPage: () => dispatch(showPreviousPage()),
    increaseAmount: (amountStep: number) => dispatch(increaseAmount(amountStep)),
    decreaseAmount: (amountStep: number) => dispatch(decreaseAmount(amountStep)),
    selectAmount: (amount: number) => {
      console.log('Selected amount:', amount);
      dispatch(selectAmount(amount));
    },
    registerLiquid: (liquid: Liquid, amount: number) => {
      console.log("Registered liquid:", liquid.name, amount);
      dispatch(showTodaysIntakePage());
    },
  }),
)(LiquidAmountRegistrationPage);

export default ConnectedPage;
