import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sabo Masties",
    designation: "Founder @ Rolex",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/team/zack.png",
    star: 5,
  },
  {
    id: 2,
    name: "Amy Starnes",
    designation: "Founder @ Fishsticks Coastal Coastal",
    content:
      "Every aspect of my website was thoughtfully designed and professionally created. He asked all the right questions to turn my business ideas into reality.",
    image: "/images/placeholder.jpg",
    star: 5,
  },
  {
    id: 3,
    name: "William Smith",
    designation: "Founder @ Trorex",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/team/zack.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-1 dark:bg-dark-2 py-10">
      <div className="container px-4">
        <SectionTitle
          title="What do my clients think?"
          paragraph="These are legitimate reviews from clients I have worked with. The client's website is also available under projects."
          width="640px"
          center
        />

        <div className="mt-[60px] flex flex-wrap lg:mt-20">
          {testimonialData.map((testimonial) => (
            <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
