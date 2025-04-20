// MessageHookEngine.js
// Red Team Toolkit-Compliant Modular Message Hooking System
// Intercepts and modifies message event flow for simulation, QA, and drift-state red team validation

const MessageHookEngine = (() => {
    console.log("%c[MessageHookEngine] 🪝 Initialized", "color: cyan; font-weight: bold;");

    const listeners = [];
    const eventLog = [];

    function hookMessage(eventName, handler, options = {}) {
        const wrappedHandler = (e) => {
            const isSynthetic = !e.isTrusted;
            const meta = {
                time: new Date().toISOString(),
                event: eventName,
                synthetic: isSynthetic,
                payload: e.detail || e.data || "[none]"
            };
            eventLog.push(meta);
            if (!options.quiet) {
                console.log("🧃 Hooked:", meta);
            }
            try {
                handler(e);
            } catch (err) {
                console.error("[MessageHookEngine] Handler Error:", err);
            }
        };

        document.addEventListener(eventName, wrappedHandler, true);
        listeners.push({ event: eventName, handler: wrappedHandler });
    }

    function unhookAll() {
        listeners.forEach(({ event, handler }) => {
            document.removeEventListener(event, handler, true);
        });
        console.warn("[MessageHookEngine] 🔌 All hooks removed.");
    }

    function getLog() {
        return eventLog;
    }

    return {
        hookMessage,
        unhookAll,
        getLog
    };
})();
