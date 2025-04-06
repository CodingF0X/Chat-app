import Routes from "../components/Routes";
import { client } from "../constants/apollo-client";
import { authenticatedVar } from "../constants/authenticated";

const onLogout = ()=>{
    Routes.navigate("/login");
    client.resetStore();
    authenticatedVar(false);
}

export default onLogout;