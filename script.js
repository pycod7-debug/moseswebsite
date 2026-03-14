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

function handlePayment() {
    const amount = document.getElementById('amtInput').value;
    if (!selectedFund) {
        alert("Select a fund first.");
        return;
    }
    if (!amount || amount <= 0) {
        alert("Enter a donation amount.");
        return;
    }
    alert(`Processing UGX ${Number(amount).toLocaleString()} for the ${selectedFund}. Gakyali Mabaga!`);
}

window.onhashchange = () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash);
};