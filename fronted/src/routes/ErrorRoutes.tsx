import {ErrorRoutesEnum} from '@/enums/routeEnums'
import Page404 from '@/modules/error/pages/Error404'
import {Navigate, RouteObject} from 'react-router-dom'

const errorRoutes: RouteObject[] = [
    {
        path: ErrorRoutesEnum.NOT_FOUND,
        element: <Page404 />,
    },
    {
        path: '/*',
        element: <Navigate to={ErrorRoutesEnum.NOT_FOUND} replace />,
    },
]

export default errorRoutes