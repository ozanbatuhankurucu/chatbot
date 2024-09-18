import { Message } from 'ai/react'

export const LOCAL_STORAGE_KEY = 'chatbot_conversation_history'

function useConversationHistory() {
  // Load messages from local storage on mount
  const loadMessagesFromStorage = (): Message[] => {
    const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY)
    return savedMessages ? JSON.parse(savedMessages) : []
  }

  // Clear the conversation from local storage
  const clearConversationHistory = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  return {
    loadMessagesFromStorage,
    clearConversationHistory
  }
}

export default useConversationHistory
