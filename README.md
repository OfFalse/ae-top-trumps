# Top Trump Profile Generator

The main goal of this project is to create a highly accessible and efficient client-side application that standardises and gamifies the display of professional profiles in the workplace. This tool, the **Top Trump Profile Generator**, tackles the current absence of an automated, visually appealing way to generate standardised team profiles. It enables users to input essential professional data (Full Name, Client) and choose up to five key skills, each with a corresponding proficiency level, resulting in a downloadable, colour-coded Top Trump Card.

---

## Business Justification and Strategic Value

In a fast-paced **consultancy environment**, the ability to quickly assemble effective project teams is a vital competitive advantage. Resourcing managers, responsible for assigning candidates to roles, and bid teams constantly face the challenge of evaluating numerous candidates to find the ideal fit for client engagements. Traditional methods, such as manually sifting through CVs or complex spreadsheets, are time-consuming and prone to inconsistency. This project addresses this inefficiency by developing a tool for instant, standardised skills visualisation.

The core business driver is the need for **rapid evaluation**. Resourcers must assess a consultant's core competencies **at a glance**. By distilling a profile down to five key skills in a clear, visual format, the Top Trump Generator enables quick comparisons. The skills list must be based on **industry standards** to align internal descriptions with client terminology in RFPs and project briefs, streamlining bidding and enhancing professionalism.

### Gamification: The Top Trump Format

The choice of a "Top Trump" format is a deliberate strategy to utilise the principles of gamification for business purposes. This classic card game format is intuitively understood and highly effective for comparing data.

- **Instant Understanding**: The card visually organises information, presenting ratings and categories that are instantly clear. It is far more engaging and memorable than a simple list or paragraph. A resourceful person can grasp the key strengths of a candidate within seconds.
- **Enables Direct Comparison**: The core mechanic of Top Trumps is comparing statistics. This allows managers to place two or more candidate cards side by side and assess objectively who is stronger in a required skill, such as 'Cloud Architecture' or 'Agile Delivery'.
- **Promotes Data Simplification**: By restricting skills to five, the format compels consultants and their managers to focus on their most relevant and impactful capabilities, cutting through the complexity of exhaustive, multi-page CVs. It addresses the question: "What are you an expert in _right now_?".
- **Enhances Engagement**: Introducing a fun, slightly competitive element to profile management can boost user adoption and motivate employees to update their profiles regularly. It cultivates a culture where skills and professional development are openly recognised and valued.

---

## Technology Stack Rationale

The development leverages a modern technology stack, utilising **React with TypeScript** for robust code architecture and integration with the **Carbon Design System (CDS)** to ensure enterprise-grade accessibility and responsiveness. The selection of this stack was a strategic decision aimed at maximising performance, scalability, and development speed.

**TypeScript** on top of React introduces static typing, which is critical for building a robust and reliable application. It catches potential errors during the development phase, not in production, leading to higher code quality and easier collaboration among developers—a non-negotiable for critical business tools.

### Carbon Design System (CDS)

Choosing an established design system like Carbon instead of building components from scratch or using a more generic library like Bootstrap was crucial for creating a professional and accessible user interface rapidly. CDS is specifically designed for enterprise applications, providing a comprehensive set of pre-built, WCAG-compliant components. This ensures that the tool is not only visually consistent and professional but also usable by all employees, regardless of their abilities. These pre-built features saved hundreds of hours of development that would have otherwise been spent on designing, building, and testing customised UI elements, allowing the project to focus on its core business logic.
