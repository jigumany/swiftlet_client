import React from "react";
import { SvgXml } from "react-native-svg";
import {Shadow} from 'react-native-shadow-2';

export const ShadowPresets = {
    button: {
      offset: [5, 4], distance: 2, startColor: 'rgba(4,21,90,.05)', finalColor: 'rgba(4,21,90,.1)', getChildRadius: true,
    } as ShadowProps,
  };