import Hero from "../../components/home/Hero";
import Statistics from "../../components/home/Statistics";
import FeaturedJobs from "../../components/home/FeaturedJobs";
import FeaturedCompanies from "../../components/home/FeaturedCompanies";

function Home() {
  return (
    <div className="home-page">
      <Hero />
      <Statistics />
      <FeaturedJobs />
      <FeaturedCompanies />
    </div>
  );
}

export default Home;