import { useState } from '../';
import { State } from '../core/models';

export const useUpdate = () => {
    const [, setState] = useState(null);
    return () => {
        State.pendingUpdate = true;
        setState(null);
    };
};
