"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, ChevronUp, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const subjects = [
    { id: "matematica", name: "Matemática" },
    { id: "portugues", name: "Português" },
    { id: "historia", name: "História" },
    { id: "geografia", name: "Geografia" },
    { id: "biologia", name: "Biologia" },
    { id: "quimica", name: "Química" },
    { id: "fisica", name: "Física" },
    { id: "literatura", name: "Literatura Brasileira" },
    { id: "pdl", name: "PDL" },
    { id: "ingles", name: "Inglês" },
    { id: "espanhol", name: "Espanhol" },
]

export function CreateGroupDialog() {
    const [open, setOpen] = useState(false)
    const [groupName, setGroupName] = useState("")
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
    const [questionsPerSubject, setQuestionsPerSubject] = useState<Record<string, number>>(
        Object.fromEntries(subjects.map(subject => [subject.id, 30]))
    )
    const [defaultQuestions, setDefaultQuestions] = useState(30)
    const [activeTab, setActiveTab] = useState("default")
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [startYear, setStartYear] = useState<number | null>(null)
    const [endYear, setEndYear] = useState<number>(new Date().getFullYear())
    const [isStartYearEnabled, setIsStartYearEnabled] = useState(false)

    useEffect(() => {
        const total = activeTab === "default"
            ? selectedSubjects.length * defaultQuestions
            : Object.entries(questionsPerSubject)
                .filter(([id]) => selectedSubjects.includes(id))
                .reduce((sum, [, count]) => sum + count, 0)
        setTotalQuestions(total)
    }, [selectedSubjects, questionsPerSubject, defaultQuestions, activeTab])

    const handleSubjectToggle = (subjectId: string, isChecked: boolean) => {
        setSelectedSubjects(prev =>
            isChecked
                ? [...prev, subjectId]
                : prev.filter(id => id !== subjectId)
        )
    }

    const handleQuestionsChange = (subjectId: string, value: number) => {
        setQuestionsPerSubject(prev => ({ ...prev, [subjectId]: Math.max(0, value) }))
    }

    const handleDefaultQuestionsChange = (value: number) => {
        const newValue = Math.max(0, value)
        setDefaultQuestions(newValue)
        setQuestionsPerSubject(prev => {
            const newState = { ...prev }
            selectedSubjects.forEach(id => {
                newState[id] = newValue
            })
            return newState
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const selectedQuestionsPerSubject = Object.fromEntries(
            Object.entries(questionsPerSubject).filter(([id]) => selectedSubjects.includes(id))
        )
        console.log({
            groupName,
            selectedQuestionsPerSubject,
            totalQuestions,
            dateRange: {
                start: isStartYearEnabled ? startYear : null,
                end: endYear
            }
        })
        setOpen(false)
        // Reset the form
        setGroupName("")
        setSelectedSubjects([])
        setQuestionsPerSubject(Object.fromEntries(subjects.map(subject => [subject.id, 30])))
        setDefaultQuestions(30)
        setActiveTab("default")
        setStartYear(null)
        setEndYear(new Date().getFullYear())
        setIsStartYearEnabled(false)
    }

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear()
        const years = []
        for (let year = currentYear; year >= 1990; year--) {
            years.push(year)
        }
        return years
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Criar Grupo</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col p-0 rounded-xl">
                <DialogHeader className="px-6 py-4 border-b shrink-0">
                    <DialogTitle className="text-xl font-bold">Criar Novo Grupo de Questões</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                    <div className="space-y-4 px-6 py-4 flex-shrink-0">
                        <div>
                            <Label htmlFor="group-name" className="text-sm font-medium">Nome do Grupo</Label>
                            <Input
                                id="group-name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder="Digite o nome do grupo"
                                required
                                className="w-full"
                            />
                        </div>
                    </div>
                    <ScrollArea className="flex-grow px-6">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="subjects">
                                <AccordionTrigger>Selecione as Matérias</AccordionTrigger>
                                <AccordionContent>
                                    <Card>
                                        <CardContent className="pt-4">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                {subjects.map((subject) => (
                                                    <div key={subject.id} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={subject.id}
                                                            checked={selectedSubjects.includes(subject.id)}
                                                            onCheckedChange={(checked) => handleSubjectToggle(subject.id, checked as boolean)}
                                                        />
                                                        <Label htmlFor={subject.id}>{subject.name}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="questions">
                                <AccordionTrigger>Quantidade de Questões</AccordionTrigger>
                                <AccordionContent>
                                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="default" className="text-xs">Padrão</TabsTrigger>
                                            <TabsTrigger value="custom" className="text-xs">Personalizado</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="default">
                                            <Card>
                                                <CardContent className="p-3">
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="default-questions" className="text-sm font-medium">
                                                            Questões por matéria
                                                        </Label>
                                                        <div className="flex items-center space-x-2">
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() => handleDefaultQuestionsChange(defaultQuestions - 1)}
                                                                className="h-6 w-6"
                                                            >
                                                                <ChevronDown className="h-3 w-3" />
                                                            </Button>
                                                            <Input
                                                                type="number"
                                                                value={defaultQuestions}
                                                                onChange={(e) => handleDefaultQuestionsChange(Number(e.target.value))}
                                                                className="h-6 w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                min="0"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() => handleDefaultQuestionsChange(defaultQuestions + 1)}
                                                                className="h-6 w-6"
                                                            >
                                                                <ChevronUp className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                        <TabsContent value="custom">
                                            <Card>
                                                <CardContent className="p-2">
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                        {subjects.filter(subject => selectedSubjects.includes(subject.id)).map((subject) => (
                                                            <div key={subject.id} className="flex flex-col items-center justify-end text-center gap-y-1 ">
                                                                <Label htmlFor={`questions-${subject.id}`} className="text-sm font-medium ">
                                                                    {subject.name}
                                                                </Label>
                                                                <div className="flex items-center space-x-2">
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="icon"
                                                                        onClick={() => handleQuestionsChange(subject.id, questionsPerSubject[subject.id] - 1)}
                                                                        className="h-8 w-8"
                                                                        aria-label="Diminuir"
                                                                    >
                                                                        <ChevronDown className="h-4 w-4" />
                                                                    </Button>
                                                                    <Input
                                                                        type="number"
                                                                        id={`questions-${subject.id}`}
                                                                        value={questionsPerSubject[subject.id]}
                                                                        onChange={(e) => handleQuestionsChange(subject.id, Number(e.target.value))}
                                                                        className="h-8 w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                        min="0"
                                                                        aria-label={`Número de questões para ${subject.name}`}
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="icon"
                                                                        onClick={() => handleQuestionsChange(subject.id, questionsPerSubject[subject.id] + 1)}
                                                                        className="h-8 w-8"
                                                                        aria-label="Aumentar"
                                                                    >
                                                                        <ChevronUp className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                    </Tabs>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="dateRange">
                                <AccordionTrigger>Intervalo de Anos</AccordionTrigger>
                                <AccordionContent>
                                    <Card>
                                        <CardContent className="pt-4">
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="enable-start-year"
                                                        checked={isStartYearEnabled}
                                                        onCheckedChange={(checked) => setIsStartYearEnabled(checked as boolean)}
                                                    />
                                                    <Label htmlFor="enable-start-year">Definir ano inicial</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Label htmlFor="start-year">Ano Inicial</Label>
                                                    <Select
                                                        value={startYear?.toString() || ""}
                                                        onValueChange={(value: any) => setStartYear(Number(value))}
                                                        disabled={!isStartYearEnabled}
                                                    >
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Selecione o ano inicial" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {generateYearOptions().map((year) => (
                                                                <SelectItem key={year} value={year.toString()}>
                                                                    {year}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Label htmlFor="end-year">Ano Final</Label>
                                                    <Select
                                                        value={endYear.toString()}
                                                        onValueChange={(value: any) => setEndYear(Number(value))}
                                                    >
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Selecione o ano final" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {generateYearOptions().map((year) => (
                                                                <SelectItem key={year} value={year.toString()}>
                                                                    {year}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </ScrollArea>
                    <div className="flex-shrink-0 px-6 py-4 border-t">
                        <div className="flex items-center justify-between bg-secondary p-2 rounded-lg mb-4">
                            <span className="text-sm font-medium">Total de Questões:</span>
                            <span className="text-lg font-bold">{totalQuestions}</span>
                        </div>
                        <Button type="submit" className="w-full text-sm">Criar Grupo</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}