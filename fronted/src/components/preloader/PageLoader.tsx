import {FC} from 'react'

const PageLoader: FC = () => {
    // create a page loader with tailwind css which will be sticky to the top of the page thin bar
    return (
        <div className={`w-full overflow-hidden fixed top-0 left-0 right-0`}>
            <div className='animate-[loadingBar_1.6s_infinite]'>
                <div className='w-[28%] h-[2px] bg-gradient-to-r from-transparent via-blue-600 to-transparent'></div>
            </div>
        </div>
    )
}

export default PageLoader
