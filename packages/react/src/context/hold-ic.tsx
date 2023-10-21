import React from "react";
import { HoldIC } from "@hold-ic/core"
const HoldIcContext = React.createContext<HoldIC>(new HoldIC({
    whitelist: []
}))
export default HoldIcContext;