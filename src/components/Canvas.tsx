import { useEffect, useState } from "react";
import { NoteCard } from "./NoteCard";
import { useMoveNoteCard } from "./useMoveNoteCard";

export type Note = {
  id: string;
  title: string;
  content: string;
  offsetLeft: number;
  offsetTop: number;
};

export const Canvas = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  function createNewNote() {
    setNotes([
      ...notes,
      {
        id: Math.random().toString(),
        content: "content",
        title: "title",
        offsetTop: 0,
        offsetLeft: 0,
      },
    ]);
  }

  useMoveNoteCard({ setNotes });

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <div className="w-full min-h-screen border-2 border-red-200 flex relative justify-center items-start">
      <button
        onClick={createNewNote}
        className="cursor-pointer rounded-md w-max h-max border-2 border-red-200 p-2 flex relative justify-center items-center"
      >
        Create new note
      </button>
      {notes.map((note) => (
        <NoteCard key={note.id} noteInfo={note} />
      ))}
    </div>
  );
};
