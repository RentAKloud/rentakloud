import { Link } from "@solidjs/router";
import { Component } from "solid-js";
import { company } from "~/config/constants";
import LegalLayout from "~/layouts/LegalLayout";

const TermsOfService: Component = () => {
  return (
    <LegalLayout title="Terms of Service Agreement" revisionDateTime="2024-02-28 15:09:51">
      <h3 class="text-2xl mb-4">1. OVERVIEW</h3>
      <p class="mb-4">This Universal Terms of Service Agreement (this “Agreement”) is entered into by and between the relevant {company.DISPLAY_NAME}&nbsp;group entity indicated below (“{company.DISPLAY_NAME}”) and you, and is made effective as of the date of your use of this website (“Site”) or the date of electronic acceptance.</p>

      <p class="mb-4">Unless otherwise indicated in the specific documents accepted together with this Agreement, the relevant {company.DISPLAY_NAME} group entity you are contracting with will be determined under the rules indicated below. If your country of residence is:</p>

      <ul class="list-disc pl-8 mb-4">
        <li>
          <p>United Kingdom (UK), then contracting entity will be {company.DISPLAY_NAME} UK Limited, UK private limited company, registered address Nwms Center, 31 Southampton Row, Office 3.11, 3rd Floor, London, England, WC1B 5HJ;</p></li>
        <li>
          <p>Indonesia, then contracting entity will be PT WEB MEDIA TECHNOLOGY INDONESIA, Indonesia private limited company, address Jl. Palagan Tentara Pelajar No. 81 Jongkang, Sariharjo, Ngaglik, Sleman, Daerah Istimewa Yogyakarta, 55581;</p>
        </li>
        <li>
          <p>Asian countries as per list indicated <a href="https://www.rentakloud.com/list-of-countries-asia">here</a>, then contracting entity will be {company.DISPLAY_NAME.toUpperCase()} PTE LTD, Singapore private limited company, registered address 16 Raffles Quay, #33-02, Hong Leong Building, Singapore, 048581;</p>
        </li>
        <li>
          <p>Any other country not listed above (including EU countries), then the contracting entity will be {company.DISPLAY_NAME} International Ltd., Cyprus private limited company, registered address 61 Lordou Vironos str., 6023 Larnaca, Cyprus.</p>
        </li>
      </ul>

      <p class="mb-4">This Agreement sets forth the general terms and conditions of your use of the Site and the products and services purchased or accessed through this Site (individually and collectively, the “Services”), and is in addition to (not in lieu of) any specific terms and conditions that apply to the particular Services. Whether you are simply browsing or using this Site or purchase Services, your use of this Site and your electronic acceptance of this Agreement signifies that you have read, understand, acknowledge and agree to be bound by this Agreement, along with the applicable policies and agreement (including&nbsp;the applicable&nbsp;product agreements), which are incorporated herein by reference.&nbsp;</p>
      <p class="mb-4">When your use of the Services requires us to process any personal data or personal information, we will do so in accordance with our Privacy Policy and also, if applicable, Data Processing Addendum ("DPA"), which is incorporated into this Agreement by reference.</p>
      <p class="mb-6">The terms “we”, “us” or “our” shall refer to&nbsp;{company.DISPLAY_NAME}. The terms “you”, “your”, “User” or “customer” shall refer to any individual or entity who accepts this Agreement, has access to your account or uses the Services. Nothing in this Agreement shall be deemed to confer any third-party rights or benefits. {company.DISPLAY_NAME} may, in its sole and absolute discretion, change or modify this Agreement, and any policies or agreements which are incorporated herein, at any time, and such changes or modifications shall be effective immediately upon posting to this Site. Your use of this Site or the Services after such changes or modifications have been made shall constitute your acceptance of this Agreement as last revised. If you do not agree to be bound by this Agreement as last revised, do not use (or continue to use) this Site or the Services. In addition, {company.DISPLAY_NAME} may occasionally notify you of changes or modifications to this Agreement by email. It is therefore very important that you keep your shopper account (“Account”) information current. {company.DISPLAY_NAME} assumes no liability or responsibility for your failure to receive an email notification if such failure results from an inaccurate email address.&nbsp;</p>

      <h3 class="text-2xl mb-4">2. ELIGIBILITY; AUTHORITY</h3>
      <p class="mb-6">This Site and the Services are available only to Users who can form legally binding contracts under applicable law. By using this Site or the Services, you represent and warrant that you&nbsp;are (i) at least eighteen (18) years of age, (ii) otherwise recognized as being able to form legally binding contracts under applicable law, and (iii) are not a person barred from purchasing or receiving the Services found under the laws of the&nbsp;Cyprus&nbsp;or other applicable jurisdiction. If you are entering into this Agreement on behalf of a corporate entity, you represent and warrant that you have the legal authority to bind such corporate entity to the terms and conditions contained in this Agreement, in which case the terms “you”, “your”, “User” or “customer”&nbsp;shall refer to such corporate entity. If, after your electronic acceptance of this Agreement, {company.DISPLAY_NAME} finds that you do not have the legal authority to bind such corporate entity, you will be personally responsible for the obligations contained in this Agreement, including, but not limited to, the payment obligations. {company.DISPLAY_NAME} shall not be liable for any loss or damage resulting from&nbsp;{company.DISPLAY_NAME}’s&nbsp;reliance on any instruction, notice, document or communication reasonably believed by {company.DISPLAY_NAME} to be genuine and originating from an authorized representative of your corporate entity. If there is reasonable doubt about the authenticity of any such instruction, notice, document or communication,&nbsp;{company.DISPLAY_NAME}reserves the right (but undertakes no duty) to require additional authentication from you. You further agree to be bound by the terms of this Agreement for transactions entered into by you, anyone acting as your agent and anyone who uses your account or the Services, whether or&nbsp;not authorized by you.&nbsp;</p>

      <h3 class="text-2xl mb-4">3. ACCOUNTS; TRANSFER OF DATA ABROAD</h3>
      <p class="mb-4">
        <strong>Accounts.&nbsp;</strong>In order to access some of the features of this Site or use some of the Services, you will have to create an Account. You represent and warrant to {company.DISPLAY_NAME} that all information you submit when you create your Account is accurate, current and complete, and that you will keep your Account information accurate, current and complete. If {company.DISPLAY_NAME} has reason to believe that your Account information is untrue, inaccurate, out-of-date or incomplete, {company.DISPLAY_NAME} reserves the right, in its sole and absolute discretion, to suspend or terminate your Account. You are solely responsible for the activity that occurs on your Account, whether authorized by you or not, and you must keep your Account information secure, including without limitation your customer number/login, password, Payment Method(s) (as defined below). For security purposes, {company.DISPLAY_NAME} recommends that you change your password at least once every six (6) months for each Account. You must notify {company.DISPLAY_NAME} immediately of any breach of security or unauthorized use of your Account. {company.DISPLAY_NAME} will not be liable for any loss you incur due to any unauthorized use of your Account. You, however, may be liable for any loss {company.DISPLAY_NAME} or others incur caused by your Account, whether caused by you, or by an authorized person, or by an unauthorized person.&nbsp;</p><p><strong>Transfer of Data Abroad.</strong>&nbsp;If you are visiting this Site from a country other than the country in which our servers are located, your communications with us may result in the transfer of information (including your Account information) across international boundaries. By visiting this Site and communicating electronically with us, you consent to such transfers.&nbsp;
      </p>

      <p class="mb-4">
        <strong>Account Management Access (Account Sharing). </strong>The Services allows you to grant access (depending on permissions granted) to your {company.DISPLAY_NAME} account to another {company.DISPLAY_NAME} customer. You may revoke any person’s ability to access your account at any time. By authorizing any person to access your account, you acknowledge and agree that (1) you have an established and trusted business or personal relationship with such a person; (2) you voluntarily authorize such person to access and make changes to your account; (3) depending on permissions granted, such person may be able to view personal information that you have provided in your account, including billing information (but excluding full payment method information). You are assuming full legal and financial responsibility (and undertake to fully release {company.DISPLAY_NAME} from any related liability) with respect to your decision to grant access to your account to any person or with respect to any actions such person may take or fail to take with respect to your account.&nbsp;
      </p>

      <p class="mb-4">
        By requesting access to the {company.DISPLAY_NAME} account of another customer, {company.DISPLAY_NAME} customer undertakes to use such access solely in the best interest of and as authorized by the customer granting access.
      </p>

      <p class="mb-6">
        Please note that {company.DISPLAY_NAME} is not involved in the actual contract between a {company.DISPLAY_NAME} customer granting access and/or requesting/receiving access to an account.
        Should there be a dispute between the parties, you must address such dispute directly with the individual you are in contract with.
      </p>

      <h3 class="text-2xl mb-4">4. AVAILABILITY OF WEBSITE/SERVICES</h3>
      <p class="mb-6">
        Subject to the terms and conditions of this Agreement and our other policies and procedures, we shall use commercially reasonable efforts to attempt to provide this Site and the Services on a twenty-four (24) hours a day, seven (7) days a week basis. You acknowledge and agree that from time to time this Site may be inaccessible or inoperable for any reason including, but not limited to, equipment malfunctions; periodic maintenance, repairs or replacements that we undertake from time to time; or causes beyond our reasonable control or that are not&nbsp;reasonably foreseeable including, but not limited to, interruption or failure of telecommunication or digital transmission links, hostile network attacks, network congestion or other failures. You acknowledge and agree that we have no control over the availability of this Site or the Service on a continuous or uninterrupted basis, and that we assume no liability to you or any other party with regard thereto. From time to time, {company.DISPLAY_NAME} may offer new Services (limited preview services or new features to existing Services) in a pre-release version. New Services, new features to existing Services or limited preview services shall be known, individually and collectively, as “Trial Services”. If you elect to use any Trial Services, then your use of the Trial Services is subject to the following terms and conditions:
        (i) You acknowledge and agree that the Trial Services are pre-release versions and may not work properly;
        (ii) You acknowledge and agree that your use of the Trial Services may expose you to unusual risks of operational failures;
        (iii) The Trial Services are provided AS-IS, so we do not recommend using them in production or mission critical environments;
        (iv) {company.DISPLAY_NAME} reserves the right to modify, change, or discontinue any aspect of the Trial Services at any time;
        (v) Commercially released versions of the Trial Services may change substantially, and programs that use or run with the Trial Services may not work with the commercially released versions or subsequent releases;
        (vi) {company.DISPLAY_NAME} may limit availability of customer service support time dedicated to support of the Trial Services;
        (vii) You acknowledge and agree to provide prompt feedback regarding your experience with the Trial Services in a form reasonably requested by us, including information necessary to enable us to duplicate errors or problems you experience. You acknowledge and agree that we may use your feedback for any purpose, including product development purposes. At our request you will provide us with comments that we may use publicly for press materials and marketing collateral. Any intellectual property inherent in your feedback or arising from your use of the Trial Services shall be owned exclusively by&nbsp;{company.DISPLAY_NAME};
        (viii) You acknowledge and agree that all information regarding your use of the Trial Services, including your experience with and opinions regarding the Trial Services, is confidential, and may not be disclosed to a third party or used for any purpose other than providing feedback to&nbsp;{company.DISPLAY_NAME};
        (ix) The Trial Services are provided “as is”, “as available”, and “with all faults”. To the fullest extent permitted by law, {company.DISPLAY_NAME} disclaims any and all warranties, statutory, express or implied, with respect to the Trial Services including, but not limited to, any implied warranties of title, merchantability, fitness for a particular purpose and non-infringement. You acknowledge and agree that you have the necessary rights and permissions to share all information necessary to provide the Services with&nbsp;{company.DISPLAY_NAME}. You acknowledge and agree that the Services may be provided by independent contractors or&nbsp;third-party&nbsp;service providers. All paid support services are non-refundable.&nbsp;
      </p>

      <h3 class="text-2xl mb-4">5. GENERAL RULES OF CONDUCT</h3>
      <p class="mb-4"><strong>You acknowledge and agree that:</strong></p>

      <p class="mb-4">1.&nbsp;Your use of this Site and the Services, including any content you submit, will comply with this Agreement and all applicable local, state, national and international laws, rules and regulations.&nbsp;</p>

      <p class="mb-4">2.&nbsp;You will not collect or harvest (or permit anyone else to collect or harvest) any User Content (as defined below) or any non-public or personally identifiable information about another User or any other person or entity without their express prior written consent.&nbsp;</p>

      <p class="mb-4">3.&nbsp;You will not use this Site or the Services in a manner (as determined by {company.DISPLAY_NAME} in its sole and absolute discretion) that:</p>

      <ul class="list-disc pl-8 mb-4">
        <li>Is illegal, or promotes or encourages illegal activity;</li>
        <li>Promotes, encourages or engages in child pornography or the exploitation of children;</li>
        <li>Promotes, encourages or engages in terrorism, violence against people, animals, or property;</li><li>Promotes, encourages or engages in any spam or other unsolicited bulk email, or computer or network hacking or cracking;</li>
        <li>Promotes, encourages or engages in the sale or distribution of prescription medication without a valid prescription;</li>
        <li>Infringes on the intellectual property rights of another User or any other person or entity;</li>
        <li>Violates the privacy or publicity rights of another User or any other person or entity, or breaches any duty of confidentiality that you owe to another User or any other person or entity;&nbsp;</li><li>Interferes with the operation of this Site or the Services found at this Site;</li><li>Contains or installs any viruses, worms, bugs, Trojan horses, Cryptocurrency Miners or other code, files or programs designed to, or capable of, using many resources, disrupting, damaging or limiting the functionality of any software or hardware; or&nbsp;</li>
        <li>Contains false or deceptive language, or unsubstantiated or comparative claims, regarding {company.DISPLAY_NAME} or&nbsp;{company.DISPLAY_NAME}’s&nbsp;Services.</li>
      </ul>

      <p class="mb-4">4.&nbsp;You will not copy or distribute in any medium any part of this Site or the Services, except where expressly authorized by&nbsp;{company.DISPLAY_NAME}.</p>

      <p class="mb-4">5.&nbsp;You will not modify or alter any part of this Site or the Services found at this Site or any of its related technologies.</p>

      <p class="mb-4">6.&nbsp;You will not access {company.DISPLAY_NAME} Content (as defined below) or User Content through any technology or means other than through this Site itself, or as {company.DISPLAY_NAME} may designate.&nbsp;</p>

      <p class="mb-4">7.&nbsp;You agree to back-up all of your User Content so that you can access and use it when needed. {company.DISPLAY_NAME} does not warrant that it backs-up any Account or User Content, and you agree to accept as a risk the loss of any and all of your User Content.&nbsp;</p>

      <p class="mb-4">8.&nbsp;You will not re-sell or provide the Services for a commercial purpose, including any of&nbsp;{company.DISPLAY_NAME}’s&nbsp;related technologies, without&nbsp;{company.DISPLAY_NAME}'s&nbsp;express prior written consent.&nbsp;</p>

      <p class="mb-4">9.&nbsp;You agree to provide government-issued photo identification and/or government-issued business identification as required for verification of identity when requested.</p>

      <p class="mb-4">10.&nbsp;You are aware that {company.DISPLAY_NAME} may from time-to-time call you about your account. You will be informed about such recording, purposes thereof, as well as any other information will be provided to you as required by applicable law. You further acknowledge and agree that, to the extent permitted by applicable law, any such recording(s) may be submitted as evidence in any legal proceeding, in which {company.DISPLAY_NAME} is a party.&nbsp;</p>

      <p class="mb-6">{company.DISPLAY_NAME}&nbsp;reserves the right to modify, change, or discontinue any aspect of this Site or the Services, including without limitation prices and fees for the same, at any time.</p>

      <h3 class="text-2xl mb-4">6. YOUR USE OF {company.DISPLAY_NAME} CONTENT AND USER CONTENT</h3>
      <p class="mb-4">In addition to the general rules above, the provisions in this Section apply specifically to your use of {company.DISPLAY_NAME} Content and User Content posted to&nbsp;{company.DISPLAY_NAME}’s&nbsp;corporate websites (i.e., those sites which {company.DISPLAY_NAME} directly controls or maintains). The applicable provisions are not&nbsp;intended to and do not have the effect of transferring any ownership or licensed rights (including intellectual property rights) you may have in content posted to your hosted websites.&nbsp;</p>

      <p class="mb-4"><strong>{company.DISPLAY_NAME}&nbsp;Content</strong>. Except for User Content and User Intellectual Property, the content on this Site and the Services, including without limitation the text, software, scripts, source code, API, graphics, photos, sounds, music, videos and interactive features and the trademarks, service marks and logos contained therein,&nbsp;artwork, graphics, website templates, themes&nbsp;and widgets, literary work, computer code (including html), applications and other media, designs, animations, interfaces, derivatives and versions thereof, methods, products, algorithms, data, interactive features and objects, advertising and acquisition tools and methods, customized URLs and all copyrightable materials (“{company.DISPLAY_NAME}&nbsp;Content”), are owned by or licensed to {company.DISPLAY_NAME} in perpetuity, and are subject to copyright, trademark, and/or patent protection in the Cyprus and foreign countries, and other intellectual property rights under Cyprus and foreign laws. {company.DISPLAY_NAME} Content is provided to you “as is”, “as available” and “with all faults” for your information and personal, non-commercial use only and may not be downloaded, copied, reproduced, distributed, transmitted, broadcast, displayed, sold, licensed, or otherwise exploited for any purposes whatsoever without the express prior written consent of&nbsp;{company.DISPLAY_NAME}. No right or license under any copyright, trademark, patent, or other proprietary right or license is granted by this Agreement. {company.DISPLAY_NAME} reserves all rights not expressly granted in and to the {company.DISPLAY_NAME} Content, this Site and the Services, and this Agreement do not transfer ownership of any of these rights.&nbsp;However, {company.DISPLAY_NAME} hereby grants to the User a non-exclusive, non-transferable, non-sublicensable, fully revocable, limited license to use the {company.DISPLAY_NAME} Content, for the purpose of generating and displaying websites created through relevant Services provided by {company.DISPLAY_NAME}, solely as expressly permitted under this terms and conditions, and solely within the relevant Services.&nbsp;For the avoidance of doubt, if certain {company.DISPLAY_NAME} Content is provided (bundled) with certain Services’ plan, the User is allowed to use such {company.DISPLAY_NAME} Content solely within the relevant Services’ plan.</p>

      <p class="mb-4"><strong>User Content</strong>. Some of the features of this Site or the Services may allow Users to view, post, publish, share, store, or manage (a) ideas, opinions, recommendations, or advice (“User Submissions”), or (b) literary, artistic, musical, or other content, including but not limited to photos and videos (together with User Submissions, “User Content”). User Content includes all content submitted through your Account.</p>

      <p class="mb-4">User Intellectual Property. User shall own all intellectual property pertaining to User Content and to any other materials created, developed, or connected to Services by User, including any designs, images, animations, videos, audio files, fonts, logos, illustrations, compositions, artworks, code, algorithms, SPIs, APIs, databases, interfaces, text and literary works.</p>

      <p class="mb-4">By posting or publishing User Content or User Intellectual Property&nbsp;to this Site or to the Services, you represent and warrant to {company.DISPLAY_NAME} that (i) you have all necessary rights to distribute User Content or User Intellectual Property&nbsp;via this Site or via the Services, either because you are the author of the User Content or User Intellectual Property&nbsp;and have the right to distribute the same, or because you have the appropriate distribution rights, licenses, consents, and/or permissions to use, in writing, from the copyright or other owner of the User Content or User Intellectual Property, and (ii) the User Content or User Intellectual Property&nbsp;does not violate the rights of any third party.&nbsp;User shall be solely responsible for any and all consequences (including any damages) and requirements for using User Content or User Intellectual Property.</p>

      <p class="mb-6">Security. You agree not to circumvent, disable or otherwise interfere with the security-related features of this Site or the Services found at this Site (including without limitation those features that prevent or restrict use or copying of any {company.DISPLAY_NAME} Content or User Content) or enforce limitations on the use of this Site or the Services found at this Site, the&nbsp;{company.DISPLAY_NAME}Content or the User Content therein.&nbsp;</p>

      <h3 class="text-2xl mb-4">7. {company.DISPLAY_NAME.toUpperCase()}'S USE OF USER CONTENT</h3>
      <p class="mb-4">The provisions in this Section apply specifically to {company.DISPLAY_NAME} use of User Content posted to&nbsp;{company.DISPLAY_NAME}’s&nbsp;corporate websites (i.e., those sites which {company.DISPLAY_NAME} directly controls or maintains). The applicable provisions are not intended to and do not have the effect of transferring any ownership or licensed rights (including intellectual property rights) you may have in content posted to your hosted websites.</p>

      <p class="mb-4">Generally. You shall be solely responsible for any and all of your User Content or User Content that is submitted through your Account, and the consequences of, and requirements for, distributing it.</p>

      <p class="mb-4">
        <strong>With Respect to User Submissions. You acknowledge and agree that:</strong>
      </p>

      <p class="mb-4">1.&nbsp;Your User Submissions are entirely voluntary.</p>
      <p class="mb-4">2.&nbsp;Your User Submissions do not establish a confidential relationship or obligate {company.DISPLAY_NAME} to treat your User Submissions as confidential or secret.</p>
      <p class="mb-4">3. {company.DISPLAY_NAME} has no obligation, either express or implied, to develop or use your User Submissions, and no compensation is due to you or to anyone else for any intentional or unintentional use of your User Submissions.&nbsp;</p>
      <p class="mb-4">4. {company.DISPLAY_NAME} may be working on the same or similar content, it may already know of such content from other sources, it may simply wish to develop this (or similar) content on its own, or it may have taken / will take some other action.&nbsp;</p>
      <p class="mb-4">{company.DISPLAY_NAME} shall own exclusive rights (including all intellectual property and other proprietary rights) to any User Submissions posted to this Site, and shall be entitled to the unrestricted use and dissemination of any User Submissions posted to this Site for any purpose, commercial or otherwise, without acknowledgment or compensation to you or to anyone else.</p>
      <p class="mb-4">With Respect to User Content (Other Than User Submissions).</p>
      <p class="mb-4">If you have a website or other content hosted by&nbsp;{company.DISPLAY_NAME}, you shall retain all of your ownership or licensed rights in User Content.</p>
      <p class="mb-6">By posting or publishing User Content to this Site or through the Services, you authorize {company.DISPLAY_NAME} to use the intellectual property and other proprietary rights in and to your User Content to enable inclusion and use of the User Content in the manner contemplated by this Site and this Agreement. You hereby grant {company.DISPLAY_NAME} a worldwide, non-exclusive, royalty-free, sublicensable (through multiple tiers), and transferable license to use, reproduce, distribute, prepare derivative works of, combine with other works, display, and perform your User Content in connection with this Site, the Services and&nbsp;{company.DISPLAY_NAME}’s&nbsp;(and&nbsp;{company.DISPLAY_NAME}’saffiliates’) business(es), including without limitation for promoting and redistributing all or part of this Site in any media formats and through any media channels without restrictions of any kind and without payment or other consideration of any kind, or permission or notification, to you or any third party. You also hereby grant each User of this Site a non-exclusive license to access your User Content (with the exception of User Content that you designate “private” or “password protected”) through this Site, and to use, reproduce, distribute, prepare derivative works of, combine with other works, display, and perform your User Content as permitted through the functionality of this Site and under this Agreement. The above licenses granted by you in your User Content terminate within a commercially reasonable time after you remove or delete your User Content from this Site. You understand and agree, however, that {company.DISPLAY_NAME} may retain (but not distribute, display, or perform) server copies of your User Content that have been removed or deleted. The above licenses granted by you in your User Content are perpetual and irrevocable. Notwithstanding anything to the contrary contained herein, {company.DISPLAY_NAME} shall not use any User Content that has been designated “private” or “password protected” by you for the purpose of promoting this Site or&nbsp;{company.DISPLAY_NAME}’s&nbsp;(or&nbsp;{company.DISPLAY_NAME}’s&nbsp;affiliates’) business(es).</p>

      <h3 class="text-2xl mb-4">8. MONITORING OF CONTENT; ACCOUNT TERMINATION POLICY</h3>
      <p class="mb-4">{company.DISPLAY_NAME}generally does not pre-screen User Content (whether posted to a website hosted by {company.DISPLAY_NAME} or posted to this Site). However, {company.DISPLAY_NAME} reserves the right (but undertakes no duty) to do so and decide whether any item of User Content is appropriate and/or complies with this Agreement. {company.DISPLAY_NAME} may remove any item of User Content (whether posted to a website hosted by {company.DISPLAY_NAME} or posted to this Site) and/or terminate a User’s access to this&nbsp;Site or the Services found at this Site for posting or publishing any material in violation of this Agreement, or for otherwise violating this Agreement (as determined by {company.DISPLAY_NAME} in its sole and absolute discretion), at any time and without prior notice.&nbsp;</p>
      <p class="mb-6">{company.DISPLAY_NAME}may also terminate a User’s access to this Site, the Services or the Account (at {company.DISPLAY_NAME}’s sole discretion) without notice if: (i) {company.DISPLAY_NAME} notices or is informed that Site or the Services are used in a manner that promotes, encourages or engages in child pornography, the exploitation of children or terrorism, or (ii) {company.DISPLAY_NAME} has reason to believe the User is a repeat offender. If {company.DISPLAY_NAME} terminates your access to this Site, Services or the Account, {company.DISPLAY_NAME} may, in its sole and absolute discretion, remove and destroy any data and files stored by you on its servers. Please note that using one Service for illegal activity mentioned herein does not limit {company.DISPLAY_NAME}’s right to terminate User’s Account.</p>

      <h3 class="text-2xl mb-4">9. ADDITIONAL RESERVATION OF RIGHTS</h3>
      <p class="mb-4">
        {company.DISPLAY_NAME} expressly reserves the right to deny, cancel, terminate, suspend, lock, or modify access to (or control of) any Account or Services (including the right to cancel or transfer any domain name registration) for any reason (as determined by {company.DISPLAY_NAME} in its sole and absolute discretion), including but not limited to the following:
        (i) to correct mistakes made by {company.DISPLAY_NAME} in offering or delivering any Services (including any domain name registration),
        (ii) to protect the integrity and stability of, and correct mistakes made by, any domain name registry,
        (iii) to assist with our fraud and abuse detection and prevention efforts,
        (iv) to comply with court orders against you and/or your domain name or website and applicable local, state, national and international laws, rules and regulations,
        (v) to comply with requests of law enforcement, including subpoena requests,
        (vi) to comply with any dispute resolution process,
        (vii) to defend any legal action or threatened legal action without consideration for whether such legal action or threatened legal action is eventually determined to be with or without merit, or
        (viii) to avoid any civil or criminal liability on the part of&nbsp;{company.DISPLAY_NAME}, its officers, directors, employees and agents, as well as {company.DISPLAY_NAME} ’s affiliates, including, but not limited to, instances where you have sued or threatened to sue&nbsp;{company.DISPLAY_NAME}.
      </p>

      <p class="mb-4">{company.DISPLAY_NAME} expressly reserves the right to terminate, without notice to you, any and all Services where, in&nbsp;{company.DISPLAY_NAME}'s&nbsp;sole discretion, you are harassing or threatening&nbsp;{company.DISPLAY_NAME} and/or any of&nbsp;{company.DISPLAY_NAME}'s&nbsp;employees.</p>

      <p class="mb-6">{company.DISPLAY_NAME} expressly reserves the right to access, edit, and (or) in any other way modify your Account and (or) Services, including but not limited to, User Submissions and User Content, in order to assist you when you reach out to the Customer Service via live chat, email or ticketing system or any other way described in <a href="https://www.rentakloud.com/customer-service-policy">Customer Service Policy</a>. {company.DISPLAY_NAME} shall not be liable for any loss or damage resulting from such actions.&nbsp;</p>

      <h3 class="text-2xl mb-4">10. NO SPAM; LIQUIDATED DAMAGES</h3>
      <p class="mb-4">No Spam. We do not tolerate the transmission of spam. We monitor all traffic to and from our web servers for indications of spamming. Customers suspected to be using our products and services for the purpose of sending spam are fully investigated. If we determine there is a problem with spam, we will take the appropriate action to resolve the situation.</p>

      <p class="mb-4">We define spam as the sending of Unsolicited Commercial Email (UCE), Unsolicited Bulk Email (UBE) or Unsolicited Facsimiles (Fax), which is email or facsimile sent to recipients as an advertisement or otherwise, without first obtaining prior confirmed consent to receive these communications. This can include, but is not limited to, the following:</p>

      <ul class="list-disc pl-8 mb-4">
        <li>Email Messages</li>
        <li>Newsgroup postings</li>
        <li>Windows system messages</li>
        <li>Pop-up messages (aka "adware" or "spyware" messages)</li>
        <li>Instant messages (using AOL, MSN, Yahoo or other instant messenger programs)</li>
        <li>Online chat room advertisements</li>
        <li>Guestbook or Website Forum postings</li>
        <li>Facsimile Solicitations</li>
        <li>Text/SMS Messages</li>
      </ul>

      <p class="mb-4">We will not allow our servers and services to be used for the purposes described above. In order to use our products and services, you must not only abide by all applicable laws and regulations but you must also abide by this no spam policy. Commercial advertising and/or bulk emails or faxes may only&nbsp;be sent to recipients who have “opted-in”&nbsp;to receive messages. They must include a legitimate return address and reply-to address, the sender's physical address, and an opt-out method in the footer of the email or fax. Upon request by us, conclusive proof of opt-in may be required for an email address or fax number.</p>
      <p class="mb-4">If we determine the services in question are being used in association with spam, we will re-direct, suspend, or cancel any web site hosting, domain registration, email boxes or other applicable services until customer responds. The registrant or customer will be required to respond by email to us stating that they will cease to send spam and/or have spam sent on their behalf. In the event we determine the abuse has not stopped after services have been restored the first time, we may terminate the hosting and email boxes associated with the domain name in question.</p>
      <p class="mb-4">We encourage all customers and recipients of email generated from our products and services to report suspected spam.
        Suspected abuse can be reported by email&nbsp;<a href="mailto:abuse@rentakloud.com">abuse@rentakloud.com</a>.</p>
      <p class="mb-6">Liquidated Damages. You agree that we may immediately terminate any Account which we believe, in our sole and absolute discretion, is transmitting or is otherwise connected with any spam or other unsolicited bulk email.</p>

      <h3 class="text-2xl mb-4">11. TRADEMARK AND/OR COPYRIGHT CLAIMS</h3>
      <p class="mb-6">{company.DISPLAY_NAME}&nbsp;supports the protection of intellectual property. If you would like to submit (i) a trademark claim for violation of a mark on which you hold a valid, registered trademark or service mark, or (ii) a copyright claim for material on which you hold a bona fide copyright, please refer to&nbsp;{company.DISPLAY_NAME}’s&nbsp;Trademark and/or Copyright Infringement Policy referenced above and available&nbsp;<a href="https://www.rentakloud.com/trademark-copyright-infringement">here</a>.</p>

      <h3 class="text-2xl mb-4">12. LINKS TO THIRD-PARTY WEBSITES</h3>
      <p class="mb-6">This Site and the Services found at this Site may contain links to third-party websites that are not owned or controlled by&nbsp;{company.DISPLAY_NAME}. {company.DISPLAY_NAME} assumes no responsibility for the content, terms and conditions, privacy policies, or practices of any third-party websites. In addition, {company.DISPLAY_NAME} does not censor or edit the content of any third-party websites. By using this Site or the Services found at this Site, you expressly release {company.DISPLAY_NAME} from any and all liability arising from your use of any third-party website. Accordingly, {company.DISPLAY_NAME} encourages you to be aware when you leave this Site or the Services found at this Site and to review the terms and conditions, privacy policies, and other governing documents of each other website that you may visit.</p>

      <h3 class="text-2xl mb-4">13. DISCLAIMER OF REPRESENTATIONS AND WARRANTIES</h3>
      <p class="mb-4">YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT YOUR USE OF THIS SITE AND THE SERVICES FOUND AT THIS SITE SHALL BE AT YOUR OWN RISK AND THAT THIS SITE AND THE SERVICES FOUND AT THIS SITE ARE PROVIDED&nbsp;“AS IS”, “AS AVAILABLE”&nbsp;AND “WITH ALL FAULTS”. {company.DISPLAY_NAME.toUpperCase()}, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND ALL THIRD-PARTY SERVICE PROVIDERS DISCLAIM ALL WARRANTIES, STATUTORY, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE&nbsp;AND NON-INFRINGEMENT. {company.DISPLAY_NAME.toUpperCase()}, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS MAKE NO REPRESENTATIONS OR WARRANTIES ABOUT (I) THE ACCURACY, COMPLETENESS, OR CONTENT OF THIS SITE, (II) THE ACCURACY, COMPLETENESS, OR CONTENT OF ANY SITES LINKED (THROUGH HYPERLINKS, BANNER ADVERTISING OR OTHERWISE) TO THIS SITE, AND/OR (III) THE SERVICES FOUND AT THIS SITE OR ANY SITES LINKED (THROUGH HYPERLINKS, BANNER ADVERTISING OR OTHERWISE) TO THIS SITE, AND {company.DISPLAY_NAME.toUpperCase()}&nbsp;ASSUMES NO LIABILITY OR RESPONSIBILITY FOR THE SAME.</p>

      <p class="mb-4">IN ADDITION, YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT NO ORAL OR WRITTEN INFORMATION&nbsp;OR ADVICE PROVIDED BY {company.DISPLAY_NAME.toUpperCase()}, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS (INCLUDING WITHOUT LIMITATION ITS CALL CENTER OR CUSTOMER SERVICE REPRESENTATIVES), AND THIRD-PARTY SERVICE PROVIDERS WILL (I) CONSTITUTE LEGAL OR FINANCIAL ADVICE OR (II) CREATE A WARRANTY OF ANY KIND WITH RESPECT TO THIS SITE OR THE SERVICES FOUND AT THIS SITE, AND USERS SHOULD NOT RELY ON ANY SUCH INFORMATION OR ADVICE.</p>

      <p class="mb-6">THE FOREGOING DISCLAIMER OF REPRESENTATIONS AND WARRANTIES SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY LAW, AND shall survive any termination or expiration of this Agreement or your use of this Site or the Services found at this Site.</p>

      <h3 class="text-2xl mb-4">14. LIMITATION OF LIABILITY</h3>
      <p class="mb-4">IN NO EVENT SHALL {company.DISPLAY_NAME.toUpperCase()}, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND ALL THIRD PARTY SERVICE PROVIDERS, BE LIABLE TO YOU OR ANY OTHER PERSON OR ENTITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER, INCLUDING ANY THAT MAY RESULT FROM
        (I) THE ACCURACY, COMPLETENESS, OR CONTENT OF THIS SITE,
        (II) THE ACCURACY, COMPLETENESS, OR CONTENT OF ANY SITES LINKED (THROUGH HYPERLINKS, BANNER ADVERTISING OR OTHERWISE) TO THIS SITE,
        (III) THE SERVICES FOUND AT THIS SITE OR ANY SITES LINKED (THROUGH HYPERLINKS, BANNER ADVERTISING OR OTHERWISE) TO THIS SITE,
        (IV) PERSONAL INJURY OR PROPERTY DAMAGE OF ANY NATURE WHATSOEVER,
        (V) THIRD-PARTY CONDUCT OF ANY NATURE WHATSOEVER,
        (VI) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS AND/OR ANY AND ALL CONTENT, PERSONAL INFORMATION, FINANCIAL INFORMATION OR OTHER INFORMATION AND DATA STORED THEREIN,
        (VII) ANY INTERRUPTION OR CESSATION OF SERVICES TO OR FROM THIS SITE OR ANY SITES LINKED (THROUGH HYPERLINKS, BANNER ADVERTISING OR OTHERWISE) TO THIS SITE,
        (VIII) ANY VIRUSES, WORMS, BUGS, TROJAN HORSES, OR THE LIKE, WHICH MAY BE TRANSMITTED TO OR FROM THIS SITE OR ANY SITES LINKED (THROUGH HYPERLINKS, BANNER ADVERTISING OR OTHERWISE) TO THIS SITE,
        (IX) ANY&nbsp;USER CONTENT OR CONTENT THAT IS DEFAMATORY, HARASSING, ABUSIVE, HARMFUL TO MINORS OR ANY PROTECTED CLASS, PORNOGRAPHIC, “X-RATED”, OBSCENE OR OTHERWISE OBJECTIONABLE, AND/OR
        (X) ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF YOUR USE OF THIS SITE OR THE SERVICES FOUND AT THIS SITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL OR EQUITABLE THEORY, AND WHETHER OR NOT {company.DISPLAY_NAME.toUpperCase()}&nbsp;IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

      <p class="mb-4">IN ADDITION, You SPECIFICALLY ACKNOWLEDGE AND agree that any cause of action arising out of or related to this Site or the Services found at this Site must be commenced within one (1) year after the cause of action accrues, otherwise such cause of action shall be permanently barred.</p>

      <p class="mb-4">IN ADDITION, You SPECIFICALLY ACKNOWLEDGE AND agree that in no event shall {company.DISPLAY_NAME}’s total aggregate liability exceed $10,000.00 U.S. Dollars.</p>

      <p class="mb-6">THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY LAW, AND shall survive any termination or expiration of this Agreement or your use of this Site or the Services found at this Site.</p>

      <h3 class="text-2xl mb-4">15. INDEMNITY</h3>
      <p class="mb-6">
        You agree to protect, defend, indemnify and hold harmless {company.DISPLAY_NAME} and its officers, directors, employees, agents, and third party
        service providers from and against any and all claims, demands, costs, expenses, losses, liabilities and damages of every kind and nature
        (including, without limitation, reasonable attorneys’ fees) imposed upon or incurred by {company.DISPLAY_NAME} directly or indirectly arising from
        (i) your use of and access to this Site or the Services found at this Site;
        (ii) your violation of any provision of this Agreement or the policies or agreements which are incorporated herein; and/or
        (iii) your violation of any third-party right, including without limitation any intellectual property or other proprietary right. The indemnification obligations under this section shall survive any termination or expiration of this Agreement or your use of this Site or the Services found at this Site.
      </p>

      <h3 class="text-2xl mb-4">16. DISCONTINUED SERVICES; END OF LIFE POLICY</h3>
      <p class="mb-4">
        {company.DISPLAY_NAME}&nbsp;reserves the right to cease offering or providing any of the Services at any time, for any or no reason, and without prior notice.
        Although {company.DISPLAY_NAME} makes great effort to maximize the lifespan of all its Services, there are times when a Service we offer will be discontinued or reach its End-of-Life ("EOL"). If that is the case, that product or service will no longer be supported by&nbsp;{company.DISPLAY_NAME}, in any way, effective on the EOL date.
      </p>
      <p class="mb-4"><strong>Notice and Migration.</strong>&nbsp;In the event that any Service we offer has reached or will reach EOL, we will attempt to notify you thirty or more days in advance of the EOL date. It is your responsibility to take all necessary steps to replace the Service by migrating to a new Service before the EOL date, or by entirely ceasing reliance on said Service before the EOL date. In either case, {company.DISPLAY_NAME} will either offer a comparable Service for you to migrate to for the remainder of the term of your purchase, a prorated in-store credit, or a prorated refund, to be determined by {company.DISPLAY_NAME} in its sole and absolute discretion. {company.DISPLAY_NAME} may, with or without notice to you, migrate you to the most up-to-date version of the Service, if available. You&nbsp;agree to take full responsibility for any and all loss or damage arising from any such migration.</p>
      <p class="mb-4"><strong>No Liability.</strong> {company.DISPLAY_NAME} will not be liable to you or any third party for any modification, suspension, or discontinuance of any of the Services we may offer or facilitate access to.</p>

      <h3 class="text-2xl mb-4">17. FEES AND PAYMENTS</h3>
      <p class="mb-4">
        You agree that your Payment Method may be charged by one of our affiliated entities. If, during your purchase, your
        payment was identified as being processed in Lithuania, your transaction will be processed by {company.DISPLAY_NAME.toUpperCase()}, UAB,
        registered at Jonavos g. 60C, LT-44192 Kaunas, Lithuania; if your payment was identified as being processed in Brazil,
        your transaction will be processed by {company.DISPLAY_NAME.toUpperCase()} BRASIL HOSPEDAGEM DE SITES LTDA, registered at Florianópolis,
        estado de Santa Catarina, à Rua Joaquim Carneiro.No 120, 6o ANDAR, Bairro Capoeiras, CEP 88.085-120; if your
        payment was identified as being processed in the Cyprus, your transaction will be processed by {company.DISPLAY_NAME.toUpperCase()}&nbsp;
        INTERNATIONAL LIMITED, registered at 61 Lordou Vironos Street Lumiel Building, 4th floor 6023 Larnaca, Cyprus; if your payment was identified as being processed in Singapore, your transaction will be processed by {company.DISPLAY_NAME.toUpperCase()} PTE, registered at 16 Raffles Quay #33-02 Singapore 048581;
        if your payment was identified as being processed in Indonesia, your transaction will be processed by PT WEB MEDIA Technology (Niagahoster), registered at Menara Cakrawala LT. 12 JL. MH. Thamrin No.9 KEL. Kebon Sirih Menteng Jakarta;
        If your payment was identified as being processed in United States, your transaction will be proceeded by {company.DISPLAY_NAME.toUpperCase()} US INC., registered at 1201 North Market Street, Suite 111-F69, Wilmington, DE 19801, United States.
        If during your purchase, your payment was identified as being processed in a country that is not listed above, your transaction may be processed by an entity within the disclosed country that is affiliated with our local payment service provider, and subject to the provisions of our <Link href="/legal/privacy-policy">Privacy Policy</Link>.
      </p>

      <p class="mb-4">
        <strong>(A) GENERAL TERMS, INCLUDING AUTOMATIC RENEWAL TERMS&nbsp;</strong>
      </p>

      <p class="mb-4">By purchasing our Services, you agree to provide correct and full payment related information (including information required for tax exemptions, such as VAT/GST number). Any claims or requests will be handled only if they are provided not later than within 30 days of the date of purchase, unless applicable laws provide otherwise.</p>
      <p class="mb-4">If you use automatic payments, you will always need to have one payment method that's designated as a primary. You can also add a backup payment method to your account that will be used if your primary payment method does not work for some reason. In case your primary method does not work, we will automatically charge your costs to your backup payment method in order to ensure that your Services keep running.</p>
      <p class="mb-4">
        You agree to pay any and all prices and fees due for Services purchased or obtained at this Site at the time you order the Services.
        All prices and fees are non-refundable unless otherwise expressly noted in the Refund Policy section below, even if your Services are suspended, terminated, or transferred prior to the end of the Services term.
        {company.DISPLAY_NAME} expressly reserves the right to change or modify its prices and fees at any time, and such changes or modifications shall be posted online at this Site and effective immediately without need for further notice to you.
        If you have purchased or obtained Services for a period of months or years, changes or modifications in prices and fees shall be effective when the Services in question come up for renewal as further described below.
        Except as prohibited in any product-specific agreement, you may pay for Services by utilizing any of the following “Payment Methods”:
        (i) by providing a valid credit card,
        (ii) by using PayPal (as defined below), or
        (iii) via in-store credit balances, if applicable (and as defined below), each a “Payment Method”. For Services that offer “Express Checkout”, clicking the Express Checkout button will automatically place an order for that Service and charge the primary Payment Method on file for your Account.
        Confirmation of that order will be sent to the email address on file for your Account. Your Payment Method on file must be kept valid if you have any active Services in your Account.
        You acknowledge and agree that where refunds are issued to your Payment Method,&nbsp;{company.DISPLAY_NAME}'s&nbsp;issuance of a refund receipt is only confirmation that {company.DISPLAY_NAME} has submitted your refund to the Payment Method charged at the time of the original sale, and that {company.DISPLAY_NAME} has absolutely no control over when the refund will be applied towards your Payment Method’s available balance. You further acknowledge and agree that the payment provider and/or individual issuing bank associated with your Payment Method establish and regulate the time frames for posting your refund, and that such refund posting time frames may range from five (5) business days to a full billing cycle, or longer.
      </p>
      <p class="mb-4">In the event a refund is issued to your Payment Method and the payment provider, payment processor or individual issuing bank associated with your Payment Method imposes any limitations on refunds, including but not limited to, limitations as to the timing of the refund or the number of refunds allowed, then&nbsp;{company.DISPLAY_NAME}, in its sole and absolute discretion, reserves the right to issue the refund in the form of an in-store credit. {company.DISPLAY_NAME} also has the right, but not the obligation, to offer an in-store credit for customers seeking refunds, even if there are no limitations on refunds imposed by the Payment Method. For the avoidance of doubt, any and all refunds processed via the issuance of in-store&nbsp;creditsare&nbsp;solely within&nbsp;{company.DISPLAY_NAME}’s&nbsp;discretion and are not available at customer request.
        In order to ensure that you do not experience an interruption or loss of Services, most Services offer an automatic renewal option.
        The automatic renewal option automatically renews the applicable Service for a renewal period equal in time to the most recent service period, except for domain names which will renew for the original service period. For example, for products other than&nbsp;domains, if your last service period is for one year, your renewal period will be for one year. While the details of the automatic renewal option vary from Service to Service, the Services that offer an automatic renewal option treat it as the default setting. Therefore, unless you disable the automatic renewal option, {company.DISPLAY_NAME} will automatically renew the applicable Service when it comes up for renewal and will take payment from the Payment Method you have on file with {company.DISPLAY_NAME} at&nbsp;{company.DISPLAY_NAME}’s&nbsp;then current rates, which you acknowledge and agree may be higher or lower than the rates for the original service period.
        In order to see the renewal settings applicable to you and your Services, simply log into your members area and find the respective account. You may enable or disable the automatic renewal option at any time. However, should you elect to disable the automatic renewal option and fail to manually renew your Services before they expire, you may experience an interruption or loss of Services, and {company.DISPLAY_NAME} shall not be liable to you or any third party regarding the same. In addition, {company.DISPLAY_NAME} may participate in “recurring billing programs” or “account updater services” supported by your credit card provider (and ultimately dependent on your bank’s participation).
        If you are enrolled in an automatic renewal option and we are unable to successfully charge your existing Payment Method, your credit card provider (or your bank) may notify us of updates to your credit card number and/or expiration date, or they may automatically charge your new credit card on our behalf without notification to us.
        In accordance with recurring billing program requirements, in the event that we are notified of an update to your credit card number and/or expiration date, {company.DISPLAY_NAME} will automatically update your payment profile on your behalf. {company.DISPLAY_NAME} makes no guarantees that we will request or receive updated credit card information. You acknowledge and agree that it is your sole responsibility to modify and maintain your Account settings, including but not limited to (i) setting your renewal options and (ii) ensuring your associated Payment Method(s) are current and valid.
        Further, you acknowledge and agree that your failure to do so, may result in the interruption or loss of Services, and {company.DISPLAY_NAME} shall not be liable to you or any third party regarding the same.
        If for any reason {company.DISPLAY_NAME} is unable to charge your Payment Method for the full amount owed for the Services provided, or if {company.DISPLAY_NAME} receives notification of a chargeback, reversal, payment dispute, or is charged a penalty for any fee it previously charged to your Payment Method, you agree that {company.DISPLAY_NAME} may pursue all available lawful remedies in order to obtain payment, including but not limited to, immediate cancellation, without notice to you, of any domain names or Services registered or renewed on your behalf. {company.DISPLAY_NAME} also reserves the&nbsp;right to charge you reasonable “administrative fees” or “processing fees”&nbsp;for
        (i) tasks {company.DISPLAY_NAME} may perform outside the normal scope of its Services,
        (ii) additional time and/or costs {company.DISPLAY_NAME} may incur in providing its Services, and/or
        (iii) your noncompliance with this Agreement (as determined by {company.DISPLAY_NAME} in its sole and absolute discretion).
      </p>
      <p class="mb-4">
        Typical administrative or processing fee scenarios include, but are not limited to
        (i) customer service issues that require additional personal time or attention;
        (ii) UDRP actions(s) in connection with your domain name(s) and/or disputes that require accounting or legal services, whether performed by {company.DISPLAY_NAME} staff or by outside firms retained by&nbsp;{company.DISPLAY_NAME};
        (iii) recouping any and all costs and fees, including the cost of Services, incurred by {company.DISPLAY_NAME} as the results of chargebacks or other payment disputes brought by you, your bank or Payment Method processor. These administrative fees or processing fees will be billed to the Payment Method you have on file with&nbsp;{company.DISPLAY_NAME}. {company.DISPLAY_NAME} may offer product-level pricing in various currencies;&nbsp;however, transaction processing is supported only in U.S. dollars and a select number of the currency options displayed on this Site ("Supported Currency" or “Supported Currencies”).
        If the currency selected is a Supported Currency, then the transaction will be processed in the Supported Currency and the pricing displayed during the checkout process will be the actual amount processed and submitted to your bank for payment. If the currency selected is not a&nbsp;Supported Currency, then the transaction will be processed in U.S. dollars and the pricing displayed during the checkout process will be an estimated conversion price at the time of purchase. In either case (whether the currency selected is a Supported Currency or not), if the transaction is processed in a currency that differs from the currency of your bank account, you may be charged exchange rate conversion fees by your bank.
        In addition,&nbsp;due to time differences between
        (i) the time you complete the checkout process,
        (ii) the time the transaction is processed, and
        (iii) the time the transaction posts to your bank statement, the conversion rates may fluctuate, and {company.DISPLAY_NAME} makes no representations or warranties that
        (a) the amount submitted to your bank for payment will be the same as the amount posted to your bank statement (in the case of a Supported Currency) or
        (b) the estimated conversion price will be the same as either the amount processed or the amount posted to your bank statement (in the case of a non-Supported Currency), and you agree to waive any and all claims based upon such discrepancies (including any and all claims for a refund based on the foregoing).
        In addition, regardless of the selected currency, you acknowledge and agree that you may be charged Value Added Tax ("VAT"), Goods and Services Tax ("GST"), or other localized fees and/or taxes, based on your bank and/or the country indicated in your billing address section.
      </p>

      <p class="mb-4">Refund Policy: Products and Services available for refunds are described&nbsp;<a href="https://www.rentakloud.com/refund-policy">here</a>&nbsp;(“Refund Policy”). For products and services eligible for a refund, you may request a full refund within thirty (30) days of purchase (“Refund Period”). In the event you purchase a product that includes a free domain name, if you cancel the product, the list price for the domain name will be deducted from the refund amount. The list price is the price of the domain name listed on&nbsp;{company.DISPLAY_NAME}’s&nbsp;website and is not subject to any promotion, discount, or other reduction in price.</p>

      <p class="mb-4">In no event will you be eligible for more than one refund of the same product.&nbsp;</p>

      <p class="mb-4"><strong>(B) PAY BY PAYPAL</strong></p>
      <p class="mb-4">
        By using {company.DISPLAY_NAME}’s pay by PayPal payment option (“PayPal”), you can purchase Services using PayPal.
        In connection therewith, you agree to allow PayPal to debit the full amount of your purchase from your PayPal account (“PayPal Account”) or from credit card(s), bank account(s), or other allowed payment method(s) linked to your PayPal Account (“PayPal Funding Source”).
      </p>
      <p class="mb-4">
        It is your responsibility to keep your PayPal Account and PayPal Funding Source current and funded, and your PayPal Account backed by a valid credit card. You acknowledge and agree that
        (i) PayPal reserves the right to decline a transaction for any reason (including, but not limited to, payments that fail to go through as a result of your PayPal Account or PayPal Funding Source no longer existing or not holding available/sufficient funds) and
        (ii) in such event, neither PayPal nor {company.DISPLAY_NAME} shall be liable to you or any third party regarding the same. If for any reason PayPal is unable to withdraw the full amount owed for your purchase, you agree that PayPal and {company.DISPLAY_NAME} may pursue all available lawful remedies in order to obtain payment.
        You agree that if the transaction is returned unpaid, you will pay a service charge of $25.00 or the maximum amount allowed by law, which may be debited from your PayPal Account or PayPal Funding Source.
      </p>

      <p class="mb-4">By clicking the box labeled “I agree” to the terms of the PayPal payment option, you authorize a debit of the full amount of your purchase from your PayPal Account or PayPal Funding Source.</p>

      <p class="mb-4"><strong>(C) INTERNATIONAL PAYMENT OPTIONS</strong></p>
      <p class="mb-4">{company.DISPLAY_NAME} offers a variety of alternative international payment options through a variety of International Payment Providers (“IPP”). In the event you select an IPP, you represent that you have already agreed to any and all of the IPP’s applicable customer service agreements in advance of completing your transaction at&nbsp;{company.DISPLAY_NAME}. You also agree to allow the IPP to debit the full amount of your purchase from the selected bank account, e-wallet account (including credit card(s), bank account(s), or other allowed payment method(s) linked to your e-wallet account) or any other type of account associated with the selected IPP (including but not limited to, prepaid cards and mobile payments), collectively “Funding Sources”. In addition, you agree to allow the selected IPP to debit, if applicable, an “Exchange Rate Conversion Fee”, as well as any other fees or charges applicable to your agreement with the IPP (collectively, the “IPP Fees”), from your Funding Sources. You understand and agree that IPP Fees are subject to change at any time by the IPP without notice to you by&nbsp;{company.DISPLAY_NAME}.</p>
      <p class="mb-4">
        It is your responsibility to keep your Funding Sources current and funded. You acknowledge and agree that
        (i) the IPP reserves the right to decline a transaction for any reason (including, but not limited to, payments that fail to go through as a result of your Funding Sources no longer existing or not holding available/sufficient funds) and
        (ii) in such event, neither the IPP nor {company.DISPLAY_NAME} shall be liable to you or any third party regarding the same. You acknowledge that {company.DISPLAY_NAME} will not attempt to fulfill the Services purchased by you until {company.DISPLAY_NAME} receives confirmation of payment from the IPP through its associated payment processor.
        You acknowledge there may be a gap of several hours or days between the time you place an order and the time the IPP confirms payment through its associated payment processor.
        If {company.DISPLAY_NAME} does not receive confirmation of payment from the IPP through its associated payment processor within thirty (30) days from when the order is placed, your order may be cancelled, at which time you will need to commence the purchase process again. In the event that you would like to cancel payment for a pending transaction, you may cancel the order through your {company.DISPLAY_NAME} account.
        Payments received on previously cancelled orders will be automatically refunded to the original Payment Method when possible.</p>
      <p class="mb-4">
        If, at the time {company.DISPLAY_NAME} receives confirmation of payment from the IPP (through its associated payment processor), either
        (i) the Services (including domain names) are no longer available for purchase; or
        (ii) a pending order has been cancelled in our systems; or
        (iii) the confirmation of payment does not match the dollar amount of the pending order, and as a result your purchase is either over-funded or under-funded, {company.DISPLAY_NAME} may automatically issue a partial refund (in the case of over-funding) or a full refund (in the case of under-funding) to your Funding Source.
        If the IPP (or its associated payment processor) imposes refund limitations of any kind, {company.DISPLAY_NAME} reserves the right to issue refunds to an in-store credit balance.
        If you receive a full refund, you will need to begin the purchase process again. You acknowledge and agree that the IPP reserves the right not to refund IPP Fees associated with a refunded transaction. Accordingly, any refunds issued by {company.DISPLAY_NAME} will be net of the IPP Fees unless otherwise specified.
      </p>

      <p class="mb-4"><strong>(D) IN-STORE CREDIT BALANCES</strong></p>

      <p class="mb-4">In the event that your Account contains an in-store credit balance, you may apply any available credit balance to any future purchase in your Account. In the event that your Account contains an in-store credit balance, you hereby authorize {company.DISPLAY_NAME} to apply any available credit balance to any outstanding administrative fees, chargebacks or other fees related to your Account. In the event that your default Payment Method fails for an automated billing in connection with the processing of any Service renewals, {company.DISPLAY_NAME} may utilize any available in-store credit balance if there are enough funds to cover the entire transaction. Regardless of the amount of in-store credit available in your account,&nbsp;{company.DISPLAY_NAME} is not responsible for the loss of products resulting from an inability to collect funds from your default Payment Methods or the in-store credit. In-store credits will be applied based on the currency selected in the shopping cart at the time of purchase (or renewal). If you have more than one in-store credit, then the credits will be processed according to the age of the credit, with the oldest in-store credit being applied first. If additional funds are required to complete the purchase or renewal, credits held in a non-selected currency will be converted using&nbsp;{company.DISPLAY_NAME}’s&nbsp;daily exchange rate based on the age of the credit (oldest to newest) until (i) enough funds are allocated to complete the transaction, or (ii) there is no available balance left in your account. You understand and agree that at the time of conversion, {company.DISPLAY_NAME} may also impose an additional administrative fee to compensate for the risks and costs associated with providing currency conversion services.</p>
      <p class="mb-4">You can verify your available in-store credit balance at any time by logging into “Manage Your Account” or through the shopping cart on the {company.DISPLAY_NAME} website. You acknowledge that in-store credit balances are non-transferrable, may only be used in the Account in which they were acquired and may expire. Complimentary in-store credits will expire two years after issuance. In the event that {company.DISPLAY_NAME} terminates your Account, you acknowledge and agree that any remaining available in-store credit balance will be forfeited.</p>
      <p class="mb-4">You also acknowledge that funds available in your in-store credit balance will be held by {company.DISPLAY_NAME} and will not accrue or pay interest for your behalf. To the extent any interest may accrue, you understand and agree that {company.DISPLAY_NAME} shall be entitled to receive and keep any such amounts to cover costs associated with supporting the in-store credit balance functionality.</p>

      <p class="mb-4"><strong>(E) Cryptocurrencies, tokens and digital assets</strong></p>
      <p class="mb-4">Unless stated otherwise, following words refer to blockchain-based software ledger data entries: "digital asset", "asset", "coin", "cryptocurrency", "ledger entry", "altcoin" and "token".</p>
      <p class="mb-4">
        {company.DISPLAY_NAME}&nbsp;offers a variety of cryptocurrencies, tokens and digital assets payment options through a Cryptocurrency Payment Provider (“CPP”).
        In the event you select a CPP, you represent that you have already agreed to any and all of the CPP’s applicable customer service agreements in advance of completing your transaction at&nbsp;{company.DISPLAY_NAME}.
        If applicable, an “Exchange Rate Conversion Fee”, as well as "Transaction Fee" and any other fees or charges applicable to your agreement with the CPP (collectively, the “CPP Fees”), from your Funding Sources.
        You understand and agree that CPP Fees are subject to change at any time by the CPP without notice to you by&nbsp;{company.DISPLAY_NAME}.
      </p>

      <p class="mb-6">
        You acknowledge and agree that
        (i) the CPP reserves the right to decline a transaction for any reason (including, but not limited to, payments that fail to go through). In such event, neither&nbsp;the CPP nor {company.DISPLAY_NAME} shall be liable to you or any third party regarding the same.
        You acknowledge that {company.DISPLAY_NAME} will not attempt to fulfill the Services purchased by you until {company.DISPLAY_NAME} receives confirmation of payment from the IPP through its associated payment processor.
        You acknowledge there may be a gap of several hours or days between the time you place an order and the time the CPP confirms payment through its associated payment processor.
        If {company.DISPLAY_NAME} does not receive confirmation of payment from the CPP through its associated payment processor within thirty (30) days from when the order is placed, your order may be cancelled, at which time you will need to commence the purchase process again.&nbsp;
      </p>

      <h3 class="text-2xl mb-4">18. SUCCESSORS AND ASSIGNS</h3>
      <p class="mb-6">This Agreement shall be binding upon and inure to the benefit of the parties hereto and their respective heirs, successors and assigns.</p>

      <h3 class="text-2xl mb-4">19. NO THIRD-PARTY BENEFICIARIES</h3>
      <p class="mb-6">Nothing in this Agreement shall be deemed to confer any third-party rights or benefits.</p>

      <h3 class="text-2xl mb-4">20. COMPLIANCE WITH LOCAL LAWS</h3>
      <p class="mb-6">{company.DISPLAY_NAME}&nbsp;makes no representation or warranty that the&nbsp;content available on this Site or the Services found at this Site are appropriate in every country or jurisdiction, and access to this Site or the Services found at this Site from countries or jurisdictions where its content is illegal is prohibited. Users who choose to access this Site or the Services found at this Site are responsible for compliance with all local laws, rules and regulations.</p>

      <h3 class="text-2xl mb-4">21. GOVERNING LAW; JURISDICTION; VENUE; WAIVER OF TRIAL BY JURY</h3>
      <p class="mb-6">
        Except for disputes governed by the Uniform Domain Name Dispute Resolution Policy referenced above and available&nbsp;<a href="https://www.rentakloud.com/domain-name-dispute-resolution">here</a>, this Agreement shall be governed by and construed in accordance with&nbsp;the federal law of the Cyprus.&nbsp;You agree to waive the right to trial by jury in any action or proceeding that takes place relating to or arising out of this Agreement.
      </p>

      <h3 class="text-2xl mb-4">22. TITLES AND HEADINGS; INDEPENDENT COVENANTS; SEVERABILITY</h3>
      <p class="mb-6">
        The titles and headings of this Agreement are for convenience and ease of reference only and shall not be utilized in any way to construe or interpret the agreement of the parties as otherwise set forth herein.
        Each covenant and agreement in this Agreement shall be construed for all purposes to be a separate and independent covenant or agreement.
        If a court of competent jurisdiction holds any provision (or portion of a provision) of this Agreement to be illegal, invalid, or otherwise unenforceable,
        the remaining provisions (or portions of provisions) of this Agreement shall not be affected thereby and shall be found to be valid and enforceable to the fullest extent permitted by law.
      </p>

      <h3 class="text-2xl mb-4">23. CONTACT INFORMATION</h3>
      <p class="mb-4">If you have any questions about this Agreement, please contact us by email or regular mail at the following address:</p>

      <p><em>Attention to</em>: {company.LEGAL_NAME}</p>
      <p>{company.ADDRESS_USA}</p>
      <p class="mb-6"><a href="mailto:compliance@rentakloud.com">compliance@rentakloud.com</a></p>
    </LegalLayout>
  )
}

export default TermsOfService