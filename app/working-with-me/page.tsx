import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Working with me',
};

export default function WorkingWithMe() {
  return (
    <>
      <h1>How to work with me</h1>
      <p className="muted">
        A shortcut for anyone collaborating with me, written for myself
        rather than any employer.
      </p>

      <h2>If you&apos;re sending me something</h2>
      <p>
        Lead with the ask, and put it where I can&apos;t miss it — first
        line, not paragraph three. Tell me what you&apos;ve tried and where
        you got stuck, not just that it&apos;s broken. I&apos;d rather see
        the rough draft on day one than the polished thing a week late and
        pointed the wrong way — that&apos;s true of code, docs, everything.
      </p>
      <p>
        Default to writing it down over talking about it — a message, a PR
        comment, a doc. It&apos;s searchable later and it forces the thinking
        to actually happen. The exception is when I&apos;m the blocker: then
        just interrupt me.
      </p>

      <h2>If I&apos;m sending you something</h2>
      <p>
        I&apos;ll ask a lot of questions up front, before I start — I&apos;d
        rather we&apos;re properly aligned than find out three days in that I
        built the wrong thing. That&apos;s the front-loaded part; once
        I&apos;m actually building, I&apos;m not narrating progress.
      </p>
      <p>
        I&apos;ll tell you what I want from you when I hand something over.
        If I ask for a review early, I&apos;ll say what kind (sanity check
        vs. full review). If I don&apos;t say, assume I&apos;ve tested it
        thoroughly myself and I&apos;m asking for the full review — I
        don&apos;t hand off half-baked work by default.
      </p>
      <p>
        I like experimenting and understanding things properly before I
        commit to an approach, but that happens in the questions phase, not
        in what lands in your inbox.
      </p>
      <p>
        Slow replies usually mean heads-down, not ignoring you — nudge me if
        it&apos;s actually urgent.
      </p>

      <h2>How I think about the work itself</h2>
      <p>
        Depth over breadth. I&apos;d rather get one part of a system
        genuinely right than have five half-built features. If a claim&apos;s
        checkable, I&apos;d rather prove it (benchmark, test, graph) than
        assert it.
      </p>

      <h2>Reach me</h2>
      <p>
        <strong>Discord:</strong> <code>izman48</code> — quickest way to get
        my attention.
      </p>
    </>
  );
}
