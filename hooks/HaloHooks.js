// HaloHooks.js
// Scriptable Trigger Pipeline for Wraith Halo
// Modular hook system for custom drift logic, redacted state control, and event-based overrides

const HaloHooks = (() => {
    console.log("%c[HaloHooks] 🌐 Initialized – Scriptable Trigger Pipeline", "color: magenta; font-weight: bold;");

    const hookRegistry = new Map();

    function registerHook(trigger, callback) {
        if (!hookRegistry.has(trigger)) {
            hookRegistry.set(trigger, []);
        }
        hookRegistry.get(trigger).push(callback);
        console.log(`[HaloHooks] 🔗 Hook registered for trigger: ${trigger}`);
    }

    function fireTrigger(trigger, context = {}) {
        const hooks = hookRegistry.get(trigger) || [];
        if (hooks.length === 0) {
            console.warn(`[HaloHooks] ⚠️ No hooks registered for trigger: ${trigger}`);
            return;
        }
        console.log(`[HaloHooks] 🚨 Triggered: ${trigger} | Executing ${hooks.length} hooks.`);
        hooks.forEach(fn => {
            try {
                fn(context);
            } catch (err) {
                console.error(`[HaloHooks] 💥 Error in hook for ${trigger}:`, err);
            }
        });
    }

    function listHooks() {
        return Array.from(hookRegistry.keys());
    }

    function clearHooks() {
        hookRegistry.clear();
        console.warn("[HaloHooks] ❌ All hooks cleared.");
    }

    return {
        registerHook,
        fireTrigger,
        listHooks,
        clearHooks
    };
})();
