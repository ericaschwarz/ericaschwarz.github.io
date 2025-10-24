# Research Vision

---

<style>
summary {
  font-weight: 700;
  font-size: 1.5em;        /* ≈ ## heading size */
  cursor: pointer;
  line-height: 1.2;
  color: #267CB9;
  margin-bottom: 0.5em;
}
summary:hover {
  color: #069;
}
.summary-sub {
  display: block;
  font-size: 0.8em;               /* same as normal body text */
  font-weight: normal;
  margin-bottom: 0.5em;
}

</style>


## Vision

Cardiovascular disease is the leading cause of death in the United States. Many biomedical advancements have deepened our understanding of vascular biology. This includes the use of **RNA-sequencing** to identify changes in gene expression that both cause and are caused by disease. Despite this, no one has robustly translated these findings into clinically actionable models that can guide patient-specific treatment plans. This gap exists because it is difficult to bridge how cellular-level behavior alters tissue-level mechanics and ultimately affects whole-body cardiovascular performance. I will lead research that integrates multiscale data-- from molecular and cellular measurements to organ-scale mechanics-- into cardiovascular models that will generate **actionable predictions** of human-scale cardiovascular outcomes and identify the biomechanical drivers of disease.

My research vision is to integrate new technologies, such as **RNA-sequencing informed cell-signaling networks** into physics-based simulations of **computational fluid dynamics (CFD) and soft tissue growth and remodeling (G&R)**. These technologies provide an improved understanding of the mechanistic drivers of biological behavior, enabling models that capture both biochemical and hemodynamic influences on vascular disease. This will create predictive tools that clinicians can **safely and reliably** use in cardiovascular care. Such models will also provide **robust, interpretable** in silico datasets to train **machine learning** frameworks, accelerating their validation and translation into the clinical setting. Together, this portfolio of work will create a cell-to-tissue-to-organ modeling framework that will have wide-reaching utility for investigating cardiovascular diseases ranging from congenital heart defect treatment planning to intracranial aneurysm outcome forecasting.

My background in **mechanical engineering, bioengineering, and computer science** strongly equips me to address these challenges, as demonstrated by my previous success in leading multi-disciplinary, multi-institutional projects.


---


<details>
  <summary>
  <span class="summary-title">Significance</span><br>
  <span class="summary-sub">Click to expand.</span>
  </summary>

  <div markdown="1">

The **FDA** and other leading medical organizations have recognized computational modeling as a key component of accelerating medical innovation. 
Physics-based simulations of cardiovascular systems are now routinely used to model **hemodynamics, tissue mechanics, and physiology**, but multiscale models are needed to predict **long-term, clinically relevant outcomes** across complex disease states.

  </div>

</details>

---

<details>
  <summary>
  <span class="summary-title">Approach</span><br>
  <span class="summary-sub">Click to expand.</span>
  </summary>

  <div markdown="1">

I complete the cell-to-tissue-to-organ simulation pipeline using in silico models of cell-signaling, cardiovascular flow, and global blood circulation. Using my foundations in biology and medicine, I tailor the combination of mechanistic and phenomenological models to capture relevant biological detail while maintaining computational tractability. This approach yields insights into the initiation and progression of cardiovascular disease which aids clinical decision-making while simultaneously creating robust tools for continued research.

  </div>

</details>

---


<details>
  <summary>
  <span class="summary-title">Doctoral Research</span><br>
  <span class="summary-sub">Click to expand.</span>
  </summary>

  <div markdown="1">

I completed my Ph.D. at **Stanford University** under the supervision of Dr. Alison Marsden, a leader in the field of **computational fluid dynamics** (CFD). Here, I led a comprehensive analysis of the first U.S. clinical trial evaluating tissue-engineered vascular grafts (TEVGs) for the treatment of congenital heart defects (CHDs). 

I coupled patient-specific CFD simulations with **lumped parameter networks** (LPNs) and identified geometric thresholds for symptomatic behavior (Fig. 1). These insights contributed to the renewal of the clinical trial that allowed for further use of TEVGs to treat CHDs. 

To further this work, I developed a fully 3D fluid-solid-growth (FSG) framework capable of simulating mechanobiologically driven G&R within a finite element fluid–structure interaction (FSI) solver. This enabled long-term, patient-specific predictions of hemodynamic evolution, wall morphology, tissue composition, and material properties. 

Through this work, I demonstrated the clinical relevance of CFD modeling by enabling mechanobiologically motivated studies of vascular evolution in complex domains. I was nationally recognized for this contribution to computational mechanics as a finalist for the Melosh Medal Competition.

  </div>

</details>

---

<details>
  <summary>
  <span class="summary-title">Postdoctoral Research</span><br>
  <span class="summary-sub">Click to expand.</span>
  </summary>

  <div markdown="1">

During my work with Dr. Jay Humphrey at Yale, a leader in vascular biomechanics and mechanobiology, I developed a G&R framework that incorporated time-resolved gene expression from RNA sequencing into a constrained mixture model of pulmonary artery development. Further development will use this work to investigate how hypoxia caused by CHDs disrupts pulmonary artery development. 

I have also leveraged machine learning to strengthen clinical decision-making. Previously, the difficulty of acquiring high-fidelity clinical data has limited the use of large-data machine learning models to predict cardiovascular disease outcomes. To address this need in predicting thoracic aortic aneurysm growth, I used my FSG framework to generate cohorts of clinically relevant models and worked with machine learning experts to identify the optimal neural operators for forecasting long-term aneurysm growth. Future work will use these in silico datasets to train large-data neural network models and then transfer this learning to a smaller set of clinical data, accelerating clinical translation of machine learning tools.

  </div>

</details>

---

<details>
  <summary>
  <span class="summary-title">Future research</span><br>
  <span class="summary-sub">Click to expand.</span>
  </summary>

  <div markdown="1">

My long-term research program will extend cell-to-tissue simulation coupling to capture the impact of mechanosensitivity and exogenous factors on cellular gene expression. It will also integrate how organ-scale hemodynamics grow and evolve over time, creating a true cell-to-tissue-to-organ framework. This research will inform pharmacological and surgical intervention strategies based on patient-specific geometries, hemodynamics, and eventually biomarkers that indicate patient-specific responses in modeled networks. In addition to direct clinical prediction, these developments will allow for the creation of synthetic datasets that mimic in vivo behavior and will greatly reduce the cost of training large-data machine learning models and transferring them to the clinical setting. In parallel, this research will create strong collaborations in medical uncertainty quantification and fundamental studies of cardiovascular biology. Initial stages of this future work will focus on applications in CHDs, vascular graft design, and aneurysm forecasting as detailed in the projects below.
  </div>

</details>

--- 

<details>
  <summary>

  <span class="summary-title">1. Predicting Outcomes in Congenital Heart Defect Patients through Multiscale, Multi-Organ Growth and Remodeling</span><br>
  <span class="summary-sub">Click to expand.</span>

  </summary>

  <div markdown="1">

### Background
CFD studies of heart diseases have primarily centered around cardiovascular lesions and how they impact local hemodynamics. However, maladaptive outcomes of cardiovascular disease are clinically determined on a whole-body level. A salient example of this is CHDs such as single-ventricle physiology. While the primary outcome of single-ventricle physiology treatment, the Fontan procedure, is the direct impact on local hemodynamics, prominent sequelae include maladaptive remodeling of the liver, lungs, and heart that may lead to liver failure, pulmonary hypertension, and exercise intolerance. More recently, studies have used LPNs to model this whole-body flow, which includes organ-level hemodynamics, but they are not predictive of patient adaptation over time.

### Approach
LPNs are capable of representing whole-body cardiovascular behavior at high computational efficiency through reducing the order of the flow via a circuit analogy. The properties of these LPN elements depend directly on the geometries and material properties of the organ systems they represent with the capacity for patient-specific parameterization. However, they are typically used as static representations of cardiovascular behavior at a single point in time and do not account for how the lumped parameters will adapt under their cardiovascular load. I propose expanding the predictive capabilities of LPNs by integrating G&R behavior directly into the LPN elements, which would represent how the body grows and develops in response to the mechanobiological perturbations caused by cardiovascular lesions.

Utilizing the low-dimensional properties of LPNs to model whole-body flow and integrating phenomenological G&R trends (similar to those governing constrained mixture theory implemented in my FSG framework) will allow forecasting of organ-scale cardiovascular performance over time. This will transform static representations of whole-body performance to a dynamic system capable of accounting for how disruptions to a system sub-block propagate to changes throughout the body.

This integration provides a rich opportunity for ongoing collaboration with clinicians. Novel quantification of G&R behavior can be formed from population-level data, including trends in pressures, heart rates, oxygen saturations, and blood flows (directly measured, if available, or allometrically calculated, if not). While integration of clinical data can be limited by the inconsistency of record-keeping, particularly in pediatric diseases, leveraging a large population of data from both healthy and diseased patients will allow trends in G&R behavior to appear overall. These trends will inform the best-fit parameters of constrained mixture G&R for each lumped system in the circulation. After establishing this governing behavior, coupling of LPNs to 3D models of cardiovascular lesions will allow the prediction of how specific geometries will affect the overall trajectory of disease. Additionally, gene expression information can be leveraged to inform G&R behavior. This approach will be particularly relevant in conditions with known genetic origins (e.g., Marfan syndrome, Williams syndrome).

### Outcomes
This framework will identify mechanisms of exercise intolerance and organ failure and enable early identification of patients at risk for adverse outcomes. Initial investigations will identify mechanisms of liver disease, pulmonary hypertension, and heart failure in CHD patients, but such a system can be expanded to other pathways of investigation where there are known system-level effects of local hemodynamics that evolve over time, such as aortic coarctation (where local hemodynamics of the aorta cause adverse cardiac remodeling).

  </div>

</details>

---

<details>
  <summary>

  <span class="summary-title">2. Identifying Pharmacological Targets in Vascular Grafts through Multiscale, Multi-Cell Growth and Remodeling</span><br>
  <span class="summary-sub">Click to expand.</span>

  </summary>

  <div markdown="1">

### Background
Vascular grafts (both tissue-engineered and autologous) are widely used to repair damaged blood vessels, but maintaining patency remains a major challenge. Clinicians have noted the propensity of TEVGs to stenose and occlude through a combination of mechanical cues, such as altered wall shear stress, and inflammatory responses, particularly macrophage infiltration. The same is true for autologous vein grafts often used in coronary artery bypass grafting (CABG). Identifying methods to improve the functionality of vascular grafts is of high clinical interest given the large number of patients affected.  

Many of the initiators of intimal hyperplasia and inflammation that account for this narrowing arise at the cellular level and are driven by inflammatory signaling pathways that regulate smooth muscle proliferation and matrix deposition. Current therapies rely on anti-inflammatory drugs, an approach that can be combined with cardiovascular devices such as drug-eluting stents. However, these solutions are incomplete, and recurrent narrowing frequently necessitates reoperation.

To better understand how pharmacological interventions interact with biomechanical drivers of G&R, I will develop a multiscale framework that links cell-signaling dynamics to tissue-level remodeling behavior, with the ultimate goal of identifying novel pharmacological targets in vascular grafts.

### Approach
I will develop a multiscale G&R framework that couples mechanistic cell-signaling models with the FSG solver to predict how pharmacological and mechanical factors jointly influence vascular graft adaptation (Fig. 2). This framework will enable quantitative predictions of how targeted interventions alter cellular activity, extracellular matrix turnover, and overall graft function.

Because the FSG framework assembles its tangent matrix from the deformation-dependent stiffness tensor, it can integrate new governing equations for kinematic growth and material property evolution from cell-signaling networks within the existing FSG framework without altering the architecture of the finite element solver itself. This will allow me to leverage existing solvers and focus my approach on developing new cell-signaling pathways of interest. Recent studies have created models of macrophage and smooth muscle behavior, two critical classes of cells responsible for graft occlusion, and linked their dynamics to exogenous input. I will expand these classes to include other cell types implicated in inflammation and intimal hyperplasia, including endothelial cells and additional macrophage phenotypes. These models will initially be built based on published data, but will expand to incorporate new data gathered with experimental collaborators.

Using this multiscale framework, I will identify optimal targets for drug delivery that selectively inhibit macrophage activity and excessive cell proliferation in vascular grafts while preserving functional smooth muscle and endothelial cell activity. I will apply this model to two representative contexts: (i) TEVGs, focusing on the effects of angiotensin II receptor antagonists, which have been shown to inhibit pro-inflammatory signaling pathways, and (ii) autologous vein grafts for CABG, focusing on mTOR pathway inhibitors, which are currently used in drug-eluting stents to inhibit cell proliferation after coronary angioplasty.

### Outcomes
Using this framework, I will predict optimal drug pathways, delivery timings, and dosage strengths to promote the long-term patency of vascular grafts. This will improve patient health and lower the incidence of surgical revisions necessitated by graft occlusion. This work is also highly innovative as, together with my broader research portfolio, it will yield the first *cell-to-tissue-to-organ* model of evolving vessels.
  </div>

</details>

---

<details>
  <summary>

  <span class="summary-title">3. Forecasting Intracranial Aneurysm Growth and Rupture through Integrating Machine Learning and In Silico Model Datasets</span><br>
  <span class="summary-sub">Click to expand.</span>

  </summary>

  <div markdown="1">


### Background
Intracranial aneurysms arise from weakened areas of the arterial wall in the brain. The rupture of an aneurysm occurs when mechanical forces exceed the strength of the vascular wall. Ruptured intracranial aneurysms carry severe risk with a mortality rate of 45% and a morbidity rate of 25%.  

Because of this, there is intense clinical interest in predicting the growth and rupture of intracranial aneurysms. In recent years, considerable effort has been put towards using patient-specific CFD to correlate hemodynamic metrics such as wall shear stress and oscillatory stress to patient outcomes. However, these correlations are not predictive, and there has been limited success in finding thresholds for patient-specific clinical decision-making. Researchers have also turned to large-data machine learning models as another method of predicting outcomes. However, obtaining precision results is hampered by the scarcity of high-fidelity clinical data. High resolution imaging, flow, and tissue information that would increase predictive power are rarely available at sufficient scale for neural network training.

To address these limitations and enable the next generation of predictive aneurysm models, I will integrate physics-based G&R simulations with large-data neural operators. By coupling hemodynamic and biomechanical drivers of aneurysm formation, growth, and rupture, these simulations will create rich datasets for neural network training. Transfer learning can then link simulated and clinical data, increasing predictive accuracy while reducing the need for extensive clinical data.

### Approach

The FSG framework I developed as part of my graduate research is capable of simulating evolving wall composition and material properties in response to patient-specific hemodynamics. Building on my postdoctoral work in thoracic aortic aneurysms, which reproduced clinically-relevant aneurysm phenotypes arising from diverse contributers to vascular injury, this effort will extend the framework to capture additional cellular and tissue responses that contribute to aneurysm formation observed in cerebral vessels. In particular, it will incorporate known mechanical stressors that drive maladaptive cellular behavior leading to aneurysmal remodeling.

An initial focus for multiscale modeling development will be integrating the role of oscillatory shear stress in aneurysm initiation and progression. Although high oscillatory shear index has long been hypothesized to influence disease progression, existing constrained mixture formulations have not previously incorporated its contribution to aneurysmal G&R. I will incorporate phenomenological representations of cellular responses to oscillatory shear stress into the FSG framework, leveraging the only finite-element implementation capable of coupling patient-specific, three-dimensional fluid dynamics to fully time-resolved constrained mixture theory. Having such high-fidelity spatial resolution is of particular interest in intracranial aneurysms, as they have a wide range of geometries and high tortuosity that are thought to drive aneurysm progression, and idealized models cannot easily capture the resulting flow fields.

The resulting simulations will provide mechanistic insights into aneurysm growth and rupture. They will also serve as high-fidelity in silico datasets to augment limited clinical data for machine learning. I will train large-data neural operator models on these simulations and apply transfer learning to predict outcomes in clinical aneurysm cases. This approach is distinct from physics-informed neural networks, which embed physical equations within the model itself. Instead, it uses simulated data that mirror the format of clinical inputs, enabling expanded training opportunities while maintaining direct compatibility with patient data. An initial resource to readily begin this work includes already existing compilations of intracranial geometries and outcomes. After viability of this approach is demonstrated, I will build further collaborations with clinicians to perform a prospective study to validate its predictive power.

### Outcomes

This work will produce a novel machine learning framework, specifically large-data neural operator models, that utilizes physics-based aneurysm simulation as training data. Because the FSG simulations will allow for interpretable integration of specific hypotheses of aneurysm formation and progression, this framework will also allow for uncovering hypothetical drivers of aneurysmal disease. This will provide biomechanical insights and also recommend areas for further experimental investigation. This research will guide clinical decision-making and reduce the morbidity and mortality associated with intracranial aneurysms. It will also establish the foundation for expanded use of in silico datasets and machine learning to work together in many other clinical applications, including aortic aneurysm.

<figure style="max-width: 90%; margin: auto; background-color: white; border-radius: 10px; padding: 10px;">
  <a href="/assets/figure-01.svg" target="_blank">
    <img src="/assets/figure-01.svg" alt="Diagram of aneurysms" style="width:100%; border-radius:10px; background-color:white;">
  </a>
  <figcaption style="text-align:center; margin-top:8px;">
    <em>
      Different insult types contributing to disease progression can result in similar pre-aneurysmal lesions at intermediate times. Despite these initial geometrical similarities, continued progression can result in different outcomes, 
      depending on the underlying mechanisms of insult.
    </em>
  </figcaption>
</figure>

  
<br>


  </div>

</details>

---

<details>
  <summary>

  <span class="summary-title">Funding</span><br>
  <span class="summary-sub">Click to expand.</span>

  </summary>

  <div markdown="1">

As an assistant professor, I will build a diverse portfolio of funding support to create a sustainable and robust research program that promotes high-impact discovery and student training. I have a consistent record of obtaining competitive funding for my research. The first three years of my Ph.D. were supported by an NSF Graduate Research Fellowship, and the final portion of my doctoral work was funded by an AHA Predoctoral Fellowship. During my postdoctoral training, I served as the principal investigator on an NSF ACCESS Resource Award.

The medical and engineering components of this work are well aligned with the funding priorities of the NIH, particularly the NHLBI and NIBIB. In addition to traditional early-career R21 mechanisms, I will apply for the Trailblazer R21, which specifically supports high-risk, high-reward research at the intersection of life sciences and engineering. The interdisciplinary scope of Project 3 is particularly well suited to this funding mechanism.

I will then pursue R01 grants to obtain long-term support. In addition to standard R01 mechanisms, I will apply for the Stephen I. Katz Early Stage Investigator Research Project Grant, which funds innovative projects in new directions for early-stage investigators. Project 2, which integrates multi-scale, multi-cell models with high-impact experimental validation through collaborative work, is ideally suited to this mechanism.

As early progress validates these efforts, I will apply for R35 awards to expand my research program. Because my aims form a complementary ecosystem of mechanistic and translational projects, the MIRA R35 and NHLBI Emerging Investigator R35 mechanisms are particularly appropriate as next steps.

This research is also highly competitive for funding from private foundations, including the AHA, Additional Ventures, the Children’s Heart Foundation, and the Marfan Foundation. The clinical and pediatric focus of Aim 1 aligns well with the AV Single Ventricle Research Fund, the AHA Innovative Project Award, and the CHF Independent Research Award. Aims 2 and 3, which examine the genetic and biomechanical mechanisms of aneurysm progression, directly support the goals of the Marfan Foundation.

Finally, several aspects of this work will yield generalizable frameworks and computational tools valuable to the broader scientific community. To support these efforts, I will apply to funding programs that promote tool and infrastructure development, including the NSF Cyberinfrastructure for Sustained Scientific Innovation (CSSI) Program and the NIH R21/R01 Biomedical Technology Development and Dissemination (BTDD) mechanisms.

  </div>

</details>

<!--
Add collaboration section to each aim and tailor to specific institution.

---

## Selected References
1. Schwarz, E. L., *et al.* “Hemodynamic performance of tissue-engineered vascular grafts…” *NPJ Regenerative Medicine* (2021).  
2. Schwarz, E. L., *et al.* “A fluid–solid–growth solver for cardiovascular modeling.” *CMAME* (2023).  
3. Schwarz, E. L., *et al.* “Postnatal Pulmonary Artery Development from Transcript to Mechanics.” *In preparation* (2024).  
4. Schwarz, E. L., *et al.* “Optimal neural operators for forecasting thoracic aortic aneurysm growth.” *In preparation* (2025).

-->
