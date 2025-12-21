import { useEffect } from "react";

const JotFormChatbot = () => {
  useEffect(() => {
    // Load JotForm Agent chatbot script
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/agent/embedjs/0198703ffa427218a332abfed80d7948f032/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null; // The chatbot will be rendered by the external script
};

export default JotFormChatbot;
