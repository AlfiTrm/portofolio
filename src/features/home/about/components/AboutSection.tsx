import ExperienceTimeline from "./ExperienceTimeline";
import "../styles/about.css";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-black pb-28 md:pb-28">
      <div className="pointer-events-none absolute inset-x-[18%] top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,rgba(240,231,212,0.12),rgba(240,231,212,0.04)_28%,transparent_70%)] blur-3xl" />
      <div className="relative z-10 w-full">
        <ExperienceTimeline />
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
