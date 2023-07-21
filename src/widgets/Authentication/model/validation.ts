import { addEventListener } from '@/shared/lib/registerEvents.ts';
import { formErrorsMap } from '@/shared/constants/formErrors.ts';
import { inputmask } from '@/shared/lib/inputmask.ts';

Object.keys(formErrorsMap).forEach((input) => {
    addEventListener(input, (e) => {
        if (!(e.target as HTMLInputElement).value) {
            (e.target as HTMLElement).parentElement?.classList.add('error');
            if (
                !(e.target as HTMLElement).parentElement?.querySelector(
                    '[data-error]',
                )
            ) {
                (e.target as HTMLElement).insertAdjacentHTML(
                    'beforebegin',
                    `<span data-error>${formErrorsMap[input]}</span>`,
                );
            }
        } else {
            (e.target as HTMLElement).parentElement?.classList.remove('error');
            (e.target as HTMLElement).parentElement
                ?.querySelector('[data-error]')
                ?.remove();
        }
    });
});

window.addEventListener('mouseover', () => inputmask('[name="phone"]'));