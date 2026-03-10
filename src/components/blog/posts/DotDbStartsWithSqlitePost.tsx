export default function DotDbStartsWithSqlitePost() {
  return (
    <div className="mx-auto mt-12 max-w-3xl px-4 text-foreground/80 sm:px-8">
      <p className="mb-8 text-xl leading-relaxed text-foreground/90 sm:text-2xl">
        Deterministic systems rarely break first at the scheduler or the network layer. They break
        when nobody can reconstruct what a run actually did.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        A run crashes and its logs are scattered across files. State reflects one moment, but the
        events that produced it reflect another. An engineer can reproduce the code path, but not
        the exact execution context. For conventional software that is annoying. For AI-native
        systems, it is a structural problem.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        Dotlanth is trying to make execution replayable, inspectable, and eventually reliable enough
        for autonomous systems. That goal sounds lofty until you hit the first practical question:
        where do runs, logs, and state live while the system is still local-first? DotDB is our
        answer, and SQLite is its first backend.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        The core problem
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Most modern systems are optimized for elasticity, not replayability. Logs are emitted
        asynchronously. State is spread across caches, databases, and queues. Retries blur the
        difference between something happening once and appearing once. By the time a failure
        matters, engineers can usually prove that a run went wrong, but not reconstruct the exact
        path that led there.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        That gets worse with agents. An agent run is not just a stateless request. It has intent,
        intermediate decisions, tool calls, logs, and evolving state. Once an agent touches the
        world, debugging needs stronger guarantees than “we have some logs somewhere.”
      </p>

      <ul className="mb-16 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>What state did the runtime believe at that moment?</li>
        <li>What was the exact ordered sequence of events?</li>
        <li>Can we inspect the run locally without standing up more infrastructure?</li>
        <li>Can the storage model grow without throwing away the debugging model?</li>
      </ul>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Architectural insight
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        The key insight is that deterministic compute does not start with a distributed database. It
        starts with a durable local ground truth for execution history.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        That is the role of DotDB. DotDB is the logical store for run metadata, ordered logs, and
        state. It is not a claim that one database engine should rule every deployment forever. It
        is a storage contract: one model for runs, one model for ordered events, and one model for
        state snapshots and updates.
      </p>

      <div className="my-10 rounded-2xl border border-foreground/10 bg-foreground/4 px-7 py-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground/55">
          Mental model
        </p>
        <pre className="mt-4 overflow-x-auto text-sm leading-relaxed text-foreground/75">
          {`DotVM executes intent
  -> DotDB records the run
    -> ordered logs preserve the story
    -> state_kv preserves the latest durable state
      -> replay and inspection start from evidence, not guesswork`}
        </pre>
      </div>

      <p className="mb-6 text-lg leading-relaxed">
        That distinction matters because it separates the semantics from the substrate. Today,
        DotDB uses SQLite locally. Tomorrow, the same DotDB model can sit on other backends if the
        platform needs remote coordination or stronger replication. The engine can change later. The
        contract should not.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        In other words: DotDB utilizes concrete databases as implementation backends. SQLite is the
        first one because it best matches the current problem shape. The deeper asset is the storage
        model itself.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        The decision
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        For v26.1, DotDB is implemented as a local SQLite database stored under the project
        workspace, for example in{' '}
        <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">
          .dotlanth/dotdb.sqlite
        </code>
        .
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        The schema is intentionally narrow. It only covers what the runtime needs right now:
        durable runs, append-only logs, and a foundation for state persistence.
      </p>

      <div className="mb-12 rounded-2xl border border-foreground/10 bg-foreground/4 px-7 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/60">
          v26.1 schema shape
        </p>
        <pre className="overflow-x-auto text-sm leading-relaxed text-foreground/75">
          {`runs(id, created_at, updated_at, project_path, mode, status)
run_logs(run_id, seq, ts, level, message)
state_kv(namespace, key, value_blob, updated_at)`}
        </pre>
      </div>

      <p className="mb-6 text-lg leading-relaxed">
        We are also using migrations from the beginning. That sounds like a small implementation
        detail until the first schema change lands. A deterministic platform cannot ask users to
        hand-edit runtime storage every time the internal model evolves. If DotDB is going to be a
        durable part of the developer experience, upgrades have to be automatic and predictable.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        SQLite is the right fit here because it gives us transactions, ad hoc querying, low setup
        cost, and a debugging surface that normal engineers can actually inspect with standard
        tools.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Alternatives considered
      </h2>

      <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        Embedded key-value stores
      </h3>

      <p className="mb-6 text-lg leading-relaxed">
        An embedded KV store like <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">sled</code>{' '}
        looks appealing because it is lightweight and local. The problem is shape mismatch. DotDB
        does not only need key-value state. It also needs ordered run logs and ad hoc inspection by
        humans. A KV abstraction pushes too much of that structure into application code.
      </p>

      <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        Plain files and JSONL
      </h3>

      <p className="mb-6 text-lg leading-relaxed">
        Plain files are great right up until they are not. Once you need atomic writes, schema
        evolution, reliable ordering, and structured queries by run ID, file-based persistence
        starts acting like a fragile homemade database. JSONL remains useful for export and tooling,
        but not as the authoritative store for replayable execution history.
      </p>

      <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        Postgres or a remote backend
      </h3>

      <p className="mb-16 text-lg leading-relaxed">
        A remote database may make sense later, especially if DotDB needs to coordinate across
        machines or support hosted workflows. But for a local-first alpha, that would optimize for
        future scale before we have stabilized the semantics of a single run. We would be adding
        ops, network dependency, and setup friction before proving the core model.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Consequences
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        The upside is immediate. Local debugging gets better because DotDB is queryable and
        inspectable. The runtime gets a clear place to persist run identity, ordered logs, and
        state. Transactions give the system a more reliable story around durability and event
        ordering than loose files ever would.
      </p>

      <ul className="mb-10 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>Deterministic debugging gets a real local substrate.</li>
        <li>The schema is small enough to reason about and extend deliberately.</li>
        <li>Inspectability becomes part of the architecture instead of an afterthought.</li>
      </ul>

      <p className="mb-6 text-lg leading-relaxed">
        The tradeoffs are real too. SQLite adds a dependency. Migrations become part of the product.
        Concurrency has to be handled carefully as features expand. Local persistence also creates a
        security surface: logs may contain sensitive information, so the workspace database has to
        be treated as private runtime data.
      </p>

      <ul className="mb-16 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>The execution model becomes stricter because ordering now matters materially.</li>
        <li>Storage upgrades have to be correct, not merely convenient.</li>
        <li>Operational simplicity now is traded for future backend work later.</li>
      </ul>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        What this enables
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Choosing SQLite does not magically solve determinism. What it does is create the first
        honest substrate for it. With DotDB in place, Dotlanth can move toward replayable execution,
        better divergence analysis between runs, richer state tooling, and eventually backend
        portability without abandoning its local-first debugging model.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        That is the important part. Reliable AI agents will need more than traces and dashboards.
        They will need execution histories that are durable, inspectable, and grounded in a storage
        contract that survives backend changes. DotDB is where that contract begins.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Closing
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        This is not a scale-first decision. It is a correctness-first one.
      </p>

      <p className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">
        DotDB starts with SQLite because a deterministic compute platform first needs a single run
        to be understandable. Once that foundation is real, larger backends can extend it instead of
        redefining it.
      </p>
    </div>
  )
}
