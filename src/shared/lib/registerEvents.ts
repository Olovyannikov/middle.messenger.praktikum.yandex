const eventArray: Event[] = [];

function handleEventListeners(e: MouseEvent) {
    eventArray.forEach((target: Event) => {
        if (
            e.target &&
            e.target instanceof Element &&
            e.target.id === target.id
        ) {
            e.preventDefault();
            target.callback && e && target.callback(e);
        }
    });
}

type Event = { id: string; callback: (event: MouseEvent) => void };

export function addOnClick(
    id: string | undefined,
    callback?: (event: MouseEvent) => void,
) {
    if (id && callback) {
        eventArray.push({ id, callback });
    }
}

window.addEventListener('click', (e: MouseEvent) => handleEventListeners(e));
