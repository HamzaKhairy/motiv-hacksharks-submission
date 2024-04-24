import React, {
    useState,
    useEffect,
} from 'react';

import { useReadData } from '../../hooks/useCrudOperations';
import { UserType } from '../../types/userTypes';

import './ProfileButton.css';
import { User } from '@auth0/auth0-react';
import { IonImg } from '@ionic/react';

export interface ProfileButtonProps {
    varient?: 'toggleable' | 'non-toggleable' | 'image';
    isSchool?: boolean;
    height?: number; // Height of the button
    width?: number; // Width of the button
    onClick?: () => void; // Function to call when the button is clicked
    userData: UserType;
    userId?: string;
}

const ImageProfileButton: React.FC<ProfileButtonProps> = ({
    height = 70,
    onClick = () => { },
    userData,
}) => {
    const semicircleSize = height / 2;
    const imagePercentage = 0.8;
    const imageSize = imagePercentage * height;

    return (
        <div onClick={() => {
            onClick()
        }} className="container primary-text" style={{ height: `${height}px`, width: `${semicircleSize * 2}px` }}>
            <div className="semicircle" style={{ width: `${semicircleSize}px`, height: `${height}px`, borderRadius: `${semicircleSize}px 0 0 ${semicircleSize}px` }}></div>
            {/* <img src="/defaults/pfp.png" alt="Circular" className="circular-image" style={{ height: `${imageSize}px`, width: `${imageSize}px`, left: `${(height * (1 - imagePercentage)) / 2}px` }} /> */}
            <img src={userData.pfp ?? "/defaults/pfp.png"} alt="Circular" className="circular-image" style={{ height: `${imageSize}px`, width: `${imageSize}px`, left: `${(height * (1 - imagePercentage)) / 2}px` }} />
            <div className="semicircle" style={{ width: `${semicircleSize}px`, height: `${height}px`, borderRadius: `0 ${semicircleSize}px ${semicircleSize}px 0` }}></div>
        </div>
    );
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
    isSchool = false,
    varient = 'toggleable',
    height = 70,
    width = 100,
    userData,
    onClick = () => { },
}) => {
    const [isToggled, setIsToggled] = useState(isSchool);

    const semicircleSize = height / 2;
    const imagePercentage = 0.8;
    const imageSize = imagePercentage * height;

    let imageOffset;

    const toggle = () => {
        if (varient === 'toggleable') {
            setIsToggled(!isToggled);
        }
    }

    if (isToggled) {
        imageOffset = (1 - imagePercentage) * height / 2;
    } else {
        imageOffset = width + (1 - imagePercentage) * height / 2;
    }

    switch (varient) {
        case 'image':
            return <ImageProfileButton
                isSchool={isSchool}
                varient={varient}
                height={height}
                width={width}
                onClick={onClick}
                userData={userData}
            />
    }

    return (
        <div onClick={() => {
            onClick()
            toggle()
        }} className="container primary-text" style={{ height: `${height}px`, width: `${width + semicircleSize * 2}px` }}>
            <div className="semicircle" style={{ width: `${semicircleSize}px`, height: `${height}px`, borderRadius: `${semicircleSize}px 0 0 ${semicircleSize}px` }}></div>
            <div className="rectangle" style={{ height: `${height}px`, width: `${width}px` }}>
                <img src={userData.pfp ?? "/defaults/pfp.png"} alt="Circular" className="circular-image" style={{ height: `${imageSize}px`, width: `${imageSize}px`, left: `${imageOffset}px` }} />
                <div className="circular-image" style={isToggled ? { textAlign: 'left', left: `${imageSize * (2 - imagePercentage) + imageOffset}px` } : { textAlign: 'right', right: `${imageSize * (2 - imagePercentage)}px` }}>
                    <div style={{fontSize: '10px'}}>{userData ? `${userData.firstName} ${userData.lastName}` : "...Loading"}</div>
                    <div>{userData ? userData.subtext : ""}</div>
                </div>
            </div>
            <div className="semicircle" style={{ width: `${semicircleSize}px`, height: `${height}px`, borderRadius: `0 ${semicircleSize}px ${semicircleSize}px 0` }}></div>
        </div>
    );
};

export default ProfileButton;
