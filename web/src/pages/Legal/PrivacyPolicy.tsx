import { Component } from "solid-js";
import { Link } from "@solidjs/router";
import DefaultLayout from "~/layouts/DefaultLayout";
import { company } from "~/config/constants";

const PrivacyPolicy: Component = () => {
  return (
    <DefaultLayout>
      <section class="m-10">
        <h1 class="text-3xl mb-4">{company.DISPLAY_NAME} - PRIVACY POLICY</h1>

        <p class="mb-4">Last Revised: <time>3/05/2023</time></p>

        <p class="mb-4">
          {company.DISPLAY_NAME} cares about your privacy. For this reason, we collect and use personal information only as needed to deliver our products, services, websites and mobile applications, and to communicate with you about the same, or as you have requested (collectively, our “Services”). Your personal information includes information such as:
        </p>

        <ul class="list-disc pl-8 mb-4">
          <li>Name</li>
          <li>Address</li>
          <li>Telephone number</li>
          <li>Date of birth</li>
          <li>Email address</li>
          <li>Billing and payment information</li>
          <li>Candidate information (for job applicants)</li>
          <li>Other data collected that could directly or indirectly identify you.</li>
        </ul>

        <p class="mb-4">
          Our Privacy Policy not only explains how and why we use your personal information that we collect, but also how you can access, update or otherwise take control of your personal information. We’ve also created a Trust Center that offers answers to your most common questions, quick links to access your Account Settings, instructions on how to exercise certain rights that might be available to you, and definitions to key terms and concepts noted in this Privacy Policy.
        </p>

        <p class="mb-4">
          If at any time you have questions about our practices or any of your rights described below, you may reach our Data Protection Officer (“DPO”) and our dedicated team that supports this office by contacting us at privacy@rentakloud.com. This inbox is actively monitored and managed so that we can deliver an experience that you can confidently trust.
        </p>

        <strong>What information we collect, how we collect it, and why</strong>
        <p class="mb-4">
          Much of what you likely consider personal information is collected directly from you when you:
        </p>

        <ol class="list-[lower-roman] pl-8 mb-4">
          <li>create an account or purchase any of our Services (ex: billing information, including name, address, credit card number, government identification);</li>
          <li>request assistance from our award-winning customer support team (ex: phone number, voice recordings);</li>
          <li>complete contact forms or request newsletters or other information from us (ex: email); or</li>
          <li>participate in contests and surveys, apply for a job, or otherwise participate in activities we promote that might require information about you.</li>
        </ol>

        <p class="mb-4">However, we also collect additional information when delivering our Services to you to ensure necessary and optimal performance. These methods of collection may not be as obvious to you, so we thought we’d highlight and explain a bit more about what these might be (as they vary from time to time):</p>

        <p class="mb-4"><strong>Cookies and similar technologies</strong> on our websites and mobile applications allow us to track your browsing behavior, such as links clicked, pages viewed, and items purchased. Specifically, the data collected relates to your interactions with our site features or third-party features, such as social media plugins, contained within the Services; Internet Protocol (IP) address (for example, to determine your language preference; browser type and settings; the date and time the Services were used; device type and settings; operating system used; application IDs, unique device identifiers; and error data). These technologies also automatically collect data to measure website performance and improve our systems, including metadata, log files, page load time, server response time to optimize DNS resolution, network routing and server configurations. For additional information, and to learn how to manage the technologies we utilize, please visit our Cookie Policy.</p>

        <p class="mb-4"><strong>Supplemented Data</strong> may be received about you from other sources, for example, from publicly available databases, social media platforms, or third parties from whom we have purchased data, in which case we may combine this data with information we already have about you so that we can update, expand and analyze the accuracy of our records, assess the qualifications of a candidate for employment, identify new customers, and provide products and services that may be of interest to you. If you provide us personal information about others, or if others give us your information, we will only use that information for the specific reason for which it was provided to us.</p>

        <p class="mb-4">
          <strong>How we utilize information.</strong><br />
          We strongly believe in both minimizing the data we collect and limiting its use and purpose to only that (1) for which we have been given permission, (2) as necessary to deliver the Services you purchase or interact with, or (3) as we might be required or permitted for legal compliance or other lawful purposes:
        </p>

        <p class="mb-4"><strong>Delivering, improving, updating and enhancing our Services.</strong> We collect various information relating to your purchase, use and/or interactions with our Services. We utilize this information to:</p>

        <ul class="list-disc pl-8 mb-4">
          <li>Improve and optimize the operation and performance of our Services (again, including our websites and mobile applications)</li>
          <li>Diagnose problems with and identify any security and compliance risks, errors, or needed enhancements to the Services</li>
          <li>Detect and prevent fraud and abuse of our Services and systems</li>
        </ul>

        <p class="mb-4">Much of the data collected is aggregated or statistical data about how individuals use our Services, and is not linked to any personal information.</p>

        <p class="mb-4"><strong>Sharing with trusted third parties.</strong> We may share your personal information with affiliated companies within our corporate family, with third parties with which we have partnered to allow you to integrate their services into our own Services, and with trusted third party service providers as necessary for them to perform services on our behalf, such as:</p>

        <ul class="list-disc pl-8 mb-4">
          <li>Processing credit card payments</li>
          <li>Serving advertisements (more on this topic below)</li>
          <li>Conducting contests or surveys</li>
          <li>Performing analysis of our Services, customer demographics, and sentiment</li>
          <li>Communicating with you, such as by way of email or survey delivery</li>
          <li>Customer relationship management</li>
          <li>Security, risk management and compliance</li>
          <li>Recruiting support and related services.</li>
        </ul>

        <p class="mb-4">These third parties (and any subcontractors they may be permitted to use) have agreed not to share, use or retain your personal information for any purpose other than as necessary for the provision of Services.</p>

        <p class="mb-4">We will also disclose your information to third parties:</p>

        <ul class="list-disc pl-8 mb-4">
          <li>in the event that we sell or buy any business or assets (whether a result of liquidation, bankruptcy or otherwise), in which case we will disclose your data to the prospective seller or buyer of such business or assets; or</li>
          <li>if we sell, buy, merge, are acquired by, or partner with other companies or businesses, or sell some or all of our assets. In such transactions, your information may be among the transferred assets.</li>
        </ul>

        <p class="mb-4"><strong>Advertisements.</strong> We want to serve you ads that are most relevant and useful to you, so we may use the personal information you provided us in Account Settings or those collected through cookie technologies to personalize ads and improve your overall experience with us on our site and other sites. We call this ad personalization (formerly, interest-based advertising) because the ads you see are based on previously collected or historical data to determine which ad will be most relevant to you, including data such as previous search queries, activity, visits to sites or apps, demographic information, or location. To illustrate ad personalization that is audience-based, let’s say you registered a domain with us and created a website using our website builder product. The next time you navigate to our advertising partner’s platform or website, they may recognize that you are a {company.DISPLAY_NAME} customer via a matched email and may use that data to help us display an ad about our latest promotion for website security. Alternatively, if you already purchased our website security product, then we may exclude you from future ad campaigns for this product because it wouldn’t be relevant to you. Other ad personalization could be activity-based. For example, using data about your page views on our site to determine whether an ad would be of interest to you. The information we share with our advertising channel partners to deliver you personalized ads is done securely and cannot be used by them for any other purpose. We do not sell your data to any third parties. In addition, the data we share is hashed and encrypted, which means that it does not directly identify you. We do not sell your data in any way to our partners or other third parties.</p>

        <p class="mb-4">To manage your preferences for audience-based ad personalization, please sign into your Account and visit “Account Settings.” To manage your preferences for activity-based ad personalization, please visit our Cookie Policy. and go to “Manage Settings.” If you opt-out of ad personalization, you may continue to receive ads, but those ads may be less relevant to you.</p>

        <p class="mb-4">For more information about ad personalization on your desktop or mobile browser, and to opt out of this type of advertising by third parties that participate in self-regulatory programs, please visit one of the following: the Network Advertising Initiative website, the Digital Advertising Alliance (“DAA”) website or the European Interactive Digital Advertising Alliance Website. To learn more about ad personalization in mobile apps and to opt out of this type of advertising by third parties that participate in the DAA’s AppChoices tool, please use this URL: https://youradchoices.com/appchoices to download the version of AppChoices for your device. Please note that any opt-out choice you exercise through these programs will only apply to ad personalization by the third parties you select but will still allow the collection of data for other purposes, including research, analytics, and internal operations. You may continue to receive ads, but those ads may be less relevant to you.</p>

        <p class="mb-4"><strong>Communicating with you.</strong> We may contact you directly or through a third party service provider regarding products or services you have signed up or purchased from us, such as necessary to deliver transactional or service related communications. We may also contact you with offers for additional services we think you’ll find valuable if you give us consent, or where allowed to contact you based on legitimate interests. You don’t need to provide consent as a condition to purchase our goods or services. These contacts may include:</p>

        <ul class="list-disc pl-8 mb-4">
          <li>Email</li>
          <li>Text (SMS) messages</li>
          <li>Telephone calls</li>
          <li>Messenger applications (e.g. WhatsApp, etc.)</li>
          <li>Automated phone calls or text messages.</li>
        </ul>

        <p class="mb-4">You may also update your subscription preferences with respect to receiving communications from us and/or our partners by signing into your account and visiting your “Account Settings” page.</p>

        <p class="mb-4">If we collect information from you in connection with a co-branded offer, it will be clear at the point of collection who is collecting the information and whose privacy policy applies. In addition, it will describe any options you have regarding the use and/or sharing of your personal information with a co-branded partner, as well as how to exercise those options. We are not responsible for the privacy practices or the content of third-party sites. Please read the privacy policy of any website you visit.</p>

        <p class="mb-4">If you make use of a service that allows you to import contacts (ex. using email marketing services to send emails on your behalf), we will only use the contacts and any other personal information for the requested service. If you believe that anyone has provided us with your personal information and you would like to request that it be removed from our database, please contact us at privacy@rentakloud.com.</p>

        <p class="mb-4"><strong>Transfer of personal information abroad.</strong> If you utilize our Services from a country other than the country where our servers are located, your personal information may be transferred across international borders, which will only be done when necessary for the performance of our contract with you, when we have your consent to do so, or subject to the appropriate standard contractual clauses. Also, when you call us or initiate a chat, we may provide you with support from one of our global locations outside your country of origin.</p>

        <p class="mb-4"><strong>Compliance with legal, regulatory and law enforcement requests.</strong> We cooperate with government and law enforcement officials and private parties to enforce and comply with the law. We may disclose any information about you to government or law enforcement officials or private parties as we, in our sole discretion, believe necessary or appropriate to respond to claims and legal process (such as subpoena requests), to protect our property and rights or the property and rights of a third party, to protect the safety of the public or any person, or to prevent or stop activity we consider to be illegal or unethical.</p>

        <p class="mb-4">To the extent we are legally permitted to do so, we may take reasonable steps to notify you if we are required to provide your personal information to third parties as part of legal process. We will also share your information to the extent necessary to comply with any ICANN, registry or ccTLD rules, regulations and policies when you register a domain name with us. For reasons critical to maintaining the security, stability and resiliency of the Internet, this includes the transfer of domain name registration information to the underlying domain registry operator and escrow provider, and publication of that information as required by ICANN in the public WHOIS database or with other third parties that demonstrate a legitimate legal interest to such information.</p>

        <strong class="mb-4">How we secure, store and retain your data.</strong>

        <p class="mb-4">We follow generally accepted standards to store and protect the personal information we collect, both during transmission and once received and stored, including utilization of encryption where appropriate. We retain personal information for as long as required to engage in the uses described in this Privacy Policy, unless a longer retention period is required by applicable law.</p>

        <p class="mb-4">The criteria used to determine our retention periods include the following:</p>

        <ul class="list-disc pl-8 mb-4">
          <li>The length of time we have an ongoing relationship with you and provide Services to you (for example, for as long as you have an account with us or keep using our Services);</li>
          <li>Whether account owners modify or their users delete information through their accounts;</li>
          <li>Whether we have a legal obligation to keep the data (for example, certain laws require us to maintain records of your transactions for a certain period of time before we can delete them); or</li>
          <li>Whether retention is advisable in light of our legal position (such as in regard to the enforcement of our agreements, the resolution of disputes, and applicable statutes of limitations, litigation, or regulatory investigation).</li>
        </ul>

        <p class="mb-4">If you have any questions about the security or retention of your personal information, you can contact us at privacy@rentakloud.com.</p>

        <strong class="mb-4">How you can access, update or delete your data.</strong>

        <p class="mb-4">To easily access, view, update, delete or port your personal information, or to update your subscription preferences, please sign into your Account and visit “Account Settings.” Please visit our <Link href="#">Trust Center</Link> for additional information and guidance for accessing, updating or deleting data.</p>

        <p class="mb-4">If you make a request to delete your personal information and that data is necessary for the products or services you have purchased, the request will be honored only to the extent it is no longer necessary for any Services purchased or required for our legitimate business purposes or legal or contractual record keeping requirements.</p>

        <p class="mb-4">If you are unable for any reason to access your Account Settings or our Trust Center, you may also contact us by one of the methods described in the “Contact Us” section below.</p>

        <strong class="mb-4">The E.U-U.S and Swiss-U.S. Privacy Shield Frameworks.</strong>

        <p class="mb-4">The following applies where Privacy Shield is used as the mechanism to transfer data from the EU or Switzerland to the U.S.:</p>

        <p class="mb-4">On July 16, 2020, the Court of Justice of the European Union issued a judgment declaring as “invalid” the European Commission’s Decision (EU) 2016/1250 of 12 July 2016 on the adequacy of the protection provided by the EU-U.S. Privacy Shield. As a result of that decision, the EU-U.S. Privacy Shield Framework is no longer a valid mechanism to comply with EU data protection requirements when transferring personal data from the European Union to the United States.</p>

        <p class="mb-4">Nonetheless, the U.S. Department of Commerce continues to administer the Privacy Shield program, and our parent company, {company.DISPLAY_NAME} Operating Company, LLC (and our related entities, including RentAKloud.com LLC, {company.DISPLAY_NAME} Media Temple, Inc., {company.DISPLAY_NAME} Sellbrite, Inc., Domains by Proxy, LLC, and {company.DISPLAY_NAME} Corporate Domains, LLC) complies with the EU-U.S. Privacy Shield Framework as set forth by the U.S. Department of Commerce regarding the collection, use, and retention of personal information transferred from the European Union to the United States. {company.DISPLAY_NAME} Operating Company, LLC has certified to the U.S. Department of Commerce that it adheres to the Privacy Shield Principles. If there is any conflict between the terms in this privacy policy and the Privacy Shield Principles, the Privacy Shield Principles shall govern. To learn more about the Privacy Shield program, and to view our certification, please visit https://www.privacyshield.gov/.</p>

        <p class="mb-4">RentAKloud.com, LLC is responsible for the processing of personal information it receives, under each Privacy Shield Framework, and subsequently transfers to a third party acting as an agent on its behalf. RentAKloud.com, LLC complies with the Privacy Shield Principles for all onward transfers of personal information from the EU and Switzerland, including the onward transfer liability provisions.</p>

        <p class="mb-4">With respect to personal information received or transferred pursuant to each Privacy Shield Framework, RentAKloud.com, LLC is subject to the regulatory enforcement powers of the U.S. Federal Trade Commission. In certain situations, RentAKloud.com, LLC may be required to disclose personal information in response to lawful requests by public authorities, including to meet national security or law enforcement requirements.</p>

        <p class="mb-4">If you have an unresolved privacy or data use concern that we have not addressed satisfactorily, please contact us at privacy@rentakloud.com. Under certain conditions, more fully described on the Privacy Shield Website, you may invoke binding arbitration when other dispute resolution procedures have been exhausted.</p>

        <p class="mb-4">In compliance with the Privacy Shield Principles, RentAKloud.com, LLC commits to resolve complaints about our collection or use of your personal information. EU and Swiss individuals with inquiries or complaints regarding our Privacy Shield policy should first contact us in any manner provided in the "CONTACT US" section below in this Privacy Policy.</p>

        <p class="mb-4">RentAKloud.com, LLC has further committed to cooperate with the panel established by the EU data protection authorities (DPAs) and the Swiss Federal Data Protection and Information Commissioner (FDPIC) with regard to unresolved Privacy Shield complaints concerning human resources data transferred from the EU and Switzerland in the context of the employment relationship.</p>

        <strong>‘<em>Do Not Track</em>’ notifications.</strong>
        <p class="mb-4">Some browsers allow you to automatically notify websites you visit not to track you using a “Do Not Track” signal. There is no consensus among industry participants as to what “Do Not Track” means in this context. Like many websites and online services, we currently do not alter our practices when we receive a “Do Not Track” signal from a visitor’s browser. To find out more about “Do Not Track,” you may visit www.allaboutdnt.com.</p>

        <strong>Age restrictions.</strong>
        <p class="mb-4">Our Services are available for purchase only for those over the age of 18. Our Services are not targeted to, intended to be consumed by or designed to entice individuals under the age of 18. If you know of or have reason to believe anyone under the age of 18 has provided us with any personal information, please contact us per the instructions below.</p>

        <strong>Non-Discrimination.</strong>
        <p class="mb-4">We will not discriminate against you for exercising any of your privacy rights. Unless permitted under applicable laws, we will not:</p>

        <ul class="list-disc pl-8 mb-4">
          <li>Deny you goods or services.</li>
          <li>Charge you different prices or rates for goods or services, including through granting discounts or other benefits, or imposing penalties.</li>
          <li>Provide you a different level or quality of goods or services.</li>
          <li>Suggest that you may receive a different price or rate for goods or services or a different level or quality of goods or services.</li>
        </ul>

        <strong>Changes to this policy.</strong>
        <p class="mb-4">We reserve the right to modify this Privacy Policy at any time. If we decide to change our Privacy Policy, we will post those changes to this Privacy Policy and any other places we deem appropriate, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we disclose it. If we make material changes to this Privacy Policy, we will notify you here, by email, or by means of a notice on our home page, at least thirty (30) days prior to the implementation of the changes.</p>

        <strong>Contact us.</strong>
        <p class="mb-4">If you have any questions, concerns, or complaints about our Privacy Policy, or how we handle your personal data, you may contact our Office of the Data Protection Officer by email at privacy@rentakloud.com. In the alternative, you may contact us by either of the following means:</p>

        <ul class="list-disc pl-8 mb-4">
          <li>
            <u>By Mail</u>:
            <ul class="list-[circle] pl-8">
              <li>United States: Attn: Office of the Data Protection Officer, {company.ADDRESS_USA}</li>
              <li>United Kingdom: Attn: Legal, Office of the DPO, 5th Floor, The Shipping Building, Old Vinyl Factory, 252-254 Blyth Road, Hayes, UB3 1HA.</li>
              <li>European Union (EEA): Attn: Legal, Office of the DPO, RentAKloud Deutschland GmbH c/o WeWork, Friesenplatz 4, 50672 Cologne, Germany</li>
              <li>Asia: Attn: Legal, Office of the DPO, 80 Robinson Road #02-00 Singapore 068898</li>
            </ul>
          </li>
          <li>
            <u>By Phone</u>: +1 480 463 8811 (toll-free: 1-866-RENTAKLOUD)
          </li>
        </ul>

        <p class="mb-4"><strong><em>We will respond to all requests, inquiries or concerns within thirty (30) days.</em></strong></p>

        <p class="mb-4">If you are not satisfied with our response, you may direct privacy complaints to your local data protection authority. RentAKloud.com LLC is the data controller for www.rentakloud.com.</p>
      </section>
    </DefaultLayout>
  )
}

export default PrivacyPolicy