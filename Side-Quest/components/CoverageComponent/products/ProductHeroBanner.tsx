import React from 'react';

interface iProps {
  hasCoverageSearched: boolean;
  isHero: boolean;
  heroOption: string;
  heroTagline: string;
}

const HeroBanner = ({ heroTagline }: { heroTagline: string }) => {
  return (
    <>
      {heroTagline !== '' ? (
        <div className='flex justify-center items-center py-1 bg-gradient-to-r from-mwcyan-herol to-mwcyan-heror'>
          <h3 className='text-white text-lg font-semibold'>{heroTagline}</h3>
        </div>
      ) : null}
    </>
  );
};

export default function ProductHeroBanner(props: iProps) {
  const { hasCoverageSearched, heroOption, heroTagline, isHero } = props;
  return (
    <>
      {hasCoverageSearched && isHero && heroOption === 'CoverageSearchedJourneyOnly' ? (
        <HeroBanner heroTagline={heroTagline} />
      ) : hasCoverageSearched && isHero && heroOption === 'AllUserJourneys' ? (
        <HeroBanner heroTagline={heroTagline} />
      ) : !hasCoverageSearched && isHero && heroOption === 'IncognitoJourneyOnly' ? (
        <HeroBanner heroTagline={heroTagline} />
      ) : !hasCoverageSearched && isHero && heroOption === 'AllUserJourneys' ? (
        <HeroBanner heroTagline={heroTagline} />
      ) : null}
    </>
  );
}
