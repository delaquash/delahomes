import React from "react";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
import { useCreateUserRequest } from "@/helper/myUserApi";

interface Props {
    children: React.ReactNode
}


const AuthProviderWithnavigate = ({ children }: Props) => {
  const { createUser } = useCreateUserRequest();
    const domain = import.meta.env.VITE_AUTH_DOMAIN;
    const clientID = import.meta.env.VITE_AUTH_CLIENTID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI;
    if(!domain || !clientID || !redirectUri) {
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
    const onRedirectCallback=(appState?: AppState, user?: User)=> {
        if(user?.sub && user?.email) {
          createUser({ auth0Id: user.sub, email: user.email })
        }
    }

  return (
    <Auth0Provider
        domain={domain} 
        clientId={clientID}
        authorizationParams={{
            redirect_uri: redirectUri
        }}
        onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

// 08181077096

export default AuthProviderWithnavigate
