import { Lesson, Badge } from '../types';

export const lessons: Lesson[] = [
  // Lesson 1
  {
    id: 1,
    title: 'Discover Your Spark',
    description: 'Identify personal strengths and a community need to spark a business idea.',
    sections: 5,
    duration: '60-90 minutes',
    icon: '✨',
    color: 'bg-yellow-400',
    content: {
      overview: "Become a SparkStar by finding what you're great at and a problem to solve, then combine them into a business idea and validate it with others.",
      checklist: ["Discover your strengths", "Find a community need", "Combine strengths and need into an idea", "Validate your idea", "Reflect on your spark"],
      activities: [
        { id: 1, title: "Discover Your Strengths", time: "10 minutes", tools: ["Pen/pencil", "Paper"], description: "Think about what you're good at (e.g., drawing, helping).", writeAnswers: ["My Strengths: ___"] },
        { id: 2, title: "Find a Community Need", time: "10 minutes", tools: ["Pen/pencil", "Paper"], description: "Think about a problem people face (e.g., kids get bored).", writeAnswers: ["Community Need: ___"] },
        { id: 3, title: "Combine Strengths and Need", time: "15 minutes", tools: ["Pen/pencil", "Paper"], description: "Mix your strengths and the need to create a business idea.", writeAnswers: ["My Business Idea: ___"] },
        { id: 4, title: "Validate Your Idea", time: "15 minutes", tools: ["Pen/pencil", "Paper"], description: "Ask 2-3 people: \"Is this a real problem? Would my idea help?\"", writeAnswers: ["Feedback: ___"] },
        { id: 5, title: "Reflect", time: "5 minutes", tools: ["Pen/pencil", "Paper"], isReflection: true, description: "Think about what was fun and what you learned.", writeAnswers: ["What was fun about finding your spark? ___", "What's one thing you learned about yourself? ___"] }
      ]
    }
  },
  // Lesson 2
  {
    id: 2,
    title: 'Brainstorm Solutions',
    description: 'Brainstorm solutions for the need and create an Idea Blast Poster.',
    sections: 6,
    duration: '60-90 minutes',
    icon: '💡',
    color: 'bg-orange-400',
    content: {
        overview: "You've found your Spark Idea! Now it's time to brainstorm all the creative ways you can solve the problem. Let your imagination run wild and we'll capture your best thoughts on a fun 'Idea Blast Poster'.",
        checklist: ["Review your idea", "Brainstorm three solutions", "Pick one solution", "Create an Idea Blast Poster", "Share your poster", "Reflect on solutions"],
        activities: [
            { id: 1, title: "Review Your Idea", time: "5 minutes", tools: ["Pen/pencil", "Paper"], description: "Look back at your idea from Lesson 1.", writeAnswers: ["My Idea: ___"] },
            { id: 2, title: "Brainstorm Three Solutions", time: "10 minutes", tools: ["Pen/pencil", "Paper"], description: "List three ways to solve the problem.", writeAnswers: ["Solution 1: ___", "Solution 2: ___", "Solution 3: ___"] },
            { id: 3, title: "Pick One Solution", time: "10 minutes", tools: ["Pen/pencil", "Paper"], description: "Choose your favorite solution.", writeAnswers: ["My Solution: ___"] },
            { id: 4, title: "Create an Idea Blast Poster", time: "15-20 minutes", tools: ["Paper", "crayons/markers"], description: "Draw your solution on a poster. Include a name, drawing, slogan, and your name." },
            { id: 5, title: "Share Your Poster", time: "10 minutes", tools: ["Pen/pencil", "Paper"], description: "Show your poster to 2-3 people and ask for advice.", writeAnswers: ["One piece of advice: ___"] },
            { id: 6, title: "Reflect", time: "5 minutes", tools: ["Pen/pencil", "Paper"], isReflection: true, description: "Think about what was fun and what you learned.", writeAnswers: ["What was fun about brainstorming? ___", "What did you learn about solving problems? ___"] }
        ]
    }
  },
  // Lesson 3
  {
    id: 3,
    title: 'Validate Your Vision',
    description: 'Test your idea with feedback and create a Validation Star Chart.',
    sections: 5,
    duration: '60-90 minutes',
    icon: '⭐',
    color: 'bg-green-400',
    content: {
      overview: "You have an amazing idea! But will other people think so too? In this lesson, you'll become a researcher and get feedback from others to make your idea even stronger. We'll collect this feedback in a 'Validation Star Chart'.",
      checklist: ["Review your solution", "Ask for feedback", "Create a Validation Star Chart", "Share your chart", "Reflect on feedback"],
      activities: [
        { id: 1, title: "Review Your Solution", time: "5 minutes", tools: ["Pen/pencil", "Paper"], description: "Look back at your solution from Lesson 2.", writeAnswers: ["My Solution: ___"] },
        { id: 2, title: "Ask for Feedback", time: "15 minutes", tools: ["Pen/pencil", "Paper"], description: "Ask 2-3 people for their thoughts.", writeAnswers: ["Feedback: ___"] },
        { id: 3, title: "Create a Validation Star Chart", time: "15-20 minutes", tools: ["Paper", "crayons/markers"], description: "Draw a chart showing feedback." },
        { id: 4, title: "Share Your Chart", time: "10 minutes", tools: ["Pen/pencil", "Paper"], description: "Show your chart to 2-3 people.", writeAnswers: ["One piece of advice: ___"] },
        { id: 5, title: "Reflect", time: "5 minutes", tools: ["Pen/pencil", "Paper"], isReflection: true, description: "Think about what was fun and what you learned.", writeAnswers: ["What was fun about getting feedback? ___", "What did you learn about your idea? ___"] }
      ]
    }
  },
  // Lesson 4
  {
    id: 4,
    title: 'Craft Your Pitch',
    description: 'Create a short pitch and Pitch Spark Card to explain your idea.',
    sections: 5,
    duration: '60-90 minutes',
    icon: '🎯',
    color: 'bg-blue-400',
    content: {
      overview: "An idea is powerful, but you need to be able to explain it quickly! A 'pitch' is a short, exciting summary of your business. In this lesson, you'll create your own pitch and a handy 'Pitch Spark Card' so you're always ready to share your vision.",
      checklist: ["Review your idea", "Write a pitch", "Create a Pitch Spark Card", "Practice and share your pitch", "Reflect on pitching"],
      activities: [
        { id: 1, title: "Review Your Idea", time: "5 minutes", tools: ["Pen/pencil", "Paper"], description: "Look back at your idea from Lesson 3.", writeAnswers: ["My Idea: ___"] },
        { id: 2, title: "Write a Pitch", time: "10 minutes", tools: ["Pen/pencil", "Paper"], description: "Write a 2-3 sentence pitch: What's your idea and why's it great?", writeAnswers: ["My Pitch: ___"] },
        { id: 3, title: "Create a Pitch Spark Card", time: "15-20 minutes", tools: ["Paper", "crayons/markers"], description: "Draw your pitch on a card." },
        { id: 4, title: "Practice and Share Your Pitch", time: "15 minutes", tools: ["Pen/pencil", "Paper"], description: "Practice your pitch 2-3 times and share with 2-3 people.", writeAnswers: ["One piece of advice: ___"] },
        { id: 5, title: "Reflect", time: "5 minutes", tools: ["Pen/pencil", "Paper"], isReflection: true, description: "Think about what was fun and what you learned.", writeAnswers: ["What was fun about pitching? ___", "What did you learn about sharing ideas? ___"] }
      ]
    }
  },
  // Lesson 5
  {
    id: 5,
    title: 'Plan Your Mini-Business',
    description: 'Create a simple business plan and Mini-Business Blueprint.',
    sections: 5,
    duration: '60-90 minutes',
    icon: '📋',
    color: 'bg-purple-400',
    content: {
      overview: "Every great adventure needs a map! A business plan is a map for your idea. In this lesson, we'll create a 'Mini-Business Blueprint' to outline the simple steps you'll need to take to bring your idea to life.",
      checklist: ["Review your idea", "Plan your business", "Create a Mini-Business Blueprint", "Share your blueprint", "Reflect on planning"],
      activities: [
        { id: 1, title: "Review Your Idea", time: "5 minutes", tools: ["Pen/pencil", "Paper"], description: "Look back at your idea from Lesson 4.", writeAnswers: ["My Idea: ___"] },
        { id: 2, title: "Plan Your Business", time: "15 minutes", tools: ["Pen/pencil", "Paper"], description: "Answer: What will you sell? Who is it for? How will you make it?", writeAnswers: ["What: ___", "Who: ___", "How: ___"] },
        { id: 3, title: "Create a Mini-Business Blueprint", time: "15-20 minutes", tools: ["Paper", "crayons/markers"], description: "Draw your plan on a blueprint." },
        { id: 4, title: "Share Your Blueprint", time: "10 minutes", tools: ["Pen/pencil", "Paper"], description: "Show your blueprint to 2-3 people.", writeAnswers: ["One piece of advice: ___"] },
        { id: 5, title: "Reflect", time: "5 minutes", tools: ["Pen/pencil", "Paper"], isReflection: true, description: "Think about what was fun and what you learned.", writeAnswers: ["What was fun about planning? ___", "What did you learn about making ideas real? ___"] }
      ]
    }
  },
  // Lesson 6
  {
    id: 6,
    title: 'Money Basics',
    description: 'Set a price for your idea and create a Pricing Poster.',
    sections: 6,
    duration: '60-90 minutes',
    icon: '💰',
    color: 'bg-green-500',
    content: {
      overview: "Let's talk about money! Setting a price for your product or service is a key step. In this lesson, you'll learn how to calculate your costs and choose a fair price that values your hard work. Then you'll announce it with a Pricing Poster!",
      checklist: ["Review your idea", "List costs", "Decide a price", "Create a Pricing Poster", "Share your poster", "Reflect on pricing"],
      activities: [
        { id: 1, title: "Review Your Idea", time: "5 minutes", tools: ["Pen/pencil", "Paper"], description: "Look back at your idea from Lesson 5.", writeAnswers: ["My Idea: 
