import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';

interface GenericBreadCrumbProps {
  routes: {
    label: string;
    route: string;
  }[];
}
const GenericBreadCrumb = ({ routes }: GenericBreadCrumbProps) => {
  return (
    <Breadcrumb spacing="4px" separator={<Text color="neutral.600">/</Text>}>
      {routes.map((item, index) => (
        <BreadcrumbItem
          key={item.label}
          isCurrentPage={index + 1 === routes.length}
        >
          <BreadcrumbLink
            href={item.route}
            fontSize="12px"
            lineHeight="14.26px"
            letterSpacing="0.05em"
            fontWeight={index + 1 === routes.length ? 700 : 400}
            color={index + 1 === routes.length ? 'neutral.800' : 'neutral.600'}
          >
            {item.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default GenericBreadCrumb;
