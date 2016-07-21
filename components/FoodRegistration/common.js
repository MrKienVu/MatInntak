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
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fontSize, dimens } from '../../style';

const bigGrid = {width: 381, height: 220};
const smallGrid = {width: 252, height: 200};

export const Button = ({text, color, inverted, action, style}: {
  action?: () => void,
  color: Color,
  inverted?: boolean,
  text: string,
}) => (
  <Text onPress={action} style={{
    backgroundColor: inverted ? colors.transparent : color,
    borderColor: color,
    borderWidth: 2,
    borderRadius: 8,
    color: inverted ? color : colors.white,
    fontSize: fontSize.small,
    overflow: 'hidden',
    paddingVertical: 14,
    textAlign: 'center',
    width: dimens.smallButton,
    ...style,
  }}>
    {text}
  </Text>
);

export const BigButton = ({text, color, inverted, action}) => (
  <Button text={text} color={color} inverted={inverted} action={action} style={{
    width: dimens.bigButton,
    paddingVertical: 20,
    fontWeight: inverted ? 'normal' : 'bold',
  }} />
);

export const SearchBar = (props: {placeholder?: string, color?: string}) => (
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
      <Button text="Søk" small={true} color={props.color || colors.deepBlue}/>
    </TouchableOpacity>
  </View>
);

export const GridLayout = (props: {children?: any}) => (
  <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }}>
    {props.children}
    {
      Array.isArray(props.children) &&
      props.children.length % 3 != 0 &&
      <GridDummy />
    }
  </View>
);

export class SelectableGridLayout extends Component {
  props: { items: Array<any>, small?: boolean }
  state: { selected: string };
  constructor() {
    super()
    this.state = { selected: null }
  }
  selectItem: (item: string) => void = (item) => {
    this.setState({selected: item})
  };
  render() {
    return (
      <GridLayout>{
        this.props.items.map(item => (
          <GridItem key={item.name}
                    small={this.props.small}
                    selected={item.name == this.state.selected}
                    label={item.name}
                    icon={item.image}
                    action={() => this.selectItem(item.name)}
                    noFeedback={true} />
        ))}
      </GridLayout>
    );
  }
}

export const GridItem = (props: {label?: string, icon?: any, small?: boolean,
                                         selected?: boolean, action?: () => void, noFeedback?: boolean}) => (
  <GridView action={props.action} small={props.small} selected={props.selected} noFeedback={props.noFeedback}>
    <Image resizeMode='contain' source={props.icon ? props.icon : require('../../img/dinner.png')} />
    <Text style={{
      color: colors.deepBlue,
      fontSize: 22,
      marginTop: 20,
    }}>
      {props.label || "placeholder"}
    </Text>
  </GridView>
);

const GridDummy = () => (<View style={{width: smallGrid.width}}/>);

const GridView = (props: {small?: boolean, selected?: boolean, children?: any, action?: () => void, noFeedback?: boolean}) => (
  <TouchableOpacity activeOpacity={props.noFeedback ? 1 : 0.8} onPress={props.action} style={{
    alignItems: 'center',
    backgroundColor: props.selected ? 'rgb(245, 245, 245)' : colors.white,
    flexDirection: 'column',
    justifyContent: 'center',
    height: props.small ? smallGrid.height : bigGrid.height,
    width: props.small ? smallGrid.width : bigGrid.width,
    marginBottom: 6,
  }}>
    {props.children}
  </TouchableOpacity>
);
