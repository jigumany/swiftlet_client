import React from "react";
import { SvgXml } from "react-native-svg";

export default function PlussIcon(){
    const plus = `<svg width="50px" height="50" viewBox="0 0 178 178" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;"><g id="Group_137"><circle id="Oval-2" cx="88.833" cy="88.292" r="82.542" style="fill:#fff;"/></g><g id="Add"><g id="Icon"><path id="Path" d="M88.958,56.417l0,65.125" style="fill:none;fill-rule:nonzero;stroke:#656f99;stroke-width:8.33px;"/><path id="Path-2" d="M56.417,88.958l65.125,0" style="fill:none;fill-rule:nonzero;stroke:#656f99;stroke-width:8.33px;"/></g></g></svg>`;

    const PlusIcon = () => <SvgXml xml={plus} />;
    
    return <PlusIcon />
}