import { Provider } from "@psychedelic/plug-inpage-provider";
import { connectPlug } from "./connector";
import { WalletType } from "./connector/types";
import { IDL } from "@dfinity/candid";
import { ActorSubclass, Agent } from "@dfinity/agent";
import { disconnectPlug } from "./connector/plug";


export type PlugProvider = Provider

export type CanistersInterface = {
  [canisterName: string]: {
    canisterId: string;
    idlFactory: IDL.InterfaceFactory;
  };
};
export type CanisterInterfaceKey = keyof CanistersInterface
export interface HoldICInterface {
  provider: PlugProvider | undefined;
  whitelist: string[];
  host: string;
  wallet: WalletType | undefined;
  canisters?: CanistersInterface;
  isConnected: boolean;
  dev: boolean;



  connect(type: WalletType, onConnectCallback: (...args: any[]) => any): Promise<void>;

  getPrinicpal(): Promise<string | undefined>;



  getActor<T>(name: keyof CanistersInterface): Promise<ActorSubclass<T> | undefined>;

  disconnect(onDisconnectCallback: (...args: any[]) => any): Promise<void>;
}

export class HoldIC implements HoldICInterface {

  provider: PlugProvider | undefined;
  whitelist: string[] = [];
  host: string = "https://mainnet.dfinity.network/"
  wallet: WalletType | undefined;
  canisters?: CanistersInterface;
  isConnected: boolean = false;
  dev: boolean = true;
  constructor({
    whitelist,
    canisters,
    host = "https://mainnet.dfinity.network/",
    dev = true
  }: {
    whitelist: string[];
    host?: string;
    canisters?: CanistersInterface
    dev?: boolean
  }) {
    this.whitelist = whitelist
    this.host = host;
    this.canisters = canisters
    this.dev = dev;
  }

  async connect(type: WalletType, onConnectCallback: (...args: any[]) => any,) {
    switch (type) {
      case "Plug":
        await connectPlug(
          {
            onConnectCallback,
            debug: true,
            host: this.host,
            whitelist: this.whitelist,
            dev: this.dev
          }
        )
        this.provider = (window as any)?.ic?.plug
        this.wallet = type
        this.isConnected = true;
        break;

      default:
        break;
    }
  }

  async getPrinicpal(): Promise<string | undefined> {
    switch (this.wallet) {
      case "Plug":
        return this.provider?.principalId
      default:
        break;
    }
  }

  async disconnect(onDisconnectCallback: (...args: any[]) => any) {
    this.isConnected = false;

    switch (this.wallet) {
      case "Plug":
        await disconnectPlug(
          onDisconnectCallback
        ).catch(console.log)
      default:
        break;
    }
  }

  async getActor<T>(name: CanisterInterfaceKey) {
    switch (this.wallet) {
      case "Plug":
        if (this.canisters && this.canisters[name]) {
          return (await ((window as any)?.ic?.plug.createActor({
            canisterId: this.canisters[name].canisterId,
            interfaceFactory: this.canisters[name].idlFactory
          }
          ))) as ActorSubclass<T>
        }
        throw Error("Canister with name does not exist")
    }
    return;
  }

  async getAgent(): Promise<Agent | undefined> {
    switch (this.wallet) {
      case "Plug":
        return (window as any)?.ic?.plug.agent
    }
  }
}
