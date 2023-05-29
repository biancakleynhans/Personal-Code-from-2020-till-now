import type { NextPage } from 'next';
import Head from 'next/head';
import About from '../components/elements/About';
import Contact from '../components/elements/Contact';
import HomeHero from '../components/elements/HomeHero';
import Projects from '../components/elements/Projects';
import Skills from '../components/elements/Skills';

const Home: NextPage = () => {
  return (
    <div>
      {/* Head is: tab for page has all relevent in on tag for browser page as well as all the seo info */}
      <Head>
        <title>Coffee Coder </title>
        <meta name='description' content='Personal Portfolio for Coffee Coder' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HomeHero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;
