import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Create.css';

const Create: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
              <IonCard className="PhotoCard">
                <IonTitle className="PhotoTitle">Upload Photo</IonTitle>
                <IonButton className="PhotoButton" shape="round">
                  Photo
                </IonButton>
              </IonCard>
              <IonCard className="VideoCard">
                <IonTitle className="VideoTitle">Upload Video</IonTitle>
                <IonButton className="VideoButton" shape="round">
                  Video
                </IonButton>
              </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Create;