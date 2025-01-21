import Plans from '../Plans';

interface HistoryProps {
  search: string;
  openFilter: boolean;
}

const History = (props: HistoryProps) => {
  const { search, openFilter } = props;

  return <Plans search={search} openFilter={openFilter} type="history" />;
};

export default History;
