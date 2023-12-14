import styled from "styled-components";
import Pagination from "./Pagination";

interface StatusProps {
  status?: string;
}
interface Row {
  BG?: string;
}
const Table = ({ data, isLoading }: any) => {
  return (
    <Section>
      <GridSection>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Status</th>
            <th>username</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>loading...</td>
            </tr>
          ) : data ? (
            data.map((item: any, i: any) => (
              <Row BG={i}>
                <td> {item?.dateAndTime}</td>
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
      <Pagination />
    </Section>
  );
};

export default Table;

const GridSection = styled.table`
  th {
    padding: 20px 0;
    text-align: start;
    border-bottom: 1px solid black;
  }
  td {
    padding: 24px 0;
    color: #6f767e;
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
    props.BG & 1 ? " rgba(244, 244, 244, 0.50)" : "#fff"};
`;
