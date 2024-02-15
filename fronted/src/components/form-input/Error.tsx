import {FC} from 'react'

interface Props {
    error: string | undefined
}

const Error: FC<Props> = ({error}) => {
    return <>{error && <div className='text-red-500 mt-1 text-[12px]'>{error}</div>}</>
}

export default Error
