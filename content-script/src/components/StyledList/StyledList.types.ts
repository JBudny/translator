import { FC, HTMLAttributes, PropsWithChildren } from "react";

interface StyledList extends PropsWithChildren<HTMLAttributes<HTMLOListElement>> {
  as: 'ol' | 'ul';
};

export interface StyledListProps extends FC<StyledList> {
  ListItem: FC<HTMLAttributes<HTMLLIElement>>;
};