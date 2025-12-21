    window.addEventListener("DOMContentLoaded", () => {
      const intro = document.getElementById("intro");
      const img = document.getElementById("intro-img");

      // Lock scrolling during intro
      document.body.style.overflow = "hidden";

      // CHANGE: Duration in milliseconds (4500 = 4.5 seconds)
      const TOTAL_DURATION = 5000; // Total time intro shows
      const FADE_DURATION = 300;   // Fade out duration (last 0.5 seconds)

      // When image loads, start timer
      img.onload = () => {
        setTimeout(() => {
          intro.classList.add("fade-out"); // Start fade out

          // Remove intro after fade completes
          setTimeout(() => {
            intro.remove();
            document.body.style.overflow = "auto"; // Restore scrolling
          }, FADE_DURATION);

        }, TOTAL_DURATION - FADE_DURATION);
      };

      // If image fails to load, remove intro immediately
      img.onerror = () => {
        intro.remove();
        document.body.style.overflow = "auto";
      };
    });

    /* ===============================
       TIMELINE TOGGLE DETAILS
       Expands/collapses experience details on click
       =============================== */
    
    function toggleDetails(element) {
      // Toggle 'active' class on clicked item
      element.classList.toggle("active");
      
      // Get the details div
      const details = element.querySelector(".details");
      if (details) {
        // If active, set max-height to content height; otherwise collapse
        details.style.maxHeight = element.classList.contains("active")
          ? `${details.scrollHeight}px`
          : null;
      }
    }

    /* ===============================
       TIMELINE LINE POSITIONING
       Dynamically positions vertical line based on timeline dots
       =============================== */
    
    function positionTimelineLine() {
      const container = document.querySelector(".timeline-container");
      const line = document.querySelector(".timeline-line");
      const items = document.querySelectorAll(".timeline-item");

      if (!container || !line || items.length === 0) return;

      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      const firstDot = items[0].querySelector(".timeline-dot");
      const lastDot = items[items.length - 1].querySelector(".timeline-dot");

      if (!firstDot || !lastDot) return;

      // Calculate positions relative to container
      const firstOffset =
        firstDot.getBoundingClientRect().top +
        window.scrollY -
        containerTop +
        firstDot.offsetHeight / 2;

      const lastOffset =
        lastDot.getBoundingClientRect().top +
        window.scrollY -
        containerTop +
        lastDot.offsetHeight / 2;

      // Set line position and height
      line.style.top = `${firstOffset}px`;
      line.style.height = `${lastOffset - firstOffset}px`;
    }

    // Run on load and resize
    positionTimelineLine();
    window.addEventListener("resize", positionTimelineLine);

    /* ===============================
       PROJECT GALLERY IMAGE LOADING
       Populates gallery with images after page load
       DO NOT CHANGE: Image filenames
       =============================== */
    
   const imageNames = [
  "1*3IcLSFuT8PQg4cUBaRXH1A.png",
  "1*TpKqKWq1YokFOBB8FTqmwQ.jpg",
  "66e797_7dcffb33708647fb8a4470252eae476b~mv2.jpg.avif",
  "68747470733a2f2f6465762d746f2d75706c6f6164732e73332e616d617a6f6e6177732e636f6d2f75706c6f6164732f61727469636c65732f367473776876366e3179657167797930386367762e706e67.png",
  "algorithms-17-00501-g001.png",
  "algorithms-17-00501-g003.png",
  "alpaca_broker_logo.png",
  "Architecture-of-RAY.webp",
  "C_Logo.png",
  "compute_cluster.png",
  "HDFS-Architecture (1).webp",
  "high-performance-computing-use-cases-diagram.png",
  "hpc-architecture-explained-diagram.png",
  "images-2.png",
  "images.png",
  "ISO_C++_Logo.svg.png",
  "ml-e1610553826718.jpg",
  "RankFi.png",
  "Reinforcement-Learning-in-ML-TV.jpg.webp",
  "SS1.jpeg",
  "SS2.jpeg",
  "SS3.jpeg",
  "small_ray_1a3cbe4013.jpg.webp"
];


const galleryTrack = document.getElementById("gallery-track");

    if (galleryTrack) {
      // Load images immediately - no delay
      imageNames.forEach(name => {
        const img = document.createElement("img");
        img.src = `media/gallery/${name}`; // DO NOT CHANGE: Path to images
        img.alt = "Project screenshot";
        img.loading = "eager"; // Load immediately instead of lazy
        galleryTrack.appendChild(img);
      });
      
      // Duplicate images for seamless infinite scroll
      imageNames.forEach(name => {
        const img = document.createElement("img");
        img.src = `media/gallery/${name}`;
        img.alt = "Project screenshot";
        img.loading = "eager"; // Load immediately
        galleryTrack.appendChild(img);
      });
    }

 /* ===============================
       SKILL BAR ANIMATION ON SCROLL
       Animates skill bars from 0 to target width when section becomes visible
       REPLACED WITH RADAR CHARTS
       =============================== */
    
    // Observer to detect when skills section is visible and create radar charts
    const observerOptions = {
      threshold: 0.2 // Trigger when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Create all radar charts when section becomes visible
          createRadarCharts();
          // Stop observing after charts are created
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    // Function to create all radar charts
    function createRadarCharts() {
      // Chart configuration common to all radar charts
      const commonOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              color: '#b0b0b0',
              backdropColor: 'transparent'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: '#d0d0d0',
              font: {
                size: 11
              }
            }
          }
        }
      };

      // Chart 1: Programming & Systems Engineering
      const ctx1 = document.getElementById('radarChart1');
      if (ctx1) {
        new Chart(ctx1, {
          type: 'radar',
          data: {
            labels: ['Python', 'C', 'C++', 'Java', 'SQL', 'Bash', 'JS/CSS/HTML'],
            datasets: [{
              data: [90, 85, 75, 65, 70, 70, 50],
              backgroundColor: 'rgba(58, 123, 200, 0.2)',
              borderColor: 'rgba(58, 123, 200, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(58, 123, 200, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(58, 123, 200, 1)'
            }]
          },
          options: commonOptions
        });
      }

      // Chart 2: Machine Learning & RL Systems
      const ctx2 = document.getElementById('radarChart2');
      if (ctx2) {
        new Chart(ctx2, {
          type: 'radar',
          data: {
            labels: ['RL', 'PyTorch', 'Ray RLlib', 'scikit-learn', 'TensorFlow', 'OpenAI Gym'],
            datasets: [{
              data: [85, 90, 75, 85, 65, 70],
              backgroundColor: 'rgba(58, 123, 200, 0.2)',
              borderColor: 'rgba(58, 123, 200, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(58, 123, 200, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(58, 123, 200, 1)'
            }]
          },
          options: commonOptions
        });
      }

      // Chart 3: Distributed Computing & HPC
      const ctx3 = document.getElementById('radarChart3');
      if (ctx3) {
        new Chart(ctx3, {
          type: 'radar',
          data: {
            labels: ['Spark/PySpark', 'Ray', 'HDFS', 'MPI', 'OpenMP', 'CUDA'],
            datasets: [{
              data: [90, 85, 85, 65, 80, 65],
              backgroundColor: 'rgba(58, 123, 200, 0.2)',
              borderColor: 'rgba(58, 123, 200, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(58, 123, 200, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(58, 123, 200, 1)'
            }]
          },
          options: commonOptions
        });
      }

      // Chart 4: Data Engineering
      const ctx4 = document.getElementById('radarChart4');
      if (ctx4) {
        new Chart(ctx4, {
          type: 'radar',
          data: {
            labels: ['Pandas/NumPy', 'Power BI', 'ETL', 'Forecasting', 'SQL Optimization'],
            datasets: [{
              data: [90, 85, 75, 70, 70],
              backgroundColor: 'rgba(58, 123, 200, 0.2)',
              borderColor: 'rgba(58, 123, 200, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(58, 123, 200, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(58, 123, 200, 1)'
            }]
          },
          options: commonOptions
        });
      }

      // Chart 5: Mathematics & Optimization
      const ctx5 = document.getElementById('radarChart5');
      if (ctx5) {
        new Chart(ctx5, {
          type: 'radar',
          data: {
            labels: ['RL Theory', 'Evolutionary Alg', 'Probability', 'Linear Algebra', 'Dist. Optimization'],
            datasets: [{
              data: [70, 90, 85, 75, 85],
              backgroundColor: 'rgba(58, 123, 200, 0.2)',
              borderColor: 'rgba(58, 123, 200, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(58, 123, 200, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(58, 123, 200, 1)'
            }]
          },
          options: commonOptions
        });
      }

      // Chart 6: Tools & Research Workflow
      const ctx6 = document.getElementById('radarChart6');
      if (ctx6) {
        new Chart(ctx6, {
          type: 'radar',
          data: {
            labels: ['Linux Shell', 'Git/GitHub', 'SSH/Clusters', 'LaTeX', 'PyCharm'],
            datasets: [{
              data: [70, 90, 75, 80, 85],
              backgroundColor: 'rgba(58, 123, 200, 0.2)',
              borderColor: 'rgba(58, 123, 200, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(58, 123, 200, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(58, 123, 200, 1)'
            }]
          },
          options: commonOptions
        });
      }
    }

    /* ===============================
       SMOOTH SCROLL FOR NAVIGATION
       Adds smooth scrolling when clicking nav links
       =============================== */
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Scroll to section with offset for fixed navbar
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    /* ===============================
       ACTIVE NAVIGATION HIGHLIGHTING
       Highlights current section in navigation
       =============================== */
    
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Check if section is in viewport
        if (scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      // Update active class on nav links
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    /* ===============================
       NAVBAR BACKGROUND ON SCROLL
       Changes navbar background opacity when scrolling
       =============================== */
    
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.98)';
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
      } else {
        navbar.style.backgroundColor = '#0d0d0d';
        navbar.style.boxShadow = 'none';
      }
    });

    /* ===============================
       PARALLAX EFFECT FOR SECTIONS
       Subtle parallax scrolling for background images
       OPTIONAL: Remove if performance issues occur
       =============================== */
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      // Apply parallax to sections with fixed backgrounds
      const parallaxSections = document.querySelectorAll('#home, #skills, #experience, #education');
      
      parallaxSections.forEach(section => {
        // CHANGE: Multiplier (0.5) controls parallax speed
        // Higher = faster movement, Lower = slower movement
        const yPos = -(scrolled * 0.5);
        section.style.backgroundPosition = `center ${yPos}px`;
      });
    });

    /* ===============================
       FLIP CARD TOUCH SUPPORT
       Enables flip cards to work on touch devices
       =============================== */
    
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
      card.addEventListener('click', function() {
        // Toggle a class for mobile touch
        this.classList.toggle('touch-flipped');
      });
    });

    /* ===============================
       TROPHY CIRCLE ANIMATION
       Adds entrance animation to trophy circles
       =============================== */
    
    const trophyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation for each trophy
          setTimeout(() => {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
              entry.target.style.transition = 'all 0.6s ease';
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, 50);
          }, index * 100); // Delay increases for each trophy
          
          trophyObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.trophy-circle').forEach(trophy => {
      trophyObserver.observe(trophy);
    });

    /* ===============================
       PROJECT CARD HOVER EFFECT
       Adds interactive hover effects to project cards
       =============================== */
    
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
      });
    });

    /* ===============================
       CONSOLE MESSAGE
       Fun message for developers viewing the console
       =============================== */
    
    console.log('%c👋 Hello, Developer!', 'color: #3a7bc8; font-size: 24px; font-weight: bold;');
    console.log('%cThanks for checking out the code!', 'color: #5a9be8; font-size: 16px;');
    console.log('%cPortfolio by Aaron Mackenzie Misquith', 'color: #d0d0d0; font-size: 14px;');
    console.log('%c💻 Built with HTML, CSS, and JavaScript', 'color: #b0b0b0; font-size: 12px;');
