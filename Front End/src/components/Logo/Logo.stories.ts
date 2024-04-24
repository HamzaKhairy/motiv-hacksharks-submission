import type { Meta, StoryObj } from '@storybook/react';

import { Logo } from './Logo';

const meta = {
  title: 'Motiv/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const School: Story = {
  args: {
    isSchool: true,
  },
};

export const District: Story = {
  args: {
    isSchool: false,
  },
};
