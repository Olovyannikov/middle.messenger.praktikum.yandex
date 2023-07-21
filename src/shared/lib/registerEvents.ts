const eventArray: EventRegistration<Event | FocusEvent | MouseEvent>[] = [];

function handleEventListeners(event: Event | FocusEvent | MouseEvent) {
    const target = event.target as HTMLElement;

    if (event.type === 'blur') {
        const matchingEvents = eventArray.filter(
            (eventRegistration) =>
                eventRegistration.id === (target as HTMLInputElement).name,
        );

        matchingEvents.forEach((eventRegistration) => {
            eventRegistration.callback(event);
        });
    }

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

export function addEventListener(
    id: string | undefined,
    callback?: (event: Event | MouseEvent | FocusEvent) => void,
) {
    if (id && callback) {
        eventArray.push({ id, callback });
    }
}

window.addEventListener('click', handleEventListeners);
window.addEventListener('submit', handleEventListeners);
window.addEventListener('blur', handleEventListeners, true);
