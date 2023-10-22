import { Provider } from "@psychedelic/plug-inpage-provider";
import { connectPlug } from "./connector";
import { WalletType } from "./connector/types";
import { IDL } from "@dfinity/candid";
import { ActorSubclass } from "@dfinity/agent";


export type PlugProvider = Provider

export type CanistersInterface = {
  [canisterName: string]: {
    canisterId: string;
    idlFactory: IDL.InterfaceFactory;
  };
};
export type  CanisterInterfaceKey  =  keyof CanistersInterface
export interface HoldICInterface {
  provider: PlugProvider | undefined;
  whitelist: string[];
  host: string;
  wallet: WalletType | undefined;
  canisters?: CanistersInterface;

  

  connect(type: WalletType, onConnectCallback: (...args: any[]) => any): Promise<void>;

  getPrinicpal(): Promise<string | undefined>;

  isConnected(): Promise<boolean>;

  getActor<T>(name: keyof CanistersInterface): Promise<ActorSubclass<T> | undefined>; 
}

export class HoldIC implements HoldICInterface {

  provider  : PlugProvider | undefined ;
  whitelist : string[] = [];
  host : string = "https://mainnet.dfinity.network/"
  wallet: WalletType | undefined;
  canisters? :  CanistersInterface;
  constructor({
    whitelist,
    canisters,
    host="https://mainnet.dfinity.network/"
  }:{
    whitelist:string[];
    host?:string;
    canisters? : CanistersInterface
  }){
    this.whitelist = whitelist
    this.host = host;
    this.canisters = canisters
  }
  
  async connect(type:WalletType,onConnectCallback: (...args: any[]) => any,){
      switch (type) {
          case "Plug":
              await connectPlug(
                {
                  onConnectCallback,
                  debug:true,
                  host:this.host,
                  whitelist:this.whitelist,
                }
              ) 
              this.provider = (window as any)?.ic?.plug
              this.wallet = type
              break;
      
          default:
              break;
      }
  }

  async getPrinicpal(): Promise<string|undefined>{
     switch (this.wallet) {
      case "Plug":
        return this.provider?.principalId     
      default:
        break;
     }
  }
  async isConnected(){
    switch(this.wallet){
      case "Plug":
        return await (window as any)?.ic?.plug.isConnected()
      default:
        break;
    }
  }
  async getActor<T>(name:CanisterInterfaceKey){
    switch(this.wallet){
      case "Plug":
        if(this.canisters && this.canisters[name]){
          return (await ((window as any)?.ic?.plug.createActor({
            canisterId: this.canisters[name].canisterId,
            interfaceFactory: this.canisters[name].idlFactory} 
          ))) as ActorSubclass<T>
        }
        throw Error("Canister with name does not exist")
    }
    return;
  }
}
