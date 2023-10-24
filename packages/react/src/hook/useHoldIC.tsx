import { useContext, useEffect, useState } from "react";
import HoldIcContext from "../context/hold-ic";
import { HoldIC } from "@hold-ic/core";

export type UseHoldICReturnType = {
    holdIC: HoldIC;
    isConnected: boolean
}
export default function useHoldIc(): UseHoldICReturnType {
    const holdIC = useContext(HoldIcContext)
    const [isConnected, setIsConnected] = useState(false)
    useEffect(() => {
        setIsConnected(holdIC.isConnected)
    }, [holdIC.isConnected])
    return {
        holdIC,
        isConnected
    }
}
