import { useState, useEffect } from "react";
import axios from "axios";

interface Task {
  id: number;
  name: string;
  description: string;
  level: number;
  points: number;
  min_players: number;
  max_players: number;
  creator: string;
  created_at: string;
  group_name: string | null;
  color_primary: string | null;
  color_secondary: string | null;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [totalPages, setTotalPages] = useState(0);

  async function getAllTasks(page: number, pageSize: number) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?page=${page}&pageSize=${pageSize}`,
        { withCredentials: true }
      );
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllTasks(page, pageSize);
  }, [page, pageSize]);

  function handlePrevPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  function handleNextPage() {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  return (
    <main className="flex flex-col items-center mt-20 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">Tasks</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Level</th>
              <th>Points</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.level}</td>
                <td>{task.points}</td>
                <td>{task.group_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </main>
  );
};

export default Tasks;

// import { useState, useContext, useEffect } from "react";
// // import { tasks } from "../../components/tasks/tasks-data";
// // import { UserContext } from "../../components/UserContext";
// // import TaskMapper from "../../components/tasks/TaskMapper";
// import axios from "axios";

// const Tasks = () => {
//   // const [sortedTasks, setSortedTasks] = useState(tasks);
//   // const [searchInput, setSearchInput] = useState("");
//   // const [filters, setFilters] = useState<string[]>([]);
//   // const [currentPage, setCurrentPage] = useState(1);
//   // const { user } = useContext(UserContext);
//   // const user = { username: "Pixie", level: 3 };

//   // RESET FILTERS ON LOGIN/LOGOUT (because available filters change)
//   // useEffect(() => {
//   //   setFilters(() => []);
//   //   setSearchInput(() => "");
//   // }, [user]);

//   interface Task {
//     id: number;
//     name: string;
//     description: string;
//     level: number;
//     points: number;
//     group_id: number;
//   }

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   async function getAllTasks(page: number, pageSize: number) {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?page=${page}&pageSize=${pageSize}`,
//       { withCredentials: true }
//     );
//     console.log(response.data);
//     return response.data;
//   }

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const data = await getAllTasks(page, pageSize);
//       setTasks(data);
//     };
//     fetchTasks();
//   }, [page, pageSize]);

//   return (
//     <main className="flex flex-col items-center mt-20 px-6 py-8 gap-5 dark:text-dark">
//       <h1 className="text-2xl">Tasks</h1>
//       <div>
//         <h1>Tasks</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Level</th>
//               <th>Points</th>
//               <th>Group ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <tr key={task.id}>
//                 <td>{task.name}</td>
//                 <td>{task.description}</td>
//                 <td>{task.level}</td>
//                 <td>{task.points}</td>
//                 <td>{task.group_id}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// };

// export default Tasks;

{
  /* <p>
        Still some things to work out with design, responsiveness, and filter
        logic (if you click filter when not on page 1, must click page 1 to see
        results).
      </p> */
}
{
  /* <TaskMapper
        user={user}
        sortedTasks={sortedTasks}
        setSortedTasks={setSortedTasks}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        filters={filters}
        setFilters={setFilters}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */
}
