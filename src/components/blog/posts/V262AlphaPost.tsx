export default function V262AlphaPost() {
  return (
    <div className="mx-auto mt-12 max-w-3xl px-4 text-foreground/80 sm:px-8">
      <p className="mb-8 text-xl leading-relaxed text-foreground/90 sm:text-2xl">
        AI systems do not fail cleanly. A single run can validate an input, start a service, touch
        local state, emit logs, deny a capability, and leave the operator with five partial stories
        about what happened.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        That is a telemetry problem on the surface, but it is really an evidence problem. Logs can
        hint. Metrics can summarize. Traces can reconstruct. None of those automatically become the
        unit you hand to an engineer and say: this is the run, this is what it was allowed to do,
        this is what it did, and this is what survived after it finished.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        Dotlanth v26.2.0-alpha is the first release built around that unit of truth. The headline
        is not the new TUI by itself. The headline is that Dotlanth now treats the artifact bundle
        as the product surface of execution, and the Capability Lab TUI is the workbench that makes
        that model usable.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Telemetry is not enough for agentic systems
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Conventional observability assumes the primary job is to watch a service from the outside.
        That is often good enough for throughput-oriented systems. It is not good enough for
        AI-native execution where a run may contain intent, validation, capability checks, local
        state mutation, and externally visible effects that all matter to debugging and trust.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        When something goes wrong in that environment, operators need more than dashboards. They
        need a portable execution record that preserves inputs, ordered evidence, and the security
        posture of the run itself.
      </p>

      <div className="my-10 rounded-[2rem] border border-foreground/10 bg-foreground/4 px-7 py-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground/55">
          Artifact-first means
        </p>
        <p className="mt-4 text-lg leading-relaxed text-foreground/85">
          The question stops being “do we have some logs?” and becomes “do we have the run?”
        </p>
      </div>

      <p className="mb-16 text-lg leading-relaxed">
        That distinction is why v26.2 matters. Dotlanth already had a VM boundary, DotDB, and
        record-first execution. This release makes those ideas composable as an operator workflow:
        validate, run, inspect, export, replay.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        What changed in v26.2.0-alpha
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        The visible surface is{' '}
        <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">
          dot tui
        </code>
        , a ratatui-based capability lab that exercises the Dotlanth stack from one CLI entrypoint.
        But the important part is what sits beneath it.
      </p>

      <ul className="mb-10 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>Every concrete run now produces a versioned artifact bundle rather than ad hoc output.</li>
        <li>Bundles include the input snapshot, trace export, state diff, and capability usage report.</li>
        <li>DotDB indexes bundles by external run ID so inspect, export, and replay stay tied to one identity.</li>
        <li>Capability accounting is explicit: declared, used, and denied capabilities are reported per run.</li>
        <li>Replay becomes a real operator path instead of an aspirational architectural claim.</li>
      </ul>

      <div className="mb-12 rounded-2xl border border-foreground/10 bg-foreground/4 px-7 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/60">
          The evidence loop
        </p>
        <pre className="overflow-x-auto text-sm leading-relaxed text-foreground/75">
          {`parse -> validate -> run -> record
                           |
                           v
                  artifact bundle + DotDB index
                           |
            inspect -> export -> replay -> compare`}
        </pre>
      </div>

      <p className="mb-16 text-lg leading-relaxed">
        That loop is what makes the release interesting for infrastructure builders. The TUI is not
        mocking the runtime. It is driving real subsystem execution against deterministic demo
        fixtures under <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">.dotlanth/demo/</code>,
        which means the product is increasingly being exercised the same way operators will use it.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Why artifacts become the unit of truth
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        A durable bundle forces architectural discipline. Once the platform promises that every run
        yields the same required sections, the runtime can no longer treat inspection as a
        best-effort side effect. That changes behavior all the way down the stack.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        In v26.2, the bundle format is intentionally plain: a directory with a manifest and
        well-known files like <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">trace.jsonl</code>,{' '}
        <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">state_diff.json</code>, and{' '}
        <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">capability_report.json</code>.
        That is not accidental minimalism. It keeps the artifact inspectable by humans, streamable
        for tooling, and portable outside the original machine.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Just as importantly, the artifact is not stored as an opaque blob buried in one database
        row. DotDB keeps the index and integrity metadata, while the bundle remains a normal
        on-disk object that can be copied, exported, or scrubbed. That separation keeps the lookup
        path fast without sacrificing portability.
      </p>

      <div className="my-10 rounded-2xl bg-emerald-500/6 px-7 py-6">
        <p className="text-base leading-relaxed text-foreground/80">
          An artifact-first runtime is not saying “files are nice.” It is saying that evidence has
          to outlive the process in a form other humans and tools can actually work with.
        </p>
      </div>

      <p className="mb-16 text-lg leading-relaxed">
        This is the same reason capability reporting matters in the bundle. A run should not only
        say what happened. It should also say what was declared, what was used, and what was denied.
        For agent infrastructure, that is the difference between observability and auditability.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        The Capability Lab is an operator interface, not a demo shell
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        The new TUI matters because it collapses the distance between architecture and practice. One
        surface now drives parse and validate workflows, real run and serve flows, artifact
        inspection and export, capability review, and input replay into fresh run IDs.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        That sounds like tooling polish, but it is more foundational than that. A platform starts
        to become operationally legible when the shortest path through it reinforces the real model.
        In this release, the shortest interactive path is no longer “run a script and hope you know
        where the outputs landed.” It is “open the lab, exercise a capability, inspect the evidence,
        replay the run.”
      </p>

      <div className="mb-12 rounded-2xl border border-foreground/10 bg-foreground/4 px-7 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/60">
          Quickstart
        </p>
        <pre className="overflow-x-auto text-sm leading-relaxed text-foreground/75">
          {`just tui

# or
cargo run -p dot -- tui`}
        </pre>
      </div>

      <p className="mb-16 text-lg leading-relaxed">
        Inside the workbench, the release deliberately centers capability-first navigation:
        parse and validate, run and serve, security inspection, artifacts, and replay. That keeps
        the create-name capabilities visible while you test the runtime instead of burying them
        behind generic product labels.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        What this means for AI infrastructure
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        The near-term value of v26.2 is not that Dotlanth suddenly proves full determinism across
        environments. It does not. The value is that it stabilizes the contracts that future
        determinism work will depend on: run identity, bundle shape, trace schema, capability
        accounting, state-diff scope, and replay semantics.
      </p>

      <ul className="mb-10 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>Senior engineers get a clearer debugging substrate than scattered logs and shell scripts.</li>
        <li>Founders get a more credible story for trust, incident analysis, and release verification.</li>
        <li>Researchers get stable artifacts they can compare across runtime iterations.</li>
        <li>AI infrastructure teams get a model where policy and evidence stay coupled to execution.</li>
      </ul>

      <p className="mb-16 text-lg leading-relaxed">
        That last point is easy to understate. Capability systems often weaken once tooling drifts
        away from enforcement. Dotlanth is trying to do the opposite: the run that is denied is the
        same run that yields the evidence explaining the denial.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Honest boundaries
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        This release is careful about what it does and does not claim. Replay is input replay, not a
        proof of full determinism across environments or side effects. HTTP serving remains
        intentionally minimal. Bundle creation begins only after Dotlanth resolves a concrete{' '}
        <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">
          .dot
        </code>{' '}
        file path. And the resulting bundles, along with{' '}
        <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">
          .dotlanth/dotdb.sqlite
        </code>
        , should still be treated as sensitive runtime artifacts.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        Those limits are not admissions of weakness. They are signs that the release is stabilizing
        contracts before broadening scope. For a system that wants to support reliable autonomous
        execution, that sequencing matters.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Closing
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Dotlanth v26.1 established the runtime posture. Dotlanth v26.2 starts turning that posture
        into an operating surface.
      </p>

      <p className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">
        For AI-native systems, reliability will depend on more than smart models and fast runtimes.
        It will depend on whether each run can leave behind enough structured evidence to be
        inspected, exported, replayed, and trusted. That is the transition this release begins.
      </p>
    </div>
  )
}
