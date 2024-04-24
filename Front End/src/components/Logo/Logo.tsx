import React from "react";

export interface LogoProps {
    isSchool?: boolean
    size?: number
}

export const Logo: React.FC<LogoProps> = ({
    isSchool = false,
    size = 100,
}) => {

    let source;

    if (isSchool) {
        source = "/testing/tigers-logo.png";
    } else {
        source = "/logo/logo.png";
    }

    return (
        <img id="logo" src={source} style={{height: `${size}px`}}></img>
    );
}

export default Logo;