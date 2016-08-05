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
 import { SpecifyAmount } from './SpecifyAmount';
 import {
   amountRegistrationState,
   amountRegistrationDispatcher,
} from './amountRegistration';

import type { Meal, ConsumedFoodItem } from '../../logic/food';

 class MealAmountRegistrationPage extends Component {
   props: ({
     amount: number,
     item: Meal,
     consumedItem: ConsumedFoodItem,
     decreaseAmount: () => void,
     increaseAmount: () => void,
     navBarSubTitle: string,
     navBarTitle: string,
     registerItem: () => void,
     editItem: () => void,
     editing: boolean,
     showFrontPage: () => void,
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
   registerItem = () => {
     this.props.editing ?
       this.props.editItem(this.props.consumedItem, this.props.amount) :
       this.props.registerItem(this.props.item, this.props.amount);
   };
   render() {
     return(
       <View>
       <NavigationBar currentPage={this.props.navBarTitle}
                      caption={this.props.navBarSubTitle}
                      showFrontPage={this.props.showFrontPage}
                      goBack={this.props.showPreviousPage}
                      color={colors.meal}/>
       <SpecifyAmount amount={this.props.amount}
                      color={colors.meal}
                      interval={this.state.amountStep}
                      cancelAction={this.props.showPreviousPage}
                      increaseAmount={this.props.increaseAmount}
                      decreaseAmount={this.props.decreaseAmount}
                      confirmAction={this.registerItem}
                      text={"Velg antall"} />
       </View>
     );
   }
 }

const ConnectedPage = connect(
  (state) => amountRegistrationState(state),
  (dispatch) => amountRegistrationDispatcher(dispatch, 'Meal'),
)(MealAmountRegistrationPage);

 export default ConnectedPage;
