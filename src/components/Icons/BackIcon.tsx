import React from "react";
import { SvgXml } from "react-native-svg";

export default function BackIcon(){
    const icon = `<svg width="50px" height="50px" viewBox="0 0 178 178" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;"><g id="Group_137"><circle id="Oval-2" cx="88.833" cy="88.292" r="82.542" style="fill:#fff;"/></g><g id="Group_29"><path id="Path" d="M123.958,88.958l-69.791,0" style="fill:none;fill-rule:nonzero;stroke:#646e99;stroke-width:12.5px;"/><path id="Path-2" d="M88.958,123.958l-34.791,-35l35,-35" style="fill:none;fill-rule:nonzero;stroke:#646e99;stroke-width:12.5px;"/></g></svg>`;

    const IconSvg = () => <SvgXml xml={icon} />;
    
    return <IconSvg />
}