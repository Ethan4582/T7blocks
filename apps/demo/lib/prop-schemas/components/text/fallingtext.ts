export const fallingtextSchema = {
  rows: { 
    type: "array", 
    label: "Rows",
    item: {
      type: "object",
      fields: {
        lines: {
          type: "array",
          label: "Lines",
          default: [],
          item: {
            type: "string",
            label: "Line",
            default: ""
          }
        },
        accentImage: {
          type: "object",
          label: "Accent Image",
          default: null,
          fields: {
            src: { type: "string", label: "Src", default: "" },
            alt: { type: "string", label: "Alt", default: "" },
            className: { type: "string", label: "Class Name", default: "" }
          }
        }
      }
    },
    default: [
      { lines: ["Scroll down", "watch them fall"] },
      { lines: ["Gravity always", "wins in the end"], accentImage: { src: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_img/logo.png", alt: "", className: "-rotate-[20deg] translate-x-[0.15em] -translate-y-[0.2em]" } },
      { lines: ["The Animation Ends"] }
    ]
  },
  textColor: { type: "color", label: "Text Color", default: "#ffffff" },
}