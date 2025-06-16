
export default function DetailLeadsHeader({}) {
  return (
    <section className="flex h-full pt-5">
      <div className="w-full flex flex-col">
        <p className="text-3xl text-black h-2/3">Leads</p>
        <p className={"text-xl h-1/3 text-[#1AB8AB] flex items-center"}> 
            <i className={"pi pi-arrow-left cursor-pointer "} onClick={()=>window.location.href = window.location.origin+"/dashboard/leads"}/>
            &nbsp;Información del Lead
        </p>
      </div>
      
    </section>
  );
}
