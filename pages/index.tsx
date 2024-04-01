import React, { useState } from 'react';
import ConstrainedHeaderComponent from '../components/constrainedHeaderComponent';
import FeatureSection from '../components/featureComponent';
import Details from '../sections/details/details';

export function Index() {
  return (
    <>
      <ConstrainedHeaderComponent></ConstrainedHeaderComponent>
      <Details></Details>

      <FeatureSection />
    </>
  );
}

export default Index;
