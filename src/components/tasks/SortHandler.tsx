import { tasks } from "./tasks-data";

interface Task {
  id: number;
  name: string;
  group: string;
  status: string;
  level: number;
  points: number;
  desc: string;
  inProgress: number;
  completed: number;
  minPlayers: number;
  maxPlayers: number;
  [key: string]: any;
}

const SortHandler = (
  event: React.MouseEvent<HTMLDivElement>,
  sortedTasks: Task[],
  setSortedTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  // SORT DATA
  function sortTasks(value: string, direction: string) {
    value = value.toLowerCase();
    let sortedTasksCopy = [...sortedTasks];
    const isNum =
      value === "level" || value === "points" || value === "completed";
    if (direction === "↓") {
      if (isNum) {
        sortedTasksCopy.sort((a, b) => a[value] - b[value]);
      } else {
        sortedTasksCopy.sort((a, b) => a[value].localeCompare(b[value]));
      }
    } else if (direction === "↑") {
      if (isNum) {
        sortedTasksCopy.sort((a, b) => b[value] - a[value]);
      } else {
        sortedTasksCopy.sort((a, b) => b[value].localeCompare(a[value]));
      }
    } else {
      sortedTasksCopy = tasks;
    }
    setSortedTasks(sortedTasksCopy);
  }
  // SET TABLE HEADER ARROWS
  const text = event.currentTarget.innerText;
  const arrow = text[text.length - 1];
  const header = text.slice(0, text.length - 2);
  const allArrows = document.getElementsByClassName("arrow");
  for (let i = 0; i < allArrows.length; i++) {
    allArrows[i].innerHTML = "↕";
  }
  if (arrow === "↕") {
    sortTasks(header, "↓");
    event.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↓</span>`;
  } else if (arrow === "↓") {
    sortTasks(header, "↑");
    event.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↑</span>`;
  } else if (arrow === "↑") {
    sortTasks(header, "↕");
    event.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↕</span>`;
  }
};

export default SortHandler;
