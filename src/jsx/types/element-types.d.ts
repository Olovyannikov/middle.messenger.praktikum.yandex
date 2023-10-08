declare namespace JSX {
    interface HtmlTag {
        accesskey?: string;
        className?: string;
        contentEditable?: string | boolean;
        dir?: string;
        hidden?: string | boolean;
        id?: string;
        role?: string;
        lang?: string;
        draggable?: string | boolean;
        spellCheck?: string | boolean;
        style?: string;
        tabIndex?: string;
        title?: string;
        translate?: string | boolean;
        key?: string | number;
    }

    interface HtmlAnchorTag extends HtmlTag {
        href?: string;
        target?: string;
        download?: string | boolean;
        ping?: string;
        rel?: string;
        media?: string;
        hreflang?: string;
        type?: string;
        onClick?: (e?: Event) => void;
    }

    type HtmlBodyTag = HtmlTag;

    interface HtmlButtonTag extends HtmlTag {
        action?: string;
        autofocus?: string;
        disabled?: boolean;
        enctype?: string;
        form?: string;
        method?: string;
        name?: string;
        novalidate?: string | boolean;
        target?: string;
        type?: string;
        value?: string;
    }

    interface HtmlFieldSetTag extends HtmlTag {
        disabled?: string;
        form?: string;
        name?: string;
    }

    interface HtmlFormTag extends HtmlTag {
        acceptCharset?: string;
        action?: string;
        autocomplete?: string;
        enctype?: string;
        method?: string;
        name?: string;
        novalidate?: string | boolean;
        target?: string;
    }

    interface HtmlHtmlTag extends HtmlTag {
        manifest?: string;
    }

    interface HtmlImageTag extends HtmlTag {
        alt?: string;
        src?: string;
        crossorigin?: string;
        usemap?: string;
        ismap?: string;
        width?: string;
        height?: string;
    }

    interface HtmlInputTag extends HtmlTag {
        accept?: string;
        action?: string;
        alt?: string;
        autocomplete?: string | boolean;
        autofocus?: string | boolean;
        checked?: string | boolean;
        disabled?: string | boolean;
        enctype?: string;
        form?: string;
        height?: string;
        list?: string;
        max?: string;
        maxlength?: string;
        method?: string;
        min?: string;
        multiple?: string | boolean;
        name?: string;
        novalidate?: string | boolean;
        pattern?: string;
        placeholder?: string;
        readonly?: string;
        required?: boolean;
        size?: string;
        src?: string;
        step?: string;
        target?: string;
        type?: string;
        value?: string | number | Date;
        width?: string;
    }

    interface HtmlLabelTag extends HtmlTag {
        form?: string;
        for?: string;
    }

    interface HtmlLITag extends HtmlTag {
        value?: string | number;
    }

    interface HtmlTextAreaTag extends HtmlTag {
        autofocus?: string;
        cols?: string;
        dirname?: string;
        disabled?: string;
        form?: string;
        maxlength?: string;
        minlength?: string;
        name?: string;
        placeholder?: string;
        readonly?: string;
        required?: boolean;
        rows?: string;
        wrap?: string;
    }

    interface HtmlTimeTag extends HtmlTag {
        dateTime?: string | Date;
    }
}
