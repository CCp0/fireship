import { useEffect, useState } from 'react';

function App() {
  const { search, companies } = CompanySearch();

  return (
    <main>
      <h1>Corporation Search</h1>

      <input
        type="text"
        placeholder="Search Company..."
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {companies.map((company) => (
          <Company key={company.id} {...company} />
        ))}

        {companies.length === 0 && 'No companies found'}
      </ul>
    </main>
  );
}

// Dumb UI component
function Company({ name, ceo, age }) {
  return (
    <li>
      <strong>{name}</strong> || CEO: {ceo} ({age} years old)
    </li>
  );
}

// Custom Hook
function CompanySearch() {
  const [companies, setCompanies] = useState([]);
  //Stores the last value put into the form
  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    );
    const data = await response.json();
    setCompanies(data);

    localStorage.setItem('lastQuery', q);
  };

  return { search, companies };
}

export default App;