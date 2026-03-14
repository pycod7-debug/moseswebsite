let selectedFund = "";

function navigateTo(pageId, highlightId = null) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        window.location.hash = pageId;
    }

    if (pageId === 'details' && highlightId) {
        document.querySelectorAll('.desc-block').forEach(s => s.classList.remove('highlight'));
        const section = document.getElementById('desc-' + highlightId);
        if (section) {
            section.classList.add('highlight');
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
    if (!highlightId) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectFund(name, element) {
    selectedFund = name;
    document.querySelectorAll('.fund-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
}

async function handlePayment() {
    const amount = document.getElementById('amtInput').value;
    const btn = document.getElementById('payBtn');
    
    if (!selectedFund) {
        showToast("Please select a fund first", "error");
        return;
    }
    if (!amount || amount <= 0) {
        showToast("Please enter a valid amount", "error");
        return;
    }

    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
    `;

    await new Promise(r => setTimeout(r, 2000));

    document.getElementById('receipt-fund').innerText = selectedFund;
    document.getElementById('receipt-amount').innerText = Number(amount).toLocaleString();
    document.getElementById('receipt-id').innerText = "#BD-" + Math.floor(1000 + Math.random() * 9000);

    navigateTo('thank-you');

    btn.disabled = false;
    btn.innerHTML = originalText;
    document.getElementById('amtInput').value = "";
}

function showToast(msg, type) {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-white text-sm font-bold shadow-2xl z-[100] transition-all transform animate-bounce ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

window.onhashchange = () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash);
};
