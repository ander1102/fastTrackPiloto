import withAppContext from "@app/components/HOC/withAppContext";
import { GetServerSideProps } from "next";

export default withAppContext(() => <></>, "dashboard/ventas", {
  title: "Catálogos",
});

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
      redirect: {
        destination: `/dashboard/catalogos/productos`,
        permanent: false, // Puedes ajustar esto según tus necesidades
      },
    };
}
