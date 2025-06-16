import { ProgressSpinner } from "primereact/progressspinner";
import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

interface LoaderViewProps extends PropsWithChildren {
  loading: boolean;
  className?: string;
}

export default function LoaderView({
  children,
  loading,
  className,
}: LoaderViewProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      {loading && (
        <div className={`absoluteFill ${styles.LoaderView}`}>
          <ProgressSpinner />
        </div>
      )}
    </div>
  );
}
