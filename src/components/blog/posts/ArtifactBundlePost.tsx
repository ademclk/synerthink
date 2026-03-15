export default function ArtifactBundlePost() {
  return (
    <div className="mx-auto mt-12 max-w-3xl px-4 text-foreground/80 sm:px-8">
      <p className="mb-8 text-xl leading-relaxed text-foreground/90 sm:text-2xl">
        Modern systems produce a lot of data about execution, but very little of it feels like the
        execution itself.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        A run fails, and the evidence is split across logs, database rows, traces, and whatever
        state happened to persist before the crash. You can usually see pieces of the story. What
        you rarely get is one portable object that answers the basic questions: what ran, what it
        saw, what it did, and where it failed.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        That gap matters more in AI systems. An agent run is not just a request with a response. It
        has inputs, intermediate decisions, tool calls, capability checks, state changes, and side
        effects. If you want reliable agents, you need more than telemetry. You need a stable
        record of the run itself.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        The core problem
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Most runtimes treat execution output as an afterthought.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Logs are useful, but they are only fragments. A trace may show timing and order, but not
        always the full input or final state. A database can store run history, but a few tables
        are not the same thing as a portable execution record.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        This leads to a common failure mode: the runtime produces evidence, but not a unit of
        evidence.
      </p>

      <ul className="mb-16 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>Debugging failures takes reconstruction work.</li>
        <li>Comparing two runs becomes harder than it should be.</li>
        <li>Exporting a run to another machine is awkward.</li>
        <li>Replay depends on best-effort logs instead of a stable contract.</li>
      </ul>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Architectural insight
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        The key idea is simple: a run should emit an artifact, not just write records.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        That artifact should be the first thing tooling reaches for. It should be the object you
        inspect, export, replay, or compare. It should exist whether the run succeeds or fails.
      </p>

      <div className="mb-12 rounded-2xl border border-foreground/10 bg-foreground/4 px-7 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/60">
          Mental model
        </p>
        <pre className="overflow-x-auto text-sm leading-relaxed text-foreground/75">
          {`intent -> execution -> artifact bundle
                       |
                       v
         inspect -> export -> replay -> compare`}
        </pre>
      </div>

      <p className="mb-6 text-lg leading-relaxed">
        Once you adopt that model, several things get easier. Inspection is simpler because the
        operator knows what to look for. Replay becomes more practical because the input snapshot
        and trace are part of a stable output. Failures become easier to reason about because a
        failed run still leaves behind a partial artifact instead of scattered clues.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        This fits naturally with Dotlanth. DotVM gives execution a deterministic boundary. DotDB
        gives the runtime a durable local store. Replayable compute needs stable traces and
        snapshots. The artifact bundle is the piece that turns those ideas into a usable interface.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        The decision
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        In Dotlanth, every execution now produces an Artifact Bundle.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        The bundle is the main interface for inspecting a run, exporting it, and replaying it.
        That rule applies to successful runs and failed runs. If a run stops halfway through, the
        bundle can be partial, but missing data must be explicit. The runtime should never silently
        skip part of the output and pretend the run is complete.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        In practice, the bundle carries the parts of execution that matter most:
      </p>

      <ul className="mb-10 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>input snapshot</li>
        <li>execution trace</li>
        <li>outcome or error state</li>
        <li>capability usage</li>
        <li>versioned metadata for tooling</li>
      </ul>

      <div className="mb-12 rounded-2xl border border-foreground/10 bg-foreground/4 px-7 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/60">
          Simplified bundle shape
        </p>
        <pre className="overflow-x-auto text-sm leading-relaxed text-foreground/75">
          {`artifact-bundle/
  manifest.json
  input_snapshot.json
  trace.jsonl
  capability_report.json
  errors.json`}
        </pre>
      </div>

      <p className="mb-16 text-lg leading-relaxed">
        DotDB still matters here, but in a narrower role. It remains the local run index and stores
        references to bundles. The bundle is the portable execution artifact. DotDB is how the
        local machine finds it quickly.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Alternatives considered
      </h2>

      <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        Logs as the primary output
      </h3>

      <p className="mb-6 text-lg leading-relaxed">
        Logs help humans read a story after the fact, but they are not a strong interface for
        tools. They are too easy to make inconsistent across success and failure paths, and they do
        not give replay a stable contract.
      </p>

      <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        Optional bundles
      </h3>

      <p className="mb-6 text-lg leading-relaxed">
        Optional artifacts sound flexible, but they quickly become unreliable. The moment bundles
        are best-effort, tooling has to assume they may not exist. That brings back the same
        ambiguity we are trying to remove.
      </p>

      <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        Bundle-only storage
      </h3>

      <p className="mb-16 text-lg leading-relaxed">
        Bundle-only storage is cleaner in one sense, but local workflows still need indexing.
        Engineers want simple queries like “show me the last failed run” or “find the bundle for
        this run ID.” DotDB is still useful for that, so the current split is pragmatic: DotDB
        indexes runs locally, and the bundle is the thing you inspect or move.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Consequences
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        The biggest benefit is clarity. Inspection, export, and replay now point at the same
        object. Tooling no longer has to depend directly on whatever internal tables or logs the
        runtime happened to produce.
      </p>

      <ul className="mb-10 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>Each run has a stable output.</li>
        <li>Auditability improves because inputs and behavior travel together.</li>
        <li>Replay has a stronger base than best-effort logs.</li>
      </ul>

      <p className="mb-6 text-lg leading-relaxed">
        The tradeoffs are real too. A bundle contract forces schema decisions earlier. Once you
        publish a layout and version it, you need to maintain it carefully. It also raises the bar
        for failure handling because partial output has to be explicit and well-formed.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        There is also a security cost. Bundles may contain sensitive inputs, request metadata, and
        logs. They should be treated as private runtime artifacts unless they have been reviewed or
        scrubbed for sharing.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        What this enables
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        This is about more than nicer debugging. It creates a better base for replayable execution,
        run comparison, and future tools that need a stable target instead of direct access to
        internal runtime storage.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        It also moves Dotlanth closer to something important for AI-native systems: execution that
        can explain itself after the fact. Reliable agents will need runs that can be inspected,
        exported, replayed, and audited without depending on live process state or one specific
        machine.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        The artifact bundle gives each run that durable shape.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Closing
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        A runtime becomes easier to trust when every run leaves behind a usable artifact.
      </p>

      <p className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">
        For Dotlanth, this is one of the first practical steps toward deterministic infrastructure
        for AI systems: every execution should leave behind enough structured evidence to be
        understood later.
      </p>
    </div>
  )
}
