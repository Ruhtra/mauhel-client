'use client'

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
        className="w-full max-w-md px-4 sm:px-0"
      >
        <div className="bg-login-card overflow-hidden rounded-lg shadow-xl backdrop-blur-md">
          <div className="p-4 sm:p-8">
            <h2 className="mb-4 sm:mb-6 text-center text-2xl sm:text-3xl font-bold">
              Bem-vindo ao Mauhel
            </h2>
            <form className="space-y-4 sm:space-y-6" onSubmit={simuleLogin}>
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    className="text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full text-sm sm:text-base">
                Entrar
              </Button>
            </form>
            <div className="mt-4 sm:mt-6 text-center">
              <a href="#" className="text-primary text-xs sm:text-sm hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </div>
          <div className="bg-muted/50 px-4 sm:px-8 py-4 sm:py-6 text-center backdrop-blur-sm">
            <p className="text-muted-foreground text-xs sm:text-sm">
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