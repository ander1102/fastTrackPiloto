import Image from "next/image";
import { CheckedState } from "./types";
import { RadioButton } from "primereact/radiobutton";

const InputRadioImage = ({
  formik,
  name,
  image,
  title,
  description,
  checked,
  setChecked,
}: {
  formik: any;
  name: keyof CheckedState;
  image: string;
  description: string;
  title: string;
  checked: CheckedState;
  setChecked: React.Dispatch<React.SetStateAction<CheckedState>>;
}) => {
  const { values } = formik;
  const field = "infoCotizacion." + name;

  const isCheked = checked[name];

  return (
    <div className="flex items-center w-[280px]">
      <div
        className="mr-5"
        onClick={() => {
          setChecked((prev: CheckedState) => ({
            ...prev,
            [name]: !prev[name], // Accediendo dinámicamente a la propiedad del objeto
          }));
        }}
      >
        <RadioButton name={name} key={field} checked={isCheked} />
      </div>
      <div className="flex items-center">
        <Image
          src={image}
          width={40}
          height={40} // Ajusta la altura según tus necesidades
          alt={title}
          className="mr-3"
        />
        <div className="flex flex-col m-1">
          <p className="text-sm mb-2">{description}</p>
          <p className="text-md mb-2">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default InputRadioImage;
