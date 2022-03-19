import { Route } from "react-router-dom";
import { checkSession } from "../../utils/SesionStorage";

export default function PublicRoute({ component: Component, ...rest }: any) {
  
  return (
    <Route
      {...rest}
      render={() =>
        checkSession('@token') ? (
          <div style={{ display: 'none' }}>{window.location.href = '/'}</div>
        ) : (
          <Component {...rest} />
        )
      }
    />
  );
}