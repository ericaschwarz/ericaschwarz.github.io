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

I complete the cell-to-tissue-to-organ simulation pipeline using in silico models of cell-signaling, cardiovascular flow, and global blood circulation. Using my foundations in biology and medicine, I tailor the combination of mechanistic and phenomenological models to capture relevant biological detail while maintaining computational tractability. This approach yields insights into the initiation and progression of cardiovascular disease which aids clinical decision making while simultaneously creating robust tools for continued research.

---

## Doctoral Research

I completed my Ph.D. at **Stanford University** under the supervision of Dr. Alison Marsden, a leader in the field of **computational fluid dynamics** (CFD). Here, I led a comprehensive analysis of the first U.S. clinical trial evaluating tissue-engineered vascular grafts (TEVGs) for the treatment of congenital heart defects (CHDs). 

I coupled patient-specific CFD simulations with **lumped parameter networks** (LPNs) and identified geometric thresholds for symptomatic behavior (Fig. 1). These insights contributed to the renewal of the clinical trial that allowed for further use of TEVGs to treat CHDs. 

To further this work, I developed a fully 3D fluid-solid-growth (FSG) framework capable of simulating mechanobiologically-driven growth and remodeling (G&R) within a finite element fluid–structure interaction (FSI) solver. This enabled long-term, patient-specific predictions of hemodynamic evolution, wall morphology, tissue composition, and material properties. 

Through this work, I demonstrated the clinical relevance of CFD modeling by enabling mechanobiologically motivated studies of vascular evolution in complex domains. I was nationally recognized for this contribution to computational mechanics as a finalist for the Melosh Medal Competition.


---

## Postdoctoral Research

During my work with Dr. Jay Humphrey at Yale, a leader in vascular biomechanics and mechanobiology, I developed a growth and remodeling (G&R) framework that incorporated time-resolved gene expression from RNA sequencing into a constrained mixture model of pulmonary artery development. Further development will use this work to investigate how hypoxia caused by congenital heart defects (CHDs) disrupts pulmonary artery development. 

I have also leveraged machine learning to strengthen clinical decision-making. Previously, utilizing large-data models to predict the outcomes of certain cardiovascular disease has been limited by the difficulty of acquiring high fidelity clinical data on which to train them. To address this need in predicting thoracic aortic aneurysm growth, I used my fluid-solid-growth (FSG) framework to generate cohorts of clinically relevant models and worked with machine learning experts to identify the optimal neural operators for forecasting long-term aneurysm growth. Future work will use this simulated data to train large-data models and then transfer this learning to a smaller set of clinical data, accelerating clinical translation of machine learning tools.

---

## Future research

My future research will create the next generation of multiscale computational cardiovascular models that couple whole-body G&R and cell-signaling networks to patient-specific CFD simulations. This will allow for long-term prediction of outcomes across myriad cardiovascular conditions. My background in biologically informed computational models makes me ideally suited to develop these methods and drive them toward clinical translation.

--- 

## 1. Multiscale, Multi-Organ Growth and Remodeling for Congenital Heart Defects

### Background
Previous CFD studies of CHDs have focused on how cardiovascular lesions impact local hemodynamics. However, maladaptive outcomes of CHDs are clinically determined on a whole-body level. For example, single-ventricle physiology and its treatment structurally affect the heart and great arteries, but primary complications include exercise intolerance and progressive liver failure.  
More recently, studies have used LPNs to model this whole-body flow, but they are not predictive of patient behavior over time.

### Approach
LPNs create a reduced-order circuit analogy of flow. Entire organ systems can be modeled as a series of resistors, capacitors, and inductors, and the heart can be modeled as a capacitor with time-varying elastance (Fig. 1). It has already been established that the properties of these LPN elements depend on the lumped geometries and material properties of the organ systems they represent.  

As the body grows and develops, the parameter values of these lumped systems change as well. While the constrained mixture theory of G&R has been used to describe individual vessels and morphometric vascular trees, it has not yet been integrated into an LPN description of the cardiovascular system.  

I will develop a framework for coupling 3D cardiovascular models to low-dimensional LPNs of whole-body flow where both systems are governed by mechanobiological G&R laws. I will perform a retrospective analysis of pressures, heart rates, oxygen saturations, and blood flows (directly measured, if available, or allometrically calculated, if not) in both healthy and diseased populations by collaborating with clinicians at the UCSF Cardiovascular Research Institute.  

From these trends, I will calculate the best-fit parameters of constrained mixture G&R for each lumped system in the circulation. After establishing this governing behavior, I will couple these LPNs to patient-specific FSG models of cardiovascular lesions and predict long-term outcomes for CHD patients.  

Additionally, gene expression information can also be leveraged to inform G&R behavior. This approach may be particularly relevant in conditions with known genetic origins (e.g., Marfan syndrome, Williams syndrome).

### Outcomes
This framework will identify mechanisms of exercise intolerance and organ failure in CHD patients on a patient-specific basis. It will enable early identification of patients at risk for adverse outcomes and allow for the creation of personalized treatment plans. Additionally, it will support *in silico* testing of novel CHD treatments, accelerating the clinical translation of emerging therapeutic technologies.

---

## 2. Multiscale, Multi-Cell Growth and Remodeling for Vascular Grafts

### Background
Vascular grafts (both tissue-engineered and autologous) are widely used to repair damaged blood vessels. However, issues maintaining patency in vascular grafts persist. Clinicians have noted the propensity of TEVGs to stenose and occlude through a combination of mechanical cues and inflammatory responses, particularly macrophage infiltration. The same is true in autologous vein grafts often used in coronary artery bypass grafting (CABG). Identifying methods to improve the functionality of vascular grafts is of high clinical interest given the large numbers of patients affected.

### Approach
To create the next generation of G&R models, I will integrate mechanistic cell-signaling models into my FSG framework (Fig. 2). This will allow for prediction of how both mechanical forces and pharmacological interventions can affect the physiological function of vascular grafts.  

The FSG framework currently relies only on the deformation-dependent material stiffness tensor to assemble the finite element solver tangent matrix, making it appropriate to integrate cell-signaling networks directly into the governing equations for kinematic growth and material properties without having to change the architecture of the finite element solver itself.  

Using the multiscale FSG framework, I will identify optimal targets for drug delivery that selectively inhibit macrophage activity and cell proliferation in vascular grafts while allowing for functional smooth muscle and endothelial cell activity.  

For TEVGs, I will first focus on the effects of angiotensin II receptor antagonists, which have been shown to inhibit pro-inflammatory signaling pathways. For vein grafts, I will focus on the effects of mTOR pathway inhibitors, which are currently used in drug-eluting stents to inhibit cell proliferation after coronary angioplasty.

> Figure 2. Example of a logic-based cell-signaling network used in my postdoctoral research lab to simulate arterial wall behavior.

### Outcomes
Using this framework, I will identify optimal drug pathways and delivery timings to ensure the patency of vascular grafts. These findings will improve patient health and lower the incidence of corrective surgery necessitated by graft occlusion.  

This work is also highly innovative, as it will yield the first *transcript-to-tissue-to-system* model of evolving vessels.

---

## 3. Next-Generation Intracranial Aneurysm Prediction

### Background
Intracranial aneurysms arise from weakened areas of the arterial wall in the brain. The rupture of an aneurysm occurs when mechanical forces exceed the strength of the vascular wall. Ruptured intracranial aneurysms carry severe risk with a mortality rate of 45% and a morbidity rate of 25%.  

Because of this, there is intense clinical interest in predicting the growth and rupture of aneurysms. In recent years, considerable effort has been put towards using patient-specific CFD to correlate hemodynamic metrics such as wall shear stress and oscillatory stress to patient outcomes. However, these correlations are not predictive, and there has been limited success in finding thresholds for patient-specific clinical decision-making.

### Approach
Applying my FSG framework to intracranial aneurysms will make it possible to simulate evolving aneurysm wall composition and material properties in response to patient-specific hemodynamics.  

It has been hypothesized that oscillatory shear stress contributes to aneurysm initiation and progression. Despite this, oscillatory shear stress mediation of G&R has not previously been incorporated into constrained mixture approaches. To address this limitation, I will incorporate the phenomenological response of cells to oscillatory shear stress into the FSG framework.  

This will be a novel application of constrained mixture theory and provide new, predictive insights into mechanisms of intracranial aneurysm growth and rupture. As previously established, simulated data can be used to supplement scarce or incomplete clinical data when training large-data models.  

I will further the clinical impact of this work by training large-data neural operators on these models and using transfer learning to predict outcomes in clinical aneurysm cases.

### Outcomes
This research will guide clinical decision-making and reduce the morbidity and mortality associated with intracranial aneurysms. It will also elucidate biomechanical contributors to intracranial aneurysm growth and rupture.

---

## Funding

I have an established record of obtaining funding for my research. The first three years of my Ph.D. were funded by an NSF Graduate Research Fellowship. The final portion of my doctoral work was funded by the AHA Predoctoral Fellowship. In my postdoctoral research, I applied for and was approved for an NSF ACCESS resource award as the primary investigator.  

I will support my research aims as an assistant professor by applying for funding mechanisms through the NIH at the NHLBI and NIBIB. I will begin by applying for R21 exploratory grants and then transition to applying for R01 grants for long-term support.  

This research is also appropriate for funding from private institutions such as the AHA, Additional Ventures, the Children’s Heart Foundation, and the Marfan Foundation. Given my success in obtaining funding for doctoral research, I will mentor my students to apply for external fellowships from NSF, AHA, HHMI, and NIH.  

I will additionally apply to NSF ACCESS for resource awards that can supplement the computational resources available through the UC Berkeley High Performance Computing Center.

<!--

## Collaborations

At UC Berkeley, I will foster collaborations across research groups to develop and translate my computational modeling research.  

Within the Mechanical Engineering Department, I would be eager to collaborate with groups in the Berkeley Biomechanics Laboratory, which has a strong focus on biological flows, soft tissue biomechanics, and tissue engineering. In particular, Dr. Shawn Shadden has done extremely relevant research on cardiovascular fluid dynamics, and I have previously collaborated with him through his work with my doctoral research group on the open-source simulation suite **SimVascular**.  

Additionally, UC Berkeley’s partnership with **UCSF** provides access to one of the nation’s top medical centers. I would pursue opportunities to collaborate with clinicians in the **UCSF Cardiovascular Research Institute** to advance the translational impact of my research.

-->

---

## Selected References
1. Morrison, T. M., *et al.* “Advancing regulatory science with computational modeling…” *Frontiers in Medicine* (2018).  
2. Breuer, C. K. “A Study Evaluating the Safety and Efficacy of Second-Generation Tissue Engineered Vascular Grafts.” NIH Project #5UH3HL148693-04.  
3. Schwarz, E. L., *et al.* “Hemodynamic performance of tissue-engineered vascular grafts…” *NPJ Regenerative Medicine* (2021).  
4. Schwarz, E. L., *et al.* “A fluid–solid–growth solver for cardiovascular modeling.” *CMAME* (2023).  
5. Schwarz, E. L., *et al.* “Postnatal Pulmonary Artery Development from Transcript to Mechanics.” *In preparation* (2024).  
6. Schwarz, E. L., *et al.* “Optimal neural operators for forecasting thoracic aortic aneurysm growth.” *In preparation* (2025).  
7. Irons, L., Latorre, M., & Humphrey, J. D. “From transcript to tissue: multiscale modeling from cell signaling to matrix remodeling.” *Annals of Biomedical Engineering* (2021).
