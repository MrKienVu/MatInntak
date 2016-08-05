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
import Swiper from 'react-native-swiper';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  LayoutAnimation,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressCircle from './ProgressCircle';
import { colors, fontSize } from '../../style';
import NavigationBar from '../NavigationBar';
import {
  showRegisterDishPage,
  showRegisterFoodPage,
  showRegisterLiquidPage,
  showRegisterMealPage,
  showRegisterSnackPage,
  showDishAmountPage,
  showLiquidAmountPage,
  showMealAmountPage,
  showSnackAmountPage,
  editAmount,
  removeFood,
} from '../../actions';
import { accumulateNutrition } from '../../logic/needs';

import type { Color } from '../../style'
import type { ConsumedFoodItem, DailyConsumption } from '../../logic/food';

function upperCaseFirst(string: string) {
  return string[0].toUpperCase() + string.slice(1);
};

const LOCALE = 'nb-NO';

function formatDate(date: Date): string {
  return date.toLocaleDateString(LOCALE, {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
};

function formatTime(time: Date): string {
  return time.toLocaleTimeString(LOCALE, {hour: '2-digit', minute: '2-digit'});
};

const TodaysIntakePage = ({
  goBack,
  showFrontPage,
  consumedFood,
  showRegisterDishPage,
  showRegisterLiquidPage,
  showRegisterMealPage,
  showRegisterSnackPage,
  editFood,
  removeFood,
  needs,
  todaysNutrition,
}) => (
  <View style={{flex: 1}}>
    <NavigationBar currentPage="Dagens inntak"
                   caption={ upperCaseFirst(formatDate(new Date())) }
                   goBack={goBack}
                   showFrontPage={showFrontPage} />
    <ScrollView style={{flex: 1}}>
      <TodaysIntake todaysNutrition={todaysNutrition}
                    needs={needs}
                    style={{marginTop: 30, marginBottom: 20}}/>
      <MealDrawerChest consumedFood={consumedFood}
                       showRegisterDishPage={showRegisterDishPage}
                       showRegisterLiquidPage={showRegisterLiquidPage}
                       showRegisterMealPage={showRegisterMealPage}
                       showRegisterSnackPage={showRegisterSnackPage}
                       editFood={editFood}
                       removeFood={removeFood}
                       style={{marginTop: 20}} />
    </ScrollView>
  </View>
);

type Indicator = {color: Color, progress: number};

const IntakeIndicator = ({indicators}: {indicators: Array<Indicator>}) => (
  <Swiper nextButton={<Icon name={'chevron-right'} size={100} color={colors.divider} />}
          prevButton={<Icon name={'chevron-left'} size={100} color={colors.divider} />}
          index={1} height={200} loop={false} showsButtons={true} showsPagination={false}>
      <IntakeIndicatorPage color={indicators[0].color} progress={indicators[0].progress} />
      <IntakeIndicatorPage color={indicators[1].color} progress={indicators[1].progress} />
      <IntakeIndicatorPage color={indicators[2].color} progress={indicators[2].progress} />
  </Swiper>
);

const IntakeIndicatorPage = ({color, progress}: {color: Color, progress: number}) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <IntakeIndicatorCircle color={color} progress={progress} />
  </View>
);

const ConnectedPage = connect(
  (state) => ({
    consumedFood: {
      consumedDinner: state.consumption.consumedDinner,
      consumedLiquids: state.consumption.consumedLiquids,
      consumedMeals: state.consumption.consumedMeals,
      consumedSnacks: state.consumption.consumedSnacks,
    },
    needs: {
      energy: state.patient.energy,
      liquid: state.patient.liquid,
      protein: state.patient.protein,
    },
    todaysNutrition: {
      energy: accumulateNutrition(state.consumption, 'energy'),
      liquid: accumulateNutrition(state.consumption, 'liquid'),
      protein: accumulateNutrition(state.consumption, 'protein'),
    },
  }),
  (dispatch) => ({
    goBack: () => dispatch(showRegisterFoodPage()),
    showFrontPage: () => dispatch(showRegisterFoodPage()),
    showRegisterDishPage: () => dispatch(showRegisterDishPage()),
    showRegisterLiquidPage: () => dispatch(showRegisterLiquidPage()),
    showRegisterMealPage: () => dispatch(showRegisterMealPage()),
    showRegisterSnackPage: () => dispatch(showRegisterSnackPage()),
    removeFood: (food: ConsumedFoodItem) => dispatch(removeFood(food)),
    editFood: (item: ConsumedFoodItem) => {
      dispatch(editAmount(item));
      console.log("BEEP, BEEP! Category is ", item.category);
      switch (item.category) {
        case 'Dish': dispatch(showDishAmountPage(item.consumed.name)); break;
        case 'Meal': dispatch(showMealAmountPage(item.consumed.name)); break;
        case 'Liquid': dispatch(showLiquidAmountPage(item.consumed.name)); break;
        case 'Snack': dispatch(showSnackAmountPage(item.consumed.name)); break;
      }
    },
  }),
)(TodaysIntakePage);

export function computeNeedsPercentage(current: number, need: number): number {
  const percentage = current / need;
  return percentage >= 1 ? 1 : percentage;
}

const TodaysIntake = ({todaysNutrition, needs, style}) => (
  <View style={{flexDirection:'column',
                alignItems: 'center',
                ...style,
               }}>
    <IntakeIndicator indicators={[
      {color: colors.redOrange, progress: computeNeedsPercentage(
        todaysNutrition.energy, needs.energy)},
      {color: colors.deepBlue, progress: computeNeedsPercentage(
        todaysNutrition.liquid, needs.liquid)},
      {color: colors.lightGreen, progress: computeNeedsPercentage(
        todaysNutrition.protein, needs.protein)},
    ]}/>
    <NutritientStatuses nutrition={todaysNutrition}
                        style={{marginTop: 20}} />
  </View>
);

const IntakeIndicatorCircle = ({color, progress}) => (
  <ProgressCircle style={{flexDirection: 'row', justifyContent: 'center'}}
                  size={160}
                  progress={progress}
                  color={color}
                  borderColor={colors.divider}
                  borderWidth={2}
                  secondaryText="av dagens mål"
                  thickness={8}
                  textStyle={{color:colors.black, fontSize: fontSize.ordinaryText}}
                  percentageStyle={{color:colors.black, fontSize: 40, fontWeight: '600'}} />
);

const NutritientStatuses = ({nutrition, style}) => (
  <View style={{flexDirection:'row', ...style}}>
    {
      [{name: 'Energi', value: nutrition.energy, unit: 'kcal', color: colors.redOrange},
       {name: 'Væske', value: nutrition.liquid, unit: 'ml', color: colors.deepBlue},
       {name: 'Protein', value: nutrition.protein, unit: 'g', color: colors.lightGreen}].map(nutritient =>
         (<View style={{flex: 1, flexDirection: 'column'}} key={nutritient.name}>
           <OrdinaryText style={{textAlign: 'center'}}>{nutritient.name}</OrdinaryText>
           <OrdinaryText style={{textAlign: 'center',
                                 color: nutritient.color,
                                 marginTop: 10,
                                 fontWeight: '700'}}>{`${nutritient.value} ${nutritient.unit}` }</OrdinaryText>
         </View>)
       ) }
  </View>
);

type DrawerItems = {
  consumedDinner: Array<ConsumedFoodItem>,
  consumedLiquids: Array<ConsumedFoodItem>,
  consumedMeals: Array<ConsumedFoodItem>,
  consumedSnacks: Array<ConsumedFoodItem>,
};

function constructDrawerItems(drawerItems: DrawerItems, showRegisterDishPage, showRegisterLiquidPage, showRegisterMealPage, showRegisterSnackPage):
                              Array<{title: string, addAction: () => void, color: Color, items: Array<ConsumedFoodItem>}> {
  return ([{
      title: "Frokost, lunsj og kveldsmat",
      addAction: showRegisterMealPage,
      color: colors.meal,
      items: drawerItems.consumedMeals,
    }, {
      title: "Mellommåltid",
      addAction: showRegisterSnackPage,
      color: colors.snack,
      items: drawerItems.consumedSnacks,
    }, {
      title: "Middag",
      addAction: showRegisterDishPage,
      color: colors.dinner,
      items: drawerItems.consumedDinner,
    }, {
      title: "Drikke",
      addAction: showRegisterLiquidPage,
      color: colors.liquid,
      items: drawerItems.consumedLiquids,
    },
  ]);
}

const MealDrawerChest = ({consumedFood, showRegisterDishPage, showRegisterLiquidPage, showRegisterMealPage, showRegisterSnackPage, editFood, removeFood, style}: {
  consumedFood: DailyConsumption,
  showRegisterDishPage: () => void,
  showRegisterLiquidPage: () => void,
  showRegisterMealPage:() => void,
  showRegisterSnackPage: () => void,
  editFood: () => void,
  removeFood: () => void,
  style: any,
}) => (
  <View style={style}>
    { constructDrawerItems(consumedFood, showRegisterDishPage, showRegisterLiquidPage, showRegisterMealPage, showRegisterSnackPage).map(drawer =>
      <MealDrawer
        addAction={drawer.addAction}
        editAction={editFood}
        removeAction={removeFood}
        items={drawer.items}
        key={drawer.title}
        openColor={drawer.color}
        title={drawer.title}
      />)
    }
  </View>
);

const DrawerHeading = ({clickAction, addAction, open, color, title}: {
  clickAction: () => void,
  addAction: () => void,
  color: string,
  open: boolean,
  title: string,
}) => (
  <View style={{backgroundColor: open ? color : colors.darkBlue, flexDirection:'row' }}>
      <TouchableWithoutFeedback onPress={clickAction}>
        <View style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingLeft: 30,
          paddingVertical: 15,
        }}>
          <Icon name={open ? "expand-more" : "chevron-right" } size={40} color={colors.white} />
          <Text style={{color: colors.white, fontSize: fontSize.small, flex: 1}}>{ title }</Text>
        </View>
      </TouchableWithoutFeedback>
      { open &&
        <View style={{justifyContent: 'center', paddingRight: 20}}>
          <AppIcon normal={require('../../img/icon_add.png')}
                   pressed={require('../../img/icon_add_active.png')}
                   onPress={addAction}/>
        </View>
      }
  </View>
);

const MinimalSpring = {
    duration: 500,
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
    },
  };

class MealDrawer extends Component {
  props: {
    addAction: () => void,
    editAction: () => void,
    removeAction: () => void,
    title: string,
    openColor: string,
    items: Array<ConsumedFoodItem>
  };
  state: {open: boolean};
  constructor() {
    super();
    this.state = {open: false};
  }
  open = () => { this.setState({open: true}); };
  close = () => { this.setState({open: false}) };
  clickAction = () => {
    this.state.open ? this.close() : this.open()
  };
  componentWillUpdate() {
    LayoutAnimation.configureNext(MinimalSpring);
  }
  render() {
    return (
      <View style={{
        backgroundColor: this.state.open ? colors.divider : colors.transparent,
        marginBottom: 2,
      }} >
        <DrawerHeading clickAction={this.clickAction}
                       addAction={this.props.addAction}
                       open={this.state.open}
                       title={this.props.title}
                       color={this.props.openColor} />
        { this.state.open && (
          this.props.items.length === 0 ?
            <DrawerItem firstLine={'Ingen elementer registrert.'}
                        secondLine={'Trykk på plusstegnet for å registrere mat eller drikke.'}
                        dummy={true}
                        showMargin={false} /> :
          this.props.items.map((item, index) =>
            <DrawerItem firstLine={`${item.consumed.name} (kl. ${formatTime(item.time)})`}
                        secondLine={`${item.amount} g (${item.energy} kcal, ${item.liquid} ml væske, ${item.protein} g proteiner)`}
                        editAction={() => this.props.editAction(item)}
                        removeAction={() => this.props.removeAction(item)}
                        showMargin={index !== this.props.items.length - 1}
                        key={item.time}/>))}
      </View>
    );
  }
}

const OrdinaryText = ({children, style}: {children?: string, style?: any}) => (
  <Text style={{fontSize: fontSize.ordinaryText, ...style}}>{ children }</Text>
);

class AppIcon extends Component {
  props: {
    normal: number,
    pressed: number,
    size: number,
    onPress: () => void,
    style?: any,
  };
  state: {isPressed: boolean};
  static defaultProps = {
    size: 36,
  };
  constructor() {
    super();
    this.state = {isPressed: false};
  }
  render() {
    return (
      <View>
      <TouchableWithoutFeedback onPressIn={() => this.setState({isPressed: true})}
                                onPressOut={() => this.setState({isPressed: false})}
                                onPress={this.props.onPress}>
        <View>
        <Image source={this.state.isPressed ? this.props.pressed : this.props.normal}
               style={{height: this.props.size, width: this.props.size, ...this.props.style}} />
        </View>
      </TouchableWithoutFeedback>
      </View>
    );
  }
}

const DrawerItem = ({firstLine, secondLine, editAction, removeAction, showMargin, dummy}: {
  dummy?: boolean,
  firstLine: string,
  secondLine?: string,
  editAction?: () => void,
  removeAction?: () => void,
  showMargin?: boolean,
}) => (
  <View style={{paddingLeft: 50, marginBottom: showMargin ? 2 : 0,
                paddingVertical: 16, paddingRight: 20,
                backgroundColor: colors.white,
                flexDirection: 'row', height: 80}}>
    <View style={{flex:1}}>
      <OrdinaryText style={{color: dummy ? colors.grey : colors.black}}>
        { firstLine }
      </OrdinaryText>
      <OrdinaryText style={{color: dummy ? colors.grey : colors.black}}>
        { secondLine }
      </OrdinaryText>
    </View>
    { !dummy &&
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <AppIcon style={{marginRight: 15}}
               normal={require('../../img/icon_edit.png')}
               pressed={require('../../img/icon_edit_active.png')}
               onPress={editAction} />
      <AppIcon normal={require('../../img/icon_delete.png')}
               pressed={require('../../img/icon_delete_active.png')}
               onPress={() => Alert.alert(
                 `Slett ${firstLine.toLowerCase()}`,
                 `Er du sikker på at du vil slette denne varen?`, [
                   {text: 'Avbryt'},
                   {text: 'Slett', onPress: removeAction},
                 ])} />
    </View>}
  </View>
);

export default ConnectedPage;
