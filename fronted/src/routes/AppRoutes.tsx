import {AppRoutesEnum} from '@/enums/routeEnums'
import AllMagazine from '@/modules/magazine/pages/AllMagazine'
import SubscribeMagazine from '@/modules/magazine/pages/SubscribeMagazine'
import AuthGuard from '@/modules/user/components/AuthGuard'
import Subscriptions from '@/modules/user/pages/Subscriptions'
import { RouteObject } from 'react-router-dom'

const appRoutes: RouteObject[] = [
    {
        path: AppRoutesEnum.HOME,
        element: <AllMagazine />,
    },
    {
        element: <AuthGuard />,
        children: [
            {
                path: AppRoutesEnum.SUBSCRIBE_TO_MAGAZINE,
                element: <SubscribeMagazine />,
            },
            {
                path: AppRoutesEnum.MY_SUBSCRIPTIONS,
                element: <Subscriptions />,
            }
        ],
    }
]

export default appRoutes