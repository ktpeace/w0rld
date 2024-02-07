export type Task = {
  id: number;
  name: string;
  description?: string;
  level: number;
  points: number;
  created_at?: string;
  creator: string;
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
