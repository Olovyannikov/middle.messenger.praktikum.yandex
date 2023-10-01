import { VDom } from '@/jsx';
import { Button, Input } from '@/shared/ui';
import { useCreateNewChat } from './useCreateNewChat.ts';
import s from './styles.module.scss';

interface CreateNewChatProps {
    onClose(): void;
}

export const CreateNewChat = ({ onClose }: CreateNewChatProps) => {
    const { onChange, onBlur, value, isLoading, onSubmit, error } =
        useCreateNewChat({
            onClose,
        });

    return (
        <form className={s.form} onSubmit={onSubmit}>
            <Input
                name="title"
                value={value}
                onBlur={onBlur}
                label="Имя чата"
                onInput={onChange}
                error={error['title']}
            />
            <Button loading={isLoading} type="submit">
                Подтвердить
            </Button>
        </form>
    );
};