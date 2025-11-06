# Our Voice, Our Rights: MGNREGA Data for Everyone

**Making complex government data simple, accessible, and understandable for every citizen of India.**

This project is a web application designed to bridge the data literacy gap for beneficiaries of the Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA). While the Government of India provides open APIs for program performance, this raw data is inaccessible to the very people it's meant to serve.

Our platform transforms this complex data into a simple, visual, and interactive dashboard that anyone can understand, regardless of technical skill or literacy level.

**Live Application URL:** [https://bharat-fellowship.vercel.app/](https://bharat-fellowship.vercel.app/)

## The Problem

The MGNREGA program is one of the largest social welfare schemes in the world. The government promotes transparency by providing a public API with district-level performance data. However, this data is:
* **Technical:** Requires knowledge of APIs and JSON.
* **Complex:** Full of jargon and metrics that are difficult to understand.
* **Inaccessible:** Not designed for a low-literacy, non-technical, or multilingual audience.

This creates a barrier where citizens cannot easily hold their local administration accountable or understand the program's impact in their area.

## Our Solution

"Our Voice, Our Rights" is a production-ready web app that solves this problem. It provides an intuitive interface for any citizen to see, understand, and even *hear* how the MGNREGA program is performing in their district.

## Key Features

Our design is focused on two primary goals: extreme accessibility for a rural, low-literacy audience, and a robust technical architecture built for scale.

### 1. Designed for Accessibility & Low-Literacy Users

* **AI-Powered Insights ("Sarathi"):** A friendly AI guide named "Sarathi" (the Charioteer) provides a simple, bullet-point summary of the data in plain language, with language options for English, Hindi, and Marathi.
* **Text-to-Speech (TTS):** The app can *speak*! Users can click a button to have the AI insights and key performance numbers (like "Total Money Spent") read aloud to them in their chosen language.
* **Multilingual Interface:** The entire dashboard, including charts and labels, can be toggled between English and Marathi to serve users in their native tongue.
* **Simple Visualizations:** Key metrics are presented as color-coded (Green/Yellow/Red) KPI cards and simple charts (Top 12 Districts by Work Completed, Top 12 by Expenditure), making performance easy to grasp at a glance.
* **Built-in Glossary:** A "Word Meanings" (Glossary) feature explains complex terms like "Works Completed" or "Salaries Paid on Time" in simple, understandable definitions.

### 2. Production-Ready Technical Architecture

* **Smart Geolocation:** The app automatically (and with permission) detects the user's location to identify their district and state, pre-filling the filters to show them relevant data immediately.
* **Scalable by Design:** Built on a modern web stack designed to handle millions of users across India.
* **Resilient & Reliable:** The architecture is designed to be independent of the `data.gov.in` API's uptime. The project description specifies that the system should be resilient to API downtime or rate-limiting, implying a caching database layer.
* **Data Context API:** Uses React's Context API to efficiently manage and provide data across all components.

## Technical Stack

This repository contains the `client` (frontend) code for the application.

* **Frontend:** React (Vite), Tailwind CSS
* **Routing:** React Router
* **Data Visualization:** Recharts
* **State Management:** React Context API (for Data and Language)
* **AI & Accessibility:** Google Gemini (for Insights & TTS)
* **Geolocation:** OpenStreetMap (Nominatim API)

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ankitkatole/bharatfellowship.git](https://github.com/ankitkatole/bharatfellowship.git)
    cd bharatfellowship/client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
   

3.  **Set up Environment Variables:**
    Create a `.env` file in the `client` directory. You will need to add API keys for the `data.gov.in` API and the Google Gemini API.
    ```
    # API key from data.gov.in
    VITE_API_KEY="your_datagov_api_key"

    # API key from Google AI Studio for Gemini
    VITE_GEMINI_API_KEY="your_gemini_api_key"
    ```
   

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
   
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).