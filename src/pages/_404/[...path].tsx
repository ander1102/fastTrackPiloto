export const Custom404 = () => null;

export const getServerSideProps = () => {
  return { redirect: { destination: "/", permanent: false } };
};

export default Custom404;
