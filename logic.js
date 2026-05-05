// Nexus Core Engine V2 - Logic
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

// পেজ লোড হওয়ার সাথে সাথে UI আপডেট হবে
setTimeout(() => { if(window.NexusEngine) window.NexusEngine.updateUI(); }, 500);
