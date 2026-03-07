export default function DotDslPseudocodePost() {
  return (
    <div className="mx-auto mt-12 max-w-3xl px-4 text-foreground/80 sm:px-8">
      <p className="mb-8 text-xl leading-relaxed text-foreground/90 sm:text-2xl">
        Some decisions look cosmetic until you imagine living with them for years. Naming the source
        file <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">dot</code>{' '}
        is one of those decisions.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        On paper, both names can hold the same information. In practice, they invite two different
        ways of thinking. One says, “this is a data file; shape a tree and hope it lines up.” The
        other says, “this is the source of the program; read it top to bottom like intent.”
      </p>

      <p className="mb-12 text-lg leading-relaxed">
        dotDSL v0.1 is trying to be the shortest readable distance between what an author means and
        what the Dotlanth runtime can actually trust.
      </p>

      <div className="my-12 rounded-[2rem] border border-foreground/10 bg-foreground/4 px-7 py-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground/55">
          The real question
        </p>
        <p className="mt-3 text-lg leading-relaxed text-foreground/85">
          Should authors feel like they are configuring a document, or describing a system?
        </p>
      </div>

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        A DSL should sound like what it wants from the world
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        A general configuration format can hold settings, lists, maps, and all the little
        hierarchies software tends to accumulate. But a file format always brings its own gravity.
        People start editing shape instead of meaning. They start thinking in nested objects instead
        of actions, declarations, and boundaries.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        That is exactly the wrong instinct for Dotlanth. The core design problem is not how to
        serialize a project description. The problem is how to express a program in a form that can
        be read quickly, validated strictly, and lowered predictably into the runtime. Once that is
        the target, generic config machinery starts looking like the wrong abstraction.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        That is why the source file becomes{' '}
        <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">
          dot
        </code>
        . No extension. No suggestion that it is merely a project document in disguise. The file
        name itself sets the expectation that you are looking at the canonical source of a Dotlanth
        program, not a generic document that happened to land in the project root.
      </p>

      <div className="my-10 rounded-2xl bg-emerald-500/6 px-7 py-6">
        <p className="text-base leading-relaxed text-foreground/80">
          The point of the syntax is not cleverness. The point is to make the intended path feel
          natural and every accidental path feel out of place.
        </p>
      </div>

      <p className="mb-12 text-lg leading-relaxed">
        Once you see the language that way, the rest of the design starts to click. Of course
        blocks end with <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">end</code>.
        Of course indentation is only for readability. Of course the first non-empty line is the
        version. Those choices are not stylistic. They remove hidden structure from the language and
        make the parser depend on explicit markers instead of layout accidents.
      </p>

      <div className="mb-12 rounded-2xl border border-foreground/10 bg-foreground/4 px-7 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/60">
          One example is enough
        </p>
        <pre className="overflow-x-auto text-sm leading-relaxed text-foreground/70">
          {`dot 0.1

app "hello-api"
allow log
allow net.http.listen

server listen 8080

api "public"
  route GET "/hello"
    respond 200 "Hello from Dotlanth"
  end
end`}
        </pre>
      </div>

      <p className="mb-16 text-lg leading-relaxed">
        The interesting thing about this example is not that it is short. It is that every line is
        pulling in the same direction. <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">app</code>,{' '}
        <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">allow</code>,{' '}
        <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">api</code>, and{' '}
        <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">route</code>{' '}
        shape the validated project model. <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">respond</code>{' '}
        points toward runtime behavior. The syntax does not merely describe a document. It draws a
        line between declarations that shape the spec and operations that imply runtime effects.
      </p>

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Good language design is also runtime design
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        This is the deeper reason a general-purpose config format was the wrong fit. It tends to
        blur the boundary between “describing a structure” and “describing execution.” Dotlanth does
        not want that blur. The runtime needs a stable internal representation that can validate
        cleanly and lower cleanly toward VM instructions and host syscalls. The surface language
        should expose that shape early, so users are learning the real model rather than a temporary
        notation.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Explicit <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">end</code>{' '}
        blocks help because they make structure visible without turning whitespace into law. A route
        begins, does its work, and ends. An API block begins, contains routes, and ends. The parser
        gets something simpler. The reader gets something calmer. Future tooling gets a syntax that
        can be explained back to the user without pretending indentation is semantics.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        The same principle shows up in diagnostics. Errors need both a stable semantic path and a
        source span. That is a quiet but important choice. A message like{' '}
        <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">
          apis[0].routes[0].path
        </code>{' '}
        tells tooling what failed in the validated model, while file, line, and column tell the
        human where to look. The language is teaching both audiences at once.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        That makes the proposed future “bytecode listing” feel natural too. If a language is built
        from statements that already resemble runtime concepts, showing the lowered IR later becomes
        an act of clarification rather than translation. That matters because good tooling should
        reduce the conceptual distance between source, validated model, and execution.
      </p>

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        A language that knows how to say no
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        There is also a security story here, and it is not ornamental. Dotlanth’s capability model
        depends on declared permissions. Side effects are deny-by-default. If a program wants to
        listen on a port, that should be visible in the source. If it never declares the capability,
        the runtime should fail closed. No ambient permission. No hidden inheritance. No polite
        guesswork.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Strict syntax is what makes that posture believable. Unknown statements should be rejected.
        Missing required statements should be rejected. Strings should stay quoted. Numbers should
        stay numeric. A narrow language is not a limitation in this context; it is the cost of
        making the validated model stable enough to secure and evolve.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        That is the tradeoff hidden inside the elegance. People will want more almost immediately.
        More verbs. More shortcuts. Richer control flow. The language is right to resist that
        pressure in v0.1. Small languages age better when they become larger on purpose instead of larger by
        leakage.
      </p>

      <p className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">
        The win is that the language behaves like source: explicit enough to validate, narrow enough
        to secure, and close enough to execution that the runtime does not need to invent a second
        mental model behind the user’s back.
      </p>
    </div>
  )
}
