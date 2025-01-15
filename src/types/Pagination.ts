export interface PaginationProps {
  items: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}