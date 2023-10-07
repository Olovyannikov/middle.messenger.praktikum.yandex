import { VDom } from '@/jsx';
import { Button, Input } from '@/shared/ui';
import { useCreateNewChat } from './useCreateNewChat.ts';
import s from './styles.module.scss';

interface CreateNewChatProps {
    onClose(): void;
}

export const CreateNewChat = ({ onClose }: CreateNewChatProps) => {
    const { errors, handleBlur, handleChange, handleSubmit, isLoading, data } =
        useCreateNewChat({
            onClose,
        });

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <Input
                name="title"
                value={data.title}
                onBlur={handleBlur('title')}
                label="Имя чата"
                onInput={handleChange('title')}
                error={errors['title']}
            />
            <Button loading={isLoading} type="submit">
                Подтвердить
            </Button>
        </form>
    );
};