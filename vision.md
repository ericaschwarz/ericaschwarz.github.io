# Research Vision

---

## Vision

Cardiovascular disease is the leading cause of death in the United States. Many biomedical advancements have deepened our understanding of vascular biology, including the use of **RNA-sequencing** to identify changes in gene expression that both cause and are caused by disease. Despite this, translating these findings into clinically actionable models that can guide patient-specific treatment plans has yet to be accomplished. This gap exists because it is difficult to bridge how cellular-level behavior alters tissue-level mechanics and affects whole-body cardiovascular performance. I will lead research that integrates multiscale data-- from molecular and cellular measurements to organ-scale mechanics-- into cardiovascular models that will generate **actionable predictions** of human-scale cardiovascular outcomes and identify the biomechanical drivers of disease.

My research vision is to integrate nascent technologies, such as **RNA-sequencing informed cell-signalling networks**, into physics-based simulations of **computational fluid dynamics (CFD)** and **soft tissue growth and remodeling (G&R)** to capture both biochemical and hemodynamic drivers of vascular function. This will create predictive tools that clinicians can **safely and reliably** use in cardiovascular care. Such models will also provide **robust and interpretable** in silico datasets that will be used to train **artificial intelligence** frameworks, accelerating their validation and translation into the clinical setting.

My background in **mechanical engineering, bioengineering, and computer science** strongly equips me to address these challenges, as demonstrated by my previous success in leading multi-disciplinary, multi-institutional projects.

---

## Significance
The **FDA** and other leading medical organizations have recognized computational modeling as key component of accelerating medical innovation. 
Physics-based simulations of cardiovascular systems are now routinely used to model **hemodynamics, tissue mechanics, and physiology**, but multiscale models are needed to predict **long-term, clinically relevant outcomes** across complex disease states.

---

## Approach

I complete the cell-to-tissue-to-organ pipeline using in silico models of cell-signaling, cardiovascular flow, and global blood circulation. Using my foundations in biology and medicine, I tailor the combination of mechanistic and phenomenological models to capture relevant biological detail while maintaining computational tractability. This approach yields insights into the initiation and progression of cardiovascular disease which aids clinical decision making while simultaneously creating robust tools for continues research.

---

## Doctoral Research

I completed my Ph.D. at **Stanford University** under the supervision of Dr. Alison Marsden, a leader in the field of **computational fluid dynamics** (CFD). Here, I led a comprehensive analysis of the first U.S. clinical trial evaluating tissue-engineered vascular grafts (TEVGs) for the treatment of congenital heart defects (CHDs). 

I coupled patient-specific CFD simulations with **lumped parameter networks** (LPNs) and identified geometric thresholds for symptomatic behavior (Fig. 1). These insights contributed to the renewal of the clinical trial that allowed for further use of TEVGs to treat CHDs. 

To further this work, I developed a fully 3D fluid-solid-growth (FSG) framework capable of simulating mechanobiologically-driven growth and remodeling (G&R) within a finite element fluid–structure interaction (FSI) solver. This enabled long-term, patient-specific predictions of hemodynamic evolution, wall morphology, tissue composition, and material properties. 

Through this work, I demonstrated the clinical relevance of CFD modeling by enabling mechanobiologically motivated studies of vascular evolution in complex domains. I was nationally recognized for this contribution to computational mechanics as a finalist for the Melosh Medal Competition.


---

## Postdoctoral Research

During my work with Dr. Jay Humphrey at Yale, a leader in vascular biomechanics and mechanobiology, I developed a growth and remodeling (G&R) framework that incorporated time-resolved gene expression from RNA sequencing into a constrained mixture model of pulmonary artery development. Further development will use this work to investigate how hypoxia caused by congenital heart defects (CHDs) disrupts pulmonary artery development. 

I have also leveraged machine learning to strengthen clinical decision-making. Previously, large-data models of certain cardiovascular disease have been limited by the scarcity of clinical data. To address this need in predicting thoracic aortic aneurysm growth, I used my fluid-solid-growth (FSG) framework to generate cohorts of clinically relevant models and worked with machine learning experts to identify the optimal neural operators for forecasting long-term aneurysm growth. Future work will use this simulated data to train large-data models and then transfer this learning to a smaller set of clinical data, accelerating clinical translation of machine learning tools.

---

## Future Research Directions

### 1. Multiscale, Multi-Organ Growth and Remodeling for Congenital Heart Defects
- **Goal:** Couple 3D cardiovascular models to low-dimensional LPNs where both evolve under mechanobiological G&R laws.  
- **Approach:** Retrospective analysis of clinical pressure, flow, and oxygenation data (via UCSF collaborators) will identify governing G&R parameters in circulation.  
- **Outcome:** Enable **personalized CHD treatment** by predicting long-term outcomes and organ-level adaptations.

---

### 2. Multiscale, Multi-Cell Growth and Remodeling for Vascular Grafts
- **Goal:** Integrate **cell-signaling networks** into FSG models to link drug interventions and tissue remodeling.  
- **Approach:** Study **macrophage-mediated inflammation** and **smooth muscle remodeling** under various pharmacological treatments (e.g., mTOR inhibitors, angiotensin II antagonists).  
- **Outcome:** Identify **optimal therapeutic pathways** and delivery schedules to maintain graft patency.

---

### 3. Next-Generation Intracranial Aneurysm Prediction
- **Goal:** Simulate aneurysm evolution by linking oscillatory shear stress to mechanobiological G&R.  
- **Approach:** Use **FSG simulations** to generate data for **neural operator training**, improving clinical forecasting of aneurysm rupture.  
- **Outcome:** Provide **predictive, mechanistic tools** to reduce aneurysm-related morbidity and mortality.

---

## Funding
- **NSF Graduate Research Fellowship** (Ph.D.)  
- **AHA Predoctoral Fellowship** (Ph.D.)  
- **NSF ACCESS Resource Award (PI)** (Postdoc)

As an assistant professor, I will pursue **NIH R21 and R01 grants** (NHLBI, NIBIB), and targeted funding from **AHA**, **Children’s Heart Foundation**, and **Marfan Foundation**.  
I will also mentor students to pursue **NSF, AHA, HHMI, and NIH fellowships**.

<!-----

## Collaborations
At **UC Berkeley**, I will:
- Collaborate with the **Berkeley Biomechanics Laboratory** (Dr. Shawn Shadden) on cardiovascular fluid dynamics and open-source modeling (SimVascular).  
- Partner with clinicians at **UCSF’s Cardiovascular Research Institute** to validate computational predictions and enhance clinical translation.-->

---

## Selected References
1. Morrison, T. M., *et al.* “Advancing regulatory science with computational modeling…” *Frontiers in Medicine* (2018).  
2. Breuer, C. K. “A Study Evaluating the Safety and Efficacy of Second-Generation Tissue Engineered Vascular Grafts.” NIH Project #5UH3HL148693-04.  
3. Schwarz, E. L., *et al.* “Hemodynamic performance of tissue-engineered vascular grafts…” *NPJ Regenerative Medicine* (2021).  
4. Schwarz, E. L., *et al.* “A fluid–solid–growth solver for cardiovascular modeling.” *CMAME* (2023).  
5. Schwarz, E. L., *et al.* “Postnatal Pulmonary Artery Development from Transcript to Mechanics.” *In preparation* (2024).  
6. Schwarz, E. L., *et al.* “Optimal neural operators for forecasting thoracic aortic aneurysm growth.” *In preparation* (2025).  
7. Irons, L., Latorre, M., & Humphrey, J. D. “From transcript to tissue: multiscale modeling from cell signaling to matrix remodeling.” *Annals of Biomedical Engineering* (2021).
