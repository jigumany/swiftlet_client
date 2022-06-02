import React from "react";
import { SvgXml } from "react-native-svg";

export default function VoiceIcon(){
    const icon = `<svg width="40px" height="40px" viewBox="0 0 178 178" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;"><g id="Group_137"><circle id="Oval-2" cx="88.833" cy="88.292" r="82.542" style="fill:#fff;"/></g><g id="Icon"><path id="Path-3" d="M88.958,49.458c-5.843,0.068 -10.606,4.907 -10.583,10.75l0,28.75c0,5.806 4.777,10.584 10.583,10.584c5.806,-0 10.584,-4.778 10.584,-10.584l-0,-28.75c-0,-0.028 -0,-0.055 -0,-0.083c-0,-5.821 -4.764,-10.621 -10.584,-10.667Z" style="fill:none;fill-rule:nonzero;stroke:#636d97;stroke-width:7.08px;"/><path id="Path-4" d="M113.667,81.792l-0,7.166c0.001,13.605 -11.105,24.842 -24.709,25c-13.588,-0.181 -24.668,-11.41 -24.666,-25l-0,-7.166" style="fill:none;fill-rule:nonzero;stroke:#636d97;stroke-width:7.08px;"/><path id="Path-5" d="M88.958,114.083l0,14.375" style="fill:none;fill-rule:nonzero;stroke:#636d97;stroke-width:7.08px;"/><path id="Path-6" d="M75,128.5l28.208,0" style="fill:none;fill-rule:nonzero;stroke:#636d97;stroke-width:7.08px;"/></g></svg>`;

    const IconSvg = () => <SvgXml xml={icon} />;
    
    return <IconSvg />
}