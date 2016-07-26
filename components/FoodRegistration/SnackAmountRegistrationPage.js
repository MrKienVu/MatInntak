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
   registerFood,
   selectAmount,
   showPreviousPage,
 } from '../../actions';
 import {
   AmountSelector,
   BigButton,
   SubTitle,
 } from './common';

class SnackAmountRegistrationPage extends Component {
  props: ({
    amount: number,
    increaseAmount: () => void,
    decreaseAmount: () => void,
    cancelAction: () => void,
    confirmAmount: () => void,
  });
  state: ({incrementerEnabled: boolean, decrementerEnabled: boolean});
  constructor(props: any) {
    super(props)
    this.amountStep = 0.5;
    this.state = {
      incrementerEnabled: true,
      decrementerEnabled: (this.props.amount > 0),
    };
  }
  increase() {
    if (this.props.amount == this.amountStep)
      this.setState({decrementerEnabled: true});
    this.props.increaseAmount(this.amountStep);
  };
  decrease() {
    this.props.decreaseAmount(this.amountStep);
    if (this.props.amount == this.amountStep)
      this.setState({decrementerEnabled: false})
  };
  render() {
    return (
      <View>
        <NavigationBar currentPage={this.props.navBarTitle}
                       caption={this.props.navBarSubTitle}
                       showFrontPage={this.props.registerFood}
                       goBack={this.props.showPreviousPage}
                       color={colors.snack} />
        <View style={{ marginTop: 64,
                       height: 460,
                       flexDirection: 'column',
                       alignItems: 'center',
                       justifyContent: 'space-between',
                       }}>
        <SubTitle text="Velg antall" />
        <AmountSelector increase={() => this.increase()}
                        decrease={() => this.decrease()}
                        amount={this.props.amount}
                        decrementerEnabled={this.state.decrementerEnabled}
                        color={colors.snack} />
        <BigButton action={this.props.confirmAmount}
                   color={colors.snack}
                   text="Bekreft" />
        <BigButton action={this.props.showPreviousPage}
                   color={colors.snack}
                   inverted={true}
                   text="Avbryt" />
        </View>

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
    registerFood: () => dispatch(registerFood()),
    showPreviousPage: () => dispatch(showPreviousPage()),
    increaseAmount: (amountStep: number) => dispatch(increaseAmount(amountStep)),
    decreaseAmount: (amountStep: number) => dispatch(decreaseAmount(amountStep)),
    selectAmount: (amount: number) => {
      console.log('Selected amount:', amount);
      dispatch(selectAmount(amount));
    },
    registerSnackAmount: (snack: Liquid, amount: number) => {
      console.log("Registered snack:", snack.name, amount);
      //dispatch(registerFood());
    },
  }),
)(SnackAmountRegistrationPage);

export default ConnectedPage;
