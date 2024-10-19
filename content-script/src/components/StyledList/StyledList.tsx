import styled from "styled-components";
import { StyledListProps } from "./StyledList.types";

const StyledListItemBase = styled.li`
  &::marker {
    color: ${({ theme }) => `rgb(${theme.palette.gray100})`};
  }
`;
const StyledListBase = styled.ol``;

const StyledListItem: StyledListProps['ListItem'] = ({ children, ...props }) => {

  return <StyledListItemBase {...props}>{children}</StyledListItemBase>;
};

export const StyledList: StyledListProps = ({ children, as }) => {

  return <StyledListBase as={as}>{children}</StyledListBase>;
};

StyledList.ListItem = StyledListItem;