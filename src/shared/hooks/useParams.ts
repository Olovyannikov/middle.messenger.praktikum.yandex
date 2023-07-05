
export const useParams = () => {
    const location = window.location;
    const params = new URLSearchParams(location.search);
    const keys = params.keys();
    const values = params.values();
    const entries = [];


    for (const [key, value] of params.entries()) {
        entries.push({key, value});
    }


    return {
        params,
        keys,
        values,
        entries
    }
}