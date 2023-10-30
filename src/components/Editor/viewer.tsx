import { ViewerOptions } from '@toast-ui/editor'
import Viewer, { EventMap } from '@toast-ui/editor/dist/toastui-editor-viewer';
import { useEffect, useRef } from 'react';


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
    const viewerInst = useRef<Viewer | null>(null)

    useEffect(() => {
        if (rootEl.current) {
            viewerInst.current = new Viewer({
                el: rootEl.current!,
                ...props,
                events: getInitEvents(props)
            })
        }
    }, [])


    useEffect(() => {
        if (viewerInst.current) {
        bindEventHandlers(viewerInst.current, props)
        }
    }, [props])

    return <div ref={rootEl} />
}

function bindEventHandlers(viewerRef: Viewer, props: ViewerProps) {
    getBindingEventNames(props).forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3)


        viewerRef.off(eventName)
        viewerRef.on(eventName, props[key as EventNames]!)

    })
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