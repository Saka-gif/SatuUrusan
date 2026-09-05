export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  province?: string | null;
  city?: string | null;
  preferences?: {
    notifications?: boolean;
    ai_assistant?: boolean;
  };
  created_at: string;
  updated_at: string;
};

export type LifeEvent = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  accent: "blue" | "orange" | "rose" | "green" | "violet" | "teal" | "yellow";
  tasks_count: number;
  order_index: number;
  created_at?: string;
};

export type ServiceCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  accent: "blue" | "mint" | "orange" | "violet" | "yellow" | "rose" | "teal";
  tags: string[];
  count?: number;
  order_index: number;
  items?: ServiceItem[];
};

export type ServiceItem = {
  id: string;
  category_id?: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  requirements: string[];
  official_name?: string;
  official_url?: string;
  steps?: { title: string; desc: string }[];
  is_popular?: boolean;
  order_index?: number;
};

export type RoadmapTask = {
  id: string;
  roadmap_id: string;
  service_item_id?: string | null;
  title: string;
  description: string;
  category: string;
  duration: string;
  requirements: string[];
  official_url?: string;
  status: "pending" | "in_progress" | "completed" | "skipped";
  is_completed: boolean;
  order_index: number;
  completed_at?: string | null;
  notes?: string | null;
};

export type UserRoadmap = {
  id: string;
  user_id?: string;
  life_event_id?: string | null;
  title: string;
  description?: string | null;
  status: "in_progress" | "completed" | "paused" | "archived";
  progress_pct: number;
  target_completion_date?: string | null;
  created_at: string;
  updated_at: string;
  tasks?: RoadmapTask[];
};

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
  order_index: number;
};

export type AiMessage = {
  id: string;
  user_id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  suggested_actions?: { label: string; action_url?: string; query?: string }[];
  created_at: string;
};
