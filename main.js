document.addEventListener('DOMContentLoaded', function() {
    const tipButtons = document.querySelectorAll('.inputs__tips--option');
    const peopleInput = document.querySelector("#inputs__people--input");
    const peopleSection = document.querySelector('.inputs__people');
    const billInput = document.querySelector('#inputs__bill---input');
    const resetButton = document.querySelector('.preview__reset');
    let selectedTip = 0;

    function normalizeTipFromButton(button) {
        if (!button || button.classList.contains('inputs__tips--custom')) return 0;
        let raw = button.dataset.tip;
        return parseFloat(raw) / 100;
    }

    function initializeSelectedTip() {
        const activeButton = document.querySelector('.inputs__tips--option.inputs__tips--active');
        selectedTip = normalizeTipFromButton(activeButton);
    }

    tipButtons.forEach(button => {
        button.addEventListener('click', function() {
            tipButtons.forEach(btn => {
                btn.classList.remove('inputs__tips--active');
            });

            this.classList.add('inputs__tips--active');

            selectedTip = normalizeTipFromButton(this);
        });
    });

    initializeSelectedTip();
    
    peopleInput.addEventListener('input', function() {
        const value = parseInt(this.value) || 0;
        
        if (value === 0) {
            peopleSection.classList.add('inputs__people--error');
        } else {
            peopleSection.classList.remove('inputs__people--error');
        }
        
    });
    
    billInput.addEventListener('input', function() {
        checkResetButtonState();
    });
    
    function checkResetButtonState() {
        const billValue = parseInt(billInput.value) || 0;
        
        if (billValue === 0) {
            resetButton.classList.add('preview__reset--hide');
        } else {
            resetButton.classList.remove('preview__reset--hide');
        }
    }
});
