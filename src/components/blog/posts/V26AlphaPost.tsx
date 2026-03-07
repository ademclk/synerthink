export default function V26AlphaPost() {
    return (
        <div className="mx-auto mt-12 max-w-3xl px-4 text-foreground/80 sm:px-8">

            {/* Opening statement */}
            <p className="mb-8 text-xl leading-relaxed text-foreground/90 sm:text-2xl">
                Software should be legible. You should be able to look at a running system and know, with confidence, what it did, what it was allowed to do, and what happened when something went wrong.
            </p>

            <p className="mb-16 text-lg leading-relaxed">
                Most runtimes today treat observability and security as layers you bolt on. They are afterthoughts, patched in after the architecture has already been set. Dotlanth takes the opposite approach. Every execution decision is deliberate, every side effect is recorded, every permission is explicit.
            </p>

            {/* Divider */}
            <div className="mb-16 h-px w-full bg-foreground/8" />

            {/* Section: What is Dotlanth */}
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                A new kind of runtime.
            </h2>

            <p className="mb-6 text-lg leading-relaxed">
                Dotlanth is a runtime designed from scratch around three principles: <strong className="text-foreground">one file</strong>, <strong className="text-foreground">one runtime</strong>, and <strong className="text-foreground">nothing hidden</strong>.
            </p>

            <p className="mb-6 text-lg leading-relaxed">
                You describe what you want to build in a plain-language file called a <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">dot</code> file. Not a configuration format masquerading as a programming language. Something closer to pseudocode: readable on the first pass, writable without a manual.
            </p>

            <div className="my-10 rounded-2xl border border-foreground/10 bg-foreground/4 px-7 py-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-foreground/60">A dotDSL file: the entire definition of an HTTP API</p>
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
                That file is the complete source of truth. The runtime reads it, validates it, enforces the permissions you declared, and begins execution. No imports. No boilerplate. No hidden defaults.
            </p>

            <div className="mb-16 h-px w-full bg-foreground/8" />

            {/* Section: How it works */}
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Designed around a clear boundary.
            </h2>

            <p className="mb-6 text-lg leading-relaxed">
                At the heart of Dotlanth is a register-based virtual machine. Your <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">dot</code> file compiles into a typed internal representation that the VM interprets directly. The VM is intentionally simple: it executes instructions, manages a register file, and calls out to the host runtime when it needs to make something happen in the world.
            </p>

            <p className="mb-6 text-lg leading-relaxed">
                That call-out, the <em className="text-foreground">syscall</em>, is where everything interesting happens. Writing a log? Syscall. Starting an HTTP server? Syscall. Every side effect is routed through a single, centralized boundary. This is not an implementation detail. It is the architecture.
            </p>

            {/* Callout block */}
            <div className="my-10 rounded-2xl bg-emerald-500/6 px-7 py-6">
                <p className="text-base leading-relaxed text-foreground/80">
                    <strong className="text-foreground">Why does this matter?</strong> Because a single choke point means a single place to enforce permissions, a single place to record what happened, and a single place to audit. There are no clever shortcuts that bypass security. There are no logs that silently disappear. The architecture makes good behavior the only path forward.
                </p>
            </div>

	            <p className="mb-16 text-lg leading-relaxed">
	                The capability model is deny-by-default. If you haven’t declared <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">allow net.http.listen</code> in your <code className="rounded-md bg-foreground/8 px-2 py-0.5 text-sm font-mono text-foreground">dot</code> file, your process cannot listen on a socket. Full stop. Security is not a setting you can forget to enable. It is the starting state.
	            </p>

            <div className="mb-16 h-px w-full bg-foreground/8" />

            {/* Section: Record-first */}
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Every run leaves a trail.
            </h2>

            <p className="mb-6 text-lg leading-relaxed">
                From the moment a program begins executing, Dotlanth is recording. Run metadata, structured log events, server start times, incoming requests, and outgoing responses. All of it flows through the syscall boundary and into a local database called DotDB.
            </p>

            <p className="mb-6 text-lg leading-relaxed">
                This is what we call <strong className="text-foreground">record-first</strong>. Observability is not a plugin. It is the default mode of execution. You do not opt in to having a run history. You would have to actively opt out. We do not give you a way to do that in v26.1.
            </p>

            <p className="mb-10 text-lg leading-relaxed">
                The practical effect is immediate: you run your service, a request comes in, and you have a complete structured record of what happened before the request, during it, and after it. That record is queryable. It is local. It is yours.
            </p>

            {/* Three column highlight */}
            <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                    { label: "One File", desc: "Your entire API lives in a single dot file. The runtime derives everything from it." },
                    { label: "One Boundary", desc: "All side effects (logs, network, state) route through a single capability-gated syscall layer." },
                    { label: "One Record", desc: "Every run is automatically persisted. You always know what your software did." },
                ].map(({ label, desc }) => (
                    <div key={label} className="rounded-2xl border border-foreground/10 bg-foreground/4 px-6 py-6">
                        <p className="mb-2 text-base font-bold text-foreground">{label}</p>
                        <p className="text-sm leading-relaxed text-foreground/60">{desc}</p>
                    </div>
                ))}
            </div>

            <div className="mb-16 h-px w-full bg-foreground/8" />

            {/* Section: Why alpha */}
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                This is a foundation, not a ceiling.
            </h2>

            <p className="mb-16 text-lg leading-relaxed">
                What comes next builds directly on this. Deterministic replay. Richer DSL expressions. More syscall surface area. Developer tooling. A visual interface for run history. All of it requires a trustworthy foundation, and that is what v26.1.0-alpha is.
            </p>

            <div className="mb-16 h-px w-full bg-foreground/8" />

            {/* Closing */}
            <p className="mb-6 text-xl leading-relaxed text-foreground/90 font-medium sm:text-2xl">
                Software that is legible. Execution that is trustworthy. A runtime that tells you exactly what it did.
            </p>

            <p className="text-lg leading-relaxed">
                That is what we are building. v26.1.0-alpha is the first brick in that wall. If you are a builder who cares about runtime transparency, security by design, and execution you can actually reason about, we’d love for you to try it.
            </p>
        </div>
    )
}
