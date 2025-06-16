import { GetServerSideProps } from "next";
import withAppContext from "@app/components/HOC/withAppContext";

export default withAppContext(() => <></>, "dashboard/operaciones", {
  title: "Operaciones",
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: `/dashboard/operaciones/alertasriesgos`,
      permanent: false, // Puedes ajustar esto según tus necesidades
    },
  };
};
