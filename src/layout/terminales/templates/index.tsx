export const TerminalStatusTemplate = ({ estatus }: { estatus: string }) => {
  return (
    <div className="w-full font-normal truncate flex items-center">
      <div
        className={`rounded-full h-2 w-2 ${
          estatus?.toLocaleLowerCase() === "disponible"
          ? "bg-status-green" 
          : "bg-status-gray"
        }`}
      />
      &nbsp;{estatus}
    </div>
  );
};
