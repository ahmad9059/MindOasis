"use client"

import { useState } from "react"
import { Bot, X, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => setIsOpen(!isOpen)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          size="icon"
          className="rounded-full w-14 h-14 shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
          <span className="sr-only">Toggle Chat</span>
        </Button>
      </div>
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 shadow-2xl rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-80 overflow-y-auto">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div className="bg-secondary p-3 rounded-lg max-w-[80%]">
                <p className="text-sm">Hello! How can I help you find the right therapist today?</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <form className="flex w-full items-center space-x-2">
              <Input
                id="message"
                placeholder="Type your message..."
                className="flex-1"
                autoComplete="off"
              />
              <Button type="submit" size="icon">
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
