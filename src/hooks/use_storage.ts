// #Best Next Storage API Hook that Resolves RHE(React-Hydration-Error) in NextJS
// ? Easy to use
import React from "react";

interface useStore_Type {
    Key?: string
    Value?: any
}

interface useStore_Return_Type {
    SetStorage: Function
    GetStorage: Function
    RemoveStorage: Function
    ClearStorage: Function
}
/**
 * A Function to use localStorage or sessionStorage in React with NextJS
 * >```JS
 * > // LocalStorage
 * > const GetStorage = useStore("localStorage", { Key: "save" }).GetStorage();
 * > const SAVE = useStore("localStorage", { Key: "save" , Value: true }).SetStorage();
 * > const RemoveStorage = useStore("localStorage", { Key: "save").RemoveStorage();
 * > const ClearStorage = useStore("localStorage").ClearStorage();
 * >
 * > // SessionStorage
 * > const GetStorage = useStore("sessionStorage", { Key: "save" }).GetStorage();
 * > const SAVE = useStore("sessionStorage", { Key: "save" , Value: true }).SetStorage();
 * > const RemoveStorage = useStore("sessionStorage", { Key: "save").RemoveStorage();
 * > const ClearStorage = useStore("sessionStorage").ClearStorage();
 * >```
 * @param Store localStorage | sessionStorage
 * @param Config Key: string, Value: any
 * @returns SetStorage: Function, GetStorage: Function, RemoveStorage: Function, ClearStorage: Function
 */
export default function useStorage(
    Store: 'localStorage' | 'sessionStorage' = 'localStorage',
): useStore_Return_Type {
    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
        setIsReady(true);
    }, []);

    function SetStorage(Config: useStore_Type) {
        if (isReady && typeof window !== 'undefined' && window[Store] && Config.Key && Config.Value) {
            if (Config.Key && Config.Value) {
                window[Store].setItem(Config.Key, Config.Value);
            }
        }
    }

    function GetStorage(Config: useStore_Type) {
        if (isReady && typeof window !== 'undefined' && window[Store] && Config.Key) {
            const _Value = window[Store].getItem(Config.Key!);

            return _Value;
        }
    }

    function RemoveStorage(Config: useStore_Type) {
        if (isReady && typeof window !== 'undefined' && window[Store] && Config.Key) {
            if (Config.Key) {
                window[Store].removeItem(Config.Key);
            }
        }
    }

  function ClearStorage() {
        if (isReady && typeof window !== 'undefined' && window[Store]) {
            window[Store].ClearStorage();
        }
    }

    return {
        GetStorage,
        SetStorage,
        RemoveStorage,
        ClearStorage,
    };
}

export type {
    useStore_Type,
    useStore_Return_Type,
}