document.addEventListener('DOMContentLoaded', function() {
    const tipButtons = document.querySelectorAll('.inputs__tips--option');
    const peopleInput = document.querySelector("#inputs__people--input");
    const peopleSection = document.querySelector('.inputs__people');
    const billInput = document.querySelector('#inputs__bill---input');
    const resetButton = document.querySelector('.preview__reset');
    const previewTip = document.querySelector('.preview__value--tip');
    const previewBill = document.querySelector('.preview__value--total');
    let selectedTip = 0;

    function toNumber(value) {
        const n = Number(value);
        return Number.isFinite(n) ? n : 0;
    }

    function setPreviewValues(tipPerPerson, totalPerPerson) {
        previewTip.textContent = formatCurrency(tipPerPerson);
        previewBill.textContent = formatCurrency(totalPerPerson);
    }

    function resetPreviewValues() {
        setPreviewValues(0, 0);
    }

    const formatCurrency = (value) => `$${value.toFixed(2)}`;

    const getBillValue = () => Math.max(0, toNumber(billInput.value));

    const getPeopleValue = () => Math.max(0, Math.floor(toNumber(peopleInput.value)));

    function normalizeTipFromButton(button) {
        if (!button || button.classList.contains('inputs__tips--custom')) return 0;
        let raw = button.dataset.tip;
        return toNumber(parseFloat(raw) / 100);
    }

    function initializeSelectedTip() {
        const activeButton = document.querySelector('.inputs__tips--option.inputs__tips--active');
        selectedTip = normalizeTipFromButton(activeButton);
    }

    function checkResetButtonState() {
        const billValue = Math.floor(getBillValue());
        if (billValue === 0) {
            resetButton.classList.add('preview__reset--hide');
        } else {
            resetButton.classList.remove('preview__reset--hide');
        }
    }

    function updatePeopleErrorState() {
        const peopleValue = getPeopleValue();
        if (peopleValue === 0) {
            peopleSection.classList.add('inputs__people--error');
        } else {
            peopleSection.classList.remove('inputs__people--error');
        }
    }

    function calculateTipAndTotal() {
        const billValue = getBillValue();
        const peopleValue = getPeopleValue();
        
        if (billValue === 0 || peopleValue === 0) {
            resetPreviewValues();
            return;
        }

        const tipTotal = billValue * selectedTip;
        const tipPerPerson = tipTotal / peopleValue;
        const totalPerPerson = (billValue + tipTotal) / peopleValue;
        setPreviewValues(tipPerPerson, totalPerPerson);
    }

    tipButtons.forEach(button => {
        button.addEventListener('click', function() {
            tipButtons.forEach(btn => {
                btn.classList.remove('inputs__tips--active');
            });

            this.classList.add('inputs__tips--active');
            selectedTip = normalizeTipFromButton(this);
            calculateTipAndTotal();
        });
    });

    peopleInput.addEventListener('input', function() {
        updatePeopleErrorState();
        calculateTipAndTotal();
    });
    
    billInput.addEventListener('input', function() {
        checkResetButtonState();
        calculateTipAndTotal();
    });

    resetButton.addEventListener('click', function() {
        billInput.value = 0;
        peopleInput.value = 1;
        resetPreviewValues();
        
        tipButtons.forEach(btn => {
            btn.classList.remove('inputs__tips--active');
        });
        document.querySelector('[data-tip="15"]').classList.add('inputs__tips--active');
        selectedTip = 0.15;
        
        checkResetButtonState();
        updatePeopleErrorState();
    });

    initializeSelectedTip();
    checkResetButtonState();
    updatePeopleErrorState();
    calculateTipAndTotal();
});
