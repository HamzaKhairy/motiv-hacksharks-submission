// Commented out to build Docker Image

// import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
// import React from 'react';
// import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// import 'swiper/css';
// import Intro1Svg from '../assets/intro/1.svg';
// import Intro2Svg from '../assets/intro/2.svg';
// import Intro3Svg from '../assets/intro/3.svg';
// import './Intro.css';

// interface ContainerProps {
//   onFinish: () => void;
// }

// const SwiperButtonNext = ({ children }: any) => {
//   const swiper = useSwiper();
//   return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
// };

// const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
//   return (
//     <Swiper>
//       <SwiperSlide>
//         <img src={Intro1Svg} alt="Intro 1" />
//         <IonText>
//           <h3>Revolutionize your team communication with Motiv!</h3>
//         </IonText>
//         <SwiperButtonNext>Next</SwiperButtonNext>
//       </SwiperSlide>

//       <SwiperSlide>
//         <img src={Intro2Svg} alt="Intro 2" />
//         <IonText>
//           <h3>Effortlessly manage your team with powerful features.</h3>
//         </IonText>
//         <SwiperButtonNext>Next</SwiperButtonNext>
//       </SwiperSlide>

//       <SwiperSlide>
//         <img src={Intro3Svg} alt="Intro 3" />
//         <IonText>
//           <h3>Experience the future of sports team communication!</h3>
//         </IonText>
//         <IonButton onClick={() => onFinish()}>Finish</IonButton>
//       </SwiperSlide>
//     </Swiper>
//   );
// };

// export default Intro;
