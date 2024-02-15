import { useAuth } from "@/context/AuthContext";
import { FC} from "react";
import { Navigate, Outlet } from "react-router";


const AuthGuard: FC= () => {

    const {user, token} = useAuth();

    if (!user || !token) {
        return <Navigate to={`/login?redirect=${window.location.pathname}`} />
    }

    return (
        <>
            <Outlet/>
        </>
    )
}

export default AuthGuard;