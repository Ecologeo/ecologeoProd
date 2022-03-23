import React from "react";
import { useRouter } from "next/router";
import { checkSession } from "../../utils/SesionStorage";

const WithAuth = WrappedComponent => {
  
  const Auth = (props) => {
    // checks whether we are on client / browser or server.
    const Router = useRouter();

    
    if (typeof window !== "undefined") {
            
      // If there is no access token we redirect to "/" page.
      
      if (!checkSession('@token')) {
        Router.replace("/");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return (<WrappedComponent {...props} />);
    }

    // If we are on server, return null
    return null;
  };
  return Auth;
};

WithAuth.displayName = 'WithAuth';

export default  WithAuth;