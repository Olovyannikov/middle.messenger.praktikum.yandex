export const searchParams = (key: string, value: string): void => {
    const url = new URL(document.location.href);
    url.searchParams.set(key, value);
    window.history.pushState(null, '', url.toString());
};
