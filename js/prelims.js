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

    // Dummy data for preliminary results (30 rows as requested)
    const preliminaryResults = [];
    for (let i = 1; i <= 30; i++) {
        preliminaryResults.push({
            sno: i,
            teamName: `Team Alpha ${i}`,
            teamLeader: `Participant ${i}`
        });
    }

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
