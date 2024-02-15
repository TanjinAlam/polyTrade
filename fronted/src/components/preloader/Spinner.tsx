import {FC} from 'react'

interface SpinnerProps {
    className?: string
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    color?: string
}

const Spinner: FC<SpinnerProps> = ({className = '', size = 'medium', color = 'white'}) => {
    const sizeClass = {
        small: 'w-[10px] h-[10px]',
        medium: 'w-[16px] h-[16px]',
        large: 'w-[22px] h-[22px]',
        xlarge: 'w-[30px] h-[30px]',
    }[size]

    return (
        <span
            className={`${className} ${sizeClass} inline-flex rounded-full animate-spin border-2 border-solid border-${color} border-t-transparent`}
        />
    )
}

export default Spinner
