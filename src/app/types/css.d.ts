declare module '*.module.scss' {
    interface ClassNames {
        [className: string]: string;
    }

    const classNames: ClassNames;
    export = classNames;
}

declare module '*.module.css' {
    interface ClassNames {
        [className: string]: string;
    }

    const classNames: ClassNames;
    export = classNames;
}