import { useContext } from "react";
import HoldIcContext from "../context/hold-ic";
import { HoldIC } from "@hold-ic/core";

export default function useHoldIc(): HoldIC {
    const holdIC = useContext(HoldIcContext)
    return holdIC
}
