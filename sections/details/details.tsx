import React, { useState } from 'react';
import InsurancePopOver from '../../components/popOver';

const Details: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    TipAsigurare: '',
    Nume: '',
    Prenume: '',
    CNP: '',
    DataNasterii: '',
    PermisDeConducere: '',
    Email: '',
    NrDeTelefon: '',
    CategoriaMasinii: '',
    NumarulWIN: '',
    AnProductie: '',
    CapacitateCilindrica: '',
    CategorieBonus: '',
    NrInmatriculare: '',
    NrCertificatInmatriculare: '',
    NormaDePoluare: '',
    TipCombustibil: '',
    PerioadaDeAsigurare: '',
    StatusAsigurare: '',
  });
  const [estimatedPrice, setEstimatedPrice] = useState<string>('');
  const [basePrice, setBasePrice] = useState<number>(0);

  const driverFields = [
    'Nume',
    'Prenume',
    'CNP',
    'DataNasterii',
    'PermisDeConducere',
    'Email',
    'NrDeTelefon',
  ];
  const carFields = [
    'CategoriaMasinii',
    'NumarulWIN',
    'AnProductie',
    'CapacitateCilindrica',
    'CategorieBonus',
    'NrInmatriculare',
    'NrCertificatInmatriculare',
    'NormaDePoluare',
    'TipCombustibil',
    'PerioadaDeAsigurare',
  ];

  const options: { [key: string]: string[] } = {
    PerioadaDeAsigurare: ['1 an', '6 luni', '3 luni'],
    NormaDePoluare: ['Euro 3', 'Euro 4', 'Euro 5', 'Euro 6'],
    TipCombustibil: ['Diesel', 'Benzina', 'Hibrid', 'Electric', 'Gaz-Benzina'],
    CategoriaMasinii: [
      'Autoturism',
      'Camion',
      'Remorca',
      'Autocar',
      'Microbuz',
      'Motocicleta',
      'ATV',
    ],
    CategorieBonus: Array.from({ length: 17 }, (_, i) => (i - 8).toString()),
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await fetch('http://localhost:5000/api/insurance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          PretAsigurare: formData.PretAsigurare,
        }),
      });

      if (!response.ok) {
        throw new Error('Eroare la trimiterea datelor');
      }

      console.log('Datele au fost trimise cu succes.');
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          'A apărut o eroare la trimiterea datelor:',
          error.message
        );
      } else {
        console.error('A apărut o eroare necunoscută');
      }
    }
  };

  const selectInsuranceType = (type: string) => {
    setFormData({ ...formData, TipAsigurare: type });

    const prices: Record<string, number> = {
      'RCA': 500,
      'CASCO': 750,
      'CARTE VERDE': 350,
    };
    setBasePrice(prices[type] ?? 0);
  };

  const calculateInsurancePrice = () => {
    // Asigură-te că avem un preț de bază valid pentru calcul
    let price = Number(basePrice);
    if (isNaN(price)) {
      alert('Prețul de bază este invalid.');
      return;
    }

    // Coeficienții pentru categoria mașinii
    const carCategoryCoefficients: Record<string, number> = {
      Autoturism: 1.0,
      Camion: 1.5,
      Motocicleta: 0.8,
      // Adaugă alte categorii conform necesităților
    };

    // Extrage și validează categoria bonus ca număr
    const bonusCategory = parseInt(formData['CategorieBonus'], 10);
    const bonusCategoryCoefficient =
      bonusCategory >= -8 && bonusCategory <= 8
        ? 1.0
        : bonusCategory > 8 && bonusCategory <= 15
        ? 0.9
        : 0.8;

    // Coeficienții pentru tipul de combustibil
    const fuelTypeCoefficients: Record<string, number> = {
      Diesel: 1.1,
      Benzina: 1.0,
      Electric: 0.8,
      Hibrid: 0.9,
      // Adaugă alte tipuri de combustibil conform necesităților
    };

    // Calculează coeficientul pe baza vârstei conducătorului auto
    const driverBirthDate = new Date(formData['DataNasterii']);
    const driverAge = new Date().getFullYear() - driverBirthDate.getFullYear();
    const driverAgeCoefficient =
      driverAge < 25 ? 1.2 : driverAge <= 60 ? 1.0 : 1.1;

    // Calculează coeficientul pe baza anului de producție al mașinii
    const carProductionYear = parseInt(formData['AnProductie'], 10);
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - carProductionYear;
    const carProductionYearCoefficient =
      carAge < 5 ? 0.9 : carAge <= 10 ? 1.0 : 1.1;

    // Coeficienții pentru norma de poluare
    const pollutionNormCoefficients: Record<string, number> = {
      'Euro 3': 1.1,
      'Euro 4': 1.0,
      'Euro 5': 0.9,
      'Euro 6': 0.8,
    };

    // Calculează coeficientul pe baza capacității cilindrice
    const cylinderCapacity = parseInt(formData['CapacitateCilindrica'], 10);
    const cylinderCapacityCoefficient =
      cylinderCapacity <= 1500 ? 0.9 : cylinderCapacity <= 2500 ? 1.0 : 1.1;

    // Coeficienții pentru perioada de asigurare
    const insurancePeriodCoefficients: Record<string, number> = {
      '1 an': 1.0,
      '6 luni': 1.05,
      '3 luni': 1.1,
    };

    // Aplică coeficienții în calculul prețului
    price *=
      (carCategoryCoefficients[formData['CategoriaMasinii']] || 1) *
      bonusCategoryCoefficient *
      (fuelTypeCoefficients[formData['TipCombustibil']] || 1) *
      driverAgeCoefficient *
      carProductionYearCoefficient *
      (pollutionNormCoefficients[formData['NormaDePoluare']] || 1) *
      cylinderCapacityCoefficient *
      (insurancePeriodCoefficients[formData['PerioadaDeAsigurare']] || 1);

    // Actualizează starea cu prețul calculat
    setFormData((currentFormData) => ({
      ...currentFormData,
      PretAsigurare: price,
    }));
    setEstimatedPrice(`Preț estimat: ${price.toFixed(2)} RON`);
    setOpen(true); // Afișează popover-ul cu prețul estimat
  };

  const isActiveButton = (type: string) => formData.TipAsigurare === type;

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
        <h2 className="text-xl font-semibold mb-4 mt-8 text-center">
          Informații Sofer
        </h2>

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
                  type={field === 'DataNasterii' ? 'date' : 'text'}
                  name={field}
                  id={field}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={field !== 'DataNasterii' ? field : ''}
                />
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-xl text-center font-semibold mb-4 mt-8">
          Informații Mașină
        </h2>

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
                    {options[field].map((option) => (
                      <option key={String(option)} value={String(option)}>
                        {option}
                      </option>
                    ))}
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
          onConfirm={() => console.log('Confirmare!')}
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit} // Pasăm funcția de submit ca prop
          estimatedPrice={estimatedPrice} // Pasăm prețul estimat pentru a-l afișa în popover
        />
      </div>
    </div>
  );
};

export default Details;
