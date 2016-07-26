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
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../style';
import { icons } from '../../graphics';
import { BigButton } from './common';

import type { Color } from '../../style';

export class SpecifyAmount extends Component {
  props: ({
    amount: number,
    color: Color,
    interval?: number,
    increaseAmount: () => void,
    decreaseAmount: () => void,
    cancelAction: () => void,
    confirmAction: () => void,
    text: string,
  });
  state: ({
    incrementerEnabled: boolean,
    decrementerEnabled: boolean,
    interval: number,
  });
  constructor(props: any) {
    super(props)
    this.state = {
      incrementerEnabled: true,
      decrementerEnabled: (this.props.amount > 0),
      interval: this.props.interval || 0.5,
    };
  }
  increase() {
    if (this.props.amount == 0)
      this.setState({decrementerEnabled: true});
    this.props.increaseAmount(this.state.interval);
  };
  decrease() {
    this.props.decreaseAmount(this.state.interval);
    if (this.props.amount <= (this.state.interval))
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
        <SubTitle text={this.props.text} />
        <AmountSelector increase={() => this.increase()}
                        decrease={() => this.decrease()}
                        amount={this.props.amount}
                        decrementerEnabled={this.state.decrementerEnabled}
                        color={this.props.color || colors.deepBlue} />
        <BigButton action={this.props.confirmAction}
                   color={this.props.color || colors.deepBlue}
                   text="Bekreft" />
        <BigButton action={this.props.cancelAction}
                   color={this.props.color || colors.deepBlue}
                   inverted={true}
                   text="Avbryt" />
      </View>
    );
  }
}

export const AmountSelector = ({increase, decrease, amount, decrementerEnabled, color}: {
  amount: number,
  increase: () => void,
  decrease: () => void,
  decrementerEnabled: boolean,
  color: Color,
}) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 32,
  }}>
    <ImageButton action={decrease} image={icons.decrement} enabled={decrementerEnabled} color={color} />
    <Text style={{
      color: color,
      fontSize: 52,
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center',
      width: 120,
    }}>
      {amount}
    </Text>
    <ImageButton action={increase} image={icons.increment} enabled={true} color={color} />
  </View>
);

const ImageButton = ({image, action, enabled, color}: {
  action: () => void,
  enabled?: boolean,
  image: string,
  color: Color,
}) => (
  <TouchableOpacity activeOpacity={enabled ? 0.8 : 1} onPress={enabled ? action : null} style={{
    margin: 24,
  }}>
    <Icon name={image} size={70} color={enabled ? color : colors.lightGrey} />
  </TouchableOpacity>
);

export const SubTitle = ({text}: {text: string}) => (
  <Text style={{
    color: colors.darkGrey,
    fontSize: 36,
  }}>
    {text}
  </Text>
);
