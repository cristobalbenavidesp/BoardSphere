"use client";
function SearchBar({
  onSearch,
  customClassName,
}: {
  onSearch: (search: string) => void;
  customClassName?: string;
}) {
  return (
    <div
      className={`relative text-gray-600 border rounded-xl ${customClassName}`}
    >
      <input
        type="search"
        name="search"
        placeholder="Buscar"
        className="bg-white h-10 px-5 pr-10 rounded-full focus:outline-none"
        onChange={(event) => {
          onSearch(event.target.value);
        }}
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27a6.49 6.49 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-5 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
