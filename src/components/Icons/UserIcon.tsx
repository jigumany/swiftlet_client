import React from "react";
import { SvgXml } from "react-native-svg";

export default function UserIcon(){
    const icon = `<svg width="50px" height="50px" viewBox="0 0 42 41" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;">
    <g id="Artboard1" transform="matrix(0.976744,0,0,1.025,0,0)">
        <rect x="0" y="0" width="43" height="40" style="fill:none;"/>
        <g id="Layer-1" serif:id="Layer 1" transform="matrix(1.02381,0,0,0.97561,0,0)">
            <g transform="matrix(-1,0,0,1,20.8064,40.613)">
                <path d="M0,-39.613C-10.939,-39.613 -19.806,-30.745 -19.806,-19.807C-19.806,-8.868 -10.939,0 0,0C10.939,0 19.806,-8.868 19.806,-19.807C19.806,-30.745 10.939,-39.613 0,-39.613" style="fill:white;fill-rule:nonzero;"/>
            </g>
            <g transform="matrix(1,0,0,1,28.2755,23.7047)">
                <path d="M0,5.519L0,3.684C-0.012,1.645 -1.676,0.001 -3.715,0.013L-11.149,0.013C-13.189,0 -14.853,1.643 -14.866,3.683L-14.866,5.519" style="fill:none;fill-rule:nonzero;stroke:rgb(101,111,153);stroke-width:1.7px;"/>
            </g>
            <g transform="matrix(1,0,0,1,20.8432,20.0487)">
                <path d="M0,-7.342C2.04,-7.355 3.704,-5.712 3.717,-3.672L3.717,-3.671C3.704,-1.632 2.041,0.012 0.001,0L0,0C-2.04,0.013 -3.704,-1.63 -3.717,-3.67L-3.717,-3.671C-3.704,-5.711 -2.041,-7.354 -0.001,-7.342L0,-7.342Z" style="fill:none;fill-rule:nonzero;stroke:rgb(101,111,153);stroke-width:1.7px;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            </g>
        </g>
    </g>
</svg>`;

    const IconSvg = () => <SvgXml xml={icon} />;
    
    return <IconSvg />
}