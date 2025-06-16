import { GetServerSideProps } from "next";
import withAppContext from "@app/components/HOC/withAppContext";

export default withAppContext(() => <></>, "dashboard/ventas", {
  title: "Ventas",
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: `/dashboard/ventas/clientesreferidos`,
      permanent: false, // Puedes ajustar esto según tus necesidades
    },
  };
};
