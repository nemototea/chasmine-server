import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Cha'sMine" },
    { name: "description", content: "Welcome to Cha'sMine!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Cha&apos;sMine</h1>
      <p>Frontend by React Router v7, Backend by NestJS</p>
    </div>
  );
}
