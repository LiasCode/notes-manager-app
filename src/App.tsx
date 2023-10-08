import { useCallback, useState } from "react";
import { NoteCanvas } from "./components/NoteCanvas";
import { SideBar } from "./components/SideBar";
import { TasksCanvas } from "./components/TaskCanvas";

export type BarAction = {
  name: string;
  active: boolean;
};

const actionsForBar: BarAction[] = [
  {
    active: false,
    name: "T",
  },
  {
    active: true,
    name: "N",
  },
];

export const App = () => {
  const [barActionsActive, setBarActionsActive] =
    useState<BarAction[]>(actionsForBar);

  const toogleBarAction = useCallback(
    (action: BarAction) => {
      setBarActionsActive((prevBarActions) => {
        const newBarActions = prevBarActions.map((barAction) => {
          if (barAction.name === action.name) {
            return {
              ...barAction,
              active: true,
            };
          }
          return {
            ...barAction,
            active: false,
          };
        });
        return newBarActions;
      });
    },
    [setBarActionsActive]
  );

  return (
    <div className="flex flex-col relative w-full h-full pl-[60px]">
      <SideBar
        barActionsActive={barActionsActive}
        toogleBarAction={toogleBarAction}
      />
      {barActionsActive[0].active === true && <TasksCanvas />}
      {barActionsActive[1].active === true && <NoteCanvas />}
    </div>
  );
};
