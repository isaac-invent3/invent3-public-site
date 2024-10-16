import React from 'react';
import { AssetStatusType } from '~/lib/interfaces/asset.interfaces';
import { AssetColorCode } from '~/lib/utils/ColorCodes';
import GenericStatusBox from '../UI/GenericStatusBox';

interface AssetStatusProps {
  status: AssetStatusType;
}
const AssetStatus = (props: AssetStatusProps) => {
  const { status } = props;
  const colorCode = AssetColorCode?.[status] ?? '#8595A5';
  return <GenericStatusBox colorCode={colorCode} text={status} />;
};

export default AssetStatus;
