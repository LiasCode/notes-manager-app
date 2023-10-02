import { Canvas } from "./components/Canvas"
import { SideBar } from "./components/SideBar"

export const App = () => {
  return (
    <div className="flex flex-col relative w-full h-full pl-[60px]">
      <SideBar />
      <Canvas />
    </div>
  )
}

