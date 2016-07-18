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
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../NavigationBar'
import { showFrontPage } from '../../actions';
import { SearchBar, GridLayout, GridItem } from './common';
import { colors } from '../../style';

type Liquid = {name: string, image: number}
const liquids: Array<Liquid> = [
  { name: 'Kaffe', image: require('../../img/dinner.png') },
  { name: 'Te', image: require('../../img/dinner.png') },
  { name: 'Melk', image: require('../../img/dinner.png') },
  { name: 'Juice', image: require('../../img/dinner.png') },
  { name: 'Saft', image: require('../../img/dinner.png') },
  { name: 'Vann', image: require('../../img/dinner.png') },
  { name: 'Brus', image: require('../../img/dinner.png') },
];

class LiquidRegistrationPage extends Component {
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
            <GridItem key={liquid.name} small={true} label={liquid.name} icon={liquid.image} />
          ))}
        </GridLayout>
        </ScrollView>
      </View>
    );
  }
}

const ConnectedPage = connect(
  () => ({}),
  (dispatch) => ({
    showFrontPage: () => dispatch(showFrontPage()),
  }),
)(LiquidRegistrationPage);

export default ConnectedPage;
