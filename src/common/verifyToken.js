async function verifyToken(token) {
  const response = await fetch("http://localhost:8000/api/check", {
    headers: {
      Authorization: "Bear " + token,
    },
  });
  console.log('response',response);
  const { status } = response;
  switch (status) {
    case 401:
      return {
        redirect: {
          destination: "/auth",
          permanent: false,
        },
      };
    default:
      return {
        props: {},
      };
  }
}

export { verifyToken };
