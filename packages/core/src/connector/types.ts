export enum WalletType {
    II,
    Plug,
    Stoic,
    Icpbox,
    AstroX,
}

export interface WalletResponse {
    type: WalletType;
    principalId: Principal;
    accountId: string;
    identity?: Identity;
    agent?: HttpAgent;
}
  