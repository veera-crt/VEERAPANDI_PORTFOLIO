// Initialize particles.js
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#6c5ce7",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#6c5ce7",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  }
})

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle")
const body = document.body

// Check if user has a saved preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  body.classList.add("dark-theme")
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme")

  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.setItem("theme", "light")
  }
})

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle")
const nav = document.querySelector("nav")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show")
    menuToggle.classList.toggle("active")
  })
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (nav && nav.classList.contains("show") && !e.target.closest("nav") && !e.target.closest(".menu-toggle")) {
    nav.classList.remove("show")
    menuToggle.classList.remove("active")
  }
})

// Tabs System
const tabBtns = document.querySelectorAll(".tab-btn")
const tabPanes = document.querySelectorAll(".tab-pane")

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and panes
    tabBtns.forEach((b) => b.classList.remove("active"))
    tabPanes.forEach((p) => p.classList.remove("active"))

    // Add active class to clicked button and corresponding pane
    btn.classList.add("active")
    const tabId = btn.getAttribute("data-tab")
    document.getElementById(tabId).classList.add("active")
  })
})

// Accordion
const accordionHeaders = document.querySelectorAll(".accordion-header")

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement

    // Close all other accordion items
    const allItems = document.querySelectorAll(".accordion-item")
    allItems.forEach((item) => {
      if (item !== accordionItem && item.classList.contains("active")) {
        item.classList.remove("active")
      }
    })

    // Toggle current item
    accordionItem.classList.toggle("active")
  })
})

// Filter functionality for lab experiments
const filterBtns = document.querySelectorAll(".filter-btn")
const accordionItems = document.querySelectorAll(".accordion-item")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    // Get filter value
    const filter = btn.getAttribute("data-filter")

    // Filter accordion items
    accordionItems.forEach((item) => {
      if (filter === "all") {
        item.style.display = "block"
      } else {
        const itemType = item.getAttribute("data-type")
        if (itemType === filter) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      }
    })

    // Close all accordion items
    accordionItems.forEach((item) => {
      item.classList.remove("active")
    })

    // Open the first visible item
    const visibleItems = Array.from(accordionItems).filter((item) => item.style.display !== "none")

    if (visibleItems.length > 0) {
      visibleItems[0].classList.add("active")
    }
  })
})

// Back to Top Button
const backToTopBtn = document.getElementById("backToTopBtn")

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.opacity = "1"
    backToTopBtn.style.transform = "scale(1)"
    backToTopBtn.style.pointerEvents = "auto"
  } else {
    backToTopBtn.style.opacity = "0"
    backToTopBtn.style.transform = "scale(0.8)"
    backToTopBtn.style.pointerEvents = "none"
  }
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Animate stats counter
const statValues = document.querySelectorAll(".stat-value")

function animateCounter(el) {
  const target = Number.parseInt(el.getAttribute("data-count"))
  const duration = 2000 // 2 seconds
  const step = target / (duration / 16) // 60fps
  let current = 0

  const timer = setInterval(() => {
    current += step
    if (current >= target) {
      clearInterval(timer)
      el.textContent = target
    } else {
      el.textContent = Math.floor(current)
    }
  }, 16)
}

// Intersection Observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("stat-value")) {
          animateCounter(entry.target)
        } else {
          entry.target.classList.add("animate")
        }
        observer.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.1,
  },
)

// Observe elements for animation
statValues.forEach((stat) => {
  observer.observe(stat)
})

// Observe sections for animation
const sections = document.querySelectorAll(".section, .concept-section, .accordion-item")
sections.forEach((section) => {
  observer.observe(section)
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const headerHeight = document.querySelector("header").offsetHeight
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      if (nav && nav.classList.contains("show")) {
        nav.classList.remove("show")
        menuToggle.classList.remove("active")
      }
    }
  })
})

// Scroll Spy for Active Link Highlighting
const navLinks = document.querySelectorAll("nav a")
const scrollSections = document.querySelectorAll("section[id]")

const scrollSpyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id")

        // Remove active class from all links
        navLinks.forEach((link) => {
          link.classList.remove("active")
        })

        // Add active class to corresponding link
        const activeLink = document.querySelector(`nav a[href="#${id}"]`)
        if (activeLink) {
          activeLink.classList.add("active")
        }
      }
    })
  },
  {
    rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the middle of viewport
    threshold: 0
  }
)

scrollSections.forEach((section) => {
  scrollSpyObserver.observe(section)
})

// Chat Box Functionality
const chatBtn = document.getElementById("chatBtn")
const chatWindow = document.getElementById("chatWindow")
const chatClose = document.getElementById("chatClose")
const chatInput = document.getElementById("chatInput")
const chatSend = document.getElementById("chatSend")
const chatMessages = document.getElementById("chatMessages")

// API Configuration
const GEMINI_API_KEY = "AIzaSyCaYbH3dq8PgIY7PK1COiAGMEu_raA6nxI";
let portfolioContext = "";
let staticContext = "";

// 1. Fetch static detailed data (Certificates, Experience, etc.)
fetch('portfolio_data.txt')
  .then(response => response.text())
  .then(text => {
    staticContext = text;
    updatePortfolioContext(); // Update combined context
  })
  .catch(error => console.error("Error loading portfolio context:", error));

// 2. Function to extract text from the website (Live Data)
function updatePortfolioContext() {
  const sections = ['home', 'about', 'resume', 'projects', 'contact'];
  let liveContent = "=== LIVE WEBSITE CONTENT ===\n";

  sections.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      const text = element.innerText.replace(/\s+/g, ' ').trim();
      liveContent += `[Section: ${id.toUpperCase()}]\n${text}\n\n`;
    }
  });

  const skills = document.querySelector('.skills-marquee');
  if (skills) {
    const skillText = skills.innerText.replace(/\s+/g, ' ').trim();
    liveContent += `[Section: SKILLS]\n${skillText}\n\n`;
  }

  // Combine Static File + Live Website
  portfolioContext = `
    ${staticContext}

    ${liveContent}
  `;

  console.log("Portfolio context updated (Static + Live).");
}

// Call immediately to scrape what's available
updatePortfolioContext();

if (chatBtn) {
  chatBtn.addEventListener("click", () => {
    chatWindow.classList.add("active")
    chatBtn.style.display = "none"
    updatePortfolioContext(); // Refresh live data on open
  })
}

if (chatClose) {
  chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("active")
    chatBtn.style.display = "flex"
  })
}

function addMessage(text, sender) {
  const messageDiv = document.createElement("div")
  messageDiv.classList.add("message", sender)

  // Simple markdown parsing for bold text
  const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  const p = document.createElement("p")
  p.innerHTML = formattedText

  messageDiv.appendChild(p)
  chatMessages.appendChild(messageDiv)

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight
}

async function getGeminiResponse(userMessage) {
  // Using gemini-flash-latest for fastest response time
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `
    You are Veeru, a highly intelligent, kind, and impressive AI assistant for Veerapandi G.
    
    YOUR INSTRUCTIONS:
    1. **Primary Goal**: Answer the user's question helpfully and impressively.
    2. **Context Use**: You have access to detailed information about Veerapandi below (Context). 
       - If the user asks about Veerapandi, his projects, skills, experience, or certificates, USE THIS CONTEXT to provide a specific, accurate answer.
    3. **General Knowledge**: If the user asks a question that is NOT about Veerapandi (e.g., "What is React?", "How do I cook pasta?", "Explain Quantum Physics"), **YOU MUST ANSWER IT** using your own vast general knowledge. Do NOT say "I don't know" just because it's not in the portfolio.
    4. **Tone**: Be enthusiastic, polite, professional, and engaging. Use emojis. 🚀
    
    === WEBSITE NAVIGATION POWER ===
    You have the power to scroll the website to specific sections!
    If the user asks to see a section, use the command: [NAVIGATE: section_id]
    
    Available Section IDs:
    - home
    - about
    - resume (General resume section)
    - education (Specifically switches to Education tab)
    - experience (Specifically switches to Experience tab)
    - certificates (Specifically switches to Certificates tab)
    - projects
    - contact
    
    Example:
    User: "Show me his experience."
    Veeru: "Here is Veerapandi's professional experience. 💼 [NAVIGATE: experience]"
    
    === SEND MESSAGE POWER ===
    If the user provides their Name, Email, and Message and asks you to send it to Veerapandi, you can do it!
    Command Format: [SEND_MESSAGE: {"name": "User Name", "email": "user@email.com", "message": "The message content"}]
    
    Example:
    User: "My name is John, email is john@test.com. Tell Veera I love his work!"
    Veeru: "I've sent that message to Veerapandi right away! 📨 [SEND_MESSAGE: {"name": "John", "email": "john@test.com", "message": "Tell Veera I love his work!"}]"
    
    === CONTEXT ABOUT VEERAPANDI ===
    ${portfolioContext}
    ================================
    
    User Question: ${userMessage}
  `;

  const requestBody = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("API Error:", data);
      return "I'm having trouble connecting to my brain right now. Please try again later.";
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return "Sorry, I encountered a network error. Please check your connection.";
  }
}

async function handleSend() {
  const text = chatInput.value.trim()
  if (text) {
    addMessage(text, "user")
    chatInput.value = ""

    // Show typing indicator (animated)
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot");
    typingDiv.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Get response from Gemini
    let response = await getGeminiResponse(text);

    // Remove typing indicator
    chatMessages.removeChild(typingDiv);

    // 1. Check for Navigation Command
    const navRegex = /\[NAVIGATE: (\w+)\]/;
    const navMatch = response.match(navRegex);

    if (navMatch) {
      const target = navMatch[1];
      let sectionId = target;

      // Handle specific tab navigation
      if (['education', 'experience', 'certificates'].includes(target)) {
        sectionId = 'resume'; // Scroll to resume section first

        // Wait for scroll then click tab
        setTimeout(() => {
          const tabBtn = document.querySelector(`.tab-btn[data-tab="${target}"]`);
          if (tabBtn) {
            tabBtn.click();
            console.log(`Switched to tab: ${target}`);
          }
        }, 800);
      }

      const section = document.getElementById(sectionId);

      if (section) {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        response = response.replace(navRegex, '').trim();
      }
    }

    // 2. Check for Send Message Command
    // Improved regex to handle potential newlines or loose formatting
    const msgRegex = /\[SEND_MESSAGE:\s*({[\s\S]*?})\]/;
    const msgMatch = response.match(msgRegex);

    if (msgMatch) {
      try {
        const jsonStr = msgMatch[1].replace(/'/g, '"'); // Try to fix single quotes if present
        const msgData = JSON.parse(jsonStr);

        // Send to Formspree
        fetch("https://formspree.io/f/xnnezjwg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(msgData)
        })
          .then(res => {
            if (res.ok) {
              addMessage("✅ Message sent successfully to Veerapandi!", "bot");
            } else {
              addMessage("❌ Failed to send message. Please try the contact form.", "bot");
            }
          })
          .catch(err => {
            console.error(err);
            addMessage("❌ Error sending message.", "bot");
          });

        response = response.replace(msgRegex, '').trim();

      } catch (e) {
        console.error("Error parsing message JSON", e);
        // Don't hide the error from the user entirely, maybe just log it
      }
    }

    if (response) {
      addMessage(response, "bot");
    }
  }
}

if (chatSend) {
  chatSend.addEventListener("click", handleSend)
}

if (chatInput) {
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSend()
    }
  })
}

// Infinite Random Marquee
const techWords = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Node.js", "Express.js", "Flask", "Python", "Java",
  "SQL", "PostgreSQL", "MySQL", "Supabase", "RESTful APIs", "GraphQL", "Git", "GitHub", "Docker", "Linux",
  "Cybersecurity", "Ethical Hacking", "Vulnerability Assessment", "Penetration Testing (Pentest)", "Network Security",
  "Web Application Security", "OWASP Top 10", "Firewalls", "Encryption", "SSL/TLS", "Authentication", "Authorization",
  "Multi-Factor Authentication (MFA)", "Threat Modeling", "Risk Assessment", "Incident Response", "SOC (Security Operations Center)",
  "IAM (Identity & Access Management)", "GRC", "ISO 27001", "ISO 27005", "Risk Management", "Compliance Auditing",
  "Security Policies", "Data Governance", "Control Frameworks", "Policy Enforcement", "Security Awareness", "Internal Controls",
  "Audit Logs", "Business Continuity", "Regulatory Compliance", "Agile & Scrum", "DevOps", "Cloud Security (AWS / Azure / GCP)",
  "CI/CD Pipelines", "Encryption Standards (AES, RSA)", "Logging & Monitoring", "Secure Coding Practices", "Threat Intelligence"
];

function startInfiniteMarquee(rowSelector, speed, direction) {
  const row = document.querySelector(rowSelector);
  if (!row) return;

  // Create a moving track
  const track = document.createElement('div');
  track.style.display = 'flex';
  track.style.position = 'absolute';
  track.style.left = '0';
  track.style.top = '0';
  track.style.whiteSpace = 'nowrap';
  track.style.willChange = 'transform';
  row.appendChild(track);

  // Helper to add random word
  function addRandomWord(parent, prepend = false) {
    const word = techWords[Math.floor(Math.random() * techWords.length)].toUpperCase();
    const span = document.createElement('span');
    span.style.fontSize = '8rem';
    span.textContent = word;
    span.style.paddingRight = "2rem";
    // Styles are handled in CSS mostly, but we can enforce some if needed

    if (prepend) {
      parent.insertBefore(span, parent.firstChild);
    } else {
      parent.appendChild(span);
    }
    return span;
  }

  // Initial Fill
  let safety = 0;
  while (track.offsetWidth < window.innerWidth * 2 && safety < 100) {
    addRandomWord(track);
    safety++;
  }

  let position = direction === 'left' ? 0 : -track.offsetWidth + window.innerWidth;
  let lastTime = performance.now();

  function animate(currentTime) {
    const delta = currentTime - lastTime;
    lastTime = currentTime;

    if (delta > 100) {
      requestAnimationFrame(animate);
      return;
    }

    const move = (speed * delta) / 1000; // pixels per frame

    if (direction === 'left') {
      position -= move;

      if (track.offsetWidth + position < window.innerWidth * 1.5) {
        addRandomWord(track);
      }

      const firstItem = track.firstElementChild;
      if (firstItem) {
        const width = firstItem.offsetWidth;
        if (position < -width) {
          position += width;
          track.removeChild(firstItem);
        }
      }
    } else {
      position += move;

      // Check if we need to add content to the left
      // As the track moves right (position increases), we need to prepend words
      // if the left edge (position) becomes visible ( > -buffer)
      if (position > -200) { // Buffer of 200px
        const newWord = addRandomWord(track, true);
        // Adjust position to keep visual continuity
        // When we prepend, the track width increases, shifting everything right.
        // We must subtract the new width from position to counteract this.
        position -= newWord.offsetWidth;
      }

      // Check if last item is off screen (right side)
      // If track width + position is huge, prune from right
      // Actually, for right scroll, we prune if the last item is way off screen
      // The right edge of the track is at `position + track.offsetWidth`
      // If `position + track.offsetWidth` is way larger than window width, prune.
      if (track.offsetWidth > window.innerWidth * 3) {
        track.removeChild(track.lastElementChild);
      }
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// Start Marquees
window.addEventListener("load", () => {
  startInfiniteMarquee('.tech-scroller.row-1', 400, 'left');
  startInfiniteMarquee('.tech-scroller.row-2', 400, 'right');
});
/* 3D Tilt Effect for Resume Items */
document.addEventListener('DOMContentLoaded', () => {
  const resumeItems = document.querySelectorAll('.resume-item, .project-card');

  resumeItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate rotation based on mouse position
      // Max rotation: 3deg (Reduced from 10)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
});
