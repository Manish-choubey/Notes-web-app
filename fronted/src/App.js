import React, { useState,useEffect } from "react";
import Header from "../src/Components/Header";
import Footer from "../src/Components/Footer";
import Note from "../src/Components/Note";
import CreateArea from "./Components/CreateNote";
import axios from "axios";
const url = window.location.href;




function App() {
  const [listNotes, setNotes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/list")
    .then (res => {
      setNotes(res.data);

    },[])
    .catch(err => console.log(err)
    )
});


  function addNote(note) {
    setNotes((prevValue) => [...prevValue, note]);
    axios.post("http://localhost:5000/create", note)
    .catch((err)=> console.log(err));
    
  }
  
  function deleteNote(id) {
    const updatedList = listNotes.filter((note, index) => index !== id);
    setNotes(updatedList);
    axios.delete(`http://localhost:5000/delete/${id}`, {idNote: id})
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {listNotes.map((note, index) => (
        <Note 
          key={index}
          id={note._id}
          title={note.title}
          content={note.content}
          createdAt={note.createdAt}
          deleteNote={deleteNote}
        />
      ))}
      <Footer />
      
    </div>

  );
}

export default App;