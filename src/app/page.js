import BestSeller from "../components/BestSeller";
import Testimonials from "../components/CustomerTestimonials";
import FirstSlider from "../components/FirstSlider";
import LastSlider from "../components/LastSlider";
import MostPopular from "../components/MostPopular";
import SecondSlider from "../components/SecondSlider";

export default function Home() {
  return (
    <>
    <FirstSlider/>
    <SecondSlider/>
    <BestSeller/>
    <MostPopular/>
    <Testimonials/>
    <LastSlider/>
    </>
  );
}