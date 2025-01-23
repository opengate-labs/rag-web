import ApartmentSearch from '@/app/search/components/apartment-search';

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center my-8">
        Find Your Perfect Apartment
      </h1>
      <ApartmentSearch />
    </main>
  );
}
