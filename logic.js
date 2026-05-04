// আপনার কন্ট্রোল রুমের সঠিক লিঙ্ক
const CONTROL_URL = "https://raw.githubusercontent.com/mdsabbir9401/app-control/main/config.json";

async function startSystem() {
    try {
        const response = await fetch(CONTROL_URL);
        const data = await response.json();

        // যদি স্ট্যাটাস active না থাকে তবে অ্যাপ বন্ধ করে দেবে
        if (data.status !== 'active') {
            document.body.innerHTML = '<h1 style="color:red; text-align:center; margin-top:40vh;">ACCESS DENIED</h1>';
            return;
        }
        
        // অ্যাপ একটিভ থাকলে বাকি কাজ শুরু হবে
        initApp();
    } catch (e) {
        console.log("Security Check Passed");
    }
}

function initApp() {
    // এখানে আপনার সেই ওয়াটার লেভেল এবং বাটন এর আসল লজিক থাকবে
    console.log("App Running...");
    
    let cyclePercent = parseInt(localStorage.getItem('savedPercent')) || 0;
    const water = document.getElementById('water-fill');
    const percent = document.getElementById('ui-percent');
    const btn = document.getElementById('ui-btn');

    function updateUI() {
        if (cyclePercent > 100) cyclePercent = 100;
        if (water) water.style.height = cyclePercent + "%";
        if (percent) percent.innerText = cyclePercent + "%";
        localStorage.setItem('savedPercent', cyclePercent);
        
        if (cyclePercent >= 100 && btn) {
            btn.disabled = true;
            btn.innerText = "Completed";
        }
    }

    // বাটন ক্লিকের জন্য গ্লোবাল ফাংশন
    window.processStart = function() {
        if (cyclePercent >= 100) return;
        if (btn) btn.disabled = true;

        if (typeof show_10655013 === 'function') {
            show_10655013().then(() => {
                cyclePercent++;
                updateUI();
                setTimeout(() => { if(cyclePercent < 100 && btn) btn.disabled = false; }, 10000);
            }).catch(() => { if(btn) btn.disabled = false; });
        }
    };

    updateUI(); // শুরুতে একবার রান করা
}

// সিস্টেম চালু করুন
startSystem();
