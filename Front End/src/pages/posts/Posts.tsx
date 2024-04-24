// import React, { useEffect, useState, useRef } from "react";
// import {
//   IonCard,
//   IonContent,
//   IonHeader,
//   IonImg,
//   IonInfiniteScroll,
//   IonInfiniteScrollContent,
//   IonPage,
//   IonTitle,
//   IonToolbar,
//   IonIcon,
//   IonAvatar,
//   IonLabel,
//   IonGrid,
//   IonRow,
//   IonCol,
//   IonNav,
//   IonNavLink,
//   IonButton,
//   IonItem,
// } from "@ionic/react";
// import {
//   arrowRedoOutline,
//   chatbubbleOutline,
//   shareSocialOutline,
//   thumbsUp,
// } from "ionicons/icons";
// import "./Posts.css";
// import { Share } from "@capacitor/share";
// import Comments from "../../components/Comments";
// import Header from "../../components/Header/Header"

// import { fetchData } from "../../utilities/utils";

// interface CommentInterface {
//   text: string;
// }

// interface UserInterface {
//   firstName: string;
//   lastName: string;
// }

// interface PostInterface {
//   id: string;
//   userId: string;
//   type: string;
//   likeCount: number;
//   commentCount: number;
//   description: string | null;
//   createdAt: string;
//   updatedAt: string;
//   liked: boolean;
//   user: UserInterface;
//   comments: CommentInterface[];
// }

// function Posts() {
//   const [posts, setPosts] = useState<PostInterface[]>([]);
//   const [showComments, setShowComments] = useState<number | null>(null);

//   const ionInfiniteScrollRef = useRef<HTMLIonInfiniteScrollElement | null>(
//     null
//   );

//   useEffect(() => {
//     fetchData('http://127.0.0.1:8080/api/posts')
//       .then(data => {
//         console.log(data)
//         setPosts(data)
//       })
//       .catch(error => console.error(error));
//   }, []);

//   const fetchMorePosts = () => {
//     fetchData('http://127.0.0.1:8080/api/posts')
//       .then(newData => {
//         setPosts(prevPosts => [...prevPosts, ...newData]);
//       })
//       .catch(error => console.error(error));
//   };

//   const handleLikeClick = (postId: string) => {
//     // Toggle the liked state for the specific post
//     setPosts((posts) =>
//       posts.map((post) =>
//         post.id === postId ? { ...post, liked: !post.liked } : post
//       )
//     );
//   };

//   const handleShareClick = async (post) => {
//     try {
//       const shareData = {
//         title: "Check out this post!",
//         text: post.description, // Use the post description as the text
//         url: window.location.href,
//       };

//       await Share.share(shareData);

//       console.log("Shared successfully");
//     } catch (error) {
//       console.error("Error sharing:", error);
//     }
//   };

//   const toggleComments = (postId: number) => {
//     setShowComments((prev) => (prev === postId ? null : postId));
//   };

//   const submitComment = (postId, comment) => {
//     // Simulate adding a new comment to the post
//     setPosts((prevPosts) => {
//       return prevPosts.map((post) => post.id === postId
//         ? { ...post, comments: [...post.comments, comment] }
//         : post
//       );
//     }
//     );
//   };


//   return (
//     <IonPage>
//       <IonContent fullscreen>
//         <Header />        
//         <IonGrid>
//           <IonRow className="ion-align-items-center ion-justify-content-center">
//             <IonCol size="12" size-md="8" size-lg="4">
//               {(posts).map((post) => (
//                 <IonCard key={post.id}>
//                   <IonImg src={"http://127.0.0.1:8080/api/files/" + post.id} alt="This is alt" />
//                   <p className="username">{`${post.user.firstName} ${post.user.lastName}`}</p>
//                   <p className="description">{post.description}</p>

//                   <p>{`View All ${post.commentCount} Comments`}</p>
//                   {post.comments.map((comment) => {
//                     return <p className="comments">{comment.text}</p>
//                   })}

//                   <div
//                     className="like_button"
//                     onClick={() => handleLikeClick(post.id)}
//                   >
//                     <IonIcon
//                       icon={thumbsUp}
//                       color={post.liked ? "danger" : "dark"}
//                       slot="icon-only"
//                     />
//                   </div>
//                   <div
//                     className="share_button"
//                     onClick={() => handleShareClick(post)}
//                   >
//                     <IonIcon
//                       icon={arrowRedoOutline}
//                       color="dark"
//                       slot="icon-only"
//                     />
//                   </div>
//                   <div
//                     className="comments_button"
//                     onClick={() => toggleComments(post.id)}
//                   >
//                     <IonIcon
//                       icon={chatbubbleOutline}
//                       color="dark"
//                       slot="icon-only"
//                     />
//                   </div>
//                   {showComments === post.id && (
//                     <Comments
//                       comments={post.comments}
//                       onCommentAdd={(comment) =>
//                         submitComment(post.id, comment)
//                       }
//                     />
//                   )}
//                 </IonCard>
//               ))}
//               <IonInfiniteScroll
//                 threshold="100px"
//                 disabled={false}
//                 onIonInfinite={(e) => {
//                   e.preventDefault();
//                   fetchMorePosts();
//                   // Signal that fetching is complete
//                   if (ionInfiniteScrollRef.current) {
//                     ionInfiniteScrollRef.current.complete();
//                   }
//                 }}
//               >
//                 <IonInfiniteScrollContent
//                   loadingText="Loading more posts..."
//                   loadingSpinner="bubbles"
//                 />
//               </IonInfiniteScroll>
//             </IonCol>
//           </IonRow>
//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// }

// export default Posts;
