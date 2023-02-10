import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";

import { darkTheme, GlobalStyle } from "./GlobalStyle";
import {
  Side,
  Main,
  FullHeightAndWidthCentered,
  LoaderWrapper,
} from "./App.styled";
import { NoteList } from "./NoteList/NoteList.styled";
import LinkToNote from "./LinkToNote";
import Note from "./Note";
import { Loader } from "./Note/Note.styled";
import { CreateLink} from "./Aside/Aside.styled";

function App() {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const response = await fetch("/notes?_sort=id&_order=desc");
    const notes = await response.json();
    setIsLoading(false);
    setNotes(notes);
  };

  const updateNote = (noteToUpdate) => {
    setNotes(
      notes.map((note) => (note.id === noteToUpdate.id ? noteToUpdate : note))
    );
  };

  const delNote = (idToDelete) => {
    setNotes(
      notes.filter(note => note.id !== idToDelete)
    );
  }

  const insertNote = (noteToInsert) => {
    setNotes([noteToInsert, ...notes]);
  }

  const createNote = async () => {
    const response = await fetch(`/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title:"New Note",
        content:"",
      }),
    });
    const note = await response.json();
    if (response.ok) {
      insertNote(note);
      navigate(`/notes/${note.id}`);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Side>
        {isLoading && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
        {notes && (
          <NoteList>
            {notes.map((note) => (
              <li key={note.id}>
                <LinkToNote id={note.id} title={note.title} />
              </li>
            ))}
          </NoteList>
        )}
        <CreateLink onClick={createNote}>
          New Note
        </CreateLink>
      </Side>
      <Main>
        <Routes>
          <Route
            path="/"
            element={
              <FullHeightAndWidthCentered>
                {!isLoading && "Sélectionnez une note pour l'éditer"}
              </FullHeightAndWidthCentered>
            }
          />
          <Route path="/notes/:id" element={<Note onSave={updateNote} onDelete={delNote}/>} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}

export default App;