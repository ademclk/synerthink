export default function RecordFirstPost() {
  return (
    <div className="mx-auto mt-12 max-w-3xl px-4 text-foreground/80 sm:px-8">
      <p className="mb-8 text-xl leading-relaxed text-foreground/90 sm:text-2xl">
        Most software is harder to understand in production than it should be.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        When a system fails, engineers usually need answers to three basic questions:
      </p>

      <ul className="mb-10 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>What did the program actually do?</li>
        <li>What was it allowed to do?</li>
        <li>What happened immediately before the failure?</li>
      </ul>

      <p className="mb-6 text-lg leading-relaxed">
        In most stacks those answers are scattered across logs, dashboards, traces, and tribal
        knowledge. Each tool captures part of the picture, but none of them is the runtime's own
        source of truth.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        Dotlanth starts from a different premise. Observability and security should not be layers
        added later. They should follow directly from how execution works. That is the idea behind
        record-first execution in v26.1.0-alpha.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Observability after the fact is not enough
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Traditional runtimes let side effects happen from many places. A library writes directly to
        a logger. A module opens a socket. A framework starts a server. The outside world gets
        touched from all over the process.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        That architecture creates familiar problems. Policy enforcement becomes inconsistent.
        Auditing becomes expensive. Debugging turns into reconstruction.
      </p>

      <ul className="mb-16 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>Permissions get spread across implementation details.</li>
        <li>Observability tools try to rebuild the story after execution has already moved on.</li>
        <li>Teams can see symptoms, but not always the exact sequence of decisions and effects.</li>
      </ul>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        One boundary for side effects
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Dotlanth narrows that problem by forcing external effects through a single syscall boundary.
        Programs described in dotDSL run inside a register-based VM. The VM handles computation and
        control flow, but it does not reach into the host environment directly.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        If a program wants to write a log line, listen on an HTTP port, or respond to a request, it
        has to cross that boundary. The syscall layer is the only bridge between execution inside
        the VM and the outside world.
      </p>

      <div className="my-10 rounded-2xl bg-foreground/4 px-7 py-6">
        <p className="text-base leading-relaxed text-foreground/80">
          <strong className="text-foreground">Design rule:</strong> side effects should have one
          doorway, not many hidden exits.
        </p>
      </div>

      <p className="mb-16 text-lg leading-relaxed">
        That constraint is not cosmetic. It gives the runtime one place to enforce policy, one
        place to record what happened, and one place to reason about behavior under load or failure.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Permissions become part of the spec
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Once all side effects cross the same boundary, capability security becomes much simpler to
        enforce. Dotlanth starts from deny-by-default. A program declares the capabilities it needs,
        and the runtime grants only those capabilities.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        That matters for two reasons. First, the allowed behavior is visible in the program
        definition instead of buried in ambient credentials or framework defaults. Second, the check
        happens at the same boundary where the effect occurs, not as a scattered convention that
        each module must remember to apply.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        A runtime becomes easier to trust when its permissions are explicit and its enforcement path
        is narrow.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Record-first means run history is automatic
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        The same syscall boundary that enforces permissions also gives Dotlanth a natural place to
        observe execution. Rather than treating recording as a debugging feature, the runtime writes
        structured run history by default.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        In v26.1.0-alpha that history includes lifecycle events, logging activity, and HTTP server
        interactions, stored locally in DotDB. The important point is not the exact event list. The
        important point is that the record exists whether or not someone remembered to enable extra
        instrumentation.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        That is what record-first means here: a run should leave behind a durable, queryable account
        of what happened. Debugging starts from evidence, not guesswork.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Why the first release is intentionally narrow
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        The alpha does not try to prove every future Dotlanth feature at once. It proves the core
        path end to end.
      </p>

      <ul className="mb-10 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>A dotDSL program is loaded and validated.</li>
        <li>The runtime derives the capabilities it requires.</li>
        <li>The VM executes the program.</li>
        <li>External effects cross capability-gated syscalls.</li>
        <li>Run history is persisted automatically in DotDB.</li>
      </ul>

      <p className="mb-16 text-lg leading-relaxed">
        That path is deliberately small because it is architectural validation, not a feature race.
        If this model is solid, richer tooling, broader syscall coverage, and stronger replay
        workflows can be built on top of it without changing the foundation.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        What this unlocks next
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Record-first execution is not the final product. It is the prerequisite. Replayable run
        history, better runtime introspection, and stronger debugging tools all depend on the same
        foundation: a clear effect boundary and consistent event recording.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        Build those primitives first, and the rest of the system gets easier to inspect, audit, and
        evolve.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        A runtime that shows its work
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Dotlanth is an argument about how runtimes should behave. Permissions should be declared.
        Side effects should cross a visible boundary. Execution should leave behind a usable record.
      </p>

      <p className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">
        v26.1.0-alpha is the first step toward that goal: software that can explain what it did,
        while it is still fresh enough to matter.
      </p>
    </div>
  )
}
