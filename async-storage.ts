export type AsyncStorageType = {
    getItemSync?: (key:string)=>string|null
    getItem: (key:string, cb?:(err:Error|null, res:string|null)=>void)=>Promise<string|null>
    setItem: (key:string, value: string)=>Promise<string|null>
} | null
const AsyncStorage: AsyncStorageType = {
    getItemSync: function(key) {
        const data = localStorage.getItem(key);
        if (data !== null) {
            return data;
        } else {
            throw new Error(`Key ${key} not found`);
        }
    },
    getItem: function (key, cb) {
        return new Promise<any>((resolve, reject) => {
            try {
                const result = this.getItemSync!(key);
                cb?.(null, result)
                resolve(result)
            } catch (err) {
                cb && cb(err as Error, null);
                reject(err);
            }
        });
    },
    setItem: function (key:string, value:string, cb?: (err:Error|null, res:string|null)=>void) {
        return new Promise<any>((resolve, reject) => {
            try {
                localStorage.setItem(key, value);
                cb && cb(null, value);
                resolve(value);
            } catch (err) {
                cb && cb(err as Error, null);
                reject(err);
            }
        });
    }
};

export default AsyncStorage
