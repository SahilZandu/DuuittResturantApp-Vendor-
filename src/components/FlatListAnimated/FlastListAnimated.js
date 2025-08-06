import React from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';

const FlastListAnimated = ({
  rowItem,
  inAnimation,
  outAnimation,
  paddingBottom,
  duration,
  easing,
  animation,
  items,
  id,
  data,
  keyExtractor,
  isDeleted,
  ...rest
}) => {
  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: paddingBottom ? paddingBottom : "15%" }}
      nestedScrollEnabled
      data={items}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item[id].toString()}
      //  extraData={this.state.refresh}
      {...rest}
      renderItem={({ item, index }) => {
        const component = rowItem({ item, index });
        // animation={animation}
        return (
          <ListItem
            inAnimation={inAnimation}
            outAnimation={outAnimation}
            duration={duration}
            easing={easing}
            component={component}
            isDeleted={isDeleted == item.guid ? true : false}
            id={item.id}
            item={item}
          />
        );
      }}
    />
  );
};

export default FlastListAnimated;
