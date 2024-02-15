import {FC} from 'react'
import RegisterForm from '../components/RegisterForm'
import { Link, useNavigate } from 'react-router-dom'

const Register: FC = () => {
    const navigate = useNavigate()

    const handleSuccess = () => {
        return navigate('/login')
    }

    return (
        <div>
            <h1 className='text-xl font-medium mb-5 text-center'>Register to your account</h1>
            <RegisterForm onSuccess={handleSuccess} />
            <p className='text-center mt-5'>
                Already have an account? <Link to='/login' className='text-blue-500'>Login</Link>
            </p>
        </div>
    )
}

export default Register