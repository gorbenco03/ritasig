import React from 'react';
import { Column, Container } from '../../components/grid';
import Footer from '../footer/footer.section';
import { Header } from '../header/header.section';

function Forms() {
  return (
    <div className="px-5 md:px-0">
      <Header />
      <Container className="text-center py-5"></Container>
      <Footer />
    </div>
  );
}

export default Forms;
