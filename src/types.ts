export type Task = {
  id: number;
  name: string;
  description?: string;
  level: number;
  points: number;
  created_at?: string;
  creator: string;
  creator_user_id?: number;
  image_path?: string;
  status: string;
  groups?: string[];
  participants?: number;
};
