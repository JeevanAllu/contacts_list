import React from 'react';
import ContactCard from './ContactCard';


export default function ContactsGrid({ contacts }) {
    return (
        <section className="contacts-grid" aria-live="polite">
            {contacts.map((c) => (
        <ContactCard key={c.id} contact={c} />
        ))}
        </section>
);
}