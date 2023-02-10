import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Title,
  Content,
  SaveButton,
  SaveAndStatus,
  Loader,
  ErrorMessage,
} from "./Note.styled";
import { FiCheck } from "react-icons/fi";
import { IconAndLabel } from "../IconAndLabel/IconAndLabel.styled";
import { FullHeightAndWidthCentered } from "../App.styled";
import { DeleteNote } from "../Aside/Aside.styled";
import Modal from "../Modal";

const Note = ({ onSave, onDelete }) => {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [getStatus, setGetStatus] = useState("IDLE");
  const [saveStatus, setSaveStatus] = useState("IDLE");
  const timer = useRef(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNote = useCallback(async () => {
    setGetStatus("LOADING");
    const response = await fetch(`/notes/${id}`);
    const note = await response.json();
    if (response.ok) {
      setNote(note);
      setGetStatus("IDLE");
    } else {
      setGetStatus("ERROR");
    }
  }, [id]);

  const saveNote = async () => {
    setSaveStatus("LOADING");
    const response = await fetch(`/notes/${note.id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setSaveStatus("SAVED");
      onSave(note);
    } else {
      setSaveStatus("ERROR");
    }
  };

  const deleteNote = async () => {
    setGetStatus("LOADING");
    const response = await fetch(`/notes/${note.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setGetStatus("IDLE");
      setNote(null);
      navigate(`/`);
      onDelete(note.id)
    } else {
      setGetStatus("ERROR");
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id, fetchNote]);

  useEffect( () => {
    saveAfterDelay();
  }, [note]);

  const saveAfterDelay = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(saveNote, 1000);
  };

  if (getStatus === "LOADING") {
    return (
      <FullHeightAndWidthCentered>
        <Loader />
      </FullHeightAndWidthCentered>
    );
  }

  if (getStatus === "ERROR") {
    return (
      <FullHeightAndWidthCentered>
        <ErrorMessage>404 : la note {id} n'existe pas.</ErrorMessage>
      </FullHeightAndWidthCentered>
    );
  }

  return (
    <>
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        saveNote();
      }}
    >
      <Title
        type="text"
        value={note ? note.title : ""}
        onChange={(event) => {
          setSaveStatus("IDLE");
          setNote({
            ...note,
            title: event.target.value,
          });
        }}
      />
      <Content
        value={note ? note.content : ""}
        onChange={(event) => {
          setSaveStatus("IDLE");
          setNote({
            ...note,
            content: event.target.value,
          });
        }}
      />
      <DeleteNote onClick={() => {setIsModalOpen(true)}} type="button">
        Delete
      </DeleteNote>
      <SaveAndStatus>
        <SaveButton>Enregistrer</SaveButton>
        {saveStatus === "SAVED" ? (
          <IconAndLabel>
            <FiCheck />
            Enregistré
          </IconAndLabel>
        ) : saveStatus === "ERROR" ? (
          <ErrorMessage>Erreur lors de la sauvegarde</ErrorMessage>
        ) : saveStatus === "LOADING" ? (
          <Loader />
        ) : null}
      </SaveAndStatus>
    </Form>
    {isModalOpen &&<Modal
    open = {isModalOpen}
    close={() => setIsModalOpen(false)}
    onSubmit={(event) => {
      event.preventDefault();
      saveNote();
    }}
    onClick={deleteNote}
    >
    </Modal>}</>
  );
};

export default Note;