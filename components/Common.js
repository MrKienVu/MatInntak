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
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, fontSize } from '../style';

export const Button = (props: {text: string}) => (
  <View style={{marginBottom: 15}}>
  <Text style={{marginTop: 60, fontSize: fontSize.small, color: colors.white, backgroundColor: colors.deepBlue, paddingLeft: 20,
                paddingTop: 16, paddingRight: 20, paddingBottom: 16, fontStyle: 'italic',
                borderRadius: 5, overflow: 'hidden', width: 250, textAlign: 'center'}}>
    {props.text}
  </Text>
  </View>
);

export const Divider = () => <View style={{marginTop: 30, height: 6, backgroundColor: colors.divider}}/>;

export const Header = (props: {text: string}) => (
  <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 32, marginBottom: 20}}>
    {props.text}
  </Text>
);

export const InputField = (props: { optional?: boolean, small?: boolean, numeric?: boolean, label?: string, placeholder?: string, onChange: (value: number) => void}) => (
  <View style={{flexDirection: 'row'}}>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TextInput onChange={(event) => props.onChange(event.nativeEvent.text)} placeholder={props.placeholder || ""}
                 style={{width: props.small ? 140 : 685, height: 60, backgroundColor: colors.inputFieldBackground,
                        borderRadius: 8, fontSize: fontSize.small, padding: 10, marginBottom: 15,
                       borderColor: colors.inputFieldBorder, borderWidth: 3}}
                 keyboardType={props.numeric ? 'number-pad' : 'default'}
                 accessibilityLabel={props.label || props.placeholder }
                       />
      <Required optional={props.optional} />
    </View>
  </View>
);

export const Required = (props: {optional?: boolean}) => (
  <View style={{marginHorizontal: 8, width: 10}}>
    {!props.optional &&
      <Text style={{color: colors.red, fontSize: fontSize.small}}>*</Text>
    }
  </View>
);

export const Section = (props: {children?: React.Element<*> | Array<React.Element<*>>}) => (
  <View style={{marginLeft: 30, marginRight: 30}}>
    {props.children}
  </View>
);

export const Question = (props: {name?: string, children?: any, style?: any}) => (
  <View accessibilityLabel={props.name}>
  {props.name &&
    <Text style={[{fontSize: fontSize.small, marginBottom: 20}, props.style]}>
      {props.name}:
    </Text>
  }
  {props.children}
  </View>
);
