import { useAuth0 } from "@auth0/auth0-react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonAvatar, IonChip, IonImg, IonItem, IonLabel } from "@ionic/react";
import "./Profile.css";
import { useHistory } from "react-router";

interface PlayerBadgeProps {
  playerName: string;
  playerNumber: number;
  imageUrl: string;
}

const Profile: React.FC<PlayerBadgeProps> = ({ playerName, playerNumber, imageUrl }) => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!user) return null;

  const history = useHistory();

  const navigateToProfile = () => {
  console.log('Navigate to profile called');
  const currentPath = history.location.pathname;
  console.log(currentPath);

  if (currentPath === "/posts"){
    history.push('/ProfilePage');
  }

  else if (currentPath === "/ProfilePage"){
    history.push('/posts')
  }

  else if (currentPath === "/schedule"){
      history.push('/ProfilePage')
    }
};

  return (
    <IonCard className="profile-card" onClick={navigateToProfile}>
      <IonCardContent className="ion-no-padding">
        <IonItem lines="none">
          <IonAvatar slot="end">
            <IonImg src={imageUrl} alt={playerName} />
          </IonAvatar>
          <IonLabel>
            {playerName}
          </IonLabel>
          <IonChip slot="start" color={'primary'}>
            {"#" + playerNumber}
          </IonChip>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default Profile;
