import { useState } from "react";
import MoveIcon from "../assets/move-icon.png";
import { Note } from "./NoteCanvas";

export const NoteCard = ({
  noteInfo,
  removeNote,
  updateNote,
}: {
  noteInfo: Note;
  removeNote: (id: string) => void;
  updateNote: (note: Note) => void;
}) => {
  const [isMoveActive, setIsMoveActive] = useState(false);

  const toggleIsMoveActive = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMoveActive(!isMoveActive);
  };

  return (
    <div
      data-noteid={noteInfo.id}
      data-content={noteInfo.content}
      data-title={noteInfo.title}
      style={{
        top: noteInfo.offsetTop,
        left: noteInfo.offsetLeft,
        zIndex: isMoveActive ? 100 : 1,
      }}
      className={`${
        isMoveActive ? "--movement-active-- " : ""
      } top-0 shadow-md shadow-red-100
        active:cursor-move bg-red-50 left-0 rounded-md p-2 flex flex-col border border-red-200
        min-w-64 w-max min-h-64 h-max fixed z-50`}
    >
      <div
        onMouseDown={toggleIsMoveActive}
        onMouseUp={toggleIsMoveActive}
        className="absolute top-0 left-0 w-4 h-4 flex flex-row items-center justify-center"
      >
        <img
          src={MoveIcon}
          alt="menu icon"
          draggable="false"
          className="w-full h-full object-contain object-center"
        />
      </div>

      <label className="w-max h-6 flex flex-row items-center justify-center border-b-2 border-red-200">
        <input
          className="w-max h-full text-center flex flex-row items-center justify-center bg-transparent outline-none border-none"
          value={noteInfo.title}
          onChange={(e) =>
            updateNote({
              ...noteInfo,
              id: noteInfo.id,
              title: e.target.value,
            })
          }
        />
      </label>

      <textarea
        className="w-full h-56 mt-2 bg-transparent outline-none border-none"
        value={noteInfo.content}
        onChange={(e) =>
          updateNote({
            ...noteInfo,
            id: noteInfo.id,
            content: e.target.value,
          })
        }
      />

      <button
        className="border-2 px-2 rounded-md w-max self-center h-max border-solid border-red-300 bg-transparent outline-none cursor-pointer"
        onClick={() => removeNote(noteInfo.id)}
      >
        Remove
      </button>
    </div>
  );
};
