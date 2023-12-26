import React, { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface CustomIconProps {
  name:  keyof typeof Ionicons.glyphMap;
  size: number;
  color: string;
}

const CustomIonIcon: FC<CustomIconProps> = ({ name, size, color }) => {
  return (
    <>
      <Ionicons name={name} size={size} color={color} />  
    </>
  );
};


export default CustomIonIcon;
