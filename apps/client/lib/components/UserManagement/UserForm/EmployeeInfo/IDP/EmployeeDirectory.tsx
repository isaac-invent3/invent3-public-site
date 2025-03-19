import { FormInputWrapper } from '@repo/ui/components';
import React from 'react';
import EmployeeSelect from './EmployeeSelect';

const EmployeeDirectory = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="169px"
      customSpacing="53px"
      description="Search for the employee from the company’s Active directory"
      title="Search Employee"
      isRequired
    >
      <EmployeeSelect selectName="employeeId" selectTitle="Employee" />
    </FormInputWrapper>
  );
};

export default EmployeeDirectory;
