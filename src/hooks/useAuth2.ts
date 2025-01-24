import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { jwtDecode } from "jwt-decode";
import { User } from "../Authentication/AuthModel";
import { setUser } from "../store/authSlice";

const useAuth2 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const login = (token: string) => {
    const jwtUser = jwtDecode<User>(token);
    dispatch(setUser(jwtUser));
  };

  const signup = (token: string) => {
    const jwtUser = jwtDecode<User>(token);
    dispatch(setUser(jwtUser));
  };

  const logout = () => {
    dispatch(setUser(null));
  };

  return { user, login, signup, logout };
};

export default useAuth2;
