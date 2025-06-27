interface TransactionItemProps {
  title: string;
  value: any;
}

export default function TransactionItem({
  title,
  value,
}: TransactionItemProps) {
  return (
    <div className="py-1 flex justify-between">
      <span className="text-sm text-[#5A5A5A] w-[170px]">
        {title}
      </span>
      <span className="text-sm text-primary-color font-[600] w-[170px] text-right">
        {value}
      </span>
    </div>
  );
}
