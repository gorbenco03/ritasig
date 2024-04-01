import React from 'react';
import { Column, Container, Row } from '../../components/grid';

export const Header = () => {
  return (
    <Container className="bg-white rounded-lg py-4 mt-4">
      <Column className="text-center md:text-left">
        <h1 className="mb-4">Test - valorile umane</h1>
        <p>
          Întrebările sunt de tipul &quot;Cât de mult te asemeni cu persoana
          descrisă în enunț&rdquo;.
        </p>

        <h4 className="text-red-500 mt-4">* Întrebare obligatorie</h4>
      </Column>
    </Container>
  );
};
