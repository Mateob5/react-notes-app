import React, { useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
// import dummyNotes from '../dummy_notes';
import { Link } from 'react-router-dom';
import NoteItem from '../components/NoteItem';
import { useState } from 'react';

export default function Notes({notes}) {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearch = () => {
    setFilteredNotes(notes.filter(note => {
      if(note.title.toLowerCase().match(text.toLocaleLowerCase())) {
        return note;
      }
    }))
  }

  useEffect(handleSearch, [text]);

  return (
    <section>
      <header className="notes__header">
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && <input type="text" value={text} onChange={(e) => {setText(e.target.value); handleSearch();}} autoFocus placeholder='Keyword...' /> }
        <button className='btn' onClick={() => setShowSearch(prevState => !prevState)}>{showSearch ? <IoCloseSharp /> : <FaSearch />}</button>
      </header>
      <div className="notes__container">
        {filteredNotes.length == 0 && <p className='empty__notes'>Note notes found.</p>}
        { 
          filteredNotes.map(note => <NoteItem key={note.id} note={note}/>)
        }
      </div>
      <Link to="/create-note" className='btn add__btn'><FaPlus /></Link>
    </section>
  )
}
