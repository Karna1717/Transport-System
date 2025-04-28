"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X, HelpCircle, Bot, User, Clock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  type: "user" | "bot";
  content: string;
  timestamp: number;
}

const quickActions = [
  "What are your pricing plans?",
  "How do I track my shipment?",
  "What's the delivery time?",
  "Do you offer insurance?",
];

const initialBotMessages = [
  "Hello! I'm your shipping assistant. How can I help you today?",
  "I can help you with:",
  "• Pricing information",
  "• Shipping services",
  "• Tracking your package",
  "• General questions about our services",
];

const pricingInfo = {
  standard: {
    price: "$5.99",
    features: ["Up to 5kg weight limit", "Standard delivery (3-5 days)", "Basic tracking", "Email support", "Insurance up to $100"],
  },
  express: {
    price: "$9.99",
    features: ["Up to 10kg weight limit", "Express delivery (1-2 days)", "Advanced tracking", "Priority support", "Insurance up to $500", "Free packaging"],
  },
  premium: {
    price: "$19.99",
    features: ["Up to 20kg weight limit", "Same day delivery", "Real-time tracking", "24/7 dedicated support", "Insurance up to $2000", "Free packaging", "Bulk shipping discounts", "API access"],
  },
};

const commonQuestions = {
  "shipping cost": "Shipping costs are based on package weight, dimensions, and destination. We offer three plans: Standard ($5.99), Express ($9.99), and Premium ($19.99) per shipment.",
  "tracking": "You can track your shipment through our website or mobile app using your tracking number. We provide real-time updates on your package's location.",
  "delivery time": "Delivery times vary by plan: Standard (3-5 days), Express (1-2 days), and Premium (same day delivery).",
  "insurance": "All plans include insurance: Standard ($100), Express ($500), and Premium ($2000) coverage.",
  "payment": "We accept all major credit cards, PayPal, and bank transfers. All payments are secure and encrypted.",
  "contact": "You can reach our support team through email, phone, or our contact form on the website. Premium plan users get 24/7 dedicated support.",
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const botMessages = initialBotMessages.map(msg => ({
        type: "bot" as const,
        content: msg,
        timestamp: Date.now(),
      }));
      setMessages(botMessages);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    handleSendMessage();
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      type: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(input.toLowerCase());
      const botMessage: Message = {
        type: "bot",
        content: response,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    // Check for pricing-related queries
    if (userInput.includes("price") || userInput.includes("cost") || userInput.includes("plan")) {
      return `We offer three pricing plans:
1. Standard Plan (${pricingInfo.standard.price}/shipment):
   - ${pricingInfo.standard.features.join("\n   - ")}
2. Express Plan (${pricingInfo.express.price}/shipment):
   - ${pricingInfo.express.features.join("\n   - ")}
3. Premium Plan (${pricingInfo.premium.price}/shipment):
   - ${pricingInfo.premium.features.join("\n   - ")}`;
    }

    // Check for common questions
    for (const [keyword, answer] of Object.entries(commonQuestions)) {
      if (userInput.includes(keyword)) {
        return answer;
      }
    }

    // Default response
    return "I'm not sure I understand. Could you please rephrase your question? I can help you with pricing, shipping services, tracking, or general questions about our services.";
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 z-50">
          <div className="animate-bounce-slow">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
              onClick={() => setIsOpen(true)}
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </div>
          <div className="animate-fade-in bg-primary/10 text-primary text-xs px-3 py-1 rounded-full shadow-sm">
            Need help? Click here!
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-background border rounded-lg shadow-lg flex flex-col z-50 animate-slide-up">
          <div className="p-4 border-b flex justify-between items-center bg-primary/5">
            <div className="flex items-center gap-2">
              <div className="animate-rotate-slow">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Shipping Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHistory(!showHistory)}
                className="hover:bg-primary/10"
              >
                <Clock className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!showHistory ? (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex animate-fade-in-up",
                      message.type === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3 flex flex-col gap-1",
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === "bot" && (
                          <Bot className="h-5 w-5 text-primary mt-0.5" />
                        )}
                        {message.type === "user" && (
                          <User className="h-5 w-5 text-primary-foreground mt-0.5" />
                        )}
                        <div className="flex-1">{message.content}</div>
                      </div>
                      <div className={cn(
                        "text-xs",
                        message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-muted-foreground animate-fade-in">
                    <Bot className="h-5 w-5 text-primary" />
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                      <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                      <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                {messages.length === initialBotMessages.length && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-2"
                        onClick={() => handleQuickAction(action)}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => setShowHistory(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Chat
                </Button>
                <div className="space-y-2">
                  {messages
                    .filter(msg => msg.type === "user")
                    .map((message, index) => (
                      <div
                        key={index}
                        className="p-2 rounded-lg bg-muted hover:bg-muted/80 cursor-pointer"
                        onClick={() => {
                          setShowHistory(false);
                          handleQuickAction(message.content);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{message.content}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-primary/5">
            <div className="flex gap-2 transition-transform hover:scale-[1.01]">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 