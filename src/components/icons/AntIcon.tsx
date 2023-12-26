import React, { FC } from 'react';
import { AntDesign } from '@expo/vector-icons';

interface CustomIconProps {
  name:  keyof typeof AntDesign.glyphMap;
  size: number;
  color: string;
}

const CustomAntIcon: FC<CustomIconProps> = ({ name, size, color }) => {
  return (
    <>
      <AntDesign name={name} size={size} color={color} />  
    </>
  );
};


export default CustomAntIcon;
