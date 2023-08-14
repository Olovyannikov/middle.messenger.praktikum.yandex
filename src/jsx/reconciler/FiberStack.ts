let index = 0;

const getIndex = () => {
    const currentIndex = index;
    index++;
    return currentIndex;
};

const resetIndex = () => {
    index = 0;
};

export { getIndex, resetIndex };
