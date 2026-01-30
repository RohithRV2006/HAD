/*
 * HackWell'26 Main Scripts
 * Handles navigation, animations, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Loader ---
    // --- Loader ---
    const loader = document.getElementById('idLoader');
    if (loader) {
        // Draw Neural Network Connections
        const drawConnections = () => {
            const svg = document.getElementById('nn-connections');
            const layers = document.querySelectorAll('.nn-layer');
            if (!svg || layers.length === 0) return;

            // Clear existing
            svg.innerHTML = '';

            // Loop through layers (except last)
            for (let i = 0; i < layers.length - 1; i++) {
                const currentLayerNodes = layers[i].querySelectorAll('.node');
                const nextLayerNodes = layers[i + 1].querySelectorAll('.node');

                // Connect every node in current to every node in next
                currentLayerNodes.forEach(node1 => {
                    // Get center positions relative to visualizer container
                    // Note: We need offsets relative to the visualizer container, not viewport
                    // Since SVG is absolute 0,0 inside visualizer, offsetLeft/Top work if visualizer is relative

                    const rect1 = node1.getBoundingClientRect();
                    const containerRect = svg.parentElement.getBoundingClientRect();

                    const x1 = rect1.left - containerRect.left + rect1.width / 2;
                    const y1 = rect1.top - containerRect.top + rect1.height / 2;

                    nextLayerNodes.forEach(node2 => {
                        const rect2 = node2.getBoundingClientRect();
                        const x2 = rect2.left - containerRect.left + rect2.width / 2;
                        const y2 = rect2.top - containerRect.top + rect2.height / 2;

                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', x1);
                        line.setAttribute('y1', y1);
                        line.setAttribute('x2', x2);
                        line.setAttribute('y2', y2);
                        line.setAttribute('class', `conn-l${i + 1}`); // Class for staggering animation
                        svg.appendChild(line);
                    });
                });
            }
        };

        // Run initially and on resize
        // Delay slightly to ensure layout is set
        setTimeout(drawConnections, 100);
        window.addEventListener('resize', drawConnections);

        // Check if user has visited before in this session
        const hasVisited = sessionStorage.getItem('hackwell_visited');

        if (hasVisited) {
            // If visited, hide immediately
            loader.style.display = 'none';
        } else {
            // If first visit, set flag and allow animation to play
            sessionStorage.setItem('hackwell_visited', 'true');

            // Animation runs for ~6-7s now
            const animationDuration = 6500; // 6.5s

            setTimeout(() => {
                loader.classList.add('fade-out');
                // Remove from DOM after fade out transition
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000); // Allow full fade out
            }, animationDuration);
        }
    }


    // --- Context-Aware Navigation ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navPane = document.querySelector('.nav-pane');
    const navBackdrop = document.querySelector('.nav-backdrop');
    const navPaneClose = document.querySelector('.nav-pane-close');

    // Open pane
    if (menuToggle && navPane && navBackdrop) {
        menuToggle.addEventListener('click', () => {
            navPane.classList.add('active');
            navBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close pane - close button
        navPaneClose.addEventListener('click', () => {
            navPane.classList.remove('active');
            navBackdrop.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close pane - backdrop click
        navBackdrop.addEventListener('click', () => {
            navPane.classList.remove('active');
            navBackdrop.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close pane on link click
        navPane.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navPane.classList.remove('active');
                navBackdrop.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('nav');
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const heroHeight = heroSection ? heroSection.offsetHeight : 600;

        if (window.scrollY > heroHeight * 0.8) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Smooth Scroll for Anchors ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        scrollObserver.observe(el);
    });

    // Observe sponsor logos separately for fade-in effect
    document.querySelectorAll('.sponsor-logo').forEach(logo => {
        scrollObserver.observe(logo);
    });

    // --- Flip Timer ---
    const targetDate = new Date('March 4, 2026 00:00:00').getTime();

    function updateCard(unitId, newValue) {
        const unit = document.getElementById(unitId);
        if (!unit) return;

        // Prevent multiple simultaneous animations on the same unit
        if (unit.classList.contains('folding')) return;

        const formatted = String(newValue).padStart(2, '0');
        const backgrounds = unit.querySelectorAll('.top-bg, .bot-bg');
        const leaves = unit.querySelectorAll('.leaf-top, .leaf-bot');

        // Check against current value to only animate on change
        if (leaves[0] && leaves[0].innerText !== formatted) {
            // Different animation approach based on screen size
            if (window.innerWidth <= 768) {
                // Simple fade animation for mobile
                leaves.forEach(leaf => {
                    leaf.style.opacity = '0';
                });

                setTimeout(() => {
                    backgrounds.forEach(bg => bg.innerText = formatted);
                    leaves.forEach(leaf => {
                        leaf.innerText = formatted;
                        leaf.style.opacity = '1';
                    });
                }, 150);
            } else {
                // 3D flip animation for desktop
                backgrounds.forEach(bg => bg.innerText = formatted);
                unit.classList.add('folding');

                setTimeout(() => {
                    unit.classList.remove('folding');
                    leaves.forEach(leaf => leaf.innerText = formatted);
                }, 600);
            }
        } else if (leaves[0] && leaves[0].innerText === '') {
            // Initialize if empty
            backgrounds.forEach(bg => bg.innerText = formatted);
            leaves.forEach(leaf => leaf.innerText = formatted);
        }
    }

    function runTimer() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            // Handle timer expiry if needed
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        updateCard('days', days);
        updateCard('hours', hours);
        updateCard('mins', minutes);
        updateCard('secs', seconds);
    }

    // Initialize immediately to avoid 00 flash
    runTimer();
    setInterval(runTimer, 1000);


    // --- Add Staggered Delays for Animation ---
    // Automatically adds .delay-100, .delay-200 etc to children of grids
    const staggerContainers = document.querySelectorAll('.theme-grid, .problems-grid, .sponsors-grid, .about-grid');

    staggerContainers.forEach(container => {
        const children = container.querySelectorAll('.card, .problem-card, .sponsor-placeholder, .stat-item, .about-text, .about-visual');
        children.forEach((child, index) => {
            // Cycle through delays 100-500ms
            const delay = ((index % 5) + 1) * 100;
            child.classList.add(`delay-${delay}`);
            child.classList.add('fade-in'); // Ensure they have fade-in class
        });
    });

    // Also stagger timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        const delay = ((index % 5) + 1) * 100;
        item.classList.add(`delay-${delay}`);
    });

    // --- Problem Page Filtering (Simple) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const problemCards = document.querySelectorAll('.problem-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                problemCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'flex';
                        // Small timeout to allow display:flex to apply before opacity transition
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // --- Problem Detail Panel ---
    const problemsData = {
        'HAD-1': {
            id: 'HAD-1',
            title: 'AI System for Detecting Psychological Manipulation in Digital Media',
            theme: 'Applied Generative AI',
            background: 'Digital media increasingly uses subtle psychological manipulation techniques that influence users without awareness.',
            abstract: 'Digital platforms increasingly influence human behavior using subtle psychological manipulation rather than explicit misinformation. This problem focuses on identifying emotional framing, fear induction, bias amplification, and persuasive cues in digital media. The objective is to detect manipulative intent and provide explainable insights that empower users and regulators.',
            challenge: 'Develop an AI system to detect and explain psychological manipulation in multimodal digital content.',
            stakeholders: 'Citizens, regulators, digital platforms'
        },
        'HAD-2': {
            id: 'HAD-2',
            title: 'Explainable AI System for Common Users',
            theme: 'Applied Generative AI',
            background: 'AI systems act as black boxes, reducing trust among users affected by AI-driven decisions.',
            abstract: 'AI systems affect critical decisions but remain opaque to users. This problem aims to translate complex AI outputs into simple explanations using natural language and examples to improve trust.',
            challenge: 'Build a system that translates AI decisions into simple, understandable explanations.',
            stakeholders: 'General public, policymakers'
        },
        'HAD-3': {
            id: 'HAD-3',
            title: 'AI Digital Twin for Everyday Personal Decision Making',
            theme: 'Applied Generative AI',
            background: 'Individuals lack tools to understand long-term consequences of daily decisions.',
            abstract: 'Daily personal decisions lack long-term foresight. This problem proposes a personal AI digital twin to simulate outcomes and enable informed decision-making.',
            challenge: 'Create a personal AI digital twin that simulates outcomes of user decisions.',
            stakeholders: 'Students, professionals'
        },
        'HAD-4': {
            id: 'HAD-4',
            title: 'Generative AI-Based Community Disaster Preparedness Simulator',
            theme: 'Applied Generative AI',
            background: 'Disaster plans are generic and ignore local constraints.',
            abstract: 'Generic disaster plans fail to address local realities. This problem involves building a GenAI-based system for localized disaster simulation and preparedness.',
            challenge: 'Develop a GenAI platform that generates community-specific disaster simulations.',
            stakeholders: 'Disaster authorities, communities'
        },
        'HAD-5': {
            id: 'HAD-5',
            title: 'AI-Based Climate & Public Policy Outcome Simulator',
            theme: 'Applied Generative AI',
            background: 'Policy impacts are difficult to visualize before implementation.',
            abstract: 'Policy impacts are difficult to visualize beforehand. This problem focuses on simulating long-term social and environmental effects of public policies.',
            challenge: 'Build an AI tool to simulate and visualize policy outcomes.',
            stakeholders: 'Citizens, policymakers'
        },
        'HAD-6': {
            id: 'HAD-6',
            title: 'Intelligent Governance Stress Detection System',
            theme: 'Intelligent Systems',
            background: 'Governance failures show early warning signals that go unnoticed.',
            abstract: 'Early governance stress signals often go unnoticed. This problem aims to detect weak signals using multi-source intelligence.',
            challenge: 'Detect governance stress using citizen feedback and service data.',
            stakeholders: 'Government bodies'
        },
        'HAD-7': {
            id: 'HAD-7',
            title: 'Early Warning System for MSME Financial Distress',
            theme: 'Intelligent Systems',
            background: 'MSMEs fail due to late detection of financial stress.',
            abstract: 'MSMEs collapse due to late stress detection. This problem focuses on predictive analytics for early intervention.',
            challenge: 'Predict MSME distress using behavioral and financial indicators.',
            stakeholders: 'MSMEs, banks'
        },
        'HAD-8': {
            id: 'HAD-8',
            title: 'Urban Resource Consumption Spike Prediction System',
            theme: 'Intelligent Systems',
            background: 'Sudden resource demand spikes strain city infrastructure.',
            abstract: 'Cities face sudden utility demand spikes. This problem involves predicting cross-utility surges for proactive management.',
            challenge: 'Forecast cross-utility consumption anomalies.',
            stakeholders: 'Urban utilities'
        },
        'HAD-9': {
            id: 'HAD-9',
            title: 'AI-Based Hidden Supply Chain Risk Detection',
            theme: 'Intelligent Systems',
            background: 'Hidden supply chain dependencies cause sudden disruptions.',
            abstract: 'Supply chain disruptions arise from hidden dependencies. This problem aims to model deep-tier vulnerabilities.',
            challenge: 'Model deep-tier supply chain vulnerabilities.',
            stakeholders: 'Industries'
        },
        'HAD-10': {
            id: 'HAD-10',
            title: 'Intelligent Structural Stress Detection System',
            theme: 'Intelligent Systems',
            background: 'Public infrastructure fails without early warnings.',
            abstract: 'Infrastructure failures lack early warnings. This problem focuses on AI-driven structural health monitoring.',
            challenge: 'Detect early structural stress using AI analytics.',
            stakeholders: 'Municipal authorities'
        },
        'HAD-11': {
            id: 'HAD-11',
            title: 'Micro-Climate Prediction for Street-Level Decisions',
            theme: 'Climate Tech & Green Innovation',
            background: 'City-level climate forecasts lack granularity.',
            abstract: 'Climate forecasts lack hyper-local detail. This problem aims to provide street-level climate intelligence.',
            challenge: 'Provide ultra-local climate predictions.',
            stakeholders: 'Urban planners'
        },
        'HAD-12': {
            id: 'HAD-12',
            title: 'AI-Based Climate-Induced Migration Prediction',
            theme: 'Climate Tech & Green Innovation',
            background: 'Climate migration is not predicted proactively.',
            abstract: 'Climate-driven migration is not proactively predicted. This problem focuses on forecasting displacement risks.',
            challenge: 'Forecast localized climate-induced migration risks.',
            stakeholders: 'Governments'
        },
        'HAD-13': {
            id: 'HAD-13',
            title: 'Urban Heat Stress & Mental Health Prediction',
            theme: 'Climate Tech & Green Innovation',
            background: 'Heat stress affects mental health but remains unquantified.',
            abstract: 'Heat stress impacts mental health. This problem explores predictive risk modeling.',
            challenge: 'Predict mental health risks due to heat exposure.',
            stakeholders: 'Health departments'
        },
        'HAD-14': {
            id: 'HAD-14',
            title: 'Smart Tree Survival Monitoring System',
            theme: 'Climate Tech & Green Innovation',
            background: 'Tree plantation survival rates are low.',
            abstract: 'Plantation survival rates are low. This problem focuses on post-plantation monitoring and prediction.',
            challenge: 'Monitor post-plantation tree health.',
            stakeholders: 'Forest departments'
        },
        'HAD-15': {
            id: 'HAD-15',
            title: 'Food Waste to Energy Optimization Platform',
            theme: 'Climate Tech & Green Innovation',
            background: 'Food waste is underutilized for energy generation.',
            abstract: 'Food waste remains underutilized. This problem focuses on optimizing energy recovery.',
            challenge: 'Optimize biogas potential using AI.',
            stakeholders: 'Municipalities'
        },
        'HAD-16': {
            id: 'HAD-16',
            title: 'AI-Based Bias Auditor for Public Digital Services',
            theme: 'AI for Everyone',
            background: 'Algorithmic bias impacts citizens unfairly.',
            abstract: 'Algorithmic bias affects citizens. This problem democratizes fairness auditing.',
            challenge: 'Detect and explain bias in public AI systems.',
            stakeholders: 'Citizens, regulators'
        },
        'HAD-17': {
            id: 'HAD-17',
            title: 'Trust Erosion Detection in Digital Platforms',
            theme: 'AI for Everyone',
            background: 'Loss of trust occurs gradually and unnoticed.',
            abstract: 'Trust loss happens gradually. This problem detects early erosion signals.',
            challenge: 'Detect early trust erosion signals.',
            stakeholders: 'Platform operators'
        },
        'HAD-18': {
            id: 'HAD-18',
            title: 'Community Climate Action Platform',
            theme: 'AI for Everyone',
            background: 'Low participation in climate action.',
            abstract: 'Low participation reduces climate impact. This problem gamifies climate action.',
            challenge: 'Gamify and track community climate actions.',
            stakeholders: 'Communities'
        },
        'HAD-19': {
            id: 'HAD-19',
            title: 'AI Digital Literacy Assistant',
            theme: 'AI for Everyone',
            background: 'First-time users struggle with digital services.',
            abstract: 'First-time users struggle digitally. This problem provides AI-guided assistance.',
            challenge: 'Provide AI-guided step-by-step assistance.',
            stakeholders: 'Beginners'
        },
        'HAD-20': {
            id: 'HAD-20',
            title: 'Community Help & Volunteer Coordination System',
            theme: 'AI for Everyone',
            background: 'Local help resources are fragmented.',
            abstract: 'Help resources are fragmented. This problem matches needs with volunteers.',
            challenge: 'Match community needs with volunteers.',
            stakeholders: 'NGOs, communities'
        },
        'HAD-21': {
            id: 'HAD-21',
            title: 'Corporate Culture Simulator for Students',
            theme: 'Campus to Corporate',
            background: 'Students lack workplace exposure.',
            abstract: 'Students lack workplace exposure. This problem simulates corporate environments.',
            challenge: 'Simulate real corporate environments.',
            stakeholders: 'Students'
        },
        'HAD-22': {
            id: 'HAD-22',
            title: 'Internship-to-Full-Time Conversion Predictor',
            theme: 'Campus to Corporate',
            background: 'Interns lack clarity on conversion chances.',
            abstract: 'Intern conversion is uncertain. This problem predicts and explains conversion likelihood.',
            challenge: 'Predict conversion probability using AI.',
            stakeholders: 'Students, employers'
        },
        'HAD-23': {
            id: 'HAD-23',
            title: 'Skill Obsolescence Timeline Predictor',
            theme: 'Campus to Corporate',
            background: 'Skills become obsolete without warning.',
            abstract: 'Skills become obsolete silently. This problem forecasts skill decay timelines.',
            challenge: 'Predict skill decay timelines.',
            stakeholders: 'Professionals'
        },
        'HAD-24': {
            id: 'HAD-24',
            title: 'Campus-to-Corporate Digital Twin',
            theme: 'Campus to Corporate',
            background: 'Career decisions lack long-term insight.',
            abstract: 'Career decisions lack foresight. This problem simulates long-term career outcomes.',
            challenge: 'Simulate career trajectories.',
            stakeholders: 'Students'
        },
        'HAD-25': {
            id: 'HAD-25',
            title: 'AI-Based Soft Skills Coach',
            theme: 'Campus to Corporate',
            background: 'Soft skills gaps reduce employability.',
            abstract: 'Soft skills gaps reduce employability. This problem provides AI-driven communication feedback.',
            challenge: 'Provide AI-driven communication coaching.',
            stakeholders: 'Graduates'
        }
    };

    // Detail Panel Elements
    const detailPanel = document.querySelector('.problem-detail-panel');
    const panelBackdrop = document.querySelector('.panel-backdrop');
    const panelClose = document.querySelector('.panel-close');

    // Open panel function
    function openProblemDetail(problemId) {
        const problem = problemsData[problemId];
        if (!problem) return;

        // Populate panel content
        document.querySelector('.problem-id-badge-large').textContent = problem.id;
        document.querySelector('.problem-detail-title').textContent = problem.title;
        document.querySelector('.problem-detail-theme').textContent = problem.theme;
        document.querySelector('.problem-background').textContent = problem.background;
        document.querySelector('.problem-abstract').textContent = problem.abstract;
        document.querySelector('.problem-challenge').textContent = problem.challenge;
        document.querySelector('.problem-stakeholders').textContent = problem.stakeholders;

        // Show panel
        detailPanel.classList.add('active');
        panelBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close panel function
    function closeProblemDetail() {
        detailPanel.classList.remove('active');
        panelBackdrop.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Add click listeners to problem cards
    if (problemCards.length > 0) {
        problemCards.forEach(card => {
            card.addEventListener('click', () => {
                const problemId = card.getAttribute('data-problem-id');
                openProblemDetail(problemId);
            });
        });
    }

    // Close panel on close button click
    if (panelClose) {
        panelClose.addEventListener('click', closeProblemDetail);
    }

    // Close panel on backdrop click
    if (panelBackdrop) {
        panelBackdrop.addEventListener('click', closeProblemDetail);
    }

    // Swipe down to close on mobile
    if (detailPanel) {
        let touchStartY = 0;
        let touchEndY = 0;

        detailPanel.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        detailPanel.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDistance = touchEndY - touchStartY;
            // If swiped down more than 100px and panel is scrolled to top
            if (swipeDistance > 100 && detailPanel.scrollTop === 0) {
                closeProblemDetail();
            }
        }
    }

    // Close panel on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailPanel.classList.contains('active')) {
            closeProblemDetail();
        }
    });
    // --- Neural Network Background Animation ---
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Configuration
        const particleCount = window.innerWidth < 738 ? 30 : 60; // Fewer on mobile
        const connectionDistance = 200;
        const particleSpeed = 0.4;

        function resize() {
            width = canvas.width = window.outerWidth;
            height = canvas.height = window.outerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * particleSpeed;
                this.vy = (Math.random() - 0.5) * particleSpeed;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(37, 99, 235, 0.5)'; // Electric Blue
                ctx.fill();
            }
        }

        function init() {
            resize();
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
            animate();
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Draw particles and connections
            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Connect particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(124, 58, 237, ${1 - dist / connectionDistance})`; // Violet gradient
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            resize();
            particles = []; // Reset on resize to prevent clustering
            // Re-populate particles without restarting animation loop
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        });

        init();
    }
});

// Holographic Alert Logic
    window.showHolographicAlert = function (message) {
        const overlay = document.getElementById('holo-overlay');
        const msgEl = document.getElementById('holo-message');
        if (overlay && msgEl) {
            msgEl.textContent = message;
            overlay.classList.add('active');
        }
    };

    window.closeHolographicAlert = function () {
        const overlay = document.getElementById('holo-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    };

    // Close on outside click
    document.getElementById('holo-overlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'holo-overlay') {
            closeHolographicAlert();
        }
    });