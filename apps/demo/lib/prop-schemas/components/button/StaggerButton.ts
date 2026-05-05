export const staggerbuttonSchema ={
  color: {
    type: "text" as const,
    label: "Color",
    default: "#fafafa",
  },
  backgroundColor: {
    type: "text" as const,
    label: "Background Color",
    default: "#f73f2a"
  },
  fontSize: {
    type: "text" as const,
    label: "Font Size",
    default: "1.5em",
  },
  text: {
    type: "text" as const,
    label: "Text",
    default: "Staggering Button",
  }
 
}