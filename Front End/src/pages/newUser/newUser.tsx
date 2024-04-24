import { useAuth0 } from '@auth0/auth0-react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel
  } from '@ionic/react';
  import React, { useEffect, useState } from 'react';
import { useReadData } from '../../hooks/useCrudOperations';
import { UserType } from '../../types/userTypes';
import { useHistory } from 'react-router-dom';
  
  const newUser: React.FC = () => {
    const { user } = useAuth0();
    const history = useHistory();

    const { data: usersData, loading: usersLoading, error: usersError } = useReadData<UserType>(`/api/users/${user?.sub}`);
    
    useEffect(() => {
        if (!usersLoading && usersData) {
          // If there's data, user exists - redirect them
          history.push('/dms'); // Replace '/existing-user-page' with your actual route
        }
      }, [usersData, usersLoading, history]);

    const [userInfo, setUserInfo] = useState({
      name: '',
      email: '',
      bio: ''
    });
  
    const handleInputChange = (e: CustomEvent) => {
      const { name, value } = e.detail.target;
      setUserInfo({ ...userInfo, [name]: value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(userInfo); // Here you would typically send this data to a backend server
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Welcome to Motiv!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput value={userInfo.name} onIonChange={handleInputChange} name="name"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Nick Name</IonLabel>
              <IonInput value={userInfo.name} onIonChange={handleInputChange} name="name"></IonInput>
            </IonItem>
            <IonItem>
            <IonLabel position="floating">Team Number</IonLabel>
              <IonInput value={userInfo.name} onIonChange={handleInputChange} name="name"></IonInput>
            </IonItem>
            <IonButton type="submit" expand="block">Submit</IonButton>
          </form>
        </IonContent>
      </IonPage>
    );
  };
  
  export default newUser;
  