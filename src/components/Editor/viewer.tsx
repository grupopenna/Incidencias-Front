import { ViewerOptions } from '@toast-ui/editor'
import Viewer, { EventMap } from '@toast-ui/editor/dist/toastui-editor-viewer';
import { useEffect, useRef } from 'react';
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

type EventNames = keyof EventMapping
type ViewerProps = Omit<ViewerOptions, 'el'> & Partial<EventMapping>

export default function ViewerComponent(props: ViewerProps) {
    const rootEl = useRef<HTMLDivElement>(null)
    let viewerInst!: Viewer

    useEffect(() => {
        if (rootEl.current) {
            viewerInst = new Viewer({
                el: rootEl.current!,
                ...props,
                events: getInitEvents(props)
            })
        }
    }, [])



    return <div ref={rootEl} />
}

function getBindingEventNames(props: ViewerProps) {
    return Object.keys(props)
            .filter((key) =>  /^on[A-Z][a-zA-Z]+/.test(key))
            .filter((key) => props[key as EventNames])
}

function getInitEvents(props: ViewerProps) {
    return getBindingEventNames(props).reduce(
        (acc: Record<string, EventMap[keyof EventMap]>, key) => {
            const eventName = (key[2].toLowerCase() + key.slice(3)) as keyof EventMap

            acc[eventName] = props[key as EventNames]

            return acc
        }, {}
    )
}