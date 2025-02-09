function Chapter({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-3 py-5 px-2">
      <h2 className="italic font-semibold">{title}</h2>
      <p>{desc}</p>
    </div>
  );
}

export default Chapter;
