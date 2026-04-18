export const pullSwitchSchema = {
    width: {
        type: "number" as const,
        label: "Width",
        default: 220,
    },
    height: {
        type: "number" as const,
        label: "Height",
        default: 280,
    },
    buttonlightColor: {
        type: "string" as const,
        label: "Button Light Color",
        default: "#87242fff",
    },
    buttondarkColor: {
        type: "string" as const,
        label: "Button Dark Color",
        default: "#00e5ff",
    },
    bgLight: {
        type: "string" as const,
        label: "Background Light",
        default: "#f5f5f5",
    },
    bgDark: {
        type: "string" as const,
        label: "Background Dark",
        default: "#1a1a1a",
    },
}