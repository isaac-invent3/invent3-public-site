import React, { useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
// import Details from './Details';
import { useGetMaintenanceScheduleTemplateQuery } from '~/lib/redux/services/template.services';
import DefaultTemplateModal from '~/lib/components/Common/Modals/DefaultTemplateModal';
import { Template } from '~/lib/interfaces/template.interfaces';
import Details from './Details';

interface PlanTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ScheduleTemplateModal = (props: PlanTemplateModalProps) => {
  const { isOpen, onClose } = props;
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const { data, isLoading, isFetching } =
    useGetMaintenanceScheduleTemplateQuery(
      {
        pageNumber,
        pageSize,
      },
      { skip: search !== '' }
    );

  return (
    <DefaultTemplateModal
      isOpen={isOpen}
      onClose={onClose}
      data={data?.data}
      headerName="Schedule Templates"
      isLoading={isLoading}
      isFetching={isFetching}
      pageSize={pageSize}
      pageNumber={pageNumber}
      search={search}
      selectedTemplate={selectedTemplate}
      setSelectedTemplate={setSelectedTemplate}
      setSearch={setSearch}
      setPageNumber={setPageNumber}
      setPageSize={setPageSize}
    >
      {selectedTemplate && <Details template={selectedTemplate} />}
    </DefaultTemplateModal>
  );
};

export default ScheduleTemplateModal;
