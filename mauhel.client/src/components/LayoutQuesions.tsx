import { Outlet } from 'react-router-dom'

export function LayoutQuestions() {
  return (
    <div className="flex h-[100svh] flex-col">
      <main className="flex-grow overflow-hidden">
        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
