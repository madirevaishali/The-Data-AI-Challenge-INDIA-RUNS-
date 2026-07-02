import { IconContext } from "react-icons";

function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <IconContext.Provider
          value={{
            size: "40px",
            color,
          }}
        >
          {icon}
        </IconContext.Provider>

      </div>

    </div>
  );
}

export default StatCard;