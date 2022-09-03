import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignUpPage from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/SignUpPage',
  component: SignUpPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SignUpPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SignUpPage> = (args) => <SignUpPage {...args} />;

export const ExampleSignUp = Template.bind({});

ExampleSignUp.args = {
  primary: true,
  label: 'Button',
};