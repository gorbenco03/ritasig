import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CogIcon,
  DocumentChartBarIcon,
  HomeIcon,
  ScaleIcon,
  XMarkIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline';

interface Insurance {
  _id: string; // Presupunând că mongoose adaugă automat un _id fiecărui document
  Nume: string;
  Prenume: string;
  CNP: number;
  DataNasterii: Date;
  PermisDeConducere: string;
  Email: string;
  NrDeTelefon: string;
  CategorieBonus: number;
  CategoriaMasinii: string;
  NumarulWIN: string;
  AnProductie: number;
  CapacitateCilindrica: number;
  NrInmatriculare: string;
  NrCertificatInmatriculare: string;
  NormaDePoluare: string;
  TipCombustibil: string;
  PerioadaDeAsigurare: string;
  TipAsigurare: string;
  PretAsigurare: number;
  StatusAsigurare: string;
}

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Reports', href: '#', icon: DocumentChartBarIcon, current: false },
];

const secondaryNavigation = [{ name: 'Settings', href: '#', icon: CogIcon }];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recentActivities, setRecentActivities] = useState<Insurance[]>([]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/insurances');
        const data = await response.json();

        const updatedData = data
          .slice()
          .map((activity: { DataSolicitarii: string | number | Date }) => ({
            ...activity,
            DataSolicitarii: new Date(activity.DataSolicitarii),
          }));
        setRecentActivities(updatedData);
        const totalSum = updatedData.reduce(
          (acc: any, curr: { PretAsigurare: any }) => acc + curr.PretAsigurare,
          0
        );
        setTotalSum(totalSum); // Asigură-te că ai acest state definit în componentă
      } catch (error) {
        console.error('Failed to fetch insurances:', error);
      }
    };

    fetchInsurances();
  }, []);

  const pendingInsurancesCount = recentActivities.filter(
    (activity) =>
      activity.StatusAsigurare !== 'Acceptat' &&
      activity.StatusAsigurare !== 'Respins'
  ).length;

  const cards = [
    {
      name: 'Account balance',
      href: '#',
      icon: ScaleIcon,
      amount: `${totalSum.toFixed(2)} RON`,
    },
    {
      name: 'Asigurari in asteptare',
      href: '#',
      icon: ClockIcon,
      amount: `${pendingInsurancesCount}`, // Utilizează variabila calculată
    },
    {
      name: 'Total asigurari',
      href: '#',
      icon: PaperClipIcon,
      amount: `${recentActivities.length}`,
    },
  ];

  const handleApprove = async (_id: any) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/insurances/${_id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'Acceptat' }),
        }
      );

      if (response.ok) {
        console.log('Approved successfully');
        // Aici poți adăuga logica pentru a actualiza UI-ul sau state-ul după aprobare
      } else {
        console.error('Failed to approve');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReject = async (_id: any) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/insurances/${_id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'Respins' }),
        }
      );

      if (response.ok) {
        console.log('Rejected successfully');
        // Aici poți adăuga logica pentru a actualiza UI-ul sau state-ul după respingere
      } else {
        console.error('Failed to reject');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-cyan-700 pb-4 pt-5">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    {/* <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
                      alt="Easywire logo"
                    /> */}
                  </div>
                  <nav
                    className="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto"
                    aria-label="Sidebar"
                  >
                    <div className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-cyan-800 text-white'
                              : 'text-cyan-100 hover:bg-cyan-600 hover:text-white',
                            'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 pt-6">
                      <div className="space-y-1 px-2">
                        {secondaryNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-cyan-100 hover:bg-cyan-600 hover:text-white"
                          >
                            <item.icon
                              className="mr-4 h-6 w-6 text-cyan-200"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pb-4 pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
                alt="Easywire logo"
              /> */}
            </div>
            <nav
              className="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-cyan-800 text-white'
                        : 'text-cyan-100 hover:bg-cyan-600 hover:text-white',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="space-y-1 px-2">
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white"
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
          </div>
          <main className="flex-1 pb-8">
            {/* Page header */}
            <div className="mt-8">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Overview
                </h2>
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Card */}
                  {cards.map((card) => (
                    <div
                      key={card.name}
                      className="overflow-hidden rounded-lg bg-white shadow"
                    >
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <card.icon
                              className="h-6 w-6 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="truncate text-sm font-medium text-gray-500">
                                {card.name}
                              </dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">
                                  {card.amount}
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <a
                            href={card.href}
                            className="font-medium text-cyan-700 hover:text-cyan-900"
                          >
                            View all
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
                Recent activity
              </h2>
              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <div className="mt-2 flex flex-col">
                    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                              Nume și Prenume
                            </th>
                            <th className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">
                              Tip Asigurare
                            </th>
                            <th className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">
                              Pret Asigurare
                            </th>
                            <th className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">
                              Data solicitarii
                            </th>
                            <th className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">
                              Acțiuni
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {recentActivities.map((activity, index) => (
                            <React.Fragment key={activity._id || index}>
                              <tr>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {activity.Nume} {activity.Prenume}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  {activity.TipAsigurare}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  {activity.PretAsigurare} RON
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  <button
                                    onClick={() =>
                                      setSelectedIndex(
                                        index === selectedIndex ? null : index
                                      )
                                    }
                                    className="inline-flex items-center text-cyan-600 hover:text-cyan-900"
                                  >
                                    {selectedIndex === index ? (
                                      <ChevronUpIcon className="h-5 w-5" />
                                    ) : (
                                      <ChevronDownIcon className="h-5 w-5" />
                                    )}
                                  </button>
                                </td>
                              </tr>
                              {selectedIndex === index && (
                                <tr>
                                  <td
                                    colSpan={5}
                                    className="bg-gray-50 px-6 py-4"
                                  >
                                    <div className="text-sm text-gray-900 font-medium">
                                      Detalii solicitare asigurare:
                                    </div>
                                    <div className="mt-2">
                                      <table className="min-w-full divide-y divide-gray-200">
                                        <tbody className="bg-white divide-y divide-gray-200">
                                          {/* Fiecare rând reprezintă o pereche cheie-valoare din modelul tău */}
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Nume:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.Nume}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Prenume:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.Prenume}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              CNP:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.CNP}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Data Nașterii:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {new Date(
                                                activity.DataNasterii
                                              ).toLocaleDateString()}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Permis De Conducere:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.PermisDeConducere}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Email:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.Email}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Nr De Telefon:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.NrDeTelefon}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Categorie Bonus:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.CategorieBonus}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Categoria masinii:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.CategoriaMasinii}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Serie de șasiu
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.NumarulWIN}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              An productie:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.AnProductie}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Categorie Bonus:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.CategorieBonus}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Capacitate Cilindrica:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.CapacitateCilindrica}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Numar inamtriculare:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {
                                                activity.NrCertificatInmatriculare
                                              }
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Certificat de inmatriculare:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {
                                                activity.NrCertificatInmatriculare
                                              }
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Norma de poluare:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.NormaDePoluare}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Tip Combustibil:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.TipCombustibil}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Perioada de asiguare:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.PerioadaDeAsigurare}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Tip Asigurare:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.TipAsigurare}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Pret Asigurare:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.PretAsigurare}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="px-2 py-2 text-gray-500">
                                              Statut Asigurare:
                                            </td>
                                            <td className="px-2 py-2 text-gray-900">
                                              {activity.StatusAsigurare}
                                            </td>
                                          </tr>
                                          {/* Continuă să adaugi restul detaliilor în acest format */}
                                        </tbody>
                                      </table>
                                      <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                          onClick={() =>
                                            handleApprove(activity._id)
                                          }
                                          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                          Aprobă
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleReject(activity._id)
                                          }
                                          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                          Respinge
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
