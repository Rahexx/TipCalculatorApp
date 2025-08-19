document.addEventListener('DOMContentLoaded', function() {
    const tipButtons = document.querySelectorAll('.inputs__tips--option');
    const peopleInput = document.querySelector("#inputs__people--input");
    const peopleSection = document.querySelector('.inputs__people');
    
    tipButtons.forEach(button => {
        button.addEventListener('click', function() {
            tipButtons.forEach(btn => {
                btn.classList.remove('inputs__tips--active');
            });
            
            this.classList.add('inputs__tips--active');
        });
    });

    
    peopleInput.addEventListener('input', function() {
        const value = parseInt(this.value) || 0;
        
        if (value === 0) {
            peopleSection.classList.add('inputs__people--error');
        } else {
            peopleSection.classList.remove('inputs__people--error');
        }
    });
});
