import { CanistersInterface } from "@hold-ic/core"
import HoldIcContext from "../context/hold-ic"
import { useContext, useEffect, useState } from "react"
import { ActorSubclass } from "@dfinity/agent"
export default function useActor<T>(name: keyof CanistersInterface) {
    const holdIc = useContext(HoldIcContext)
    const [actor, setActor] = useState<ActorSubclass<T>>()
    useEffect(() => {
        if (!actor) {
            holdIc.getActor(name).then((newActor: ActorSubclass<T>) => {
                setActor(newActor)
            })
        }
    }, [])

    return actor
}