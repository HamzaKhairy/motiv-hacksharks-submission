import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';

// DMS
import Messages from './pages/messages/Messages';
import Individual from './pages/messages/pages/Individual';

// import Posts from "./pages/posts/Posts";
import Schedule from "./pages/schedule";
import Settings from "./pages/Settings";
import Create from "./pages/Create"

import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { useAuth0 } from '@auth0/auth0-react';
import { callbackUri } from "./auth.config";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import 'leaflet/dist/leaflet.css';

/* Theme variables */
import './theme/variables.css';
import ProfilePage from './pages/ProfilePage';
import './fonts.css';
import './App.css';
import newUser from './pages/newUser/newUser';
import LocationComponent from './pages/locationPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import extraFeaturesThatDontHaveAUI from './pages/extraFeaturesThatDontHaveAUI';

// Redux
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/actions/userActions';

setupIonicReact();

const App: React.FC = () => {
  const { user: Auth0_User, isLoading, handleRedirectCallback } = useAuth0();
  
  useEffect(() => {
    CapApp.addListener("appUrlOpen", async ({ url }) => {
      if (url.startsWith(callbackUri)) {
        if (
          url.includes("state") &&
          (url.includes("code") || url.includes("error"))
        ) {
          await handleRedirectCallback(url);
        }

        await Browser.close();
      }
    });
  }, [handleRedirectCallback]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!Auth0_User) return;
    console.log(Auth0_User);
    dispatch(
      updateUser({
        id: Auth0_User.sub,
        firstName: Auth0_User.given_name,
        lastName: Auth0_User.family_name,
        subtext: '#100',
        pfp: Auth0_User.picture,
      })
    );
  }, [Auth0_User, isLoading, dispatch]);



  if (isLoading) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonSpinner name="crescent" />
                <IonText>Loading your Motiv...</IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
          <IonTabs>
            <IonTabBar slot="bottom">
              <IonTabButton tab="dms" href="/dms">
                <img src="/icons/messages.png" />
              </IonTabButton>
              <IonTabButton tab="schedule" href="/schedule">
                <img src="/icons/calendar.png" />
              </IonTabButton>
              <IonTabButton tab="extraFeaturesThatDontHaveAUI" href="/extraFeaturesThatDontHaveAUI">
                <img src="/icons/player_stats.png" />
              </IonTabButton>
            </IonTabBar>
            <IonRouterOutlet>
              <ProtectedRoute exact path="/profilepage" component={ProfilePage} />
              <ProtectedRoute exact path="/dms" component={Messages} />
              <ProtectedRoute path="/dms/:id" component={Individual} />
              <ProtectedRoute exact path="/settings" component={Settings} />
              <ProtectedRoute exact path="/schedule" component={Schedule} />
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/newUser" component={newUser} />
              <Route exact path="/extraFeaturesThatDontHaveAUI" component={extraFeaturesThatDontHaveAUI} />
              <ProtectedRoute exact path="/testing" component={LocationComponent} />
              <ProtectedRoute exact path="/">
                <Redirect to="/dms" />
              </ProtectedRoute>
            </IonRouterOutlet>
          </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
