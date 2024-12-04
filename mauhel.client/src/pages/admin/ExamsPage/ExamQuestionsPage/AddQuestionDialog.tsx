import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
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
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Combobox } from '@/components/combobox'

const formSchema = z.object({
  statement: z.string().min(1, 'A declaração é obrigatória'),
  discipline: z.string().min(1, 'A disciplina é obrigatória'),
  alternatives: z
    .array(
      z.object({
        content: z.string().min(1, 'O conteúdo da alternativa é obrigatório'),
        isCorrect: z.boolean()
      })
    )
    .min(2, 'Adicione pelo menos duas alternativas')
})

const disciplines = [
  'Matemática',
  'Português',
  'História',
  'Geografia',
  'Física',
  'Química',
  'Biologia',
  'Inglês'
]

interface AddQuestionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddQuestion: (question: any) => void
}

export function AddQuestionDialog({
  open,
  onOpenChange,
  onAddQuestion
}: AddQuestionDialogProps) {
  const [alternatives, setAlternatives] = useState([
    { content: '', isCorrect: false }
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      statement: '',
      discipline: '',
      alternatives: [{ content: '', isCorrect: false }]
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddQuestion({
      id: Math.random().toString(36).substr(2, 9),
      ...values,
      alternatives: values.alternatives.map((alt, index) => ({
        id: String.fromCharCode(97 + index),
        ...alt
      }))
    })
    onOpenChange(false)
    form.reset()
    setAlternatives([{ content: '', isCorrect: false }])
  }

  const addAlternative = () => {
    setAlternatives([...alternatives, { content: '', isCorrect: false }])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Questão</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="statement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enunciado</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discipline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disciplina</FormLabel>
                  <FormControl>
                    <Combobox
                      options={disciplines}
                      onSetValue={field.onChange}
                      value={field.value}
                      placeholder="Selecione a disciplina"
                      emptyMessage="Nenhuma disciplina encontrada."
                      searchPlaceholder="Procurar disciplina..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {alternatives.map((_alt, index) => (
              <div key={index} className="space-y-2">
                <FormField
                  control={form.control}
                  name={`alternatives.${index}.content`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Alternativa {String.fromCharCode(97 + index)}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`alternatives.${index}.isCorrect`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Alternativa correta</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addAlternative}>
              Adicionar Alternativa
            </Button>
            <Button type="submit">Adicionar Questão</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
