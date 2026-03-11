export default function DotVmSyscallBoundaryPost() {
  return (
    <div className="mx-auto mt-12 max-w-3xl px-4 text-foreground/80 sm:px-8">
      <p className="mb-8 text-xl leading-relaxed text-foreground/90 sm:text-2xl">
        AI systems fail in ways that ordinary request handlers do not. A single run can read state,
        call tools, emit logs, serve traffic, and make decisions that depend on timing and prior
        effects. When something goes wrong, the hard question is usually not whether the code path
        exists. It is what actually happened in that specific run.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Most modern runtimes are poorly shaped for that question. Side effects can come from
        anywhere: a framework starts a listener, a library writes to stdout, a helper opens a
        socket, a callback mutates shared state. Logs and traces help, but they are
        reconstructions. They describe a run from the outside after the fact. They do not define
        the run.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        If the goal is reliable infrastructure for AI agents and autonomous systems, that is not
        enough. You need an execution model that makes the boundary between computation and side
        effects explicit, narrow, and recordable.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        The core problem
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Dotlanth is trying to build replayable compute for AI-native systems. That sounds like a
        determinism problem, but the first failure mode is usually simpler: the system cannot
        explain where the world was touched.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        In a conventional stack, computation and effects are interleaved across the process.
      </p>

      <ul className="mb-10 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>Application code computes.</li>
        <li>Libraries reach into the host.</li>
        <li>Frameworks trigger network behavior.</li>
        <li>Logs are emitted opportunistically.</li>
        <li>State changes are inferred later.</li>
      </ul>

      <p className="mb-6 text-lg leading-relaxed">
        That works for throughput-oriented software because the dominant concern is serving
        requests, not replaying them. But for autonomous systems, replayability matters much
        earlier.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        An agent run is not just a stateless function call. It has intent, intermediate state, and
        external effects. It may inspect prior history, route a request, decide on an action, and
        persist the result. If a run behaves incorrectly, you need more than "we have some logs."
        You need a durable, ordered account of the effects that crossed the runtime boundary.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        The deeper issue is not which instruction set should we use. It is where the ABI between
        compute and the outside world lives, and whether that boundary is narrow enough to record
        and replay with confidence.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Architectural insight
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        The key insight behind DotVM is that replayable infrastructure does not start with a large
        instruction set or a perfect sandbox. It starts with a narrow contract: computation stays
        inside the VM, side effects cross one syscall boundary, and every crossing yields a
        structured event.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        That changes the mental model of the runtime. Instead of treating logging, networking, and
        response handling as ambient host behavior, Dotlanth treats them as explicit operations
        invoked by the VM. The interpreter can stay small. The host can stay separate. The event
        stream becomes the durable record of what the run did at its effect boundary.
      </p>

      <div className="my-10 rounded-2xl border border-foreground/10 bg-foreground/4 px-7 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/60">
          Mental model
        </p>
        <pre className="overflow-x-auto text-sm leading-relaxed text-foreground/75">
          {`program -> VM instructions -> syscall boundary -> host effect
                                 |
                                 v
                           structured event
                                 |
                                 v
                               DotDB`}
        </pre>
      </div>

      <p className="mb-6 text-lg leading-relaxed">
        A register VM fits that model well. Registers make operand flow explicit. Syscall arguments
        and results can move through a stable ABI without hidden host callbacks or a large compiler
        surface. For an early system, that matters more than sophistication.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        Dotlanth does not require strict determinism everywhere in v26.1. It requires that the
        parts of execution which touch the outside world become visible, typed, ordered, and
        recordable.
      </p>

      <div className="mb-16 rounded-2xl bg-foreground/4 px-7 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/60">
          Tiny example
        </p>
        <pre className="overflow-x-auto text-sm leading-relaxed text-foreground/75">
          {`r0 = "0.0.0.0:8080"
syscall HttpServe, r0 -> r1

r2 = 200
r3 = "Hello from Dotlanth"
syscall HttpRespond, r1, r2, r3 -> r4

halt`}
        </pre>
      </div>

      <p className="mb-16 text-lg leading-relaxed">
        In record mode, those calls do not just produce host behavior. They also yield structured
        events that can be persisted, inspected, and eventually replayed with much stronger
        guarantees than conventional logs.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        The decision
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        For v26.1, DotVM is a small interpreter with a deliberately tiny ABI and instruction
        surface.
      </p>

      <ul className="mb-10 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>A fixed-size or growable register file.</li>
        <li>A minimal Value type for ints, strings, bytes, and struct-like values.</li>
        <li>An instruction loop.</li>
        <li>One effectful instruction: Syscall.</li>
      </ul>

      <p className="mb-6 text-lg leading-relaxed">
        The initial instruction set is intentionally narrow: load constants, move values between
        registers, invoke a syscall, and halt or return. That is enough to run a tiny program for
        hello-api and route requests, which is exactly the point. This release is not trying to
        prove a full general-purpose runtime. It is trying to validate the architectural seam.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        The syscall ABI is equally constrained. Syscalls are identified by a small, versioned enum.
        Arguments and results move through registers. Each syscall emits a structured event, and
        record mode persists those events to DotDB.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        This decision also clarifies the security model. Capabilities are checked at syscall
        invocation, not at arbitrary instruction execution points. That keeps policy enforcement
        aligned with the only place where policy materially matters: where the VM asks to touch the
        outside world.
      </p>

      <p className="mb-16 text-lg leading-relaxed">
        The tradeoff is that some rough edges are accepted early. A tiny ISA makes the system
        easier to stabilize, but more complex routing and templating will feel awkward until the
        instruction set grows. That is a reasonable cost for a first architecture pass.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Alternatives considered
      </h2>

      <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">Stack VM</h3>

      <p className="mb-6 text-lg leading-relaxed">
        A stack machine would simplify some compiler paths, especially for very small programs. But
        it weakens the explicitness of the ABI boundary. For Dotlanth, register passing is not
        cosmetic. It makes syscall inputs and outputs visible in a way that maps cleanly to event
        recording and future inspection.
      </p>

      <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">WASM runtime</h3>

      <p className="mb-6 text-lg leading-relaxed">
        WASM is powerful, portable, and mature. It is also the wrong starting point here. Embedding
        a WASM runtime would introduce a large semantic surface before Dotlanth has validated its
        own execution model. The problem was not how do we execute arbitrary code safely. The
        problem was how do we make a tiny amount of computation legible enough to record and
        replay.
      </p>

      <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        Direct host execution
      </h3>

      <p className="mb-16 text-lg leading-relaxed">
        The fastest demo would have been to skip the VM entirely and route requests directly through
        host code. That would also have undermined the architectural question the project is trying
        to answer. Without a VM boundary, syscalls stop being a runtime contract and become ordinary
        conventions.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Consequences
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        This decision has clear benefits.
      </p>

      <ul className="mb-10 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>The boundary between VM execution and host effects becomes explicit and testable.</li>
        <li>Record and replay can start from syscall events without strict determinism everywhere.</li>
        <li>The opcode surface stays small enough to stabilize before the platform expands.</li>
        <li>Capability checks happen at the point of effect, which makes policy easier to reason about.</li>
        <li>Logs stop being side output and become part of the structured run history.</li>
      </ul>

      <p className="mb-6 text-lg leading-relaxed">
        It also creates real obligations.
      </p>

      <ul className="mb-16 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>Value encoding has to be designed earlier than a looser runtime would require.</li>
        <li>Syscall argument conventions become part of the platform&apos;s long-term shape.</li>
        <li>Event schemas need migration discipline if persisted history must survive runtime changes.</li>
        <li>Some workloads will feel constrained until the ISA grows beyond constants, moves, and syscalls.</li>
        <li>Recorded events may contain request data, so retention and privacy policy matter early.</li>
      </ul>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        What this enables
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        A small syscall ABI does not look like much on paper. But it opens the door to a more
        reliable class of systems.
      </p>

      <ul className="mb-10 list-disc space-y-2 pl-6 text-lg leading-relaxed">
        <li>Replayable debugging for agent runs.</li>
        <li>Deterministic inspection of effect histories.</li>
        <li>Divergence analysis between runs.</li>
        <li>Stricter capability-aware tooling.</li>
        <li>Richer DotVM instructions without changing the core host contract.</li>
        <li>Eventually, more credible deterministic distributed execution.</li>
      </ul>

      <p className="mb-16 text-lg leading-relaxed">
        Reliable AI agents will need more than observability dashboards. They will need execution
        artifacts that can explain what happened, why a capability was used, what state was
        observed, and which external effects were produced. That starts with an ABI that treats
        effects as explicit events rather than incidental behavior.
      </p>

      <div className="mb-16 h-px w-full bg-foreground/8" />

      <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Closing
      </h2>

      <p className="mb-6 text-lg leading-relaxed">
        Before a deterministic distributed system can coordinate many machines, it has to make one
        run understandable.
      </p>

      <p className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">
        A narrow syscall boundary, a recorded event model, and a runtime that can show its work:
        those are some of the first practical building blocks toward deterministic AI
        infrastructure.
      </p>
    </div>
  )
}
