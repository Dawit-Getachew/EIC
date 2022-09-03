import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from './index';

export default {
  title: 'User/Header-with-breadcrumps',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: 'Jane Doe',
  },
  activeLink: "/project-implementation"
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
