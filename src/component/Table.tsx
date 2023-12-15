import styled from "styled-components";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";

interface StatusProps {
  status?: string;
}
interface Row {
  BG?: string;
}
const Table = ({ data, isLoading, setPage }: any) => {
  const [endData, setEndData] = useState(data);
  const [state, setState] = useState({ dateAndTime: true, status: true });

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
  return (
    <Section>
      <GridSection>
        <thead>
          <tr>
            <th onClick={() => handleSort("dateAndTime")}>
              Date & Time{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: state.dateAndTime ? "&#129059;" : "&#129057;",
                }}
              />
            </th>
            <th onClick={() => handleSort("status")}>
              Status{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: state.status ? "&#129059;" : "&#129057;",
                }}
              />
            </th>
            <th>username</th>
            <th>Value</th>
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
      <Pagination setPage={setPage} />
    </Section>
  );
};

export default Table;

const GridSection = styled.table`
  border-spacing: 0px;
  box-shadow:
    0px 4px 16px 0px rgba(101, 173, 225, 0.08),
    0px 2px 5px 0px rgba(55, 55, 55, 0.15);
  th {
    padding: 20px 0px;
    padding-left: 28px;
    text-align: start;
    border-bottom: 1px solid black;
    color: ${(props) => props.theme.tHColor};
    background-color: ${(props) => props.theme.thBg};
  }
  td {
    padding: 24px 0px;
    padding-left: 28px;
    color: ${(props) => props.theme.tdColor};
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
    props.status == "Pending" ? "yellow" : "#60CA57"};
`;
const Row = styled.tr<Row>`
  background: ${(props: any) =>
    props.BG & 1 ? props.theme.tdBg : props.background};
`;
