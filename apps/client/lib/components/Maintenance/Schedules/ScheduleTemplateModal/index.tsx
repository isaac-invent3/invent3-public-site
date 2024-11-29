import React, { useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
// import Details from './Details';
import { useGetMaintenanceScheduleTemplateQuery } from '~/lib/redux/services/template.services';
import TemplateModal from '~/lib/components/Common/TemplateModal';
import { Template } from '~/lib/interfaces/template.interfaces';

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
    <TemplateModal
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
      {selectedTemplate && <></>}
    </TemplateModal>
  );
};

export default ScheduleTemplateModal;
