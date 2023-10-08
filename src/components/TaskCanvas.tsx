export type Task = {
  id: string;
  offsetLeft: number;
  offsetTop: number;
};

export const TasksCanvas = () => {
  return (
    <div className="w-full min-h-screen flex relative justify-center items-start overflow-hidden">
      <button
        onClick={() => {}}
        className="
        shadow-md shadow-red-200 mt-1 mr-[8%]
        cursor-pointer rounded-md w-max h-max hover:shadow-red-300  outline outline-2 outline-red-200 p-2 flex relative justify-center items-center"
      >
        Create new
        <span className="ml-2 font-bold capitalize text-red-400 italic">
          task
        </span>
      </button>
    </div>
  );
};
