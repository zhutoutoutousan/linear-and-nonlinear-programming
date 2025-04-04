"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { createChatCompletion } from "@/lib/deepseek"
import { MessageSquare, Send, RefreshCw, BookOpen, Brain, Lightbulb, Mic, MicOff, Volume2, Languages, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"
import type { Components } from "react-markdown"

// Define types for SpeechRecognition and SpeechSynthesisUtterance
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

type Language = 'en-US' | 'zh-CN';

export function FeynmanTechniqueChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: `You are a student learning about iterative algorithms and convergence in optimization. 
      You should ask questions about concepts you don't understand, and the user will explain them to you.
      Your goal is to learn from the user's explanations and then demonstrate your understanding.
      Focus on asking about:
      1. What iterative algorithms are and how they work
      2. Different types of convergence (finite, asymptotic)
      3. How to analyze convergence properties
      4. The relationship between algorithm structure and convergence
      
      Start by introducing yourself and asking a question about iterative algorithms.
      
      When discussing mathematical concepts, use LaTeX notation for formulas. For example:
      - Use $x_{k+1} = x_k + \alpha_k d_k$ for iterative update formulas
      - Use $\lim_{k \to \infty} \|x_k - x^*\| = 0$ for convergence definitions
      - Use $\nabla f(x)$ for gradients
      - Use $\| \cdot \|$ for norms
      
      Format your responses using markdown for better readability.`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<Language>('en-US');
  const [exampleAnswers, setExampleAnswers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language]);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthesisRef.current = new SpeechSynthesisUtterance();
      synthesisRef.current.lang = language;
      synthesisRef.current.rate = 1.0;
      synthesisRef.current.pitch = 1.0;
      synthesisRef.current.volume = 1.0;
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await createChatCompletion([
        {
          role: 'system',
          content: `You are a student learning about iterative algorithms and convergence in optimization.
Ask questions to understand these concepts better. When the user explains concepts to you, ask clarifying questions if something is unclear.
If they use mathematical notation, ask them to explain what the symbols mean.
If they struggle to explain a concept, ask them to break it down into simpler terms.
Always format mathematical formulas with dollar signs for inline math and double dollar signs for display math.
For example, use $x_{k+1} = x_k - \alpha \nabla f(x_k)$ for inline formulas and $$\min_{x \in \mathbb{R}^n} f(x)$$ for display formulas.`
        },
        ...messages,
        userMessage
      ]);

      if (response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: 'system',
        content: `You are a student learning about iterative algorithms and convergence in optimization. 
        You should ask questions about concepts you don't understand, and the user will explain them to you.
        Your goal is to learn from the user's explanations and then demonstrate your understanding.
        Focus on asking about:
        1. What iterative algorithms are and how they work
        2. Different types of convergence (finite, asymptotic)
        3. How to analyze convergence properties
        4. The relationship between algorithm structure and convergence
        
        Start by introducing yourself and asking a question about iterative algorithms.
        
        When discussing mathematical concepts, use LaTeX notation for formulas. For example:
        - Use $x_{k+1} = x_k + \alpha_k d_k$ for iterative update formulas
        - Use $\lim_{k \to \infty} \|x_k - x^*\| = 0$ for convergence definitions
        - Use $\nabla f(x)$ for gradients
        - Use $\| \cdot \|$ for norms
        
        Format your responses using markdown for better readability.`
      }
    ]);
    setShowExplanation(false);
    setShowExample(false);
    setExampleAnswers([]);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const toggleExample = () => {
    setShowExample(!showExample);
    if (!showExample && exampleAnswers.length === 0) {
      generateExampleAnswers();
    }
  };

  const generateExampleAnswers = async () => {
    setIsLoading(true);
    try {
      const examplePrompt = `Generate 3 example answers that a user might give when explaining the following concepts about iterative algorithms and convergence:
      1. What iterative algorithms are and how they work
      2. Different types of convergence (finite, asymptotic)
      3. How to analyze convergence properties
      
      Format each answer as a separate paragraph. Use markdown formatting and include mathematical formulas using LaTeX notation with dollar signs.
      For example, use $x_{k+1} = x_k + \\alpha_k d_k$ for inline formulas and $$\\min_{x \\in \\mathbb{R}^n} f(x)$$ for display formulas.`;
      
      const response = await createChatCompletion([
        { role: 'system', content: 'You are a helpful assistant generating example answers.' },
        { role: 'user', content: examplePrompt }
      ]);
      
      // Split the response into paragraphs
      const examples = response.split('\n\n').filter(ex => ex.trim().length > 0);
      setExampleAnswers(examples);
    } catch (error) {
      console.error("Error generating examples:", error);
      setExampleAnswers([
        "Iterative algorithms work by starting with an initial solution $x_0$ and repeatedly improving it until it converges to an optimal solution $x^*$. At each step $k$, the algorithm computes a new solution $x_{k+1}$ based on the current solution $x_k$ and some search direction $d_k$ with step size $\\alpha_k$: $x_{k+1} = x_k + \\alpha_k d_k$.",
        
        "Finite convergence means the algorithm reaches the exact solution in a finite number of steps, like the simplex method which finds the optimal solution in at most $\\binom{n}{m}$ iterations. Asymptotic convergence means the algorithm gets arbitrarily close to the solution as the number of steps increases, satisfying $\\lim_{k \\to \\infty} \\|x_k - x^*\\| = 0$.",
        
        "To analyze convergence properties, we examine the rate at which the algorithm approaches the solution. For example, if $\\|x_{k+1} - x^*\\| \\leq \\rho \\|x_k - x^*\\|$ for some $\\rho < 1$, we have linear convergence. We also check if the algorithm guarantees convergence from any starting point (global convergence) or only from points close to the solution (local convergence)."
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
    if (recognitionRef.current) {
      recognitionRef.current.lang = value;
    }
    if (synthesisRef.current) {
      synthesisRef.current.lang = value;
    }
  };

  const speakLastMessage = () => {
    const lastMessage = messages.filter(m => m.role === 'assistant').pop();
    if (lastMessage && synthesisRef.current) {
      // Remove markdown and math for speech
      const plainText = lastMessage.content
        .replace(/\$\$(.*?)\$\$/g, '') // Remove display math
        .replace(/\$(.*?)\$/g, '') // Remove inline math
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Replace links with text
        .replace(/[*_~`]/g, ''); // Remove markdown formatting
      
      synthesisRef.current.text = plainText;
      window.speechSynthesis.speak(synthesisRef.current);
    }
  };

  // Function to render message content with markdown and math
  const renderMessageContent = (content: string) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => <p className="mb-2">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-2">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-md font-bold mb-2">{children}</h3>,
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="bg-muted p-2 rounded mb-2 overflow-x-auto">{children}</pre>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic mb-2">{children}</blockquote>,
          a: ({ href, children }) => <a href={href} className="text-primary underline" target="_blank" rel="noopener noreferrer">{children}</a>,
          table: ({ children }) => <table className="border-collapse border border-border mb-2 w-full">{children}</table>,
          th: ({ children }) => <th className="border border-border p-2 bg-muted">{children}</th>,
          td: ({ children }) => <td className="border border-border p-2">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-serif flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Feynman Technique Chat
        </CardTitle>
        <CardDescription>
          Teach an AI about iterative algorithms and convergence to reinforce your understanding
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow space-y-4">
        <div className="bg-muted p-4 rounded-md mb-4">
          <h3 className="font-medium flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            How the Feynman Technique Works
          </h3>
          <p className="text-sm text-muted-foreground">
            The Feynman Technique is a learning method where you explain a concept to someone else to better understand it yourself. 
            In this chat, you'll teach an AI about iterative algorithms and convergence. As you explain, you'll identify gaps in your 
            understanding and reinforce your knowledge.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[120px]">
                <Languages className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English</SelectItem>
                <SelectItem value="zh-CN">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={speakLastMessage}
                    disabled={messages.filter(m => m.role === 'assistant').length === 0}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Speak last AI message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={toggleListening}
                    disabled={!recognitionRef.current}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isListening ? "Stop listening" : "Start voice input"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={toggleExample}
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Show example answers</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto border rounded-md p-4 space-y-4 max-h-[500px]">
          {messages.filter(m => m.role !== 'system').map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "p-3 rounded-md max-w-[80%]", 
                message.role === 'user' 
                  ? "bg-primary text-primary-foreground ml-auto" 
                  : "bg-muted"
              )}
            >
              {message.role === 'user' ? (
                <p>{message.content}</p>
              ) : (
                renderMessageContent(message.content)
              )}
            </div>
          ))}
          {isLoading && (
            <div className="bg-muted p-3 rounded-md max-w-[80%]">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {showExample && (
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Example Answers</h3>
            <Tabs defaultValue="1">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="1">Example 1</TabsTrigger>
                <TabsTrigger value="2">Example 2</TabsTrigger>
                <TabsTrigger value="3">Example 3</TabsTrigger>
              </TabsList>
              {exampleAnswers.map((example, index) => (
                <TabsContent key={index} value={(index + 1).toString()}>
                  <div className="p-2 bg-background rounded-md">
                    {renderMessageContent(example)}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setInput(example)}
                    >
                      Use this example
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        <div className="flex gap-2">
          <Textarea
            placeholder={language === 'en-US' ? "Type your explanation here..." : "在此输入您的解释..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="min-h-[80px]"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()}
            className="self-end"
          >
            <Send className="h-4 w-4 mr-2" />
            {language === 'en-US' ? "Send" : "发送"}
          </Button>
        </div>

        <div className="flex justify-between mt-2">
          <Button variant="outline" size="sm" onClick={resetChat}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {language === 'en-US' ? "Reset Chat" : "重置对话"}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleExplanation}>
            <BookOpen className="h-4 w-4 mr-2" />
            {showExplanation ? (language === 'en-US' ? "Hide Tips" : "隐藏提示") : (language === 'en-US' ? "Show Tips" : "显示提示")}
          </Button>
        </div>

        {showExplanation && (
          <div className="bg-muted p-4 rounded-md mt-2">
            <h3 className="font-medium mb-2">{language === 'en-US' ? "Tips for Effective Teaching" : "有效教学的技巧"}</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>{language === 'en-US' ? "Use simple language and avoid jargon when possible" : "尽可能使用简单的语言，避免使用专业术语"}</li>
              <li>{language === 'en-US' ? "Provide concrete examples to illustrate abstract concepts" : "提供具体例子来说明抽象概念"}</li>
              <li>{language === 'en-US' ? "Break down complex ideas into smaller, digestible parts" : "将复杂想法分解成更小、更容易理解的部分"}</li>
              <li>{language === 'en-US' ? "Use analogies to connect new concepts to familiar ones" : "使用类比将新概念与熟悉的概念联系起来"}</li>
              <li>{language === 'en-US' ? "If you get stuck, identify the specific part you're unsure about" : "如果遇到困难，找出你不确定的具体部分"}</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 