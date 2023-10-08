import { useCallback, useEffect, useState } from "react";
import { NoteCard } from "./NoteCard";

export type Note = {
  id: string;
  title: string;
  content: string;
  offsetLeft: number;
  offsetTop: number;
};

export const NoteCanvas = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  function createNewNote() {
    setNotes(() => {
      const newNotes = [
        ...notes,
        {
          id: Math.random().toString(),
          content: "content",
          title: "title",
          offsetTop: window.innerHeight / 2 - 200,
          offsetLeft: window.innerWidth / 2 - 200,
        },
      ];
      saveNotes(newNotes);
      return newNotes;
    });
  }

  function updateNote(newNote: Note) {
    setNotes(() => {
      const newNotes = notes.map((note) => {
        if (note.id === newNote.id) {
          return {
            ...newNote,
          };
        }
        return note;
      });
      saveNotes(newNotes);
      return newNotes;
    });
  }

  function removeNote(id: string) {
    setNotes((prevNotes) => {
      const newNotes = prevNotes.filter((note) => note.id !== id);
      saveNotes(newNotes);
      return newNotes;
    });
  }

  function saveNotes(notes: Note[]) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  /// <--- Note Card Movement
  const handlerNoteMove = useCallback((e: MouseEvent) => {
    const activeNoteCard = document.querySelector<HTMLDivElement>(
      ".--movement-active--"
    );
    if (!activeNoteCard) return;

    const newOffsetY = e.clientY - 5;
    const newOffsetX = e.clientX - 7;

    activeNoteCard.style.top = `${newOffsetY}px`;
    activeNoteCard.style.left = `${newOffsetX}px`;

    if (!activeNoteCard.dataset.noteid) throw new Error("Notes Id not found");

    setNotes((prevNotes) => {
      const updatedNewNotes = prevNotes.map((note) => {
        if (note.id === activeNoteCard.dataset.noteid) {
          return {
            ...note,
            offsetTop: newOffsetY,
            offsetLeft: newOffsetX,
          };
        }
        return note;
      });
      saveNotes(updatedNewNotes);
      return updatedNewNotes;
    });
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handlerNoteMove);

    return () => {
      document.removeEventListener("mousemove", handlerNoteMove);
    };
  }, [handlerNoteMove]);
  /// <--- Note Card Movement

  /// load saved notes
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.clear();
      console.log({ notes });
    }
  }, [notes]);

  return (
    <div className="w-full min-h-screen flex relative justify-center items-start overflow-hidden">
      <button
        onClick={createNewNote}
        className="
        shadow-md shadow-red-200 mt-1 mr-[8%]
        cursor-pointer rounded-md w-max h-max hover:shadow-red-300
        outline outline-2 outline-red-200 p-2 flex relative justify-center items-center"
      >
        Create new
        <span className="ml-2 font-bold capitalize text-red-400 italic">
          note
        </span>
      </button>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          noteInfo={note}
          removeNote={removeNote}
          updateNote={updateNote}
        />
      ))}
    </div>
  );
};
