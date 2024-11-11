'use client'

import { Link, useLocation, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, BookOpen, User, LogOut, Sun, Moon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/ui/theme-provider'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  path: string
}

export function Layout() {
  return (
    <div className="flex h-[100svh] flex-col">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 hidden backdrop-blur md:flex">
        <div className="container mx-auto px-4">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            <Link to="/" className="text-xl sm:text-2xl font-bold">
              Mauhel
            </Link>
            <nav className="flex space-x-1">
              <NavItem
                icon={<Home className="h-3 w-3 sm:h-4 sm:w-4" />}
                label="Início"
                path="/"
              />
              <NavItem
                icon={<BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />}
                label="Questões"
                path="/questions"
              />
              <NavItem
                icon={<User className="h-3 w-3 sm:h-4 sm:w-4" />}
                label="Perfil"
                path="/profile"
              />
            </nav>
            <UserMenu />
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-hidden">
        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </main>
      <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border bottom-0 left-0 right-0 flex-none border-t backdrop-blur md:hidden">
        <div className="flex items-center justify-around px-2">
          <NavItem
            icon={<Home className="h-5 w-5 sm:h-6 sm:w-6" />}
            label="Início"
            path="/"
          />
          <NavItem
            icon={<BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />}
            label="Questões"
            path="/questions"
          />
          <NavItem
            icon={<User className="h-5 w-5 sm:h-6 sm:w-6" />}
            label="Perfil"
            path="/profile"
          />
          <UserMenu />
        </div>
      </nav>
    </div>
  )
}

function NavItem({ icon, label, path }: NavItemProps) {
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <Link
      to={path}
      className="group relative flex flex-col items-center px-2 sm:px-3 py-1 sm:py-2"
    >
      <div
        className={`rounded-full p-1 sm:p-2 transition-colors ${
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground group-hover:text-foreground group-hover:bg-accent'
        }`}
      >
        {icon}
      </div>
      <span className="mt-1 text-[10px] sm:text-xs">{label}</span>
      {isActive && (
        <motion.div
          className="bg-primary absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 rounded-full"
          layoutId="activeTab"
          initial={false}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
        />
      )}
    </Link>
  )
}

function UserMenu() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-accent relative rounded-full p-1 sm:p-2"
        >
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 sm:w-64 p-2" align="end" forceMount>
        <DropdownMenuLabel className="bg-accent mb-2 rounded-lg p-3 sm:p-4 font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-base sm:text-lg font-medium leading-none">João Silva</p>
            <p className="text-muted-foreground text-xs sm:text-sm">j.silva@exemplo.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className="hover:bg-accent cursor-pointer rounded-md p-2">
          <Link to="/profile" className="flex w-full items-center">
            <User className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Perfil</span>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="hover:bg-accent cursor-pointer rounded-md p-2">
          <Link to="/profile/settings" className="flex w-full items-center">
            <Settings className="mr-2 h-3 w-3 sm:h-4  sm:w-4" />
            <span className="text-xs sm:text-sm">Configurações</span>
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem
          className="hover:bg-accent cursor-pointer rounded-md p-2"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? (
            <Moon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <Sun className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          )}
          <span className="text-xs sm:text-sm">Modo {theme === 'light' ? 'escuro' : 'claro'}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:bg-accent cursor-pointer rounded-md p-2 text-red-500 hover:text-red-600">
          <LogOut className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}