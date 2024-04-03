import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface InsurancePopOverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void; // Aceasta poate fi utilizată pentru acțiuni suplimentare la confirmare
  onCancel: () => void;
  onSubmit: () => void; // Funcția care va fi apelată pentru a trimite datele
  estimatedPrice: string; // Prețul estimat pentru a fi afișat
}

const InsurancePopOver: React.FC<InsurancePopOverProps> = ({
  open,
  setOpen,
  onConfirm,
  onCancel,
  onSubmit,
  estimatedPrice,
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const handleConfirm = async () => {
    try {
      await onSubmit(); // Apelăm funcția de trimitere a datelor
      onConfirm(); // Apelăm funcția de confirmare, care poate include închiderea popover-ului sau alte acțiuni
    } catch (error) {
      console.error('A apărut o eroare:', error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        {/* Restul codului pentru pop-over */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* Dialog panel and content */}
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg  py-6 leading-6 font-medium text-gray-900"
                  >
                    {estimatedPrice}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Acesta este pretul aproximativ pentru asigurarea dvs. in
                      functie de tipul asigurarii dorit si de parametri
                      introdusi.
                    </p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 space-x-3 text-right">
                  <p className="text-lg leading-6 font-medium text-gray-900"></p>{' '}
                  {/* Afișează prețul estimat aici */}
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleConfirm}
                  >
                    Solicitare Asigurare
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onCancel}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default InsurancePopOver;
