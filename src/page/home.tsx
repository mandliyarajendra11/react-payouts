import SearchBar from "@/component/SearchBox";
import Table from "@/component/Table";
import { useGetDataQuery, useSearchDataQuery } from "@/reducer/Payouts";
import { useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [username, setUsername] = useState("");
  const {
    data: filterData,
    isLoading: filterLoading,
    isError: filterError,
  } = useSearchDataQuery({
    username,
  });

  const { data, isLoading, isError } = useGetDataQuery({});
  console.log(filterError, isError);

  return (
    <Section>
      <h1>Payouts</h1>
      <div className="history">
        <h3>
          <div></div>
          <span>Payout History</span>
        </h3>
        <SearchBar setUsername={setUsername} />
      </div>
      <Table
        data={!username.length ? data?.data : filterData}
        isLoading={!username.length ? isLoading : filterLoading}
      />
    </Section>
  );
};

export default Home;

const Section = styled.div`
  height: 100vh;
  padding: 24px 50px;
  h1 {
    font-size: 40px;
  }
  .history {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 50px 0;
    align-items: center;
    h3 {
      font-size: 20px;
      font-weight: 600;
      display: flex;
      gap: 16px;
      align-items: center;
      div {
        width: 16px;
        height: 32px;
        background-color: #999dff;
      }
    }
  }
`;
