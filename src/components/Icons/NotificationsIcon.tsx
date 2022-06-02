import React from "react";
import { SvgXml } from "react-native-svg";

export default function NotificationsIcon(){
    const icon = `<svg width="50px" height="50" viewBox="0 0 178 178" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;"><g id="Group_137"><circle id="Oval-2" cx="88.833" cy="88.292" r="82.542" style="fill:#fff;"/></g><g id="Icon"><path id="Path" d="M106.458,79.167c-0.501,-11.314 -9.945,-20.35 -21.27,-20.35c-11.326,-0 -20.77,9.036 -21.271,20.35c-0,25 -10.625,31.916 -10.625,31.916l63.833,0c0,0 -10.667,-7.083 -10.667,-31.916" style="fill:none;fill-rule:nonzero;stroke:#656f99;stroke-width:6.25px;"/><path id="Path-2" d="M91.333,125c-1.229,2.305 -3.637,3.75 -6.25,3.75c-2.612,0 -5.02,-1.445 -6.25,-3.75" style="fill:none;fill-rule:nonzero;stroke:#656f99;stroke-width:6.25px;"/></g><circle id="Ellipse_25" cx="100.708" cy="64.333" r="17.5" style="fill:#21ffb5;"/></svg>`;

    const IconSvg = () => <SvgXml xml={icon} />;
    
    return <IconSvg />
}