import React from 'react';
import { Column, Container, Row } from '../../components/grid';

function Footer() {
  return (
    <Container className="w-full">
      <Row className="md:justify-between gap-[30px] flex-col md:flex-row items-center justify-center md:items-baseline text-center">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Trimite
        </button>

        <div className="w-[150px] h-5 rounded-xl bg-green-500">1 Page</div>

        <button
          type="button"
          className="text-blue-800  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Clear form
        </button>
      </Row>
    </Container>
  );
}

export default Footer;
