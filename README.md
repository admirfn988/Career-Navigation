> [!IMPORTANT]
> ## 📁 Submission Documents & Templates
> **All required submission templates are in the Google Drive folder below. Download them before you start.**
>
> ### 👉 [**OPEN THE GOOGLE DRIVE FOLDER**](https://drive.google.com/drive/folders/1xw7c2aN8N-at8hPEULzkcU76e_FFb0Ef) 👈

---

# Project Name

AI Career Job is a career exploration platform that helps students and graduates discover suitable careers, identify skill gaps, and prepare for future job market changes driven by artificial intelligence

---

## Team Information

| Field                  | Details                                     |
| ---------------------- | ------------------------------------------- |
| **Team Name**          | Geek Fam                                    |
| **Team Domain**        | Domain 1                                    |
| **SDG Track (1–17)**   | SD4 AND SDG 8                               |
| **Team Leader**        | MUHAMMAD AMMAR HARIZ BIN YAZID HAMDI        |
| **University**         | University Technical Melaka Malaysia        |
| **Number of Members**  | 5                                           |

## Links

| Resource          | Link                                                                               |
| ----------------- | ---------------------------------------------------------------------------------- |
| GitHub Repository | https://github.com/admirfn988/Career-Navigation.git                                |
| Replit Project    | https://replit.com/join#t=hkhiwxdyebqhlyl-ayiqq                                    |
| Live Demo         | https://ai-career-navigator-ayiqq.replit.app/                                      |
| Slide Deck        | https://drive.google.com/file/d/1y1DcPOkoq214WMABzzALsrVzmMxwRXR0/view?usp=sharing |
| Demo Video        | https://drive.google.com/file/d/1ILj2DkwrQ-oLop67bIfk_LLjT4o7SViK/view?usp=sharing |

---

## Overview

### Problem

AI is reshaping the job market, leaving students and fresh graduates uncertain about which careers will emerge and which skills they need to stay competitive.

### Solution

AI Career Navigator is a web-based platform that guides users toward suitable future careers based on their education, skills and interests. It draws on AI and job-market trend references to highlight emerging skills, recommend matching roles, explain skill gaps and build personalised reskilling pathways.

### Key Features

> Career Matching — Recommends potential careers based on users’ skills and interests.
> Future Skills & Skills Gap Analysis — Identifies important future skills and highlights areas users need to improve.
> AI Career Planning — Explores possible AI disruption scenarios and helps users prepare for future job market changes.

### Tech Stack

| Layer         | Technology                            |
| ------------- | ------------------------------------- |
| Frontend      |  HTML, CSS, and JavaScript            |
| Backend       |  Python Flask with REST API endpoints |
| Database      | MySQL                                 |
| AI / Compute  | Replit, Germini and Claude            |
| Hosting / Dev | Replit                                |

---

## Project Structure

```
.
├── docs/                    # Screenshots, diagrams
├── runpod/
│   └── handler.py           # RunPod serverless handler (GPU workload)
├── src/
│   ├── main.py              # Application entry point
│   └── utils.py             # Helper functions
├── submission/              # Required submission documents
│   ├── SDC2026_TeamName_Preliminary.pdf      # Preliminary submission
│   ├── SDC2026_TeamName_TechDeclaration.pdf  # Technology declaration
│   ├── SDC2026_TeamName_Replit_POU.pdf       # Replit proof of use
│   └── SDC2026_TeamName_Runpod_POU.pdf       # RunPod proof of use
├── tests/
│   └── test_utils.py        # Unit tests
├── .env.example             # Example environment variables
├── .gitignore
├── .replit                  # Replit run configuration
├── LICENSE
├── requirements.txt         # Python dependencies
└── README.md
```

### Architecture

```
User ──► Replit (App / API) ──► RunPod Endpoint (GPU model)
                │
                └──► Response returned to user
```

---

## How to Run

### Option 1 — Run on Replit (Recommended)

1. Open the [Replit Project](https://replit.com/@your-username/your-project), or import this repository via **Create Repl → Import from GitHub**.
2. Open the **Secrets** tab (🔒) and add the variables listed in `.env.example`:
   - `RUNPOD_API_KEY`
   - `RUNPOD_ENDPOINT_ID`
3. Click **Run**. Replit uses the `.replit` file to start `python src/main.py`.

### Option 2 — Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-project.git
cd your-project

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment variables
cp .env.example .env            # then fill in your values

# 5. Run the app
python src/main.py
```

### Run Tests

```bash
python -m unittest discover tests
```

---

## How We Use Replit *(Required)*

Describe how your team used Replit. For example:

- **Development:** Collaborative coding in a shared Repl using Multiplayer.
- **Hosting:** The app is deployed with Replit Deployments at the Live Demo link above.
- **Secrets:** API keys are stored in Replit Secrets, never in the code.

📄 Proof of use: [`submission/SDC2026_TeamName_Replit_POU.pdf`](submission/SDC2026_TeamName_Replit_POU.pdf)

---

## Challenges & Learnings

1. What challenges did you face, and how did you overcome them?
Our main challenge was designing a website that could match users with suitable careers based on their skills and interests. We overcame this by developing a clear matching formula and organising the website features systematically. We also worked together to solve problems and improve the website.
2. What did your team learn?
Our team learned the importance of teamwork, communication, and problem-solving. We also gained experience in website development and learned how AI may influence future career opportunities. Most importantly, we learned that continuous learning and adaptability are essential in a changing job market.

## Future Improvements

1. Improve career matching accuracy: Use real-time job market data to provide more accurate career recommendations based on users’ skills and interests.

2. Add learning resources: Recommend courses and learning materials to help users develop missing skills and prepare for their chosen careers.

## Team

| Name        | Role                     | GitHub                                                        |
| ----------- | -------------------      | ------------------------------------------------------------- |
| Ammar       | project manager          | [@ammmarhariz140807]https://github.com/ammarhariz140807-hub   |
| Ariq        | UI/UX Designer           | [@amad](https://github.com/ahmadariq07-crypto)                |
| Adam        | Frontend                 | [@Bino](https://github.com/admirfn988)                        |
| Haziq       | Career Research          | [@2ztuzi] https://github.com/2ztuzi                           |
| Hadif       | Documentation Specialist | [@difwafiy007] https://github.com/difwafiy007-cpu             |

---

## Submission Checklist

- [ ] Team name, domain (Domain 1) and SDG track filled in
- [ ] Slide deck link added
- [ ] Demo video link added
- [ ] Replit used, with proof of use in `submission/`
- [ ] RunPod used, with proof of use in `submission/`
- [ ] Preliminary submission completed (`SDC2026_TeamName_Preliminary.pdf`)
- [ ] Technology declaration completed (`SDC2026_TeamName_TechDeclaration.pdf`)
- [ ] Submission files renamed with your team name (replace `TeamName`)
- [ ] "How to Run" steps verified
- [ ] No API keys or secrets committed to the repository

## License

This project is licensed under the [Apache License 2.0](LICENSE).
