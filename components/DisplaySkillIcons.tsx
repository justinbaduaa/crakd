import Image from "next/image";

import { cn, getTechLogos } from "@/lib/utils";

// Renamed component to be more general
const DisplaySkillIcons = async ({ skills }: SkillIconProps) => {
  // Handle undefined or empty skills array
  if (!skills || skills.length === 0) {
    return (
      <div className="flex flex-row">
        <div className="relative group bg-dark-300 rounded-full p-2 flex flex-center">
          <span className="tech-tooltip">No skills</span>
          <Image
            src="/tech.svg"
            alt="No skills"
            width={100}
            height={100}
            className="size-5"
          />
        </div>
      </div>
    );
  }

  const skillIcons = await getTechLogos(skills);

  return (
    <div className="flex flex-row">
      {skillIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>

          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplaySkillIcons;
