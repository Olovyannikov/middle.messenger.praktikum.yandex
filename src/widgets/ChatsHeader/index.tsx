import { VDom } from '@/jsx';
import { Button, Input, Typography } from '@/shared/ui';
import s from './ChatsHeader.module.scss';

interface ChatsHeaderProps {
    onOpenNewChatForm: () => void;
}

export const ChatsHeader = ({ onOpenNewChatForm }: ChatsHeaderProps) => {
    return (
        <header className={s.header}>
            <div className={s.top}>
                <span data-flow="right" data-tooltip="Перейти в настройки">
                    <Button
                        size="small"
                        variant="info"
                        href="/settings"
                        className={s.settings}
                    >
                        <img
                            src="/icons/settings.svg"
                            alt="Перейти в настройки"
                        />
                    </Button>
                </span>
                <Typography className={s.title} variant="body1">
                    Чаты
                </Typography>
                <span data-flow="right" data-tooltip="Добавить новый чат">
                    <Button
                        onClick={onOpenNewChatForm}
                        size="small"
                        variant="info"
                        className={s.settings}
                    >
                        <img src="/icons/plus.svg" alt="Добавить новый чат" />
                    </Button>
                </span>
            </div>
            <div className={s.search}>
                <Input label="Поиск" size="small" type="search" />
            </div>
        </header>
    );
};