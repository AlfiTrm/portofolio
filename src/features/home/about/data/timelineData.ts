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
};

export const timelineMilestones: TimelineMilestone[] = [
  {
    title: "Information Systems, Brawijaya University",
    timeLabel: "2023 - sekarang",
    category: "education",
  },
  {
    title: "IT Fest 2025 Event Platform",
    timeLabel: "Mei - Juli 2025",
    category: "organization",
  },
  {
    title: "KBMDSI Organization Website",
    timeLabel: "Mei - Juli 2025",
    category: "organization",
  },
  {
    title: "IFL Chapter Malang Website",
    timeLabel: "Oktober - November 2025",
    category: "organization",
  },
  {
    title: "PT Inspirasi Mandiri Nusantara",
    timeLabel: "2025 - sekarang",
    category: "internship",
  },
  {
    title: "Academic Competition Platform",
    timeLabel: "2025 - sekarang",
    category: "contract",
  },
];
