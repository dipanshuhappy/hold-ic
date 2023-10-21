import { Provider } from "@psychedelic/plug-inpage-provider";
import { connectPlug } from "./connector";
import { WalletType } from "./connector/types";
import { IDL } from "@dfinity/candid";
import { timeStamp } from "console";

export type PlugProvider = Provider
export type CanistersInterface = {
  [canisterName: string]: {
    canisterId: string;
    idlFactory: IDL.InterfaceFactory;
  };
};

export class HoldIC {

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

  async getPrinicpal(){
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
  async getActor(name:keyof CanistersInterface){
    switch(this.wallet){
      case "Plug":
        if(this.canisters && this.canisters[name]){
          return await (window as any)?.ic?.plug.createActor({
            canisterId: this.canisters[name].canisterId,
            interfaceFactory: this.canisters[name].idlFactory}
          )
        }
        throw Error("Canister with name does not exist")
        
    }
  }
}
