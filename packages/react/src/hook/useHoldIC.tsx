import { useContext } from "react";
import HoldIcContext from "../context/hold-ic";

export default function useHoldIc() {
    const holdIC = useContext(HoldIcContext)

    return {
        ...holdIC
    }
}