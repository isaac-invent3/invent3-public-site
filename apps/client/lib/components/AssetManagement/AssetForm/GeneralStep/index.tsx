import { Flex, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { generalInfoSchema } from '~/lib/schemas/asset.schema';
import AssetImages from './AssetImages';
// import AssetNameCodeDescription from './AssetNameCodeDescription';
import AssetCode from './AssetCode';
import AssetCategory from './AssetCategory';
import AssetDetail from './AssetDetails';
import AssetDimension from './AssetDimension';
import AssetOwner from './AssetOwner';

const GeneralStep = () => {
  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      bgColor="white"
      pt="26px"
      pl="16px"
      pb="33px"
      pr="16px"
      rounded="6px"
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={generalInfoSchema}
        onSubmit={async () => {}}
      >
        <Form style={{ width: '100%' }}>
          <VStack spacing="32px" width="full" alignItems="flex-start">
            <AssetImages />
            {/* <AssetNameCodeDescription /> */}
            <AssetCode />
            <AssetCategory />
            <AssetDetail />
            <AssetDimension />
            <AssetOwner />
          </VStack>
        </Form>
      </Formik>
    </Flex>
  );
};

export default GeneralStep;
