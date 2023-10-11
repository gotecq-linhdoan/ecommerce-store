/* eslint-disable @next/next/no-img-element */
"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);
    const user = useCurrentUser();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    if (!isMounted) {
        return null;
    }

    const logOut = async () => {
        try{
            await fetch('api/auth/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            router.push('/');
            
        } catch(error){
            console.log(error);
        }
    };

    return (
        <div className="ml-auto flex items-center gap-x-4">
            {user
                ? <div className="flex justify-between items-center">
                    <div onClick={() => router.push('/order')} className="flex px-4 py-2 border-r-2 rounded-l-full cursor-pointer bg-white justify-between gap-2 items-center ">
                        <span className="cursor-pointer text-sm font-bold text-white">
                            {JSON.parse(user).name}
                        </span>
                        <img className="rounded-full" src={`https://ui-avatars.com/api/?name=${JSON.parse(user).name}&size=22`} alt="" />
                    </div>
                    <Button onClick={logOut} className={cn("flex items-center rounded-none rounded-r-full bg-black px-4 py-2")}>
                        <span className="text-sm font-bold text-white">
                            Logout
                        </span>
                    </Button>
                </div>
                : <Button onClick={() => router.push('/login')} className="flex items-center rounded-full bg-black px-4 py-2">
                    <span className="text-sm font-bold text-white">
                        Login
                    </span>
                </Button>
            }
            <Button onClick={() => router.push('/cart')} className="flex items-center rounded-full bg-black px-4 py-2">
                <ShoppingBag
                    size={20}
                />
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
        </div>
    );
}

export default NavbarActions;