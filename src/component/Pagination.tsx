import { useState } from "react";
import styled from "styled-components";

const Pagination = ({ setPage }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (pageNumber: number) => {
    const newPage = currentPage + pageNumber;

    // Check if the new page is within the valid range
    if (newPage > 0) {
      setCurrentPage(newPage);
      setPage(newPage); // Assuming setPage is a function to update the page in your parent component
    }
  };

  return (
    <PageContainer className="page">
      <PageBtn className="page__btn" onClick={() => handlePagination(-1)}>
        &lt;
      </PageBtn>

      {/* Render a few page numbers (adjust the logic based on your actual requirements) */}
      {[1, 2, 3, 4, 5, 6, "...", 10].map((page, index) => (
        <PageNumbers
          key={index}
          className={`page__numbers ${currentPage === page ? "active" : ""}`}
          onClick={() =>
            typeof page === "number"
              ? handlePagination(page - currentPage)
              : null
          }>
          {page}
        </PageNumbers>
      ))}

      <PageBtn className="page__btn" onClick={() => handlePagination(1)}>
        &gt;
      </PageBtn>
    </PageContainer>
  );
};

export default Pagination;

const PageContainer = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 0.6rem;
  color: ${(props) => props.theme.tdColor};

  box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);
  .active {
    background-color: rgba(111, 118, 126, 0.4);

    border-radius: 5px;
    padding: 8px 16px;
  }
`;

const PageNumbers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.8rem;
  font-size: 1.4rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  cursor: pointer;
`;

const PageBtn = styled(PageNumbers)`
  &.active {
    pointer-events: initial;

    &:hover {
      color: #23adad;
    }
  }
`;
