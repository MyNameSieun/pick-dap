import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationCustom = ({ currentPage, totalPages, onPageChange }: Props) => {
  const GROUP_SIZE = 9;

  const currentGroup = Math.floor(currentPage / GROUP_SIZE);

  const startPage = currentGroup * GROUP_SIZE;
  const endPage = Math.min(startPage + GROUP_SIZE, totalPages);

  const pages = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i,
  );

  if (totalPages <= 0) return null;

  return (
    <Pagination className="py-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(0, startPage - 1))}
            className={
              currentPage === 0
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={currentPage === p}
              onClick={() => onPageChange(p)}
              className="cursor-pointer"
            >
              {p + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages - 1, endPage))}
            className={
              currentPage >= totalPages - 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationCustom;
