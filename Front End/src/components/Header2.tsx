import { IonAvatar, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import "./Header.css"
import Profile from './Profile';
import "./Profile.css"
import PlayerBadge from "./PlayerBadge"
import { IonButtons, IonButton, IonIcon } from '@ionic/react';

interface UserData {
    firstName: string;
    lastName: string;
    pfp: string;
    subtext: string;
}

const Header2: React.FC = () => {
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
                <IonGrid>
                    <IonRow class="ion-align-items-center">
                        <IonCol>
                            {/* <img src="/logo/logo.png" alt="Logo" style={{ height: '40px' }} /> */}
                            <img src="/testing/tigers-logo.png" alt="Logo" style={{ height: '40px' }} />
                        </IonCol>
                        <IonCol size="auto">
                            <PlayerBadge
                                playerName={data ? `${data.firstName} ${data.lastName}` : "Jaden Walton"}
                                playerSubtext={data ? data.subtext : "#81"}
                                imageUrl={data ? data.pfp : ""}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header2;