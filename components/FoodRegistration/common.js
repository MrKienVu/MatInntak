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
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fontSize } from '../../style';

export const Button = (props: {text: string, small?: boolean, color?: Color}) => (
  <Text style={{
    backgroundColor: props.color || colors.deepBlue,
    borderRadius: 8,
    color: colors.white,
    fontSize: fontSize.small,
    fontStyle: 'italic',
    overflow: 'hidden',
    paddingVertical: 15,
    textAlign: 'center',
    width: props.small ? 150 : 200,
  }}>
    {props.text}
  </Text>
);

export const CenterButton = (props: {text?: string, style?: any}) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 64,
    ...props.style,
  }}>
    <Button text={props.text}/>
  </View>
);

export const SearchBar = (props: {placeholder?: string}) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 35,
    marginVertical: 30,
  }}>
    <TextInput
      placeholder={props.placeholder || ""}
      style={{
        backgroundColor: colors.inputFieldBackground,
        borderColor: colors.deepBlue,
        borderRadius: 5,
        borderWidth: 3,
        fontSize: fontSize.small,
        height: 60,
        paddingLeft: 30,
        width: 510,
      }}/>
    <TouchableOpacity>
      <Button text="Søk" small={true}/>
    </TouchableOpacity>
  </View>
);

export const GridLayout = (props: {children?: any}) => (
  <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
  }}>
    {props.children}
  </View>
);

export const GridItem = (props: {label?: string, icon?: any, small?: boolean, selected?: boolean, action?: () => void}) => (
  <TouchableOpacity onPress={() => {
      props.action();
    }}>
  <GridView small={props.small} selected={props.selected}>
    <Image resizeMode='contain' source={props.icon ? props.icon : require('../../img/dinner.png')} />
    <Text style={{
      color: colors.deepBlue,
      fontSize: 22,
      marginTop: 20,
    }}>
      {props.label || "placeholder"}
    </Text>
  </GridView>
  </TouchableOpacity>
);

const GridView = (props: {small?: boolean, selected?: boolean, children?: any}) => (
  <View style={{
    alignItems: 'center',
    backgroundColor: props.selected ? 'rgb(245, 245, 245)' : colors.white,
    flexDirection: 'column',
    justifyContent: 'center',
    width: props.small ? 250 : 378,
    height: props.small ? 200 : 240,
    marginHorizontal: 3,
    marginBottom: 6,
  }}>
    {props.children}
  </View>
);
