import { Meta, Story } from '@storybook/react';
import { Header as Component } from './header.section';

export default {
  title: 'Header',
  component: Component,
} as Meta;

export const Header: Story = () => <Component />;
