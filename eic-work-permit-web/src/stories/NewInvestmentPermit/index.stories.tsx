import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NewPermit from './index';
import { Sidebar } from "../SideBarLayout/index"
import BreadCrumps from "../BreadCrumps/"

export default {
  title: 'User/New Investment Permit',
  component: NewPermit,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof NewPermit>;

const Template: ComponentStory<typeof NewPermit> = (args) => (
  <>
    <Sidebar activeSidebar='#' user={{ name: "John" }} breadcrumps={<BreadCrumps activeLink={''}  />}>
      <NewPermit {...args} />
    </Sidebar>
  </>
);

export const BasicLayout = Template.bind({});
BasicLayout.args = {};