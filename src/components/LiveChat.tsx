import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
import { trackAction } from "../lib/track";

const CRISP_WEBSITE_ID = import.meta.env.VITE_CRISP_WEBSITE_ID as
  | string
  | undefined;

export default function LiveChat() {
  useEffect(() => {
    if (!CRISP_WEBSITE_ID) {
      console.warn(
        "LiveChat: VITE_CRISP_WEBSITE_ID is not set — chat widget disabled."
      );
      return;
    }

    Crisp.configure(CRISP_WEBSITE_ID);

    Crisp.chat.show();

    // Feed real chat engagement into the same interaction stream that
    // pageviews and form submits go into, so the ops dashboard reports
    // reflect chat activity too
    Crisp.chat.onChatOpened(() => {
      trackAction("chat_opened");
    });
    Crisp.message.onMessageSent(() => {
      trackAction("chat_message_sent");
    });
  }, []);

  return null;
}