"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { createChatCompletion } from "@/lib/deepseek"
import { Calculator, Send, RefreshCw, Brain, Lightbulb, Mic, MicOff, Volume2, Languages, HelpCircle, CheckCircle, XCircle, Loader2, GitBranch, VolumeX, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"
import type { Components } from "react-markdown"
import { SyntaxHighlighter } from "react-syntax-highlighter"
import { RotateCcw } from "lucide-react"

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
type ProblemDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'professional';

export function MathProblemChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you with challenging math problems about iterative algorithms and convergence. Would you like me to generate a problem for you to solve?'
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<Language>('en-US');
  const [difficulty, setDifficulty] = useState<ProblemDifficulty>('intermediate');
  const [currentProblem, setCurrentProblem] = useState<string | null>(null);
  const [problemSolved, setProblemSolved] = useState(false);
  const [exampleAnswer, setExampleAnswer] = useState<string | null>(null);
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

  const generateProblem = async () => {
    setIsLoading(true);
    try {
      const difficultyDescriptions = {
        beginner: "Generate a beginner-level math problem about iterative algorithms and convergence. Focus on basic concepts and simple calculations. Use straightforward language and avoid complex notation.",
        intermediate: "Generate an intermediate-level math problem about iterative algorithms and convergence. Include some challenging concepts but keep the problem approachable for students with basic knowledge.",
        advanced: "Generate an advanced-level math problem about iterative algorithms and convergence. Include complex concepts, proofs, and challenging calculations.",
        expert: "Generate an expert-level math problem about iterative algorithms and convergence. Include advanced theoretical concepts, complex proofs, and challenging mathematical techniques.",
        professional: "Generate a professional mathematician-level problem about iterative algorithms and convergence. Include cutting-edge research concepts, complex proofs, and sophisticated mathematical techniques."
      };

      const response = await createChatCompletion([
        {
          role: 'system',
          content: `You are a math problem generator for linear and nonlinear programming. 
${difficultyDescriptions[difficulty]}
Format your response as follows:
1. First, present the problem statement with mathematical formulas wrapped in dollar signs (e.g., $\\min_{x \\in \\mathbb{R}^n} f(x)$)
2. Then, provide a detailed solution with step-by-step explanations
3. Finally, explain the convergence properties of the algorithm mentioned in the problem

Make sure all mathematical formulas are properly formatted with LaTeX notation and wrapped in dollar signs for inline math and double dollar signs for display math.`
        },
        {
          role: 'user',
          content: 'Generate a challenging math problem about iterative algorithms and convergence.'
        }
      ]);

      if (response) {
        const problemMessage: Message = {
          role: 'assistant',
          content: response
        };
        setMessages([...messages, problemMessage]);
        setCurrentProblem(response);
      }
    } catch (error) {
      console.error('Error generating problem:', error);
      setMessages([
        ...messages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error while generating a problem. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
          content: `You are a math tutor helping a student understand iterative algorithms and convergence.
The student is working on the following problem:

${currentProblem}

Provide helpful guidance and feedback on their answer. If they're struggling, offer hints without giving away the solution.
If they ask for the solution, provide a detailed explanation with step-by-step reasoning.
Always format mathematical formulas with dollar signs for inline math and double dollar signs for display math.`
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

  const showExampleAnswer = async () => {
    setIsLoading(true);
    try {
      const response = await createChatCompletion([
        {
          role: 'system',
          content: `You are a math tutor helping a student understand iterative algorithms and convergence.
The student is working on the following problem:

${currentProblem}

Provide a detailed solution with step-by-step explanations. Make sure to:
1. Show all mathematical steps clearly
2. Explain the reasoning behind each step
3. Discuss the convergence properties of the algorithm
4. Format all mathematical formulas with dollar signs for inline math and double dollar signs for display math`
        }
      ]);

      if (response) {
        const exampleMessage: Message = {
          role: 'assistant',
          content: `Here's a detailed solution to the problem:\n\n${response}`
        };
        setMessages(prev => [...prev, exampleMessage]);
      }
    } catch (error) {
      console.error('Error generating example answer:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error while generating an example answer. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I can help you with challenging math problems about iterative algorithms and convergence. Would you like me to generate a problem for you to solve?'
      }
    ]);
    setShowExplanation(false);
    setCurrentProblem(null);
    setProblemSolved(false);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
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

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value as ProblemDifficulty);
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Math Problem Challenge
        </CardTitle>
        <CardDescription>
          Test your understanding with challenging math problems about iterative algorithms and convergence.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Select value={difficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger className="w-[180px]">
                <Brain className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={generateProblem} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Problem...
              </>
            ) : (
              <>
                <GitBranch className="mr-2 h-4 w-4" />
                Generate New Problem
              </>
            )}
          </Button>
        </div>

        <div className="border rounded-md p-4 h-[400px] overflow-y-auto bg-muted/50">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p className="text-center">
                Click &quot;Generate New Problem&quot; to start a math challenge.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                      components={{
                        code: ({ node, inline, className, children, ...props }) => {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer or ask for help..."
              className="pr-10 resize-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="absolute right-2 top-2 flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleListening}
                className="h-8 w-8"
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                  }
                }}
                className="h-8 w-8"
                title="Stop speech"
              >
                <VolumeX className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={showExampleAnswer}
            disabled={isLoading || !currentProblem}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Show Example Answer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetChat}
            disabled={isLoading}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 