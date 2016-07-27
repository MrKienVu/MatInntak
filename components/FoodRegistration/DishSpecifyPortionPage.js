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
   ScrollView,
   Text,
   View,
 } from 'react-native';
 import { connect } from 'react-redux';
 import { colors, dimens } from '../../style';
 import NavigationBar from '../NavigationBar';
 import {
   showRegisterFoodPage,
   showPreviousPage,
   showTodaysIntakePage,
 } from '../../actions';
 import { Button } from './common';
 import { ImageButton } from './SpecifyAmount';
 import { icons } from '../../graphics';
 import { dish } from './foodItems';
 import type { Dish } from '../../logic/food';

 class DishSpecifyPortionPage extends Component {
   props: ({
     dish: Array<Dish>,
     showFrontPage: () => void,
     showPreviousPage: () => void,
     registerDish: () => void,
     registerFood: () => void,
   });
   state: ({
     incrementerEnabled: boolean,
     decrementerEnabled: boolean,
     dish: Array<Dish>,
   });
   constructor(props){
     super(props)
     this.state = {
       incrementerEnabled: false,
       decrementerEnabled: true,
       dish: props.dish,
     };
   }
   INTERVAL = 0.5;
   increase = (dishName: string) => {
     this.setState({ dish: this.state.dish
       .map(dish => { return dish.name === dishName ?
       {  ...dish, quantity: dish.quantity + this.INTERVAL } : dish; }),
     })
   };
   decrease = (dishName: string) => {
     this.setState({ dish: this.state.dish
       .map(dish => { return dish.name === dishName ?
       { ...dish, quantity: dish.quantity - this.INTERVAL } : dish; }),
     })
   };
   render() {
     return(
       <View>
       <NavigationBar currentPage="Middag"
                      showFrontPage={this.props.showFrontPage}
                      goBack={this.props.showPreviousPage}
                      color={colors.dinner} />
       <ScrollView>{this.state.dish.map(dish => (
         <PortionRow key={dish.name}
                     amount={dish.quantity || 0}
                     dish={dish.name}
                     decrease={() => this.decrease(dish.name)}
                     increase={() => this.increase(dish.name)}
                     showPreviousPage={this.props.showPreviousPage}
                     decrementerEnabled={this.state.decrementerEnabled} />
         ))}
         <View style={{
           marginVertical: 64,
           flexDirection: 'column',
           alignItems: 'center',
           height: 200,
         }}>
          <Button action={this.props.registerDish}
                  text="Registrer"
                  color={colors.dinner}
                  style={{fontStyle: 'italic', width: dimens.mediumButton}} />
         </View>
       </ScrollView>


       </View>
     );
   }

 }

 const PortionRow = ({amount, dish, increase, decrease, decrementerEnabled}: {
   amount: number,
   dish: string,
   decrementerEnabled: boolean,
   increase: () => void,
   decrease: () => void,
 }) => (
   <View>
     <View style={{
       flexDirection: 'row',
       justifyContent: 'space-between',
     }}>
       <Text style={{
         fontSize: 30,
         marginTop: 30,
         paddingHorizontal: 35,
       }}> {dish} </Text>
       <View style={{flexDirection: 'row', paddingHorizontal: 50}}>
         <ImageButton action={decrease}
                      image={icons.decrement}
                      enabled={decrementerEnabled}
                      color={colors.dinner}
                      size={50} />
         <Text style={{
           color: colors.dinner,
           fontSize: 40,
           fontWeight: 'bold',
           alignSelf: 'center',
           textAlign: 'center',
         }}>
           {amount}
         </Text>
         <ImageButton action={increase}
                      image={icons.increment}
                      enabled={true}
                      color={colors.dinner}
                      size={50} />
       </View>
     </View>
      <View style={{height: 3, backgroundColor: colors.divider}}/>
   </View>
 );

 const ConnectedPage = connect(
   () => ({
     dish: dish,
   }),
   (dispatch) => ({
     registerDish: () => dispatch(showTodaysIntakePage()),
     showFrontPage: () => dispatch(showRegisterFoodPage()),
//     registerFood: () => dispatch(registerFood()),
     showPreviousPage: () => dispatch(showPreviousPage()),
   }),
 )(DishSpecifyPortionPage);

export default ConnectedPage;
