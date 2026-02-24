/**
 * Preliminary Results Page - Standalone JavaScript
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

    // ==================== RESULTS DATA & RENDERING ====================

    // Preliminary results data
    const preliminaryResults = [
        { sno: 1, teamName: "Forza core", teamLeader: "Oviya A" },
        { sno: 2, teamName: "Psychguard", teamLeader: "Divyasri R" },
        { sno: 3, teamName: "Lunar Lumina", teamLeader: "Kishore K" },
        { sno: 4, teamName: "Ai Alchemists", teamLeader: "Harsith S" },
        { sno: 5, teamName: "SheQuads", teamLeader: "Birundha M" },
        { sno: 6, teamName: "AtmosTech", teamLeader: "Thejasvilini B" },
        { sno: 7, teamName: "Dynamo", teamLeader: "Divya Dharshini S" },
        { sno: 8, teamName: "Hackathon Hackers", teamLeader: "Kalyan V" },
        { sno: 9, teamName: "Infinite Loopers", teamLeader: "Suyambusree" },
        { sno: 10, teamName: "Tech Dudes", teamLeader: "Jeeva S" },
        { sno: 11, teamName: "Akaza", teamLeader: "Tanusri K" },
        { sno: 12, teamName: "Enceladus", teamLeader: "Sayeeda Fathima S" },
        { sno: 13, teamName: "FlowForge", teamLeader: "Mahalakshmi V" },
        { sno: 14, teamName: "Agile", teamLeader: "Nagammai" },
        { sno: 15, teamName: "Team Enable", teamLeader: "Rishe Varthanaa" },
        { sno: 16, teamName: "Matrix Infinity", teamLeader: "Varuna G" },
        { sno: 17, teamName: "Brainy Bunch", teamLeader: "Rifa Fathima M" },
        { sno: 18, teamName: "Sternritters", teamLeader: "Mohan Viknesh S" },
        { sno: 19, teamName: "War Coders", teamLeader: "Bharathi S P" },
        { sno: 20, teamName: "Alchemy", teamLeader: "Bharanika R" },
        { sno: 21, teamName: "Digitronauts", teamLeader: "Priyadharshini A" },
        { sno: 22, teamName: "TechSpark", teamLeader: "Thamarai Selvan S" },
        { sno: 23, teamName: "Eighth Miracle", teamLeader: "Asqar Ali S M S" },
        { sno: 24, teamName: "Assassins", teamLeader: "Vaakith Iman Ali H A" },
        { sno: 25, teamName: "Zekrom", teamLeader: "Vamsi Krishnan S" },
        { sno: 26, teamName: "HackHive", teamLeader: "Pooja Sri M" },
        { sno: 27, teamName: "Sparkon", teamLeader: "Swarnamalyaa M" },
        { sno: 28, teamName: "Griffins", teamLeader: "Sheryl Hephzibah S" },
    ];

    const resultsBody = document.getElementById('results-body');

    if (resultsBody) {
        preliminaryResults.forEach((result, index) => {
            const tr = document.createElement('tr');

            // Add a slight delay to each row for a cascade effect
            tr.style.animationDelay = `${(index * 0.05) + 0.5}s`;

            tr.innerHTML = `
                <td class="serial-number" data-label="S.No">${result.sno < 10 ? '0' + result.sno : result.sno}</td>
                <td data-label="Team Name" style="font-weight: 500;">${result.teamName}</td>
                <td data-label="Team Leader">${result.teamLeader}</td>
            `;

            resultsBody.appendChild(tr);
        });
    }

    // Remove loader after a slight delay to allow table population
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader-wrapper');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }, 500);
        }
    });

})();
