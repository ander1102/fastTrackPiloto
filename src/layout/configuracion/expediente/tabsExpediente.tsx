import { useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import Image from "next/image";

export const TabsExpediente = (props: any) => {
  const [value, setValue] = useState(null);
    const items = [
      { name: 'Dirección fiscal', value: 1 },
      { name: 'Contactos', value: 2 },
      { name: 'Documentación', value: 3 }
    ];

    if (props.person === 'moral'){
      items.push({ name: 'Representantes', value: 4 });
    }
    const justifyTemplate = (option:any) => {
      return <span className="text-xs font-medium">{option.name}</span>;
    }

  return(
    <>
      <div className="flex items-center">
        { value !== null && <Image alt="backArrow" style={{cursor: 'pointer', marginRight: 10, width: 20, height: 20}} src={require('../../../../public/Images/backArrow.png')} onClick={() => {setValue(null); props.handleCatchInternalTabs(null)}}/> }
        <span className="text-[#6B3374] text-xl leading-6 font-medium">Expediente</span>
      </div>
      <SelectButton
        className="my-5"
        value={value}
        onChange={(e) => {setValue(e.value); props.handleCatchInternalTabs(e.value)}}
        optionLabel="name"
        options={items}
        itemTemplate={justifyTemplate}
      />
    </>
  )
};
