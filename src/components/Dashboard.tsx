import { Link } from "react-router-dom";
import TicketsByStatus from "./TicketByStatus";
import TicketVolume from "./TicketVolume";

const Dashboard = () => {
  return (
    <section>
      <header className="mb-6 bg-gray-100 p-6 rounded-md">
        <div className="w-[75%] mx-auto md:flex items-center justify-between">
          <h1>Ticket Dashboard</h1>
          <nav className="flex gap-5">
            <button className="bg-gray-700 text-white px-5 py-2 rounded-md">
              <Link to="/ticketportal">Ticket Management Portal</Link>
            </button>
            {/* <Link to="/">Ticket Management Portal</Link> */}
            <button className="bg-gray-700 text-white px-5 py-2 rounded-md">
              <Link to="/">Logout</Link>
            </button>
          </nav>
        </div>
      </header>

      <div className="grid md:grid-cols-3 w-[75%]  mx-auto gap-6 mb-6">
        <div className="bg-[#F5F5F5] px-3 py-5 rounded-md">
          <h2>Total Tickets</h2>
          <p className="font-black">1,238</p>
        </div>
        <div className="bg-[#FEF6E9] px-3 py-5 rounded-md">
          <h2>Open Tickets</h2>
          <p className="font-black">238</p>
        </div>
        <div className="bg-[#F2FBE8] px-3 py-5 rounded-md">
          <h2>Resolved Tickets</h2>
          <p className="font-black">738</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:w-[75%]  mx-auto">
        <div className="p-6">
          <TicketVolume />
        </div>
        <div className="p-6">
          <TicketsByStatus />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
