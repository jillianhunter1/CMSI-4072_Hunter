# Fusion: The Multi-LLM Meta-Analysis Tool
## User Manual & Operating Guide



## 1. Introduction
**Fusion** is a powerful meta-analysis tool designed to aggregate and compare natural language responses from multiple Large Language Models (LLMs) simultaneously. By prompting ChatGPT, Claude, and Gemini at once, Fusion identifies points of agreement (the "Consensus") and filters out individual model hallucinations.

### **Key Acronyms to Know**
*   **LLM (Large Language Model):** An AI trained on vast amounts of text (e.g., ChatGPT).
*   **API (Application Programming Interface):** The "bridge" Fusion uses to talk to AI providers.
*   **GUI (Graphical User Interface):** The visual windows and buttons you interact with.
*   **JWT (JSON Web Token):** A secure way the software remembers who you are after you log in.

---

## 2. Getting Started

### **2.1 System Requirements**
Before we install, make sure your computer meets these needs:
*   **Operating System:** Windows 10+, macOS, or Linux.
*   **Internet:** High-speed connection (required for AI communication).
*   **Browser:** Chrome, Firefox, or Safari (latest versions).
*   **Runtime:** Node.js version 18 or higher installed on your machine.

### **2.2 How to Install the Software**

1.  **Download the Source:** Extract the `Fusion` project folder to a location of your choice.
2.  **Open your Terminal:** On macOS, open 'Terminal'. On Windows, open 'Command Prompt' or 'PowerShell'.
3.  **Navigate to the folder:** Use the command `cd` to enter the Fusion directory.
4.  **Install Dependencies:**
    *   Type `cd server && npm install` and press Enter.
    *   Type `cd ../client && npm install` and press Enter.

### **2.3 How to Start the Software Execution**
To bring Fusion to life, you need to start both the "Brain" (Server) and the "Face" (Client).

1.  **Start the Server:**
    *   Open a terminal in the `server` folder.
    *   Type `npm start`. You should see: `Server is running on http://localhost:3001`.
2.  **Start the Client:**
    *   Open a *second* terminal window in the `client` folder.
    *   Type `npm start`.
3.  **Launch:** Your web browser will automatically open to `http://localhost:3000`.

### **2.4 How to Stop the Software**
When you’re finished, go to your two terminal windows and press **Ctrl + C** on your keyboard. This safely shuts down the processes. You can then close the browser tab.

### **2.5 How to Uninstall the Software**
Fusion is portable! To uninstall:
1.  Stop the software (Section 2.4).
2.  Delete the `Fusion` folder from your computer.
3.  That's it! No hidden files are left behind.

---

## 3. Using Fusion

### **3.1 The Main Dashboard**
When you first open Fusion, you’ll see a clean interface. 


### **3.2 Submitting a Prompt**
1.  **Type your question:** Locate the large text area in the center that says "Type your prompt here...".
2.  **Click "Fuse":** Click the button or press **Enter**.
3.  **Wait for the Magic:** You’ll see "Thinking..." while Fusion consults ChatGPT, Claude, and Gemini in parallel.

### **3.3 Reading the Fusion Report**
Once the AI responds, the screen will split:
*   **Fusion Report (Top):** This is the "Consensus." It lists only the facts and entities that *all* models agreed upon.
*   **Source Insights (Bottom):** Scroll down to see the full, individual responses from ChatGPT, Claude, and Gemini.

### **3.4 Using History and Profiles**
1.  **Login:** Click the "Sign in with Google" button in the sidebar. 
2.  **Save Queries:** Once logged in, every prompt you "Fuse" is saved to your personal history.
3.  **Recall:** Click any previous query in the sidebar to instantly reload the results.

---

## 4. Troubleshooting

| Problem | Likely Cause | Solution |
| :--- | :--- | :--- |
| **"Error fetching data"** | Missing API Keys | Ensure your `.env` file has valid keys for all three providers. |
| **Login doesn't work** | Client ID Mismatch | Double-check that `REACT_APP_GOOGLE_CLIENT_ID` matches your backend ID. |
| **Empty Fusion Report** | No Consensus | If the models disagree completely, Fusion won't show a consensus to keep you safe from errors! |
| **Page won't load** | Server is off | Ensure you ran `npm start` in the `server` directory. |

---

## 5. Contact & Support
If you encounter a problem, please reach out to the lead engineer:

**Jillian Hunter**
Project Lead, CMSI 4072
Email: jhunte221@lion.lmu.edu

---

## Appendix: Glossary
*   **Consensus:** The shared points of truth between different information sources.
*   **Hallucination:** When an AI generates a response that is factually incorrect but sounds confident.
*   **Meta-Analysis:** The process of analyzing data from multiple different studies or sources.
*   **Vector:** A mathematical representation of text that Fusion uses to compare "meaning."

---
*Created with ❤️ for the future of AI reliability.*
