import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-28">
      <Container>
        <h1 className="text-6xl">Cette page a pris une autre sortie</h1>
        <p className="mt-4 text-lg text-asphalt/75">L'adresse n'existe pas ou a changé. Reprenez depuis l'accueil.</p>
        <Link href="/" className="btn btn-rouge mt-8">Revenir à l'accueil</Link>
      </Container>
    </section>
  );
}
