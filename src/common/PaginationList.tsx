import { Pagination } from "flowbite-react";

interface PaginationProps {
  totalPost: number;
  postPerPage: number;
  currentPage: number;
  onClick: (pageNum: number) => void;
}

const PaginationList = ({
  totalPost,
  postPerPage,
  currentPage,
  onClick,
}: PaginationProps) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      {pages.length > 1 && (
        <Pagination
          totalPages={pages.length}
          currentPage={currentPage}
          onPageChange={onClick}
          showIcons
        />
      )}
    </>
  );
};

export default PaginationList;
