export const stickyScrollSchema = {
    
   enableScale: {
    type: "boolean" as const,
    label: "Enable Scale",
    default: false,
   },
   fontClassName: {
    type: "string" as const,
    label: "Font Class Name",
    default: "instrument-serif",
   },
}