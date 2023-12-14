import React from "react";
import styled from "styled-components";

const Pagination: React.FC = () => {
  return (
    <PageContainer className="page">
      <PageBtn className="page__btn">&lt;</PageBtn>
      <PageNumbers className="page__numbers">1</PageNumbers>
      <PageNumbers className="page__numbers active">2</PageNumbers>
      <PageNumbers className="page__numbers">3</PageNumbers>
      <PageNumbers className="page__numbers">4</PageNumbers>
      <PageNumbers className="page__numbers">5</PageNumbers>
      <PageNumbers className="page__numbers">6</PageNumbers>
      <PageDots className="page__dots">...</PageDots>
      <PageNumbers className="page__numbers">10</PageNumbers>
      <PageBtn className="page__btn">&gt;</PageBtn>
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
  background: #ffffff;
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
  cursor: pointer;
`;

const PageDots = styled(PageNumbers)`
  width: 2.6rem;
  height: 2.6rem;
  cursor: initial;
`;

const PageBtn = styled(PageNumbers)`
  pointer-events: none;

  &.active {
    pointer-events: initial;

    &:hover {
      color: #23adad;
    }
  }
`;
