import { VDom } from '@/jsx';
import { Button, Input, Modal, Toast } from '@/shared/ui';
import s from './styles.module.scss';
import { useCreateNewChat } from '@/features/CreateNewChat/useCreateNewChat.ts';

interface CreateNewChatProps {
    onClose(): void;

    isOpen: boolean;
}

export const CreateNewChat = ({ onClose, isOpen }: CreateNewChatProps) => {
    const {
        toasts,
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        isLoading,
        data,
    } = useCreateNewChat({
        onClose,
    });

    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
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
            </Modal>
            <Toast toasts={toasts} />
        </>
    );
};