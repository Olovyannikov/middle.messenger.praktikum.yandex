let info: { i: number; s: { current: any }[] } | null = null;
export const getInfo = (): { i: number; s: { current: any }[] } | null => info;

export const useEffect = <T extends Element>(current: T): T => {
    const info = getInfo();
    if (info) {
        const { i, s } = info;
        if (i === s.length) s.push({ current });
        return s[info.i++].current;
    }
    throw new Error('Ошибка при инициализации итератора');
};
