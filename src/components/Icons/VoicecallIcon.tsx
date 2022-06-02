import React from "react";
import { SvgXml } from "react-native-svg";

export default function VoicecallIcon(){
    const icon = `<svg width="40px" height="40px" viewBox="0 0 178 178" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;"><g id="Group_137"><circle id="Oval-2" cx="88.833" cy="88.292" r="82.542" style="fill:#a2aac5;"/></g><path id="Icon-2" d="M126.5,106.875l0,11.792c0,4.32 -3.555,7.875 -7.875,7.875l-0.708,-0c-23.562,-2.64 -44.733,-15.728 -57.625,-35.625c-6.636,-10.245 -10.775,-21.906 -12.084,-34.042c-0.02,-0.231 -0.03,-0.464 -0.03,-0.696c-0,-4.065 3.147,-7.496 7.197,-7.846l12.5,0c3.927,-0.04 7.314,2.863 7.875,6.75c0.494,3.774 1.416,7.478 2.75,11.042c1.086,2.877 0.401,6.136 -1.75,8.333l-5.042,4.709c5.608,9.844 13.771,17.993 23.625,23.583l5,-5c2.197,-2.151 5.457,-2.836 8.334,-1.75c3.579,1.331 7.297,2.253 11.083,2.75c3.982,0.571 6.918,4.106 6.75,8.125Z" style="fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:7.08px;"/></svg>`;

    const IconSvg = () => <SvgXml xml={icon} />;
    
    return <IconSvg />
}