"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 rounded-full bg-primary text-primary-foreground shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="sr-only">Contact</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
          <DialogDescription>Envoyez moi un message et je vous répondrais dès que possible.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Input placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Input type="email" placeholder="Your email" />
          </div>
          <div className="space-y-2">
            <Textarea placeholder="Your message" />
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

