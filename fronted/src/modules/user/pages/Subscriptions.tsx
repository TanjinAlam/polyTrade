import { Button } from "@/components/button";
import { cancelSubscription, getSubscriptions } from "@/services/subscription";
import { toast } from "@/utils/toastUtils";
import { FC, useEffect, useState } from "react";

const Subscriptions:FC = () => {
    const [loading, setLoading] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const [meta, setMeta] = useState({} as any);

    useEffect(() => {
        setLoading(true);
        getSubscriptions().then((data) => {
            setSubscriptions(data.data?.result[0].magazineSubscriptions);
            setMeta(data.data?.meta);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleCancelSubscription = (id:number) => {
        cancelSubscription(id).then((res) => {
            if(res.data.statusCode === 201) {
                toast({
                    type: 'success',
                    message: 'Subscription cancel successfully'
                }); 
            }
        })
    }
    

    return (
        <div className="py-5">
            <div className="container">
                <div className="grid grid-cols-12">
                    <div className="col-span-8 col-start-3">
                        <h1 className="text-2xl font-semibold mb-5">Subscriptions</h1>
                        <div>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                subscriptions.map((subscription:any) => (
                                    <div key={subscription.id} className="border p-5 shadow-sm rounded-lg mb-4 flex gap-5 items-center bg-white">
                                        <img src={subscription?.magazine?.imagePath} className="h-24 w-24 object-cover" />
                                        <div className="grow">
                                            <h5 className="text-lg font-semibold">{subscription?.magazine?.title}</h5>
                                            <p className="opacity-80">{subscription?.magazine?.description}</p>
                                        </div>
                                        <div className="grow">
                                            <span className="text-xl font-semibold">${subscription?.magazine?.price}</span>
                                            <span>/month</span>
                                        </div>
                                        <div>
                                            {
                                                subscription?.status ? (
                                                    <Button variant="transparent" onClick={() => handleCancelSubscription(subscription?.magazine?.id)}>
                                                        Cancel
                                                    </Button>
                                                ) : (
                                                    <span className="text-red-500">Cancelled</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subscriptions;