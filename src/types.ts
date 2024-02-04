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
  groups?: string[];
  participantsCount?: number;
};
