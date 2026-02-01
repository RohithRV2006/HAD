/**
 * Problem Statements Page - Standalone JavaScript
 * HackWell'26 - AI & DS Department
 */

(function () {
    'use strict';

    // ==================== NAVIGATION ====================

    const menuToggle = document.querySelector('.menu-toggle');
    const navPane = document.querySelector('.nav-pane');
    const navBackdrop = document.querySelector('.nav-backdrop');
    const navPaneClose = document.querySelector('.nav-pane-close');
    const navPaneLinks = document.querySelectorAll('.nav-pane-links a');

    // Toggle navigation pane
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navPane.classList.toggle('active');
            navBackdrop.classList.toggle('active');
        });
    }

    // Close pane
    function closeNavPane() {
        if (menuToggle) menuToggle.classList.remove('active');
        if (navPane) navPane.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
    }

    if (navPaneClose) {
        navPaneClose.addEventListener('click', closeNavPane);
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeNavPane);
    }

    // Close pane when clicking a link
    navPaneLinks.forEach(link => {
        link.addEventListener('click', closeNavPane);
    });

    // ==================== PROBLEM FILTERING ====================

    const filterBtns = document.querySelectorAll('.filter-btn');
    const problemCards = document.querySelectorAll('.problem-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filter cards
                problemCards.forEach(card => {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        const category = card.getAttribute('data-category');
                        if (category === filter) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }

    // ==================== PROBLEM DETAIL PANEL ====================

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
            title: 'AI-Generated Climate Futures (Multiple Timelines)',
            theme: 'AI for Everyone',
            background: 'People can\'t feel future climate impact because it\'s abstract.',
            abstract: 'AI generates parallel climate futures for the same location based on different decisions.',
            challenge: 'Scenario simulation, LLM-based narrative generation',
            stakeholders: 'People'
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
            title: 'AI That Detects Learning Plateaus Early',
            theme: 'Campus to Corporate',
            background: 'Many students stop growing without realizing it.',
            abstract: 'AI detects learning stagnation before it becomes career stagnation.',
            challenge: 'Build an AI that alerts students when their learning curve flattens.Progress trend analysis and Anomaly detection',
            stakeholders: 'Students'
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

})();
