import {useEffectOnce, useLocalStorage} from "react-use";
import {userLogout} from "../../lib/api/UserApi.js";
import {alertError, alertLoading, closeLoading} from "../../lib/alert.js";
import {useNavigate} from "react-router";

export default function UserLogout() {

  const [token, setToken] = useLocalStorage("token", "")
  const navigate = useNavigate();

  async function handleLogout() {
    alertLoading("Logging out...");

    try {
      const response = await userLogout(token);
      const responseBody = await response.json();
      console.log(responseBody);
      closeLoading();

      if (response.status === 200) {
        setToken("");
        await navigate({
          pathname: "/login"
        })
      } else {
        await alertError(responseBody.errors);
      }
    } catch (error) {
      closeLoading();
      await alertError("An error occurred during logout. Please try again.");
    }
  }

  useEffectOnce(() => {
    handleLogout()
      .then(() => console.log("User logged out successfully"));
  })

  return <>
  </>
}