import {useField} from 'formik'
import {CSSProperties, ChangeEvent, FC, InputHTMLAttributes, ReactNode} from 'react'
import Error from '../Error'
import Label from '../Label'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
    name: string
    label?: string | ReactNode
    labelStyle?: string | CSSProperties
    containerStyle?: string | CSSProperties
    size?: 'sm' | 'md' | 'lg' | 'xl'
    showOptionalLabel?: boolean
    validationError?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    noBorder?: boolean
    helperMessage?: string | ReactNode
}

const TextInput: FC<Props> = ({
    name,
    label,
    showOptionalLabel = false,
    className = '',
    size = 'md',
    containerStyle,
    labelStyle,
    validationError,
    onChange,
    noBorder = false,
    helperMessage,
    ...rest
}) => {
    const sizeClass = {
        sm: 'text-xs px-3 h-[34px] rounded-[4px]',
        md: 'text px-4 h-[42px] rounded-[6px]',
        lg: 'text-lg px-6 h-[56px] rounded-[10px]',
        xl: 'text-xl px-8 h-[72px] rounded-[15]',
    }[size]

    const [field, meta, helpers] = useField(name || '')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        field.onChange({target: {name, value: e.target.value}})
        onChange && onChange(e)
    }

    return (
        <div
            className={`mb-4 ${typeof containerStyle === 'string' && containerStyle}`}
            style={(typeof containerStyle === 'object' && containerStyle) || undefined}
        >
            <Label label={label} labelStyle={labelStyle} isOptional={showOptionalLabel} />
            <input
                className={` leading-[1.5] w-full block outline-none  ${
                    noBorder ? '' : 'border border-gray-300  focus:border-primary'
                }  placeholder:text-gray-300 ${sizeClass} ${className}`}
                onChange={handleChange}
                name={name}
                value={rest.value || field.value}
                {...rest}
            />
            {helperMessage &&
                (typeof helperMessage === 'string' ? (
                    <div className='text-sm text-gray-500'>{helperMessage}</div>
                ) : (
                    helperMessage
                ))}
            {meta?.touched && <Error error={meta.error} />}
        </div>
    )
}

export default TextInput
