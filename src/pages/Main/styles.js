import styled from 'styled-components';

export const TdPercentage = styled.td`
  color: ${props => (props.positive ? 'green' : 'red')};
`;
