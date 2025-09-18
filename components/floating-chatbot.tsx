"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { SupportQuestion } from "@/lib/db/support"

interface FloatingChatbotProps {
  questions: SupportQuestion[]
}

export default function FloatingChatbot({ questions }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{ type: "question" | "answer" | "user"; content: string }>>([])
  const [userInput, setUserInput] = useState("")

  const handleQuestionClick = (question: SupportQuestion) => {
    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: question.question },
      { type: "answer", content: question.answer },
    ])
  }

  const handleUserMessage = () => {
    if (!userInput.trim()) return

    setChatHistory((prev) => [
      ...prev,
      { type: "user", content: userInput },
      {
        type: "answer",
        content:
          "Thank you for your message! For immediate assistance, please contact our support team at support@Elantré.com or call (94) 76 381-3687. You can also select from the common questions below.",
      },
    ])
    setUserInput("")
  }

  const remainingQuestions = questions.filter((q) => !chatHistory.some((chat) => chat.content === q.question))

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full w-16 h-16 bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            <MessageCircle className="h-8 w-8" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
          <Card className="shadow-2xl border-2 border-orange-200">
            <CardHeader className="bg-orange-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-6 w-6" />
                  <div>
                    <CardTitle className="text-lg">Elantré Assistant</CardTitle>
                    <CardDescription className="text-orange-100">How can I help you today?</CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-orange-600"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Bot className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                    <p className="text-muted-foreground">
                      Welcome! I'm here to help. Select a question below or type your own.
                    </p>
                  </div>
                ) : (
                  chatHistory.map((entry, index) => (
                    <div key={index} className={`flex ${entry.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          entry.type === "user"
                            ? "bg-orange-500 text-white"
                            : entry.type === "question"
                              ? "bg-muted"
                              : "bg-orange-50 border border-orange-200"
                        }`}
                      >
                        {entry.type === "answer" && (
                          <div className="flex items-center space-x-2 mb-2">
                            <Bot className="h-4 w-4 text-orange-500" />
                            <Badge variant="secondary" className="text-xs">
                              Assistant
                            </Badge>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">{entry.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* User Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2 mb-3">
                  <Input
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleUserMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleUserMessage} size="icon" className="bg-orange-500 hover:bg-orange-600">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Questions */}
                {remainingQuestions.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Quick Questions:</p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {remainingQuestions.slice(0, 3).map((question) => (
                        <Button
                          key={question.id}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto py-2 px-2 text-xs hover:bg-orange-50"
                          onClick={() => handleQuestionClick(question)}
                        >
                          <span className="line-clamp-2">{question.question}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
