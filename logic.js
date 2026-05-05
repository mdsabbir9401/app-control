// Nexus Core Engine V2 - External Core Logic
// System Architect: Mamun Hossain

(function() {
    // ১. সিকিউরিটি চেক (বাংলাদেশ ব্লক)
    async function checkSecurity() {
        try {
            // আইপি থেকে কান্ট্রি চেক করার জন্য ipapi.co ব্যবহার করা হয়েছে
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            
            if (data.country_code === 'BD') {
                // যদি বাংলাদেশ ধরা পড়ে, তবে পুরো ডিজাইন মুছে যাবে
                document.body.innerHTML = `
                    <div style="display:flex; flex-direction:column; height:100vh; align-items:center; justify-content:center; background:#05070a; color:red; font-family: 'Syncopate', sans-serif; text-align:center;">
                        <h1 style="font-size:40px; margin-bottom:10px;">ACCESS DENIED</h1>
                        <p style="color:white; font-size:12px; letter-spacing:2px;">SERVICE NOT AVAILABLE IN YOUR REGION</p>
                    </div>`;
                window.stop(); // পরবর্তী সব স্ক্রিপ্ট লোড হওয়া বন্ধ করে দেবে
            }
        } catch (e) {
            console.log("Security Check Bypass Error");
        }
    }
    checkSecurity();

    // ২. কোর ইঞ্জিন লজিক
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
    setTimeout(() => {
        if(window.NexusEngine) window.NexusEngine.updateUI();
    }, 500);
})();
