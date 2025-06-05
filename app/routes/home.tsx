import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Accueil" },
    { name: "description", content: "Page d'accueil du site !" },
  ];
}

export default function Home() {
  return <Welcome />;
}
