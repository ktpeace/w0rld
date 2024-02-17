// Type definitions
export type Task = {
  id: number;
  name: string;
  description?: string;
  level: number;
  points: number;
  createdAt?: string;
  creator?: string;
  creatorUserId?: number;
  imagePath?: string;
  status: string;
  groups: {
    id: number;
    name: string;
  }[];
  participantsCount?: number;
};

export type Group = {
  id: number;
  name: string;
  description: string;
  colorPrimary: string;
  colorSecondary: string;
  createdAt: string;
  imagePath?: string;
  memberCount: number;
};

export type Praxis = {
  id: number;
  taskId: number;
  userId: number;
  completedAt: string;
  title: string;
  description: string;
  User: { username: string; imagePath: string };
  Task: {
    name: string;
    points: number;
    level: number;
  };
  imagePath?: string;
};

export type Update = {
  id: number;
  timestamp: string;
  actingUserId: number;
  elementType: "new-task" | "praxis-post";
  elementId: string;
  additionalInfo: Task | Praxis;
};

// Type guards
export function isTask(info: any): info is Task {
  return (
    typeof info.id === "number" &&
    typeof info.name === "string" &&
    typeof info.level === "number" &&
    typeof info.points === "number" &&
    Array.isArray(info.groups) &&
    info.groups.every(
      (group: { id: any; name: any }) =>
        typeof group.id === "number" && typeof group.name === "string"
    )
  );
}

export function isPraxis(info: any): info is Praxis {
  return (
    (typeof info.taskId === "number" &&
      typeof info.userId === "number" &&
      typeof info.completedAt === "string" &&
      typeof info.title === "string" &&
      typeof info.description === "string" &&
      typeof info.User === "object" &&
      typeof info.User.username === "string" &&
      typeof info.User.imagePath === "string") ||
    (info.User.imagePath === null &&
      typeof info.Task === "object" &&
      typeof info.Task.name === "string" &&
      typeof info.Task.points === "number" &&
      typeof info.Task.level === "number")
  );
}

// Interfaces
export interface UserData {
  createdAt: string;
  description: string | null;
  flags: number;
  groupId: number | null;
  groupName: string | null;
  id: number;
  imagePath: string | null;
  isBanned: boolean;
  level: number;
  location: string | null;
  points: number;
  terms: string | null;
  username: string;
  votes: number;
}
