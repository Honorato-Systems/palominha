import { createFileRoute } from "@tanstack/react-router";
import ValentinePage from "@/components/Valentine";
import { hero, photos, coupleCouch } from "@/assets/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Para Paloma ❤️ Feliz Dia dos Namorados" },
      { name: "description", content: "Uma carta digital de amor — nossa história em momentos." },
    ],
  }),
  component: Index,
});

function Index() {
  return <ValentinePage hero={hero} photos={photos} closingImg={coupleCouch} />;
}
