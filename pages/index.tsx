import React from 'react';
import ConstrainedHeaderComponent from '../components/constrainedHeaderComponent';
import FeatureSection from '../components/featureComponent';
import Details from '../sections/details/details';
import Footer from '../sections/footer/footer';

const Index: React.FC = () => {
  return (
    <>
      <ConstrainedHeaderComponent />
      <Details />
      <FeatureSection />
      <Footer />
    </>
  );
};

export default Index;
