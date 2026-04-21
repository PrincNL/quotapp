import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-4">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="text-3xl font-bold">Pagina niet gevonden</h1>
        <p className="text-muted-foreground">
          Deze pagina bestaat niet of is verplaatst.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Terug naar home
        </Link>
      </div>
    </div>
  );
}
