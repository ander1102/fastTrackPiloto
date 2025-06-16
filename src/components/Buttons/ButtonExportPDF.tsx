import { Button} from "primereact/button";

const PDFButton = (props:any) => {
    return (
        <Button 
            type="button" 
            icon="pi pi-file-pdf" 
            className="!bg-[#f85757] !rounded-full h-[42px] !w-[42px] !border-none" 
            onClick={()=>props.prepareExport()} 
            data-pr-tooltip="XLS" 
        />
    );
};
export default PDFButton;
