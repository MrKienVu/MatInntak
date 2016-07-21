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

import React, { Component } from 'react';
import {
  Image,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from '../NavigationBar'
import { showPreviousPage, registerFood, increaseAmount, decreaseAmount } from '../../actions';
import { Button, BigButton, SelectableGridLayout } from './common';
import { colors, fontSize, icons, dimens } from '../../style';

type Liquid = {name: string, image: number}
const coldLiquids: Array<Liquid> = [
  { name: 'Kvart (0,5 dl)', image: require('../../img/dinner.png'), amount: 0.5 },
  { name: 'Halvt (1 dl)', image: require('../../img/dinner.png'), amount: 1 },
  { name: 'Trekvart (1,5 dl)', image: require('../../img/dinner.png'), amount: 1.5 },
  { name: 'Helt (2 dl)', image: require('../../img/dinner.png'), amount: 2 },
];

const hotLiquids: Array<Liquid> = [
  { name: 'Kvart (xx dl)', image: require('../../img/dinner.png'), amount: 0.5 },
  { name: 'Halvt (xx dl)', image: require('../../img/dinner.png'), amount: 1 },
  { name: 'Trekvart (xx dl)', image: require('../../img/dinner.png'), amount: 1.5 },
  { name: 'Helt (xx dl)', image: require('../../img/dinner.png'), amount: 2 },
];

class LiquidAmountRegistrationPage extends Component {
  props: {navBarTitle: string,
          navBarSubTitle: string,
          registerFood: () => void,
          showPreviousPage: () => void,
          increaseAmount: () => void,
          decreaseAmount: () => void,
          amount: number,
  };
  state: {specify: boolean};
  constructor(props) {
    super(props);
    this.state = {specify: false};
  }
  enableSpecify = () => { this.setState({specify: true}) };
  disableSpecify = () => { this.setState({specify: false}) };
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
                     color={colors.deepBlue} />
      { this.state.specify ?
        <SpecifyAmount amount={this.props.amount}
                       cancelAction={this.disableSpecify}
                       increaseAmount={this.props.increaseAmount}
                       decreaseAmount={this.props.decreaseAmount} /> :
        <PickAmount liquids={this.props.liquids}
                    specifyAction={this.enableSpecify}/>
      }
      </View>
    );
  }
}

const PickAmount = ({liquids, specifyAction}: {liquids: Array<any>, specifyAction: () => void}) => (
  <ScrollView>
  <SelectableGridLayout items={liquids} />
  <View style={{
    marginVertical: 64,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 200,
  }}>
  <Button text="Registrer"
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
    increaseAmount: () => void,
    decreaseAmount: () => void,
    cancelAction: () => void,
  });
  state: ({incrementerEnabled: boolean, decrementerEnabled: boolean});
  constructor(props) {
    super(props)
    this.state = {
      incrementerEnabled: true,
      decrementerEnabled: (this.props.amount > 0),
    };
  }
  increase() {
    if (this.props.amount == 0)
      this.setState({decrementerEnabled: true});
    this.props.increaseAmount();
  };
  decrease() {
    this.props.decreaseAmount();
    if (this.props.amount == 0.5)
      this.setState({decrementerEnabled: false});
  };
  confirm() {
    console.log('Confirmed amount:' , this.props.amount);
  }
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
        <BigButton action={() => this.confirm()}
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

const AmountSelector = ({increase, decrease, amount, decrementerEnabled}:
                        {increase: () => void, decrease: () => void,
                         amount: number, decrementerEnabled: boolean}) => (
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

const ImageButton = ({image, action, enabled}: {image: string, action: () => void, enabled?: boolean}) => (
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

export const SeparatorText = ({text}) => (
  <Text style={{color: colors.darkGrey, fontSize: fontSize.small, fontStyle: 'italic'}}>
    {text}
  </Text>
);
/*
export const PickHotLiquid = () => (
  <ConnectedPage liquids={hotLiquids} />
);

export const PickColdLiquid = () => (
  <ConnectedPage liquids={coldLiquids} />
);
*/
const ConnectedPage = connect(
  (state) => ({
    navBarTitle: state.routing.navBarTitle,
    navBarSubTitle: state.routing.navBarSubTitle,
    amount: state.amountCounter.value,
    liquids: hotLiquids,
  }),
  (dispatch) => ({
    registerFood: () => dispatch(registerFood()),
    showPreviousPage: () => dispatch(showPreviousPage()),
    increaseAmount: () => dispatch(increaseAmount()),
    decreaseAmount: () => dispatch(decreaseAmount()),
    registerLiquid: (amount: number) => {
      console.log(amount);
      dispatch(registerFood());
    },
  }),
)(LiquidAmountRegistrationPage);

export default ConnectedPage;
