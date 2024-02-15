import {AuthRoutesEnum} from '@/enums/routeEnums'
import AuthLayout from '@/modules/auth/components/AuthLayout'
import ForgotPassword from '@/modules/auth/pages/ForgotPassword'
import Login from '@/modules/auth/pages/Login'
import Register from '@/modules/auth/pages/Register'
import {RouteObject} from 'react-router-dom'


const authRoutes: RouteObject[] = [
    {
        element: <AuthLayout />,
        children: [
            {
                path: AuthRoutesEnum.LOGIN,
                element: <Login />,
            },
            {
                path: AuthRoutesEnum.REGISTER,
                element: <Register />,
            },
            {
                path: AuthRoutesEnum.FORGOT_PASSWORD,
                element: <ForgotPassword />,
            }
        ],
    },
]

export default authRoutes