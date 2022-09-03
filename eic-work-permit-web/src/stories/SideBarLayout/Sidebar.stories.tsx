import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Breadcrumps from "../BreadCrumps/"
import { Sidebar } from './index';

export default {
  title: 'User/Sidebar',
  component: Sidebar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: 'Jane Doe',
  },
  activeSidebar: 'Dashboard',
  children: (
    <>
     <h2>Working</h2>
    </>
  ),
  breadcrumps: (
    <Breadcrumps activeLink="/project-implementation" />
  )
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
