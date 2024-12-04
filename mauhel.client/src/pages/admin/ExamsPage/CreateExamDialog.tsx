import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Combobox } from '@/components/combobox'

const formSchema = z.object({
  year: z.number().min(1900).max(2100),
  instituto: z.string().min(2, {
    message: 'Instituto deve ter pelo menos 2 caracteres.'
  }),
  banca: z.string().min(2, {
    message: 'Banca deve ter pelo menos 2 caracteres.'
  }),
  position: z.string().min(2, {
    message: 'Cargo deve ter pelo menos 2 caracteres.'
  }),
  level: z.enum(['Fundamental', 'Médio', 'Superior'], {
    required_error: 'Por favor selecione um nível.'
  })
})

const institutos = [
  'Instituto Federal',
  'Universidade Federal',
  'Universidade Estadual',
  'Prefeitura Municipal',
  'Governo do Estado'
]

const bancas = [
  'CESPE',
  'CEBRASPE',
  'FCC',
  'VUNESP',
  'IBFC',
  'IADES',
  'FUNDATEC'
]

interface CreateExamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateExamDialog({
  open,
  onOpenChange
}: CreateExamDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      instituto: '',
      banca: '',
      position: '',
      level: undefined
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Exame</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={e =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nível</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Fundamental">Fundamental</SelectItem>
                        <SelectItem value="Médio">Médio</SelectItem>
                        <SelectItem value="Superior">Superior</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="instituto"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Instituto</FormLabel>
                  <FormControl>
                    <Combobox
                      options={institutos}
                      value={field.value}
                      onSetValue={field.onChange}
                      placeholder="Selecione o instituto"
                      emptyMessage="Nenhum instituto encontrado."
                      searchPlaceholder="Procurar instituto..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="banca"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Banca</FormLabel>
                  <FormControl>
                    <Combobox
                      options={bancas}
                      value={field.value}
                      onSetValue={field.onChange}
                      placeholder="Selecione a banca"
                      emptyMessage="Nenhuma banca encontrada."
                      searchPlaceholder="Procurar banca..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Criar Exame</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
