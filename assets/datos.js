/* =====================================================================
   DATOS DEL SITIO — Cátedra de Mecanismos (FI-UNSJ)
   ---------------------------------------------------------------------
   Este es el único archivo que hace falta editar para mantener el sitio.
   La cátedra dicta dos materias:
     "mecanismos" → Mecanismos (Ingeniería Mecánica)
     "mcr"        → Mecánica del Cuerpo Rígido (Ingeniería Industrial)
   - Para agregar un apunte: copiá el PDF a la carpeta /apuntes y sumá
     una línea en APUNTES (abajo), indicando materia y unidad.
   - Para agregar una herramienta: copiá el HTML a /herramientas y sumá
     un bloque en HERRAMIENTAS.
   - Para agregar un término al glosario: sumá un bloque en GLOSARIO.
   Respetá las comas y comillas: cada bloque { ... } termina en coma.
   ===================================================================== */

const SITIO = {
  catedra: "Mecanismos",
  facultad: "Facultad de Ingeniería",
  universidad: "Universidad Nacional de San Juan",
  // Portada del campus virtual (cada materia tiene además su propia aula, en MATERIAS)
  moodle: "https://campusvirtual.unsj.edu.ar/",
  desarrollo: "Ing. Manuel Galdeano Ruiz",
  anio: 2026
};

const EQUIPO = [
  { nombre: "Ing. Manuel Galdeano Ruiz", cargo: "Profesor a cargo" },
  { nombre: "Ing. Emiliano Porras", cargo: "Jefe de Trabajos Prácticos" },
  { nombre: "María Luz López González", cargo: "Ayudante" }
];

/* ---------- MATERIAS Y PROGRAMAS ---------- */
const MATERIAS = [
  {
    id: "mecanismos",
    nombre: "Mecanismos", sigla: "MEC",
    carrera: "Ingeniería Mecánica",
    codigo: "2764", plan: "2023", semestre: "7.º", cargaTotal: "70 h", cargaSemanal: "5 h",
    moodle: "https://campusvirtual.unsj.edu.ar/course/view.php?id=4076",   // aula de esta materia
    descripcion: "Geometría, síntesis, cinemática y dinámica de los mecanismos articulados planos, transmisión del movimiento de rotación y mecanismos de levas.",
    archivo: "apuntes/planificacion-mecanismos-2026.pdf",
    semanas: 14,
    unidades: [
      { n: 1, corto: "Geometría", titulo: "Geometría de los mecanismos articulados planos", horas: 9, semanas: [1, 2],
        resumen: "Pares cinemáticos, grados de libertad y ley de Grashof. Movimientos posibles del cuadrilátero y de la biela-manivela. Curvas de acoplamiento y mecanismos equivalentes.",
        temas: [
          ["1.1", "Definición de pares cinemáticos."],
          ["1.1.2", "Grado de libertad. Clasificación de los mecanismos planos según los grados de libertad."],
          ["1.1.3", "Ley de Grashof. Movimientos posibles: manivela-balancín, doble manivela, doble balancín, biela-manivela, manivela-corredera. Análisis de posición. Aplicaciones."],
          ["1.2", "Curvas de acoplamiento."],
          ["1.2.1", "Teorema de Roberts-Chebyshev. Mecanismos equivalentes."]
        ] },
      { n: 2, corto: "Síntesis", titulo: "Síntesis de mecanismos articulados planos", horas: 9, semanas: [3, 4],
        resumen: "Síntesis por generación de funciones, de trayectorias y guiado de cuerpo rígido, por métodos analíticos (Freudenstein, Bloch) y gráficos (polo, inversión, reducción de posiciones).",
        temas: [
          ["2.1", "Definición. Distintos tipos de síntesis."],
          ["2.2", "Síntesis por generación de funciones. Introducción."],
          ["2.2.1", "Ecuaciones de Freudenstein y de Bloch. Método de 3 puntos de precisión. Aplicaciones."],
          ["2.2.2", "Métodos gráficos: polo, polo relativo, inversión, reducción de posiciones, tanteo gráfico, ángulo de transmisión máximo y mínimo."],
          ["2.3", "Síntesis por generación de trayectorias. Propiedades de las curvas del acoplador."],
          ["2.3.1", "Métodos gráficos con tres, cuatro y cinco puntos de precisión. Trayectorias simétricas, con puntos dobles, cúspides, tramos casi rectilíneos o casi circulares, con detención."],
          ["2.4", "Guiado de biela o cuerpo rígido. Método del polo, 3 y 4 posiciones de precisión, método analítico por ecuación de diseño."]
        ] },
      { n: 3, corto: "Cinemática", titulo: "Cinemática de los mecanismos articulados planos", horas: 11, semanas: [5, 6, 7],
        resumen: "Velocidades y aceleraciones por polígonos e imágenes, centros instantáneos de rotación y teorema de Aronhold-Kennedy, y sus equivalentes analíticos.",
        temas: [
          ["3.1", "Velocidades por métodos gráficos. Polígonos e imagen de velocidades."],
          ["3.1.1", "Centro instantáneo de rotación. Teorema de los tres centros de Aronhold-Kennedy. Velocidades por centros instantáneos."],
          ["3.1.2", "Velocidades por métodos analíticos. Aplicaciones."],
          ["3.2", "Aceleraciones por métodos gráficos. Polígonos e imágenes de aceleraciones."],
          ["3.2.1", "Aceleraciones por métodos analíticos. Aplicaciones."]
        ] },
      { n: 4, corto: "Estática y dinámica", titulo: "Estática y dinámica de los mecanismos articulados planos", horas: 5, semanas: [8, 9],
        resumen: "Diagramas de cuerpo libre, rozamiento en uniones, fuerzas y cuplas de inercia, masas equivalentes, reducción dinámica y cálculo del volante.",
        temas: [
          ["4.1", "Diagramas de cuerpo libre. Fuerzas y cuplas en un mecanismo articulado plano."],
          ["4.2", "Rozamiento en uniones giratorias y deslizantes. Análisis de fuerzas con rozamiento."],
          ["4.3", "Fuerzas y cuplas de inercia. Método de las masas equivalentes. Fuerzas totales."],
          ["4.4", "Energía cinética. Reducción dinámica de una máquina. Variaciones cíclicas de la velocidad. Cálculo del volante."]
        ] },
      { n: 5, corto: "Transmisión por contacto", titulo: "Mecanismos para la transmisión del movimiento de rotación", horas: 9, semanas: [10, 11],
        resumen: "Palancas rodantes con rodadura pura o con deslizamiento: perfiles conjugados, ruedas y conos de fricción, levas y engranajes. La evolvente de círculo.",
        temas: [
          ["5.1", "Palancas rodantes con rodadura pura y relación de velocidades variable. Condiciones de rodadura."],
          ["5.1.2", "Perfiles conjugados. Perfiles derivados, perfiles elípticos. Aplicaciones."],
          ["5.2", "Rodadura pura con relación de velocidades constante. Ruedas y conos de fricción."],
          ["5.3", "Palancas rodantes con deslizamiento y relación variable. Levas."],
          ["5.4.1", "Engranajes: circunferencias primitivas, ley de engrane, trazado gráfico de perfiles conjugados."],
          ["5.4.2", "Línea de engrane. Ángulo de presión."],
          ["5.4.3", "La evolvente de círculo. La función evolvente. Acciones recíprocas entre evolventes."]
        ] },
      { n: 6, corto: "Levas", titulo: "Mecanismos de levas", horas: 7, semanas: [12, 13],
        resumen: "Tipos de levas, seguidores y cierres; diagramas de desplazamiento, velocidad, aceleración y choque; trazado del perfil, ángulo de presión, cruz de Malta y trinquetes.",
        temas: [
          ["6.1", "Componentes básicos. Tipos de levas, cierres y seguidores."],
          ["6.2", "Diagramas de desplazamiento, velocidad, aceleración y choque."],
          ["6.2.1", "Movimientos normalizados: velocidad constante, aceleración constante, armónico simple, cicloidal. Levas polinómicas."],
          ["6.3", "Trazado gráfico del perfil. Geometría de las levas radiales."],
          ["6.4", "Ángulo de presión y su valor máximo."],
          ["6.5.1", "Tamaño mínimo de levas con seguidor de cara plana."],
          ["6.6", "Cruz de Malta. Trinquete, retención y retroceso."],
          ["6.7", "Fuerzas y cuplas en los mecanismos de levas."]
        ] }
    ],
    evaluacion: "Dos trabajos prácticos grupales (síntesis y uso de software) y tres Pruebas Integradoras Parciales (PIP), escritas, con temas teóricos y prácticos. Resultado: Bueno, Suficiente o Reprobado. Cada PIP tiene un recuperatorio dentro de la semana siguiente. Con todas las PIP aprobadas se accede a la evaluación integradora final, oral y teórica.",
    fechas: [
      { nombre: "PIP 1", fecha: "20/04" },
      { nombre: "PIP 2", fecha: "15/05" },
      { nombre: "PIP 3", fecha: "10/06" }
    ],
    horarios: []
  },
  {
    id: "mcr",
    nombre: "Mecánica del Cuerpo Rígido", sigla: "MCR",
    carrera: "Ingeniería Industrial",
    codigo: "8424", plan: "2025", semestre: "3.º", cargaTotal: "70 h", cargaSemanal: "5 h",
    moodle: "https://campusvirtual.unsj.edu.ar/course/view.php?id=4009",
    descripcion: "Cinemática y cinética plana del cuerpo rígido, mecanismos articulados, transmisiones por correas, cadenas, engranajes y levas, frenos, embragues y acoplamientos, y vibraciones.",
    archivo: "apuntes/planificacion-mcr-2026.pdf",
    semanas: 0,
    unidades: [
      { n: 1, corto: "Cuerpo rígido", titulo: "Cinemática y cinética plana del cuerpo rígido", horas: 15,
        resumen: "Traslación, rotación y movimiento plano general del cuerpo rígido; posición, velocidad y aceleración con ejes en traslación y en rotación; centro instantáneo; ecuaciones de movimiento.",
        temas: [
          ["1.1", "Cinemática plana de un cuerpo rígido. Traslación, rotación y movimiento plano general con ejes en traslación. Posición, velocidad y aceleración. Centro instantáneo de rotación. Movimiento plano general con ejes en traslación y rotación."],
          ["1.2", "Cinética plana de un cuerpo rígido. Ecuaciones de movimiento de traslación, de rotación y de movimiento plano general."]
        ] },
      { n: 2, corto: "Mecanismos articulados", titulo: "Geometría, cinemática y cinética de los mecanismos articulados", horas: 15,
        resumen: "Movilidad y geometría de la biela-manivela, manivela-balancín, doble manivela y manivela-corredera; velocidades y aceleraciones por diagramas vectoriales; fuerzas y potencia.",
        temas: [
          ["2.1", "Geometría de los mecanismos articulados planos. Definiciones. Movilidad. Biela-manivela, manivela-balancín, doble manivela y manivela-corredera."],
          ["2.2", "Cinemática de los mecanismos articulados planos. Velocidades y aceleraciones. Centro instantáneo de velocidad. Diagramas vectoriales. Imagen de velocidades y aceleraciones."],
          ["2.3", "Cinética de los mecanismos articulados planos. Diagramas de cuerpo libre y cinético. Análisis de fuerzas. Cálculo de potencia."]
        ] },
      { n: 3, corto: "Transmisiones", titulo: "Transmisión por correas, cadenas, engranajes y levas", horas: 15,
        resumen: "Transmisión por superficies en contacto, órganos flexibles (correas y cadenas) y rígidos (engranajes), y mecanismos de levas.",
        temas: [
          ["3.1", "Transmisión de movimiento por superficies en contacto. Distintos casos."],
          ["3.2", "Transmisión de potencia por órganos flexibles. Correas. Cadenas."],
          ["3.3", "Transmisión por órganos rígidos. Engranajes: teoría de engrane, perfiles conjugados, relación de transmisión, normalización, interferencia, cálculo de ruedas dentadas. Engranajes helicoidales y cónicos."],
          ["3.4", "Mecanismos de levas. Clasificación. Movimientos normalizados. Cinemática. Cinética. Diseño de un mecanismo de levas."]
        ] },
      { n: 4, corto: "Frenos y embragues", titulo: "Frenos, embragues y acoplamientos", horas: 5,
        resumen: "Freno de zapata y de cinta, embrague de disco, calor generado y materiales; acoplamientos rígidos, flexibles y uniones universales.",
        temas: [
          ["4.1", "Freno y embrague. Análisis elemental. Freno de zapata. Embrague de disco. Freno de cinta. Calor generado y enfriamiento. Materiales."],
          ["4.2", "Acoplamientos rígidos y flexibles. Uniones universales."]
        ] },
      { n: 5, corto: "Vibraciones", titulo: "Vibraciones y amortiguamiento", horas: 5,
        resumen: "Vibraciones en máquinas, vibración libre y forzada, transmisibilidad y amortiguamiento.",
        temas: [
          ["5.1", "Vibraciones en máquinas. Deformaciones elásticas en ejes."],
          ["5.2", "Vibración libre y forzada. Vibración natural. Ecuaciones diferenciales de segundo orden."],
          ["5.3", "Transmisibilidad del movimiento."],
          ["5.4", "Amortiguamiento. Ecuaciones diferenciales de segundo orden."]
        ] }
    ],
    evaluacion: "Un trabajo práctico grupal y dos Pruebas Integradoras Parciales (PIP), escritas, con temas teóricos y prácticos. Resultado: Bueno, Suficiente o Reprobado. Cada PIP tiene un recuperatorio dentro de la semana siguiente. Con todas las PIP aprobadas se accede a la evaluación integradora final, oral y teórica.",
    fechas: [
      { nombre: "PIP 1", fecha: "04/05" },
      { nombre: "Recuperatorio 1", fecha: "21/05" },
      { nombre: "PIP 2", fecha: "16/06" },
      { nombre: "Recuperatorio 2", fecha: "24/06" }
    ],
    horarios: [
      { tipo: "Clases", dias: ["Lunes 8:00 – 10:30", "Martes 10:30 – 13:00"] },
      { tipo: "Consultas", dias: ["Miércoles 10:00 – 12:00", "Jueves 10:00 – 12:00"] }
    ]
  }
];

/* ---------- HERRAMIENTAS ----------
   unidades: en qué unidades de cada materia se usa la herramienta          */
const HERRAMIENTAS = [
  { id: "mecalab", nombre: "MECALAB", marca: ["MECA", "LAB"],
    lema: "Mecanismos: análisis y síntesis",
    archivo: "herramientas/mecalab.html",
    unidades: { mecanismos: [1, 2, 3], mcr: [2] },
    descripcion: "Construí un cuadrilátero articulado, una biela-manivela-corredera o una corredera oscilante, animalo y resolvé su cinemática trazando vos mismo los polígonos de velocidades y aceleraciones. Incluye síntesis de mecanismos y un modo de evaluación que genera un reporte en PDF.",
    funciones: ["Diseño del mecanismo por tabla o dibujo", "Polígonos de velocidades y aceleraciones", "Centros instantáneos de rotación", "Gráficas de posición, velocidad y aceleración", "Síntesis de mecanismos", "Evaluación con reporte PDF"],
    nota: "Se abre en pantalla completa." },
  { id: "contactlab", nombre: "CONTACTLAB", marca: ["CONTACT", "LAB"],
    lema: "Transmisión por contacto directo",
    archivo: "herramientas/contactlab.html",
    unidades: { mecanismos: [5, 6], mcr: [3] },
    descripcion: "Láminas interactivas de transmisión por contacto: ley general del contacto, ruedas y conos de fricción, evolvente y dentado de engranajes, trenes de engranajes y levas, con lectura de valores en vivo y modo práctica.",
    funciones: ["Ley general del contacto", "Ruedas y conos de fricción", "Evolvente, dentado e interferencia", "Trenes de engranajes", "Levas: construcción, SVA y cinética", "Modo práctica"],
    nota: "" }
];

/* ---------- APUNTES ----------
   materia: "mecanismos", "mcr" o "ambas"
   unidad:  número de unidad de esa materia (0 = material general)
   archivo: ruta al PDF dentro de /apuntes                                  */
const APUNTES = [
  { titulo: "Planificación 2026 — Mecanismos", materia: "mecanismos", unidad: 0, archivo: "apuntes/planificacion-mecanismos-2026.pdf", tipo: "PDF", paginas: 10 },
  { titulo: "Planificación 2026 — Mecánica del Cuerpo Rígido", materia: "mcr", unidad: 0, archivo: "apuntes/planificacion-mcr-2026.pdf", tipo: "PDF", paginas: 9 },
  { titulo: "Cinematica - Análisis de velocidad en Mecanismos", materia: "mecanismos", unidad: 3, archivo: "apuntes/MAP_velocidad.pptx", tipo: "PPT", paginas: 27 },
  { titulo: "Cinematica - Análisis de aceleracion en Mecanismos", materia: "mecanismos", unidad: 3, archivo: "apuntes/MAP_aceleracion.pptx", tipo: "PPT", paginas: 16 },
  { titulo: "Cinematica - Análisis de posicion en Mecanismos", materia: "mecanismos", unidad: 3, archivo: "apuntes/MAP_posicion.pptx", tipo: "PPT", paginas: 28 },
  { titulo: "Cinematica - Ejercicios resueltos en forma grafica y analitica de Mecanismos", materia: "mecanismos", unidad: 3, archivo: "apuntes/MAP_ejercicios.pdf", tipo: "PDF", paginas: 30 },
  { titulo: "Diseño de Levas", materia: "mecanismos", unidad: 6, archivo: "apuntes/Levas_v211123.pdf", tipo: "Pdf", paginas: 63 },
  { titulo: "Dinamica en Mecanismos", materia: "mecanismos", unidad: 4, archivo: "apuntes/Dinamica_MAP.pdf", tipo: "PDF", paginas: 38 },
  { titulo: "Transmision de movimiento por contacto directo entre superficies", materia: "mecanismos", unidad: 5, archivo: "apuntes/Contacto_Directo.pdf", tipo: "Pdf", paginas: 49 },
// Ejemplo para agregar un apunte:
  // { titulo: "Velocidades por polígonos", materia: "mecanismos", unidad: 3, archivo: "apuntes/u3-velocidades.pdf", tipo: "PDF", paginas: 18 },
];

/* ---------- GLOSARIO ----------
   id:    identificador sin espacios ni acentos (se usa en los enlaces)
   u:     unidad de Mecanismos (0 si no corresponde)
   mcr:   unidad de Mecánica del Cuerpo Rígido (0 si no corresponde)
   app:   herramienta donde se puede ver (opcional)
   ver:   ids de términos relacionados (opcional)
   f:     fórmula o expresión destacada (opcional)                         */
const GLOSARIO = [
  { id: "eslabon", t: "Eslabón", u: 1, mcr: 2,
    d: "Cuerpo, que se supone rígido, con al menos dos nodos o elementos de unión que lo conectan con otros eslabones. Según cuántos nodos tenga se llama binario, ternario, cuaternario, etc.",
    ver: ["par-cinematico", "cadena-cinematica"] },
  { id: "par-cinematico", t: "Par cinemático", u: 1, mcr: 2,
    d: "Unión entre dos eslabones que permite cierto movimiento relativo y restringe el resto. Se llama <b>par inferior</b> cuando el contacto es superficial (articulación o pasador, corredera) y <b>par superior</b> cuando es puntual o lineal (leva y seguidor, dientes de engranajes).",
    ver: ["eslabon", "grados-de-libertad"] },
  { id: "cadena-cinematica", t: "Cadena cinemática", u: 1, mcr: 2,
    d: "Conjunto de eslabones unidos por pares cinemáticos. Al fijar uno de los eslabones, que pasa a ser el bastidor, la cadena se convierte en un mecanismo.",
    ver: ["inversion-cinematica", "eslabon"] },
  { id: "grados-de-libertad", t: "Grados de libertad (movilidad)", u: 1, mcr: 2,
    f: "M = 3(n − 1) − 2·j₁ − j₂",
    d: "Número de parámetros independientes que definen la posición del mecanismo. En el plano se estima con el criterio de Kutzbach-Grübler, donde n es el número de eslabones (incluido el bastidor), j₁ los pares de un grado de libertad y j₂ los de dos. M = 1: mecanismo; M = 0: estructura; M &lt; 0: estructura hiperestática.",
    ver: ["par-cinematico", "ley-de-grashof"] },
  { id: "ley-de-grashof", t: "Ley de Grashof", u: 1, mcr: 2, app: "mecalab",
    f: "s + l ≤ p + q",
    d: "Condición que predice el movimiento de un cuadrilátero articulado a partir de sus longitudes: s es el eslabón más corto, l el más largo y p, q los otros dos. Si se cumple, al menos un eslabón puede dar vueltas completas, y el tipo de movimiento depende de cuál sea el bastidor: manivela-balancín, doble manivela o doble balancín. Si no se cumple, ningún eslabón da la vuelta completa (triple balancín).",
    ver: ["cuadrilatero-articulado", "manivela"] },
  { id: "cuadrilatero-articulado", t: "Cuadrilátero articulado", u: 1, mcr: 2, app: "mecalab",
    d: "Mecanismo plano de cuatro eslabones (bastidor, manivela, acoplador y balancín) unidos por cuatro articulaciones. Es el mecanismo de un grado de libertad más simple y la base de la mayor parte de la síntesis de mecanismos.",
    ver: ["ley-de-grashof", "curva-de-acoplador", "angulo-de-transmision"] },
  { id: "manivela", t: "Manivela, balancín y biela", u: 1, mcr: 2,
    d: "Nombres de los eslabones según su movimiento. La <b>manivela</b> pivota en el bastidor y da vueltas completas; el <b>balancín</b> pivota en el bastidor y oscila; la <b>biela</b> o acoplador no tiene pivotes fijos y realiza un movimiento plano general.",
    ver: ["cuadrilatero-articulado", "biela-manivela-corredera"] },
  { id: "biela-manivela-corredera", t: "Biela-manivela-corredera", u: 1, mcr: 2, app: "mecalab",
    d: "Mecanismo que transforma la rotación de una manivela en traslación alternativa de una corredera, a través de una biela. Puede ser centrado o con excentricidad entre el eje de la manivela y la guía. Es la base de motores y compresores alternativos.",
    ver: ["manivela", "inversion-cinematica"] },
  { id: "curva-de-acoplador", t: "Curva de acoplador", u: 1, mcr: 0,
    d: "Trayectoria que describe un punto cualquiera del acoplador de un cuadrilátero articulado. Para el cuadrilátero es una curva algebraica de sexto grado, y su forma varía mucho según la posición del punto: puede tener cúspides, puntos dobles, tramos casi rectos o casi circulares.",
    ver: ["roberts-chebyshev", "generacion-de-trayectorias"] },
  { id: "roberts-chebyshev", t: "Teorema de Roberts-Chebyshev", u: 1, mcr: 0,
    d: "Establece que una misma curva de acoplador puede ser generada por tres cuadriláteros articulados distintos, llamados cognados. Permite reemplazar un mecanismo por otro equivalente con mejores dimensiones, ángulos de transmisión o ubicación de pivotes.",
    ver: ["curva-de-acoplador"] },
  { id: "inversion-cinematica", t: "Inversión cinemática", u: 2, mcr: 0,
    d: "Mecanismo que se obtiene al fijar un eslabón distinto de la misma cadena cinemática. El movimiento relativo entre eslabones no cambia, pero sí el absoluto. En síntesis gráfica se usa para transformar un problema de posiciones del acoplador en uno de posiciones del pivote.",
    ver: ["cadena-cinematica", "polo"] },
  { id: "sintesis", t: "Síntesis de mecanismos", u: 2, mcr: 0, app: "mecalab",
    d: "Proceso de diseñar un mecanismo que cumpla un movimiento requerido. Se distingue la síntesis de <b>tipo</b> (qué clase de mecanismo), de <b>número</b> (cuántos eslabones y pares) y <b>dimensional</b> (longitudes y posiciones de pivotes). Las tareas clásicas son generación de funciones, de trayectorias y guiado de cuerpo rígido.",
    ver: ["generacion-de-funciones", "generacion-de-trayectorias", "guiado-de-cuerpo-rigido"] },
  { id: "generacion-de-funciones", t: "Generación de funciones", u: 2, mcr: 0,
    d: "Tarea de síntesis en la que el ángulo del eslabón de salida debe seguir una relación prescrita con el ángulo del eslabón de entrada, ψ = f(φ), al menos en algunos puntos de precisión.",
    ver: ["ecuacion-de-freudenstein", "puntos-de-precision"] },
  { id: "generacion-de-trayectorias", t: "Generación de trayectorias", u: 2, mcr: 0,
    d: "Tarea de síntesis en la que un punto del acoplador debe pasar por una sucesión de puntos dados, sin importar la orientación del acoplador en cada uno.",
    ver: ["curva-de-acoplador", "puntos-de-precision"] },
  { id: "guiado-de-cuerpo-rigido", t: "Guiado de cuerpo rígido", u: 2, mcr: 0,
    d: "También llamado generación de movimiento. El acoplador debe ocupar posiciones dadas, cada una definida por la ubicación de un punto y la orientación del cuerpo. Se resuelve gráficamente con dos o tres posiciones, por ejemplo con el método del polo.",
    ver: ["polo", "sintesis"] },
  { id: "ecuacion-de-freudenstein", t: "Ecuación de Freudenstein", u: 2, mcr: 0,
    f: "K₁·cos θ₄ − K₂·cos θ₂ + K₃ = cos(θ₂ − θ₄)",
    d: "Relación de posición del cuadrilátero entre el ángulo de entrada θ₂ y el de salida θ₄, con K₁ = d/a, K₂ = d/c y K₃ = (a² − b² + c² + d²)/(2ac), siendo a la manivela, b el acoplador, c el balancín y d el bastidor. Planteada en tres puntos de precisión da un sistema lineal en K₁, K₂, K₃ que resuelve la generación de funciones.",
    ver: ["generacion-de-funciones", "puntos-de-precision"] },
  { id: "puntos-de-precision", t: "Puntos de precisión", u: 2, mcr: 0,
    d: "Posiciones en las que el mecanismo sintetizado cumple exactamente la condición pedida; entre ellos hay un error estructural. Para reducir ese error en generación de funciones suele usarse el espaciado de Chebyshev.",
    ver: ["generacion-de-funciones", "ecuacion-de-freudenstein"] },
  { id: "polo", t: "Polo (de desplazamiento)", u: 2, mcr: 0,
    d: "Punto fijo alrededor del cual un cuerpo que se mueve en el plano puede llevarse de una posición a otra con una sola rotación. Se halla con las mediatrices de los segmentos que unen las posiciones homólogas de dos puntos del cuerpo, y es la base de varios métodos gráficos de síntesis.",
    ver: ["guiado-de-cuerpo-rigido", "centro-instantaneo"] },
  { id: "angulo-de-transmision", t: "Ángulo de transmisión", u: 2, mcr: 0, app: "mecalab",
    d: "Ángulo entre el acoplador y el balancín de salida. Mide qué tan bien se transmite la fuerza: cuanto más cerca de 90°, mejor. En la práctica se recomienda que no baje de unos 40° en todo el ciclo.",
    ver: ["cuadrilatero-articulado", "angulo-de-presion-leva"] },
  { id: "centro-instantaneo", t: "Centro instantáneo de rotación", u: 3, mcr: 1, app: "mecalab",
    d: "Punto, común a dos cuerpos con movimiento plano relativo, que en ese instante tiene la misma velocidad en ambos. Para un cuerpo respecto al bastidor es el punto de velocidad nula, alrededor del cual el cuerpo parece girar. Un mecanismo de n eslabones tiene n(n − 1)/2 centros instantáneos.",
    ver: ["aronhold-kennedy", "poligono-de-velocidades"] },
  { id: "aronhold-kennedy", t: "Teorema de Aronhold-Kennedy", u: 3, mcr: 2,
    d: "Los tres centros instantáneos de tres cuerpos con movimiento plano relativo están alineados sobre una misma recta. Permite encontrar los centros que no son evidentes a partir de los que se ubican por inspección.",
    ver: ["centro-instantaneo"] },
  { id: "poligono-de-velocidades", t: "Polígono de velocidades", u: 3, mcr: 2, app: "mecalab",
    d: "Construcción gráfica de la ecuación V_B = V_A + V_BA dibujada a escala desde un polo común. Cada segmento desde el polo es una velocidad absoluta y cada segmento entre puntas es una velocidad relativa, perpendicular al eslabón que une los dos puntos. La figura que forman los puntos de un mismo eslabón en el polígono es su <b>imagen de velocidades</b>, semejante al eslabón y girada 90°.",
    ver: ["poligono-de-aceleraciones", "centro-instantaneo"] },
  { id: "poligono-de-aceleraciones", t: "Polígono de aceleraciones", u: 3, mcr: 2, app: "mecalab",
    f: "aₙ = ω²·r   ·   aₜ = α·r",
    d: "Construcción gráfica de las ecuaciones de aceleración relativa. Cada aceleración relativa tiene una componente normal, dirigida hacia el centro de rotación relativa y conocida a partir de las velocidades, y una componente tangencial, perpendicular al eslabón. Si hay deslizamiento sobre una guía móvil se agrega la aceleración de Coriolis.",
    ver: ["poligono-de-velocidades", "coriolis"] },
  { id: "coriolis", t: "Aceleración de Coriolis", u: 3, mcr: 1,
    f: "a_c = 2·ω × v_rel",
    d: "Componente de aceleración que aparece cuando un punto se desliza sobre un eslabón que gira. Es perpendicular a la velocidad relativa de deslizamiento, y su sentido se obtiene girando v_rel 90° en el sentido de ω. Es clave en mecanismos con corredera oscilante.",
    ver: ["poligono-de-aceleraciones"] },
  { id: "dalembert", t: "Principio de d'Alembert", u: 4, mcr: 1,
    f: "F_i = −m·a_G   ·   M_i = −I_G·α",
    d: "Permite tratar un problema dinámico como uno estático, agregando a cada eslabón una fuerza de inercia opuesta a la aceleración de su centro de masa y una cupla de inercia opuesta a su aceleración angular.",
    ver: ["masas-equivalentes", "volante"] },
  { id: "circulo-de-rozamiento", t: "Círculo de rozamiento", u: 4, mcr: 0,
    f: "ρ = r·sen φ ≈ μ·r",
    d: "En una articulación con rozamiento, la reacción entre perno y buje deja de pasar por el centro y queda tangente a un círculo de radio ρ, donde r es el radio del perno y φ el ángulo de rozamiento. La reacción se ubica del lado que se opone al giro relativo.",
    ver: ["dalembert"] },
  { id: "masas-equivalentes", t: "Masas equivalentes", u: 4, mcr: 0,
    d: "Método que reemplaza un eslabón por masas concentradas en algunos de sus puntos, de modo que conserven la masa total, la posición del centro de masa y, si se busca equivalencia dinámica completa, el momento de inercia. Simplifica el cálculo de fuerzas de inercia, por ejemplo en la biela de un motor.",
    ver: ["dalembert"] },
  { id: "volante", t: "Volante", u: 4, mcr: 0,
    f: "I = ΔE / (δ·ω²_med)   ·   δ = (ω_max − ω_min)/ω_med",
    d: "Rueda de gran inercia que almacena y devuelve energía para limitar las variaciones cíclicas de velocidad de una máquina. Se dimensiona a partir de la máxima fluctuación de energía ΔE en el ciclo y del coeficiente de fluctuación δ admisible.",
    ver: ["dalembert"] },
  { id: "rodadura-pura", t: "Rodadura pura", u: 5, mcr: 3, app: "contactlab",
    d: "Contacto entre dos cuerpos sin deslizamiento: los puntos en contacto tienen la misma velocidad. Requiere que el punto de contacto esté sobre la línea de centros. Es el principio de las ruedas y conos de fricción y de las palancas rodantes.",
    ver: ["ruedas-de-friccion", "ley-general-del-contacto"] },
  { id: "ley-general-del-contacto", t: "Ley general del contacto", u: 5, mcr: 3, app: "contactlab",
    f: "ω₂ / ω₄ = O₄M / O₂M",
    d: "En dos cuerpos que se transmiten movimiento por contacto directo, la relación de velocidades angulares es inversa a la relación de distancias desde los centros de giro hasta M, el punto donde la normal común corta la línea de centros. Para que la relación sea constante, M debe ser fijo.",
    ver: ["ley-de-engrane", "rodadura-pura"] },
  { id: "ruedas-de-friccion", t: "Ruedas y conos de fricción", u: 5, mcr: 3, app: "contactlab",
    d: "Transmisiones por rodadura pura con relación de velocidades constante. Las ruedas cilíndricas vinculan ejes paralelos y los conos, ejes que se cortan. Transmiten por la fuerza de rozamiento en el contacto, por lo que necesitan una fuerza de apriete.",
    ver: ["rodadura-pura"] },
  { id: "perfiles-conjugados", t: "Perfiles conjugados", u: 5, mcr: 3,
    d: "Par de perfiles que, al estar en contacto, transmiten el movimiento con una relación de velocidades determinada. Dado un perfil, el conjugado se puede trazar gráficamente imponiendo la ley del contacto en cada posición.",
    ver: ["ley-de-engrane", "evolvente"] },
  { id: "ley-de-engrane", t: "Ley de engrane", u: 5, mcr: 3, app: "contactlab",
    d: "Para que dos engranajes transmitan una relación de velocidades constante, la normal común a los perfiles en el punto de contacto debe pasar siempre por un punto fijo de la línea de centros: el punto primitivo.",
    ver: ["ley-general-del-contacto", "circunferencia-primitiva", "linea-de-engrane"] },
  { id: "circunferencia-primitiva", t: "Circunferencia primitiva", u: 5, mcr: 3,
    f: "d = m·z",
    d: "Circunferencias que ruedan entre sí sin deslizar, tangentes en el punto primitivo. Equivalen a dos ruedas de fricción con la misma relación de transmisión. Su diámetro es el producto del módulo m por el número de dientes z.",
    ver: ["ley-de-engrane", "ruedas-de-friccion"] },
  { id: "linea-de-engrane", t: "Línea de engrane y ángulo de presión", u: 5, mcr: 3, app: "contactlab",
    d: "En engranajes de evolvente, todos los puntos de contacto caen sobre una recta fija, tangente a las dos circunferencias base: la línea de engrane o de acción. El ángulo que forma con la tangente común a las primitivas es el ángulo de presión, normalmente 20°.",
    ver: ["evolvente", "interferencia"] },
  { id: "evolvente", t: "Evolvente de círculo", u: 5, mcr: 3, app: "contactlab",
    f: "inv φ = tan φ − φ",
    d: "Curva que describe el extremo de un hilo tenso que se desenrolla de una circunferencia, llamada circunferencia base. Es el perfil de diente más usado: cumple la ley de engrane y mantiene la relación de transmisión aunque varíe un poco la distancia entre centros. La función evolvente da el ángulo polar del perfil para un ángulo de presión φ.",
    ver: ["linea-de-engrane", "ley-de-engrane"] },
  { id: "interferencia", t: "Interferencia", u: 5, mcr: 3, app: "contactlab",
    d: "Situación en la que la punta de un diente intenta hacer contacto por debajo de la circunferencia base del otro, donde no hay evolvente. Aparece con piñones de pocos dientes; se evita aumentando el número de dientes, el ángulo de presión o con corrección del dentado.",
    ver: ["evolvente", "linea-de-engrane"] },
  { id: "leva", t: "Leva y seguidor", u: 6, mcr: 3, app: "contactlab",
    d: "Par superior en el que la leva, con un perfil diseñado, impone al seguidor un movimiento programado. Las levas pueden ser de disco, de cuña o cilíndricas; los seguidores, de punta, de rodillo o de cara plana, con movimiento de traslación u oscilación. El contacto se mantiene por cierre de fuerza (resorte) o de forma (ranura).",
    ver: ["diagrama-sva", "angulo-de-presion-leva"] },
  { id: "diagrama-sva", t: "Diagramas de desplazamiento, velocidad, aceleración y choque", u: 6, mcr: 3, app: "contactlab",
    d: "Gráficas del movimiento del seguidor en función del ángulo de la leva: desplazamiento s, velocidad v, aceleración a y choque o sobreaceleración j. Las discontinuidades en la aceleración producen choques infinitos teóricos, que generan vibración y desgaste.",
    ver: ["movimiento-cicloidal", "leva"] },
  { id: "movimiento-cicloidal", t: "Movimiento cicloidal", u: 6, mcr: 3,
    f: "s = h·(θ/β − sen(2πθ/β)/(2π))",
    d: "Ley de movimiento del seguidor con aceleración senoidal que empieza y termina en cero, por lo que no tiene discontinuidades de aceleración. Es una buena opción para altas velocidades, frente al armónico simple o al de aceleración constante.",
    ver: ["diagrama-sva"] },
  { id: "angulo-de-presion-leva", t: "Ángulo de presión (levas)", u: 6, mcr: 3, app: "contactlab",
    d: "Ángulo entre la normal común en el contacto y la dirección del movimiento del seguidor. Si es grande, aumenta la fuerza lateral y el seguidor puede trabarse en su guía. Para seguidores de traslación suele limitarse a unos 30°, y se controla con el tamaño del círculo base.",
    ver: ["leva", "angulo-de-transmision"] },
  { id: "cruz-de-malta", t: "Cruz de Malta", u: 6, mcr: 0,
    d: "Mecanismo de movimiento intermitente: una rueda motriz con un pasador entra en las ranuras de una rueda conducida y la hace avanzar una fracción de vuelta, dejándola detenida y trabada el resto del ciclo. Con cuatro ranuras, la conducida gira 90° por cada vuelta de la motriz.",
    ver: ["trinquete"] },
  { id: "trinquete", t: "Trinquete", u: 6, mcr: 0,
    d: "Rueda dentada con un gatillo que permite el giro en un solo sentido e impide el retroceso. También se usa con un gatillo de avance para producir giros intermitentes.",
    ver: ["cruz-de-malta"] },
  { id: "movimiento-plano-general", t: "Movimiento plano general", u: 0, mcr: 1,
    f: "v_B = v_A + ω × r_B/A",
    d: "Movimiento de un cuerpo rígido que combina traslación y rotación en el plano. La velocidad de cualquier punto B se obtiene como la de un punto de referencia A más la de rotación de B alrededor de A. Traslación y rotación pura alrededor de un eje fijo son casos particulares.",
    ver: ["centro-instantaneo", "coriolis"] },
  { id: "transmision-por-correa", t: "Transmisión por correa", u: 0, mcr: 3,
    f: "T₁ / T₂ = e^(μ·θ)",
    d: "Transmisión entre ejes alejados mediante una correa que abraza dos poleas y transmite por rozamiento. Sin considerar el deslizamiento, la relación de velocidades es inversa a la de los diámetros. En una correa plana, la relación entre la tensión del ramal tenso T₁ y la del flojo T₂ depende del coeficiente de rozamiento μ y del ángulo abrazado θ (ecuación de Euler-Eytelwein).",
    ver: ["transmision-por-cadena", "ruedas-de-friccion"] },
  { id: "transmision-por-cadena", t: "Transmisión por cadena", u: 0, mcr: 3,
    f: "i = z₂ / z₁",
    d: "Transmisión por eslabones articulados que engranan en ruedas dentadas (piñones). No desliza, por lo que la relación de transmisión media es exacta e igual al cociente entre números de dientes. Como la cadena se apoya en un polígono y no en un círculo, la velocidad de salida fluctúa levemente: es el efecto poligonal, que disminuye con más dientes.",
    ver: ["transmision-por-correa"] },
  { id: "freno-de-zapata", t: "Freno de zapata", u: 0, mcr: 4,
    f: "T = μ·N·r",
    d: "Freno en el que una zapata con material de fricción se presiona contra un tambor. Para una zapata corta, el par de frenado es el producto del coeficiente de rozamiento μ, la fuerza normal N y el radio del tambor r. Según hacia dónde gire el tambor respecto del pivote, el rozamiento puede ayudar a apretar la zapata (efecto autoenergizante) o a separarla.",
    ver: ["embrague-de-disco"] },
  { id: "embrague-de-disco", t: "Embrague de disco", u: 0, mcr: 4,
    f: "T = μ·F·(R + r)/2   (desgaste uniforme, por cara)",
    d: "Acoplamiento por fricción entre discos que se aprietan axialmente con una fuerza F, para conectar o desconectar dos ejes en marcha. El par que transmite cada cara depende de los radios exterior R e interior r; la hipótesis de desgaste uniforme, válida para embragues usados, da la expresión indicada.",
    ver: ["freno-de-zapata", "junta-universal"] },
  { id: "junta-universal", t: "Junta universal (cardán)", u: 0, mcr: 4,
    d: "Acoplamiento que transmite rotación entre ejes que se cortan formando un ángulo β. Con una sola junta, la velocidad del eje conducido fluctúa dos veces por vuelta entre ω·cos β y ω/cos β. Dos juntas en serie, con ángulos iguales y horquillas en fase, eliminan esa fluctuación (doble cardán).",
    ver: ["embrague-de-disco"] },
  { id: "frecuencia-natural", t: "Frecuencia natural", u: 0, mcr: 5,
    f: "ωₙ = √(k / m)",
    d: "Frecuencia a la que oscila un sistema cuando se lo aparta del equilibrio y se lo deja vibrar libremente. Para un sistema masa-resorte depende de la rigidez k y de la masa m. Si una excitación tiene una frecuencia cercana a la natural se produce resonancia.",
    ver: ["amortiguamiento", "transmisibilidad"] },
  { id: "amortiguamiento", t: "Amortiguamiento", u: 0, mcr: 5,
    f: "ζ = c / (2·√(k·m))",
    d: "Disipación de energía que hace decaer una vibración. Con amortiguamiento viscoso de coeficiente c se define la razón de amortiguamiento ζ: si ζ &lt; 1 el sistema es subamortiguado y oscila decreciendo; si ζ = 1 es crítico y vuelve al equilibrio sin oscilar en el menor tiempo; si ζ &gt; 1 es sobreamortiguado.",
    ver: ["frecuencia-natural", "transmisibilidad"] },
  { id: "transmisibilidad", t: "Transmisibilidad", u: 0, mcr: 5,
    f: "TR = √(1 + (2ζr)²) / √((1 − r²)² + (2ζr)²)",
    d: "Cociente entre la amplitud de la fuerza o el movimiento transmitido al soporte y la amplitud de la excitación, con r = ω/ωₙ. Para valores de r mayores que √2 la transmisibilidad es menor que 1 y el montaje aísla la vibración; cerca de r = 1 la amplifica.",
    ver: ["frecuencia-natural", "amortiguamiento"] }
];
