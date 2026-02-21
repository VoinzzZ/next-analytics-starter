export type UserProfile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type UserRole = {
  id: string;
  user_id: string;
  role: "admin" | "user" | "moderator";
  created_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  plan: "free" | "pro" | "enterprise";
  status: "active" | "inactive" | "cancelled";
  created_at: string;
  updated_at: string;
};

export type MetricCard = {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: React.ComponentType<{ className?: string }>;
};

export type ChartData = {
  month: string;
  value: number;
};
