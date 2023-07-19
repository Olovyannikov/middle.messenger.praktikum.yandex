import { AuthService } from '@/services/Auth/Auth.service.ts';
import { FormState } from '@/shared/types/Form.ts';
import { addEventListener } from '@/shared/lib/registerEvents.ts';
import { AuthSignupRequest } from '@/services/Auth/Auth.dto.ts';
import { formErrorsMap } from '@/shared/constants/formErrors.ts';

export let isValid = true;

addEventListener('register', async (e) => {
    e.preventDefault();

    const form: HTMLElement | null = document.getElementById('register');
    const formData = new FormData(form as HTMLFormElement);

    const getFormState: Record<keyof typeof formErrorsMap, FormState> = {};
    const preparedData: AuthSignupRequest = {} as AuthSignupRequest;

    for (const [name, value] of formData.entries()) {
        if (typeof value === 'string') {
            getFormState[name] = { value };
        }
    }

    Object.keys(getFormState).forEach((field) => {
        const fields = form?.querySelector(`[name=${field}]`);
        if (!getFormState[field].value) {
            fields?.classList.add('input-error');
            getFormState[field].error = formErrorsMap[field];
            isValid = false;
        } else {
            fields?.classList.remove('input-error');
            getFormState[field].error = '';
            preparedData[field as keyof AuthSignupRequest] =
                getFormState[field].value;
            isValid = true;
        }
    });

    if (
        getFormState['password'].value !== getFormState['repeat-password'].value
    ) {
        isValid = false;
        getFormState['password'].error = formErrorsMap['repeat-password'];
        getFormState['repeat-password'].error =
            formErrorsMap['repeat-password'];
        form
            ?.querySelector('[name="password"]')
            ?.insertAdjacentHTML(
                'beforebegin',
                `<span data-error>${formErrorsMap['repeat-password']}</span>`,
            );
        form
            ?.querySelector('[name="repeat-password"]')
            ?.insertAdjacentHTML(
                'beforebegin',
                `<span data-error>${formErrorsMap['repeat-password']}</span>`,
            );
    } else {
        form?.querySelector('[name="repeat-password"] [data-error]')?.remove();
        form?.querySelector('[name="password"] [data-error]')?.remove();
    }

    if (isValid) {
        await AuthService.signup(preparedData);
        window.location.hash = '#login';
    }
});