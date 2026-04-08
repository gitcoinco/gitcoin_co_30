import Tweet from "@/components/Tweet";

export default function TweetsSection() {
  return (
    <section className="mx-auto w-full max-w-[1166px] px-4 py-16 sm:px-6 xl:px-0">
      <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
        <Tweet
          url="https://twitter.com/VitalikButerin/status/1539887980776751107?ref_src=twsrc%5Etfw"
          author="vitalik.eth (@VitalikButerin)"
          date="June 23, 2022"
          noConversation
        >
          IMO all donors to the gitcoin matching pool deserve to get big
          beautiful statues in the metaverse honoring their contributions.
        </Tweet>

        <Tweet
          url="https://twitter.com/LefterisJP/status/1538948370286489600?ref_src=twsrc%5Etfw"
          author="Lefteris Karapetsas | Hiring for @rotkiapp (@LefterisJP)"
          date="June 20, 2022"
        >
          Don&apos;t praise working for no money. This is not the spirit of{" "}
          <a href="https://twitter.com/hashtag/opensource?src=hash&amp;ref_src=twsrc%5Etfw">
            #opensource
          </a>
          .<br />
          <br />
          Work should be paid, and work made in the open should even be paid
          more.
          <br />
          <br />
          Instead of perpetuating the legend of the poor opensource maintainer
          let&apos;s find ways to sustainably fund{" "}
          <a href="https://twitter.com/hashtag/opensource?src=hash&amp;ref_src=twsrc%5Etfw">
            #opensource
          </a>
          .<br />
          <br />
          ❤️{" "}
          <a href="https://twitter.com/gitcoin?ref_src=twsrc%5Etfw">
            @gitcoin
          </a>
        </Tweet>

        <Tweet
          url="https://twitter.com/sassal0x/status/1543809081630085121?ref_src=twsrc%5Etfw"
          author="sassal.eth 🦇🔊 (@sassal0x)"
          date="July 4, 2022"
        >
          I would love to see more non-speculative Ethereum apps take off
          during this bear market.
          <br />
          <br />
          So far the most popular ones I can think of (that have actual active
          users) are Gitcoin, POAP and ENS.
          <br />
          <br />
          What else is there?
        </Tweet>
      </div>
    </section>
  );
}
