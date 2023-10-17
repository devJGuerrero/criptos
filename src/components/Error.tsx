import styled from "@emotion/styled";

type Props = {
  message: string;
};

const Container = styled.div`
  background-color: #b732cc;
  padding: 1px 8px;
  border-radius: 5px;
`;

const Message = styled.p``;

const Error = ({ message }: Props) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export default Error;
