// Nexus Core Security Control
(async function() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        // যদি বাংলাদেশ হয়, তবে ডিজাইন ডিলিট করে দেবে
        if (data.country_code === 'BD') {
            document.body.innerHTML = `
            <div style="background:#05070a; color:red; height:100vh; display:flex; align-items:center; justify-content:center; font-family:sans-serif; text-align:center;">
                <div>
                    <h1 style="font-size:40px;">ACCESS DENIED</h1>
                    <p style="color:white;">Service not available in Bangladesh.</p>
                </div>
            </div>`;
            window.stop(); 
        }
    } catch (error) {
        console.log("Security Check Skipped");
    }
})();
