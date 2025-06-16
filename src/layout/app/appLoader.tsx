import { ProgressSpinner } from "primereact/progressspinner";

export default function AppLoader() {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
      <ProgressSpinner />
    </div>
  );
}
