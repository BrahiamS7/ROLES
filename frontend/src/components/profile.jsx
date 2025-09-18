export default function Profile({ user }) {
  return (
    <div className="bg-[#F2F2F2] mx-7 my-10 p-10 rounded-xl shadow">
      <h2 className="mb-6 text-[#6B7280]">Trabajor</h2>
      <div className="flex justify-between">
        <div className="flex">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar w-20 h-20"
          >
            <div class="rounded-full ">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="ml-7 text-indigo-900">Operario</h2>
            <h2 className="ml-7">{user[0]?.nombre}</h2>
          </div>
        </div>
        <div class="fab self-end">
          <button class="btn btn-lg btn-circle text-white bg-gradient-to-bl from-indigo-900 to-indigo-600">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
