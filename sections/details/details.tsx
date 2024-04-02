import React, { useState } from 'react';
import InsurancePopOver from '../../components/popOver';

// Definirea tipurilor pentru opțiuni, dacă sunt necesare
interface Option {
  value: string;
  label: string;
}

const Details: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({}); // Tipizare mai precisă pentru starea formularului
  const [estimatedPrice, setEstimatedPrice] = useState<string>('');
  const [selectedInsuranceType, setSelectedInsuranceType] =
    useState<string>('');
  const [basePrice, setBasePrice] = useState<number>(0);

  // Opțiunile rămân neschimbate
  const options = {
    'Perioada de asigurare': ['1 an', '6 luni', '3 luni'],
    'Norma de Poluare': ['Euro 3', 'Euro 4', 'Euro 5', 'Euro 6'],
    'Tip Combustibil': [
      'Diesel',
      'Benzina',
      'Hibrid',
      'Electric',
      'Gaz-Benzina',
    ],
    'Categoria Masinii': [
      'Autoturism',
      'Camion',
      'Remorca',
      'Autocar',
      'Microbuz',
      'Motocicleta',
      'ATV',
    ],
    'Categorie Bonus': Array.from({ length: 17 }, (_, i) => (i - 8).toString()),
  };

  const driverFields = [
    'Nume',
    'Prenume',
    'CNP',
    'Data Nasterii',
    'Permis de conducere',
    'E-mail',
    'Nr. de telefon',
  ];

  const carFields = [
    'Categoria Masinii',
    'Numarul WIN',
    'An Productie',
    'Capacitate Cilindrica',
    'Categorie Bonus',
    'Nr Inmatriculare',
    'Nr Certificat Inmatriculare',
    'Norma de Poluare',
    'Tip Combustibil',
    'Perioada de asigurare',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const selectInsuranceType = (type: string) => {
    setSelectedInsuranceType(type);
    const prices: Record<string, number> = {
      'RCA': 500,
      'CASCO': 750,
      'CARTE VERDE': 350,
    };
    setBasePrice(prices[type] ?? 0); // Folosim ?? operator pentru a gestiona cazuri unde cheia nu există
  };

  const calculateInsurancePrice = () => {
    let price = basePrice; // Preț de bază
    // Coeficienții pentru categoria mașinii
    const carCategoryCoefficients = {
      Autoturism: 1.0,
      Camion: 1.5,
      Motocicleta: 0.8,
      // Adaugă alte categorii după necesitate
    };
    // Calcul coeficient pentru categoria bonus
    const bonusCategory = parseInt(formData['Categorie Bonus']);
    const bonusCategoryCoefficient =
      bonusCategory >= -8 && bonusCategory <= 8
        ? 1.0
        : bonusCategory > 8 && bonusCategory <= 15
        ? 0.9
        : 0.8;
    // Coeficienții pentru tipul de combustibil
    const fuelTypeCoefficients = {
      Diesel: 1.1,
      Benzina: 1.0,
      Electric: 0.8,
      Hibrid: 0.9,
      // Adaugă alte tipuri de combustibil după necesitate
    };
    // Calcul coeficient pentru vârsta conducătorului auto
    const driverBirthDate = new Date(formData['Data Nasterii']);
    const driverAge = new Date().getFullYear() - driverBirthDate.getFullYear();
    const driverAgeCoefficient =
      driverAge < 25 ? 1.2 : driverAge <= 60 ? 1.0 : 1.1;
    // Calcul coeficient pentru anul de producție al mașinii
    const carProductionYear = parseInt(formData['An Productie']);
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - carProductionYear;
    const carProductionYearCoefficient =
      carAge < 5 ? 0.9 : carAge <= 10 ? 1.0 : 1.1;
    // Coeficienții pentru norma de poluare
    const pollutionNormCoefficients = {
      'Euro 3': 1.1,
      'Euro 4': 1.0,
      'Euro 5': 0.9,
      'Euro 6': 0.8,
    };

    // Calcul coeficient pentru capacitatea cilindrică
    const cylinderCapacity = parseInt(formData['Capacitate Cilindrica']);
    const cylinderCapacityCoefficient =
      cylinderCapacity <= 1500 ? 0.9 : cylinderCapacity <= 2500 ? 1.0 : 1.1;

    // Coeficienții pentru perioada de asigurare
    const insurancePeriodCoefficients = {
      '1 an': 1.0,
      '6 luni': 1.05,
      '3 luni': 1.1,
    };

    // Aplică coeficienții în calculul prețului
    price *=
      carCategoryCoefficients[formData['Categoria Masinii']] *
      bonusCategoryCoefficient *
      fuelTypeCoefficients[formData['Tip Combustibil']] *
      driverAgeCoefficient *
      carProductionYearCoefficient *
      pollutionNormCoefficients[formData['Norma de Poluare']] *
      cylinderCapacityCoefficient *
      insurancePeriodCoefficients[formData['Perioada de asigurare']];

    setEstimatedPrice(`Preț estimat: ${price.toFixed(2)} RON`);
    setOpen(true);
  };

  const isActiveButton = (type: string) => selectedInsuranceType === type;

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-center mb-4">
        <span className="inline-flex rounded-md mb-6 shadow-sm">
          {['RCA', 'CASCO', 'CARTE VERDE'].map((type, index, arr) => (
            <button
              key={type}
              type="button"
              onClick={() => selectInsuranceType(type)}
              className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold ring-1 ring-inset shadow-sm focus:z-10 
                                ${
                                  isActiveButton(type)
                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                    : 'bg-white text-gray-900 hover:bg-gray-50'
                                } 
                                ${
                                  index === 0
                                    ? 'rounded-l-md'
                                    : index === arr.length - 1
                                    ? 'rounded-r-md'
                                    : '-ml-px'
                                }`}
            >
              {type}
            </button>
          ))}
        </span>
      </div>

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
        <h2 className="text-xl font-semibold mb-4">Informații Șofer</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {driverFields.map((field) => (
            <div key={field} className="mx-auto max-w-xs">
              <label
                htmlFor={field}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {field}
              </label>
              <div className="mt-2">
                <input
                  type={field === 'Data Nasterii' ? 'date' : 'text'}
                  name={field}
                  id={field}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={field !== 'Data Nasterii' ? field : ''}
                />
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-4 mt-8">Informații Mașină</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {carFields.map((field) => (
            <div key={field} className="mx-auto max-w-xs">
              <label
                htmlFor={field}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {field}
              </label>
              <div className="mt-2">
                {options[field] ? (
                  <select
                    id={field}
                    name={field}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Selectează opțiunea
                    </option>
                    {options[field].map(
                      (
                        option:
                          | boolean
                          | React.Key
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | null
                          | undefined
                      ) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={field}
                    id={field}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={field}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={calculateInsurancePrice} // Deschide pop-over-ul în loc de a calcula direct prețul
            className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Estimează prețul
          </button>
        </div>
        <InsurancePopOver
          open={open}
          setOpen={setOpen}
          onConfirm={() => console.log('Confirm')}
          onCancel={() => setOpen(false)}
          estimatedPrice={estimatedPrice}
        />
      </div>
    </div>
  );
};

export default Details;
