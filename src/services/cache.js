export async function cacheFetch(key, fetcher, ttlMs) {
    const cached = localStorage.getItem(key);
    if (cached ) {
        try {
            const {data, expiry} = JSON.parse(cached);
            if(Date.now() < expiry) {
                return data;
            }
        } catch (err) {
            console.warn("Invalid cache entry, ignoring", err);
        }
    }

    const data = await fetcher();
    localStorage.setItem(
        key,
        JSON.stringify({data, expiry: Date.now() + ttlMs})
    );
    return data;
}