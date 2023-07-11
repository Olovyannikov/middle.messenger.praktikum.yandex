export const useRouter = () => {
    const location = window.location;
    const { pathname, hash, search } = location;

    return {
        location,
        pathname,
        hash,
        search,
        history,
    };
};
