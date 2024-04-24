// import createAuth0Client from '@auth0/auth0-spa-js';
// import React, { useState, useEffect, useContext, createContext } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [auth0Client, setAuth0] = useState();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState();

//   useEffect(() => {
//     const initAuth0 = async () => {
//       const auth0 = await createAuth0Client({
//         domain: 'YOUR_AUTH0_DOMAIN',
//         client_id: 'YOUR_CLIENT_ID',
//         redirect_uri: window.location.origin,
//       });

//       setAuth0(auth0);

//       if (window.location.search.includes('code=')) {
//         const { appState } = await auth0.handleRedirectCallback();
//         window.history.replaceState({}, document.title, window.location.pathname);
//         setIsAuthenticated(await auth0.isAuthenticated());
//         setUser(await auth0.getUser());
//       }

//       setIsAuthenticated(await auth0.isAuthenticated());
//       setUser(await auth0.getUser());
//     };
//     initAuth0();
//   }, []);

//   const login = async () => {
//     await auth0Client.loginWithRedirect();
//   };

//   const logout = () => {
//     auth0Client.logout({
//       returnTo: window.location.origin,
//     });
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
