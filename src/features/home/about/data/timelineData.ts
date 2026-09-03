export type TimelineCategory =
  | "education"
  | "organization"
  | "hackathon"
  | "contract"
  | "internship"
  | "personal";

export type TimelineMilestone = {
  title: string;
  timeLabel: string;
  category: TimelineCategory;
  note: string;
  proof: string;
};

export const timelineMilestones: TimelineMilestone[] = [
  {
    title: "Information Systems, Brawijaya University",
    timeLabel: "2023 - sekarang",
    category: "education",
    note: "Learning how systems, people, and interfaces connect before turning them into working products.",
    proof: "systems thinking",
  },
  {
    title: "IT Fest 2025 Event Platform",
    timeLabel: "Mei - Juli 2025",
    category: "organization",
    note: "Built event-facing flows where clarity mattered more than decoration.",
    proof: "event platform",
  },
  {
    title: "KBMDSI Organization Website",
    timeLabel: "Mei - Juli 2025",
    category: "organization",
    note: "Shaped a student organization presence into a cleaner, easier-to-use web surface.",
    proof: "organization site",
  },
  {
    title: "IFL Chapter Malang Website",
    timeLabel: "Oktober - November 2025",
    category: "organization",
    note: "Turned community identity and program information into a more structured public site.",
    proof: "community web",
  },
  {
    title: "PT Inspirasi Mandiri Nusantara",
    timeLabel: "2025 - sekarang",
    category: "internship",
    note: "Working closer to production constraints, business needs, and frontend execution standards.",
    proof: "production practice",
  },
  {
    title: "Academic Competition Platform",
    timeLabel: "2025 - sekarang",
    category: "contract",
    note: "Building platform flows for registration, competition operations, and participant clarity.",
    proof: "product build",
  },
];
