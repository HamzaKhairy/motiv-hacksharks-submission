// import {
//   IonAvatar,
//   IonCard,
//   IonCol,
//   IonContent,
//   IonGrid,
//   IonHeader,
//   IonItem,
//   IonLabel,
//   IonList,
//   IonPage,
//   IonRow,
//   IonTextarea,
//   IonTitle,
//   IonToolbar,
//   IonImg,
// } from "@ionic/react";
// import React, { useEffect } from "react";
// import Header from "../components/Header";

// const Settings: React.FC = () => {
//   const [profilePicture, setProfilePicture] = React.useState<string>(
//     "/path/to/default/profile.jpg"
//   );

//   const handleProfilePictureClick = () => {
//     // Trigger file input click
//     document.getElementById("profilePictureInput")?.click();
//   };

//   const handleProfilePictureChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       // Perform upload logic and update profile picture state
//       // For simplicity, you can set the profile picture to a local URL.
//       const imageUrl = URL.createObjectURL(file);
//       setProfilePicture(imageUrl);
//     }
//   };

//   return (
//     <IonPage>
//       <Header />
//       <IonContent className="ion-padding">
//         <IonRow className="ion-align-items-center ion-justify-content-center">
//           <IonCol size="12" size-md="8" size-lg="4">
//             <IonCard>
//               <IonTitle> Account Settings</IonTitle>
//               <IonList>
//                 <IonItem>
//                   <IonLabel> Profile Picture</IonLabel>
//                   <IonAvatar onClick={handleProfilePictureClick}>
//                     <IonImg src={profilePicture} />
//                   </IonAvatar>
//                   <input
//                     type="file"
//                     id="profilePictureInput"
//                     style={{ display: "none" }}
//                     onChange={handleProfilePictureChange}
//                   />
//                 </IonItem>
//               </IonList>
//               <IonList>
//                 <IonItem>
//                   <IonTextarea
//                     label="Username"
//                     labelPlacement="floating"
//                     placeholder="Enter Username"
//                   ></IonTextarea>
//                 </IonItem>
//               </IonList>
//               <IonList>
//                 <IonItem>
//                   <IonTextarea
//                     label="Bio"
//                     labelPlacement="floating"
//                     placeholder="Enter Bio"
//                   ></IonTextarea>
//                 </IonItem>
//               </IonList>
//               <IonList>
//                 <IonItem>
//                   <IonTextarea
//                     label="Birth Date"
//                     labelPlacement="floating"
//                     placeholder="Enter Birthdate mm-dd-yyyy"
//                   ></IonTextarea>
//                 </IonItem>
//               </IonList>
//               <IonList>
//                 <IonItem>
//                   <IonTextarea
//                     label="Email"
//                     labelPlacement="floating"
//                     placeholder="Enter Email"
//                     type="email"
//                   ></IonTextarea>
//                 </IonItem>
//               </IonList>
//             </IonCard>
//             <IonCard>
//               <IonTitle>School Settings</IonTitle>
//               <IonItem>
//               <IonTextarea
//                     label="School Name"
//                     labelPlacement="floating"
//                     placeholder="Enter School"
//                   ></IonTextarea>
//               </IonItem>
//               <IonItem>
//               <IonTextarea
//                     label="ID Number"
//                     labelPlacement="floating"
//                     placeholder="Enter ID"
//                   ></IonTextarea>
//               </IonItem>
//             </IonCard>
//             <IonCard>
//               <IonTitle> Privacy Settings</IonTitle>
//               <IonList>
//                 <IonItem>
//                   <IonLabel> Account Visability</IonLabel>
//                 </IonItem>
//               </IonList>
//               <IonList>
//                 <IonItem>
//                   <IonLabel> Block Users</IonLabel>
//                 </IonItem>
//               </IonList>
//             </IonCard>
//           </IonCol>
//         </IonRow>
//       </IonContent>
//     </IonPage>
//   );
// };

const Settings: React.FC = () => {
  return (<p>Settings</p>)
}

export default Settings;
