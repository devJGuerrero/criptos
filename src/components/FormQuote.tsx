import { FormEvent, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Currency } from "../types/Currency";
import useInputSelect from "../hooks/useInputSelect";
import { Data } from "../types/Data";
import { Crypto } from "../types/Crypto";
import Error from "./Error";
import { Search } from "../types/Search";

type Props = {
  setSearch: (change: Search) => void;
};

const Form = styled.form``;

const ButtonSubmit = styled.input`
  background-color: #9497ff;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  margin-top: 30px;
  padding: 10px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  width: 100%;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const FormQuote = ({ setSearch }: Props) => {
  const currencies = useMemo(
    () =>
      [
        { id: "USD", name: "Dólar Estados Unidos" },
        { id: "MXN", name: "Peso Mexicano" },
        { id: "EUR", name: "Euro" },
        { id: "GBP", name: "Libra Esterlina" },
      ] as Array<Currency>,
    []
  );

  const [error, setError] = useState({ status: false, message: "" });
  const [cryptos, setCryptos] = useState([] as Crypto[]);

  const [currency, InputSelectCurrency] = useInputSelect({
    label: "Seleccionar una moneda",
    data: currencies,
  });

  const [crypto, InputSelectCrypto] = useInputSelect({
    label: "Seleccionar una criptomoneda",
    data: cryptos,
  });

  useEffect(() => {
    const cryptosAPI = async () => {
      const clientAPI = fetch(
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      );
      clientAPI
        .then((response) => response.json())
        .then(({ Data: data }: { Data: Data }) => {
          setCryptos(
            data.map((record) => ({
              id: record.CoinInfo.Name,
              name: record.CoinInfo.FullName,
            }))
          );
        });
    };
    cryptosAPI();
  }, []);

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    if ([currency, crypto].includes("")) {
      setError({
        status: true,
        message: "Todos los campos son requeridos",
      });
      return;
    }
    setError({
      status: false,
      message: "",
    });
    setSearch({
      crypto,
      currency,
    });
  };

  return (
    <>
      {error.status ? <Error message={error.message} /> : null}
      <Form onSubmit={handleSubmitForm}>
        <InputSelectCurrency />
        <InputSelectCrypto />
        <ButtonSubmit type="submit" value={"Cotizar"} />
      </Form>
    </>
  );
};

export default FormQuote;
