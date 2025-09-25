import React, { useEffect, useState } from 'react';
import ContactsGrid from './components/ContactsGrid';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';


export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const controller = new AbortController();
    const fetchContacts = async () => {
      try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      signal: controller.signal,
      });

      if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setContacts(data);
      } 
      catch (e) {
        if (e.name === 'AbortError') return; // fetch aborted
        console.error('Could not fetch contacts:', e);
        setError('Failed to load contacts. Please check your internet connection and try again.');
      } 
      finally {
        setLoading(false);
      }
    };

    fetchContacts();
    return () => controller.abort();
  },[]);


  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;


  return (
    <div className="app-container">
      <main className="main-content">
        <header className="header">
          <h1 className="title">My Contacts</h1>
          <p className="subtitle">A responsive list of my favorite people.</p>
        </header>
        <ContactsGrid contacts={contacts} />
      </main>
    </div>
  );
}
