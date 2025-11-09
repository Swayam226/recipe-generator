import Markdown from "react-markdown";

export default function GenRecipe(props) {
  return (
    <section
      ref={props.ref}
      aria-live="polite"
      className="w-75 md:w-250 bg-amber-400 rounded-xl p-8 mt-6"
    >
      <h2 className="text-amber-850 text-2xl font-bold mb-4">
        Have a delight!
      </h2>
      <article className="text-lg whitespace-pre-line">
        <Markdown>{props.recipe}</Markdown>
      </article>
    </section>
  );
}
