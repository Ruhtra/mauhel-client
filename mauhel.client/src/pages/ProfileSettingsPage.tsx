import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UserProfile {
  name: string
  email: string
  phone: string
  birthDate: string
  avatarUrl: string
}

export function ProfileSettingsPage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'João Silva',
    email: 'j.silva@exemplo.com',
    phone: '(11) 98765-4321',
    birthDate: '1990-01-01',
    avatarUrl: 'https://github.com/shadcn.png'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar as alterações do perfil
    console.log('Perfil atualizado:', profile)
  }

  return (
    <div className="container mx-auto h-full max-w-2xl overflow-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Configurações do Perfil</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button type="button">Alterar foto</Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate">Data de Nascimento</Label>
          <Input
            id="birthDate"
            name="birthDate"
            type="date"
            value={profile.birthDate}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit">Salvar Alterações</Button>
      </form>
    </div>
  )
}
