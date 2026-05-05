export const lottietextSchema = {
  lines: {
    type: "array",
    label: "Lines",
    default: [
      [
        { type: "text", value: "Say" },
        {
          type: "lottie",
          config: {
            src: "https://lottie.host/0e894037-15ba-4e1a-b9e2-fdc7fc93957d/eElHfFEFHx.lottie",
            size: 70,
            y: -10,
            scale: 1.1,
          },
        },
        { type: "text", value: "goodbye" },
      ],
      [
        { type: "text", value: "to" },
        {
          type: "lottie",
          config: {
            src: "https://lottie.host/08e8c28b-c406-412c-a685-b41c63cdf7b1/Nr5WCCYllE.lottie",
            size: 80,
            y: 6,
          },
        },
        { type: "text", value: "boring" },
        {
          type: "lottie",
          config: {
            src: "https://lottie.host/2627aac4-8163-458f-b778-4897e6e0e220/5Yat4Cj4Kf.lottie",
            size: 60,
            y: 4,
            scale: 1.7,
          },
        },
        { type: "text", value: "text" },
      ],
    ],
  },
  textColor: {
    type: "color",
    label: "Text Color",
    default: "#e3e7ecff",
  },
  maxWidthClassName: {
    type: "string",
    label: "Max Width",
    default: "max-w-3xl",
  },
};