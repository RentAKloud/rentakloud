import { Component } from "solid-js";
import DefaultLayout from "~/layouts/DefaultLayout";
import { company } from "~/config/constants";

const CookiePolicy: Component = () => {
  return (
    <DefaultLayout>
      <style>
        {`
        #document h3 {
          margin-bottom: 1.0rem;
          margin-top: 2.25rem;
          font-size: 1.5rem;
          line-height: 2rem;
        }
        #document p {
          margin-bottom: 1.25rem;
        }
        #document ul {
          list-style: disc;
          padding-left: 2.25rem;
          margin-bottom: 1.25rem;
        }
        #document table {
          margin-bottom: 1.25rem;
        }
        `}
      </style>

      <section class="flex flex-col h-96 place-content-center">
        <h1 class="text-5xl text-center mb-4">Cookie Policy</h1>
        <p class="text-center">Please read this agreement carefully, as it contains important information regarding your legal rights and remedies.</p>
      </section>

      <div class="flex m-10">
        <aside class="w-96 hidden lg:block">
          Sidebar
        </aside>

        <section class="mx-10 w-fit">
          <div id="document">
            <div class="p-20">
              <p class="alert alert-info">
                The English version of legal agreements and policies is
                considered as the only current and valid version of this
                document. Any translated version is provided for your
                convenience only, to facilitate reading and understanding of the
                English version. Any translated versions are not legally binding
                and cannot replace the English versions. In the event of
                disagreement or conflict, the English language legal agreements
                and policies shall prevail.
              </p>
            </div>

            <p class="text-h-gray pt-30">
              Last Revised: 2022-10-12 14:45:08
            </p>

            <div class="document-content">
              <p>
                {company.DISPLAY_NAME} International Limited, legal entity code {company.LEGAL_ENTITY_CODE}, registered
                address {company.ADDRESS_USA} (hereinafter referred to as the&nbsp;“Company,”&nbsp;or
                “we”), shall undertake to ensure the security of personal information and
                the protection of rights of the visitors of the website (hereinafter
                referred to as the&nbsp;“Visitors”) while you use {company.DISPLAY_NAME} group websites
                including but not limited to &nbsp;
                <a class="link" href="https://www.rentakloud.com/">www.rentakloud.com</a>, &nbsp;
                <a class="link" href="https://www.hosting22.com/">www.hosting22.com</a>, &nbsp;
                <a class="link" href="https://www.33webhost.com/">www.33webhost.com</a>, &nbsp;
                <a class="link" href="https://www.hostmania.pk/">www.hostmania.pk</a>
                &nbsp;&nbsp;(hereinafter referred to as the&nbsp;“Website”) and the content
                of it.
              </p>
              <p>
                First and foremost,&nbsp;we DO NOT sell your personal information. However,
                when you visit or interact with our sites, services, applications, tools or
                messaging, we or our authorized service providers may use cookies, web
                beacons, and other similar technologies to make your experience better,
                faster and safer, for advertising purposes and to allow us to continuously
                improve our sites, services, applications and tools.
              </p>
              <h3>1. GENERAL INFORMATION ABOUT COOKIES</h3>
              <p>
                We use the cookies on our Website, to customize the functioning of our
                Website as much as possible, and can contribute to ease of use when
                navigating our Website.
              </p>
              <p>What is a cookie?</p>
              <p>
                A cookie is a small file placed onto your device that enables our Website
                features and functionality. For example, cookies enable us to identify your
                device, secure your access to the Website. They enable the Website to store
                the data, such as:
              </p>
              <ul>
                <li>
                  <p>
                    Login data (IP address of the logging-in device, login time, location
                    from which the login is attempted);
                  </p>
                </li>
                <li>
                  <p>Type of browser;</p>
                </li>
                <li>
                  <p>Demographic data (age group, sex);</p>
                </li>
                <li>
                  <p>
                    Data about the fact how you browse the Website (which sections you
                    visit, what products are you interested in).
                  </p>
                </li>
              </ul>
              <p>Objectives, aims</p>
              <p>We use the cookies to:</p>
              <ul>
                <li>
                  <p>
                    Ensure efficient and safe functioning of the Website; we use cookies to
                    enable and support our security features, and to help us detect
                    malicious activity on our Website;
                  </p>
                </li>
                <li>
                  <p>
                    Understand, improve, and research products, features, and services,
                    including when you access our Website from other websites, applications,
                    or devices such as your work computer or your mobile device;
                  </p>
                </li>
                <li>
                  <p>
                    Recognize the returning visitors of the Website; cookies help us show
                    you the right information and personalize your experience; cookies also
                    help avoiding re-registration or re-filling of the information by you
                    each time you visit the Website;
                  </p>
                </li>
                <li>
                  <p>
                    Analyse your habits so that the functioning of the Website would be
                    convenient, efficient and would conform to your needs and expectations,
                    for example, by ensuring that the Visitors would, without difficulty,
                    find everything they are looking for;
                  </p>
                </li>
                <li>
                  <p>
                    Measure the flows of the information and data being sent to our Website;
                    we use the cookies for accumulation of statistical data about the number
                    of users of the Website and their use of the Website;
                  </p>
                </li>
                <li>
                  <p>
                    Targeting and advertising; by using the cookies we may collect
                    information so that only relevant content is displayed for the browser
                    by creating different target groups; we may use cookies to show you
                    relevant advertising both on and off our Website.
                  </p>
                </li>
              </ul>
              <p>
                We may, to the extent allowed by applicable laws, link the data, received
                from the cookies, with other information obtained about you from other legal
                sources (i.e., information about the use of the services, online account,
                our Loyalty program, etc.).
              </p>
              <h3>2. COOKIES USED ON THE WEBSITE</h3>
              <p>
                Each time you visit our Website, the long-term (persistent) cookies may be
                created, which stay in your browser after you sign-up and will be read by us
                when you return to our Website or a partner site that uses our services, and
                not deleted after you finish browsing our Website, and the short-term
                (session) cookies, which expire or are deleted after you finish browsing our
                Website (i.e., they usually last during the current visit to our Website or
                browsing session).
              </p>
              <p>
                Many web browsers allow you to manage your preferences. You can set your
                browser to refuse cookies or delete certain cookies. You may be able to
                manage other technologies in the same way that you manage cookies using your
                browser's preferences.
              </p>
              <p>
                However, we note that the necessary cookies, as specified below, are
                necessary for functioning of our Website, and in case of your objections, we
                will not be sure about functioning of the Website or any of its portions or
                functionalities.
              </p>
              <p>
                We recite below the main types of cookies used on the Website according to
                their types, collected data, and duration of storage.
              </p>
              <p>
                <strong>2.1. Cookies used by the Company</strong>
              </p>
              <p>Strictly necessary cookies</p>
              <p>
                These cookies are required for the operation of our Website. They include,
                for example, cookies that enable storage of information filled by you during
                the browsing session, enable you to log into secure areas of our Website.
                Without these cookies operation of the Website would be impossible or its
                functioning may be severely affected.
              </p>
              <p>Preferences / functional cookies</p>
              <p>
                These improve the functional performance of our Website and make it easier
                for you to use. These cookies remember the settings selected by the Visitors
                (for example, the settings of language and time zone). With the use of these
                cookies, the Visitors may avoid the changes of settings during each visit of
                the Website. These cookies also remember changes made by you in the Website
                (for example, in case you leave comment on the Website). These cookies do
                not track your behavior in other websites.
              </p>
              <p>Analytical / performance cookies</p>
              <p>
                These cookies show us if the Visitor has visited our Website before. The
                analytic cookies allow us to recognize and count the number of users of our
                website and see how such users navigate through our Website. We also use
                cookies to understand, improve, and research products, features, and
                services. For instance, analytical cookies may show us, which websites are
                visited more frequently, help us to record dysfunctionalities of the
                Website, etc.
              </p>
              <p>Marketing, targeting and advertising cookies</p>
              <p>
                These cookies record your visit to our website, the pages you have visited
                and the links you have followed. We will then use this information to make
                advertising displayed on it more relevant to your interests. The advertising
                cookies let us know whether you have already seen the specific advertisement
                or a certain type of advertisement, and how much time has elapsed since you
                saw it. We may use the cookies set by another entity so that we could
                provide the advertisement oriented more specifically to you. They are also
                used so that we could see the certain advertisements only a certain number
                of times and that it would help to measure the efficiency of advertising.
              </p>
              <p>
                <strong>2.2. Third-party cookies</strong>
              </p>
              <p>
                Advertising cookies&nbsp;- some ads you can see on our Website have been
                provided by other legal entities. Some of these entities use their own
                cookies by analysing how many people have seen the specific advertisement or
                how many people have seen it more than once. The companies creating such
                cookies apply the policies prepared by themselves and we have no influence
                on the creation or storage of such cookies. We recommend you to take a
                separate interest in the Privacy Policy or the Cookie Policy of those
                companies, which will be placed on their websites.
              </p>
              <p>
                Other third-party cookies&nbsp;- in some web pages of our Website, the other
                entities (for example, social networks) may also use their own anonymous
                cookies designed so that the programs or applications developed by them
                would suit your needs. Due to the specific features of the functioning of
                the cookies, our Website does not have access to the information transmitted
                by these cookies, likewise other entities do not have access to the
                information collected by the cookies set by us.
              </p>
              <p>Such other type of third-party cookies used on our Website may include:</p>
              <p>Necessary cookies:</p>
              <ul>
                <li>
                  <p>hasoffers_session (60 days)</p>
                </li>
                <li>
                  <p>intercom-id-* (90 days)</p>
                </li>
                <li>
                  <p>intercom-session-* (90 days)</p>
                </li>
              </ul>
              <p>Functional cookies:</p>
              <ul>
                <li>
                  <p>"Google"</p>
                </li>
                <li>
                  <p>"Facebook"</p>
                </li>
              </ul>
              <p>Analytical cookies:</p>
              <p>"Google Analytics":</p>
              <ul>
                <li>
                  <p>utm_campaign (30 days)</p>
                </li>
                <li>
                  <p>utm_medium (30 days)</p>
                </li>
                <li>
                  <p>utm_source (30 days)</p>
                </li>
                <li>
                  <p>utm_data (rentakloud cookie for Google Analytics data – 30 days)</p>
                </li>
              </ul>
              <p>&nbsp;</p>
              <p>
                We use Google Analytics, a web analysis service provided by Google, Inc
                (hereinafter referred to as "Google"). The information collected by Google
                Analytics is transmitted to and stored with Google. Google may transmit the
                information collected by Google Analytics to the third parties as required
                by the law or when those third parties process the information in the name
                of Google.
              </p>
              <p>
                We recommend consulting the Google Privacy and Cookies Policy on a separate
                and regular basis.
              </p>
              <p>Marketing, targeting and advertising cookies:</p>
              <ul>
                <li>
                  <p>"Adwords retargeting"</p>
                </li>
                <li>
                  <p>"Facebook retargeting"</p>
                </li>
              </ul>
              <p>All information about the cookies used by us is recorded below:</p>
              <table class="table bg-base-100">
                <tbody>
                  <tr>
                    <td>
                      <p>Name of the cookie</p>
                    </td>
                    <td>
                      <p>Provider/ Description&nbsp;</p>
                    </td>
                    <td>
                      <p>Moment of creation</p>
                    </td>
                    <td>
                      <p>Duration</p>
                    </td>
                    <td>
                      <p>Purpose/ Data collected</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>cart-*&nbsp;</p>
                    </td>
                    <td rowspan="7">
                      <p>Our own system functional cookies</p>
                    </td>
                    <td rowspan="7">
                      <p>Entering the website</p>
                    </td>
                    <td>
                      <p>&nbsp;30 days</p>
                    </td>
                    <td rowspan="7">
                      <p>
                        Used to identify if user came from our free portal, what is added to
                        the cart, check if user is logged in or not, saves coupon in order
                        to apply at the checkout.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>client_view&nbsp;</p>
                    </td>
                    <td>
                      <p>30 days</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>progress_bar</p>
                    </td>
                    <td>
                      <p>7 days</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>coupon_cookie</p>
                    </td>
                    <td>
                      <p>30 days</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>000user_id&nbsp;</p>
                    </td>
                    <td>
                      <p>1 day</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>cookie_consent</p>
                    </td>
                    <td>
                      <p>365 days</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>offer-popup-closed&nbsp;</p>
                    </td>
                    <td>
                      <p>1 day</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_cfduid</p>
                    </td>
                    <td>
                      <p>Claudflare</p>
                    </td>
                    <td>
                      <p>Entering the website</p>
                    </td>
                    <td>
                      <p>30 days</p>
                    </td>
                    <td>
                      <p>
                        Used to identify trusted web traffic. The _cfduid cookie collects
                        and anonymizes End User IP addresses using a one-way hash of certain
                        values so they cannot be personally identified.&nbsp;
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>SNC&nbsp;</p>
                    </td>
                    <td>
                      <p>Sleeknote</p>
                    </td>
                    <td>
                      <p>Logging into hPanel</p>
                    </td>
                    <td>
                      <p>1 year</p>
                    </td>
                    <td>
                      <p>
                        Contains data for us of conditions, how often a snapshot is
                        displayed, references, queries to look for, etc.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>SNS&nbsp;</p>
                    </td>
                    <td>
                      <p>Sleeknote</p>
                    </td>
                    <td>
                      <p>Logging into hPanel</p>
                    </td>
                    <td>
                      <p>
                        Until closing
                        <br />
                        the web page
                      </p>
                    </td>
                    <td>
                      <p>
                        Activation of Sleeknote session (Used for newsletter sign-up form)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>__cflb</p>
                    </td>
                    <td>
                      <p>Cloudflare</p>
                    </td>
                    <td>
                      <p>Logging into hPanel</p>
                    </td>
                    <td>
                      <p>1 hour</p>
                    </td>
                    <td>
                      <p>
                        We use Cloudflare cookies as part of our website security, and to
                        distribute our incoming network traffic across our servers to
                        optimise our website’s performance to our users.&nbsp;
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>tokenSet</p>
                    </td>
                    <td>
                      <p>Session cookie</p>
                    </td>
                    <td>
                      <p>Logging into hPanel</p>
                    </td>
                    <td>
                      <p>
                        Until closing
                        <br />
                        the web page
                      </p>
                    </td>
                    <td>
                      <p>
                        We use session token for authentication. Date of the time session
                        token was set.&nbsp;
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>1P_JAR</p>
                    </td>
                    <td>
                      <p>Google</p>
                    </td>
                    <td>
                      <p>Logging into hPanel</p>
                    </td>
                    <td>
                      <p>19 days</p>
                    </td>
                    <td>
                      <p>
                        Set by Google. This group sets a unique ID to remember your
                        preferences and other information such as website statistics and
                        track conversion rates
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>language</p>
                    </td>
                    <td>
                      <p>Our own system cookie</p>
                    </td>
                    <td>
                      <p>Logging into hPanel</p>
                    </td>
                    <td>
                      <p>1 year</p>
                    </td>
                    <td>
                      <p>Sets panels language</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_ga</p>
                    </td>
                    <td>
                      <p>Google</p>
                    </td>
                    <td>
                      <p>Logging into hPanel</p>
                    </td>
                    <td>
                      <p>2 years</p>
                    </td>
                    <td>
                      <p>
                        This cookie is set by Google Analytics used to distinguish users
                        (unique identifier)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>special24</p>
                    </td>
                    <td>
                      <p>Our own system cookie</p>
                    </td>
                    <td>
                      <p>
                        Upon login into hPanel when
                        <br />
                        promotion is active
                      </p>
                    </td>
                    <td>
                      <p>5 years</p>
                    </td>
                    <td>
                      <p>Unique identifier</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>nps-panel</p>
                    </td>
                    <td rowspan="2">
                      <p>Net Promoter Score</p>
                    </td>
                    <td rowspan="2">
                      <p>
                        When NPS popup
                        <br />
                        is closed
                      </p>
                    </td>
                    <td>
                      <p>14 days</p>
                    </td>
                    <td rowspan="2">
                      <p>Marks that popup was closed</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>nps-limit</p>
                    </td>
                    <td>
                      <p>1 day</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>SNC&nbsp;</p>
                    </td>
                    <td rowspan="2">
                      <p>Sleeknote</p>
                    </td>
                    <td rowspan="7">
                      <p>Logging into cPanel</p>
                    </td>
                    <td>
                      <p>1 year</p>
                    </td>
                    <td>
                      <p>
                        Contains data for use of conditions, how often a snapshot is
                        displayed, references, queries to look for, etc.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>SNS&nbsp;</p>
                    </td>
                    <td rowspan="3">
                      <p>
                        Until closing
                        <br />
                        the web page
                      </p>
                    </td>
                    <td>
                      <p>
                        Activation of Sleeknote session (Used for newsletter sign-up form)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>notifications_update</p>
                    </td>
                    <td rowspan="11">
                      <p>
                        Our own
                        <br />
                        system cookie
                      </p>
                    </td>
                    <td>
                      <p>
                        Updates the last time notifications
                        <br />
                        were seen
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>notifications_unread</p>
                    </td>
                    <td>
                      <p>
                        Amount of
                        <br />
                        unread notifications
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>hg_theme</p>
                    </td>
                    <td rowspan="2">
                      <p>2 Hours</p>
                    </td>
                    <td>
                      <p>Sets color theme</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>hg_lang</p>
                    </td>
                    <td>
                      <p>Contains language for the user&nbsp;</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>PHPSESSID</p>
                    </td>
                    <td>
                      <p>
                        Until closing
                        <br />
                        the web page
                      </p>
                    </td>
                    <td>
                      <p>
                        Unique identifier
                        <br />
                        Necessary &amp; standard
                        <br />
                        cookie for upholding
                        <br />
                        the session
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>xyz-promo</p>
                    </td>
                    <td rowspan="3">
                      <p>
                        Logging into cPanel
                        <br />
                        when promo is active
                      </p>
                    </td>
                    <td rowspan="3">
                      <p>
                        Until closing
                        <br />
                        the web page
                      </p>
                    </td>
                    <td rowspan="3">
                      <p>
                        Value indicating if promotional
                        <br />
                        popup was shown
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>skip-xyz-promo</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>upgrade-popup</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>email</p>
                    </td>
                    <td>
                      <p>Logging into cPanel</p>
                    </td>
                    <td>
                      <p>2 years</p>
                    </td>
                    <td>
                      <p>Client's login email</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>onboarding_start</p>
                    </td>
                    <td>
                      <p>Start of onboarding</p>
                    </td>
                    <td>
                      <p>1 day</p>
                    </td>
                    <td>
                      <p>
                        Value indicating if user
                        <br />
                        has started onboarding process
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>delegate_access_hash</p>
                    </td>
                    <td>
                      <p>
                        Access granted
                        <br />
                        via access manager&nbsp;
                      </p>
                    </td>
                    <td>
                      <p>2 days</p>
                    </td>
                    <td>
                      <p>Unique identifier</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>campaign</p>
                    </td>
                    <td>
                      <p>Our own system cookie</p>
                    </td>
                    <td>
                      <p>Logging into cPanel</p>
                    </td>
                    <td>
                      <p>30 days</p>
                    </td>
                    <td>
                      <p>Sets promotional campaign</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>setup_flow</p>
                    </td>
                    <td>
                      <p>Our own system cookie</p>
                    </td>
                    <td>
                      <p>
                        After logging into cPanel
                        <br />
                        during order setup
                      </p>
                    </td>
                    <td>
                      <p>2 hours</p>
                    </td>
                    <td>
                      <p>
                        Value indicating if user
                        <br />
                        has started order setup process
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>askUserDescriptionForm</p>
                    </td>
                    <td>
                      <p>Our own system cookie</p>
                    </td>
                    <td>
                      <p>
                        After logging into cPanel
                        <br />
                        and answering survey
                      </p>
                    </td>
                    <td>
                      <p>3 days</p>
                    </td>
                    <td>
                      <p>Value indicating that user has seen survey</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>__cflb</p>
                    </td>
                    <td>
                      <p>Cloudflare</p>
                    </td>
                    <td>
                      <p>Logging into cPanel</p>
                    </td>
                    <td>
                      <p>1 day</p>
                    </td>
                    <td>
                      <p>
                        We use Cloudflare cookies as part
                        <br />
                        of our website security, and to distribute our incoming network
                        traffic across our servers to optimise our website’s performance to
                        our users.&nbsp;
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Intercom</p>
                    </td>
                    <td>
                      <p>Intercom support software</p>
                    </td>
                    <td>
                      <p>Logging into members area</p>
                    </td>
                    <td>
                      <p>90 days</p>
                    </td>
                    <td>
                      <p>Used to identify user, log him into the intercom widget</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Google DoubleClick</p>
                    </td>
                    <td>
                      <p>Google Marketing campaign cookie</p>
                    </td>
                    <td>
                      <p>Entering the website</p>
                    </td>
                    <td>
                      <p>30 days</p>
                    </td>
                    <td>
                      <p>
                        Used to measure the effectiveness of its online marketing campaigns
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Google Analytics</p>
                    </td>
                    <td>
                      <p>Google Web&nbsp;Analytics&nbsp;</p>
                    </td>
                    <td>
                      <p>Entering the website</p>
                    </td>
                    <td>
                      <p>90 days</p>
                    </td>
                    <td>
                      <p>
                        Google Analytics sets a cookie in order to evaluate use of our
                        services and compile a report for us
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Facebook</p>
                    </td>
                    <td>
                      <p>Cookies added by Facebook</p>
                    </td>
                    <td>
                      <p>Logging in with Facebook login</p>
                    </td>
                    <td>
                      <p>&nbsp;</p>
                    </td>
                    <td>
                      <p>Used to identify user who logged in using Facebook login.</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Google</p>
                    </td>
                    <td>
                      <p>Cookies added by google login</p>
                    </td>
                    <td>
                      <p>Logging in with Google</p>
                    </td>
                    <td>
                      <p>&nbsp;</p>
                    </td>
                    <td>
                      <p>Used to identify user who used google auth to login / sign up.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                Statistics or analytics cookies help us to understand how our visitors
                interact with websites by collecting and reporting information anonymously:
              </p>
              <table class="table bg-base-100">
                <tbody>
                  <tr>
                    <td>
                      <p>Name of the cookie</p>
                    </td>
                    <td>
                      <p>Provider/ Description&nbsp;</p>
                    </td>
                    <td>
                      <p>Duration</p>
                    </td>
                    <td>
                      <p>Purpose/ Data collected</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_vis_opt_s</p>
                    </td>
                    <td>
                      <p>WVO</p>
                    </td>
                    <td>
                      <p>100 days</p>
                    </td>
                    <td>
                      <p>
                        Tracks sessions created for a user. The number of times the browser
                        was closed and reopened.&nbsp;
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_vis_opt_test_cookie</p>
                    </td>
                    <td>
                      <p>WVO</p>
                    </td>
                    <td>
                      <p>Expires on browser close</p>
                    </td>
                    <td>
                      <p>
                        Session cookie generated to detect if the cookies are enabled on the
                        browser of the user or not. It also helps in tracking the number of
                        browser sessions a visitor has gone through.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_vwo_uuid_v2</p>
                    </td>
                    <td>
                      <p>WVO</p>
                    </td>
                    <td>
                      <p>1 year</p>
                    </td>
                    <td>
                      <p>Calculates Unique Traffic On a website</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_vwo_sn</p>
                    </td>
                    <td>
                      <p>WVO</p>
                    </td>
                    <td>
                      <p>30 mins and reset again to 30 mins on user activity.</p>
                    </td>
                    <td>
                      <p>Stores session-level information</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_hjid</p>
                    </td>
                    <td>
                      <p>Hotjar</p>
                    </td>
                    <td>
                      <p>365 days</p>
                    </td>
                    <td>
                      <p>
                        It is used to persist the Hotjar User ID, unique to that site on the
                        browser. This ensures that behavior in subsequent visits to the same
                        site will be attributed to the same user ID.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_hjTLDTest</p>
                    </td>
                    <td>
                      <p>Hotjar</p>
                    </td>
                    <td>
                      <p>Session</p>
                    </td>
                    <td>
                      <p>
                        When the Hotjar script executes we try to determine the most generic
                        cookie path we should use, instead of the page hostname. This is
                        done so that cookies can be shared across subdomains (where
                        applicable). To determine this, we try to store the _hjTLDTest
                        cookie for different URL substring alternatives until it fails.
                        After this check, the cookie is removed.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_hjAbsoluteSessionInProgress</p>
                    </td>
                    <td>
                      <p>Hotjar</p>
                    </td>
                    <td>
                      <p>30 Minutes</p>
                    </td>
                    <td>
                      <p>
                        This cookie is used to detect the first pageview session of a user.
                        This is a True/False flag set by the cookie.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_hjIncludedInSessionSample</p>
                    </td>
                    <td>
                      <p>Hotjar</p>
                    </td>
                    <td>
                      <p>30 Minutes</p>
                    </td>
                    <td>
                      <p>
                        This cookie is set to let Hotjar know whether that visitor is
                        included in the data sampling defined by your site's daily session
                        limit.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>JSESSIONID</p>
                    </td>
                    <td>
                      <p>New Relic Non-Essential Cookies</p>
                    </td>
                    <td>
                      <p>Session</p>
                    </td>
                    <td>
                      <p>
                        New Relic cookie which is used to monitor session counts for an
                        application&nbsp;
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_gid</p>
                    </td>
                    <td>
                      <p>Google Analytics</p>
                    </td>
                    <td>
                      <p>1 Day</p>
                    </td>
                    <td>
                      <p>
                        This cookie is set by Google Analytics used to distinguish
                        users&nbsp;
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_gat</p>
                    </td>
                    <td>
                      <p>Google Analytics</p>
                    </td>
                    <td>
                      <p>1 minute</p>
                    </td>
                    <td>
                      <p>Used to throttle request rate</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_gaexp</p>
                    </td>
                    <td>
                      <p>Google Analytics</p>
                    </td>
                    <td>
                      <p>90 days (typically, depends on experiment length)</p>
                    </td>
                    <td>
                      <p>
                        This cookie is set by Google Analytics used to determine a user's
                        inclusion in an experiment and the expiry of experiments a user has
                        been included in.&nbsp;
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>&nbsp;</p>
              <p>
                Marketing or advertising cookies are used to track visitors across websites.
                The intention is to display ads that are relevant and engaging for the
                individual user and herby more valuable for publishers and advertisers
              </p>
              <table class="table bg-base-100">
                <tbody>
                  <tr>
                    <td>
                      <p>Name of the cookie</p>
                    </td>
                    <td>
                      <p>Provider/ Description&nbsp;</p>
                    </td>
                    <td>
                      <p>Duration</p>
                    </td>
                    <td>
                      <p>Purpose/ Data collected</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_gcl_au</p>
                    </td>
                    <td>
                      <p>Google Analytics</p>
                    </td>
                    <td>
                      <p>3 months</p>
                    </td>
                    <td>
                      <p>
                        This cookie is set by Google Analytics to take information in advert
                        clicks and store it in a 1st party cookie so that conversions can be
                        attributed outside of the landing page.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>test_cookie</p>
                    </td>
                    <td>
                      <p>Google</p>
                    </td>
                    <td>
                      <p>1 day</p>
                    </td>
                    <td>
                      <p>
                        This cookie is set by Google used to check if the user's browser
                        supports cookies.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>pagead/1p-user-list/#</p>
                    </td>
                    <td>
                      <p>Google</p>
                    </td>
                    <td>
                      <p>Session</p>
                    </td>
                    <td>
                      <p>
                        Used by DoubleClick to determine whether website advertisement has
                        been properly displayed in order to make marketing more efficient.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_uetsit</p>
                    </td>
                    <td>
                      <p>Google Tag Manager</p>
                    </td>
                    <td>
                      <p>Persistent</p>
                    </td>
                    <td>
                      <p>
                        Used to track visitors on multiple websites, in order to present
                        relevant advertisement based on the visitor's preferences.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_uetsit</p>
                    </td>
                    <td>
                      <p>Google Tag Manager</p>
                    </td>
                    <td>
                      <p>1 day</p>
                    </td>
                    <td>
                      <p>
                        Collects data on visitor behavior from multiple websites, in order
                        to present more relevant advertisement. This also allows the website
                        to limit the number of times that they are shown the same
                        advertisement.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_uetsit_exp</p>
                    </td>
                    <td>
                      <p>Google Tag Manager</p>
                    </td>
                    <td>
                      <p>Persistent</p>
                    </td>
                    <td>
                      <p>
                        Contains the expiry-date for the cookie with corresponding name.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>ads/ga-audiences</p>
                    </td>
                    <td>
                      <p>Google</p>
                    </td>
                    <td>
                      <p>Session</p>
                    </td>
                    <td>
                      <p>
                        Used by Google AdWords to re-engage visitors that are likely to
                        convert to customers based on the visitor's online behaviour across
                        websites.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_fbp</p>
                    </td>
                    <td>
                      <p>Facebook</p>
                    </td>
                    <td>
                      <p>3 moths</p>
                    </td>
                    <td>
                      <p>
                        Used by Facebook to deliver a series of advertisement products such
                        as real time bidding from third party advertisers.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>fr</p>
                    </td>
                    <td>
                      <p>Facebook</p>
                    </td>
                    <td>
                      <p>3 moths</p>
                    </td>
                    <td>
                      <p>
                        Used by Facebook to deliver a series of advertisement products such
                        as real time bidding from third party advertisers.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>tr</p>
                    </td>
                    <td>
                      <p>Facebook</p>
                    </td>
                    <td>
                      <p>Session</p>
                    </td>
                    <td>
                      <p>
                        Used by Facebook to deliver a series of advertisement products such
                        as real time bidding from third party advertisers.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>MUID (Microsoft User ID)</p>
                    </td>
                    <td>
                      <p>Microsoft</p>
                    </td>
                    <td>
                      <p>1 year</p>
                    </td>
                    <td>
                      <p>
                        This cookie is set by Microsoft as a unique user ID. The cookie
                        enables user tracking by synchronising the ID across many Microsoft
                        domains.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_uetvid</p>
                    </td>
                    <td>
                      <p>Microsoft Bing Ads</p>
                    </td>
                    <td>
                      <p>16 days</p>
                    </td>
                    <td>
                      <p>
                        This is a cookie utilised by Microsoft Bing Ads and is a tracking
                        cookie. It allows us to engage with a user that has previously
                        visited our website.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>_uetvid_exp</p>
                    </td>
                    <td>
                      <p>Microsoft Bing Ads</p>
                    </td>
                    <td>
                      <p>Persistent</p>
                    </td>
                    <td>
                      <p>Unclassified</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>&nbsp;</p>
              <h3>3. REFUSAL&nbsp;OR BLOCKING THE COOKIES</h3>
              <p>
                Many web browsers are set so that they would automatically accept cookies.
                The Visitors may, at their discretion, block or delete cookies and similar
                unique identifiers, if the settings of their browser or device enable them
                to do so. Nevertheless, if you refuse or block the cookies or other similar
                technologies, some functions of the Website may be inaccessible to you or
                they may operate not so efficiently.
              </p>
              <p>
                Nevertheless, we draw your attention that necessary cookies are necessary
                for functioning of our Website, and in case of your objections, we will not
                be sure about functioning of the Website.
              </p>
              <p>
                You may require that we delete all the data about you, as collected and
                processed with the help of the cookies, by contacting to the email
                address&nbsp;<a class="link" href="mailto:gdpr@rentakloud.com">gdpr@rentakloud.com</a>.
                Such data will be deleted not later than within 28 days after contacting to
                the above-mentioned email address.
              </p>
              <p>
                You can opt out of Google Analytics without affecting how you visit our
                site. For more information on opting out of being tracked by Google
                Analytics across all websites you use, visit this Google page: &nbsp;
                <a class="link" href="https://tools.google.com/dlpage/gaoptout">
                  https://tools.google.com/dlpage/gaoptout
                </a>
                .
              </p>
              <p>
                You may find more information about how to delete cookies, as well as the
                other useful information related to the use of the cookies, on the
                website&nbsp;
                <a class="link" href="https://www.allaboutcookies.org/">
                  https://www.allaboutcookies.org/
                </a>
                .
              </p>
              <h3>4. GENERAL</h3>
              <p>This Cookie Policy may be updated by the Company.</p>
              <p>
                The Company will inform the Visitors about the updates, by providing the new
                version of the Cookie Policy. For this reason, we recommend that you
                periodically visit our Website, where you will always find the latest
                version of this Cookie Policy.
              </p>
              <p>
                This Cookie Policy shall be applied from the date of announcement of it on
                the Website.
              </p>
              <p>&nbsp;</p>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default CookiePolicy;
