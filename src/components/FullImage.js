import React from 'react';
import ImageView from 'react-native-image-viewing';

const FullImage = ({uri, visible, onRequestClose, multiImage,imageIndex}) => {
  const images = [
    {
      uri: uri,
    },
  ];

  return (
    <ImageView
      images={multiImage?.length > 0 ? multiImage : images}
      imageIndex={imageIndex? imageIndex :0}
      visible={visible}
      onRequestClose={onRequestClose}
    />
  );
};

export default FullImage;
