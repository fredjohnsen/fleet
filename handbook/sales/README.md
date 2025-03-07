# Sales
This handbook page details processes specific to working [with](#contact-us) and [within](#responsibilities) this department.

## What we do
The Sales department is directly responsible for attaining the revenue goals of Fleet and helping to deliver upon our customers' objectives.


## Team
| Role                                  | Contributor(s)           |
|:--------------------------------------|:------------------------------------------------------------------------------------------------------------------------|
| Chief Revenue Officer (CRO)           | [Alex Mitchell](https://www.linkedin.com/in/alexandercmitchell/) _([@alexmitchelliii](https://github.com/alexmitchelliii))_
| [Customer Success](https://www.fleetdm.com/handbook/customer-success#responsibilities) | [Customer Success team members](https://www.fleetdm.com/handbook/customer-success#team)
| Director of Solutions Consulting      | [Dave Herder](https://www.linkedin.com/in/daveherder/) _([@dherder](https://github.com/dherder))_
| Solutions Consultant (SC)             | [Will Mayhone](https://www.linkedin.com/in/william-mayhone-671977b6/) _([@willmayhone88](https://github.com/willmayhone88))_
| Head of Public Sector                 | [Keith Barnes](https://www.linkedin.com/in/keith-barnes-8b666/) _([@KAB703](https://github.com/KAB703))_
| Account Executive (AE)                | [Tom Ostertag](https://www.linkedin.com/in/tom-ostertag-77212791/) _([@TomOstertag](https://github.com/TomOstertag))_, [Patricia Ambrus](https://www.linkedin.com/in/pambrus/) _([@ambrusps](https://github.com/ambrusps))_,[Anthony Snyder](https://www.linkedin.com/in/anthonysnyder8/) _([@AnthonySnyder8](https://github.com/AnthonySnyder8))_, [Pual Tardif](https://www.linkedin.com/in/paul-t-750833/) _([@phtardif1](https://github.com/phtardif1))
| Sales Development Rep (SDR)           | [Ringo Ringhofer](https://www.linkedin.com/in/tom-ringhofer/) _([@ringoshere](https://github.com/ringoshere))_, [Brad Macdowall](https://www.linkedin.com/in/bradmacdowall/) _([@bradmacd](https://github.com/bradmacd))_

## Contact us
- To make a request of this department, [create an issue](https://github.com/fleetdm/confidential/issues/new?assignees=&labels=%23g-sales&projects=&template=custom-request.md&title=Request%3A+_______________________) and a team member will get back to you within one business day.
  - Any Fleet team member can [view the kanban board](https://app.zenhub.com/workspaces/g-sales-64fbb46c65f9ff003a1530a8/board?sprints=none) for this department, including pending tasks and the status of new requests.
  - Please use issue comments and GitHub mentions to communicate follow-ups or answer questions related to your request.
- If urgent, or if you need help submiting your request, mention a [team member](#team) in the [#g-sales](https://fleetdm.slack.com/archives/C030A767HQV) Slack channel.


## Customer codenames
Occasionally, we will need to track public issues for customers that wish to remain anonymous on our public issue tracker. To do this, we choose an appropriate minor planet name from this [Wikipedia page](https://en.wikipedia.org/wiki/List_of_named_minor_planets_(alphabetical)) and create a label which we attach to the issue and any future issues for this customer.


## Contacting Fleet: customer support service level agreements (SLA's)

### Fleet Free
| Impact Level | Definition | Preferred Contact | Response Time |
|:---|:---|:---|:---|
| All Inquiries | Any request regardless of impact level or severity | Osquery #fleet Slack channel | No guaranteed resolution |

Note: If you're using Fleet Free, you can also access community support by opening an issue in the [Fleet GitHub](https://github.com/fleetdm/fleet/) repository.

### Fleet Premium
| Impact Level | Definition | Preferred Contact | Response Time |
|:-----|:----|:----|:-----|
| Emergency (P0) | Your production instance of Fleet is unavailable or completely unusable. For example, if Fleet is showing 502 errors for all users. | Expedited phone/chat/email support during business hours. </br></br>Email the contact address provided in your Fleet contract or chat with us via your dedicated private Slack channel | **≤4 hours** |
| High (P1) | Fleet is highly degraded with significant business impact. | Expedited phone/chat/email support during business hours. </br></br>Email the contact address provided in your Fleet contract or chat with us via your dedicated private Slack channel | **≤4 business hours** |
| Medium (P2) | Something is preventing normal Fleet operation, and there may or may not be minor business impact. | Standard email/chat support | ≤1 business day | 
| Low (P3) | Questions or clarifications around features, documentation, deployments, or 'how to's'. | Standard email/chat support | 1-2 business days | 

Note: Fleet business hours for support are Monday-Friday, 7AM-4PM Pacific Time, excluding current U.S. federal holidays during which responses may be delayed for Medium and Low impact issues. Fleeties can find Fleet general contact information [here](https://docs.google.com/document/d/1tE-NpNfw1icmU2MjYuBRib0VWBPVAdmq4NiCrpuI0F0/edit).


#### Flow of communication in the event of an emergency (P0) request
![Screen Shot 2022-12-05 at 10 22 43 AM](https://user-images.githubusercontent.com/114112018/205676145-38491aa2-288d-4a6c-a611-a96b5a87a0f0.png)


## Customer support workflow for Slack + Zendesk
This section outlines both the automated workflows and manual triggers associated with Fleet's Slack integration to Zendesk. The purpose of this integration is to:
- Provide Fleet with better service level agreement (SLA) tracking on requests (especially those submitted outside of business hours)
- Better track threads for issues that require advanced troubleshooting
- Consolidate support requests into a single-source, searchable system for faster issue resolution in the future 

There are three different situations when a customer support request could result in a ticket being created in Zendesk. They are as follows: 
1. When a request has been submitted outside of business hours via Slack automation
2. When a Fleet staff member has flagged an issue that requires advanced troubleshooting and determines that they want to move it into Zendesk for management 
3. When any Fleet user submits a support request via email

### Workflow when a request is submitted outside of business hours:
1. A new message is posted in any Slack channel
2. (Zapier filter) The automation will continue if the message is:
    - Not from a Fleet team member
    - Posted outside of Fleet’s business hours
    - In a specific customer channel (manually designated by Customer Success)   
3. (Zendesk) Search for an existing Zendesk ticket by the Slack thread ID or create one if it does not exist.
4. (Slack) If a new Zendesk ticket was created, reply to the Slack message in a thread.
    - Hi @username, it's currently outside Fleet's support hours. (6am - 4pm PT). We've created a support ticket based on your message, and a Fleet team member will respond as soon as possible. If you have more questions or comments, feel free to reply in this thread, and we'll add them to the ticket.
5. (Zendesk) If an existing Zendesk ticket was found by the search, add the Slack message to the existing ticket as a new comment.

![Screen Shot 2022-12-01 at 11 39 54 AM](https://user-images.githubusercontent.com/114112018/205109512-d35f4907-1169-41f5-acab-e23e3506e050.png)
 
- New customer channels that the automation will run in must be configured manually. Submit requests for additions during automation office hours.
- New tickets created from thread replies will contain a link to the slack thread, but will only have the new message. 
- This zap does not support file uploads and attachments. Tickets created for messages with images attached will not have the attachments, and the automation will not run if someone uploads a file without a message. 

<!---

Rituals (out dated 2023-10-19)

The following table lists the Customer's group's rituals, frequency, and Directly Responsible Individual (DRI).

| Ritual                       | Frequency                | Description                                         | DRI               |
|:-----------------------------|:-----------------------------|:----------------------------------------------------|-------------------|
| Overnight customer feedback  | Daily | Check Slack for customer feedback that occurred outside of usual business hours.| Kathy Satterlee       |  
| Customer Slack channel monitoring | Daily | Continuously monitor Slack for customer feedback, feature requests, reported bugs, etc., and respond in less than an hour.   | Kathy Satterlee        |
| Customer follow-up | Daily | Follow-up and tag appropriate personnel for follow-up on customer items in progress and items that remain unresolved. | Kathy Satterlee |
| Internal follow-up | Daily | Go through Fleet's internal Slack channels to check for any relevant new information or tasks from other teams. | Kathy Satterlee |
| [Customer voice](https://docs.google.com/document/d/15Zn6qdm9NyNM7C9kLKtvgMKsuY4Hpgo7lABOBhw7olI/edit?usp=sharing) | Weekly | Prepare and review the health and latest updates from Fleet's key customers and active proof of concepts (POCs), plus other active support items related to community support, community engagement efforts, contact form or chat requests, self-service customers, outages, and more. | Kathy Satterlee  |
| Stand-up | Weekly | Meet with the Engineering team three to four times a week to share information and prioritize issues. | Kathy Satterlee |
| Customer request backlog | Weekly | Check-in before the 🗣️ Product Feature Requests meeting to make sure that all information necessary has been gathered before presenting customer requests and feedback to the Product team. | Kathy Satterlee |
| 🗣️ Product Feature Requests | Weekly | Present and advocate for requests and ideas brought to Fleet's attention by customers that are interesting from a product perspective. | Kathy Satterlee |
| Customer meetings | Weekly | Check-in on how product and company are performing, provide updates on new product features or progress on customer requests.  These are private meetings with one meeting for each individual commercial customer. | Kathy Satterlee |
| Release announcements | Every three weeks | Update customers on new features and resolve issues in an upcoming release. | Kathy Satterlee        |
| Opportunity pipeline review | Weekly | Agenda: Go through every [open opportunity](https://fleetdm.lightning.force.com/lightning/o/Opportunity/list?filterName=00B4x00000CTHZIEA5) and update the next steps, amounts, dates, and status (including choosing Closed Lost if no communications for >= 45 days). | Alex Mitchell
[Salesforce contributor experience checkup](#salesforce-contributor-experience-checkups)| Monthly | Make sure all users see a detailed view of contacts, opportunities, accounts, and leads. | Taylor Hughes |
| Lead pipeline review  | Weekly | Agenda: Review leads by status/stage; make sure SLAs are met. Clean up Open MQL list. Ask CRO if questions. | Alex Mitchell |
| Dripify review | Daily | Review responses to Dripify sequencing, respond to standard messages, escalate urgent messages in `#help-CEO`. | Brad Macdowall


--->



## Responsibilities

### Send a quote
During the buying cycle, the champion will need to start the process to secure funding in cooperation with the economic buyer and the finance org.

All quotes and purchase orders must be approved by CRO before being sent to the prospect or customer. Often, the CRO will request Fleet business operations/legal of any unique terms required.

The Fleet owner of the opportunity (usually AE or CSM) will prepare a quote and/or a Purchase Order when requested.
- Because the champion may need to socialize "what is Fleet" or "what are we getting when buying Fleet," it is most often best to send the quote in [slide form](https://docs.google.com/presentation/d/15kbqm0OYPf1OmmTZvDp4F7VvMERnX4K6TMYqCYNr-wI/edit?usp=sharing).
- Docusign can be used to create a [standard Purchase Order](https://www.loom.com/share/Loom-Message-16-January-2023-2ba8cf195ec645ebabac267d7df59823?sid=214f8c6b-beb3-427a-a3a8-e8c20b5dc350) if no special terms or pricing are needed.

## Obtain a copy of Fleet's W-9
A recent signed copy of Fleet's W-9 form can be found in [this confidential PDF in Google Drive](https://drive.google.com/file/d/1ugXazEBk1oVm_LqGbYNsIFECcv5jXLA9/view?usp=drivesdk).

## Assist with a wire transfer or electronic payment
For customers with hundreds or more hosts, Fleet accepts payment via wire transfer or electronic debit (ACH/SWIFT).

Fleet team members can provide remittance information to customers by exporting ["💸 Paying Fleet"](https://docs.google.com/document/d/1KP_-x9c1x3sS1X9Q8Wlib2H7tq69xRONn1KMA3nVFQc/edit) into a PDF.

### Review rep activity
Following up with people interested in Fleet is an important part of finding out whether or not they'd like to continue the process of buying the product.  It is also very important not to be annoying.  At Fleet, team members follow up with people, but not too often.

To help coach reps and avoid being annoying to Fleet users, Fleet reviews rep activity on a regular basis following these steps:
1. In Salesforce, visit the activity report on your dashboard.  (TODO: taylor will replace this and/or link it)
2. For each rep, review recent activity from the last 30 days across all of that rep's accounts.
3. If outreach is too frequent or doesn't fit the company's strategy, then set up a 30 minute coaching session to discuss with the rep.


### Validate Salesforce data
In order to maintain a consistent contributor experience in Salesforce, we log in to make sure the structure of Salesforce data continues to look correct based on processes started elsewhere. Then we can look and see that the goals we want to achieve as a business are in line with our view inside Salesforce by conducting the following checkup. Any discrepancies between how information is presented in Salesforce and what should be in there per this ritual should be flagged so that they can be fixed or discussed.

1. Make sure the default tabs for a standard user include a detailed view of contacts, opportunities, accounts, and leads. No other tabs should exist.

2. Click the accounts tab and check for the following: 

* The default filter is Customers when you click on the accounts tab. Click on an account to continue.
* Click on a customer and make sure billing address, parent account, LinkedIn company URL, CISO employees (#), employees, and industry appear first at the top of the account. 
* Useful links section should appear in the top right section of the account page. It includes links to purchase orders (POs), signed subscription agreements, invoices sent, meeting notes, and signed NDA. Clicking these links should search the appropriate repository for the requested information pertaining to the customer. All meeting notes should be saved in the [Meeting notes](https://drive.google.com/drive/folders/18e-rVadHG0T5w98OKMngM-yv-K9SXaOq) folder in Google Drive with the account name and date in the title. We do not use the notes feature on "accounts" or "opportunities" in Salesforce. 
* Additional information section should include fields for account (customer) name first, account rating, LinkedIn sales navigator URL, LinkedIn company URL, and my LinkedIn overlaps. Make sure the LinkedIn links work.
* Accounting section should include the following fields: invoice sent (latest), the payment received on (latest), subscription end date (latest), press approval field, license key, total opportunities (#), deals won (#), close date (first deal), cumulative revenue, payment terms, billing address, and shipping address. 
* Opportunities, meeting notes, and activity feed should appear on the right.  

3. Click on the opportunities tab and check for the following:

* Default filter should be all opportunities. Open an opportunity to continue.
* Section at the top of the page should include fields for account name, amount, close date, next step, and opportunity owner.
* Opportunity information section should include fields for account name, opportunity name (should have the year on it), amount, next step, next step's due date, close date, and stage.
* The accounting section here should include: up to # of hosts, type, payment terms, billing process, term, reseller, effective date, subscription end date, invoice sent, and the date payment was received.
* Stage history, activity feed, and LinkedIn sales navigator should appear at the right.  

4. Click on the contacts tab and check for the following:

* Default filter should be all contacts. Open a contact to continue.
* Top section should have fields for the contact's name, job title, department, account name, LinkedIn, and Orbit feed. 
* The second section should have fields for LinkedIn URL, account name, name, title, is champion, and reports to
* Additional information should have fields for email, personal email, Twitter, GitHub, mobile, website, orbit feed, and description.
* Related contacts section should exist at the bottom, activity feed, meeting notes reminder, and manager information should appear on the right. 

5. Click on the leads tab and check for the following:

* Default filter should be all leads. Open a lead to continue.
* There should be fields for name, lead source, lead status, and rating.


### Invite new customer DRI
Sometimes there is a change in the champion within the customer's organization.
1. Get an introduction to the new DRIs including names, roles, contact information.
2. Make sure they're in the Slack channel.
3. Invite them to the *Success* meetings.
4. In the first meeting understand their proficiency level of osquery.
    1. Make sure the meeting time is still convenient for their team. 
    2. Understand their needs and goals for visibility.
    3. Offer training to get them up to speed.
    4. Provide a white glove experience.

### Schedule a customer call
To schedule an [ad hoc meeting](https://www.vocabulary.com/dictionary/ad%20hoc) with a Fleet customer, use the ["Customer meeting" Calendly link](https://calendly.com/fleetdm/customer).
- **Documenting a customer call:** When we do prospect calls, add the customer's name in both the google doc title and the heading, ex. "Charlie (Fleet)."  This makes it easier when searching for the document later. 
- **Before a customer call(48hrs):** Check the calendar invite 48hrs before the meeting to determine if the customer has accepted the invitation.
  - If the customer has not accepted the invitation, reach out to confirm attendance (e.g., EAs, email, Slack).
  - Test the Zoom Meeting link to make sure that it is working.
  - Make sure that agenda documents are attached and accessible to meeting attendees (as appropriate to the situation).
- **Day of the customer call:** Join the meeting two to three minutes before the start time.

- **Missed customer call:** If the customer does not join the call after three minutes, contact the customer with
  - Slack, if we have a shared channel.
  - email, using the email address from the calendar invite.
  - LinkedIn, send a direct message.
  - phone, try finding their number to text and/or call (as appropriate to the device type: landline vs. cell phone).
  - an alternative date and time. Suggest two to three options from which the customer can choose.
    - Confirm that contact information is accurate and that the customer can receive and access meeting invites.

### Create a customer agreement
- **Contract terms:** Fleet's subscription agreement is available at [fleetdm.com/terms](https://fleetdm.com/terms). 
  - **Effective date:** The start date for the subscription service.
  - **Close date:** The date the last party to the contract signed the agreement.
  - **Invoice date:** The date that Fleet sent the invoice to the customer.
- Fleeties can find a summary of contract terms in the relevant [customer's Salesforce opportunity.](https://fleetdm.lightning.force.com/lightning/o/Opportunity/list?filterName=Recent)

- **Standard terms:** For all subscription agreements, NDAs, and similar contracts, Fleet maintains a [standard set of terms and maximum allowable adjustments for those terms](https://docs.google.com/spreadsheets/d/1gAenC948YWG2NwcaVHleUvX0LzS8suyMFpjaBqxHQNg/edit#gid=1136345578). Exceptions to these maximum allowable adjustments always require CEO approval, whether in the form of redlines to Fleet's agreements or in terms on a prospective customer's own contract.

> All non-standard (from another party) subscription agreements, NDAs, and similar contracts require legal review from from the Business Operations department before being signed. [Create an issue request legal review](https://github.com/fleetdm/confidential/blob/main/.github/ISSUE_TEMPLATE/contract-review.md).

### Close a new customer deal
To close a deal with a new customer (non-self-service), create and complete a GitHub issue using the ["Sale" issue template](https://github.com/fleetdm/confidential/issues/new?assignees=hughestaylor&labels=%23g-business-operations&projects=&template=3-sale.md&title=New+customer%3A+_____________).

### Change customer credit card number
You can help a Premium license dispenser customers change their credit card by directing them to their [account dashboard](https://fleetdm.com/customers/dashboard). On that page, the customer can update their billing card by clicking the pencil icon next to their billing information.

## Rituals

<rituals :rituals="rituals['handbook/customers/sales.rituals.yml']"></rituals>


#### Stubs
The following stubs are included only to make links backward compatible.

##### Fleet Premium
##### Fleet Free
##### Emergency (P0) request communications
Please see [handbook/company/communications#customer-support-service-level-agreements-slas](https://fleetdm.com/handbook/company/communications#customer-support-service-level-agreements-slas) for all sections above.

##### Submit a customer contract for legal review
##### Standard terms
##### Non-standard NDAs
##### Reviewing subscription agreement
##### Submit a customer contract
Please see [handbook/sales#create-a-customer-agreement](https://fleetdm.com/handbook/sales#create-a-customer-agreement) for all sections above.

##### Document customer requests
Please see [handbook/customer-success#document-customer-requests](https://fleetdm.com/handbook/customer-success#document-customer-requests)

##### Generate a trial license key
Please see [handbook/customer-success#generate-a-trial-license-key](https://fleetdm.com/handbook/customer-success#generate-a-trial-license-key)

#### Create customer support Issue
Please see [handbook/customer-success#create-customer-support-issue](https://fleetdm.com/handbook/customer-success#create-customer-support-issue)

<meta name="maintainedBy" value="alexmitchelliii">
<meta name="title" value="🐋 Customers">
