interface Option {
  label: string;
  value: string | number;
}
interface SearchResponse {
  items: any[];
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type { Option, SearchResponse };
