document.addEventListener("DOMContentLoaded", () => {
    // DOM Element References
    const btnMulai = document.getElementById("btnMulai");
    const btnHentikan = document.getElementById("btnHentikan");
    const panelIdle = document.getElementById("panelIdle");
    const panelQR = document.getElementById("panelQR");
    
    const selectMatkul = document.getElementById("selectMatkul");
    const selectPertemuan = document.getElementById("selectPertemuan");
    const txtDisplayInfo = document.getElementById("txtDisplayInfo");
    const txtDisplaySesi = document.getElementById("txtDisplaySesi");
    
    const qrContainer = document.getElementById("qrcode");
    const txtCountdown = document.getElementById("txtCountdown");
    const timerProgress = document.getElementById("timerProgress");
    const tableBodyLog = document.getElementById("tableBodyLog");

    let qrGeneratorInstance = null;
    let timerInterval = null;
    let countdownValue = 30;

    // Generates the secret encrypted string payload
    function generateQRContent() {
        const matkul = selectMatkul.value;
        const pertemuan = selectPertemuan.value;
        const randomToken = Math.random().toString(36).substring(2, 8).toUpperCase();
        
        // Structure format: "INF305|SESSION-13|TOKEN-XXXXXX"
        return `${matkul}|SESSION-${pertemuan}|TOKEN-${randomToken}`;
    }

    function refreshQRCodeDisplay() {
        const dataPayload = generateQRContent();
        qrContainer.innerHTML = "";

        // Render QR Code using library
        qrGeneratorInstance = new QRCode(qrContainer, {
            text: dataPayload,
            width: 220,
            height: 220,
            colorDark : "#030712",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }

    function startCountdownCycle() {
        countdownValue = 30;
        txtCountdown.innerText = countdownValue;
        timerProgress.style.width = "100%";
        clearInterval(timerInterval);
        
        timerInterval = setInterval(() => {
            countdownValue--;
            txtCountdown.innerText = countdownValue;
            
            const remainingPercent = (countdownValue / 30) * 100;
            timerProgress.style.width = `${remainingPercent}%`;

            if (countdownValue <= 0) {
                refreshQRCodeDisplay();
                countdownValue = 30;
                timerProgress.style.width = "100%";
            }
        }, 1000);
    }

    // Live Frontend Simulation: Automatically inserts your credentials into the table
    function triggerStudentMockScan() {
        setTimeout(() => {
            const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            
            const newRowHtml = `
                <tr class="bg-indigo-950/20 hover:bg-indigo-950/40 transition duration-150 animate-pulse">
                    <td class="py-3 px-4 text-indigo-400 font-bold">3</td>
                    <td class="py-3 px-4 font-mono text-indigo-300 font-semibold">2200016000</td>
                    <td class="py-3 px-4 font-bold text-white flex items-center gap-1">
                        Farah Faizah
                        <span class="text-[10px] bg-indigo-600 px-1.5 py-0.5 rounded text-white font-normal uppercase">You</span>
                    </td>
                    <td class="py-3 px-4 text-indigo-300 text-xs font-medium">25/05/2026 ${currentTime}</td>
                    <td class="py-3 px-4"><span class="bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2 py-1 rounded-md text-xs font-bold">Attended</span></td>
                </tr>
            `;
            tableBodyLog.insertAdjacentHTML('beforeend', newRowHtml);
        }, 5000); 
    }

    // Button event listener for starting session
    btnMulai.addEventListener("click", () => {
        const courseNameText = selectMatkul.options[selectMatkul.selectedIndex].text;
        const sessionText = selectPertemuan.options[selectPertemuan.selectedIndex].text;

        txtDisplayInfo.innerText = courseNameText.split(" - ")[1];
        txtDisplaySesi.innerText = `${sessionText} — Attendance Registration Active`;

        panelIdle.classList.add("hidden");
        panelQR.classList.remove("hidden");
        btnMulai.classList.add("hidden");
        btnHentikan.classList.remove("hidden");

        refreshQRCodeDisplay();
        startCountdownCycle();
        triggerStudentMockScan();
    });

    // Button event listener for stopping session
    btnHentikan.addEventListener("click", () => {
        clearInterval(timerInterval);
        qrContainer.innerHTML = "";
        
        panelIdle.classList.remove("hidden");
        panelQR.classList.add("hidden");
        btnMulai.classList.remove("hidden");
        btnHentikan.classList.add("hidden");
    });
});