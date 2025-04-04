interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatCompletionResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
}

export async function createChatCompletion(messages: Message[]): Promise<string> {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature: 0.7,
      max_tokens: 8000,
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.statusText}`);
  }

  const data: ChatCompletionResponse = await response.json();
  return data.choices[0].message.content;
}

export interface CalendarTask {
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface CalendarRequest {
  type: 'calendar';
  tasks: CalendarTask[];
}

export function parseCalendarRequest(content: string): CalendarRequest | null {
  // Check if content contains time-related keywords
  const timeKeywords = /(before|after|at|around|from|to)\s+(\d{1,2}(?::\d{2})?\s*(?:AM|PM)?)/i;
  const dateKeywords = /(today|tomorrow|next week)/i;
  
  if (!timeKeywords.test(content) && !dateKeywords.test(content)) {
    return null;
  }

  // Split content into potential tasks
  const tasks = content.split(/[,.]\s+/).filter(task => 
    task.trim().length > 0 && 
    (timeKeywords.test(task) || dateKeywords.test(task))
  );

  if (tasks.length === 0) return null;

  const calendarTasks: CalendarTask[] = tasks.map(task => {
    // Extract time range if present (e.g., "from 12:00 to 1:30")
    const timeRangeMatch = task.match(/(?:from|between)\s+(\d{1,2}(?::\d{2})?\s*(?:AM|PM)?)\s+(?:to|until)\s+(\d{1,2}(?::\d{2})?\s*(?:AM|PM)?)/i);
    
    let startTime = new Date();
    let endTime = new Date();
    
    if (timeRangeMatch) {
      // Parse start and end times
      const startTimeStr = timeRangeMatch[1];
      const endTimeStr = timeRangeMatch[2];
      
      // Parse start time
      const [startHours, startMinutes] = parseTimeString(startTimeStr);
      startTime.setHours(startHours, startMinutes || 0);
      
      // Parse end time
      const [endHours, endMinutes] = parseTimeString(endTimeStr);
      endTime.setHours(endHours, endMinutes || 0);
      
      // If end time is earlier than start time, assume it's the next day
      if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
      }
    } else {
      // Single time point
      const timeMatch = task.match(timeKeywords);
      if (timeMatch) {
        const timeStr = timeMatch[2];
        const [hours, minutes] = parseTimeString(timeStr);
        startTime.setHours(hours, minutes || 0);
        endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1); // Default 1 hour duration
      }
    }

    // Parse date
    const dateMatch = task.match(dateKeywords);
    if (dateMatch) {
      const dateStr = dateMatch[1].toLowerCase();
      if (dateStr === 'tomorrow') {
        startTime.setDate(startTime.getDate() + 1);
        endTime.setDate(endTime.getDate() + 1);
      } else if (dateStr === 'next week') {
        startTime.setDate(startTime.getDate() + 7);
        endTime.setDate(endTime.getDate() + 7);
      }
    }

    // Extract title (everything before the time/date)
    const title = task.split(timeKeywords)[0].trim();

    return {
      title,
      start: startTime,
      end: endTime,
      description: task
    };
  });

  return {
    type: 'calendar',
    tasks: calendarTasks
  };
}

// Helper function to parse time strings like "12:00 PM" or "1:30"
function parseTimeString(timeStr: string): [number, number] {
  // Remove any extra spaces
  timeStr = timeStr.trim();
  
  // Check if it's in 12-hour format with AM/PM
  const ampmMatch = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (ampmMatch) {
    let hours = parseInt(ampmMatch[1]);
    const minutes = ampmMatch[2] ? parseInt(ampmMatch[2]) : 0;
    const isPM = ampmMatch[3].toUpperCase() === 'PM';
    
    // Convert to 24-hour format
    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
    
    return [hours, minutes];
  }
  
  // Check if it's in 24-hour format
  const timeMatch = timeStr.match(/(\d{1,2})(?::(\d{2}))?/);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1]);
    const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
    
    // Assume 24-hour format if hours > 12
    if (hours <= 12) {
      // If hours <= 12, check if it's likely PM based on context
      // This is a heuristic - we assume times like "1" or "2" without AM/PM are PM
      if (hours < 12) hours += 12;
    }
    
    return [hours, minutes];
  }
  
  // Default to current time if parsing fails
  const now = new Date();
  return [now.getHours(), now.getMinutes()];
}

export function parseKnowledgeRequest(content: string): { title: string; content: string; connections: number[] } | null {
  // Simple parsing - first line is title, rest is content
  const lines = content.split('\n');
  if (lines.length < 2) return null;
  
  return {
    title: lines[0].trim(),
    content: lines.slice(1).join('\n').trim(),
    connections: [], // Connections will be managed separately
  };
} 