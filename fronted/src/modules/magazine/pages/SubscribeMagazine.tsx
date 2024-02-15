import { Button } from "@/components/button";
import { getMagazine } from "@/services/magazine";
import { subscribeMagazine } from "@/services/subscription";
import { toast } from "@/utils/toastUtils";
import { FC, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

const SubscribeMagazine:FC = () => {
    const [loading, setLoading] = useState(true);
    const [magazine, setMagazine] = useState<any>(null);
    const navigate = useNavigate();
    
    let { id:magazineId } = useParams();

    useEffect(() => {
        if(magazineId) {
            setLoading(true);
            getMagazine(magazineId).then((res) => {
                if(res.data.result){
                    setMagazine(res.data.result);
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [magazineId]);

    const handleSubscribe = () => {
        if(!magazineId) {
            return
        }
        setLoading(true);
        subscribeMagazine(+magazineId as number).then((res) => {
            if(res.data.statusCode === 201) {
                toast({
                    type: 'success',
                    message: 'Subscribed successfully'
                });
                return navigate('/subscriptions');   
            }
        }).finally(() => {
            setLoading(false);
        });
    }


    if(!loading && !magazine) {
        return <Navigate to="/404" />
    }

    return (
        <div className="py-5">
            <div className="container">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-10 col-start-2">
                        <h1 className="text-2xl font-semibold mb-5">Subscribe Magazine</h1>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-5 col-start-2">
                        <div key={magazine?.id} className="border p-5 shadow-sm rounded-lg mb-4 flex gap-5 items-center bg-white">
                            <img src={magazine?.imagePath} className="h-24 w-24 object-cover" />
                            <div className="grow">
                                <h5 className="text-lg font-semibold">{magazine?.title}</h5>
                                <p className="opacity-80">{magazine?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 col-start-7">
                        <div className="border p-5 shadow-sm rounded-lg mb-4 bg-white">
                            <div className="flex justify-between">
                                <div className="text-xl font-semibold">Price</div>
                                <div>
                                    <span className="text-xl font-semibold">${magazine?.price}</span>
                                    <span>/month</span>
                                </div>
                            </div>
                            <div className="mt-12 text-center">
                                
                                <Button onClick={handleSubscribe} className="w-full" loading={loading}>Subscribe</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubscribeMagazine;