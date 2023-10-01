declare namespace JSX {
    interface HtmlBodyTag {
        onAfterPrint?: string | (() => void);
        onBeforePrint?: string | (() => void);
        onBeforeUnload?: string | (() => void);
        onBlur?: string | (() => void);
        onError?: string | (() => void);
        onFocus?: string | (() => void);
        onHaschange?: string | (() => void);
        onLoad?: string | (() => void);
        onMessage?: string | (() => void);
        onOffline?: string | (() => void);
        onOnline?: string | (() => void);
        onPageHide?: string | (() => void);
        onPageShow?: string | (() => void);
        onPopState?: string | (() => void);
        onRedo?: string | (() => void);
        onResize?: string | (() => void);
        onStorage?: string | (() => void);
        onUndo?: string | (() => void);
        onUnload?: string | (() => void);
    }

    interface HtmlTag {
        onContextmenu?: string | (() => void);
        onKeyDown?: string | (() => void);
        onKeyPress?: string | (() => void);
        onKeyUp?: string | (() => void);
        onClick?: string | (() => void);
        onDblClick?: string | (() => void);
        onDrag?: string | (() => void);
        onDragEnd?: string | (() => void);
        onDragEnter?: string | (() => void);
        onDragLeave?: string | (() => void);
        onDragOver?: string | (() => void);
        onDragStart?: string | (() => void);
        onDrop?: string | (() => void);
        onMouseDown?: string | (() => void);
        onMouseMove?: string | (() => void);
        onMouseOut?: string | (() => void);
        onMouseOver?: string | (() => void);
        onMouseUp?: string | (() => void);
        onMouseWheel?: string | (() => void);
        onScroll?: string | (() => void);
    }

    interface FormEvents {
        onBlur?: string | ((e?: Event) => void);
        onChange?: string | ((e?: Event) => void);
        onFocus?: string | ((e?: Event) => void);
        onFormChange?: string | (() => void);
        onFormInput?: string | (() => void);
        onInput?: string | ((e?: Event) => void);
        onInvalid?: string | (() => void);
        onSelect?: string | (() => void);
        onSubmit?: string | ((e?: Event) => void);
    }

    interface HtmlInputTag extends FormEvents {}

    interface HtmlSelectTag extends FormEvents {}

    interface HtmlFieldSetTag extends FormEvents {}

    interface HtmlFormTag extends FormEvents {}

    interface MediaEvents {
        onAbort?: string | (() => void);
        onCanplay?: string | (() => void);
        onCanPlaythrough?: string | (() => void);
        onDurationChange?: string | (() => void);
        onEmptied?: string | (() => void);
        onEnded?: string | (() => void);
        onError?: string | (() => void);
        onLoadedData?: string | (() => void);
        onLoadedMetadata?: string | (() => void);
        onLoadstart?: string | (() => void);
        onPause?: string | (() => void);
        onPlay?: string | (() => void);
        onPlaying?: string | (() => void);
        onProgress?: string | (() => void);
        onRateChange?: string | (() => void);
        onReadyStateChange?: string | (() => void);
        onSeeked?: string | (() => void);
        onSeeking?: string | (() => void);
        onStalled?: string | (() => void);
        onSuspend?: string | (() => void);
        onTimeupdate?: string | (() => void);
        onVolumechange?: string | (() => void);
        onWaiting?: string | (() => void);
    }

    interface HtmlAudioTag extends MediaEvents {}

    interface HtmlEmbedTag extends MediaEvents {}

    interface HtmlImageTag extends MediaEvents {}

    interface HtmlObjectTag extends MediaEvents {}

    interface HtmlVideoTag extends MediaEvents {}
}
