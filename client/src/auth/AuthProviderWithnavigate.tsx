import React from "react";
import {  Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
// import { useCreateUserRequest } from "@/helper/myUserApi";

interface Props {
    children: React.ReactNode
}


const AuthProviderWithnavigate = ({ children }: Props) => {
    const navigate = useNavigate();
    const domain = import.meta.env.VITE_AUTH_DOMAIN;
    const clientID = import.meta.env.VITE_AUTH_CLIENTID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
    
    if(!domain || !clientID || !redirectUri || !audience) {
        throw new Error("Unable to initialize auth!!!")
    }

   /**
    * The `onRedirectCallback` function creates a user with Auth0 ID and email if they are provided.
    * @param {AppState} [appState] - `appState` is an optional parameter of type `AppState`, which
    * represents the state of the application before the redirect occurred. It may contain information
    * such as the URL the user was trying to access before authentication.
    * @param {User} [user] - The `user` parameter in the `onRedirectCallback` function likely
    * represents the user object returned from an authentication process. It may contain information
    * about the authenticated user, such as their sub (subject) identifier and email address.
    */
    const onRedirectCallback=()=> {
     navigate( "/auth-callback");
    }

  return (
    <Auth0Provider
        domain={domain} 
        clientId={clientID}
        authorizationParams={{
            redirect_uri: redirectUri,
            audience,
        }}
        onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

// 08181077096

export default AuthProviderWithnavigate
