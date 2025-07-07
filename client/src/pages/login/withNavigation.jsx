// withNavigation.jsx
import { withRouter } from "react-router-dom";

const withNavigation = (Component) => {
  const Wrapper = (props) => {
    const { history } = props;
    return <Component {...props} navigate={history.push} />;
  };
  return withRouter(Wrapper);
};

export default withNavigation;