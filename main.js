document.addEventListener('DOMContentLoaded', function() {
    const tipButtons = document.querySelectorAll('.inputs__tips--option');
    const peopleInput = document.querySelector("#inputs__people--input");
    const peopleSection = document.querySelector('.inputs__people');
    const billInput = document.querySelector('#inputs__bill---input');
    const resetButton = document.querySelector('.preview__reset');
    
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
        
        checkResetButtonState();
    });
    
    billInput.addEventListener('input', function() {
        checkResetButtonState();
    });
    
    function checkResetButtonState() {
        const billValue = parseInt(billInput.value) || 0;
        const peopleValue = parseInt(peopleInput.value) || 0;
        
        if (billValue === 0 && peopleValue === 0) {
            resetButton.classList.add('preview__reset--hide');
        } else {
            resetButton.classList.remove('preview__reset--hide');
        }
    }
});
