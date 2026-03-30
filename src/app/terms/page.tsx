import type { Metadata } from "next";
import { pageSeo } from "@/lib/page-seo";

export const metadata: Metadata = pageSeo.terms;

export default function TermsPage() {
  return (
    <div className="bg-gray-900 text-gray-25">
      <section className="mx-auto w-full max-w-[860px] px-4 pt-12 pb-24 sm:px-6 lg:px-0">
        <div className="mb-10 pb-8 border-b border-gray-800">
          <p className="text-xs font-mono uppercase tracking-widest text-teal-500 mb-3">
            Legal
          </p>
          <h1 className="text-3xl sm:text-4xl font-heading font-normal text-gray-25 mb-3">
            Terms of Use
          </h1>
          <p className="text-sm font-mono text-gray-500">July 2023</p>
        </div>

        <div className="prose-legal">
          <h2>Acceptance of Terms</h2>
          <p>
            Gitcoin Limited, a British Virgin Islands Company
            (&ldquo;Gitcoin&rdquo;) provides a blockchain-based coordination
            toolkit enabling individuals and communities to build, fund and
            protect their shared needs. This is done through the development and
            exposure of Open Source Software that allows Users to interact with
            Gitcoin and its technology components, community and resources.
          </p>
          <p>
            These Terms of Service (the &ldquo;Agreement&rdquo;) explain the
            terms and conditions by which you may access and use the Products
            provided by Gitcoin (referred to herein as &ldquo;Gitcoin&rdquo;,
            &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). The
            Products and Protocols shall include, but shall not necessarily be
            limited to &mdash; Gitcoin Allo, Gitcoin.co, Gitcoin Grants Stack,
            Gitcoin Passport, the Public Goods Network (PGN), GTC
            (Gitcoin&apos;s governance token), and other partnered products
            denoted with Gitcoin&apos;s brandmark. By using or otherwise
            accessing the Services, or clicking to accept or agree to these
            Terms where that option is made available, you accept and agree to
            these Terms, consent to the collection, use, disclosure and other
            handling of information as described in our Privacy Policy and any
            additional terms, rules and conditions of participation issued by
            Gitcoin from time to time.
          </p>

          <h2>Modifications of Terms of Use</h2>
          <p>
            Gitcoin reserves the right, at its sole discretion, to modify or
            replace the Terms of Use at any time. The most current version of
            these Terms will be posted on our Site. You shall be responsible for
            reviewing and becoming familiar with any such modifications. Use of
            the Services by you after any modification to the Terms constitutes
            your acceptance of the Terms of Use as modified.
          </p>

          <h2>Eligibility</h2>
          <p>
            You represent and warrant that you: (a) are of legal age to form a
            binding contract; (e.g., 18 years old in the United States) (b)
            have not previously been suspended or removed from using our
            Services; and (c) have full power and authority to enter into this
            agreement and in doing so will not violate any other agreement to
            which you are a party. If you are registering to use the Services on
            behalf of a legal entity, you further represent and warrant that
            such legal entity is duly organized and validly existing under the
            applicable laws of the jurisdiction of its organization, and you are
            duly authorized by such legal entity to act on its behalf.
          </p>
          <p>
            You further represent that you are not (a) the subject of economic
            or trade sanctions administered or enforced by any governmental
            authority or otherwise designated on any list of prohibited or
            restricted parties (including but not limited to the list maintained
            by the Office of Foreign Assets Control of the U.S. Department of
            the Treasury) or (b) a citizen, resident, or organized in a
            jurisdiction or territory that is the subject of comprehensive
            country-wide, territory-wide, or regional economic sanctions by the
            United States. Finally, you represent that your access and use of
            any of our Products will fully comply with all applicable laws and
            regulations, and that you will not access or use any of our Products
            to conduct, promote, or otherwise facilitate any illegal activity.
          </p>
          <p>
            NOTICE: This Agreement contains important information, including a
            binding arbitration provision and a class action waiver, both of
            which impact your rights as to how disputes are resolved. Our
            Products are only available to you &mdash; and you should only
            access any of our Products &mdash; if you agree completely with
            these terms.
          </p>

          <h2>Your Responsibilities</h2>

          <h3>Prohibited Activity</h3>
          <p>
            You agree not to engage in, or attempt to engage in, any of the
            following categories of prohibited activity in relation to your
            access and use of the Interface:
          </p>

          <h3>Intellectual Property Infringement</h3>
          <p>
            Activity that infringes on or violates any copyright, trademark,
            service mark, patent, right of publicity, right of privacy, or other
            proprietary or intellectual property rights under the law.
          </p>

          <h3>Cyberattack</h3>
          <p>
            Activity that seeks to interfere with or compromise the integrity,
            security, or proper functioning of any computer, server, network,
            personal device, or other information technology system, including,
            but not limited to, the deployment of viruses and denial of service
            attacks.
          </p>

          <h3>Fraud and Misrepresentation</h3>
          <p>
            Activity that seeks to defraud us or any other person or entity,
            including, but not limited to, providing any false, inaccurate, or
            misleading information in order to unlawfully obtain the property of
            another.
          </p>

          <h3>Market Manipulation</h3>
          <p>
            Activity that violates any applicable law, rule, or regulation
            concerning the integrity of trading markets, including, but not
            limited to, the manipulative tactics commonly known as &ldquo;rug
            pulls&rdquo;, pumping and dumping, and wash trading.
          </p>

          <h3>Securities and Derivatives Violations</h3>
          <p>
            Activity that violates any applicable law, rule, or regulation
            concerning the trading of securities or derivatives, including, but
            not limited to, the unregistered offering of securities and the
            offering of leveraged and margined commodity products to retail
            customers in the United States.
          </p>

          <h3>Sale of Stolen Property</h3>
          <p>
            Buying, selling, or transferring of stolen items, fraudulently
            obtained items, items taken without authorization, and/or any other
            illegally obtained items.
          </p>

          <h3>Data Mining or Scraping</h3>
          <p>
            Activity that involves data mining, robots, scraping, or similar
            data gathering or extraction methods of content or information from
            any of our Products.
          </p>

          <h3>Objectionable Content</h3>
          <p>
            Activity that involves soliciting information from anyone under the
            age of 18 or that is otherwise harmful, threatening, abusive,
            harassing, tortious, excessively violent, defamatory, vulgar,
            obscene, pornographic, libelous, invasive of another&apos;s privacy,
            hateful, discriminatory, or otherwise objectionable.
          </p>

          <h3>Any Other Unlawful Conduct</h3>
          <p>
            Activity that violates any applicable law, rule, or regulation of
            the United States or another relevant jurisdiction, including, but
            not limited to, the restrictions and regulatory requirements imposed
            by U.S. law.
          </p>

          <h2>Transactions</h2>
          <p>
            You agree and understand that: (a) all transactions you submit
            through any of our Products are considered unsolicited, which means
            that they are solely initiated by you; (b) you have not received any
            investment advice from us in connection with any transactions; and
            (c) we do not conduct a suitability review of any trades you submit.
          </p>

          <h2>Non-Custodial and No Fiduciary Duties</h2>
          <p>
            Each of the Products is a purely non-custodial application, meaning
            we do not ever have custody, possession, or control of your digital
            assets at any time. It further means you are solely responsible for
            the custody of the cryptographic private keys to the digital asset
            wallets you hold and you should never share your wallet credentials
            or seed phrase with anyone. We accept no responsibility for, or
            liability to you, in connection with your use of a wallet and make
            no representations or warranties regarding how any of our Products
            will operate with any specific wallet. Likewise, you are solely
            responsible for any associated wallet and we are not liable for any
            acts or omissions by you in connection with or as a result of your
            wallet being compromised.
          </p>
          <p>
            This Agreement is not intended to, and does not, create or impose
            any fiduciary duties on us. To the fullest extent permitted by law,
            you acknowledge and agree that we owe no fiduciary duties or
            liabilities to you or any other party, and that to the extent any
            such duties or liabilities may exist at law or in equity, those
            duties and liabilities are hereby irrevocably disclaimed, waived,
            and eliminated. You further agree that the only duties and
            obligations that we owe you are those set out expressly in this
            Agreement.
          </p>

          <h2>Compliance and Tax Obligations</h2>
          <p>
            One or more of our Products may not be available or appropriate for
            use in your jurisdiction. By accessing or using any of our Products,
            you agree that you are solely and entirely responsible for
            compliance with all laws and regulations that may apply to you.
          </p>
          <p>
            Specifically, your use of our Products or the Protocol may result in
            various tax consequences, such as income or capital gains tax,
            value-added tax, goods and services tax, or sales tax in certain
            jurisdictions.
          </p>
          <p>
            It is your responsibility to determine whether taxes apply to any
            transactions you initiate or receive and, if so, to report and/or
            remit the correct tax to the appropriate tax authority.
          </p>

          <h2>Role of Gitcoin</h2>
          <p>
            Gitcoin is not involved in the transactions between users, and has
            no control over the quality, safety, or legality of tasks or
            consideration for tasks, the ability of users to perform tasks to
            others&apos; satisfaction, or the ability of users to pay for tasks.
            Gitcoin will not have any liability or obligations under or related
            to Service Contracts for any acts or omissions by you or other
            Users. Gitcoin has no control over users or the services offered or
            rendered by users and Gitcoin makes no representations as to the
            reliability, capability, or qualifications of any user or the
            quality, security, or legality of any services, and Gitcoin
            disclaims any and all liability relating thereto.
          </p>

          <h2>Gitcoin Recurring Grants</h2>
          <p>
            In addition to the above, but notwithstanding anything to the
            contrary therein, if you use the Site to make a grant (a
            &ldquo;Grant&rdquo;) to a User, you agree that: (a) the User has
            broad discretion in performing the Task described on its project
            page on the Site (the &ldquo;Grant Project Page&rdquo;), including
            what, how and when they perform such Task, and how they use the
            Grant; (b) the Grant will be made to the User on a recurring basis,
            commencing with the first contribution at the time that you agree to
            make the Grant and recurring based on the frequency specified by the
            User on the Grant Project Page; (c) the User may change the Task,
            including without limitation the scope and timeline and the
            frequency of contributions; (d) Grant contributions will be issued
            and remitted to the User prior to the User completing a Task; (e)
            the Grant is not refundable; (f) you will not have the ability on
            the Site to dispute or reject Tasks performed by Users, but you may
            terminate future Grant contributions to the extent they have not
            been made; and (g) you and User are responsible for any tax
            liabilities in connection with your transaction.
          </p>

          <h2>Restrictions on Use</h2>
          <p>
            Unless otherwise expressly authorized in these Terms of Use or on
            the Site, you may not take any action to interfere with the Site or
            any other user&apos;s use of the Site or decompile, reverse engineer
            or disassemble any content or other products or processes accessible
            through the Site, nor insert any code or product or manipulate the
            content in any way that affects any User&apos;s experience. While
            using the Site you are required to comply with all applicable
            statutes, orders, regulations, rules, and other laws. In addition,
            we expect users of the Website to respect the rights and dignity of
            others. Your use of the Site is conditioned on your compliance with
            the rules of conduct set forth in this Section.
          </p>

          <h2>Warranty Disclaimer</h2>
          <p>
            You expressly understand and agree that your use of the Service is
            at your sole risk. The Service is provided on an &ldquo;AS IS&rdquo;
            and &ldquo;as available&rdquo; basis, without warranties of any
            kind, either express or implied, including, without limitation,
            implied warranties of merchantability, fitness for a particular
            purpose or non-infringement. You release Gitcoin from all liability
            for content you acquired or failed to acquire through the Service.
          </p>

          <h2>Indemnity</h2>
          <p>
            You agree, to the fullest extent permitted by applicable law, to
            release and to indemnify, defend and hold harmless Gitcoin and its
            parents, subsidiaries, affiliates and agencies, as well as the
            officers, directors, employees, shareholders and representatives of
            any of the foregoing entities, from and against any and all losses,
            liabilities, expenses, damages, costs (including attorneys&apos;
            fees and court costs) claims or actions of any kind whatsoever
            arising or resulting from: (a) your use of the Service, (b) your
            violation of these Terms of Use, (c) any of your acts or omissions
            that implicate publicity rights, defamation, invasion of privacy,
            confidentiality, intellectual property rights or other property
            rights, (d) your User Generated Content, (e) any misrepresentation
            by you and (f) any disputes or issues between you and any third
            party. Gitcoin reserves the right, at its own expense, to assume
            exclusive defense and control of any matter otherwise subject to
            indemnification by you and, in such case, you agree to cooperate
            with Gitcoin in the defense of such matter.
          </p>

          <h2>Limitation on Liability</h2>
          <p>
            You acknowledge and agree that you assume full responsibility for
            your use of the Site and Service. You acknowledge and agree that any
            information you send or receive during your use of the Site and
            Service may not be secure and may be intercepted or later acquired
            by unauthorized parties. You acknowledge and agree that your use of
            the Site and Service is at your own risk. Recognizing such, you
            understand and agree that, to the fullest extent permitted by
            applicable law, neither Gitcoin nor its parents, subsidiaries,
            affiliates and agencies, as well as the officers, directors,
            employees, shareholders or representatives of any of the foregoing
            entities, or its suppliers or licensors will be liable to you for
            any direct, indirect, incidental, special, consequential, punitive,
            exemplary or other damages of any kind, including without limitation
            damages for loss of profits, goodwill, use, data or other tangible
            or intangible losses or any other damages based on contract, tort
            (including, in jurisdictions where permitted, negligence and gross
            negligence), strict liability or any other theory (even if Gitcoin
            had been advised of the possibility of such damages), resulting from
            the Site or Service; the use or the inability to use the Site or
            Service; unauthorized access to or alteration of your transmissions
            or data; statements or conduct of any third party on the Site or
            Service; any actions we take or fail to take as a result of
            communications you send to us; human errors; technical malfunctions;
            failures, including public utility or telephone outages; omissions,
            interruptions, latency, deletions or defects of any device or
            network, providers, or software (including, but not limited to,
            those that do not permit participation in the Service); any injury
            or damage to computer equipment; inability to fully access the Site
            or Service or any other website; theft, tampering, destruction, or
            unauthorized access to, images or other content of any kind; data
            that is processed late or incorrectly or is incomplete or lost;
            typographical, printing or other errors, or any combination thereof;
            or any other matter relating to the Site or Service. Some
            jurisdictions do not allow the exclusion of certain warranties or
            the limitation or exclusion of liability for incidental or
            consequential damages. Accordingly, some of the above limitations
            may not apply to you.
          </p>

          <h2>Intellectual Property Rights</h2>

          <h3>IP Rights Generally</h3>
          <p>
            We own all intellectual property and other rights in each of our
            Products and its respective contents, including, but not limited to,
            software, text, images, trademarks, service marks, copyrights,
            patents, designs, and its &ldquo;look and feel.&rdquo; This
            intellectual property is available under the terms of our copyright
            licenses and our Trademark Guidelines. Subject to the terms of this
            Agreement, we grant you a limited, revocable, non-exclusive,
            non-sublicensable, non-transferable license to access and use our
            Products solely in accordance with this Agreement. You agree that
            you will not use, modify, distribute, tamper with, reverse engineer,
            disassemble or decompile any of our Products for any purpose other
            than as expressly permitted pursuant to this Agreement. Except as
            set forth in this Agreement, we grant you no rights to any of our
            Products, including any intellectual property rights.
          </p>
          <p>
            By using any of our Products, you grant us a worldwide,
            non-exclusive, sublicensable, royalty-free license to use, copy,
            modify, and display any content, including but not limited to text,
            materials, images, files, communications, comments, feedback,
            suggestions, ideas, concepts, questions, data, or otherwise, that
            you post on or through any of our Products for our current and
            future business purposes, including to provide, promote, and improve
            the services. This includes any digital file, art, or other material
            linked to or associated with any content displayed. You grant to us
            a non-exclusive, transferable, worldwide, perpetual, irrevocable,
            fully-paid, royalty-free license, with the right to sublicense,
            under any and all intellectual property rights that you own or
            control to use, copy, modify, create derivative works based upon any
            suggestions or feedback for any purpose.
          </p>
          <p>
            You represent and warrant that you have, or have obtained, all
            rights, licenses, consents, permissions, power and/or authority
            necessary to grant the rights granted herein for any material that
            you list, post, promote, or display on or through any of our
            Products (including, but not limited to, NFTs). You represent and
            warrant that such content does not contain material subject to
            copyright, trademark, publicity rights, or other intellectual
            property rights, unless you have necessary permission or are
            otherwise legally entitled to post the material and to grant us the
            license described above, and that the content does not violate any
            laws.
          </p>

          <h3>Third-Party Resources and Promotions</h3>
          <p>
            Our Products may contain references or links to third-party
            resources, including, but not limited to, information, materials,
            products, or services, that we do not own or control. In addition,
            third parties may offer promotions related to your access and use of
            our Products. We do not approve, monitor, endorse, warrant or assume
            any responsibility for any such resources or promotions. If you
            access any such resources or participate in any such promotions, you
            do so at your own risk, and you understand that this Agreement does
            not apply to your dealings or relationships with any third parties.
            You expressly relieve us of any and all liability arising from your
            use of any such resources or participation in any such promotions.
          </p>

          <h3>Additional Rights</h3>
          <p>
            We reserve the right to cooperate with any law enforcement, court or
            government investigation or order or third party requesting or
            directing that we disclose information or content or information that
            you provide.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance
            with the laws of the British Virgin Islands, without giving effect
            to any principles of conflicts of law.
          </p>
        </div>
      </section>

      <style>{`
        .prose-legal {
          color: rgb(156 163 175);
          font-family: var(--font-serif, Georgia, serif);
          font-size: 1rem;
          line-height: 1.8;
        }
        .prose-legal h2 {
          font-family: var(--font-heading, sans-serif);
          font-size: 1.25rem;
          font-weight: 600;
          color: rgb(250 250 250);
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
        }
        .prose-legal h3 {
          font-family: var(--font-heading, sans-serif);
          font-size: 1rem;
          font-weight: 600;
          color: rgb(229 231 235);
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .prose-legal p {
          margin-bottom: 1rem;
        }
        .prose-legal ul {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        .prose-legal li {
          margin-bottom: 0.5rem;
        }
        .prose-legal a {
          color: rgb(20 184 166);
          text-decoration: underline;
        }
        .prose-legal a:hover {
          color: rgb(45 212 191);
        }
        .prose-legal strong {
          color: rgb(229 231 235);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
