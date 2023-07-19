export const inputmask = (
    selector: string,
    maskMatrix = `+7 (___) ___ __ __`,
) => {
    const setCursorPosition = (pos: number, el: HTMLInputElement) => {
        el.focus();
        el.setSelectionRange(pos, pos);
    };

    function mask(this: HTMLInputElement, e: Event) {
        const matrix = maskMatrix;
        let i = 0;
        const def = matrix.replace(/\D/g, '');
        let val = this.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function (a) {
            if (/[_\d]/.test(a) && i < val.length) {
                return val.charAt(i++);
            } else if (i >= val.length) {
                return '';
            }

            return a;
        });

        if (e.type === 'blur') {
            if (+this.value.length === 2) {
                this.value = '';
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    }

    const inputs = document.querySelectorAll<HTMLInputElement>(selector);

    inputs.forEach((input) => {
        input.addEventListener('input', mask);
        input.addEventListener('focus', mask);
        // input.addEventListener('blur', mask);
    });
};
