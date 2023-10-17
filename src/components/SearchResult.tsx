import styled from "@emotion/styled";
import { SearchResult } from "../types/SearchResult";

type Props = {
  searchResult: SearchResult;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  margin-top: 15px;
`;

const LogoType = styled.div``;

const Image = styled.img`
  max-width: 9rem;
`;

const Summary = styled.div``;

const Line = styled.p`
  margin: 0;
`;

const SearchResult = ({ searchResult }: Props) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    searchResult;
  return (
    <Container>
      <LogoType>
        <Image src={`https://cryptocompare.com/${IMAGEURL}`} />
      </LogoType>
      <Summary>
        <Line>
          Precio actual &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>{PRICE}</strong>
        </Line>
        <Line>
          Precio más alto del
          día:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>{HIGHDAY}</strong>
        </Line>
        <Line>
          Precio más bajo del
          día:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>{LOWDAY}</strong>
        </Line>
        <Line>
          Variación últimas 24 horas &nbsp;&nbsp;
          <strong>{CHANGEPCT24HOUR}</strong>
        </Line>
        <Line>
          Última actualización
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>{LASTUPDATE}</strong>
        </Line>
      </Summary>
    </Container>
  );
};

export default SearchResult;
