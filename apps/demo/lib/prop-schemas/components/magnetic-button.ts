// Shape: { propName: { type, label, min, max, step, default } }
export const magneticButtonSchema = {
  strength: {
    type: "slider" as const,
    label: "Magnetic Strength",
    min: 10,
    max: 100,
    step: 5,
    default: 30,
  },
};