import React from "react";
import Grid, { ItemProps, GridProps } from "@app/components/Grid";

const FiltersItem: React.FC<ItemProps> = ({ ...props }) => {
  return (
    <Grid.Item {...props} className={`filters-item ${props.className ?? ""}`}>
      {props.children}
    </Grid.Item>
  );
};

const FiltersContainer: React.FC<GridProps> = ({ ...props }) => {
  return (
    <Grid
      {...props}
      sm={props?.sm ?? 2}
      md={props?.md ?? 3}
      lg={props?.lg ?? 6}
      gap={props?.gap ?? 3}
      className={`filters-container ${props.className ?? ""}`}
    >
      {props.children}
    </Grid>
  );
};

export { FiltersItem, FiltersContainer };
