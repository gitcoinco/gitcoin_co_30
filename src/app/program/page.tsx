import type { Metadata } from "next";
import { pageSeo } from "@/lib/page-seo";
import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
// Original icons from gitcoin.co/program
function IconOne({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M11.999 17.376C11.103 17.376 10.431 16.718 10.431 15.892C10.431 15.43 10.585 15.094 11.061 14.646C11.537 14.198 11.859 13.792 11.859 13.484V12.98C11.439 12.896 11.103 12.588 11.019 12.168H10.515C10.193 12.168 9.73105 12.504 9.33905 12.938C8.94705 13.372 8.59705 13.568 8.10705 13.568C7.26705 13.568 6.62305 12.896 6.62305 12C6.62305 11.104 7.26705 10.432 8.10705 10.432C8.51305 10.432 8.83505 10.572 9.11505 10.852C9.67505 11.412 10.109 11.86 10.515 11.86H11.019C11.103 11.426 11.439 11.118 11.859 11.048V10.544C11.859 10.306 11.677 9.99802 11.299 9.62002L11.005 9.32602C10.613 8.93402 10.431 8.57002 10.431 8.10802C10.431 7.26802 11.117 6.62402 11.999 6.62402C12.895 6.62402 13.567 7.28202 13.567 8.10802C13.567 8.58402 13.329 9.03202 12.867 9.45202C12.391 9.88602 12.167 10.25 12.167 10.544V11.048C12.601 11.118 12.909 11.426 12.979 11.86H13.483C13.791 11.86 14.155 11.636 14.575 11.146C14.995 10.67 15.443 10.432 15.891 10.432C16.731 10.432 17.375 11.118 17.375 12C17.375 12.896 16.717 13.568 15.891 13.568C15.499 13.568 15.163 13.428 14.897 13.162C14.351 12.616 13.889 12.168 13.483 12.168H12.979C12.909 12.588 12.601 12.896 12.167 12.98V13.484C12.167 13.778 12.405 14.128 12.867 14.562C13.329 14.996 13.567 15.43 13.567 15.892C13.567 16.732 12.881 17.376 11.999 17.376Z" fill="currentColor"/>
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="currentColor"/>
    </svg>
  );
}
function IconTwo({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12.0148 17.04C11.3988 17.04 11.0628 16.704 11.0628 16.158V16.116C11.0908 15.542 11.4128 14.534 11.5948 13.988L11.6508 13.736C11.6508 13.666 11.6088 13.61 11.5248 13.582L11.3428 13.512C11.1888 13.47 11.0628 13.4 10.9648 13.302C10.8668 13.204 10.8108 13.148 10.7688 13.148C10.7268 13.148 10.6288 13.218 10.5028 13.372L10.2228 13.666L9.43884 14.478C9.08884 14.828 8.73884 15.052 8.40284 15.052C7.94084 15.052 7.47884 14.506 7.47884 13.974C7.47884 13.764 7.57684 13.568 7.78684 13.386C7.98284 13.218 8.40284 13.064 9.01884 12.91C9.64884 12.756 10.0128 12.672 10.1668 12.63C10.3068 12.588 10.3768 12.532 10.3768 12.448L10.3488 12.252L10.3348 12C10.3348 11.916 10.3488 11.846 10.3768 11.776C10.3908 11.706 10.4048 11.636 10.4048 11.566C10.4048 11.51 10.3908 11.468 10.3488 11.454C10.2928 11.426 10.2088 11.384 10.0828 11.356L8.54284 10.964C7.87084 10.796 7.46484 10.446 7.46484 10.04C7.46484 9.61996 7.89884 8.94796 8.38884 8.94796C8.55684 8.94796 8.75284 9.01796 8.97684 9.15796C9.18684 9.29796 9.48084 9.56396 9.85884 9.95596L10.5028 10.628C10.6288 10.768 10.7128 10.838 10.7688 10.838C10.8108 10.838 10.8808 10.796 10.9928 10.684C11.0908 10.586 11.2308 10.516 11.3988 10.46C11.5668 10.404 11.6508 10.348 11.6508 10.264L11.5948 10.012C11.4548 9.61996 11.0908 8.47196 11.0628 7.88396V7.84196C11.0628 7.30996 11.3988 6.95996 12.0148 6.95996C12.6028 6.95996 12.9388 7.26796 12.9388 7.84196V7.88396C12.9248 8.19196 12.8548 8.59796 12.6868 9.11596L12.4068 10.012L12.3508 10.264C12.3508 10.348 12.4348 10.418 12.6168 10.474C12.7988 10.53 12.9248 10.586 13.0228 10.698C13.1068 10.796 13.1768 10.838 13.2468 10.838C13.3028 10.838 13.4008 10.768 13.5268 10.628L13.7928 10.334C14.2968 9.78796 14.6608 9.40996 14.9268 9.22796C15.1928 9.04596 15.4168 8.94796 15.6128 8.94796C16.1028 8.94796 16.5368 9.60596 16.5368 10.04C16.5368 10.446 16.1308 10.782 15.4588 10.964L14.8428 11.132C14.1708 11.314 13.7788 11.384 13.7088 11.426C13.6388 11.468 13.5968 11.496 13.5968 11.566C13.5968 11.636 13.6108 11.706 13.6388 11.762C13.6528 11.818 13.6668 11.902 13.6668 12C13.6668 12.098 13.6528 12.182 13.6388 12.238C13.6248 12.294 13.6108 12.364 13.6108 12.448C13.6108 12.532 13.7228 12.602 13.9188 12.644L14.3108 12.742C14.3528 12.756 14.7308 12.84 15.4588 13.036C16.1728 13.232 16.5228 13.54 16.5228 13.974C16.5228 14.492 16.1028 15.052 15.6128 15.052C15.4448 15.052 15.2488 14.982 15.0388 14.842C14.8288 14.702 14.5208 14.436 14.1428 14.044L13.4988 13.372C13.3728 13.218 13.2748 13.148 13.2328 13.148C13.1908 13.148 13.1348 13.19 13.0228 13.302C12.9108 13.414 12.7848 13.498 12.6028 13.526C12.4348 13.582 12.3508 13.652 12.3508 13.736L12.4068 13.988C12.5468 14.38 12.9108 15.542 12.9388 16.116V16.158C12.9388 16.732 12.6028 17.04 12.0148 17.04ZM12.0148 13.036C12.5888 13.036 13.0508 12.602 13.0508 12C13.0508 11.426 12.5888 10.964 12.0148 10.964C11.4408 10.964 10.9788 11.426 10.9788 12C10.9788 12.588 11.4408 13.036 12.0148 13.036Z" fill="currentColor"/>
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="currentColor"/>
    </svg>
  );
}
function IconThree({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8.83667 16.0879C8.61267 16.0879 8.40267 15.9899 8.20667 15.7939C8.01067 15.5979 7.91267 15.3879 7.91267 15.1639C7.91267 14.9259 8.02467 14.6879 8.23467 14.4779C8.54267 14.1699 8.94867 13.9459 9.43867 13.6939C9.87267 13.4699 10.3347 13.2039 10.8667 12.7979C10.7547 12.6439 10.6707 12.4479 10.6287 12.2379C9.97067 12.3359 9.46667 12.4619 8.99067 12.6159C8.45867 12.7839 8.02467 12.9099 7.59067 12.9099C6.98867 12.9099 6.63867 12.5599 6.63867 11.9999C6.63867 11.4399 6.98867 11.0899 7.59067 11.0899C8.02467 11.0899 8.45867 11.2159 8.99067 11.3839C9.46667 11.5379 9.97067 11.6779 10.6427 11.7759C10.6707 11.5659 10.7547 11.3699 10.8807 11.2019C10.3347 10.7959 9.87267 10.5299 9.43867 10.3059C8.94867 10.0539 8.54267 9.82994 8.23467 9.52194C8.02467 9.31194 7.91267 9.07394 7.91267 8.83594C7.91267 8.61194 8.01067 8.40194 8.20667 8.20594C8.40267 8.00994 8.61267 7.91194 8.83667 7.91194C9.07467 7.91194 9.31267 8.02394 9.52267 8.23394C9.83067 8.54194 10.0547 8.94794 10.3067 9.43794C10.5307 9.87194 10.7967 10.3339 11.2027 10.8799C11.3707 10.7539 11.5667 10.6699 11.7767 10.6419C11.6787 9.96994 11.5387 9.46594 11.3847 8.98994C11.2167 8.45794 11.0907 8.02394 11.0907 7.58994C11.0907 6.98794 11.4407 6.63794 12.0007 6.63794C12.5607 6.63794 12.9107 6.98794 12.9107 7.58994C12.9107 8.02394 12.7847 8.45794 12.6167 8.98994C12.4627 9.46594 12.3367 9.96994 12.2387 10.6279C12.4487 10.6699 12.6447 10.7539 12.7987 10.8659C13.2047 10.3339 13.4707 9.87194 13.6947 9.43794C13.9467 8.94794 14.1707 8.54194 14.4787 8.23394C14.6887 8.02394 14.9267 7.91194 15.1647 7.91194C15.3887 7.91194 15.5987 8.00994 15.7947 8.20594C15.9907 8.40194 16.0887 8.61194 16.0887 8.83594C16.0887 9.07394 15.9767 9.31194 15.7667 9.52194C15.4587 9.82994 15.0527 10.0539 14.5627 10.3059C14.1287 10.5299 13.6667 10.7959 13.1347 11.2019C13.2467 11.3699 13.3307 11.5519 13.3727 11.7759C14.0307 11.6779 14.5347 11.5379 15.0107 11.3839C15.5427 11.2159 15.9767 11.0899 16.4107 11.0899C17.0127 11.0899 17.3627 11.4399 17.3627 11.9999C17.3627 12.5599 17.0127 12.9099 16.4107 12.9099C15.9767 12.9099 15.5427 12.7839 15.0107 12.6159C14.5347 12.4619 14.0307 12.3359 13.3727 12.2379C13.3307 12.4479 13.2607 12.6439 13.1347 12.8119C13.6807 13.2039 14.1287 13.4699 14.5627 13.6939C15.0527 13.9459 15.4587 14.1699 15.7667 14.4779C15.9767 14.6879 16.0887 14.9259 16.0887 15.1639C16.0887 15.3879 15.9907 15.5979 15.7947 15.7939C15.5987 15.9899 15.3887 16.0879 15.1647 16.0879C14.9267 16.0879 14.6887 15.9759 14.4787 15.7659C14.1707 15.4579 13.9467 15.0519 13.6947 14.5619C13.4707 14.1279 13.2047 13.6799 12.8127 13.1339C12.6447 13.2599 12.4487 13.3439 12.2387 13.3719C12.3367 14.0299 12.4627 14.5339 12.6167 15.0099C12.7847 15.5419 12.9107 15.9759 12.9107 16.4099C12.9107 17.0119 12.5607 17.3619 12.0007 17.3619C11.4407 17.3619 11.0907 17.0119 11.0907 16.4099C11.0907 15.9759 11.2167 15.5419 11.3847 15.0099C11.5387 14.5339 11.6787 14.0299 11.7767 13.3719C11.5667 13.3299 11.3707 13.2459 11.2027 13.1339C10.7967 13.6659 10.5307 14.1279 10.3067 14.5619C10.0547 15.0519 9.83067 15.4579 9.52267 15.7659C9.31267 15.9759 9.07467 16.0879 8.83667 16.0879Z" fill="currentColor"/>
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="currentColor"/>
    </svg>
  );
}

const listIcons = [IconOne, IconTwo, IconThree];

export const metadata: Metadata = pageSeo.program;

const stats = [
  { value: "3,715", label: "Projects Raised Funds" },
  { value: "3.8M", label: "Unique Donations" },
  { value: "$50,000,000+", label: "Towards Public Goods" },
];

const steps = [
  {
    n: "1",
    title: "Funds are pooled",
    subtitle: "Gitcoin raises a pool of funds",
    description:
      "First, we raise an initial pool of matching funds with the support of the Gitcoin community. These matching funders include: individuals, organizations, repeat donors and champions of public goods. Their combined resources fund the matching pool for the round.",
  },
  {
    n: "2",
    title: "Application Period",
    subtitle: "Grantees submit applications for round participation",
    description:
      "Grantees can apply to a specific round or in some cases, multiple rounds, where they meet the eligibility criteria before going through an onboarding process.",
  },
  {
    n: "3",
    title: "Review Period",
    subtitle: "Gitcoin reviews applications against set of criteria",
    description:
      "Once the application period has closed, our team carefully reviews each one. If a grantee's application is accepted into a round, they will be notified and their profile will be displayed in Builder.",
  },
  {
    n: "4",
    title: "Crowdfunding Period",
    subtitle: "Supporters vote and donate",
    description:
      "Then, we deploy the round so the community can decide how the matching funds are distributed to grantees through Quadratic Funding, which multiplies the funding impact to projects that receive broader support.",
  },
  {
    n: "5",
    title: "Funds are Distributed",
    subtitle: "Gitcoin distributes matching funds once the grants round is complete",
    description:
      "At the end of the round, projects will receive both their donations from supporters and the allocated matching funds from Gitcoin. This tends to take a few weeks so we can check all donations for Sybil interference. Gitcoin keeps none of the funds raised — it all goes directly to the relative projects.",
  },
];

const grantees = [
  {
    name: "EIP-1559",
    description: "The Groundbreaking Change that Made Ethereum Ultra-Sound Money",
    href: "/case-studies/eip-1559-how-quadratic-funding-legitimized-ethereum-s-most-important-fee-market-reform",
    banner: "/content-images/case-studies/eip-1559-how-quadratic-funding-legitimized-ethereum-s-most-important-fee-market-reform/banner.jpg",
  },
  {
    name: "Optimism",
    description: "A Rapid Transformation from a Research Firm to $2B+ in Impact",
    href: "/case-studies/optimism-from-plasma-group-research-to-a-2b-layer-2-ecosystem",
    banner: "/content-images/case-studies/optimism-from-plasma-group-research-to-a-2b-layer-2-ecosystem/banner.jpg",
  },
  {
    name: "Tornado Cash",
    description: "Programming Financial Privacy",
    href: "/case-studies/tornado-cash-how-quadratic-funding-sustained-ethereum-s-most-important-privacy-tool",
    banner: "/content-images/case-studies/tornado-cash-how-quadratic-funding-sustained-ethereum-s-most-important-privacy-tool/banner.jpg",
  },
  {
    name: "Shamba Network",
    description: "Equipping Smallholder Farmers to Conserve Ecosystems",
    href: "/case-studies/shamba-network-equipping-smallholder-farmers-to-conserve-ecosystems",
    banner: "/content-images/case-studies/shamba-network-equipping-smallholder-farmers-to-conserve-ecosystems/banner.png",
  },
  {
    name: "Coin Center",
    description: "Defending Our Rights in Washington D.C.",
    href: "/case-studies/coin-center-defending-cryptocurrency-rights-through-community-funded-advocacy",
    banner: "/content-images/case-studies/coin-center-defending-cryptocurrency-rights-through-community-funded-advocacy/banner.jpg",
  },
  {
    name: "Austin Griffith",
    description: "The Quadratic Freelancer Onboarding Thousands of Developers",
    href: "/case-studies/austin-griffith-quadratic-freelancer-onboarding-developers",
    banner: "/content-images/case-studies/austin-griffith-quadratic-freelancer-onboarding-developers/banner.png",
  },
];

const testimonials = [
  {
    quote:
      "Gitcoin Grants is establishing itself as a significant pillar of the Ethereum ecosystem that more and more projects are relying on for some or all of their support.",
    name: "Vitalik Buterin",
    title: "Ethereum Founder",
    image: "/assets/program/vitalik-buterin.jpeg",
  },
  {
    quote:
      "One of the unlocks Gitcoin Grants provided for us was around building in public and building with the community that was ultimately be able to support us. We got deep within the [Gitcoin] community, we found friends and that slowly helped us build our reputation and get rewarded for that.",
    name: "Neeraj Agrawal",
    title: "Coin Center",
    image: "/assets/program/neeraj-agrawal.png",
  },
  {
    quote:
      "Quadratic funding has been such a lifeline for my project. It's been amazing. Web3 Beach was all bootstrapped. For the first year, I was just using my own funds to support the project. Then I got introduced to Gitcoin Grants and in our first round we landed around $9,000 which was huge for a project based in Latin America.",
    name: "Carlos Melgar",
    title: "Web3 Beach",
    image: "/assets/program/carlos-melgar.jpeg",
  },
  {
    quote:
      "In a lot of cases, new ideas don't need a million dollars to get off the ground. Sometimes all you need is 5, 10, 15k to actually get something going. I see quadratic funding as a path to liberty for a lot of people who have a project that they really want to get off the ground.",
    name: "Paige D.",
    title: "FrontierDAO",
    image: "/assets/program/paige-d.jpeg",
  },
  {
    quote:
      "[Gitcoin Grants is] phenomenal not only because of the resources that are of course distributed to us, but also just the pure bottom line recognition that the things that we're doing are visible to people and they actually care about them.",
    name: "Jeremy Akers",
    title: "Regens Unite",
    image: "/assets/program/jeremy-akers.jpeg",
  },
  {
    quote:
      "The biggest difference between Gitcoin Grants and other QF rounds is the strong sense of community. In other rounds, I have to bring my own community to vote for me. At Gitcoin around 40% of the votes were from people I didn't even know. So for me, Gitcoin Grants wasn't so much about the money as much as it was reaching more values-aligned community members.",
    name: "Devansh Mehta",
    title: "Voicedeck",
    image: "/assets/program/devansh-mehta.jpeg",
  },
];

const partnerRow1 = ["Momus", "Ethereum Foundation", "Yearn", "Polygon", "Coinbase", "ENS", "Badger", "NounsDAO"];
const partnerRow2 = ["Optimism", "Protocol Labs", "Uniswap", "Chainlink", "Balancer", "Aragon", "a16z", "ForceDAO", "Synthetix", "Aurora"];
const partnerRow3 = ["1inch", "Kraken", "Schmidt Futures", "Celo", "Binance", "Anoma", "Unlock Protocol", "Zora", "VitaDAO", "The Graph", "Starkware", "Scroll", "Aave Grants"];

const faqs = [
  {
    q: "When does it run?",
    a: (
      <>
        The Gitcoin Grants program has run quarterly since 2019. Check out{" "}
        <a
          href="https://grants.gitcoin.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline hover:text-teal-400"
        >
          grants.gitcoin.co
        </a>{" "}
        for the latest information on active or upcoming rounds.
      </>
    ),
  },
  {
    q: "How do I become a matching pool funder?",
    a: (
      <>
        If you&apos;re interested in helping to fund our matching pool, we&apos;d
        love to hear from you.{" "}
        <a
          href="https://forms.gle/VZfzrH24TK1MhkFBA"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline hover:text-teal-400"
        >
          Contact us
        </a>{" "}
        to learn more.
      </>
    ),
  },
  {
    q: "How do I apply?",
    a: (
      <>
        You can use Grants Stack&apos;s{" "}
        <a
          href="https://builder.gitcoin.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline hover:text-teal-400"
        >
          Builder
        </a>{" "}
        to create a single profile that you can use to apply to all the rounds
        for which you meet the eligibility criteria. If you&apos;re new to our
        Grants program, keep an eye on{" "}
        <a
          href="https://twitter.com/gitcoin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline hover:text-teal-400"
        >
          our Twitter
        </a>{" "}
        and website for updates and announcements on the next grants round. If
        you&apos;re an existing grantee, our team will reach out to you via the
        email that you previously used to participate.
      </>
    ),
  },
  {
    q: "How do I donate?",
    a: (
      <>
        <a
          href="https://explorer.gitcoin.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline hover:text-teal-400"
        >
          Explorer
        </a>{" "}
        allows supporters (donors) to browse through and donate to projects that
        have been approved in any single round. Beginning with GG18, we&apos;ve
        shipped multi-round checkout, which will enable donors to check out
        projects participating in different rounds across different chains, all
        in the same cart.{" "}
        <a
          href="https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-grants-program/supporter-donor-faq/explorer-guide"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline hover:text-teal-400"
        >
          Find more details on how to donate.
        </a>
      </>
    ),
  },
  {
    q: "Why should I donate?",
    a: "By making an individual donation, you're supporting public goods around the world and helping secure funding for innovative projects. Contributions of 1 DAI can sometimes mean up to 400 DAI in matching. Your contributions will be met by matching funding, widening the reach of your donation. Example: If 10 people contribute 1 DAI each (= 1 USD) the Quadratic Funding matching will be higher than if only 1 person is contributing 10 DAI or 2 persons 5 DAI each. TL;DR — Your contribution is your vote, and it's way more valuable than you think.",
  },
  {
    q: "What is Quadratic Funding?",
    a: (
      <>
        In a QF round, the community contributes to the projects they feel
        should be funded and supported. A matching partner offers funds to match
        the community&apos;s contributions. Rather than a 1:1 match, the fund
        matching aligns with the sentiment of the community as opposed to the
        sheer monetary value amount raised by any grantee.
        <br />
        <br />
        <strong>The number of contributions matters more than the amount funded.</strong>
        <br />
        <br />
        This system encourages donors to donate even small amounts because their
        money could be matched tenfold, meaning many small donations from
        community members can be amplified into meaningful resources.{" "}
        <a
          href="https://wtfisqf.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline hover:text-teal-400"
        >
          Learn more
        </a>
      </>
    ),
  },
  {
    q: "What are public goods?",
    a: (
      <>
        In economics, a &ldquo;public good&rdquo; refers to anything that is
        both <em>non-excludable</em> and <em>non-rivalrous</em> — that is,
        people can&apos;t be barred access, and one person&apos;s use
        doesn&apos;t degrade another&apos;s. Clean air is an example of a
        naturally occurring public good, while the electric grid is a public
        good created by people. Open source code, which supports millions of
        companies and independent developers, is often thought of this way.
        Gitcoin&apos;s journey began with a focus on Digital Public Goods but
        has since expanded into real-life Public Goods.
        <br />
        <br />
        A <strong>great public good</strong> should: be values-based (in service
        of a set of values your community cares about), have longevity (be
        achievable and maintainable), and create positive externalities
        (benefits a public beyond an immediate set of users).
      </>
    ),
  },
];

export default function ProgramPage() {
  return (
    <div className="bg-gray-900 text-gray-25">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-fwd { animation: marquee 55s linear infinite; display: flex; width: max-content; }
        .marquee-rev { animation: marquee 55s linear infinite reverse; display: flex; width: max-content; }
      `}</style>
      {/* Hero */}
      <section className="mx-auto w-full max-w-[1166px] px-4 pt-10 pb-16 sm:px-6 lg:px-0">
        <div className="rounded-2xl border border-gray-300/40 px-8 py-14 sm:px-14 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-teal-500 mb-4">
              Gitcoin Grants Program
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal leading-[1.12] text-gray-25 mb-4">
              <span className="text-teal-500 font-extrabold">
                Get funding &amp; grow
              </span>{" "}
              your ecosystem
            </h1>
            <p className="text-base sm:text-lg text-gray-400 font-serif leading-relaxed mb-8 max-w-xl">
              Gitcoin Grants is a seasonal initiative empowering early-stage
              builders through a combination of crowdfunding and grants.
            </p>
            <Button
              href="https://grants.gitcoin.co/?utm_source=gitcoinco&utm_medium=page&utm_campaign=program"
              external
              variant="primary"
            >
              Explore
            </Button>
          </div>
        </div>
      </section>

      {/* For Builders / For Communities */}
      <section className="mx-auto w-full max-w-[1166px] px-4 pb-16 sm:px-6 lg:px-0">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-2xl border border-gray-300/40 px-8 py-10">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Get Funding</p>
            <h2 className="text-2xl font-heading font-semibold text-gray-25 mb-6">
              For early and established builders
            </h2>
            <ul className="space-y-3 mb-6">
              {[
                "An early stage startup looking to kickstart your operation?",
                "A solopreneur with an idea?",
                "A rapidly expanding web3 community?",
              ].map((item, i) => {
                const Icon = listIcons[i];
                return (
                  <li key={i} className="flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3">
                    <Icon className="flex-shrink-0 text-teal-500" />
                    <span className="text-sm text-gray-300 font-serif">{item}</span>
                  </li>
                );
              })}
            </ul>
            <p className="text-gray-400 font-serif mb-6">
              Get the funding you need to take your project to the next level.
            </p>
            <Button
              href="https://grants.gitcoin.co/?utm_source=gitcoinco&utm_medium=page&utm_campaign=program"
              external
              variant="secondary"
              size="sm"
            >
              Explore
            </Button>
          </div>
          <div className="rounded-2xl border border-teal-800/40 bg-teal-950/30 px-8 py-10">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Allocate Funding</p>
            <h2 className="text-2xl font-heading font-semibold text-gray-25 mb-6">
              For growing communities
            </h2>
            <ul className="space-y-3 mb-6">
              {[
                "Responsible for ecosystem growth?",
                "Wanting to attract builders to your project or network?",
                "Looking to establish credibility and amass good will?",
              ].map((item, i) => {
                const Icon = listIcons[i];
                return (
                  <li key={i} className="flex items-center gap-3 bg-teal-900/40 border border-teal-700/40 rounded-xl px-4 py-3">
                    <Icon className="flex-shrink-0 text-teal-400" />
                    <span className="text-sm text-gray-200 font-serif">{item}</span>
                  </li>
                );
              })}
            </ul>
            <p className="text-gray-400 font-serif mb-6">
              Run a Community Round to support innovative projects in the
              ecosystem.
            </p>
            <Button
              href="https://grants.gitcoin.co/?utm_source=gitcoinco&utm_medium=page&utm_campaign=program"
              external
              variant="secondary"
              size="sm"
            >
              Explore
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto w-full max-w-[1166px] px-4 pb-16 sm:px-6 lg:px-0">
        <div className="rounded-2xl border border-gray-300/40 px-6 py-4 mb-4">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 text-center">
            The largest and longest running web3 grants program
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-gray-300/40 px-4 py-6 text-center"
            >
              <p className="text-xl sm:text-3xl xl:text-4xl font-mono font-normal text-gray-200">
                {s.value}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm font-mono uppercase tracking-widest text-gray-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="mx-auto w-full max-w-[1166px] px-4 pb-16 sm:px-6 lg:px-0">
        <h2 className="text-2xl font-heading font-semibold text-gray-25 mb-6">
          What Makes Us Different?
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-2xl border border-teal-500/30 bg-teal-500/5 px-8 py-10">
            <h3 className="text-lg font-heading font-semibold text-gray-25 mb-1">
              Crowdfunding Meets Grants
            </h3>
            <p className="text-xs font-mono uppercase tracking-widest text-teal-500 mb-6">
              Harness the power of community with Quadratic Funding
            </p>
            <blockquote className="text-gray-400 font-serif leading-relaxed italic border-l-2 border-teal-500 pl-4">
              &ldquo;Gitcoin grants quadratic funding is not just for funds
              allocation, it&apos;s also a great signaling tool! For the last
              few rounds, going to Gitcoin has led me to discover a lot of
              really cool Ethereum projects I previously did not know
              about.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-mono text-gray-300">
              Vitalik Buterin — Ethereum Founder
            </p>
          </div>
          <div className="rounded-2xl border border-gray-300/40 px-8 py-10">
            <h3 className="text-lg font-heading font-semibold text-gray-25 mb-1">
              Activate Your Supporters
            </h3>
            <p className="text-xs font-mono uppercase tracking-widest text-teal-500 mb-6">
              Foster connections and grow your project&apos;s reputation
            </p>
            <blockquote className="text-gray-400 font-serif leading-relaxed italic border-l-2 border-gray-600 pl-4">
              &ldquo;The biggest thing Gitcoin did for me was give me
              validation.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-mono text-gray-300">
              David Hoffman — Bankless
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto w-full max-w-[1166px] px-4 pb-16 sm:px-6 lg:px-0">
        <h2 className="text-2xl font-heading font-semibold text-gray-25 mb-8">
          How It Works
        </h2>
        <div className="flex flex-col gap-3">
          {steps.map((step) => (
            <div
              key={step.n}
              className="rounded-2xl border border-gray-300/40 px-8 py-6 flex items-start gap-6"
            >
              <span className="text-3xl font-mono font-bold text-gray-700 flex-shrink-0 leading-none mt-0.5">
                {step.n}
              </span>
              <div>
                <h3 className="font-heading font-semibold text-gray-25">
                  {step.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-teal-500 mt-0.5 mb-2">
                  {step.subtitle}
                </p>
                <p className="text-gray-400 font-serif text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Grantees */}
      <section className="mx-auto w-full max-w-[1166px] px-4 pb-16 sm:px-6 lg:px-0">
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-semibold text-gray-25 mb-2">
            Past Grantees
          </h2>
          <p className="text-gray-400 font-serif max-w-2xl">
            Whether it&apos;s improving Ethereum, educating developers,
            guaranteeing onchain privacy or fighting for crypto in DC, builders
            use Gitcoin to connect with their community and make a lasting
            impact.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {grantees.map((g) => (
            <Link
              key={g.name}
              href={g.href}
              className="rounded-2xl border border-gray-300/40 overflow-hidden hover:border-teal-500/50 transition-colors group flex flex-col"
              style={{ transition: "all 400ms ease" }}
            >
              <div className="relative w-full aspect-[2/1] overflow-hidden">
                <Image
                  src={g.banner}
                  alt={g.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-6 py-5">
                <h3 className="font-heading font-semibold text-gray-25 group-hover:text-teal-400 mb-1" style={{ transition: "color 400ms ease" }}>
                  {g.name}
                </h3>
                <p className="text-sm text-gray-400 font-serif leading-relaxed">
                  {g.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <a
          href="https://archive.grants.gitcoin.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-teal-500 hover:text-teal-400 underline"
        >
          View the history of Gitcoin Grants →
        </a>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-full max-w-[1166px] px-4 pb-16 sm:px-6 lg:px-0">
        <h2 className="text-2xl font-heading font-semibold text-gray-25 mb-8">
          Testimonials
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-gray-300/40 px-6 py-7 flex flex-col"
            >
              <blockquote className="text-gray-400 font-serif text-sm leading-snug flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-5 pt-4 border-t border-gray-800 flex items-center gap-3">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-mono font-semibold text-gray-25">
                    {t.name}
                  </p>
                  <p className="text-xs font-mono text-teal-500">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Matching Partners */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-[908px] px-4 sm:px-6 lg:px-0 mb-14">
          <div className="rounded-2xl border border-gray-300 bg-gray-800/40 px-8 py-6 flex flex-col md:flex-row md:items-start gap-3 md:gap-14">
            <h2 className="text-base sm:text-2xl font-heading font-bold text-gray-25 whitespace-nowrap">
              Our Matching Partners
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Supporters of innovation and champions of public goods. We are
              incredibly grateful to the funders that have collectively supported
              thousands of grantees from all over the world.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 overflow-hidden">
          <div className="overflow-hidden">
            <div className="marquee-fwd">
              {[...partnerRow1, ...partnerRow1, ...partnerRow1, ...partnerRow1].map((name, i) => (
                <span key={i} className="text-[64px] md:text-[80px] lg:text-[88px] font-heading font-bold text-gray-25 whitespace-nowrap pr-20">
                  {name}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="marquee-rev">
              {[...partnerRow2, ...partnerRow2, ...partnerRow2, ...partnerRow2].map((name, i) => (
                <span key={i} className="text-[52px] md:text-[64px] lg:text-[72px] font-heading font-bold text-gray-25 whitespace-nowrap pr-16">
                  {name}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="marquee-fwd">
              {[...partnerRow3, ...partnerRow3, ...partnerRow3, ...partnerRow3].map((name, i) => (
                <span key={i} className="text-2xl md:text-3xl font-mono font-semibold text-gray-25 whitespace-nowrap pr-12 tracking-wider">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[1166px] px-4 pb-20 sm:px-6 lg:px-0">
        <h2 className="text-2xl font-heading font-semibold text-gray-25 mb-8">
          FAQs
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-gray-300/40 px-8 py-7"
            >
              <h3 className="font-heading font-semibold text-gray-25 mb-2">
                {faq.q}
              </h3>
              <p className="text-gray-400 font-serif text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
