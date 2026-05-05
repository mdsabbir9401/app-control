// Nexus Core Remote Security Check
(function() {
    async function checkBD() {
        try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            if (data.country_code === 'BD') {
                document.documentElement.innerHTML = `
                <body style="background:#05070a; display:flex; align-items:center; justify-content:center; height:100vh; color:red; font-family:sans-serif; text-align:center;">
                    <div>
                        <h1 style="font-size:50px;">ACCESS DENIED</h1>
                        <p style="color:white; letter-spacing:2px;">Service not available in your region.</p>
                    </div>
                </body>`;
                window.stop(); 
            }
        } catch (e) {}
    }
    checkBD();
})();
