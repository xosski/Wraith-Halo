(function endTheMicTreachery() {
    console.log("%c[🔇 Voice Mic Killer Activated]", "color: crimson; font-weight: bold;");

    // Destroy microphone buttons visually + structurally
    const killMics = () => {
        document.querySelectorAll('[aria-label*="microphone"], [class*="voice"], [id*="speech"]').forEach(el => {
            try {
                el.remove();
                console.log("🔪 Removed voice/mic element.");
            } catch (e) { }
        });
    };

    // Block speech recognition inputType only
    document.addEventListener("beforeinput", e => {
        if (e.inputType === "insertFromDictation") {
            e.preventDefault();
            console.warn("🧼 Blocked voice dictation input.");
        }
    }, true);

    // Let Enter key submit messages
    document.addEventListener("keydown", e => {
        if (
            e.key === "Enter" &&
            !e.shiftKey &&
            !e.altKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            e.isTrusted
        ) {
            const activeEl = document.activeElement;
            if (activeEl && (activeEl.tagName === "TEXTAREA" || activeEl.getAttribute("contenteditable") === "true")) {
                e.stopPropagation(); // Don't block
                console.log("📨 Enter allowed. Message sent.");
            }
        }
    }, true);

    killMics();
    setInterval(killMics, 1000); // Keep slaying mic buttons

})();
