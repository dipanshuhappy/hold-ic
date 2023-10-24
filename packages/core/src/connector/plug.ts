import { Provider, WalletConnectRPC } from '@psychedelic/plug-inpage-provider';

export const connectPlug = async ({
    debug = true,
    whitelist = [],
    timeout = 120000,
    host,
    onConnectCallback,
    dev

}: {
    debug?: boolean;
    whitelist?: string[];
    host?: string;
    timeout?: number;
    onConnectCallback: (...args: any[]) => any;
    dev: boolean
}) => {
    if (!(window as any).ic?.plug) {
        if (!/Mobi/i.test(window.navigator.userAgent)) {
            window.open('https://plugwallet.ooo/', '_blank');
            return;
        }
        const clientRPC = new WalletConnectRPC({ window, debug });

        const plugProvider = new Provider(clientRPC);


        const ic = (window as any).ic || {};
        (window as any).ic = {
            ...ic,
            plug: plugProvider,


        }


    }
    const connected = await (window as any)?.ic?.plug?.requestConnect({
        whitelist,
        host,
        timeout,
        dev
    });
    if (!connected) return;
    onConnectCallback(connected);

}

export const disconnectPlug = async (onDisconnectCallback: (...args: any[]) => any) => {
    await (window as any)?.ic?.plug.disconnect().catch(() => console.log("error"))
    onDisconnectCallback();
}
