import { Button } from "@/components/button"
import { TextInput } from "@/components/form-input"
import { register } from "@/services/authService"
import { toast } from "@/utils/toastUtils"
import { Form, Formik } from "formik"
import { FC, useState } from "react"
import { object, ref, string } from "yup"


interface Props {
    onSuccess?: () => void
}

const initialValues = {
    email: '',
    name: '',
    userType: 'User',
    password: '',
    confirmPassword: '',
}

const validationSchema = object().shape({
    email: string().email().required().label('Email'),
    name: string().required().label('Name'),
    userType: string().required().label('User Type'),
    password: string().required().label('Password'),
    confirmPassword:  string()
        .required('This field is required.')
        .oneOf([ref('password'), ''], 'Passwords must match'),

})

const RegisterForm: FC<Props> = ({onSuccess}) => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (values: any) => {
        setLoading(true)

        register(values).then((res) => {
            if (res.status === 201) {
                toast({
                    type: 'success',
                    message: 'Registration successful'
                })
                onSuccess && onSuccess()
            }
        }).finally(() => {
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
                    label='Name'
                    name='name'
                    placeholder='Enter your name'
                    autoComplete='name'
                />
                <TextInput
                    label='Email'
                    name='email'
                    placeholder='Enter your  email'
                    autoComplete='username'
                />
                <TextInput
                    label='Password'
                    name='password'
                    type='password'
                    placeholder='Enter your password'
                    autoComplete='current-password'
                />
                <TextInput
                    label='Confirm Password'
                    name='confirmPassword'
                    type='password'
                    placeholder='Enter your password'
                    autoComplete='current-password'
                />
                <Button type='submit' className='w-full' loading={loading}>
                    Register
                </Button>
            </Form>
        </Formik>
    )
}

export default RegisterForm