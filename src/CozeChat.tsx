import { useEffect } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CozeWebSDK: any;
  }
}

export default function CozeChat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/oversea/index.js";
    script.async = true;
    script.onload = () => {
      new window.CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7521295414411870216',
        },
        componentProps: {
          title: 'Coze',
        },
        auth: {
          type: 'token',
          token: import.meta.env.VITE_COZE_TOKEN,
          onRefreshToken: () => import.meta.env.VITE_COZE_TOKEN,
        }
      });
    };
    document.body.appendChild(script);
  }, []);

  return null;
}