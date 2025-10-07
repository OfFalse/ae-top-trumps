# Top Trump Profile Generator

The main goal of this project is to create a highly accessible and efficient client-side application that standardises and gamifies the display of professional profiles in the workplace. This tool, the **Top Trump Profile Generator**, tackles the current absence of an automated, visually appealing way to generate standardised team profiles. It enables users to input essential professional data (Full Name, Client) and choose up to five key skills, each with a corresponding proficiency level, resulting in a downloadable, colour-coded Top Trump Card.

---

## Project Roadmap and Scope Definition

The project adhered to a timeline, prioritising both core functionality and several Non-Functional Requirements (NFRs).

The project scope is strictly defined as a **UI-only application**. The focus is placed intensely on client-side state management, input validation, component rendering, and rigorous NFR compliance. Backend integration is limited to fetching industry standard skill labels via an **API call** for the skill list. Crucially, the application is **stateless**, meaning data is not persisted after the browser session.

## ![project_plan_drawio](./assets/AE-Wireframe-Project%20Plan.drawio.png)

## Business Justification and Strategic Value

In a fast-paced **consultancy environment**, the ability to quickly assemble effective project teams is a vital competitive advantage. Resourcing managers, responsible for assigning candidates to roles, and bid teams constantly face the challenge of evaluating numerous candidates to find the ideal fit for client engagements. Traditional methods, such as manually sifting through CVs or complex spreadsheets, are time-consuming and prone to inconsistency. This project addresses this inefficiency by developing a tool for instant, standardised skills visualisation.

The core business driver is the need for **rapid evaluation**. Resourcers must assess a consultant's core competencies **at a glance**. By distilling a profile down to five key skills in a clear, visual format, the Top Trump Generator enables quick comparisons. The skills list must be based on **industry standards** to align internal descriptions with client terminology in Request for Proposals and project briefs, streamlining bidding and enhancing professional engagements.

### Gamification: The Top Trump Format

The choice of a "Top Trump" format is a deliberate strategy to utilise the principles of gamification for business purposes. This classic card game format is intuitively understood and highly effective for comparing data.

- **Instant Understanding**: The card visually organises information, presenting ratings and categories that are instantly clear. It is far more engaging and memorable than a simple list or paragraph. A resourceful person can grasp the key strengths of a candidate within seconds.
- **Enables Direct Comparison**: The core mechanic of Top Trumps is comparing statistics. This allows managers to place two or more candidate cards side by side and assess objectively who is stronger in a required skill, such as 'Cloud Architecture' or 'Agile Delivery'.
- **Promotes Data Simplification**: By restricting skills to five, the format compels consultants and their managers to focus on their most relevant and impactful capabilities, cutting through the complexity of exhaustive, multi-page CVs. It addresses the question: "What are you an expert in _right now_?".
- **Enhances Engagement**: Introducing a fun, slightly competitive element to profile management can boost user adoption and motivate employees to update their profiles regularly. It cultivates a culture where skills and professional development are openly recognised and valued.

---

## Technology Stack Rationale

The development leverages a modern technology stack, utilising **React with TypeScript** for robust code architecture and integration with the **Carbon Design System (CDS)** to ensure enterprise-grade accessibility and responsiveness. The selection of this stack was a strategic decision aimed at maximising performance, scalability, and development speed.

**TypeScript** on top of React introduces static typing, which is critical for building a robust and reliable application. It catches potential errors during the development phase, not in production, leading to higher code quality and productivity and elevates the systems robustness which is non-negotiable for critical business tools.

### Carbon Design System (CDS)

Choosing an established design system like Carbon instead of building components from scratch or using a more generic library like Bootstrap was crucial for creating a professional and accessible user interface rapidly. CDS is specifically designed for enterprise applications, providing a comprehensive set of pre-built, **WCAG-compliant** components. This ensures that the tool is not only visually consistent and professional but also usable by all employees, regardless of their abilities. These pre-built features saved hundreds of hours of development that would have otherwise been spent on designing, building, and testing customised UI elements, allowing the project to focus on its core business logic.

## Project Requirements

The following requirements were defined in consultation with stakeholders and prioritised using the MoSCoW methodology (assumed complete).

# MoSCoW Prioritization

A method for categorizing requirements to manage stakeholder expectations and prioritize work. The definitions used are as follows:

- **Must-have:**: Non-negotiable requirements. The release is a failure without them.
- **Should-have:** Important but not vital. Adds significant value.
- **Could-have:** Desirable "nice-to-have" items with a smaller impact.
- **Won't-have (this time):** Explicitly out of scope for the current timeframe.

![MoSCoW_functional_requirements](./assets/AE-Wireframe-MoSCoW.jpg)

### 1. Functional Requirements: User Interface (UI)

| Requirement                    | Implementation Detail (Carbon Design System)                                                                                     | Priority (MoSCoW) |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| **User Identification Inputs** | **CDS TextInput** components for **Full Name** and **Client** identification.                                                    | Must Have         |
| **Skill Selection Interface**  | **CDS ComboBox** for selecting skills (from mock API data) and a corresponding **CDS Dropdown** for proficiency level selection. | Must Have         |
| **Dynamic Skill List**         | A visible, dynamic list that appends selected skills/levels, strictly limited to **five items**.                                 | Must Have         |
| **Card Generation Trigger**    | A primary **CDS Button** labelled "Generate Top Trump" to initiate the final output rendering.                                   | Must Have         |
| **Profile Display**            | Displays the generated card, including a **CDS Avatar**, Full Name, Client, and skills rendered as color-coded **CDS Tags**.     | Must Have         |
| **Profile Picture**            | A fiel upload that accepts images as **.jpg, .png, and .svg** that is displayed in place of the **CDS Avatar** when provided.    | Could Have        |

### 2. Functional Requirements: Logic and Data

| Requirement                             | Implementation Detail                                                                                                                          | Priority (MoSCoW) |
| :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| **Input Validation**                    | Client-side validation to ensure text fields (**Full Name, Client**) are non-empty.                                                            | Must Have         |
| **Skill Level Colour Logic**            | Logic to map proficiency levels to specific colours for the CDS Tags: **Expert: purple, Advanced: blue, Intermediate: green, Beginner: grey**. | Should Have       |
| **Skill Limit Validation**              | Logic to enforce the **maximum of 5 skills**, displaying a custom inline error message upon attempted overflow.                                | Should Have       |
| **Skill List Source**                   | Skill data for the ComboBox is sourced via an **API call** integration with industry standard skills API.                                      | Should Have       |
| **Authentication / Sign In**            | **None required**.                                                                                                                             | Won't Have        |
| **UI State Persistence**                | **None required**.                                                                                                                             | Won't Have        |
| **Backend API or Database Persistence** | **None required**.                                                                                                                             | Won't Have        |

### 3. Non-functional Requirements (NFRs)

| Requirement                  | Measurement and Tooling                                                                                                                | Priority (MoSCoW) |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| **Downloadable Output**      | The final Top Trump card must be exportable (e.g., as a PNG or PDF).                                                                   | Must Have         |
| **Accessibility Compliance** | Audit compliance using **WAVE, Arc Toolkit, and axeDevTools reports**. Preliminary audit via **Google Lighthouse**.                    | Must Have         |
| **Performance**              | Generation process under **1 second** perceived response time. Measured via **Google Lighthouse** performance score (Target: 100/100). | Should Have       |
| **Responsive Design**        | Application must be usable on both desktop and mobile devices.                                                                         | Should Have       |

### 5. User Stories

The following user stories capture the core goals and benefits for the primary user of the Top Trump Profile Generator:

1. **Profile Data Input**
   _As a_ team member, _I want_ to easily input my Full Name and Client details using standard text fields, _so that_ I can identify the profile being generated.

2. **Skill Selection and Limit Enforcement (Logic)**
   _As a_ team member, _I want_ to be able to select a maximum of five skills and their corresponding proficiency levels from a standardized list, _so that_ the generated card is focused and accurately reflects my core expertise without being overloaded.

3. **Card Generation and Visual Feedback**
   _As a_ user, _I want_ to click a button and see the final Top Trump card displayed immediately, with skills color-coded (e.g., 'Expert' as purple),_so that_ I have a fast, clear, and gamified visual summary of my profile.

4. **Accessibility Compliance (NFR)**
   _As a_ user relying on assistive technologies (like a screen reader), _I want_ the application's forms, buttons, and generated content to be fully accessible and correctly labeled, _so that_ I can use the profile generator effectively and without barriers.

5. **Profile Export (NFR)**
   _As a_ user, _I want_ a dedicated option to download the final generated Top Trump card as an image (PNG or PDF), _so that_ I can easily share, print, or use the card in other documentation. |
