import { StackProps } from '@chakra-ui/react';

interface MenuChild {
  title: string;
  link: string;
  description?: string;
  icon?: string;
  sectionStyle?: StackProps;
}

export type { MenuChild };
