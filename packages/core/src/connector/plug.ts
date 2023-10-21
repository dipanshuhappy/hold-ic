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
    if(!(window as any).ic?.plug){
        window.open('https://plugwallet.ooo/', '_blank');
        return;
    }
    const clientRPC = new WalletConnectRPC({
        window:window,
        debug
    });
    const plugProvider = new Provider(clientRPC);
    const ic = (window as any).ic || {};
    (window as any).ic = {
        ...ic,
        plug: plugProvider,
    };

   
    const connected = await (window as any)?.ic?.plug?.requestConnect({
        whitelist,
        host,
        timeout,
    });
    if (!connected) return;
    onConnectCallback(connected);
}