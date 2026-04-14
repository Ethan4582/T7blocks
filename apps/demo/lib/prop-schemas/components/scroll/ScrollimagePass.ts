export const scrollImagePassSchema = {
    passDuration: {
        type: "number" as const,
        label: "Pass Duration",
        default: 2.5,
    },
    fontClassName: {
        type: "string" as const,
        label: "Font Class Name",
        default: "instrument-serif",
    },
};