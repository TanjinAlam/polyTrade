import { FC } from "react";

const Footer:FC = () => {
    return (
        <div className="mt-auto text-center text-sm">
            <div className="container">
                <div className="border-t py-5">
                    <div>&copy; {new Date().getFullYear()} Poly Trade</div>
                </div>
            </div>
        </div>
    )
}

export default Footer
