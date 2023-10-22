import { CanistersInterface } from "@hold-ic/core"
import HoldIcContext from "../context/hold-ic"
import { useContext, useEffect, useState } from "react"
import { Actor, ActorSubclass } from "@dfinity/agent"
import useHoldIc from "./useHoldIC"
export default function useActor<T>(name: keyof CanistersInterface): Actor | undefined {
    const holdIc = useHoldIc()

    const [actor, setActor] = useState<Actor>()
    useEffect(() => {
        if (!actor) {
            holdIc.getActor(name).then((newActor) => {
                setActor(newActor)
            })
        }
    }, [])
    return actor
}