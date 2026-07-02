import { Menu, Search } from 'lucide-react'
import SearchBar from './SearchBar.jsx'
import NotificationDropdown from './NotificationDropdown.jsx'
import WorkspaceSwitcher from './WorkspaceSwitcher.jsx'
import ProfileMenu from './ProfileMenu.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'

export default function Header({ onOpenMobileSidebar }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-surface/80 backdrop-blur-md border-b border-subtle flex items-center justify-between px-4 lg:px-6 gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-secondary hover:bg-surface-2 btn-interactive"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <SearchBar />
        <button className="md:hidden p-2 rounded-xl text-secondary hover:bg-surface-2 btn-interactive" aria-label="Search">
          <Search size={18} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <WorkspaceSwitcher />
        <ThemeToggle />
        <NotificationDropdown />
        <ProfileMenu />
      </div>
    </header>
  )
}
