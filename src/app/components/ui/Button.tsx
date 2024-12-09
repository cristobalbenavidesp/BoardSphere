export default function Button({ text }: { text: string }) {
  return (
    <button className="p-2 rounded-lg bg-white text-black shadow hover:bg-blue-50 active:scale-95">
      {text}
    </button>
  );
}
