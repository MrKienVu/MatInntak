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
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { colors, fontSize } from '../../style';
import { resetApp, registerLiquid, showTodaysIntakePage } from '../../actions';

const backgroundSource = require('../../img/food-registration-background.png');

type Category = { name: string, image: any };
const meal: Category = { name: 'Frokost, lunsj og kveldsmat', image: require('../../img/1-1-frokostlunsj.png') };
const snack: Category = { name: 'Mellommåltid', image: require('../../img/1-4-mellommaltid.png') };
const dinner: Category = { name: 'Middag', image: require('../../img/1-3-middag.png') };
const liquid: Category = { name: 'Drikke', image: require('../../img/1-5-drikke.png') };
const consumption: Category = { name: 'Dagens inntak', image: require('../../img/1-2-dagbok.png') };

class FoodRegistrationPage extends Component {
  render() {
    return (
      <FoodRegistrationMenu>
        <MenuRow>
          <CategorizedMenuItem category={meal} action={this.props.resetApp}/>
          <CategorizedMenuItem category={snack} />
        </MenuRow>
        <MenuRow style={{marginHorizontal: -150}}>
          <CategorizedMenuItem category={dinner} />
          <CategorizedMenuItem category={liquid} action={this.props.registerLiquid} />
        </MenuRow>
        <MenuRow style={{marginTop: -50}}>
          <CategorizedMenuItem category={consumption} action={this.props.showTodaysIntake}/>
        </MenuRow>
      </FoodRegistrationMenu>
    );
  }
}

const FoodRegistrationMenu = (props: {children?: any}) => (
  <View style={{backgroundColor: colors.deepBlue, flex: 1}}>
  <Image source={backgroundSource}
         style={{flex: 1, width: null, height: null}}>
    <View style={{
      backgroundColor: colors.transparent,
      flex: 1,
      flexDirection: 'column',
    }}>
      {props.children}
    </View>
  </Image>
  </View>
)

const MenuRow = (props: {children?: any, style?: any}) => (
  <View style={{
    flexDirection: 'row',
    marginTop: 90,
    justifyContent: 'space-around',
    ...props.style,
  }}>
    {props.children}
  </View>
)

const CategorizedMenuItem = (props: {category?: Category, action?: () => void}) => (
  <MenuItem text={(props.category && props.category.name) || 'placeholder'}
            image={(props.category && props.category.image) || '../../img/dinner.png'}
            action={props.action} />
);

const MenuItem = (props: {text: string, image?: any, action?: () => void}) => (
  <TouchableOpacity onPress={props.action}>
  <View style={{
    alignItems: 'center',
    width: 260,
  }}>
    <Image source={props.image || require('../../img/dinner.png')} />
    <Text style={{
      color: colors.white,
      fontSize: fontSize.large,
      fontWeight: 'bold',
      marginTop: -30,
      textAlign: 'center',
    }}>
      {props.text}
    </Text>
  </View>
  </TouchableOpacity>
);

const ConnectedPage = connect(
  () => ({}),
  (dispatch) => ({
    resetApp: () => dispatch(resetApp()),
    registerLiquid: () => dispatch(registerLiquid()),
    showTodaysIntake: () => dispatch(showTodaysIntakePage()),
  }),
)(FoodRegistrationPage);

export default ConnectedPage;
