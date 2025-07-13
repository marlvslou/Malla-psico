const malla = [
  {
    año: 1,
    semestre: 1,
    ramos: [
      { id: "historia", nombre: "Historia de la psicología" },
      { id: "filosofia", nombre: "Fundamentos filosóficos de la psicología" },
      { id: "procesos", nombre: "Procesos psicológicos", desbloquea: ["social1", "ciclo1"] },
      { id: "psicobiologia", nombre: "Psicobiología" },
      { id: "taller1", nombre: "Taller de Bases del desarrollo profesional" },
      { id: "electivo1", nombre: "Electivo eje 1" }
    ]
  },
  {
    año: 1,
    semestre: 2,
    ramos: [
      { id: "sociologia", nombre: "Sociología" },
      { id: "social1", nombre: "Psicología social I", requiere: ["procesos"], desbloquea: ["ciclo2"] },
      { id: "ciclo1", nombre: "Ciclo vital I", requiere: ["procesos"], desbloquea: ["ciclo2"] },
      { id: "neuro", nombre: "Neurociencias" },
      { id: "taller2", nombre: "Taller de Razonamiento y argumentación" },
      { id: "electivo2", nombre: "Electivo eje 2" }
    ]
  },
  {
    año: 2,
    semestre: 1,
    ramos: [
      { id: "social2", nombre: "Psicología social II" },
      { id: "ciclo2", nombre: "Ciclo vital II", requiere: ["social1", "ciclo1"], desbloquea: ["temprana"] },
      { id: "metodos", nombre: "Paradigmas y métodos de investigación en psicología" },
      { id: "taller3", nombre: "Taller de relaciones humanas I" },
      { id: "electivo3", nombre: "Electivo eje 3" },
      { id: "linea1", nombre: "Electivo línea 1" }
    ]
  },
  {
    año: 2,
    semestre: 2,
    ramos: [
      { id: "personalidad", nombre: "Psicología de la personalidad" },
      { id: "cuantitativa", nombre: "Metodologías cuantitativas", desbloquea: ["psicopatologia", "cualitativa"] },
      { id: "taller4", nombre: "Taller de relaciones humanas II" },
      { id: "temprana", nombre: "Práctica Temprana", requiere: ["ciclo2"], desbloquea: ["psicopatologia", "cualitativa"] },
      { id: "linea2", nombre: "Electivo línea 2" }
    ]
  },
  {
    año: 3,
    semestre: 1,
    ramos: [
      { id: "educacional", nombre: "Psicología educacional" },
      { id: "psicopatologia", nombre: "Psicopatología", requiere: ["cuantitativa", "temprana"], desbloquea: ["psiquiatria"] },
      { id: "cognitiva", nombre: "Psicología cognitiva" },
      { id: "psicoanalitica", nombre: "Psicología psicoanalítica" },
      { id: "cualitativa", nombre: "Metodologías cualitativas", requiere: ["cuantitativa", "temprana"], desbloquea: ["psiquiatria"] },
      { id: "taller5", nombre: "Taller evaluación cognitiva" }
    ]
  },
  {
    año: 3,
    semestre: 2,
    ramos: [
      { id: "trabajo", nombre: "Psicología del trabajo" },
      { id: "psiquiatria", nombre: "Psiquiatría", requiere: ["psicopatologia", "cualitativa"], desbloquea: ["investigacion"] },
      { id: "sistemica", nombre: "Psicología sistémica" },
      { id: "humanista", nombre: "Psicología humanista existencial" },
      { id: "taller6", nombre: "Taller evaluación personalidad" },
      { id: "infantil", nombre: "Taller evaluación infantil" }
    ]
  },
  {
    año: 4,
    semestre: 1,
    ramos: [
      { id: "psicoterapia", nombre: "Introducción a la psicoterapia" },
      { id: "organizacionales", nombre: "Intervenciones organizacionales" },
      { id: "datos", nombre: "Estrategia de análisis de datos" },
      { id: "optativo1", nombre: "Optativo" },
      { id: "investigacion", nombre: "Taller de investigación", requiere: ["psiquiatria"], desbloquea: ["seminario"] }
    ]
  },
  {
    año: 4,
    semestre: 2,
    ramos: [
      { id: "optativo2", nombre: "Optativo" },
      { id: "optativo3", nombre: "Optativo" },
      { id: "optativo4", nombre: "Optativo" },
      { id: "seminario", nombre: "Seminario de grado", requiere: ["investigacion"], desbloquea: ["evaluacion"] },
      { id: "linea3", nombre: "Electivo línea 3" }
    ]
  },
  {
    año: 5,
    semestre: 1,
    ramos: [
      { id: "competencias", nombre: "Desarrollo de competencias laborales" },
      { id: "autocuidado", nombre: "Taller de autocuidado" },
      { id: "evaluacion", nombre: "Evaluación de proyectos", requiere: ["seminario"], desbloquea: ["practica"] },
      { id: "entrevista", nombre: "Taller de entrevista" },
      { id: "intervencion", nombre: "Intervención psicosocial" },
      { id: "optativo5", nombre: "Optativo" }
    ]
  },
  {
    año: 5,
    semestre: 2,
    ramos: [
      { id: "etica", nombre: "Taller de ética profesional" },
      { id: "practica", nombre: "Práctica profesional", requiere: ["evaluacion"] }
    ]
  }
];

const aprobados = JSON.parse(localStorage.getItem("ramosAprobados")) || [];

function renderMalla() {
  const container = document.getElementById("malla-container");
  container.innerHTML = "";

  malla.forEach((semestre) => {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>${semestre.año}° año - Semestre ${semestre.semestre}</h2>`;

    semestre.ramos.forEach((ramo) => {
      const ramoDiv = document.createElement("div");
      ramoDiv.className = "ramo";
      if (aprobados.includes(ramo.id)) ramoDiv.classList.add("aprobado");

      const nombre = document.createElement("span");
      nombre.textContent = ramo.nombre;

      const btn = document.createElement("button");
      btn.textContent = aprobados.includes(ramo.id)
        ? "Aprobado"
        : "Aprobar ramo";
      btn.disabled =
        aprobados.includes(ramo.id) ||
        (ramo.requiere &&
          !ramo.requiere.every((req) => aprobados.includes(req)));

      btn.onclick = () => {
        aprobados.push(ramo.id);
        localStorage.setItem("ramosAprobados", JSON.stringify(aprobados));
        renderMalla();
      };

      ramoDiv.appendChild(nombre);
      ramoDiv.appendChild(btn);
      div.appendChild(ramoDiv);
    });

    container.appendChild(div);
  });
}

renderMalla();
