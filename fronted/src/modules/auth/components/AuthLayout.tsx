import {FC} from 'react'
import {Outlet} from 'react-router-dom'

const AuthLayout: FC = () => {
    return (
        <div className='grow flex items-center justify-center bg-slate-100'>
            <div className='max-w-[400px] w-full px-6 py-8 bg-white border border-slate-200 shadow-sm rounded-md'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout
