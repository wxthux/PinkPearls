"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { SupportQuestion } from "@/lib/db/support"
import { MessageCircle } from "lucide-react"

interface ChatbotProps {
  questions: SupportQuestion[]
}

export default function Chatbot({ questions }: ChatbotProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<SupportQuestion | null>(null)
  const [chatHistory, setChatHistory] = useState<Array<{ type: "question" | "answer"; content: string }>>([])

  const handleQuestionClick = (question: SupportQuestion) => {
    setSelectedQuestion(question)

    // Add to chat history
    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: question.question },
      { type: "answer", content: question.answer },
    ])
  }

  // Filter out the selected question from the list
  const remainingQuestions = selectedQuestion ? questions.filter((q) => q.id !== selectedQuestion.id) : questions

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="mr-2 h-5 w-5 text-red-300" />
          Pink Pearls Support
        </CardTitle>
        <CardDescription>Select a question below or ask your own</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {chatHistory.length > 0 ? (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  entry.type === "question" ? "bg-muted ml-auto max-w-[80%]" : "bg-red-300/10 mr-auto max-w-[80%]"
                }`}
              >
                {entry.content}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Select a question to get started</p>
          </div>
        )}

        <div className="pt-4">
          <h4 className="text-sm font-medium mb-2">Common Questions:</h4>
          <div className="grid gap-2">
            {remainingQuestions.slice(0, 5).map((question) => (
              <Button
                key={question.id}
                variant="outline"
                className="justify-start h-auto py-2 px-3 text-left"
                onClick={() => handleQuestionClick(question)}
              >
                {question.question}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <p className="text-xs text-muted-foreground">Need more help? Contact us directly at support@Pink Pearls.com</p>
      </CardFooter>
    </Card>
  )
}
