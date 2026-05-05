// Nexus Core Engine V2 - External Core Logic
// System Architect: Mamun Hossain

(function() {
    // ১. সিকিউরিটি চেক
    async function checkSecurity() {
        try {
            const res = await fetch('https://api.country.is');
            const data = await res.json();
            if (data.country === '') {
                document.body.innerHTML = '<div style="display:flex; height:100vh; align-items:center; justify-content:center; background:#05070a;"><h1 style="color:red; font-family:Syncopate;">ACCESS DENIED</h1></div>';
            }
        } catch (e) {}
    }
    checkSecurity();

    // ২. ইঞ্জিন অবজেক্ট তৈরি
    window.NexusEngine = {
        cyclePercent: parseInt(localStorage.getItem('savedPercent')) || 0,

        updateUI: function() {
            const waterFill = document.getElementById('water-fill');
            const percentEl = document.getElementById('ui-percent');
            const btnEl = document.getElementById('ui-btn');
            const statusEl = document.getElementById('status-info');

            if (this.cyclePercent > 100) this.cyclePercent = 100;
            
            if (waterFill) waterFill.style.height = this.cyclePercent + "%";
            if (percentEl) percentEl.innerText = this.cyclePercent + "%";
            localStorage.setItem('savedPercent', this.cyclePercent);

            if (this.cyclePercent >= 100) {
                if (btnEl) {
                    btnEl.disabled = true;
                    btnEl.innerText = "System Finalized";
                }
                if (statusEl) {
                    statusEl.innerText = "Maximum Capacity Reached";
                    statusEl.style.color = "#38bdf8";
                }
            }
        },

        addProgress: function() {
            this.cyclePercent++;
            this.updateUI();
        }
    };

    // শুরুতে UI লোড করা
    window.addEventListener('load', () => {
        window.NexusEngine.updateUI();
    });
})();
