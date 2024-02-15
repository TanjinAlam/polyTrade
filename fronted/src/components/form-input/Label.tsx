import {CSSProperties, FC, ReactNode} from 'react'

interface Props {
    label?: string | ReactNode
    labelStyle?: string | CSSProperties
    isOptional?: boolean
}

const Label: FC<Props> = ({label, labelStyle, isOptional}) => {
    return (
        <>
            {label && (
                <label
                    className={`text-[12px] inline-block mb-1 text-gray-500 ${
                        typeof labelStyle === 'string' && labelStyle
                    }`}
                    style={(typeof labelStyle === 'object' && labelStyle) || undefined}
                >
                    {label}
                    {isOptional && <span className='text-gray-400'>(Optional)</span>}
                </label>
            )}
        </>
    )
}

export default Label
