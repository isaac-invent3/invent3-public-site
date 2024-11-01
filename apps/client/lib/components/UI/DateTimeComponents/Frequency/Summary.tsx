import React from 'react';
import { FrequencyInfo } from '~/lib/interfaces/general.interfaces';

interface SummaryProp {
  frequencyInfo: FrequencyInfo;
}
const Summary = (props: SummaryProp) => {
  // eslint-disable-next-line no-unused-vars
  const { frequencyInfo } = props;

  return <div>Summary</div>;
};

export default Summary;
