import {Button} from '@/components/button'
import {TextInput} from '@/components/form-input'
import {useAuth} from '@/context/AuthContext'
import {AppRoutesEnum, AuthRoutesEnum} from '@/enums/routeEnums'
import {login} from '@/services/authService'
import {toast} from '@/utils/toastUtils'
import {Form, Formik, FormikProps} from 'formik'
import {FC, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {object, string} from 'yup'

interface Props {
    onSuccess?: () => void
}

const initialValues = {
    email: '',
    password: '',
}

const validationSchema = object().shape({
    email: string().required().label('Email'),
    password: string().required().label('Password'),
})

const LoginForm: FC<Props> = ({onSuccess}) => {
    const [loading, setLoading] = useState(false)
    const {login: setLogin} = useAuth()

    const navigate = useNavigate()

    // const [login, {isLoading}] = useAdminLoginMutation()

    const handleSubmit = async (values: any) => {
        login(values)
            .then((res) => {
                if (res.data.status === 200 || res.status === 201) {
                    toast({
                        type: 'success',
                        message: 'Login successful',
                    })
                    setLogin(
                        {
                            name: res.data.result.name,
                            email: res.data.result.email,
                        },
                        res.data.result.accessToken
                    )
                    onSuccess && onSuccess()
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <TextInput
                    label=' Email'
                    name='email'
                    placeholder='Enter your email'
                    autoComplete='username'
                />
                <TextInput
                    label='Password'
                    name='password'
                    type='password'
                    placeholder='Enter your password'
                    autoComplete='current-password'
                />
                <div className='mb-3 text-right'>
                    <Link className='underline text-black' to={AuthRoutesEnum.FORGOT_PASSWORD}>
                        Forgot Password?
                    </Link>
                </div>
                <Button
                    className='w-full'
                    variant='primary'
                    type='submit'
                    size='md'
                    loading={loading}
                >
                    Login
                </Button>
            </Form>
        </Formik>
    )
}

export default LoginForm
