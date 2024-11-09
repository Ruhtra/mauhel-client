"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Check, ChevronUp, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const subjects = [
    { id: "matematica", name: "Matemática" },
    { id: "portugues", name: "Português" },
    { id: "historia", name: "História" },
    { id: 'educacao_fisica', name: 'Educação física artesanal' },
    { id: "geografia", name: "Geografia" },
    { id: "biologia", name: "Biologia" },
    { id: "quimica", name: "Química" },
    { id: "fisica", name: "Física" },
]

export function CreateGroupDialog() {
    const [open, setOpen] = useState(false)
    const [groupName, setGroupName] = useState("")
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>(subjects.map(s => s.id))
    const [questionsPerSubject, setQuestionsPerSubject] = useState<Record<string, number>>(
        Object.fromEntries(subjects.map(subject => [subject.id, 30]))
    )
    const [defaultQuestions, setDefaultQuestions] = useState(30)
    const [activeTab, setActiveTab] = useState("default")
    const [totalQuestions, setTotalQuestions] = useState(0)

    useEffect(() => {
        const total = activeTab === "default"
            ? selectedSubjects.length * defaultQuestions
            : Object.entries(questionsPerSubject)
                .filter(([id]) => selectedSubjects.includes(id))
                .reduce((sum, [, count]) => sum + count, 0)
        setTotalQuestions(total)
    }, [selectedSubjects, questionsPerSubject, defaultQuestions, activeTab])

    const handleSubjectToggle = (e: React.MouseEvent, subjectId: string) => {
        e.preventDefault();
        setSelectedSubjects(prev =>
            prev.includes(subjectId)
                ? prev.filter(id => id !== subjectId)
                : [...prev, subjectId]
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
        })
        setOpen(false)
        // Reset the form
        setGroupName("")
        setSelectedSubjects(subjects.map(s => s.id))
        setQuestionsPerSubject(Object.fromEntries(subjects.map(subject => [subject.id, 30])))
        setDefaultQuestions(30)
        setActiveTab("default")
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Criar Grupo</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90vw] max-h-[90vh] flex flex-col">
                <ScrollArea>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Criar Novo Grupo de Questões</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 pr-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
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
                            <Card>
                                <CardContent className="pt-4">
                                    <Label className="text-sm font-medium mb-2 block">Selecione as Matérias</Label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {subjects.map((subject) => (
                                            <Button
                                                key={subject.id}
                                                variant={selectedSubjects.includes(subject.id) ? "default" : "outline"}
                                                className="justify-start h-8 text-xs"
                                                onClick={(e) => handleSubjectToggle(e, subject.id)}
                                            >
                                                {selectedSubjects.includes(subject.id) && (
                                                    <Check className="mr-1 h-3 w-3" />
                                                )}
                                                {subject.name}
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="default" className="text-xs">Padrão</TabsTrigger>
                                    <TabsTrigger value="custom" className="text-xs">Personalizado</TabsTrigger>
                                </TabsList>
                                <TabsContent value="default">
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between ">
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
                                        <CardContent className="pt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                {subjects.filter(subject => selectedSubjects.includes(subject.id)).map((subject) => (
                                                    <div key={subject.id} className="flex items-center justify-between">
                                                        <Label htmlFor={`questions-${subject.id}`} className="text-xs font-medium">
                                                            {subject.name}
                                                        </Label>
                                                        <div className="flex items-center space-x-1">
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() => handleQuestionsChange(subject.id, questionsPerSubject[subject.id] - 1)}
                                                                className="h-6 w-6"
                                                            >
                                                                <ChevronDown className="h-3 w-3" />
                                                            </Button>
                                                            <Input
                                                                type="number"
                                                                value={questionsPerSubject[subject.id]}
                                                                onChange={(e) => handleQuestionsChange(subject.id, Number(e.target.value))}
                                                                className="h-6 w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                min="0"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() => handleQuestionsChange(subject.id, questionsPerSubject[subject.id] + 1)}
                                                                className="h-6 w-6"
                                                            >
                                                                <ChevronUp className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                            <div className="flex items-center justify-between bg-secondary p-3 rounded-lg">
                                <span className="text-sm font-medium">Total de Questões:</span>
                                <span className="text-lg font-bold">{totalQuestions}</span>
                            </div>
                        </form>
                    </div>
                    <Button type="submit" className="w-full text-sm mt-4" onClick={handleSubmit}>Criar Grupo</Button>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}