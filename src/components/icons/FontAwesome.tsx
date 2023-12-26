import React, { FC } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

interface CustomIconProps {
  name:  keyof typeof FontAwesome5.glyphMap;
  size: number;
  color: string;
}

const CustomFontAwesomeIcon: FC<CustomIconProps> = ({ name, size, color }) => {
  return (
    <>
      <FontAwesome5 name={name} size={size} color={color} />  
    </>
  );
};


export default CustomFontAwesomeIcon;
