import {ReactNode} from 'react'
import {toast as sonnerToast} from 'sonner'

interface ToastParams {
    message: ReactNode
    description?: string | ReactNode
    type?: '' | 'success' | 'error' | 'info' | 'warning' // possible types from sonner, todo: add promise, action and other options supported by sonner
}

export const toast = ({message = '', description = '', type = ''}: ToastParams) => {
    if (type === '') {
        sonnerToast(message, {
            description,
        })
    } else {
        sonnerToast[type](message, {
            description,
        })
    }
}