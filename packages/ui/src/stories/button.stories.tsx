import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Button from "../button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "다음",
};

export const Hover = Template.bind({});
Hover.args = {
  children: "다음",
};
Hover.parameters = {
  pseudo: { hover: true },
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "다음",
  disabled: true,
};
