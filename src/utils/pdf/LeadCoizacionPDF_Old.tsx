import React from "react";

interface Row {
  label: string;
  data: string | number;
  modifier?: "amount" | "cardNumber";
}
const TIPOTXN = {
  VN: "Pago",
  CAN: "Cancelación",
  DEV: "Devolución",
  REV:"Reverso"
};
const DataDisplayer = ({ data, modifier }: Row) => {
  switch (modifier) {
    case "amount":
      return <text className="font-bold">{data}</text>;
    case "cardNumber":
      return <text>**** {String(data).slice(-4)}</text>;
    default:
      return <text>{data}</text>;
  }
};
const InfoRow = (props: Row) => (
  <div className="w-full flex justify-between mb-7">
    <text className="font-medium text-light-gray">{props.label}:</text>
    <text>
      <DataDisplayer {...props} />
    </text>
  </div>
);

// Create Document Component
const PDFCotiazcionLeadOld = React.forwardRef<
  HTMLDivElement
  //IPDFCotiazcionLeadOld
>(({ }, ref) => {
  return (
    <article
      className="w-full bg-white min-h-screen flex flex-col"
      ref={ref}
    >
      <div className="flex w-full bg-black h-[75px]" >
        {/* <WhiteLogo /> */}
      </div>
      <div className="flex w-full bg-red-100 h-1/3" >
        <p className="text-2XL" >hey</p>
      </div>
      <div className="flex w-full bg-red-200 h-1/3" >
        <p className="text-2XL" >hey</p>
      </div>
      <div className="flex w-full bg-red-100 h-1/3" >
        <p className="text-2XL" >hey</p>
      </div>
      <div className="flex w-full bg-red-200 h-1/3" >
        <p className="text-2XL" >hey</p>
      </div>
      <div className="flex w-full bg-red-100 h-1/3" >
        <p className="text-2XL" >hey</p>
      </div>
      <div className="flex w-full bg-red-200 h-1/3" >
        <p className="text-2XL" >hey</p>
      </div>
      <div className="flex w-full bg-red-100 h-1/3" >
        <p className="text-2XL" >hey</p>
      </div>
      <div className="flex w-full bg-red-200 h-1/3" >
        <p className="text-2XL" >hey</p>
      </div>
    </article>
  );
});

export default PDFCotiazcionLeadOld;
