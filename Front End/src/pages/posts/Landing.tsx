import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonCard>
        <div className="container">
        <div className="circle-container">
            <div className="circle">
                <div className="fill"></div>
                <div className="percentage"></div>
                <div className="center-circle"></div>
            </div>
        </div>
        </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Landing;