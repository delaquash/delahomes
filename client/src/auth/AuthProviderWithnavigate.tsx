import React from "react";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";

interface Props {
    children: React.ReactNode
}


const AuthProviderWithnavigate = ({ children }: Props) => {
    const domain = import.meta.env.VITE_AUTH_DOMAIN;
    const clientID = import.meta.env.VITE_AUTH_CLIENTID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI;
    // const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    if(!domain || !clientID || !redirectUri) {
        throw new Error("Unable to initialize auth!!!")
    }

    const onRedirectCallback=(appState?: AppState, user?: User)=> {
        console.log("USER", user)
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
