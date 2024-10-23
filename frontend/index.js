import { backend } from 'declarations/backend';

let interviews = [];

async function loadInterviews() {
    showLoadingSpinner();
    try {
        interviews = await backend.getAllInterviews();
        renderInterviews();
    } catch (error) {
        console.error("Failed to load interviews:", error);
    } finally {
        hideLoadingSpinner();
    }
}

function renderInterviews() {
    const interviewList = document.getElementById('interviewList');
    interviewList.innerHTML = '';
    interviews.forEach(interview => {
        const interviewElement = document.createElement('div');
        interviewElement.className = 'interview-item';
        interviewElement.innerHTML = `
            <h3>${interview.company} - ${interview.position}</h3>
            <p>Date: ${new Date(Number(interview.date) / 1000000).toLocaleString()}</p>
            <p>Notes: ${interview.notes}</p>
            <button onclick="editInterview(${interview.id})">Edit</button>
            <button onclick="deleteInterview(${interview.id})">Delete</button>
        `;
        interviewList.appendChild(interviewElement);
    });
}

async function addInterview(event) {
    event.preventDefault();
    const company = document.getElementById('company').value;
    const position = document.getElementById('position').value;
    const date = new Date(document.getElementById('date').value).getTime() * 1000000;
    const notes = document.getElementById('notes').value;

    showLoadingSpinner();
    try {
        await backend.addInterview(company, position, date, notes);
        await loadInterviews();
        event.target.reset();
    } catch (error) {
        console.error("Failed to add interview:", error);
    } finally {
        hideLoadingSpinner();
    }
}

async function editInterview(id) {
    const interview = interviews.find(i => i.id === id);
    if (!interview) return;

    const company = prompt("Enter new company name:", interview.company);
    const position = prompt("Enter new position:", interview.position);
    const date = prompt("Enter new date (YYYY-MM-DD HH:MM):", new Date(Number(interview.date) / 1000000).toLocaleString());
    const notes = prompt("Enter new notes:", interview.notes);

    if (company && position && date && notes) {
        showLoadingSpinner();
        try {
            await backend.updateInterview(id, company, position, new Date(date).getTime() * 1000000, notes);
            await loadInterviews();
        } catch (error) {
            console.error("Failed to update interview:", error);
        } finally {
            hideLoadingSpinner();
        }
    }
}

async function deleteInterview(id) {
    if (confirm("Are you sure you want to delete this interview?")) {
        showLoadingSpinner();
        try {
            await backend.deleteInterview(id);
            await loadInterviews();
        } catch (error) {
            console.error("Failed to delete interview:", error);
        } finally {
            hideLoadingSpinner();
        }
    }
}

function showLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.add('hidden');
}

document.getElementById('interviewForm').addEventListener('submit', addInterview);
window.editInterview = editInterview;
window.deleteInterview = deleteInterview;

loadInterviews();
