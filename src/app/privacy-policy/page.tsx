import type { Metadata } from "next";
import { pageSeo } from "@/lib/page-seo";
import Link from "next/link";

export const metadata: Metadata = pageSeo.privacyPolicy;

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-900 text-gray-25">
      <section className="mx-auto w-full max-w-[860px] px-4 pt-12 pb-24 sm:px-6 lg:px-0">
        <div className="mb-10 pb-8 border-b border-gray-800">
          <p className="text-xs font-mono uppercase tracking-widest text-teal-500 mb-3">
            Legal
          </p>
          <h1 className="text-3xl sm:text-4xl font-heading font-normal text-gray-25 mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-gray-500">July 2023</p>
        </div>

        <div className="prose-legal">
          <p>
            This privacy policy (&ldquo;Policy&rdquo;) describes how Gitcoin
            Limited, a British Virgin Islands Company (&ldquo;Gitcoin&rdquo;
            &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
            &ldquo;us&rdquo;) collects, uses, shares, and stores personal
            information of users of this website,{" "}
            <a href="https://gitcoin.co/">https://gitcoin.co/</a> (the
            &ldquo;Site&rdquo;). This Policy applies to the Site, subsite,
            applications, products and services (collectively,
            &ldquo;Services&rdquo;) on or in which it is posted, linked, or
            referenced.
          </p>

          <h2>High Level Summary</h2>
          <p>
            By using the Services, you accept the terms of this Policy and our
            {" "}<Link href="/terms">Terms of Use</Link>, and consent to our
            collection, use, disclosure, and retention of your information as
            described in this Policy. If you have not done so already, please
            also review our terms of use. The terms of use contain provisions
            that limit our liability to you and require you to resolve any
            dispute with us on an individual basis and not as part of any class
            or representative action. IF YOU DO NOT AGREE WITH ANY PART OF THIS
            PRIVACY POLICY OR OUR TERMS OF USE, THEN PLEASE DO NOT USE ANY OF
            THE SERVICES.
          </p>
          <p>
            Gitcoin does not collect and/or store personal data, such as first
            name, last name, street address, date of birth, email address, or IP
            address, in connection with your use of the Services.
          </p>
          <p>
            Gitcoin collects non-identifiable data, such as public on-chain
            data, and limited off-chain data like device type, browser version,
            etc. This is to help drive production vision, optimize user
            experiences but not to track users.
          </p>
          <p>
            If you specifically sign up to receive emails from us, we will store
            your email address to allow us to send you those emails. You can
            unsubscribe at any time. We will not attempt to link your email
            address to your wallet address, IP address, or other personal data.
          </p>
          <p>
            Gitcoin continues to explore methods to further protect
            consumers&apos; privacy, such as opt-out prompts, migrating to
            privacy-centric tooling and deploying proxies to anonymize network
            traffic.
          </p>
          <p>
            Users are empowered to explore client-side privacy techniques and
            tools.
          </p>
          <p>
            Any material changes to privacy will be reflected in an updated
            privacy policy.
          </p>

          <h2>Data We Collect</h2>
          <p>
            Privacy is central to everything we do at Gitcoin. And we&apos;ve
            enshrined transparency as one of our Company values. Accordingly, we
            aspire to be transparent about what little data we do collect. We do
            not maintain user accounts and do not collect and store personal
            data, such as your name or internet protocol (&ldquo;IP&rdquo;)
            address. When you interact with the Services, we collect only:
          </p>

          <h3>Publicly-available blockchain data.</h3>
          <p>
            When you connect your non-custodial blockchain wallet to the
            Services, we collect and log your publicly-available blockchain
            address to learn more about your use of the Services and to screen
            your wallet for any prior illicit activity. We may screen your
            wallet using intelligence provided by leading blockchain analytics
            providers. Note that blockchain addresses are publicly-available
            data that are not created or assigned by us or any central party,
            and by themselves are not personally identifying.
          </p>

          <h3>
            Information from localStorage and other tracking technologies.
          </h3>
          <p>
            We and our third-party services providers may access and collect
            information from localStorage, mobile deviceID, cookies, web
            beacons, and other similar technologies to provide and personalize
            the Services and features of the Services for you across sessions.
            For example, we may use this information to remember tokens you
            import, star, or add to your shopping bag. We may also use this
            information to learn about your preferences, your use of the
            Services, and our interactions with you. Information we collect from
            these technologies may include things such as browser type,
            referring/exit pages, operating system, device or browser language,
            and other device information. We group and analyze these user
            journeys collectively, in the aggregate, to improve our product user
            experience.
          </p>

          <h3>Information from other sources.</h3>
          <p>
            We may receive information about your wallet address or transactions
            made through the Services from our service providers in order to
            comply with our legal obligations and prevent the use of our
            Services in connection with fraudulent or other illicit activities.
          </p>

          <h3>Survey or usability information.</h3>
          <p>
            If you participate in a survey or usability study with us, we will
            record any biographical information you directly provide to us (for
            example, your name, email, and job title), the responses you provide
            to us, and your interactions with the Services.
          </p>

          <h3>Correspondence.</h3>
          <p>
            We will receive any communications and information you provide
            directly to us via email, customer support, social media, or another
            support channel (such as Twitter or Discord), or when you
            participate in any surveys or questionnaires.
          </p>

          <h3>Biographical information.</h3>
          <p>
            If you apply for a job with us, we collect all information provided
            through our Jobs form, including name, email phone, work and
            immigration status, and any other resume, cover letter, or free form
            text you include.
          </p>

          <h3>Information you specifically provide us.</h3>
          <p>
            If you specifically provide us with information (such as your email
            address), we may use that information for the purposes described
            when you provide it to us. We will not attempt to link any
            information you provide to your wallet address, IP address, or other
            personal data. You do not need to provide us with any personal data
            to use the Services.
          </p>

          <h2>How We Use Data</h2>
          <p>
            We use the data we collect in accordance with your instructions,
            including any applicable terms in our Terms of Service, and as
            required by law. We may also use data for the following purposes:
          </p>

          <h3>Providing the Services.</h3>
          <p>
            We use the data we collect to provide, maintain, customize and
            improve our Services and features of our Services.
          </p>

          <h3>Customer support.</h3>
          <p>
            We may use information to provide customer support for and answer
            inquiries about the Services.
          </p>

          <h3>Safety and security.</h3>
          <p>
            We may use data to protect against, investigate, and stop
            fraudulent, unauthorized, or illegal activity. We may also use it to
            address security risks, solve potential security issues such as
            bugs, enforce our agreements, and protect our users and Company.
          </p>

          <h3>Legal compliance.</h3>
          <p>
            We may use the information we collect as needed or requested by
            regulators, government entities, and law enforcement to comply with
            applicable laws and regulations.
          </p>

          <h3>Aggregated data.</h3>
          <p>
            We may use some of the information we collect or access to compile
            aggregated data that helps us learn more about how users use the
            Services and where we can improve your experience.
          </p>

          <h2>How We Share Data</h2>
          <p>We may share or disclose the data we collect:</p>

          <h3>With service providers.</h3>
          <p>
            We may share your information with our service providers and vendors
            to assist us in providing, delivering, and improving the Services.
            For example, we may share your wallet address with service providers
            like Infura and Cloudflare to provide technical infrastructure
            services, your wallet address with blockchain analytics providers to
            detect, prevent, and mitigate financial crime and other illicit or
            harmful activities, and your activity on our social media pages with
            our analytics provider to learn more about you interact with us and
            the Services.
          </p>

          <h3>To comply with our legal obligations.</h3>
          <p>
            We may share your data in the course of litigation, regulatory
            proceedings, compliance measures, and when compelled by subpoena,
            court order, or other legal procedure. We may also share data when
            we believe it is necessary to prevent harm to our users, our
            Company, or others, and to enforce our agreements and policies,
            including our Terms of Service.
          </p>

          <h3>Safety and Security.</h3>
          <p>
            We may share data to protect against, investigate, and stop
            fraudulent, unauthorized, or illegal activity. We may also use it to
            address security risks, solve potential security issues such as
            bugs, enforce our agreements, and protect our users, Company, and
            ecosystem.
          </p>

          <h3>Business changes.</h3>
          <p>
            We may transfer or share data to another entity in the event of a
            merger, acquisition, bankruptcy, dissolution, reorganization, asset
            or stock sale, or other business transaction.
          </p>

          <h3>With your consent.</h3>
          <p>
            We may share your information any other time you provide us with
            your consent to do so.
          </p>

          <p>
            We do not share or sell your information with any third parties for
            any marketing purposes whatsoever.
          </p>

          <h3>Third Party Cookies.</h3>
          <p>
            We use services provided by Google and other third parties that use
            tracking technology such as cookies, deviceID, and localStorage, to
            collect information about your use of the Services and our
            interactions with you. You can opt out of having your online
            activity and device data collected through these third-party
            services, including by:
          </p>
          <ul>
            <li>
              Blocking cookies in your browser by following the instructions in
              your browser settings. For more information about cookies,
              including how to see the cookies on your device, manage them, and
              delete them, visit{" "}
              <a
                href="http://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.allaboutcookies.org
              </a>
              .
            </li>
            <li>
              Blocking or limiting the use of your advertising ID on your mobile
              device through the device settings.
            </li>
            <li>
              Using privacy plug-ins or browsers. Certain browsers and browser
              extensions can be configured to block third-party cookies and
              trackers.
            </li>
            <li>
              Using the platform opt-out provided by Google at{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://adssettings.google.com
              </a>
              . You can learn more about how Google uses your information by
              reviewing Google&apos;s privacy policy at{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
              .
            </li>
            <li>
              Using advertising industry opt-out tools on each device or browser
              where you use the Services, available at{" "}
              <a
                href="http://optout.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://optout.aboutads.info
              </a>{" "}
              and{" "}
              <a
                href="http://optout.networkadvertising.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://optout.networkadvertising.org
              </a>
              .
            </li>
          </ul>

          <h2>Third-Party Links and Sites</h2>
          <p>
            We may integrate technologies operated or controlled by other
            parties into parts of the Services. For example, the Services may
            include links that hyperlink to websites, platforms, and other
            services not operated or controlled by us. Please note that when you
            interact with these other parties, including when you leave the
            Site, those parties may independently collect information about you
            and solicit information from you. You can learn more about how those
            parties collect and use your data by consulting their privacy
            policies and other terms.
          </p>

          <h2>Security</h2>
          <p>
            We implement and maintain reasonable administrative, physical, and
            technical security safeguards to help protect data from loss, theft,
            misuse, unauthorized access, disclosure, alteration, and
            destruction. Nevertheless, transmission via the internet is not
            completely secure and we cannot guarantee the security of
            information about you. You are responsible for all of your activity
            on the Services, including the security of your blockchain network
            addresses, cryptocurrency wallets, and their cryptographic keys.
          </p>

          <h2>Age Requirements</h2>
          <p>
            The Services are intended for a general audience and are not
            directed at children. We do not knowingly receive personal
            information (as defined by the U.S. Children&apos;s Privacy
            Protection Act, or &ldquo;COPPA&rdquo;) from children. If you
            believe we have received personal information about a child under
            the age of 18, please contact us at{" "}
            <a href="mailto:privacy@gitcoin.co">privacy@gitcoin.co</a>.
          </p>

          <h2>Unique Jurisdictions</h2>

          <h3>
            Additional Notice to California Residents (&ldquo;CCPA
            Notice&rdquo;)
          </h3>
          <p>
            The California Consumer Privacy Act of 2018 (&ldquo;CCPA&rdquo;)
            requires certain businesses to provide a CCPA Notice to California
            residents to explain how we collect, use, and share their personal
            information, and the rights and choices we offer California
            residents regarding our handling of their information.
          </p>

          <h4>Privacy Practices.</h4>
          <p>
            We do not &ldquo;sell&rdquo; personal information as defined under
            the CCPA. Please review the &ldquo;Sharing and Disclosure of
            Information&rdquo; section above for further details about the
            categories of parties with whom we share information.
          </p>

          <h4>Privacy Rights.</h4>
          <p>
            The CCPA gives individuals the right to request information about
            how we have collected, used, and shared your personal information.
            It also gives you the right to request a copy of any information we
            may maintain about you. You may also ask us to delete any personal
            information that we may have received about you. Please note that
            the CCPA limits these rights, for example, by prohibiting us from
            providing certain sensitive information in response to access
            requests and limiting the circumstances under which we must comply
            with a deletion request. We will respond to requests for
            information, access, and deletion only to the extent we are able to
            associate, with a reasonable effort, the information we maintain
            with the identifying details you provide in your request. If we deny
            the request, we will communicate the decision to you. You are
            entitled to exercise the rights described above free from
            discrimination.
          </p>

          <h4>Submitting a Request.</h4>
          <p>
            You can submit a request for information, access, or deletion to{" "}
            <a href="mailto:privacy@gitcoin.co">privacy@gitcoin.co</a>.
          </p>

          <h4>Identity Verification.</h4>
          <p>
            The CCPA requires us to collect and verify the identity of any
            individual submitting a request to access or delete personal
            information before providing a substantive response.
          </p>

          <h4>Authorized Agents.</h4>
          <p>
            California residents can designate an &ldquo;authorized agent&rdquo;
            to submit requests on their behalf. We will require the authorized
            agent to have a written authorization confirming their authority.
          </p>

          <h3>Disclosures for European Union Data Subjects.</h3>
          <p>
            We process personal data for the purposes described in the section
            titled &ldquo;How We Use Data&rdquo; above. Our bases for processing
            your data include: (i) you have given consent to the process to us
            or our service provides for one or more specific purposes; (ii)
            processing is necessary for the performance of a contract with you;
            (iii) processing is necessary for compliance with a legal
            obligation; and/or (iv) processing is necessary for the purposes of
            the legitimate interested pursued by us or a third party, and your
            interests and fundamental rights and freedoms do not override those
            interests.
          </p>
          <p>
            Your rights under the General Data Protection Regulations
            (&ldquo;GDPR&rdquo;) include the right to (i) request access and
            obtain a copy of your personal data, (ii) request rectification or
            erasure of your personal data, (iii) object to or restrict the
            processing of your personal data; and (iv) request portability of
            your personal data. Additionally, you may withdraw your consent to
            our collection at any time. Nevertheless, we cannot edit or delete
            information that is stored on a particular blockchain. Information
            such as your transaction data, blockchain wallet address, and assets
            held by your address that may be related to the data we collect is
            beyond our control.
          </p>
          <p>
            To exercise any of your rights under the GDPR, please contact us at{" "}
            <a href="mailto:privacy@gitcoin.co">privacy@gitcoin.co</a>. We may
            require additional information from you to process your request.
            Please note that we may retain information as necessary to fulfill
            the purpose for which it was collected and may continue to do so
            even after a data subject request in accordance with our legitimate
            interests, including to comply with our legal obligations, resolves
            disputes, prevent fraud, and enforce our agreements.
          </p>

          <h2>Notices Given</h2>

          <h3>Changes to this Policy.</h3>
          <p>
            If we make material changes to this Policy, we will notify you via
            the Services. Nevertheless, your continued use of the Services
            reflects your periodic review of this Policy and other Company
            terms, and indicates your consent to them.
          </p>

          <h3>Contact Us.</h3>
          <p>
            If you have any questions about this Policy or how we collect, use,
            or share your information, please contact us at{" "}
            <a href="mailto:privacy@gitcoin.co">privacy@gitcoin.co</a>.
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
        .prose-legal h4 {
          font-family: var(--font-heading, sans-serif);
          font-size: 0.9rem;
          font-weight: 600;
          color: rgb(209 213 219);
          margin-top: 1.25rem;
          margin-bottom: 0.4rem;
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
