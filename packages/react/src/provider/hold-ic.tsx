import { HoldIC } from "@hold-ic/core";
import React, { ReactNode } from "react";
import HoldIcContext from "../context/hold-ic";


export default function HoldIcProvider({
    holdIc,
    children

}: {
    holdIc: HoldIC,
    children: ReactNode
}) {
    return (
        <HoldIcContext.Provider
            value={holdIc}
        >
            {children}
        </HoldIcContext.Provider>
    )
}