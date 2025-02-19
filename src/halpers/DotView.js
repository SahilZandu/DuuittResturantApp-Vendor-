import React, {useState} from 'react';
import {View} from 'react-native';

export const DotView = ({dashGap, dashLength, dashThickness, color}) => {
  const [lineLength, setLineLength] = useState(0);

  const marginRight = dashGap ? dashGap : 8;
  const length = dashLength ? dashLength : 10;
  const thickness = dashThickness ? dashThickness : 2.5;

  const numOfDashes = Math.ceil(lineLength / (marginRight + length));

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '4%',
        overflow: 'hidden',
      }}
      onLayout={event => {
        const {width, height} = event.nativeEvent.layout;
        setLineLength(width);
      }}>
      {[...Array(numOfDashes)].map((_, i) => {
        return (
          <View
            key={i}
            style={{
              width: length,
              height: thickness,
              marginRight: marginRight,
              backgroundColor: color ? color : '#D9D9D9',
            }}
          />
        );
      })}
    </View>
  );
};
