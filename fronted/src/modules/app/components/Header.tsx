import { useAuth } from "@/context/AuthContext";
import { FC } from "react";
import { Link } from "react-router-dom";

const Header:FC = () => {
    const {user} = useAuth();

    return (
        <div className="border-b py-3 bg-white">
            <div className="container">
                <div className="flex justify-between items-center">
                    <Link to='/' className="text-xl font-bold">polyTrade</Link>
                    <div className="flex gap-4">
                        {
                            user ?(
                                <Link to="/subscriptions" className="border border-primary bg-primary text-white px-5 py-2 rounded-lg">Subscriptions</Link>
                            ) : (
                                <>
                                    <Link to="/login" className="border px-5 py-2 rounded-lg">Login</Link>
                                    <Link to="/register" className="border border-primary bg-primary text-white px-5 py-2 rounded-lg">Register</Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
