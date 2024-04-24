import React, { useState } from "react";
import { IonHeader } from "@ionic/react";

import "./Header.css";

import ProfileButton from "../ProfileButton/ProfileButton";
import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import { UserType } from "../../types/userTypes";

export interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = ({

}) => {
    const [isSchool, setIsSchool] = useState(false);

    const user = useSelector((state: {user: UserType}) => state.user);

    return (
        <IonHeader>
        <div className="header-container">
            <Logo isSchool={isSchool} size={80}/>
            <ProfileButton onClick={() => setIsSchool(!isSchool)} width={100} height={55} userData={user} />
        </div>
        </IonHeader>
    );
}

export default Header;