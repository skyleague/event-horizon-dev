export function mock<T>(): jest.MaybeMocked<T> & { mockClear(): void } {
    const cache = new Map<any, jest.Mock>()
    const handler: ProxyHandler<object> = {
        get: (_, name) => {
            if (name === 'mockClear') {
                return () => cache.clear()
            }

            if (!cache.has(name)) {
                cache.set(name, jest.fn().mockName(name.toString()))
            }

            return cache.get(name)
        },
    }
    return new Proxy({}, handler) as jest.MaybeMocked<T> & { mockClear(): void }
}
