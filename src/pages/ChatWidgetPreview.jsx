import React from "react";

export default function ChatWidgetPreview() {
  return (
    <div>
      <h2>Preview Chat Widget</h2>
      <iframe
        src="https://convo-x-signup.vercel.app/chat-widget?user_id=example1@gmail.com&primaryColor=%230575e6&secondaryColor=%23e6f0ff&fontFamily=Inter"
        style={{
          width: "400px",
          height: "600px",
          border: "none",
        }}
        title="Chat Widget"
      />
    </div>
  );
}
