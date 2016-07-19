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
  View,
  ScrollView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../NavigationBar'
import { showPreviousPage, registerFood } from '../../actions';
import { Button, SearchBar, GridLayout, GridItem} from './common';
import { colors, fontSize } from '../../style';

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
  props: { liquids: Array<Liquid> };
  render() {
    return (
      <View style={{
        backgroundColor: colors.divider,
        flex: 1,
      }}>
        <NavigationBar currentPage="Drikke"
                       showFrontPage={this.props.registerFood}
                       goBack={this.props.showPreviousPage}
                       color={colors.deepBlue}/>
        <ScrollView>
        <SelectableGridLayout liquids={this.props.liquids}/>
        <View style={{
          marginVertical: 64,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 200,
        }}>
          <DynamicButton text="Registrer" color={colors.deepBlue} inverted={true} />
          <SeparatorText text="eller" />
          <DynamicButton text="Angi mengde" color={colors.green} />
        </View>
      </ScrollView>
      </View>
    );
  }
}

class DynamicButton extends Component {
  props: {text: string, small?: boolean, color?: Color, inverted?: boolean};
  state: {inverted: boolean}
  constructor(props) {
    super(props);
    this.state = {inverted: this.props.inverted};
  }
  invert() {
    this.setState({inverted: !this.state.inverted});
  }
  render() {
    return (
      <Text onPress={this.invert.bind(this)} style={{
        backgroundColor: this.state.inverted ? colors.transparent : this.props.color,
        borderColor: this.props.color,
        borderWidth: 2,
        borderRadius: 8,
        color: this.state.inverted ? this.props.color : colors.white,
        fontSize: fontSize.small,
        fontStyle: 'italic',
        overflow: 'hidden',
        paddingVertical: 14,
        textAlign: 'center',
        width: this.props.small ? 150 : 200,
      }}>
        {this.props.text}
      </Text>
    );
  }
}

export const SeparatorText = ({text}) => (
  <Text style={{fontSize: fontSize.small, fontStyle: 'italic'}}>
    {text}
  </Text>
);

export class SelectableGridLayout extends Component {
  props: { items: Array<any> }
  state: { selected: string };
  constructor() {
    super()
    this.state = { selected: null }
    console.log("Constructed.");
  }
  selectItem: (item: string) => void = (item) => {
    this.setState({selected: item})
    console.log("Selected item", item);
  };
  render() {
    return (
      <GridLayout>{
        this.props.liquids.map(liquid => (
            <GridItem key={liquid.name}
                      small={false}
                      selected={liquid.name == this.props.selected}
                      label={liquid.name}
                      icon={liquid.image}
                      action={() => this.selectItem(liquid.name)} />
      ))}
      </GridLayout>
    );
  }
}

export const HotLiquidRegistrationPage = () => (
  <ConnectedPage liquids={hotLiquids} />
);

export const ColdLiquidRegistrationPage = () => (
  <ConnectedPage liquids={coldLiquids} />
);

const ConnectedPage = connect(
  () => ({}),
  (dispatch) => ({
    registerFood: () => dispatch(registerFood()),
    showPreviousPage: () => dispatch(showPreviousPage()),
    registerLiquid: (amount: number) => {
      // TODO: Register liquid amount in store.
      console.log(amount);
      dispatch(registerFood());
    },
  }),
)(LiquidAmountRegistrationPage);
