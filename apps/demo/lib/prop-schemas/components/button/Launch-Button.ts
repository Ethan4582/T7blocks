export const launchButtonSchema = {

  accentColor: {
    type: "text" as const,
    label: "Accent Color",
    default: "#18db38",
  },
  btnColor: {
    type: "text" as const,
    label: "Button Color",
    default: "#111111",
  },
  animationSpeed: {
    type: "number" as const,
    label: "Animation Speed (ms)",
    default: 155,
  },
};
