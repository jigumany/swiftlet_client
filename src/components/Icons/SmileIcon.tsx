import React from "react";
import { SvgXml } from "react-native-svg";

export default function SmileIcon(){
    const icon = `<svg width="25px" height="25px" viewBox="0 0 178 178" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"><g id="Icon"><g><circle id="Oval-2" cx="88.958" cy="88.958" r="71.171" style="fill:none;stroke:#67719b;stroke-width:16.75px;"/></g><g><path id="Path-4" d="M61.662,98.671c6.959,8.625 17.327,13.821 28.402,14.234c11.074,-0.413 21.442,-5.609 28.401,-14.234" style="fill:none;fill-rule:nonzero;stroke:#67719b;stroke-width:16.75px;"/></g><g><path id="Path-5" d="M68.737,63.169l0.076,0" style="fill:none;fill-rule:nonzero;stroke:#67719b;stroke-width:16.75px;"/></g><g><path id="Path-6" d="M111.356,63.169l0.076,0" style="fill:none;fill-rule:nonzero;stroke:#67719b;stroke-width:16.75px;"/></g></g></svg>`;

    const IconSvg = () => <SvgXml xml={icon} />;
    
    return <IconSvg />
}