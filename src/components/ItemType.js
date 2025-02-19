import {appImagesSvg} from '../commons/AppImages';
import {SvgXml} from 'react-native-svg';

export function ItemType({type}) {
  const getIcon = () => {
    switch (type) {
      case 'veg':
        return appImagesSvg.veg;
      case 'non-veg':
        return appImagesSvg.nonVeg;
      case 'egg':
        return appImagesSvg.egg;
      default:
        return appImagesSvg.veg;
    }
  };
  return <SvgXml xml={getIcon()} style={{marginRight: '5%'}} />;
}
