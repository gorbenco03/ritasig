export default function Details() {
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-center mb-4">
        <span className="inline-flex rounded-md  mb-6 shadow-sm">
          <button
            type="button"
            className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            RCA
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            CASCO
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            CARTE VERDE
          </button>
        </span>
      </div>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            'Nume Prenume',
            'CNP',
            'Data Nasterii',
            'Permis de conducere',
            'Categoria Masinii',
            'Numarul WIN',
            'An Productie',
            'Capacitate Cilindrica',
            'Categorie Bonus',
            'Nr Inmatriculare',
            'Nr Certificat Inmatriculare',
            'Norma de Poluare',
            'Tip Combustibil',
            'Email',
            'Nr de telefon',
            'Perioada de asigurare',
          ].map((field) => {
            // Identificăm dacă câmpul trebuie să fie un select
            const isSelect = [
              'Categoria Masinii',
              'Norma de Poluare',
              'Perioada de asigurare',
              'Tip Combustibil',
              'Categorie Bonus',
            ].includes(field);
            return (
              <div key={field} className="mx-auto max-w-xs">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {field}
                </label>
                <div className="mt-2">
                  {isSelect ? (
                    <select
                      id={field}
                      name={field}
                      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue=""
                    >
                      {/* Exemplu de opțiuni, ajustați în funcție de nevoi */}
                      <option value="" disabled>
                        Selectează opțiunea
                      </option>
                      <option>Opțiunea 1</option>
                      <option>Opțiunea 2</option>
                      <option>Opțiunea 3</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={field}
                      id={field}
                      className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder={field}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Estimeaza pretul
          </button>
        </div>
      </div>
    </div>
  );
}
