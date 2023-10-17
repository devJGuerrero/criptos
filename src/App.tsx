import styled from "@emotion/styled";
import CriptoImage from "./assets/images/criptos.png";
import FormQuote from "./components/FormQuote";
import { useCallback, useEffect, useState } from "react";
import { Search } from "./types/Search";
import { SearchResult as SearchResultType } from "./types/SearchResult";
import SearchResult from "./components/SearchResult";

const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const SectionImagen = styled.div``;

const Imagen = styled.img`
  display: block;
  margin: 100px auto 0 auto;
  max-width: 400px;
  width: 80%;
`;

const SectionForm = styled.div``;

const Header = styled.h1`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 50px;
  margin-top: 80px;
  text-align: center;
  &::after {
    background-color: #66a2fe;
    content: "";
    display: block;
    height: 6px;
    margin: 10px auto 0 auto;
    width: 140px;
  }
`;

const App = () => {
  const [search, setSearch] = useState({} as Search);
  const [searchResult, setSearchResult] = useState({} as SearchResultType);

  const callbackSetSearch = useCallback((changeSearch: Search) => {
    setSearch(changeSearch);
  }, []);

  useEffect(() => {
    if (Object.keys(search).length > 0) {
      const searchAPI = async () => {
        const { crypto, currency } = search;
        const clientAPI = fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`
        );
        clientAPI
          .then((response) => response.json())
          .then((data) => {
            setSearchResult(data.DISPLAY[crypto][currency]);
          });
      };
      searchAPI();
    }
  }, [search]);

  return (
    <Container>
      <SectionImagen>
        <Imagen src={CriptoImage} />
      </SectionImagen>
      <SectionForm>
        <Header>Cotizador Criptomonedas En - Directo</Header>
        <FormQuote setSearch={callbackSetSearch} />
        {searchResult?.PRICE ? (
          <SearchResult searchResult={searchResult} />
        ) : null}
      </SectionForm>
    </Container>
  );
};

export default App;
