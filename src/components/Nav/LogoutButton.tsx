import styles from "./Nav.module.css";
import { ClientComponents } from "../Client";
import { Avatar } from "primereact/avatar";
export interface LogoutButtonProps {
  onLogout?: () => void;
  mini?: boolean;
  nombre?: string;
  setVisible?: any;
  img?: string;
}

export default function LogoutButton({
  mini,
  nombre,
  setVisible,
  img
}: LogoutButtonProps) {
  if (mini)
    return (
      <li
        onClick={() => setVisible(true)}
        className="flex hover:cursor-pointer hover:bg-gray-300 w-full justify-center px-4 py-4"
      >
        <ClientComponents.Image
          aria-label="Cerrar sesión"
          alt=""
          src={`/Images/menu/logout.svg`}
          width={20}
          height={20}
        />
      </li>
    );

  return (
    <button
      onClick={() => setVisible(true)}
      className={`flex hover:cursor-pointer hover:bg-gray-300 mt-4 ${styles.pathLessContainer}`}
    >
      <div className="flex items-center p-4">
        {
          img !== '' ?
          <Avatar image={img}  shape="circle"/>
          :
        <div className="bg-[#DAC1E0] rounded-full h-7 w-7 flex justify-center items-center text-white">
          <p className="flex text-center align-middle text-md">
            {nombre?.substring(0, 2)}
          </p>
        </div>
        }
        <div className="mx-3">
          <p className="text-md text-white whitespace-balance">{nombre}</p>
        </div>
        <div>
          <ClientComponents.Image
            alt=""
            src={`/Images/menu/logout.svg`}
            width={20}
            height={20}
          />
        </div>
      </div>
    </button>
  );
}
