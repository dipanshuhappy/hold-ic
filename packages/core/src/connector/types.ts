import { HttpAgent, Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

export type  WalletType = "II" | "Plug" | "Stoic" | "AstroX"



export interface WalletResponse {
    type: WalletType;
    principalId: Principal;
    accountId: string;
    identity?: Identity;
    agent?: HttpAgent;
}


