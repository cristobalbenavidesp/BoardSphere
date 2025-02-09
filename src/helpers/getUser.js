async function getUser(RUT) {
  const user = await fetch(`http://localhost:3000/api/users/${RUT}`, {
    method: "GET",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return user;
}

export default getUser;
