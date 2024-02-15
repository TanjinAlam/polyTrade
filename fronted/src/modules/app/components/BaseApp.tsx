import {AuthEnum} from '@/enums/authEnums'
import {AuthRoutesEnum} from '@/enums/routeEnums'
import {FC, useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useAuth } from '@/context/AuthContext'

const BaseApp: FC = () => {
    const {user, login} = useAuth()

    const localAccessToken = localStorage.getItem(AuthEnum.LOCAL_STORAGE_TOKEN_KEY)
    const localUser = localStorage.getItem(AuthEnum.LOCAL_STORAGE_USER_KEY)
    useEffect(() => {
        if (localAccessToken && localUser) {
            login(JSON.parse(localUser as string), localAccessToken as string)
        }
    }, [])


    return (
        <div className='flex flex-col min-h-screen bg-slate-100 '>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default BaseApp