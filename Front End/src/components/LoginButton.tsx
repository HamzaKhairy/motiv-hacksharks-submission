import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { IonButton } from "@ionic/react";

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();  

  return <IonButton expand="block" className="ion-margin-top" onClick={() => loginWithRedirect()}>Log in</IonButton>;
};

export default LoginButton;
