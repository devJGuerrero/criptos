/* eslint-disable react-refresh/only-export-components */
import styled from "@emotion/styled";
import { Currency } from "../types/Currency";
import { useState } from "react";

type Props = {
  label: string;
  data: Array<Currency>;
};

const Label = styled.label`
  display: block;
  font-size: 24px;
  font-weight: 700;
  margin: 15px 0;
`;

const Select = styled.select`
  border-radius: 10px;
  font-size: 18px;
  padding: 14px;
  width: 100%;
`;

const Option = styled.option``;

const useInputSelect = ({ label, data }: Props) => {
  const [state, setState] = useState("");
  const inputSelect = () => (
    <>
      <Label>{label}</Label>
      <Select value={state} onChange={(event) => setState(event.target.value)}>
        <Option value="">Seleccionar</Option>
        {data.map((currency) => (
          <Option value={currency.id} key={currency.id}>
            {currency.name}
          </Option>
        ))}
      </Select>
    </>
  );
  return [state, inputSelect] as [string, () => JSX.Element];
};

export default useInputSelect;
