export default function Card({
  titulo,
  contenido,
  classN = "",
  textColor = "",
}) {
  return (
    <div
      className={
        classN
          ? `${classN}`
          : `bg-white flex flex-col justify-between h-full w-full rounded-3xl p-6`
      }
    >
      <div className="flex justify-between items-center">
        <h3 className={`${textColor} font-momo text-xl`}>{titulo}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 bg-[#ffffff] rounded-full p-2 mt-1 border"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </div>
      <div>
        <h1 className={`${textColor} font-momo text-5xl`}>{contenido}</h1>
      </div>
        <p className="text-[#b9b9b9] text-xs mt-auto">
          Aumento del ultimo mes +5
        </p>
    </div>
  );
}
