import Hero from "./Hero";

type Props = {};

export default function HomePage({}: Props) {
  return (
    <div style={{ height: "100vh" }}>
      <Hero />
    </div>
  );
}
