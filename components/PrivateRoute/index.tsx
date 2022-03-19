import { Route } from "react-router-dom";
import { checkSession } from "../../utils/SesionStorage";

export default function PrivateRoute({ component:Component, ...rest }: any) {
  
  return checkSession('@token') ? (
    <Route
      exact
      path={rest.path}
      component={Component}
    />
  ):<div style={{display:'none'}}>{
    window.location.href = '/'}
    </div>;
}