import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  message: string;
}

export function EmailTemplate({
  fullName,
  email,
  message,
}: Readonly<EmailTemplateProps>): React.ReactElement {
  return (
    <div style={{ fontFamily: "sans-serif", lineHeight: 1.5, color: "#111" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "8px" }}>
        New portfolio message
      </h1>
      <p style={{ margin: "0 0 4px" }}>
        <strong>From:</strong> {fullName}
      </p>
      <p style={{ margin: "0 0 16px" }}>
        <strong>Email:</strong>{" "}
        <a href={`mailto:${email}`} style={{ color: "#2563eb" }}>
          {email}
        </a>
      </p>
      <p style={{ margin: "0 0 8px" }}>
        <strong>Message:</strong>
      </p>
      <blockquote
        style={{
          margin: 0,
          padding: "12px 16px",
          borderLeft: "3px solid #d4d4d8",
          background: "#fafafa",
          whiteSpace: "pre-wrap",
        }}
      >
        {message}
      </blockquote>
    </div>
  );
}
