'use client';
import BestSeller from "../components/BestSeller";
import Testimonials from "../components/CustomerTestimonials";
import FirstSlider from "../components/FirstSlider";
import LastSlider from "../components/LastSlider";
import MostPopular from "../components/MostPopular";
import SecondSlider from "../components/SecondSlider";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  return (
    <main className="overflow-x-hidden">
      <motion.section {...fadeInUp}>
        <FirstSlider/>
      </motion.section>
      
      <motion.section {...fadeInUp}>
        <SecondSlider/>
      </motion.section>
      
      <motion.section {...fadeInUp}>
        <BestSeller/>
      </motion.section>
      
      <motion.section {...fadeInUp}>
        <MostPopular/>
      </motion.section>
      
      {/* <Testimonials/> */}
      {/* <LastSlider/> */}
    </main>
  );
}