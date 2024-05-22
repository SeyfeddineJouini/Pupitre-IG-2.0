import { Badge } from ".";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    color: {
      options: ["gray-badge", "blue-badge", "green-badge", "red-badge"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    color: "gray-badge",
    className: {},
    text: "Badge",
  },
};
