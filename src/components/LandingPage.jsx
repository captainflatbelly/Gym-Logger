import Navbar from './LandingPageComponents/Navbar';
import Hero from './LandingPageComponents/Hero';
import Feature1 from './LandingPageComponents/Feature1';
import Feature2 from './LandingPageComponents/Feature2';
import Feature3 from './LandingPageComponents/Feature3';
import Card from './LandingPageComponents/Cards';


const LandingPage = () => {
    return (
        <div>
        <Navbar />
        <Hero />
        <Feature1 />
        <Feature2 />
        <Feature3 />
        <Card />
        </div>
    );
    };  
export default LandingPage;