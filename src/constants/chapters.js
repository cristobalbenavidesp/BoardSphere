const chapters = [
  {
    title: "Capítulo I - Disposiciones Fundamentales",
    description:
      "En este capítulo se establecen los principios y valores fundamentales que rigen el ordenamiento jurídico del país, incluyendo los relacionados con la economía, como la libre empresa, la competencia y el desarrollo sostenible.",
  },
  {
    title: "Capítulo II - De los Derechos y Deberes Constitucionales",
    description:
      "Este capítulo establece los derechos y deberes fundamentales de los ciudadanos y de los extranjeros que se encuentren en el territorio del país, incluyendo los derechos económicos, como el derecho al trabajo, la propiedad privada, la libertad de empresa y la protección social.",
  },
  {
    title: "Capítulo III - Del Poder Legislativo",
    description:
      "Este capítulo establece la organización y atribuciones del Poder Legislativo, encargado de elaborar y modificar las leyes del país, incluyendo las relacionadas con la economía, como la regulación de los mercados, la protección del consumidor y la promoción del desarrollo económico.",
  },
  {
    title: "Capítulo IV - Del Poder Ejecutivo",
    description:
      "Este capítulo establece la organización y atribuciones del Poder Ejecutivo, encargado de la administración del Estado y de velar por el cumplimiento de las leyes y de los derechos fundamentales, incluyendo la implementación de políticas económicas y la gestión de los recursos públicos.",
  },
  {
    title: "Capítulo V - Del Poder Judicial",
    description:
      "Este capítulo establece la organización y atribuciones del Poder Judicial, encargado de la administración de justicia y de la protección de los derechos fundamentales de las personas, incluyendo la resolución de conflictos económicos y la interpretación de leyes relacionadas con la economía.",
  },
  {
    title: "Capítulo VI - De los Tribunales Constitucionales",
    description:
      "Este capítulo establece la organización y atribuciones de los tribunales encargados de la interpretación y control de la Constitución, garantizando su supremacía y el respeto a los derechos fundamentales, incluyendo la interpretación de normas económicas y su control constitucional.",
  },
  {
    title: "Capítulo VII - De la Reforma de la Constitución",
    description:
      "En este capítulo se establecen los procedimientos y requisitos para la reforma de la Constitución, garantizando su protección y estabilidad, incluyendo la posibilidad de modificar las normas económicas de la Constitución.",
  },
  {
    title: "Capítulo VIII - Del Control y Fiscalización",
    description:
      "Este capítulo establece los mecanismos y procedimientos de control y fiscalización de los poderes públicos, garantizando la transparencia y la rendición de cuentas, incluyendo el control de los recursos públicos destinados a la economía.",
  },
  {
    title: "Capítulo IX - De la Participación Ciudadana",
    description:
      "En este capítulo se establecen los mecanismos y procedimientos de participación ciudadana en la toma de decisiones políticas y en el control y fiscalización de los poderes públicos, incluyendo la participación en la formulación de políticas económicas y en la gestión de los recursos públicos destinados a la economía.",
  },
  {
    title: "Capítulo X - De la Economía",
    description:
      "Este capítulo establece los principios y normas fundamentales que rigen la economía del país, como la libre empresa, la competencia, la propiedad privada, la promoción del desarrollo económico y la protección social, entre otros aspectos relevantes.",
  },
  {
    title: "Capítulo XI - De la Hacienda Pública",
    description:
      "En este capítulo se establecen las normas y principios que rigen la gestión de los recursos públicos, incluyendo los ingresos y gastos del Estado, así como el control y fiscalización de las finanzas públicas.",
  },
  {
    title: "Capítulo XII - Del Comercio y la Inversión",
    description:
      "Este capítulo establece las normas y principios que rigen el comercio y la inversión, incluyendo la promoción de la inversión extranjera y la protección de los derechos de los inversores, así como la regulación del comercio internacional y la promoción de la competencia.",
  },
  {
    title: "Capítulo XIII - Del Medio Ambiente y los Recursos Naturales",
    description:
      "Este capítulo establece las normas y principios que rigen la gestión del medio ambiente y los recursos naturales, incluyendo la protección y conservación de la biodiversidad, la gestión sostenible de los recursos naturales y la promoción del desarrollo sostenible.",
  },
  {
    title: "Capítulo XIV - De la Educación y la Investigación",
    description:
      "En este capítulo se establecen las normas y principios que rigen la educación y la investigación, incluyendo la promoción de la educación técnica y científica, así como la investigación y desarrollo tecnológico y científico.",
  },
  {
    title: "Capítulo XV - De la Cultura y el Patrimonio",
    description:
      "Este capítulo establece las normas y principios que rigen la cultura y el patrimonio, incluyendo la protección y promoción de la diversidad cultural y el patrimonio histórico, arqueológico y artístico del país.",
  },
  {
    title: "Capítulo XVI - De la Defensa Nacional",
    description:
      "En este capítulo se establecerían las normas y principios que rigen la defensa nacional, incluyendo la organización, funciones y responsabilidades de las fuerzas armadas, así como la regulación de su uso y control.",
  },
  {
    title: "Capítulo XVII - De la Seguridad Pública",
    description:
      "En este capítulo se establecerían las normas y principios que rigen la seguridad pública, incluyendo la organización, funciones y responsabilidades de las fuerzas de seguridad y la regulación de su uso y control.",
  },
  {
    title: "Capítulo XVIII - De las Situaciones Excepcionales",
    description:
      "En este capítulo se establecerían las normas y principios que rigen las situaciones excepcionales, incluyendo el estado de catástrofe y el estado de excepción. También se establecerían las medidas que pueden tomarse durante estas situaciones, como la limitación de derechos y libertades individuales, la movilización de recursos y la regulación de la actividad económica.",
  },
  {
    title:
      "Capítulo XIX - De la Tecnología, Datos, Privacidad y Seguridad en el Mundo Digital",
    description:
      "En este capítulo se establecerían las normas y principios que rigen el uso, manejo, protección, privacidad y seguridad de los datos y las tecnologías digitales, tanto en el ámbito público como privado. Se establecerían los derechos y deberes de las personas en el mundo digital, incluyendo la privacidad, la propiedad intelectual, la libertad de expresión y el acceso a la información. También se regularía la recopilación, almacenamiento, uso y divulgación de los datos personales y se establecerían las medidas de protección de los datos personales y la responsabilidad de las empresas y organismos públicos que manejan esta información. Además, se establecerían las normas y principios que rigen las entidades digitales que posea el Estado, incluyendo la seguridad y privacidad de los datos de los ciudadanos que manejan y la regulación de su uso y control. Se establecerían también las medidas de protección de la infraestructura tecnológica del Estado y la responsabilidad de los funcionarios y organismos públicos que manejan los sistemas informáticos. Por último, se definirían las medidas y protocolos que se deben tomar en situaciones excepcionales que afecten el mundo digital, como estados de excepción o de catástrofe.",
  },
];

export default chapters;
