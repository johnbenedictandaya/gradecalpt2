document.getElementById('grade-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const absences = parseInt(document.getElementById('absences').value);
            const prelimGrade = parseFloat(document.getElementById('prelim-grade').value);
            const quizzesGrade = parseFloat(document.getElementById('quizzes-grade').value);
            const requirementsGrade = parseFloat(document.getElementById('requirements-grade').value);
            const recitationGrade = parseFloat(document.getElementById('recitation-grade').value);

            // Validate inputs
            if (absences < 0) {
                alert("Absences must be 0 or greater.");
                return;
            }
            if (prelimGrade < 0 || prelimGrade > 100 ||
                quizzesGrade < 0 || quizzesGrade > 100 ||
                requirementsGrade < 0 || requirementsGrade > 100 ||
                recitationGrade < 0 || recitationGrade > 100) {
                alert("Grades must be between 0 and 100.");
                return;
            }

            // Attendance Calculation
            if (absences >= 4) {
                alert('FAILED due to excessive absences.');
                return;
            }

            const attendanceGrade = 100 - (10 * absences);

            // Class Standing Calculation
            const classStanding = (quizzesGrade * 0.4) + (requirementsGrade * 0.3) + (recitationGrade * 0.3);

            // Prelim Grade Calculation
            const prelimWeightedGrade = (prelimGrade * 0.6) + (attendanceGrade * 0.1) + (classStanding * 0.3);

            // Overall Grade Calculation weights
            const prelimWeight = 0.20;
            const midtermWeight = 0.30;
            const finalWeight = 0.50;

            // Required Grades Calculation

            function calculateGrades(prelimGrade, targetGrade) {
                const remainingGrade = targetGrade - (prelimWeight * prelimGrade);
        
                if (midtermWeight + finalWeight === 0) {
                    return [null, null];
                }
        
                let reqFinalGrade = (remainingGrade - (midtermWeight * 100)) / finalWeight;
                let reqMidtermGrade;
        
                if (reqFinalGrade > 100) {
                    reqMidtermGrade = (remainingGrade - (finalWeight * 100)) / midtermWeight;
                    if (reqMidtermGrade < 0 || reqMidtermGrade > 100) {
                        return [null, null];
                    }
                    return [reqMidtermGrade, 100];
                }
        
                if (reqFinalGrade < 0) {
                    return [null, null];
                }
        
                return [100, reqFinalGrade];
            }

            const [midtermPass, finalPass] = calculateGrades(prelimWeightedGrade, 75);
            const [midtermDean, finalDean] = calculateGrades(prelimWeightedGrade, 90);

            // Display results
            document.getElementById('prelim-result').textContent = `Prelim Grade: ${prelimWeightedGrade.toFixed(2)}`;
            document.getElementById('midterm-result').textContent = `To pass with 75%, you need a Midterm grade of ${midtermPass.toFixed(2)} and a Final grade of ${finalPass.toFixed(2)}.`;
            document.getElementById('final-result').textContent = `To achieve Dean's Lister status (90%), you need a Midterm grade of ${midtermDean.toFixed(2)} and a Final grade of ${finalDean.toFixed(2)}.`;
            document.getElementById('results').classList.remove('hidden');
        });



let container = document.getElementById('container2');
let count = 50;
for(var i = 0; i<50; i++){
    let leftSnow = Math.floor(Math.random() * container.clientWidth);
    let topSnow = Math.floor(Math.random() * container.clientHeight);
    let widthSnow = Math.floor(Math.random() * 50);
    let timeSnow = Math.floor((Math.random() * 5) + 5);
    let blurSnow = Math.floor(Math.random() * 10);
    console.log(leftSnow);
    let div = document.createElement('div');
    div.classList.add('bading');
    div.style.left = leftSnow + 'px';
    div.style.top = topSnow + 'px';
    div.style.width = widthSnow + 'px';
    div.style.height = widthSnow + 'px';
    div.style.animationDuration = timeSnow + 's';
    div.style.filter = "blur(" + blurSnow + "px)";
    container.appendChild(div);
}