'use client'

import { useState, useRef, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  ArrowLeft,
  MoreVertical,
  ThumbsUp,
  ChevronUp,
  ChevronDown,
  Send,
  Pencil,
  Trash,
  Flag
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useNavigate } from 'react-router-dom'

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
  }
  content: string
  createdAt: string
  likes: number
  isLiked: boolean
  isOwnComment: boolean
}

const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      name: 'Alice Johnson',
      avatar: 'https://avatars.githubusercontent.com/u/124499?v=1'
    },
    content:
      '<p>Ótima pergunta! Achei realmente <strong>desafiador</strong>.</p>',
    createdAt: '2023-06-01T12:00:00Z',
    likes: 5,
    isLiked: false,
    isOwnComment: false
  },
  {
    id: '2',
    user: {
      name: 'Bob Smith',
      avatar: 'https://avatars.githubusercontent.com/u/123489?v=1'
    },
    content:
      '<p>Acho que a resposta pode estar relacionada ao conceito que aprendemos <em>na semana passada</em>.</p>',
    createdAt: '2023-06-01T13:30:00Z',
    likes: 3,
    isLiked: true,
    isOwnComment: false
  },
  {
    id: '3',
    user: {
      name: 'Você',
      avatar: 'https://avatars.githubusercontent.com/u/124599?v=4'
    },
    content:
      '<p>Obrigado pelas explicações! Isso me ajudou a <u>entender melhor</u>.</p>',
    createdAt: '2023-06-01T14:45:00Z',
    likes: 2,
    isLiked: false,
    isOwnComment: true
  }
]

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex space-x-1">
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-muted' : ''}
      >
        <Bold className="h-3 w-3" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-muted' : ''}
      >
        <Italic className="h-3 w-3" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'bg-muted' : ''}
      >
        <UnderlineIcon className="h-3 w-3" />
      </Button>
    </div>
  )
}

export function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [isCommentAreaExpanded, setIsCommentAreaExpanded] = useState(true)
  const commentAreaRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-full'
      }
    }
  })

  const editingEditor = useEditor({
    extensions: [StarterKit, Underline],
    content: ''
  })

  useEffect(() => {
    if (commentAreaRef.current) {
      commentAreaRef.current.style.maxHeight = isCommentAreaExpanded
        ? `${commentAreaRef.current.scrollHeight}px`
        : '0px'
    }
  }, [isCommentAreaExpanded])

  const handleGoBack = () => {
    navigate('..')
  }

  const handlePostComment = () => {
    if (editor && editor.getText().trim()) {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        user: {
          name: 'Você',
          avatar: 'https://avatars.githubusercontent.com/u/124599?v=4'
        },
        content: editor.getHTML(),
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
        isOwnComment: true
      }
      setComments([newCommentObj, ...comments])
      editor.commands.setContent('')
    }
  }

  const handleLike = (id: string) => {
    setComments(
      comments.map(comment =>
        comment.id === id
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked
            }
          : comment
      )
    )
  }

  const handleEdit = (id: string) => {
    setEditingCommentId(id)
    const commentToEdit = comments.find(comment => comment.id === id)
    if (commentToEdit && editingEditor) {
      editingEditor.commands.setContent(commentToEdit.content)
    }
  }

  const handleSaveEdit = () => {
    if (editingCommentId && editingEditor) {
      setComments(
        comments.map(comment =>
          comment.id === editingCommentId
            ? { ...comment, content: editingEditor.getHTML() }
            : comment
        )
      )
      setEditingCommentId(null)
    }
  }

  const handleDelete = (id: string) => {
    setComments(comments.filter(comment => comment.id !== id))
  }

  const handleReport = (id: string) => {
    console.log(`Comentário denunciado: ${id}`)
  }

  return (
    <div className="bg-background flex h-screen flex-col text-sm">
      <header className="bg-card sticky top-0 z-10 p-3 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="absolute left-1/2 -translate-x-1/2 transform text-center">
            <h1 className="text-lg font-bold">Comentários</h1>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow">
        <div className="mx-auto max-w-3xl space-y-2 p-2">
          {comments.map(comment => (
            <Card key={comment.id} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center space-x-2 p-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={comment.user.avatar}
                    alt={comment.user.name}
                  />
                  <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h3 className="text-xs font-semibold">{comment.user.name}</h3>
                  <p className="text-muted-foreground text-xs">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {comment.isOwnComment ? (
                      <>
                        <DropdownMenuItem
                          onClick={() => handleEdit(comment.id)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={e => e.preventDefault()}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso excluirá
                                permanentemente seu comentário.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(comment.id)}
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => handleReport(comment.id)}
                      >
                        <Flag className="mr-2 h-4 w-4" />
                        Denunciar
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-2 pt-0">
                {editingCommentId === comment.id ? (
                  <div>
                    <MenuBar editor={editingEditor} />
                    <EditorContent editor={editingEditor} />
                    <Button onClick={handleSaveEdit} className="mt-2" size="sm">
                      Salvar
                    </Button>
                  </div>
                ) : (
                  <div
                    className="text-xs"
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  />
                )}
              </CardContent>
              <CardFooter className="p-2 pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center space-x-1 text-xs ${
                    comment.isLiked ? 'text-primary' : ''
                  }`}
                  onClick={() => handleLike(comment.id)}
                >
                  <ThumbsUp className="h-3 w-3" />
                  <span>{comment.likes}</span>
                </Button>
                {comment.isLiked && (
                  <span className="text-primary ml-2 text-xs">Curtido</span>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="bg-background sticky bottom-0 border-t">
        <div className="mx-auto max-w-3xl p-2">
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 w-full"
            onClick={() => setIsCommentAreaExpanded(!isCommentAreaExpanded)}
          >
            {isCommentAreaExpanded ? (
              <>
                <ChevronDown className="mr-2 h-4 w-4" /> Ocultar área de
                comentários
              </>
            ) : (
              <>
                <ChevronUp className="mr-2 h-4 w-4" /> Mostrar área de
                comentários
              </>
            )}
          </Button>
          <div
            ref={commentAreaRef}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isCommentAreaExpanded ? '1000px' : '0px'
            }}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/124599?v=4"
                    alt="Seu avatar"
                  />
                  <AvatarFallback>Você</AvatarFallback>
                </Avatar>
                <div className="flex flex-grow">
                  <EditorContent
                    editor={editor}
                    className="min-h-[60px] flex-grow rounded-md border text-xs focus:outline-none [&_.ProseMirror]:h-full [&_.ProseMirror]:min-h-[60px] [&_.ProseMirror]:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <MenuBar editor={editor} />
                <Button onClick={handlePostComment} size="sm" className="ml-2">
                  <Send className="mr-2 h-3 w-3" />
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
