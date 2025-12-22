window.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const video = intro.querySelector("video");

  if (!video) {
    intro.remove();
    document.body.style.overflow = "auto";
    return;
  }

  document.body.style.overflow = "hidden";
  const FADE_DURATION = 250;

  const startFadeSequence = () => {
    const videoDuration = video.duration * 1000 || 0;
    const fadeStartTime = Math.max(videoDuration - FADE_DURATION, 0);

    setTimeout(() => {
      intro.classList.add("fade-out");
      setTimeout(() => {
        intro.remove();
        document.body.style.overflow = "auto";
      }, FADE_DURATION);
    }, fadeStartTime);
  };

  if (video.readyState >= 1) {
    startFadeSequence();
  } else {
    video.addEventListener("loadedmetadata", startFadeSequence, { once: true });
  }

  video.addEventListener("error", () => {
    intro.remove();
    document.body.style.overflow = "auto";
  });
});

function toggleDetails(element) {
  element.classList.toggle("active");
  const details = element.querySelector(".details");
  if (details) {
    details.style.maxHeight = element.classList.contains("active")
      ? `${details.scrollHeight}px`
      : null;
  }
}

function positionTimelineLine() {
  const container = document.querySelector(".timeline-container");
  const line = document.querySelector(".timeline-line");
  const items = document.querySelectorAll(".timeline-item");

  if (!container || !line || items.length === 0) return;

  const containerTop = container.getBoundingClientRect().top + window.scrollY;
  const firstDot = items[0].querySelector(".timeline-dot");
  const lastDot = items[items.length - 1].querySelector(".timeline-dot");

  if (!firstDot || !lastDot) return;

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

  line.style.top = `${firstOffset}px`;
  line.style.height = `${lastOffset - firstOffset}px`;
}

positionTimelineLine();
window.addEventListener("resize", positionTimelineLine);

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
  imageNames.forEach(name => {
    const img = document.createElement("img");
    img.src = `Media/gallery/${name}`;
    img.alt = "Project screenshot";
    img.loading = "eager";
    galleryTrack.appendChild(img);
  });
  
  imageNames.forEach(name => {
    const img = document.createElement("img");
    img.src = `media/gallery/${name}`;
    img.alt = "Project screenshot";
    img.loading = "eager";
    galleryTrack.appendChild(img);
  });
}

/* ===============================
   IMPROVED RADAR CHART INITIALIZATION
   Fixes display issues on some computers
   =============================== */

let radarChartsCreated = false;

const observerOptions = {
  threshold: 0.1,
  rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !radarChartsCreated) {
      // Delay to ensure Chart.js is fully loaded
      setTimeout(() => {
        if (typeof Chart !== 'undefined') {
          createRadarCharts();
          radarChartsCreated = true;
          observer.unobserve(entry.target);
        } else {
          console.error('Chart.js not loaded');
          // Retry after another delay
          setTimeout(() => {
            if (typeof Chart !== 'undefined') {
              createRadarCharts();
              radarChartsCreated = true;
              observer.unobserve(entry.target);
            }
          }, 1000);
        }
      }, 300);
    }
  });
}, observerOptions);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  observer.observe(skillsSection);
}

function createRadarCharts() {
  // Verify Chart.js is available
  if (typeof Chart === 'undefined') {
    console.error('Chart.js library not loaded');
    return;
  }

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
          backdropColor: 'transparent',
          font: {
            size: 10
          }
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

  const charts = [
    {
      id: 'radarChart1',
      labels: ['Python', 'C', 'C++', 'Java', 'SQL', 'Bash', 'JS/CSS/HTML'],
      data: [90, 85, 75, 65, 70, 70, 50]
    },
    {
      id: 'radarChart2',
      labels: ['RL', 'PyTorch', 'Ray RLlib', 'scikit-learn', 'TensorFlow', 'OpenAI Gym'],
      data: [85, 90, 75, 85, 65, 70]
    },
    {
      id: 'radarChart3',
      labels: ['Spark/PySpark', 'Ray', 'HDFS', 'MPI', 'OpenMP', 'CUDA'],
      data: [90, 85, 85, 65, 80, 65]
    },
    {
      id: 'radarChart4',
      labels: ['Pandas/NumPy', 'Power BI', 'ETL', 'Forecasting', 'SQL Optimization'],
      data: [90, 85, 75, 70, 70]
    },
    {
      id: 'radarChart5',
      labels: ['RL Theory', 'Evolutionary Alg', 'Probability', 'Linear Algebra', 'Dist. Optimization'],
      data: [70, 90, 85, 75, 85]
    },
    {
      id: 'radarChart6',
      labels: ['Linux Shell', 'Git/GitHub', 'SSH/Clusters', 'LaTeX', 'PyCharm'],
      data: [70, 90, 75, 80, 85]
    }
  ];

  charts.forEach(chartConfig => {
    const ctx = document.getElementById(chartConfig.id);
    if (ctx) {
      try {
        // Clear any existing chart instance
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
          existingChart.destroy();
        }

        new Chart(ctx, {
          type: 'radar',
          data: {
            labels: chartConfig.labels,
            datasets: [{
              data: chartConfig.data,
              backgroundColor: 'rgba(58, 123, 200, 0.2)',
              borderColor: 'rgba(58, 123, 200, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(58, 123, 200, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(58, 123, 200, 1)',
              pointRadius: 4,
              pointHoverRadius: 6
            }]
          },
          options: commonOptions
        });
      } catch (error) {
        console.error(`Error creating chart ${chartConfig.id}:`, error);
      }
    }
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

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

// DISABLE PARALLAX ON MOBILE/TABLET
const isDesktop = window.innerWidth > 1024;

if (isDesktop) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSections = document.querySelectorAll('#home, #skills, #experience, #education');
    
    parallaxSections.forEach(section => {
      const yPos = -(scrolled * 0.5);
      section.style.backgroundPosition = `center ${yPos}px`;
    });
  });
}

const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
  card.addEventListener('click', function() {
    this.classList.toggle('touch-flipped');
  });
});

const trophyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'all 0.6s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 50);
      }, index * 100);
      
      trophyObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.trophy-circle').forEach(trophy => {
  trophyObserver.observe(trophy);
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

console.log('%c👋 Hello, Developer!', 'color: #3a7bc8; font-size: 24px; font-weight: bold;');
console.log('%cThanks for checking out the code!', 'color: #5a9be8; font-size: 16px;');
console.log('%cPortfolio by Aaron Mackenzie Misquith', 'color: #d0d0d0; font-size: 14px;');
console.log('%c💻 Built with HTML, CSS, and JavaScript', 'color: #b0b0b0; font-size: 12px;');
