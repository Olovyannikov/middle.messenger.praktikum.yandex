export const avatarTitle = (title: string | undefined) =>
    title ? title.split(' ')[0][0] + (title.split(' ')[1]?.[0] ?? '') : '';
