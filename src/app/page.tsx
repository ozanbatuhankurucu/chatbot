'use client'

import { Message, useChat } from 'ai/react'
import { useEffect, useRef } from 'react'

interface MessagesProps {
  messages: Message[]
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages]) // Trigger when messages change

  return (
    <div className='flex-1 p-4 overflow-y-auto border-gray-300'>
      {messages.map((m) => (
        <div
          key={m.id}
          className={`flex mb-4 ${
            m.role === 'user' ? 'justify-end' : 'justify-start'
          }`}>
          <div
            className={`p-3 max-w-[70%] rounded-lg ${
              m.role === 'user'
                ? 'bg-gray-200 text-black' // User messages style
                : 'bg-slate-700 text-white' // Bot messages style
            }`}
            style={{ whiteSpace: 'pre-wrap' }}>
            {m.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

interface InputFormProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  sendMessage: () => void
}

const InputForm: React.FC<InputFormProps> = ({
  input,
  handleInputChange,
  sendMessage
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className='p-4'>
      <textarea
        className='w-full p-2 border border-gray-300 rounded shadow-xl resize-none'
        value={input}
        placeholder='Say something...'
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        rows={2}
      />
      <button
        onClick={sendMessage}
        className='mt-2 p-2 bg-blue-500 text-white rounded shadow-md w-full'>
        Send
      </button>
    </div>
  )
}

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className='flex w-screen h-screen'>
      <div className='w-1/2 flex flex-col border-r'>
        <Messages messages={messages} />
        <InputForm
          input={input}
          handleInputChange={handleInputChange}
          sendMessage={handleSubmit}
        />
      </div>
      <div className='w-1/2 p-4'>
        <div className='h-full flex justify-center items-center text-gray-500'>
          Right side content
        </div>
      </div>
    </div>
  )
}
