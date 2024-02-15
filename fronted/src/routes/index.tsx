import BaseApp from "@/modules/app/components/BaseApp"
import { FC } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import authRoutes from "./AuthRoutes"
import appRoutes from "./AppRoutes"
import errorRoutes from "./ErrorRoutes"

const router = createBrowserRouter([
    {
        element: <BaseApp />,
        children:  [...authRoutes, ...appRoutes, ...errorRoutes],
    },
])

const AllRoutes:FC = () => {
    return <RouterProvider router={router} />
}

export default AllRoutes