import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  BoltIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Proces Simplificat de Solicitare',
    description:
      'Platforma noastră folosește tehnologie de ultimă oră pentru a oferi un proces simplificat și intuitiv de solicitare a asigurărilor. Clientii pot completa rapid și ușor formularele online, economisind timp prețios.',
    icon: BoltIcon,
  },
  {
    name: 'Personalizare și Flexibilitate ',
    description:
      'Înțelegem că nevoile de asigurare variază de la o persoană la alta. Platforma noastră permite utilizatorilor să personalizeze acoperirea asigurărilor în funcție de nevoile lor specifice, asigurând că primesc exact nivelul de protecție dorit.',
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: 'Suport Excepțional pentru Clienți',
    description:
      'Ne mândrim cu o echipă dedicată de suport pentru clienți, gata să ajute cu orice întrebări sau probleme. Indiferent dacă clienții au nevoie de ajutor în procesul de solicitare, echipa noastră oferă răspunsuri prompte și eficiente, asigurând o experiență fără griji',
    icon: AcademicCapIcon,
  },
  {
    name: 'Securitate și Încredere',
    description:
      'Securitatea datelor este o prioritate absolută pentru noi. Platforma noastră utilizează cele mai avansate tehnologii de securitate pentru a proteja informațiile personale și financiare ale clienților.',
    icon: LockClosedIcon,
  },
];

export default function FeatureSection() {
  return (
    <div className="bg-white py-2 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            De ce sa ne alegi pe noi?
          </h2>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
