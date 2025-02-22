import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import type { ChatMessage, UserType } from '../types';

const INITIAL_MESSAGE = "¡Hola! ¿Cómo puedo ayudarte hoy?";

const BOT_RESPONSES: Record<UserType, Record<string, string>> = {
  student: {
    "horario": "Los horarios de clase están disponibles en la sección de estudiantes del portal.",
    "tareas": "Puedes ver tus tareas pendientes en el calendario académico.",
    "notas": "Las calificaciones se publican al final de cada período.",
    "default": "Como estudiante, puedo ayudarte con información sobre horarios, tareas y calificaciones."
  },
  parent: {
    "pagos": "Los pagos se pueden realizar a través de nuestra plataforma en línea o en la oficina administrativa.",
    "reuniones": "Puede programar reuniones con los profesores a través del portal de padres.",
    "progreso": "El progreso de su hijo/a se actualiza semanalmente en el portal.",
    "default": "Como padre de familia, puedo ayudarte con información sobre pagos, reuniones y progreso académico."
  },
  teacher: {
    "asistencia": "El registro de asistencia se realiza a través del sistema de gestión escolar.",
    "evaluaciones": "Puede cargar las evaluaciones en el módulo de calificaciones.",
    "recursos": "Los recursos didácticos están disponibles en la biblioteca digital.",
    "default": "Como profesor, puedo ayudarte con información sobre asistencia, evaluaciones y recursos didácticos."
  }
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: INITIAL_MESSAGE,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleSend = () => {
    if (!inputText.trim() || !userType) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    // Generate bot response
    const responses = BOT_RESPONSES[userType];
    const lowercaseInput = inputText.toLowerCase();
    let botResponse = responses.default;
    
    // Check for specific keywords in the user's message
    Object.entries(responses).forEach(([keyword, response]) => {
      if (lowercaseInput.includes(keyword)) {
        botResponse = response;
      }
    });

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl flex flex-col max-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Chat de Ayuda</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* User Type Selection */}
      {!userType && (
        <div className="p-4 space-y-2">
          <p className="text-gray-600 mb-3">Por favor, selecciona tu rol:</p>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => setUserType('student')}
              className="p-3 text-left rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-800"
            >
              Estudiante
            </button>
            <button
              onClick={() => setUserType('parent')}
              className="p-3 text-left rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-800"
            >
              Padre de Familia
            </button>
            <button
              onClick={() => setUserType('teacher')}
              className="p-3 text-left rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-800"
            >
              Profesor
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      {userType && (
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}