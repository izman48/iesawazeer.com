import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function About() {
  return (
    <>
      <h1>About me</h1>
      <p>
        I grew up in Sri Lanka and moved to the UK to study Computer Science
        at the University of Warwick. These days I&apos;m in London, working
        at Bloomberg.
      </p>
      <p>
        As a kid I played a lot of cricket. At university that competitive
        streak found a new home in Rocket League — I captained Warwick&apos;s
        team across multiple seasons.
      </p>
      <h2>nilu</h2>
      <p>
        I&apos;m founding <strong>nilu inc</strong>. The name comes from my
        mom, so I have a personal attachment to the brand — it&apos;s not a
        throwaway startup label.
      </p>
      <p>
        The first thing I&apos;m building under it is{' '}
        <a href="https://finance.nilu.app">finance.nilu.app</a>, born out of
        exploring my own financial education. I&apos;m a big believer in
        dogfooding: I build things I would definitely want to use before
        asking anyone else to use them. Over time I&apos;m open to building
        many things under the nilu brand — but only ones that pass that test.
      </p>
    </>
  );
}
