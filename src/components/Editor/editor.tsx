/**
 * React wrapper for tui.editor (https://github.com/nhn/tui.editor)
 * Based on https://github.com/nhn/tui.editor/blob/master/apps/react-editor/src/editor.tsx
 */

import { useEffect, useRef } from "react";
import ToastuiEditor, { Editor, EditorOptions, EventMap } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';


export interface EventMapping {
    onLoad: EventMap['load'];
    onChange: EventMap['change'];
    onCaretChange: EventMap['caretChange'];
    onFocus: EventMap['focus'];
    onBlur: EventMap['blur'];
    onKeydown: EventMap['keydown'];
    onKeyup: EventMap['keyup'];
    onBeforePreviewRender: EventMap['beforePreviewRender'];
    onBeforeConvertWysiwygToMarkdown: EventMap['beforeConvertWysiwygToMarkdown'];
}

export type EventNames = keyof EventMapping;

export type TuiEditorProps = Omit<EditorOptions, 'el'> & Partial<EventMapping>;

interface TuiEditorExtendedProps extends TuiEditorProps {
    markdownRef: React.MutableRefObject<Editor | null>,
    disabled?: boolean
} 

export default function TuiEditor(props: TuiEditorExtendedProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<ToastuiEditor|null>(null);

    if (props.markdownRef === undefined) throw new Error('mardownRef is required')

    useEffect(
        () => {
            if (divRef.current) {
                editorRef.current = new ToastuiEditor({
                    ...props,
                    initialEditType: 'wysiwyg',
                    el: divRef.current,
                    hideModeSwitch: true,
                    useCommandShortcut: true,
                    events: getInitEvents(props),
                });

                props.markdownRef.current = editorRef.current
            }
        },
        []
    );

    useEffect(
        () => {
            if (props.height) {
                editorRef.current?.setHeight(props.height);
            }

            if (props.previewStyle) {
                editorRef.current?.changePreviewStyle(props.previewStyle);
            }

            if (editorRef.current) {
                bindEventHandlers(editorRef.current, props);
            }
        },
        [props],
    )
    return <div ref={divRef} className={`${props.disabled ? 'pointer-events-none' : ''}`}></div>;
}




function getBindingEventNames(props: TuiEditorExtendedProps) {
    return Object.keys(props)
        .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
        .filter((key) => props[key as EventNames]);
}

function bindEventHandlers(editor: ToastuiEditor, props: TuiEditorExtendedProps) {
    getBindingEventNames(props).forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);

        editor.off(eventName);
        editor.on(eventName, props[key as EventNames]!);
    });
}

function getInitEvents(props: TuiEditorExtendedProps) {
    return getBindingEventNames(props).reduce(
        (acc: Record<string, EventMap[keyof EventMap]>, key) => {
            const eventName = (key[2].toLowerCase() + key.slice(3)) as keyof EventMap;

            acc[eventName] = props[key as EventNames];

            return acc;
        },
        {}
    );
}