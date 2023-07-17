const eventArray: EventRegistration<Event | MouseEvent>[] = [];

function handleEventListeners(event: Event) {
    const target = event.target as HTMLElement;
    const matchingEvents = eventArray.filter(
        (eventRegistration) => eventRegistration.id === target.id,
    );

    matchingEvents.forEach((eventRegistration) => {
        eventRegistration.callback(event);
    });
}

interface EventRegistration<T> {
    id: string;
    callback: (event: T) => void;
}

export function addOnClick(
    id: string | undefined,
    callback?: (event: Event) => void,
) {
    if (id && callback) {
        eventArray.push({ id, callback });
    }
}

export function addOnSubmit(
    id: string | undefined,
    callback?: (event: Event) => void,
) {
    if (id && callback) {
        eventArray.push({ id, callback });
    }
}

window.addEventListener('click', handleEventListeners);
window.addEventListener('submit', handleEventListeners);