import { IonAvatar, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import "./Header.css"
import Headshot from "../Assets/Headshot.jpg";
import Motivlogo from "../Assets/MotivLogo.png";
import Profile from './Profile';
import "./Profile.css"
import PlayerBadge from "./PlayerBadge"

interface UserData {
    firstName: string;
    lastName: string;
    pfp: string;
    subtext: string;
}

const Header: React.FC = () => {
    const history = useHistory();

    const navigateToSettings = () => {
        console.log('Navigate to settings called');
        const currentPath = history.location.pathname;
        console.log(currentPath);

        if (currentPath === "/posts") {
            history.push('/settings');
        }

        else if (currentPath === "/settings") {
            history.push('/posts')
        }

        else if (currentPath === "/schedule") {
            history.push('/settings')
        }
    };

    const [data, setData] = useState<UserData | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/users/' + sessionStorage.getItem('user_id'))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                console.log(data)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>
                    <IonGrid>
                        <IonRow className="ion-align-items-center ion-justify-content-between">
                            <IonCol size="auto">
                                <img className="logo" src={Motivlogo} alt="Motiv Logo" onClick={navigateToSettings} />
                            </IonCol>
                            <IonCol size="auto">
                                <PlayerBadge
                                    playerName={data ? `${data.firstName} ${data.lastName}` : " "}
                                    playerSubtext={data ? data.subtext : " "}
                                    imageUrl={data ? data.pfp : "default"}
                                />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;