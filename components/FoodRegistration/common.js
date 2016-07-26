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
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, fontSize, dimens } from '../../style';
import type { Color } from '../../style';
import { icons } from '../../graphics';

const bigGrid = {width: 381, height: 220};
const smallGrid = {width: 252, height: 200};

export const AmountSelector = ({increase, decrease, amount, decrementerEnabled, color}: {
  amount: number,
  increase: () => void,
  decrease: () => void,
  decrementerEnabled: boolean,
  color: color,
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

export const Button = ({text, color, inverted, action, style}: {
  action?: () => void,
  color: Color,
  inverted?: boolean,
  style?: any,
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

export const BigButton = ({text, color, inverted, action}: {
  action?: () => void,
  color: Color,
  inverted?: boolean,
  text: string,
}) => (
  <Button text={text} color={color} inverted={inverted} action={action} style={{
    width: dimens.bigButton,
    paddingVertical: 20,
    fontWeight: inverted ? 'normal' : 'bold',
  }} />
);

const ImageButton = ({image, action, enabled, color}: {
  action: () => void,
  enabled?: boolean,
  image: string,
  color: Colors,
}) => (
  <TouchableOpacity activeOpacity={enabled ? 0.8 : 1} onPress={enabled ? action : null} style={{
    margin: 24,
  }}>
    <Icon name={image} size={70} color={enabled ? color : colors.lightGrey} />
  </TouchableOpacity>
);

export const SearchBar = ({color, placeholder}: {
  color?: string,
  placeholder?: string,
}) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 35,
    marginVertical: 30,
  }}>
    <TextInput
      placeholder={placeholder || ""}
      style={{
        backgroundColor: colors.inputFieldBackground,
        borderColor: color || colors.deepBlue,
        borderRadius: 5,
        borderWidth: 3,
        fontSize: fontSize.small,
        height: 60,
        paddingLeft: 30,
        width: 510,
      }}/>
    <TouchableOpacity>
      <Button text="Søk" small={true} color={color || colors.deepBlue}/>
    </TouchableOpacity>
  </View>
);

export const SeparatorText = ({text}: {text: string}) => (
  <Text style={{color: colors.darkGrey, fontSize: fontSize.small, fontStyle: 'italic'}}>
    {text}
  </Text>
);

export const SubTitle = ({text}) => (
  <Text style={{
    color: colors.darkGrey,
    fontSize: 36,
  }}>
    {text}
  </Text>
);

export const GridLayout = ({children}: {children?: any}) => (
  <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }}>
    {children}
    {
      Array.isArray(children) &&
      children.length % 3 != 0 &&
      <GridDummy />
    }
  </View>
);


export type MenuItem = { key: string, name: string, icon: string, action: () => void };

export class SelectableGridLayout extends Component {
  props: {
    items: Array<MenuItem>,
    defaultItem?: string,
    small?: boolean,
  };
  state: { selected: string };
  constructor(props: any) {
    super(props)
    this.state = { selected: this.props.defaultItem || '' }
  }
  selectItem: (item: MenuItem) => void = (item) => {
    if (item.key === this.state.selected) {
      this.setState({selected: ''});
    } else {
      this.setState({selected: item.key});
      item.action();
    }
  };
  render() {
    return (
      <GridLayout>{
        this.props.items.map(item => (
          <GridItem key={item.key}
                    small={this.props.small}
                    selected={item.key === this.state.selected}
                    label={item.name}
                    icon={item.icon}
                    action={() => this.selectItem(item)}
                    noFeedback={true} />
        ))}
      </GridLayout>
    );
  }
}

export const GridItem = ({label, icon, small, selected, action, noFeedback}: {
  action?: () => void,
  icon?: any,
  label?: string,
  noFeedback?: boolean,
  selected?: boolean,
  small?: boolean,
}) => (
  <GridView action={action} small={small} selected={selected} noFeedback={noFeedback}>
    <Icon size={72} name={icon ? icon : icons.placeholder} color={colors.darkGrey} />
    <Text style={{
      color: colors.deepBlue,
      fontSize: 22,
      marginTop: 20,
    }}>
      {label || "placeholder"}
    </Text>
  </GridView>
);

const GridDummy = () => (<View style={{width: smallGrid.width}}/>);

const GridView = ({small, selected, children, action, noFeedback}: {
  action?: () => void,
  children?: any,
  noFeedback?: boolean,
  selected?: boolean,
  small?: boolean,
}) => (
  <TouchableOpacity activeOpacity={noFeedback ? 1 : 0.8} onPress={action} style={{
    alignItems: 'center',
    backgroundColor: selected ? colors.selectedItem : colors.white,
    flexDirection: 'column',
    justifyContent: 'center',
    height: small ? smallGrid.height : bigGrid.height,
    width: small ? smallGrid.width : bigGrid.width,
    marginBottom: 6,
  }}>
    {children}
  </TouchableOpacity>
);
