import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function Private(props) {
  const isLogin = () => !!localStorage.getItem("token");

  if (isLogin()) {
    return props.children;
  } else {
    toast.error("لطفا ابتدا وارد شوید");
    return <Navigate replace to="/" />;
  }
}

export default Private;
