import debounce from "lodash/debounce";

import styled from "styled-components";
const SearchContainer = styled.form`
  width: 490px;
  height: 45px;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const SearchBarInput = styled.input`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  font-size: 1rem;
  @media (max-width: 768px) {
    padding: 0 10px;
    font-size: 12px;
  }
  background-color: ${(props) => props.theme.tdBg};
  /* border: 1px solid #d0cfce; */
  outline: none;
  border-radius: 8px;
  border: none;
  box-shadow:
    0px 4px 16px 0px rgba(101, 173, 225, 0.08),
    0px 2px 5px 0px rgba(55, 55, 55, 0.15);
  &:focus {
    transition: 0.35s ease;
    color: ${(props) => props.theme.tdColor};
    &::placeholder {
      transition: opacity 0.45s ease;
      opacity: 0;
    }
  }
`;
const SearchIcon = styled.img`
  position: relative;
  float: right;
  width: 75px;
  height: 75px;
  top: -60px;
  right: -10px;
  @media (max-width: 768px) {
    width: 28%;
    height: 100%;
    top: -100%;
  }
`;

const SearchForm = ({ setUsername, mode }: any) => {
  const handleInputChange = debounce((value: string) => {
    setUsername(value.toLowerCase());
  }, 800); // Adjust the debounce delay as needed

  return (
    <SearchContainer>
      <SearchBarInput
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(e.target.value)
        }
        placeholder="Search by username"
      />
      <SearchIcon
        src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
        style={!mode ? { filter: "invert(1)" } : {}}
      />
    </SearchContainer>
  );
};

export default SearchForm;
