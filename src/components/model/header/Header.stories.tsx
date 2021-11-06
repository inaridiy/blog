import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Header } from './Header';

export default {
  title: 'Header/Header',
  component: Header,
} as Meta;

const Template: Story = () => <Header />;

export const DefaultHeader = Template.bind({});
