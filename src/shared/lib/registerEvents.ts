type Event = {
    id: string;
    callback: () => void;
};

const eventArray: Event[] = [];

function handleEventListeners(e: MouseEvent) {
    eventArray.forEach((target: Event) => {
        if (
            e.target &&
            e.target instanceof Element &&
            e.target.id === target.id
        ) {
            e.preventDefault();
            target.callback && target.callback();
        }
    });
}

export function addOnClick(
    id: string | undefined,
    callback: (() => void) | undefined,
) {
    id && callback && eventArray.push({ id, callback });
}

window.addEventListener('click', (e: MouseEvent) => handleEventListeners(e));
