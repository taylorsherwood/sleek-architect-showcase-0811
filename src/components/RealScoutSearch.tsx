import { createElement } from "react";

const RealScoutSearch = () => {
  return (
    <section className="bg-primary py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <header className="mb-8 text-center">
            <h2 className="font-display text-3xl font-light tracking-tight text-primary-foreground md:text-5xl">
              Search Austin Properties
            </h2>
          </header>

          <div className="w-full">
            {createElement("realscout-advanced-search", {
              "agent-encoded-id": "QWdlbnQtMjg5NDU2",
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealScoutSearch;

