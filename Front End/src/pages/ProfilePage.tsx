import { IonAvatar, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import headshot from "../Assets/Headshot.jpg"
import "./ProfilePage.css"

const ProfilePage: React.FC = () => {

    const user = {
        profilePicture: headshot,
        team: "Loveland Tigers",
        username: "The Bridge",
        schoolcolor: "danger",
        bio: "Yabba dabba doooo!"
    }

    return (
      <IonPage>
        <IonHeader className="ion-padding">
          <div className="ion-padding">
            <IonAvatar className="Avatar" slot="start">
              <img src={user.profilePicture} className="ProfilePicture" />
            </IonAvatar>
          </div>
          <IonTitle>
            <IonTitle className="Username">{user.username}</IonTitle>
          </IonTitle>
          <IonItem lines="none" className="Bio">
            <IonText>{user.bio}</IonText>
          </IonItem>
          <IonItem>
            <IonText color={user.schoolcolor}>{user.team}</IonText>
          </IonItem>
        </IonHeader>
        <IonContent className="profileContent">
          <IonGrid>
            <IonRow className="ion-align-items-center ion-justify-content-center">
              {/* First Card */}
              <IonCol size="4" className="ProfileCol">
                <IonCard className="ProfileCard">
                  {/* Your card content, including image */}
                  <IonImg src="src\Assets\Headshot.jpg" style={{ objectFit: 'fit' }}></IonImg>
                </IonCard>
              </IonCol>

              {/* Second Card */}
              <IonCol size="4" className="ProfileCol">
                <IonCard className="ProfileCard">
                  {/* Your card content, including image */}
                  <IonImg src="src\Assets\MotivLogo.png" className="image"></IonImg>
                </IonCard>
              </IonCol>

              {/* Third Card */}
              <IonCol size="4" className="ProfileCol">
                <IonCard className="ProfileCard">
                  {/* Your card content, including image */}
                  <IonImg src="src\Assets\Plunge Outdoor Sauna.png" className="image"></IonImg>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
};

export default ProfilePage;