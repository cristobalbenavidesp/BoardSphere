const MEMBERS = [
  {
    name: "Cristobal Benavides",
    role: "CEO",
    image: "https://avatars.githubusercontent.com/u/38139389?v=4",
    linkedin: "https://www.linkedin.com/in/cristobal-benavides/",
  },
  {
    name: "Rodolfo Osorio",
    role: "role",
    image: "https://avatars.githubusercontent.com/u/38139389?v=4",
    linkedin: "https://www.linkedin.com/in/cristobal-benavides/",
  },
  {
    name: "Nicolás Salas",
    role: "role",
    image: "https://avatars.githubusercontent.com/u/38139389?v=4",
    linkedin: "https://www.linkedin.com/in/cristobal-benavides/",
  },
];

function Team() {
  return (
    <ul className="flex gap-9">
      <li className="team-description text-black">
        <h2 className="text-3xl font-bold">Nuestro Equipo</h2>
        <p className="mt-3">
          BoardSphere nace desde la imaginación de un grupo de estudiantes de
          Ingeniería Civil Informática de la Universidad Técnica Federico Santa
          María, ubicada en la ciudad de Valparaíso, Chile.
        </p>
      </li>
      {MEMBERS.map((member) => (
        <li key={member.name} className="team-member text-black">
          <img
            width={200}
            height={200}
            className="rounded-full"
            src={member.image}
            alt={`image of ${member.name}`}
          ></img>
          <h3 className="text-2xl mt-3 font-bold">{member.name}</h3>
          <p className="mt- text-primary font-semibold">{member.role}</p>
        </li>
      ))}
    </ul>
  );
}

export default Team;
