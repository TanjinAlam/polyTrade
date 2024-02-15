import { getMagazines } from "@/services/magazine";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllMagazine:FC = () => {
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState({} as any);


    useEffect(() => {
        setLoading(true);
        getMagazines({limit:10}).then((data) => {
            setMagazines(data.data?.result);
            setMeta(data.data?.meta);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="py-5">
            <div className="container">
                <div className="grid grid-cols-12">
                    <div className="col-span-8 col-start-3">
                    <h1 className="text-2xl font-semibold mb-5">All Magazine</h1>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            magazines?.map((magazine:any) => (
                                <div key={magazine?.id} className="border p-5 shadow-sm rounded-lg mb-4 flex gap-5 items-center bg-white">
                                    <img src={magazine?.imagePath} className="h-24 w-24 object-cover" />
                                    <div className="grow">
                                        <h5 className="text-lg font-semibold">{magazine?.title}</h5>
                                        <p className="opacity-80">{magazine?.description}</p>
                                    </div>
                                    <div className="grow">
                                        <span className="text-xl font-semibold">${magazine?.price}</span>
                                        <span>/month</span>
                                    </div>
                                    <div className="shrink-0">
                                        <Link to={`/magazine/${magazine?.id}/subscribe`} className="border px-5 py-2 rounded-lg hover:bg-primary hover:border-primary hover:text-white">Subscribe</Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

    export default AllMagazine;