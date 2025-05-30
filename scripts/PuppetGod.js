// 🧠 PuppetGodPatched.js – GhostCore Tier 3
// With persistent storage + full-blown synthetic event logging

(function PuppetGodPatched() {
    console.log("%c[PuppetGod] 👁️ Activated – Input Sanctifier (Patched + Logged)", "color: violet; font-weight: bold;");

    const STORAGE_KEY = "PUPPETGOD_LOG";

    const storeLog = (entry) => {
        const log = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        log.push({
            time: new Date().toISOString(),
            ...entry
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
    };

    const logConsole = (type, message) => {
        const tag = `[PuppetGod] ${type === 'block' ? '🧨' : '✒️'}`;
        const color = type === 'block' ? 'orangered' : 'limegreen';
        console.log(`%c${tag} ${message}`, `color: ${color}; font-weight: bold;`);
    };

    // Allowed synthetic event types in trusted contexts
    const ALLOWLIST = [
        "prosemirrorDispatchTransaction",
        "insertText",
        "beforeinput",
        "compositionend"
    ];

    // Known trusted editor containers
    const TRUSTED_CONTAINERS = [
        "[data-editor]",
        "[contenteditable]",
        "[role='textbox']",
        "textarea",
        "input[type='text']"
    ];

    const isTrustedEditor = (el) => {
        if (!el) return false;
        return TRUSTED_CONTAINERS.some(sel => el.closest?.(sel));
    };

    const interceptDispatch = (type, el) => {
        const allowed = ALLOWLIST.includes(type) && isTrustedEditor(el);
        const logEntry = {
            event: type,
            tag: el?.tagName,
            trusted: allowed,
            selector: el?.outerHTML?.slice(0, 150) || "[unknown]"
        };
        storeLog(logEntry);

        if (allowed) {
            logConsole("allow", `${type} allowed in trusted editor.`);
        } else {
            logConsole("block", `${type} blocked.`);
        }
    };

    ["beforeinput", "pointerdown", "focusin", "compositionend"].forEach(eventType => {
        document.addEventListener(eventType, e => {
            if (!e.isTrusted) interceptDispatch(e.type, e.target);
        }, true);
    });
    (function PuppetGodFinalUnlock() {
        console.log("%c[PuppetGod] 🧿 Final Unlock Protocol Activated", "color: gold; font-weight: bold;");

        const isFromProseMirror = (el) => {
            return !!(el && el.closest && el.closest(".ProseMirror"));
        };

        const allowedEvents = ["insertText", "compositionend", "prosemirrorDispatchTransaction"];

        const logDispatch = (type, target, override = false) => {
            const context = isFromProseMirror(target) ? "[ProseMirror]" : "[Other]";
            const status = override ? "✒️ ALLOWED" : "🧨 BLOCKED";
            console.log(`[PuppetGod] ${status} synthetic dispatch: ${type} ${context}`);
        };

        document.addEventListener("beforeinput", e => {
            if (!e.isTrusted && e.inputType === "insertFromDictation") {
                e.preventDefault();
                logDispatch("insertFromDictation", e.target, false);
            }
        }, true);

        const interceptedEvents = ["prosemirrorDispatchTransaction", "pointerdown", "focusin", "compositionend"];

        interceptedEvents.forEach(type => {
            document.addEventListener(type, e => {
                if (!e.isTrusted) {
                    if (type === "prosemirrorDispatchTransaction" && isFromProseMirror(e.target)) {
                        logDispatch(type, e.target, true); // Allow it
                        return;
                    }
                    logDispatch(type, e.target, false); // Block others
                }
            }, true);
        });
    })();

    const autoClean = () => {
        const nodes = document.querySelectorAll('[aria-label*="microphone"], [id*="speech"], [class*="voice"]');
        nodes.forEach(node => {
            try {
                node.remove();
                console.log("🔇 Removed unwanted voice UI element.");
            } catch (_) { }
        });
    };

    setInterval(autoClean, 2000);
})();
