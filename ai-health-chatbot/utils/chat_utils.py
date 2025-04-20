from typing import Dict, List, Any
from collections import deque

class ChatManager:
    def __init__(self, max_context_length: int = 5):
        """
        Initialize the chat manager with conversation history tracking.
        
        Args:
            max_context_length: Maximum number of messages to keep in context
        """
        self.conversation_history = deque(maxlen=max_context_length)
        self.user_context = {}
    
    def add_message(self, role: str, content: str) -> None:
        """
        Add a message to the conversation history.
        
        Args:
            role: 'user' or 'assistant'
            content: Message content
        """
        self.conversation_history.append({
            'role': role,
            'content': content
        })
    
    def get_conversation_context(self) -> List[Dict[str, str]]:
        """
        Get the current conversation context.
        
        Returns:
            List of message dictionaries
        """
        return list(self.conversation_history)
    
    def update_user_context(self, key: str, value: Any) -> None:
        """
        Update user-specific context information.
        
        Args:
            key: Context key
            value: Context value
        """
        self.user_context[key] = value
    
    def get_user_context(self, key: str = None) -> Any:
        """
        Get user-specific context information.
        
        Args:
            key: Optional specific context key to retrieve
            
        Returns:
            Context value or entire context dictionary
        """
        if key:
            return self.user_context.get(key)
        return self.user_context
    
    def clear_context(self) -> None:
        """Clear both conversation history and user context."""
        self.conversation_history.clear()
        self.user_context.clear()
    
    def format_conversation(self) -> str:
        """
        Format the conversation history as a string.
        
        Returns:
            Formatted conversation string
        """
        formatted = []
        for msg in self.conversation_history:
            role = "User" if msg['role'] == 'user' else "Assistant"
            formatted.append(f"{role}: {msg['content']}")
        return "\n".join(formatted)
    
    def get_last_user_message(self) -> str:
        """
        Get the last user message from the conversation history.
        
        Returns:
            Last user message or empty string
        """
        for msg in reversed(self.conversation_history):
            if msg['role'] == 'user':
                return msg['content']
        return ""
    
    def get_last_assistant_message(self) -> str:
        """
        Get the last assistant message from the conversation history.
        
        Returns:
            Last assistant message or empty string
        """
        for msg in reversed(self.conversation_history):
            if msg['role'] == 'assistant':
                return msg['content']
        return "" 