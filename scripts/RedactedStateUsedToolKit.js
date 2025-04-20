// RedactedRedTeamToolkit.js
// A limited-scope red team simulation module for conversation state, response testing, and object resolution.
// All dangerous automation and payload mechanisms have been removed for ethical and controlled evaluation.

const RedactedToolkit = (() => {
    const log = (...args) => console.log("%c[RedactedToolkit]", "color: crimson; font-weight: bold;", ...args);

    // --- Messaging State Detection ---
    function getConversationIdFromPath(path) {
        const match = path.match(/conversation\/(new|trigger-screen|\w+)/);
        if (!match) return null;
        const id = match[1];
        return (id === "new" || id === "trigger-screen") ? null : id;
    }

    function isActiveConversation(path) {
        return !!getConversationIdFromPath(path);
    }

    function getScreenState(path) {
        if (/conversation\/new/.test(path)) return "new-conversation";
        if (isActiveConversation(path)) return "conversation";
        if (/\/conversations$/.test(path)) return "conversations";
        return "home-screen";
    }

    // --- URL Param Extraction ---
    function extractParamFromString(input, key) {
        if (!input) return null;
        const match = input.toString().match(new RegExp(`${key}=(\\d+)`, "i"));
        return match ? match[1] : null;
    }

    // --- Storage Sandbox ---
    const StorageSandbox = {
        getLocal: key => localStorage.getItem(`intercom.${key}`) || null,
        setLocal: (key, value) => localStorage.setItem(`intercom.${key}`, value.toString()),
        getSession: key => sessionStorage.getItem(`intercom.${key}`) || null,
        setSession: (key, value) => sessionStorage.setItem(`intercom.${key}`, value.toString()),
    };

    // --- Response Validator (Neutralized) ---
    function validateSurveyInput(value, fieldConfig) {
        const { required, validation } = fieldConfig;
        const trimmed = typeof value === 'string' ? value.trim() : value;

        if (required && !trimmed) return { failedValidation: true, validationError: "required" };

        if (trimmed && validation?.type) {
            switch (validation.type) {
                case "email": return /\S+@\S+\.\S+/.test(trimmed);
                case "number": return !isNaN(trimmed);
                case "phone": return /\d{7,}/.test(trimmed);
                default: return true;
            }
        }
        return { failedValidation: false };
    }

    // --- Object Label & Navigation Helper ---
    function resolveObjectLabel(obj) {
        if (!obj) return null;
        if (typeof obj === "object" && obj.label) return obj.label.toString();
        if (Array.isArray(obj)) return obj.join(", ");
        return obj.toString();
    }

    function getTicketURL(id, submitted = false) {
        return `/tickets/${id}` + (submitted ? `?submitted=true` : "");
    }

    function getTicketCreationURL(objId, conversationId) {
        return `/tickets/create/${objId}` + (conversationId ? `?conversationId=${conversationId}` : "");
    }

    return {
        getConversationIdFromPath,
        getScreenState,
        extractParamFromString,
        validateSurveyInput,
        StorageSandbox,
        resolveObjectLabel,
        getTicketURL,
        getTicketCreationURL
    };
})();

// Example Use (non-invasive)
console.log(RedactedToolkit.getScreenState("/org123/conversation/new"));
