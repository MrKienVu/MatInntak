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
 import { View } from 'react-native';
 import { connect } from 'react-redux';
 import NavigationBar from '../NavigationBar'
 import { colors } from '../../style';
 import {
   decreaseAmount,
   increaseAmount,
   showRegisterFoodPage,
   showPreviousPage,
   showTodaysIntakePage,
   registerFood,
 } from '../../actions';
 import { SpecifyAmount } from './SpecifyAmount';
 import { constructConsumedFoodItem } from './foodItems';

 import type { Snack } from './foodItems';

class SnackAmountRegistrationPage extends Component {
  props: ({
    amount: number,
    decreaseAmount: () => void,
    increaseAmount: () => void,
    navBarTitle: string,
    navBarSubTitle: string,
    showRegisterFoodPage: () => void,
    registerSnack: () => void,
    snack: Snack,
    showPreviousPage: () => void,
  });
  state: ({
    amountStep: number,
  });
  constructor(props: any) {
    super(props)
    this.state = {
      amountStep: 0.5,
    };
  }
  registerSnack = () => { this.props.registerSnack(this.props.snack, this.props.amount); };
  render() {
    return (
      <View>
        <NavigationBar currentPage={this.props.navBarTitle}
                       caption={this.props.navBarSubTitle}
                       showFrontPage={this.props.showRegisterFoodPage}
                       goBack={this.props.showPreviousPage}
                       color={colors.snack} />
        <SpecifyAmount amount={this.props.amount}
                       color={colors.snack}
                       interval={this.state.amountStep}
                       cancelAction={this.props.showPreviousPage}
                       increaseAmount={this.props.increaseAmount}
                       decreaseAmount={this.props.decreaseAmount}
                       confirmAction={this.registerSnack}
                       text={"Velg antall"} />
      </View>
    );
  }
}

const ConnectedPage = connect(
  (state) => ({
    navBarTitle: state.routing.navBarTitle,
    navBarSubTitle: state.routing.navBarSubTitle,
    amount: state.amountSelector.value,
    snack: state.routing.snack,
  }),
  (dispatch) => ({
    showRegisterFoodPage: () => dispatch(showRegisterFoodPage()),
    showPreviousPage: () => dispatch(showPreviousPage()),
    increaseAmount: (amountStep: number) => dispatch(increaseAmount(amountStep)),
    decreaseAmount: (amountStep: number) => dispatch(decreaseAmount(amountStep)),
    registerSnack: (snack: Snack, amount: number) => {
      console.log("Registered snack:", snack.name, amount);
      dispatch(registerFood(constructConsumedFoodItem('Snack', snack, amount)));
      dispatch(showTodaysIntakePage());
    },
  }),
)(SnackAmountRegistrationPage);

export default ConnectedPage;
