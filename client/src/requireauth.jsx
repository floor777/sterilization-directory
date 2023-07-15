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

            if (authenticated) {
              setAuthenticated(true);
            } 
            else {
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

        try {
            const response = await axios({
                method: "get",
                withCredentials: true,
                url: "http://localhost:3000/auth/isauthenticated"
            })

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