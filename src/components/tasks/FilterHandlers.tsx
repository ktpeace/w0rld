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
}

// Set/remove filters on click
export const FilterClickHandler = (
  event: React.MouseEvent<HTMLDivElement>,
  filters: string[],
  setFilters: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const name = event.currentTarget.innerText;
  if (filters.includes(name)) {
    setFilters(filters.filter((filterName) => filterName !== name));
  } else {
    setFilters((prev) => [...prev, name]);
  }
};

// Remove level 3+ filter (level check logic before function call in Tasks)
export const FilterByUserStatus = (sortedTasks: Task[]) => {
  return sortedTasks.filter((task) => task.status !== "Pretired");
};

// Apply filters to tasks
// this filter works by separating out groups + statuses so they can both apply at once. Could make them separate filter states from the start if the separation also becomes needed elsewhere
export const FilterTasks = (taskArray: Task[], filters: string[]) => {
  const groups: string[] = [];
  const statuses: string[] = [];
  taskArray.forEach((task) => {
    if (filters.includes(task.status) && !statuses.includes(task.status)) {
      statuses.push(task.status);
    } else if (filters.includes(task.group) && !groups.includes(task.group)) {
      groups.push(task.group);
    }
  });
  if (groups.length > 0 && statuses.length > 0) {
    return taskArray.filter(
      (task) => groups.includes(task.group) && statuses.includes(task.status)
    );
  } else if (groups.length > 0) {
    return taskArray.filter((task) => groups.includes(task.group));
  } else if (statuses.length > 0) {
    return taskArray.filter((task) => statuses.includes(task.status));
  } else {
    return taskArray;
  }
};

// Search tasks
export const SearchTasks = (tasks: Task[], searchInput: string) => {
  return tasks.filter((task) => {
    return Object.values(task)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });
};
