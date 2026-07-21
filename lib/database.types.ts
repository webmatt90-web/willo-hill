export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Child = {
  name: string;
  age: string;
  allergies: string;
};

type AnnouncementRow = {
  id: string;
  title: string;
  content: string | null;
  link_url: string | null;
  link_text: string | null;
  is_active: boolean;
  week_of: string | null;
  created_at: string;
};

type EventRow = {
  id: string;
  title: string;
  event_date: string;
  event_time: string | null;
  description: string | null;
  location: string | null;
  is_featured: boolean;
  created_at: string;
};

type SermonRow = {
  id: string;
  title: string;
  sermon_date: string;
  pastor: string | null;
  series_name: string | null;
  youtube_url: string | null;
  thumbnail_url: string | null;
  created_at: string;
};

type StaffRow = {
  id: string;
  name: string;
  title: string;
  role_category: string;
  photo_url: string | null;
  email: string | null;
  sort_order: number;
  created_at: string;
};

type PrayerRequestRow = {
  id: string;
  name: string;
  email: string | null;
  request: string;
  is_public: boolean;
  created_at: string;
};

type VisitRegistrationRow = {
  id: string;
  visit_date: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  bringing_kids: boolean;
  other_adult_name: string | null;
  needs_ride: boolean;
  pickup_address: string | null;
  wants_host: boolean;
  coffee_order: string | null;
  children: Json | null;
  created_at: string;
};

// Columns with DB-side defaults are optional on Insert.
type WithDefaults = "id" | "created_at";

type TableDef<
  Row extends { id: string; created_at: string },
  Optional extends keyof Row,
> = {
  Row: Row;
  Insert: Omit<Row, Optional | WithDefaults> &
    Partial<Pick<Row, Optional | WithDefaults>>;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      announcements: TableDef<AnnouncementRow, "is_active">;
      events: TableDef<EventRow, "is_featured">;
      sermons: TableDef<SermonRow, never>;
      staff: TableDef<StaffRow, "sort_order">;
      prayer_requests: TableDef<PrayerRequestRow, "is_public">;
      visit_registrations: TableDef<
        VisitRegistrationRow,
        "bringing_kids" | "needs_ride" | "wants_host"
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Announcement = AnnouncementRow;
export type ChurchEvent = EventRow;
export type Sermon = SermonRow;
export type StaffMember = StaffRow;
export type PrayerRequest = PrayerRequestRow;
export type VisitRegistration = VisitRegistrationRow;
