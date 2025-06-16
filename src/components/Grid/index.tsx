import React, { forwardRef, HTMLAttributes, PureComponent } from "react";
import {
  MAP_GRID_SM,
  MAP_GRID_LG,
  MAP_GRID_MD,
  MAP_GRID_XL,
  MAP_GRID_XXL,
  MAP_GRID_SPAN_LG,
  MAP_GRID_SPAN_MD,
  MAP_GRID_SPAN_SM,
  MAP_GRID_SPAN_XL,
  MAP_GRID_SPAN_XXL,
  MAP_GRID_GAP,
  MAP_GRID,
  MAP_GRID_SPAN,
} from "@app/constants/grid";
import styles from "./grid.module.css";

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  col?: GridColumns;
  sm?: GridColumns;
  md?: GridColumns;
  lg?: GridColumns;
  xl?: GridColumns;
  xxl?: GridColumns;
  gap?: number;
}

const Break = () => <div className={styles.griddivisor} />;

const Area = ({ title }: { title: string }) => (
  <div className="gridbreak gridarea">
    <div className={styles.gridtext}>{title}</div>
  </div>
);

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  span?: GridColumns;
  ssm?: GridColumns;
  smd?: GridColumns;
  slg?: GridColumns;
  sxl?: GridColumns;
  sxxl?: GridColumns;
}

const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const span = props.span ? MAP_GRID_SPAN[props.span - 1] : "";
  const ssm = props.ssm ? MAP_GRID_SPAN_SM[props.ssm - 1] : "";
  const smd = props.smd ? MAP_GRID_SPAN_MD[props.smd - 1] : "";
  const slg = props.slg ? MAP_GRID_SPAN_LG[props.slg - 1] : "";
  const sxl = props.sxl ? MAP_GRID_SPAN_XL[props.sxl - 1] : "";
  const sxxl = props.sxxl ? MAP_GRID_SPAN_XXL[props.sxxl - 1] : "";

  const classes = ["grid-item",props.className ?? "", span, ssm, smd, slg, sxl, sxxl];

  const className = classes.filter(Boolean).join(" ");

  return (
    <div ref={ref} className={className}>
      {props.children}
    </div>
  );
});

export default class Grid extends PureComponent<GridProps> {
  constructor(props: GridProps) {
    super(props);
  }

  public static Break = Break;
  public static Area = Area;
  public static Item = Item;

  render(): React.ReactNode {
    const { col, sm, md, lg, xl, xxl, gap, ...props } = this.props;
    const _col = col ? MAP_GRID[col - 1] : "";
    const _sm = sm ? MAP_GRID_SM[sm - 1] : "";
    const _md = md ? MAP_GRID_MD[md - 1] : "";
    const _lg = lg ? MAP_GRID_LG[lg - 1] : "";
    const _xl = xl ? MAP_GRID_XL[xl - 1] : "";
    const _xxl = xxl ? MAP_GRID_XXL[xxl - 1] : "";
    const _gap = gap ? MAP_GRID_GAP[gap - 1] : "";

    const classes = [
      props.className ?? "",
      "grid",
      _col,
      _sm,
      _md,
      _lg,
      _xl,
      _xxl,
      _gap,
    ];
    const className = classes.filter(Boolean).join(" ");

    return (
      <div {...props} className={className}>
        {props.children}
      </div>
    );
  }
}
