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
  View,
  Text,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
//import type { Ml } from '../logic';
import NavigationBar from './NavigationBar'
import { showFrontPage } from '../actions';
import { SearchBar } from './common';
import { colors } from '../style';

const liquids = [
  ['Kaffe', require('../img/dinner.png')],
  ['Te', require('../img/dinner.png')],
  ['Melk', require('../img/dinner.png')],
  ['Juice', require('../img/dinner.png')],
  ['Saft', require('../img/dinner.png')],
  ['Vann', require('../img/dinner.png')],
  ['Brus', require('../img/dinner.png')],
];

class RegistrationLiquid extends Component {
  render() {
    return (
      <View style={{
        backgroundColor: colors.divider,
        flex: 1,
      }}>
        <NavigationBar currentPage="Drikke"
                       showFrontPage={this.props.showFrontPage}
                       goBack={this.props.showFrontPage}
                       color={colors.deepBlue}/>
        <ScrollView>
        <SearchBar placeholder="Søk etter matprodukter"/>
        <GridLayout>{
          liquids.map(liquid => (
            <GridItem key={liquid[0]} small={true} label={liquid[0]} icon={liquid[1]} />
          ))}
        </GridLayout>
        </ScrollView>
      </View>
    );
  }
}

const GridLayout = (props: {children?: any}) => (
  <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
  }}>
    {props.children}
  </View>
);

const GridItem = (props: {label?: string, icon?: any, small?: boolean}) => (
  <View style={{
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    width: props.small ? 250 : 378,
    height: 200,
    marginRight: 6,
    marginBottom: 6,
  }}>
    <Image source={props.icon ? props.icon : require('../img/dinner.png')} />
    <Text style={{
      color: colors.deepBlue,
      fontSize: 22,
      marginTop: 20,
    }}>
      {props.label ? props.label : "placeholder"}
    </Text>
  </View>
);

const ConnectedPage = connect(
  () => ({}),
  (dispatch) => ({
    showFrontPage: () => dispatch(showFrontPage()),
  }),
)(RegistrationLiquid);

export default ConnectedPage;
