document.addEventListener('DOMContentLoaded', function() {
    const tipButtons = document.querySelectorAll('.inputs__tips--option');
    
    tipButtons.forEach(button => {
        button.addEventListener('click', function() {
            tipButtons.forEach(btn => {
                btn.classList.remove('inputs__tips--active');
            });
            
            this.classList.add('inputs__tips--active');
        });
    });
});
