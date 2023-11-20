import Dashboard from "./dashboard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

const RequireAuth = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
          try {
            const authenticated = await getAuthenticationStatus();
            console.log(authenticated);

            if (authenticated) {
              console.log("it was authenticated");
              setAuthenticated(true);
            } 
            else {
              console.log("it was not authenticated it was cap");
              navigate('/');
            }
          } 
          catch (error) {
            console.error(error);
          }
        }
    
        fetchData();
      }, []);



    const getAuthenticationStatus = async () => {
      console.log("in get authentication status")

        try {
            const response = await axios({
                method: "get",
                withCredentials: true,
                url: "https://sterilizationdirectoryserver.azurewebsites.net/auth/isauthenticated"
                
            })
            console.log("Response.data was: " + response.data);

            return response.data ? true : false

        } 
        catch (error) {
            console.log(error);}

    };

    if (authenticated) {
      return children;
    }

};

export default RequireAuth