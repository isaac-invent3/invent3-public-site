import React, { useState } from 'react';
import { HStack, useDisclosure } from '@chakra-ui/react';
import { FrequencyInfo, Option } from '~/lib/interfaces/general.interfaces';
import SectionInfo from '../../../Form/FormSectionInfo';
import SelectableButtonGroup from '../../../Button/SelectableButtonGroup';
import CustomButton from '../../Common/CustomButton';
import AddTime from '../../AddTime';
import DimissibleContainer from '../../../DimissibleContainer';
import Button from '../../../Button';
import { dateFormatter } from '~/lib/utils/Formatters';

const StaticIntervals: Option[] = [
  {
    label: '30 Minutes',
    value: 0.3,
  },
  {
    label: '1 Hour',
    value: 1,
  },
  {
    label: '2 Hours',
    value: 2,
  },
];

interface DailyProps {
  frequencyInfo: FrequencyInfo;
  setFrequencyInfo: React.Dispatch<React.SetStateAction<FrequencyInfo>>;
  selectedDateTime: string | null;
}
const Daily = (props: DailyProps) => {
  // eslint-disable-next-line no-unused-vars
  const { frequencyInfo, setFrequencyInfo, selectedDateTime } = props;
  const {
    isOpen: isOpenTime,
    onOpen: onOpenTime,
    onClose: onCloseTime,
  } = useDisclosure();
  const [type, setType] = useState<'static' | 'custom' | null>(null);
  const [selectedStaticInterval, setSelectedStaticInterval] = useState<
    Option[]
  >([StaticIntervals[1] as Option]);

  const handleStaticInterval = (interval: Option) => {
    if (type !== 'static') {
      setType('static');
    }
    setSelectedStaticInterval([interval]);
    setFrequencyInfo((prev) => ({
      ...prev,
      repeatIntervals: [],
    }));
  };

  const handleDismissCustomTime = (time: string) => {
    const newRepeatInterval = frequencyInfo.repeatIntervals.filter(
      (item) => item !== time
    );
    setFrequencyInfo((prev) => ({
      ...prev,
      repeatIntervals: newRepeatInterval,
    }));
    if (frequencyInfo.repeatIntervals.length === 1) {
      setType(null);
    }
  };

  const handleAddCustomTime = (time: string) => {
    if (type !== 'custom') {
      setType('custom');
    }

    const timeIsInclude = frequencyInfo.repeatIntervals.some(
      (option) => option === time
    );
    if (!timeIsInclude) {
      setFrequencyInfo((prev) => ({
        ...prev,
        repeatIntervals: [...frequencyInfo.repeatIntervals, time],
      }));
    }
  };

  return (
    <>
      <HStack width="full" spacing="29px" alignItems="flex-start" mb="32px">
        <SectionInfo
          title="Every"
          info="Add name that users can likely search with"
          isRequired={false}
          maxWidth="130px"
        />
        {type === 'custom' ? (
          <HStack width="full" spacing="8px" flexWrap="wrap">
            {frequencyInfo.repeatIntervals.map((time, index) => (
              <DimissibleContainer
                key={index}
                handleClose={() => handleDismissCustomTime(time as string)}
              >
                <Button customStyles={{ height: '37px', py: '10px' }}>
                  {dateFormatter(time as string, 'hh:mm A', ['HH:mm'])}
                </Button>
              </DimissibleContainer>
            ))}
            <CustomButton
              handleClick={onOpenTime}
              buttonVariant="outline"
              buttonText="Add Time"
            />
          </HStack>
        ) : (
          <HStack flexWrap="wrap" spacing="8px">
            <SelectableButtonGroup
              options={StaticIntervals}
              selectedOptions={selectedStaticInterval}
              handleSelect={(options) =>
                handleStaticInterval(options[0] as Option)
              }
              buttonVariant="outline"
              customContainerStyle={{ spacing: '8px' }}
              isMultiSelect={false}
              hasAtLeastOneSelected
            />
            <CustomButton handleClick={onOpenTime} buttonVariant="outline" />
          </HStack>
        )}
      </HStack>
      <AddTime
        isOpen={isOpenTime}
        onClose={onCloseTime}
        handleSelectedTime={(time) => {
          handleAddCustomTime(time);
        }}
      />
    </>
  );
};

export default Daily;
