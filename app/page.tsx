"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Volume2, VolumeX, RotateCcw, Edit, LogOut } from "lucide-react"
import { getAssetPath } from "@/lib/utils"

interface ProfileCard {
  id: number
  name: string
  role: string
  bio: string
  image: string
  tags: string[]
  extra?: {
    location?: string
    contact?: string
  }
}

interface CardState {
  card: ProfileCard
  isOpened: boolean
  binPosition?: number
  randomPosition?: { x: number; y: number }
}

export default function StudentCardReveal() {
  const [isLoading, setIsLoading] = useState(true)
  const [cards, setCards] = useState<CardState[]>([])
  const [selectedCard, setSelectedCard] = useState<ProfileCard | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [openedCount, setOpenedCount] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [editingCard, setEditingCard] = useState<ProfileCard | null>(null)
  const [showRevealYourself, setShowRevealYourself] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [currentVerticalIndex, setCurrentVerticalIndex] = useState(0)
  const [currentDiagonalIndex, setCurrentDiagonalIndex] = useState(0)
  const [currentTopIndex, setCurrentTopIndex] = useState(0)
  const [currentFlow1, setCurrentFlow1] = useState(0)
  const [currentFlow2, setCurrentFlow2] = useState(0)
  const [currentFlow3, setCurrentFlow3] = useState(0)
  const [currentFlow4, setCurrentFlow4] = useState(0)
  const [currentFlow5, setCurrentFlow5] = useState(0)
  const [currentFlow6, setCurrentFlow6] = useState(0)
  const [currentFlow7, setCurrentFlow7] = useState(0)
  const [currentFlow8, setCurrentFlow8] = useState(0)
  const [currentFlow9, setCurrentFlow9] = useState(0)
  const [currentFlow10, setCurrentFlow10] = useState(0)
  const [showClickContent, setShowClickContent] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Load cards data
  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch(getAssetPath("/cards.json"))
        if (!response.ok) {
          console.warn("cards.json not found, using placeholder data")
          const placeholderCards: ProfileCard[] = [
            {
              id: 1,
              name: "Coffee Addict Casey",
              role: "Professional Procrastinator",
              bio: "Lives on 6 shots of espresso daily. Can write a 10-page essay in 2 hours but takes 3 weeks to start it. Knows every coffee shop within a 5-mile radius.",
              image: getAssetPath("/student-with-coffee.png"),
              tags: ["Caffeine Expert", "Last Minute Legend", "Night Owl"],
              extra: {
                location: "Library Corner Table",
                contact: "@needsmorecoffee",
              },
            },
            {
              id: 2,
              name: "Textbook Tyler",
              role: "Human Encyclopedia",
              bio: "Actually reads the assigned readings. Highlights everything in 4 different colors. Has a color-coded system that nobody else understands but somehow works perfectly.",
              image: getAssetPath("/studious-student-with-books.png"),
              tags: ["Study Guide Guru", "Highlighter Hero", "Reading Machine"],
              extra: {
                location: "Front Row, Always",
                contact: "@actuallyreads",
              },
            },
            {
              id: 3,
              name: "Meme Master Mike",
              role: "Class Clown & Stress Reliever",
              bio: "Turns every group project into a comedy show. Somehow makes calculus funny. Single-handedly keeps the class group chat entertaining during finals week.",
              image: getAssetPath("/funny-student-laughing.png"),
              tags: ["Meme Lord", "Mood Booster", "Comic Relief"],
              extra: {
                location: "Back Row Comedy Central",
                contact: "@memesandmemes",
              },
            },
            {
              id: 4,
              name: "Snack Queen Sarah",
              role: "Mobile Vending Machine",
              bio: "Backpack is 70% snacks, 30% school supplies. Always has exactly what you're craving. Probably has a secret stash of emergency chocolate for finals.",
              image: getAssetPath("/student-with-snacks.png"),
              tags: ["Snack Supplier", "Hunger Hero", "Emergency Chocolate"],
              extra: {
                location: "Wherever Food Is Needed",
                contact: "@snackattack",
              },
            },
            {
              id: 5,
              name: "Extension Eddie",
              role: "Deadline Negotiator",
              bio: "Has gotten more extensions than anyone thought possible. Professors somehow always say yes. Rumored to have supernatural persuasion powers.",
              image: getAssetPath("/student-professor-conversation.png"),
              tags: ["Extension Expert", "Smooth Talker", "Time Bender"],
              extra: {
                location: "Professor's Office Hours",
                contact: "@needmoretime",
              },
            },
          ]

          const moreStudents = Array.from({ length: 20 }, (_, i) => ({
            id: i + 6,
            name: `Student ${i + 6}`,
            role: `Campus Character #${i + 6}`,
            bio: `Another hilarious student with their own unique quirks and study habits that somehow work for them.`,
            image: `/placeholder.svg?height=200&width=200&query=funny-student-${i + 6}`,
            tags: [`Skill${i + 6}`, `Quirk${i + 6}`],
            extra: {
              location: `Study Spot ${i + 6}`,
              contact: `@student${i + 6}`,
            },
          }))

          setCards(
            [...placeholderCards, ...moreStudents].map((card) => ({
              card,
              isOpened: false,
              randomPosition: generateRandomPosition(),
            })),
          )
        } else {
          const data: ProfileCard[] = await response.json()
          setCards(
            data.map((card) => ({
              card,
              isOpened: false,
              randomPosition: generateRandomPosition(),
            })),
          )
        }
      } catch (error) {
        console.error("Error loading cards:", error)
        const placeholderCards: ProfileCard[] = Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          name: `Student ${i + 1}`,
          role: `Campus Character ${i + 1}`,
          bio: `A funny student with unique study habits and campus adventures.`,
          image: `/placeholder.svg?height=200&width=200&query=student-${i + 1}`,
          tags: [`Skill${i + 1}`, `Quirk${i + 1}`],
        }))
        setCards(
          placeholderCards.map((card) => ({
            card,
            isOpened: false,
            binPosition: undefined,
          })),
        )
      }
    }

    loadCards()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(getAssetPath("/assets/sounds/unlock.mp3"))
      audioRef.current.volume = 0.3
    }
  }, [])

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % studentQuotes.length)
    }, 3000) // Each quote shows for 3 seconds

    return () => clearInterval(quoteInterval)
  }, [])

  useEffect(() => {
    const verticalInterval = setInterval(() => {
      setCurrentVerticalIndex((prev) => (prev + 1) % verticalQuotes.length)
    }, 5000) // Each vertical quote shows for 5 seconds

    return () => clearInterval(verticalInterval)
  }, [])

  useEffect(() => {
    const diagonalInterval = setInterval(() => {
      setCurrentDiagonalIndex((prev) => (prev + 1) % diagonalQuotes.length)
    }, 6000) // Each diagonal quote shows for 6 seconds

    return () => clearInterval(diagonalInterval)
  }, [])

  useEffect(() => {
    const topInterval = setInterval(() => {
      setCurrentTopIndex((prev) => (prev + 1) % topQuotes.length)
    }, 4500) // Each top quote shows for 4.5 seconds

    return () => clearInterval(topInterval)
  }, [])

  useEffect(() => {
    const intervals = [
      setInterval(() => setCurrentFlow1((prev) => (prev + 1) % textFlow1.length), 3200),
      setInterval(() => setCurrentFlow2((prev) => (prev + 1) % textFlow2.length), 3500),
      setInterval(() => setCurrentFlow3((prev) => (prev + 1) % textFlow3.length), 3800),
      setInterval(() => setCurrentFlow4((prev) => (prev + 1) % textFlow4.length), 4100),
      setInterval(() => setCurrentFlow5((prev) => (prev + 1) % textFlow5.length), 4400),
      setInterval(() => setCurrentFlow6((prev) => (prev + 1) % textFlow6.length), 4700),
      setInterval(() => setCurrentFlow7((prev) => (prev + 1) % textFlow7.length), 5000),
      setInterval(() => setCurrentFlow8((prev) => (prev + 1) % textFlow8.length), 5300),
      setInterval(() => setCurrentFlow9((prev) => (prev + 1) % textFlow9.length), 5600),
      setInterval(() => setCurrentFlow10((prev) => (prev + 1) % textFlow10.length), 5900),
    ]
    return () => intervals.forEach(clearInterval)
  }, [])

  const generateRandomPosition = () => {
    const margin = 5 // 5% margin from edges
    const centerExclusionZone = { x: 30, y: 30, width: 40, height: 40 } // Avoid center area

    let position
    let attempts = 0
    const maxAttempts = 10

    do {
      const areas = [
        // Top area - with margins
        { x: margin + Math.random() * (100 - 2 * margin), y: margin + Math.random() * 10 },
        // Bottom area - with margins
        { x: margin + Math.random() * (100 - 2 * margin), y: 85 + Math.random() * (100 - 85 - margin) },
        // Left side - with margins
        { x: margin + Math.random() * 10, y: margin + Math.random() * (100 - 2 * margin) },
        // Right side - with margins
        { x: 85 + Math.random() * (100 - 85 - margin), y: margin + Math.random() * (100 - 2 * margin) },
      ]
      position = areas[Math.floor(Math.random() * areas.length)]
      attempts++
    } while (
      attempts < maxAttempts &&
      position.x >= centerExclusionZone.x &&
      position.x <= centerExclusionZone.x + centerExclusionZone.width &&
      position.y >= centerExclusionZone.y &&
      position.y <= centerExclusionZone.y + centerExclusionZone.height
    )

    return position
  }

  const handleLogin = () => {
    if (loginForm.username === "yashxoxo" && loginForm.password === "yashg5577") {
      setIsAdmin(true)
      setShowLogin(false)
      setLoginForm({ username: "", password: "" })
    } else {
      alert("Invalid credentials!")
    }
  }

  const handleLogout = () => {
    setIsAdmin(false)
  }

  const saveEditedCard = () => {
    if (!editingCard) return

    setCards((prev) =>
      prev.map((cardState) => (cardState.card.id === editingCard.id ? { ...cardState, card: editingCard } : cardState)),
    )
    setEditingCard(null)
  }

  const playSound = () => {
    if (soundEnabled && audioRef.current && !prefersReducedMotion) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        // Ignore audio play errors
      })
    }
  }

  const getRandomUnopened = (): CardState | null => {
    const unopened = cards.filter((cardState) => !cardState.isOpened)
    if (unopened.length === 0) return null

    const randomIndex = Math.floor(Math.random() * unopened.length)
    return unopened[randomIndex]
  }

  const openRandomCard = () => {
    const randomCard = getRandomUnopened()
    if (!randomCard) return

    setShowRevealYourself(randomCard.card.id)
    setTimeout(() => {
      setShowRevealYourself(null)
      setSelectedCard(randomCard.card)
      playSound()
    }, 1500)
  }

  const closeCard = () => {
    if (!selectedCard) return

    setCards((prev) =>
      prev.map((cardState) =>
        cardState.card.id === selectedCard.id ? { ...cardState, isOpened: true, binPosition: openedCount } : cardState,
      ),
    )

    setOpenedCount((prev) => prev + 1)
    setSelectedCard(null)
  }

  const resetCards = () => {
    setCards((prev) =>
      prev.map((cardState) => ({
        ...cardState,
        isOpened: false,
        binPosition: undefined,
      })),
    )
    setOpenedCount(0)
  }

  const studentQuotes = [
    "My will to live decreases with every assignment.",
    "College: where dreams go to die slowly and painfully.",
    "I'm not procrastinating, I'm marinating in existential dread.",
    "My mental health is as stable as my WiFi during finals.",
    "Studying is just staring at books until you dissociate.",
    "My GPA is lower than my will to live.",
    "Finals week: where souls come to be harvested.",
    "I'm not failing, I'm just succeeding at disappointing my ancestors.",
    "Sleep deprivation is my only consistent relationship.",
    "My bank account and my sanity have one thing in common: they're both bankrupt.",
    "Group projects: where friendships go to die violent deaths.",
    "I have a PhD in overthinking and a masters in self-destruction.",
    "My life is like a multiple choice question where all answers lead to suffering.",
    "Caffeine is the only thing preventing my soul from leaving my body.",
    "I'm not antisocial, I'm just allergic to human interaction.",
    "My future is as bright as the void in my chest.",
    "Deadlines are just the universe's way of reminding me I'm mortal.",
    "I'm collecting mental breakdowns like they're rare trading cards.",
    "My therapist quit after hearing about my semester.",
    "I'm not lazy, I'm just conserving energy for my inevitable breakdown.",
    "Education: paying to slowly lose your sanity in installments.",
    "My degree will be printed on tissue paper because that's all it's worth.",
    "I'm majoring in disappointment with a minor in regret.",
    "College: where you pay $50k to learn you're unemployable.",
    "My student loans will outlive me and haunt my children.",
    "I'm not stressed, I'm just permanently vibrating at anxiety frequency.",
    "My brain cells are dropping out faster than my classmates.",
    "I've accepted that happiness is just a myth like work-life balance.",
    "My motivation died sophomore year and I'm still dragging its corpse.",
    "I'm not having a breakdown, I'm having a breakthrough... to rock bottom.",
  ]

  const bottomHeadlines = [
    
    "Every semester feels like a horror movie… especially when Anjali shows her GPA.",
    
    "Campus life is full of surprises… like Arushi actually bringing a pen to class once.",

    "Hostel alarms don't wake people up… but Harsh snoring surely does.",
    
    "Kartik's relationship status is like exam results… both disappoint his parents equally.",
    
    "Naimish is living proof that low attendance is a lifestyle, not a mistake.",
    
    "Nikhil's memory is like exam-time WiFi… slow, weak, and full of errors.",
    "Prachi's contribution in group projects is like hostel food's nutrition — invisible.",
    
    "Radhika's notes should be preserved in a museum… as an example of ancient handwriting.",
    
    "Sankalp opens his laptop in class… and the only thing running is Spotify.",
    "Evolution is slow, but Shantanu's assignments are slower.",
    
    "Uday and deadlines have one thing in common… both never arrive on time.",
    
    "If attraction was a brand, Vanshika would be its CEO.",
    
    "Teachers lock the attendance register because of legends like Nandan.",
    
    "Anjali's brain runs entirely on memes instead of neurons.",
    "Anushi once said she'll start studying tomorrow… that was three semesters ago.",
    
    "Daniya is not exactly useless… she still works as a warning example.",
  ]

  const textFlow1 = [
    "Academic suffering never ends",
    "Mental breakdown incoming",
    "Dreams officially dead",
    "SUDEEP GANGWAR",
    "SUMIT SAHU",
    "TAIYABA KHAN",
    "TANISHA SHARMA",
    "uday anand",
    "UJALA AGARWAL",
    "UTKARSH SHARMA",
    "UTKARSH YADAV",
    "VAIBHAV AGARWAL",
    "VAIBHAV AGARWAL",
    "VAIBHAV SAXENA",
    "vaibhav singh",
    "VANSHIKA SHARMA",
    "VASHVI PANDEY",
    "VIJAY ADHIKARI",
    "VISHAL SHARMA",
    "YASH AGARWAL",
    "YASH CHAUHAN",
    "YASH TRIPATHI",
    "Future cancelled permanently",
    "Daniya studies so little, even the library books don't recognize her face.",
  ]
  const textFlow2 = [
    "Coffee addiction is real",
    "Sleep is just a myth",
    "Procrastination is an art",
    "RITIKA SHARMA",
    "RIYA SAXENA",
    "SAMARTH GILL",
    "SAMEER CHAUHAN",
    "SANKALP TIWARI",
    "SANMITA BISWAS",
    "SARTHAK GAUR",
    "SARTHAK YADAV",
    "SATYAM KATIYAR",
    "SAUMYA GUPTA",
    "SAUMYA MISHRA",
    "SAURABH MAURYA",
    "SHANTANU SINGH CHAUHAN",
    "SHIVANSH GUPTA",
    "SNEHA GANGWAR",
    "SOUMYA WILSON",
    "SPARSH SHANKHDHAR",
    "Deadlines are suggestions",
    "Arushi failing exams isn't shocking anymore — it's part of the timetable.",
  ]
  const textFlow3 = [
    "GPA lower than expectations",
    "Student loans haunt forever",
    "PRACHI ADHIKARI",
    "PRACHI GANGWAR",
    "PRASHANT KUMAR",
    "PREETI SINGH",
    "PRIYAMVADA SHARMA",
    "PRIYANJAL SAXENA",
    "PRIYANSH PATEL",
    "PRIYANSH SAXENA",
    "PRIYANSHI",
    "radhika khanna",
    "RAHUL",
    "RAVI GANGWAR",
    "RISHAB VERMA",
    "RISHABH GANGWAR",
    "Textbooks cost more than rent",
    "Finals week = survival mode",
    "Vashvi's exam strategy is like a horror story: plotless, scary, and full of regrets.",
  ]
  const textFlow4 = [
    "Group projects = solo work",
    "Professors love pop quizzes",
    "Library becomes second home",
    "Ramen noodles daily diet",
    "Some people bunk classes, some attend… Anushi just exists in the attendance sheet margins.",
  ]
  const textFlow5 = [
    "Motivation died freshman year",
    "Senioritis hits sophomore year",
    "mohd azam",
    "MOHD FARHAN",
    "MOHD SAHIL WARSI",
    "MOHD SUBHAN ALAM",
    "muskan yaduvanshi",
    "NAIMISH GUPTA",
    "NANDAN BATRA",
    "NASEEM AHAMAD",
    "NAUSHEEN",
    "NIKHIL CHAUHAN",
    "NISCHAL AGARWAL",
    "NIVEDIKA SHARMA",
    "PANKHI GUPTA",
    "PARKHI",
    "PARTH SHARMA",
    "Every semester is hardest",
    "Graduation feels impossible",
    "When Nausheen opens her notes, even the dust sneezes.",
  ]
  const textFlow6 = [
    "Vanshika Sharma’s study plan is like a Bollywood remake — repeated, predictable, and still bad",
    "Coffee addiction is real",
    "Sleep is just a myth",
    "Procrastination is an art",
    "KASHISH SINGH",
    "KAVYANSH GUPTA",
    "KHUSHI",
    "khushi singhal",
    "KHYATI BORA",
    "KRITI",
    "KUSHAGRA PARASHARI",
    "KUSHAGRA SHARMA",
    "MADHAV SHARMA",
    "MANSI PATEL",
    "MOHAMMAD ASIF RAZA",
    "MOHAMMAD DANISH RAZA",
    "MOHAMMAD SHAZAN",
    "MOHD ADNAN AMIR",
    "MOHD AFZAL ANSARI",
    "Deadlines are suggestions",
    "Rishab in lectures is like a ghost — everyone knows he's enrolled, nobody's seen him.",
  ]
  const textFlow7 = [
    "Nikhil Chauhan’s career path is as blurry as a foggy morning in the hostel",
    "GPA lower than expectations",
    "Student loans haunt forever",
    "DHRUV JOHRI",
    "ENUB UZAIR",
    "GAURAV PRASAD",
    "GAURAV SHARMA",
    "GAURISHA AGARWAL",
    "GAUTAM DUA",
    "HARSH AGARWAL",
    "HARSHIT DIVYANSH SAXENA",
    "HARSHIT SHARMA",
    "harshita kamthan",
    "HIMANSHU GANGWAR",
    "ISHITA GOLA",
    "JATIN SINGH",
    "JUNAID KHAN",
    "KARTIK BISHT",
    "KASHISH FATIMA",
    "Textbooks cost more than rent",
    "Finals week = survival mode",
    "Soumya's exam sheet had so many blanks, even the teacher started filling Sudoku.",
  ]
  const textFlow8 = [
    "Priyansh Patel in viva looks more confused than Google search suggestions",
    "Group projects = solo work",    
    "ARUSHI SAXENA",
    "ASBAH REHMAN",
    "aSHUTOSH",
    "astitva jaiswal",
    "CHITRANSH SAXENA",
    "DANIYA NAVED SHAMSI",
    "DEV SAXENA",
    "DEV TANDON",
    "DHRUV AGARWAL",
    "Professors love pop quizzes",
    "Library becomes second home",
    "Ramen noodles daily diet",
    "Every class has a syllabus nobody understands… and that's basically Abhay.",
  ]
  const textFlow9 = [
    "Motivation died freshman year",
    "Senioritis hits sophomore year",
    "Every semester is hardest",
    "ANANYA GOND",
    "ANANYA MISRA",
    "ANJALI GUPTA",
    "anjali sharma",
    "ANMOL UPADHYAY",
    "ANMOL UPADHYAY",
    "anshika gupta",
    "Anupam gangwar",
    "anuradha rathour",
    "ANUSHI SAXENA",
    "ANUSHKA GUPTA",
    "ANUSHRI RAJPUT",
    "Graduation feels impossible",
    "Priyanshi studies like horror movies — once in a while, but mostly skipped.",
  ]
  const textFlow10 = [
    "Academic suffering never ends",
    "Mental breakdown incoming",
    "Dreams officially dead",    
    "ABHAY KUMAR",
    "ABHAY PANDEY",
    "abhay pratap singh",
    "ABHAY SINGH BHANDARI",
    "ABHAY VIKRAM SINGH",
    "ABHI JAISWAL",
    "ABHINAV MISHRA",
    "AKASH GUPTA",
    "AKSHAT KUMAR",
    "ALOK SINGH",
    "AMAN SAXENA",
    "AMJAD",
    "Future cancelled permanently",
    "Vaibhav treats exams like surprise parties — never prepared, always shocked.",
  ]

  const verticalQuotes = [
    "💀 Academic death is inevitable",
    "⚰️ Dreams buried in textbooks",
    "🔥 Burning through sanity daily",
    "💸 Money wasted on false hope",
    "😵 Brain cells committing suicide",
    "🌑 Future darker than void",
    "⏰ Time wasted, life ruined",
    "📚 Books = expensive doorstops",
    "🎓 Degree = participation trophy",
    "💊 Antidepressants not included",
    "🏃‍♂️ Running from responsibilities",
    "🤡 Clown college graduate",
    "🗑️ Trash tier existence",
    "⚡ Shocking how useless I am",
    "🎭 Pretending to have purpose",
  ]

  const diagonalQuotes = [
    "YES U choose this path of suffering - no doubt about it",
    "My parents' disappointment grows daily",
    "LinkedIn connections won't save you now",
    "Internships reject you faster than crushes",
    "Your resume is fiction at this point",
    "Skills: Professional failure, Expert procrastinator",
    "Career prospects: Non-existent to negative",
    "They say hostel WiFi is useless… but honestly, Abhay's signal is weaker.",
    "Job market: Closed for people like you",



    "Networking events: Where dreams go to die",
    "Interview anxiety has its own anxiety",
    "Kushagra doesn't need a career counselor, he needs Google Maps to find direction.",
    "References available upon request (good luck)",
    "Salary expectations: Just enough to survive",
    "Work experience: Mastering disappointment",
    "Portfolio: Collection of broken dreams",
    "When Harshit enters the lab, even the machines stop working — out of sympathy.",
    "Cover letters: Creative writing exercises",
  ]

  const topQuotes = [
  "ABHAY KUMAR",
  "ABHAY PANDEY",
  "abhay pratap singh",
  "ABHAY SINGH BHANDARI",
  "ABHAY VIKRAM SINGH",
  "ABHI JAISWAL",
  "ABHINAV MISHRA",
  "AKASH GUPTA",
  "AKSHAT KUMAR",
  "ALOK SINGH",
  "AMAN SAXENA",
  "AMJAD",
  "ANANYA GOND",
  "ANANYA MISRA",
  "ANJALI GUPTA",
  "anjali sharma",
  "ANMOL UPADHYAY",
  "ANMOL UPADHYAY",
  "anshika gupta",
  "Anupam gangwar",
  "anuradha rathour",
  "ANUSHI SAXENA",
  "ANUSHKA GUPTA",
  "ANUSHRI RAJPUT",
  "ARCHIT CHITRANSH",
  "ARUSHI SAXENA",
  "ASBAH REHMAN",
  "aSHUTOSH",
  "astitva jaiswal",
  "CHITRANSH SAXENA",
  "DANIYA NAVED SHAMSI",
  "DEV SAXENA",
  "DEV TANDON",
  "DHRUV AGARWAL",
  "DHRUV JOHRI",
  "ENUB UZAIR",
  "GAURAV PRASAD",
  "GAURAV SHARMA",
  "GAURISHA AGARWAL",
  "GAUTAM DUA",
  "HARSH AGARWAL",
  "HARSHIT DIVYANSH SAXENA",
  "HARSHIT SHARMA",
  "harshita kamthan",
  "HIMANSHU GANGWAR",
  "ISHITA GOLA",
  "JATIN SINGH",
  "JUNAID KHAN",
  "KARTIK BISHT",
  "KASHISH FATIMA",
  "KASHISH SINGH",
  "KAVYANSH GUPTA",
  "KHUSHI",
  "khushi singhal",
  "KHYATI BORA",
  "KRITI",
  "KUSHAGRA PARASHARI",
  "KUSHAGRA SHARMA",
  "MADHAV SHARMA",
  "MANSI PATEL",
  "MOHAMMAD ASIF RAZA",
  "MOHAMMAD DANISH RAZA",
  "MOHAMMAD SHAZAN",
  "MOHD ADNAN AMIR",
  "MOHD AFZAL ANSARI",
  "mohd azam",
  "MOHD FARHAN",
  "MOHD SAHIL WARSI",
  "MOHD SUBHAN ALAM",
  "muskan yaduvanshi",
  "NAIMISH GUPTA",
  "NANDAN BATRA",
  "NASEEM AHAMAD",
  "NAUSHEEN",
  "NIKHIL CHAUHAN",
  "NISCHAL AGARWAL",
  "NIVEDIKA SHARMA",
  "PANKHI GUPTA",
  "PARKHI",
  "PARTH SHARMA",
  "PRACHI ADHIKARI",
  "PRACHI GANGWAR",
  "PRASHANT KUMAR",
  "PREETI SINGH",
  "PRIYAMVADA SHARMA",
  "PRIYANJAL SAXENA",
  "PRIYANSH PATEL",
  "PRIYANSH SAXENA",
  "PRIYANSHI",
  "radhika khanna",
  "RAHUL",
  "RAVI GANGWAR",
  "RISHAB VERMA",
  "RISHABH GANGWAR",
  "RITIKA SHARMA",
  "RIYA SAXENA",
  "SAMARTH GILL",
  "SAMEER CHAUHAN",
  "SANKALP TIWARI",
  "SANMITA BISWAS",
  "SARTHAK GAUR",
  "SARTHAK YADAV",
  "SATYAM KATIYAR",
  "SAUMYA GUPTA",
  "SAUMYA MISHRA",
  "SAURABH MAURYA",
  "SHANTANU SINGH CHAUHAN",
  "SHIVANSH GUPTA",
  "SNEHA GANGWAR",
  "SOUMYA WILSON",
  "SPARSH SHANKHDHAR",
  "SUDEEP GANGWAR",
  "SUMIT SAHU",
  "TAIYABA KHAN",
  "TANISHA SHARMA",
  "uday anand",
  "UJALA AGARWAL",
  "UTKARSH SHARMA",
  "UTKARSH YADAV",
  "VAIBHAV AGARWAL",
  "VAIBHAV AGARWAL",
  "VAIBHAV SAXENA",
  "vaibhav singh",
  "VANSHIKA SHARMA",
  "VASHVI PANDEY",
  "VIJAY ADHIKARI",
  "VISHAL SHARMA",
  "YASH AGARWAL",
  "YASH CHAUHAN",
  "YASH TRIPATHI"
]


  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden z-50">
        {/* Prison Bars Container */}
        <div className="relative w-full h-full flex justify-center items-center">
          {/* Loading Text */}
          <div className="absolute z-10 text-4xl font-bold text-white animate-pulse">SRMS CET CS HONOR STUDENTS</div>

          {/* Prison Bars */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-10 h-full bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 shadow-2xl ${
                prefersReducedMotion ? "opacity-100" : "animate-[prisonBar_3s_ease-in-out_forwards]"
              }`}
              style={{
                left: `${i * 10}%`,
                animationDelay: `${1 + i * 0.1}s`,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.7)",
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes prisonBar {
            0% { 
              transform: scaleY(0);
              opacity: 0;
            }
            50% {
              transform: scaleY(1);
              opacity: 1;
            }
            100% { 
              transform: scaleY(0);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white p-4 relative overflow-hidden">
      {/* Horizontal center text (existing) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute whitespace-nowrap text-lg font-medium text-red-300/70 ${
            prefersReducedMotion ? "opacity-30" : "animate-[slideText_15s_linear_infinite]"
          }`}
          style={{ top: "50%", zIndex: 1 }}
        >
          {studentQuotes[currentQuoteIndex]}
        </div>
      </div>

      {/* Text Flow 1 - Top horizontal */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute whitespace-nowrap text-lg font-medium text-red-300/70 ${
            prefersReducedMotion ? "opacity-30" : "animate-[slideText_15s_linear_infinite]"
          }`}
          style={{ top: "8%", zIndex: 1 }}
        >
          {textFlow1[currentFlow1]}
        </div>
      </div>

      {/* Text Flow 2 - Upper middle horizontal */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute whitespace-nowrap text-base font-bold text-orange-400/60 ${
            prefersReducedMotion ? "opacity-30" : "animate-[slideText_14s_linear_infinite]"
          }`}
          style={{ top: "18%", zIndex: 1 }}
        >
          {textFlow2[currentFlow2]}
        </div>
      </div>

      {/* Text Flow 3 - Center horizontal */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute whitespace-nowrap text-lg font-semibold text-yellow-400/60 ${
            prefersReducedMotion ? "opacity-30" : "animate-[slideText_16s_linear_infinite]"
          }`}
          style={{ top: "28%", zIndex: 1 }}
        >
          {textFlow3[currentFlow3]}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute whitespace-nowrap text-base font-bold text-green-400/60 ${
            prefersReducedMotion ? "opacity-30" : "animate-[slideText_12s_linear_infinite]"
          }`}
          style={{ top: "38%", zIndex: 1 }}
        >
          {textFlow6[currentFlow6]}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute whitespace-nowrap text-base font-semibold text-pink-400/50 ${
            prefersReducedMotion ? "opacity-30" : "animate-[slideText_18s_linear_infinite]"
          }`}
          style={{ top: "48%", zIndex: 1 }}
        >
          {textFlow7[currentFlow7]}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute whitespace-nowrap text-sm font-medium text-indigo-400/50 ${
            prefersReducedMotion ? "opacity-30" : "animate-[slideText_20s_linear_infinite]"
          }`}
          style={{ top: "58%", zIndex: 1 }}
        >
          {textFlow8[currentFlow8]}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute whitespace-nowrap text-sm font-semibold text-teal-400/50 ${
            prefersReducedMotion ? "opacity-30" : "animate-[slideText_22s_linear_infinite]"
          }`}
          style={{ top: "68%", zIndex: 1 }}
        >
          {textFlow9[currentFlow9]}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute whitespace-nowrap text-base font-bold text-amber-400/40 ${
            prefersReducedMotion ? "opacity-30" : "animate-[slideText_24s_linear_infinite]"
          }`}
          style={{ top: "78%", zIndex: 1 }}
        >
          {textFlow10[currentFlow10]}
        </div>
      </div>

      {/* Text Flow 4 - Lower middle horizontal */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute whitespace-nowrap text-base font-medium text-purple-400/50 ${
            prefersReducedMotion ? "opacity-30" : "animate-[slideText_26s_linear_infinite]"
          }`}
          style={{ top: "88%", zIndex: 1 }}
        >
          {textFlow4[currentFlow4]}
        </div>
      </div>

      {/* Text Flow 5 - Lower horizontal */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute whitespace-nowrap text-lg font-bold text-cyan-400/50 ${
            prefersReducedMotion ? "opacity-30" : "animate-[slideText_28s_linear_infinite]"
          }`}
          style={{ top: "98%", zIndex: 1 }}
        >
          {textFlow5[currentFlow5]}
        </div>
      </div>

      <div className="fixed top-4 left-4 z-40">
        <Button
          onClick={() => setShowClickContent(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 py-2 rounded-full shadow-lg animate-pulse"
        >
          About
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-40 flex gap-2">
        {!isAdmin ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLogin(true)}
            className="bg-white/20 border-white/30 hover:bg-white/30 text-white"
          >
            Admin
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="bg-red-500/20 border-red-300/30 hover:bg-red-500/30 text-white"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="bg-white/20 border-white/30 hover:bg-white/30 text-white"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetCards}
          className="bg-white/20 border-white/30 hover:bg-white/30 text-white"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden z-30">
        {bottomHeadlines.map((headline, index) => (
          <div
            key={index}
            className={`absolute whitespace-nowrap text-lg font-bold text-yellow-300/80 ${
              prefersReducedMotion ? "opacity-50" : ""
            }`}
            style={{
              top: `${(index % 7) * 12 + 5}%`, // Distribute across 7 vertical positions
              animationName: prefersReducedMotion ? "none" : "slideBottomText",
              animationDuration: `${15 + (index % 10) * 2}s`, // Random speeds from 15s to 33s
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `${index * 0.8}s`, // Stagger start times
              zIndex: 30,
            }}
          >
            🔥 {headline} 🔥
          </div>
        ))}
      </div>

      {cards.map((cardState) => (
        <div
          key={cardState.card.id}
          className={`fixed w-16 h-20 cursor-pointer z-20 ${prefersReducedMotion ? "" : "animate-[cardFloat_4s_ease-in-out_infinite]"}`}
          style={{
            left: `${Math.min(Math.max(cardState.randomPosition?.x || 0, 2), 94)}%`, // Keep between 2% and 94%
            top: `${Math.min(Math.max(cardState.randomPosition?.y || 0, 2), 90)}%`, // Keep between 2% and 90%
            animationDelay: `${cardState.card.id * 0.2}s`,
          }}
          onClick={() => setSelectedCard(cardState.card)}
        >
          <Card className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-green-300 hover:scale-110 transition-all duration-300 shadow-lg">
            <CardContent className="h-full flex items-center justify-center p-1">
              <div className="text-xs font-bold text-white text-center">
                {showRevealYourself === cardState.card.id ? (
                  <div className="animate-pulse text-yellow-300 text-[10px]">Picking Student</div>
                ) : (
                  "🎓"
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      {showRevealYourself && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="text-6xl font-bold text-yellow-300 animate-[revealPulse_1s_ease-in-out]">
            Picking Student
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto py-8 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-red-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
            💀 SRMS FINAL YR CS 💀
          </h1>
          <p className="text-xl text-center text-red-200/80 mb-8">
            Your friend could be here, or better You might found found YOURSELF
          </p>

          <div className="relative">
            <Card
              className={`w-80 h-80 bg-gradient-to-br from-red-600 via-black to-gray-800 border-4 border-red-500 cursor-pointer transition-all duration-300 ${
                prefersReducedMotion ? "" : "hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30"
              }`}
              onClick={cards.filter((cardState) => !cardState.isOpened).length > 0 ? openRandomCard : undefined}
            >
              <CardContent className="h-full flex flex-col items-center justify-center p-8">
                <div className="text-6xl mb-4">⚰️</div>
                <div className="text-3xl font-bold mb-2 text-white">
                  {cards.filter((cardState) => !cardState.isOpened).length}
                </div>
                <div className="text-lg text-red-200 mb-4 font-semibold">Broken Dreams</div>
                <div className="text-sm text-red-300 text-center">
                  Despair Level: {openedCount} / {cards.length} SRMS CS1 Blessed Students
                </div>
                {cards.filter((cardState) => !cardState.isOpened).length === 0 && (
                  <div className="text-red-400 font-bold mt-4 text-lg animate-bounce">
                    🔥 TOTAL ANNIHILATION COMPLETE! 🔥
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {isAdmin && (
          <div className="mb-8 bg-black/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-yellow-300">🔧 MY Panel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((cardState) => (
                <Card key={cardState.card.id} className="bg-white/10 border-white/20">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white">{cardState.card.name}</h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingCard(cardState.card)}
                        className="text-yellow-300 hover:text-yellow-100"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-white/70">{cardState.card.role}</p>
                    <p className="text-xs text-white/50 mt-1">{cardState.card.bio.substring(0, 50)}...</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {cards.filter((cardState) => cardState.isOpened).length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-red-200">
              ⚰️ Cemetery of Shattered Dreams ({cards.filter((cardState) => cardState.isOpened).length}) ⚰️
            </h2>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3 max-w-4xl mx-auto">
              {cards
                .filter((cardState) => cardState.isOpened)
                .map((cardState, index) => (
                  <div
                    key={cardState.card.id}
                    className="aspect-square bg-gradient-to-br from-gray-600 to-black border-2 border-red-500 text-white shadow-lg rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer hover:scale-105"
                    onClick={() => setSelectedCard(cardState.card)}
                  >
                    💀
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full bg-white">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Not Your Place</h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                />
                <div className="flex gap-2">
                  <Button onClick={handleLogin} className="flex-1">
                    Begin
                  </Button>
                  <Button variant="outline" onClick={() => setShowLogin(false)}>
                    close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedCard && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={closeCard}>
          <Card
            className={`max-w-md w-full bg-gradient-to-br from-gray-800 via-red-900 to-black border-4 border-red-500 text-white ${
              prefersReducedMotion ? "" : "animate-[popIn_0.3s_ease-out]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-red-400 mb-1">{selectedCard.name}</h3>
                  <p className="text-orange-300 text-sm font-semibold bg-red-900/50 px-2 py-1 rounded-full inline-block">
                    {selectedCard.role}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={closeCard} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="mb-4">
                <img
                  src={selectedCard.image || getAssetPath("/placeholder.svg")}
                  alt={selectedCard.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-red-500 shadow-lg grayscale"
                  loading="lazy"
                />
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed bg-gray-800/50 p-3 rounded-lg border-l-4 border-red-500">
                {selectedCard.bio}
              </p>

              {selectedCard.tags && selectedCard.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedCard.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-red-600 to-black text-red-200 text-xs rounded-full font-semibold shadow-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCard.extra && (
                <div className="text-sm text-gray-400 space-y-2 bg-gray-900/50 p-3 rounded-lg">
                  {selectedCard.extra.location && (
                    <div className="flex items-center gap-2">
                      <span>🪦</span>
                      <span className="font-medium">{selectedCard.extra.location}</span>
                    </div>
                  )}
                  {selectedCard.extra.contact && (
                    <div className="flex items-center gap-2">
                      <span>💀</span>
                      <span className="font-medium">{selectedCard.extra.contact}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {showClickContent && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setShowClickContent(false)}
        >
          <Card
            className="max-w-md w-full bg-gradient-to-br from-purple-900 to-pink-900 border-4 border-purple-500 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-purple-300">THIS ALL CONTENT I MADE BY AI SO FUCK AI FOR EVERYTHING.</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowClickContent(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="text-center">
                <p className="text-lg text-purple-200 mb-4">If you'r not in in the page you will be soon</p>
                <p className="text-sm text-purple-300/70">
                  Inspired by Great Mind - <span className="font-medium">yours Truely - TENKEFUMA</span>
               </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <style jsx>{`
        @keyframes slideText {
          0% { 
            transform: translateX(100vw); 
          }
          100% { 
            transform: translateX(-100%); 
          }
        }
        @keyframes slideBottomText {
          0% { 
            transform: translateX(100vw); 
          }
          100% { 
            transform: translateX(-100%); 
          }
        }
      `}</style>
    </div>
  )
}
