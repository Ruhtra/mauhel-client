import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { env } from '@/env'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  console.log(env.VITE_URL_API)

  function simuleLogin() {
    localStorage.setItem(
      'authToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5Mjg4MjAxMjAxIn0.kE_EvS0SdRwarPU5j3Au-NumeV0-pkZOogx8K3cN_fs'
    )
  }

  return (
    <div className="flex h-[100svh] items-center justify-center bg-[url('/abstract-background.jpg')] bg-cover bg-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-login-card overflow-hidden rounded-lg shadow-xl backdrop-blur-md">
          <div className="p-8">
            <h2 className="mb-6 text-center text-3xl font-bold">
              Bem-vindo ao Mauhel
            </h2>
            <form className="space-y-6" onSubmit={simuleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
            <div className="mt-6 text-center">
              <a href="#" className="text-primary text-sm hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </div>
          <div className="bg-muted/50 px-8 py-6 text-center backdrop-blur-sm">
            <p className="text-muted-foreground text-sm">
              Não tem uma conta?{' '}
              <a href="#" className="text-primary font-medium hover:underline">
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
