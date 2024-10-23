import { Link, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  User,
  LogOut,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ui/theme-provider";
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export function Layout() {
  return (
    <div className="flex flex-col h-[100svh]">
      <header className="hidden md:flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold">
              Mauhel
            </Link>
            <nav className="flex space-x-1">
              <NavItem
                icon={<Home className="w-4 h-4" />}
                label="Início"
                path="/"
              />
              <NavItem
                icon={<BookOpen className="w-4 h-4" />}
                label="Questões"
                path="/questions"
              />
              <NavItem
                icon={<User className="w-4 h-4" />}
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
      <nav className="flex-none md:hidden bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
        <div className="flex justify-around items-center px-2">
          <NavItem
            icon={<Home className="w-6 h-6" />}
            label="Início"
            path="/"
          />
          <NavItem
            icon={<BookOpen className="w-6 h-6" />}
            label="Questões"
            path="/questions"
          />
          <NavItem
            icon={<User className="w-6 h-6" />}
            label="Perfil"
            path="/profile"
          />
          <UserMenu />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ icon, label, path }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className="relative flex flex-col items-center group px-3 py-2"
    >
      <div
        className={`p-2 rounded-full transition-colors ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground group-hover:text-foreground group-hover:bg-accent"
        }`}
      >
        {icon}
      </div>
      <span className="text-xs mt-1">{label}</span>
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
          layoutId="activeTab"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </Link>
  );
}

function UserMenu() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative p-2 rounded-full hover:bg-accent"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-4 bg-accent rounded-lg mb-2">
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-medium leading-none">João Silva</p>
            <p className="text-sm text-muted-foreground">j.silva@exemplo.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className="p-2 cursor-pointer hover:bg-accent rounded-md">
          <Link to="/profile" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 cursor-pointer hover:bg-accent rounded-md">
          <Link to="/profile/settings" className="flex items-center w-full">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-2 cursor-pointer hover:bg-accent rounded-md"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="mr-2 h-4 w-4" />
          ) : (
            <Sun className="mr-2 h-4 w-4" />
          )}
          <span>Modo {theme === "light" ? "escuro" : "claro"}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2 cursor-pointer hover:bg-accent rounded-md text-red-500 hover:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
