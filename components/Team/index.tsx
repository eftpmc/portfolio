import { TeamType } from "@/types/team";
import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Zack Starnes",
    designation: "Fullstack Developer",
    image: "/images/team/zack.png",
    instagramLink: "https://www.instagram.com/zack_hhi/",
  },
];

const Team = () => {
  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px] py-10"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            title="About Me"
            paragraph="I am a fullstack developer with 10+ years in the field."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center text-black">
          {teamData.map((team) => (
            <SingleTeam key={team.id} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
