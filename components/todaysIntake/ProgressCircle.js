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

import React, {
  Component,
} from 'react';
import {
  ART,
  Text,
  View,
} from 'react-native';

/* Code simplified from https://github.com/oblador/react-native-progress */

const CIRCLE = Math.PI * 2;

function makeArcPath(x, y, startAngleArg, endAngleArg, radius, direction) {
  let startAngle = startAngleArg;
  let endAngle = endAngleArg;
  const arcMethod = direction === 'counter-clockwise' ? 'counterArc' : 'arc';
  if (endAngle - startAngle >= CIRCLE) {
    endAngle = CIRCLE + (endAngle % CIRCLE);
  } else {
    endAngle = endAngle % CIRCLE;
  }
  startAngle = startAngle % CIRCLE;
  const angle = startAngle > endAngle ? CIRCLE - startAngle + endAngle : endAngle - startAngle;


  let path = ART.Path();

  if (angle >= CIRCLE) {
    path
      .moveTo(x + radius, y)
      [arcMethod](0, radius * 2, radius, radius)
      [arcMethod](0, radius * -2, radius, radius)
      .close();
  } else {
    const directionFactor = direction === 'counter-clockwise' ? -1 : 1;
    endAngle *= directionFactor;
    startAngle *= directionFactor;
    const startSine = Math.sin(startAngle);
    const startCosine = Math.cos(startAngle);
    const endSine = Math.sin(endAngle);
    const endCosine = Math.cos(endAngle);
    const deltaSine = endSine - startSine;
    const deltaCosine = endCosine - startCosine;

    path
      .moveTo(x + radius * (1 + startSine), y + radius - radius * startCosine)
      [arcMethod](radius * deltaSine, radius * -deltaCosine, radius, radius, angle > Math.PI);
  }
  return path;
}

class Arc extends Component {
  props: {
    startAngle: number, // in radians
    endAngle: number, // in radians
    radius: number,
    offset: {
      top: number,
      left: number,
    },
    strokeWidth: number,
    direction: 'clockwise' | 'counter-clockwise',
  };

  static defaultProps = {
    startAngle: 0,
    offset: { top: 0, left: 0 },
    strokeWidth: 0,
    direction: 'clockwise',
  };

  render() {
    const { startAngle, endAngle, radius, offset, direction, strokeWidth, ...restProps } = this.props;
    const path = makeArcPath(
      (offset.left || 0) + strokeWidth / 2,
      (offset.top || 0) + strokeWidth / 2,
      startAngle,
      endAngle,
      radius - strokeWidth / 2,
      direction
    );
    return (
      <ART.Shape
        d={path}
        strokeCap="butt"
        strokeWidth={strokeWidth}
        {...restProps}
      />
    );
  }
}
type Direction = 'clockwise' | 'counter-clockwise';
export default class ProgressCircle extends Component {
  props: {
    borderColor: string,
    borderWidth: number,
    color: string,
    direction: Direction;
    progress: number,
    showsText: boolean,
    size: number,
    textStyle: any,
    thickness: number,
    percentageStyle: any,
    secondaryText: string,
  };

  static defaultProps = {
    borderWidth: 1,
    color: 'rgba(0, 122, 255, 1)',
    direction: 'clockwise',
    progress: 0,
    showsText: false,
    size: 40,
    thickness: 3,
  };

  render() {
    let {
      borderColor,
      borderWidth,
      color,
      direction,
      progress,
      secondaryText,
      size,
      percentageStyle,
      textStyle,
      thickness,
      ...restProps,
    } = this.props;

    borderWidth = borderWidth || 0;

    const radius = size / 2 - borderWidth;
    const offset = {
      top: borderWidth,
      left: borderWidth,
    };
    const textOffset = borderWidth + thickness;
    const textSize = size - textOffset * 2;

    return (
      <View {...restProps}>
        <ART.Surface
          width={size}
          height={size}>
          <Arc
            radius={radius}
            offset={offset}
            startAngle={0}
            endAngle={progress * 2 * Math.PI}
            direction={direction}
            stroke={color}
            strokeWidth={thickness} />
          <Arc
             radius={size / 2}
             startAngle={0}
             endAngle={2 * Math.PI}
             direction={direction}
             stroke={borderColor || color}
             strokeWidth={borderWidth} />
        </ART.Surface>
        <View style={{
                     position: 'absolute',
                     left: textOffset,
                     top: 10,
                     width: textSize,
                     height: textSize,
                     borderRadius: textSize / 2,
                     alignItems: 'center',
                     justifyContent: 'center',
                     }}>
          <Text style={[{
                       color: color,
                       fontSize: textSize / 4.5,
                       fontWeight: '300',
                       }, percentageStyle]}>{percentage(progress)}</Text>
          <Text style={[{marginLeft: 25, marginRight:20, textAlign: 'center'}, textStyle]}>{secondaryText}</Text>
        </View>
      </View>
    );
  }
}

function percentage(progress: number): string {
  return Math.round(progress * 100) + '%';
}
