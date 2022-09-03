import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginPage from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/LoginPage',
  component: LoginPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoginPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoginPage> = (args) => <LoginPage {...args} />;

export const ExampleLogin = Template.bind({});

ExampleLogin.args = {
  isLoading: false,
  signup_link: "#",
  onSubmit: (data: any) => {}
};