// Nexus Core Engine V2 - Remote Security Logic
(function() {
    async function blockSystem() {
        try {
            // আইপি থেকে কান্ট্রি চেক (নির্ভরযোগ্য API)
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            console.log("Country Detected:", data.country_code);

            // যদি বাংলাদেশ (BD) হয়, তবে পুরো পেজ মুছে ফেলবে
            if (data.country_code === 'BD' || data.country === 'BD') {
                document.documentElement.innerHTML = `
                <div style="background:#05070a; color:red; height:100vh; width:100vw; display:flex; align-items:center; justify-content:center; font-family:sans-serif; text-align:center; position:fixed; top:0; left:0; z-index:999999;">
                    <div>
                        <h1 style="font-size:45px; margin-bottom:10px;">🚫 ACCESS DENIED</h1>
                        <p style="color:white; letter-spacing:2px; font-size:14px;">This system is not available in Bangladesh.</p>
                        <div style="margin-top:20px; color:#334155; font-size:10px;">Nexus Core Security Engine</div>
                    </div>
                </div>`;
                window.stop(); // পরবর্তী সব লোডিং বন্ধ
            }
        } catch (error) {
            console.log("Security Bypass Error");
        }
    }
    blockSystem();
})();
