import {FC} from 'react'
import LoginForm from '../components/LoginForm'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const Login: FC = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    const handleLoginSuccess = () => {
        const redirect = searchParams.get('redirect')
        if(redirect){
            return navigate(redirect)
        }
        else{
            return navigate('/')
        }
    }

    return (
        <div>
            <h1 className='text-xl font-medium mb-5 text-center'>Login to your account</h1>
            <LoginForm onSuccess={handleLoginSuccess} />
            <p className='text-center mt-5'>
                Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link>
            </p>
        </div>
    )
}

export default Login