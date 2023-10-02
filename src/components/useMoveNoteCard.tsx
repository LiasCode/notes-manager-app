import { useEffect } from "react";
import { Note } from "./Canvas";

export const useMoveNoteCard = (props: {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) => {
  const handlerNoteMove = (e: MouseEvent) => {
    const activeNoteCard = document.querySelector(
      ".--movement-active--"
    ) as HTMLDivElement;
    if (!activeNoteCard) return;

    const newOffsetY = e.clientY - 5;
    const newOffsetX = e.clientX - 70;

    props.setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === activeNoteCard.dataset.noteid) {
          note.offsetTop = newOffsetY;
          note.offsetLeft = newOffsetX;
        }
        return note;
      });
    });

    activeNoteCard.style.top = `${newOffsetY}px`;
    activeNoteCard.style.left = `${newOffsetX}px`;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handlerNoteMove);

    return () => {
      document.removeEventListener("mousemove", handlerNoteMove);
    };
  }, []);
};
