import SearchBar from "@/component/SearchBox";
import Table from "@/component/Table";
import { useGetDataQuery, useSearchDataQuery } from "@/reducer/Payouts";
import { useState } from "react";
import styled from "styled-components";
import lightmode from "@/light-mode.png";
import darkmode from "@/night-mode.png";
import { useTheme } from "@/component/stylecomponent/ThemeContext";
const Home = () => {
  const [username, setUsername] = useState("");
  const [page, setPage] = useState(1);
  const {
    data: filterData,
    isLoading: filterLoading,
    isError: filterError,
  } = useSearchDataQuery({
    username,
  });

  const { data, isLoading, isError } = useGetDataQuery({ page });
  console.log(filterError, isError);
  const { toggleTheme } = useTheme();
  const [mode, setMode] = useState(true);

  return (
    <Section>
      <div className="main-heading">
        <h1>Payouts</h1>
        <img
          style={mode ? { filter: "invert(1)" } : {}}
          src={mode ? lightmode : darkmode}
          onClick={() => {
            toggleTheme();
            setMode(!mode);
          }}
        />
      </div>
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
        setPage={setPage}
      />
    </Section>
  );
};

export default Home;

const Section = styled.div`
  height: 100vh;
  padding: 24px 50px;
  .main-heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 40px;
      color: ${(props) => props.theme.heading};
    }
    img {
      cursor: pointer;
      width: 50px;
    }
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
      color: ${(props) => props.theme.subHeading};
      align-items: center;
      div {
        width: 16px;
        height: 32px;
        background-color: #999dff;
      }
    }
  }
`;
