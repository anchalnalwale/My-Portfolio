document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconLight = document.getElementById('theme-icon-light');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const html = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            html.classList.add('dark');
            html.classList.remove('light');
            themeIconLight.style.display = 'block';
            themeIconDark.style.display = 'none';
        } else {
            html.classList.remove('dark');
            html.classList.add('light');
            themeIconLight.style.display = 'none';
            themeIconDark.style.display = 'block';
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    const typingTextElement = document.getElementById('typing-text');
    const phrases = ["Full-Stack Developer", "Creative Problem-Solver", "Lifelong Learner"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        const typingSpeed = isDeleting ? 100 : 150;
        setTimeout(type, typingSpeed);
    }
    type();

    const skillsData = {
        languages: ['C', 'C++' , 'Java'],
        frontend: ['HTML5', 'CSS3', 'JavaScript ', 'React', 'Tailwind CSS'],
        backend: ['Node.js', 'Express.js'],
        database: ['MongoDB', 'MySQL'],
        tools: ['Git & GitHub', 'LeetCode', 'HackerRank', 'GFG']
    };

    const skillsContent = document.getElementById('skills-content');
    const chartContainer = document.getElementById('chart-container');
    const skillTabButtons = document.querySelectorAll('.skill-tab-button');

    function renderSkills(category) {
        skillsContent.innerHTML = '';
        chartContainer.classList.add('hidden');
        skillsContent.classList.remove('hidden');

        skillsData[category].forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'section-card p-4 rounded-lg shadow-md flex items-center justify-center font-medium';
            skillElement.textContent = skill;
            skillsContent.appendChild(skillElement);
        });
    }

    let skillsChartInstance = null;
    function renderChart() {
        skillsContent.classList.add('hidden');
        chartContainer.classList.remove('hidden');

        const ctx = document.getElementById('skillsChart').getContext('2d');
        if (skillsChartInstance) {
            skillsChartInstance.destroy();
        }

        const isDarkMode = document.documentElement.classList.contains('dark');
        const gridColor = isDarkMode ? 'rgba(100, 116, 139, 0.3)' : 'rgba(203, 213, 225, 0.5)';
        const pointColor = isDarkMode ? '#38bdf8' : '#0ea5e9';
        const textColor = isDarkMode ? '#cbd5e1' : '#475569';

        skillsChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Frontend', 'Backend', 'Databases', 'DevOps', 'Problem Solving', 'UI/UX Design'],
                datasets: [{
                    label: 'Proficiency',
                    data: [90, 85, 80, 65, 88, 75],
                    backgroundColor: 'rgba(56, 189, 248, 0.2)',
                    borderColor: pointColor,
                    pointBackgroundColor: pointColor,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: pointColor
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: gridColor },
                        grid: { color: gridColor },
                        pointLabels: { color: textColor, font: { size: 14 } },
                        ticks: {
                            backdropColor: 'transparent',
                            color: textColor,
                            stepSize: 20
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    skillTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            skillTabButtons.forEach(btn => btn.classList.remove('active', 'text-primary'));
            button.classList.add('active', 'text-primary');
            const tab = button.dataset.tab;
            if (tab === 'chart') {
                renderChart();
            } else {
                renderSkills(tab);
            }
        });
    });

    renderSkills('frontend');
    document.querySelector('.skill-tab-button[data-tab="frontend"]').classList.add('active', 'text-primary');

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });
});