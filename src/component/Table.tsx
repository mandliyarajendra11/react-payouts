import styled from "styled-components";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import filterIcon from "src/img/filter-icon.png";
interface StatusProps {
  status?: string;
}
interface Row {
  BG?: string;
}
const Table = ({ data, isLoading, setPage }: any) => {
  const [endData, setEndData] = useState(data);
  const [state, setState] = useState({
    dateAndTime: true,
    value: true,
    status: true,
  });

  useEffect(() => setEndData(data), [data]);

  const handleSort = (filterSort: string) => {
    const filteredData = [...data]; // Create a copy of the original data

    filteredData.sort((a, b) => {
      if ((state as any)[filterSort]) {
        return a[filterSort] < b[filterSort]
          ? -1
          : a[filterSort] > b[filterSort]
            ? 1
            : 0;
      } else {
        return b[filterSort] < a[filterSort]
          ? -1
          : b[filterSort] > a[filterSort]
            ? 1
            : 0;
      }
    });

    setEndData(filteredData);
    // Toggle the state for the clicked property
    setState((prevState: any) => ({
      ...prevState,
      [filterSort]: !prevState[filterSort],
    }));
  };

  const handleFilterSort = (e: any, status: any) => {
    const filteredData = [...data]; // Create a copy of the original data
    e.stopPropagation();
    setEndData(
      filteredData.filter((e: any) =>
        status === "All" ? true : e.status === status
      )
    );

    // Toggle the state for the clicked property
    setState((prevState: any) => ({
      ...prevState,
      ["status"]: !prevState["status"],
    }));
  };
  return (
    <Section>
      <Res>
        <GridSection>
          <thead>
            <tr>
              <th onClick={() => handleSort("dateAndTime")}>
                <div className="filter-table">
                  Date & Time{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: state.dateAndTime ? "&#11015;" : "&#11014;",
                    }}
                  />
                </div>
              </th>
              <th>
                <div
                  className="filter-table"
                  onClick={() =>
                    setState((prevState: any) => ({
                      ...prevState,
                      ["status"]: !prevState["status"],
                    }))
                  }>
                  {" "}
                  Status
                  <label className="dropdown">
                    <img className="dd-button" src={filterIcon} />

                    <ul
                      className="dd-menu"
                      style={{ display: !state.status ? "block" : "none" }}>
                      <li onClick={(e: any) => handleFilterSort(e, "Pending")}>
                        <Status status={"Pending"}>Pending</Status>
                      </li>
                      <li
                        onClick={(e: any) => handleFilterSort(e, "Completed")}>
                        <Status status={"Completed"}>Completed</Status>
                      </li>
                      <li onClick={(e: any) => handleFilterSort(e, "All")}>
                        <Status status={"All"}>All</Status>
                      </li>
                    </ul>
                  </label>
                </div>{" "}
              </th>
              <th>username</th>
              <th onClick={() => handleSort("value")}>
                <div className="filter-table">
                  Value{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: state.value ? "&#11015;" : "&#11014;",
                    }}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>loading...</td>
              </tr>
            ) : endData ? (
              endData.map((item: any, i: any) => (
                <Row BG={i}>
                  <td>
                    {" "}
                    {new Date(item?.dateAndTime)
                      .toLocaleString()
                      .toLocaleUpperCase()}
                  </td>
                  <td>
                    <Status status={item?.status}>{item?.status}</Status>
                  </td>
                  <td> {item?.username}</td>
                  <td>{item?.value}</td>
                </Row>
              ))
            ) : (
              <tr>
                <td>No data to Show</td>
              </tr>
            )}
          </tbody>
        </GridSection>
      </Res>
      <Pagination setPage={setPage} />
    </Section>
  );
};

export default Table;

const GridSection = styled.table`
  width: 100%;
  border-spacing: 0px;
  box-shadow:
    0px 4px 16px 0px rgba(101, 173, 225, 0.08),
    0px 2px 5px 0px rgba(55, 55, 55, 0.15);

  th {
    padding: 20px 28px;
    text-align: start;
    border-bottom: 1px solid black;
    color: ${(props) => props.theme.tHColor};
    background-color: ${(props) => props.theme.thBg};
  }
  td {
    padding: 24px 28px;
    color: ${(props) => props.theme.tdColor};
    transition:
      width 1.5s ease,
      max-width 1.5s ease;
  }

  .filter-table {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    span {
      font-weight: bold;
    }
    img {
      width: 10px;
      height: 12px;
    }
  }
`;

const Res = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 90%;
    overflow-x: scroll;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Status = styled.span<StatusProps>`
  padding: 2px 8px;
  border-radius: 6px;
  color: black;
  background-color: ${(props: any) =>
    props.status == "Pending"
      ? "yellow"
      : props.status == "Completed"
        ? "#60CA57"
        : "#6F767E66"};
`;
const Row = styled.tr<Row>`
  background: ${(props: any) =>
    props.BG & 1 ? props.theme.tdBg : props.background};
  &:hover {
    background-color: ${(props) => props.theme.trBg};
  }
  transition: background-color 0.3s ease;
`;
