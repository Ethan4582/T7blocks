export const button1Schema = {
  label: {
    type: "select" as const,
    label: "Label",
    options: ["Click me", "Get started", "Learn more", "Submit"],
    default: "Click me",
  },
  variant: {
    type: "select" as const,
    label: "Variant",
    options: ["primary", "outline"],
    default: "primary",
  },
  size: {
    type: "select" as const,
    label: "Size",
    options: ["sm", "md", "lg"],
    default: "md",
  },
};