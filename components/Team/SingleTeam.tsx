import { TeamType } from "@/types/team";
import Image from "next/image";

const SingleTeam = ({ team }: { team: TeamType }) => {
  const { image, name, designation, instagramLink } =
    team;
  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4">
      <div className="shadow-testimonial dark:bg-dark group mb-8 rounded-xl bg-white px-5 pb-10 pt-12 dark:shadow-none">
        <div className="relative z-10 mx-auto mb-5 h-[130px] w-[130px]">
          <Image
            src={image}
            alt={name}
            className="w-full rounded-full"
            width={256}
            height={256}
            unoptimized={true}
          />
        </div>
        <div className="text-center">
          <h3 className="text-body-color mb-1 text-lg font-semibold">
            {name}
          </h3>
          <p className="text-body-color mb-5 text-sm">
            {designation}
          </p>
          <div className="flex items-center justify-center gap-5">
            <a
              aria-label="social link"
              href={instagramLink}
              className="text-gray-500 hover:text-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path
                  d="M9.02429 11.8066C10.5742 11.8066 11.8307 10.5501 11.8307 9.00018C11.8307 7.45022 10.5742 6.19373 9.02429 6.19373C7.47433 6.19373 6.21783 7.45022 6.21783 9.00018C6.21783 10.5501 7.47433 11.8066 9.02429 11.8066Z"
                  fill=""
                />
                <path
                  d="M12.0726 1.5H5.92742C3.48387 1.5 1.5 3.48387 1.5 5.92742V12.0242C1.5 14.5161 3.48387 16.5 5.92742 16.5H12.0242C14.5161 16.5 16.5 14.5161 16.5 12.0726V5.92742C16.5 3.48387 14.5161 1.5 12.0726 1.5ZM9.02419 12.6774C6.96774 12.6774 5.34677 11.0081 5.34677 9C5.34677 6.99194 6.99194 5.32258 9.02419 5.32258C11.0323 5.32258 12.6774 6.99194 12.6774 9C12.6774 11.0081 11.0565 12.6774 9.02419 12.6774ZM14.1048 5.66129C13.8629 5.92742 13.5 6.07258 13.0887 6.07258C12.7258 6.07258 12.3629 5.92742 12.0726 5.66129C11.8065 5.39516 11.6613 5.05645 11.6613 4.64516C11.6613 4.23387 11.8065 3.91935 12.0726 3.62903C12.3387 3.33871 12.6774 3.19355 13.0887 3.19355C13.4516 3.19355 13.8387 3.33871 14.1048 3.60484C14.3468 3.91935 14.5161 4.28226 14.5161 4.66935C14.4919 5.05645 14.3468 5.39516 14.1048 5.66129Z"
                  fill=""
                />
                <path
                  d="M13.1135 4.06433C12.799 4.06433 12.5329 4.33046 12.5329 4.64498C12.5329 4.95949 12.799 5.22562 13.1135 5.22562C13.428 5.22562 13.6942 4.95949 13.6942 4.64498C13.6942 4.33046 13.4522 4.06433 13.1135 4.06433Z"
                  fill=""
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTeam;
