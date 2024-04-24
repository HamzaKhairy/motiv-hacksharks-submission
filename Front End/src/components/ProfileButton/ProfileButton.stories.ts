import type { Meta, StoryObj } from '@storybook/react';

import { ProfileButton } from './ProfileButton';

const meta = {
  title: 'Motiv/ProfileButton',
  component: ProfileButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Toggleable: Story = {
  args: {
    varient: 'toggleable',
    isSchool: false,
    height: 80,
    width: 100,
    userData: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      subtext: "Student",
      pfp: "https://www.gravatar.com/avatar/205e460bc79e2e5b48aec07710c08d50",
      roles: ["student"],
      studentCode: "12345",
    },
  },
};

export const NonToggleable: Story = {
  args: {
    varient: 'non-toggleable',
    isSchool: false,
    height: 80,
    width: 100,
    userData: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      subtext: "Student",
      pfp: "https://www.gravatar.com/avatar/205e460bc79e2e5b48aec07710c08d50",
      roles: ["student"],
      studentCode: "12345",
    },
  },
};

export const Image: Story = {
  args: {
    varient: 'image',
    isSchool: false,
    height: 80,
    width: 100,
    userData: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      subtext: "Student",
      pfp: "https://www.gravatar.com/avatar/205e460bc79e2e5b48aec07710c08d50",
      roles: ["student"],
      studentCode: "12345",
    },
  },
};

export const IsSchool: Story = {
  args: {
    varient: 'toggleable',
    isSchool: true,
    height: 80,
    width: 100,
    userData: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      subtext: "Student",
      pfp: "https://www.gravatar.com/avatar/205e460bc79e2e5b48aec07710c08d50",
      roles: ["student"],
      studentCode: "12345",
    },
  },
};

export const IsDistrict: Story = {
  args: {
    varient: 'toggleable',
    isSchool: false,
    height: 80,
    width: 100,
    userData: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      subtext: "Student",
      pfp: "https://www.gravatar.com/avatar/205e460bc79e2e5b48aec07710c08d50",
      roles: ["student"],
      studentCode: "12345",
    },
  },
};
