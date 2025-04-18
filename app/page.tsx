import TextArea from "./components/TextArea";

export default function Home() {
  return (
    <div className="flex flex-auto border min-h-screen p-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col relative w-full border border-red-600">
        <div className="absolute bottom-0 right-0 left-0 pb-10 px-4">
          <TextArea />
        </div>
      </main>
    </div>
  );
}
