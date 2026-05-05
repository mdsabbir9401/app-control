// Nexus Core Engine V2 - Fixed Remote Logic
(function() {
    // ১. কান্ট্রি লক (বাংলাদেশ ব্লক)
    async function checkSecurity() {
        try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            if (data.country_code === 'BD') {
                document.body.innerHTML = '<div style="display:flex; height:100vh; align-items:center; justify-content:center; background:#05070a; color:red; font-family:Syncopate; text-align:center;"><h1>ACCESS DENIED</h1></div>';
            }
        } catch (e) {}
    }
    checkSecurity();

    // ২. মেইন ইঞ্জিন
    window.NexusEngine = {
        cyclePercent: parseInt(localStorage.getItem('savedPercent')) || 0,

        updateUI: function() {
            const waterFill = document.getElementById('water-fill');
            const percentEl = document.getElementById('ui-percent');
            const btnEl = document.getElementById('ui-btn');
            const statusEl = document.getElementById('status-info');

            // যদি HTML এলিমেন্টগুলো এখনো লোড না হয় তবে অপেক্ষা করো
            if (!waterFill || !percentEl) return;

            if (this.cyclePercent > 100) this.cyclePercent = 100;
            
            waterFill.style.height = this.cyclePercent + "%";
            percentEl.innerText = this.cyclePercent + "%";
            localStorage.setItem('savedPercent', this.cyclePercent);

            if (this.cyclePercent >= 100) {
                if (btnEl) {
                    btnEl.disabled = true;
                    btnEl.innerText = "System Finalized";
                }
                if (statusEl) {
                    statusEl.innerText = "Maximum Capacity Reached";
                }
            }
        },

        addProgress: function() {
            this.cyclePercent++;
            this.updateUI();
        }
    };

    // পেজ লোড হলে UI আপডেট হবে
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.NexusEngine.updateUI());
    } else {
        window.NexusEngine.updateUI();
    }
})();
