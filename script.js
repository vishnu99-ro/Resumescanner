document.getElementById('resume-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('resume');
    const keywordsInput = document.getElementById('job-keywords');
    const resultDiv = document.getElementById('result');

    if (!fileInput.files.length) {
        alert("Please upload a resume file.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const resumeText = event.target.result.toLowerCase();
        const jobKeywords = keywordsInput.value.toLowerCase().split(',').map(keyword => keyword.trim());

        // Count the number of matching keywords
        let matchCount = 0;
        jobKeywords.forEach(keyword => {
            if (resumeText.includes(keyword)) {
                matchCount++;
            }
        });

        // Calculate match percentage
        const matchPercentage = (matchCount / jobKeywords.length) * 100;
        
        // Display the result
        resultDiv.innerHTML = `Match Score: ${matchPercentage.toFixed(2)}%`;
    };

    reader.readAsText(file);
});
