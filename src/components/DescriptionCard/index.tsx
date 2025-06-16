import { ReactNode } from "react";

import styles from "./styles.module.css";

interface DescriptionCardProps {
  title?: string;
  color?: string;
  content?: ReactNode;
}

export default function DescriptionCard({
  title,
  color,
  content,
}: DescriptionCardProps) {
  return (
    <div
      className="flex justify-between items-center border-2 border-solid border-light-gray-400 rounded-md px-5 py-3 w-full"
    >
      <div className="flex items-center gap-2">
        <div className="rounded-full w-3 h-3" style={{ background: color }} />
        <span className="text-[13px] color-black">{title}</span>
      </div>
      <div className={styles.DescriptionCardContent}>{content}</div>
    </div>
  );
}
