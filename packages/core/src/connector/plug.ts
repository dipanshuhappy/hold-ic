import { Provider, WalletConnectRPC } from '@psychedelic/plug-inpage-provider';

export const connectPlug = async ({
    debug = true,
    whitelist = [],
    timeout = 120000,
    host,
    onConnectCallback
    
}:{
    debug?:boolean;
    whitelist?: string[];
    host?:string;
    timeout?: number;
    onConnectCallback: (...args: any[]) => any;
})  =>{
    if (!(window as any).ic?.plug) {
        if (!/Mobi/i.test(window.navigator.userAgent)) {
          window.open('https://plugwallet.ooo/', '_blank');
          return;
        }
        const clientRPC = new WalletConnectRPC({ window, debug });
  
        const plugProvider = new Provider(clientRPC);
        plugProvider.createActor
  
        const ic = (window as any).ic || {};
        (window as any).ic = {
          ...ic,
          plug: plugProvider,
        };
    }
    const connected = await (window as any)?.ic?.plug?.requestConnect({
        whitelist,
        host,
        timeout,
    });
    if (!connected) return;
    onConnectCallback(connected);
}