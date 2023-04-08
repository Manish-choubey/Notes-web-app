import React from "react";
import NotesIcon from '@mui/icons-material/Notes';


function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <a href="/" className="navbar-brand"> <h1>
        <NotesIcon  /> Notes
       </h1></a>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auhref">  
        </ul>
        </div>
      </nav>
    
  );
}

export default Header;