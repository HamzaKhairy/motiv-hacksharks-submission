import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonLoading,
    useIonRouter,
  } from '@ionic/react';
  import React, { useEffect, useState } from 'react';
  import { logInOutline, personCircleOutline } from 'ionicons/icons';
  import MotivLogo from '../Assets/MotivLogo.png';
  // import Intro from '../components/Intro'; (all commented out code related to this are commented out to create Docker)
  import { Preferences } from '@capacitor/preferences';
import LoginButton from '../components/LoginButton';
  
  const INTRO_KEY = 'intro-seen';
  
  const Login: React.FC = () => {
    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(true);
    const [present, dismiss] = useIonLoading();
  
    useEffect(() => {
      const checkStorage = async () => {
        const seen = await Preferences.get({ key: INTRO_KEY });
        setIntroSeen(seen.value === 'true');
      };
      checkStorage();
    }, []);
  
    const doLogin = async (event: any) => {
      event.preventDefault();
      await present('Logging in...');
      setTimeout(async () => {
        dismiss();
        router.push('/app', 'root');
      }, 2000);
    };
  
    const finishIntro = async () => {
      setIntroSeen(true);
      Preferences.set({ key: INTRO_KEY, value: 'true' });
    };
  
    const seeIntroAgain = () => {
      setIntroSeen(false);
      Preferences.remove({ key: INTRO_KEY });
    };
  
    return (
      <>
        {/* {!introSeen ? (
          <Intro onFinish={finishIntro} />
        ) : ( */}
          <IonPage>
            <IonHeader>
              <IonToolbar color={'success'}>
                <IonTitle>Motiv</IonTitle>
              </IonToolbar>
            </IonHeader>
  
            <IonContent scrollY={false} className="ion-padding">
              <IonGrid fixed>
                <IonRow class="ion-justify-content-center">
                  <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                    <div className="ion-text-center ion-padding">
                      <img src={MotivLogo} alt="MotivLogo Logo" width={'50%'} />
                    </div>
                  </IonCol>
                </IonRow>
  
                <IonRow class="ion-justify-content-center">
                  <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                    <IonCard>
                      <IonCardContent>
                        <form onSubmit={doLogin}>
                          
                          <LoginButton/>
  
                          <IonButton onClick={seeIntroAgain} fill="clear" size="small" color={'medium'} type="button" expand="block" className="ion-margin-top">
                            Watch intro again
                            <IonIcon icon={personCircleOutline} slot="end" />
                          </IonButton>
                        </form>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
          </IonPage>
        {/* )} */}
      </>
    );
  };
  
  export default Login;
  