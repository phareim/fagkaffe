const PptxGenJS = require("pptxgenjs");

// Miles Brand Colors
const COLORS = {
  milesRed: "FF303B",
  deepRed: "B72318",
  burgundy: "450D20",
  cream: "FBF0E5",
  yellow: "FFD9A1",
  darkTeal: "004047",
  teal: "78E8DB",
  white: "FFFFFF",
};

function createPresentation() {
  const pptx = new PptxGenJS();

  // Set presentation properties
  pptx.author = "Miles";
  pptx.company = "Miles";
  pptx.title = "AI & AI Tooling 2026";
  pptx.subject = "Fagkaffe, februar 2026";

  // Define master layouts
  pptx.defineLayout({ name: "MILES_16x9", width: 10, height: 5.625 });
  pptx.layout = "MILES_16x9";

  // ========================================
  // SLIDE 1: Title Slide
  // ========================================
  let slide = pptx.addSlide();
  slide.background = { color: COLORS.burgundy };

  // Title
  slide.addText("AI & AI Tooling 2026", {
    x: 0.5,
    y: 1.5,
    w: 6,
    h: 1.2,
    fontSize: 44,
    bold: true,
    color: COLORS.cream,
    fontFace: "Calibri", // Gelica not widely available, using Calibri as fallback
  });

  // Subtitle
  slide.addText("Fagkaffe, februar 2026 ☕️", {
    x: 0.5,
    y: 2.8,
    w: 6,
    h: 0.6,
    fontSize: 24,
    color: COLORS.cream,
    fontFace: "Calibri",
  });

  // Location
  slide.addText("Haugesund", {
    x: 0.5,
    y: 4.5,
    w: 3,
    h: 0.4,
    fontSize: 18,
    color: COLORS.yellow,
    fontFace: "Calibri",
  });

  // Logo placeholder (right side)
  slide.addText("MILES", {
    x: 7.5,
    y: 4.5,
    w: 2,
    h: 0.6,
    fontSize: 36,
    bold: true,
    color: COLORS.milesRed,
    align: "right",
    fontFace: "Calibri",
  });

  // ========================================
  // SLIDE 2: Timeline
  // ========================================
  slide = pptx.addSlide();
  slide.background = { color: COLORS.cream };

  slide.addText("AI som kode-verktøy: En kort tidslinje", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 36,
    bold: true,
    color: COLORS.burgundy,
    fontFace: "Calibri",
  });

  // Timeline content
  const timelineEvents = [
    { date: "Nov 2022", event: "ChatGPT lanseres" },
    { date: "2023", event: "GitHub Copilot blir mainstream" },
    { date: "2024", event: "Cursor.ai vinner popularitet" },
    { date: "2025", event: "Claude Code lanseres" },
    { date: "Feb 2026", event: "I dag" },
  ];

  let yPos = 1.5;
  timelineEvents.forEach((item, idx) => {
    // Timeline line
    if (idx < timelineEvents.length - 1) {
      slide.addShape(pptx.ShapeType.rect, {
        x: 1.5,
        y: yPos + 0.25,
        w: 0.05,
        h: 0.5,
        fill: { color: COLORS.milesRed },
      });
    }

    // Date
    slide.addText(item.date, {
      x: 2,
      y: yPos,
      w: 2,
      h: 0.4,
      fontSize: 18,
      bold: true,
      color: COLORS.burgundy,
      fontFace: "Calibri",
    });

    // Event
    slide.addText(item.event, {
      x: 4.5,
      y: yPos,
      w: 4.5,
      h: 0.4,
      fontSize: 16,
      color: COLORS.burgundy,
      fontFace: "Calibri",
    });

    yPos += 0.7;
  });

  slide.addNotes("Her er de grove trekkene på hva som har skjedd. Merk den bemerkelsesverdig korte tidslinjen vi opererer innenfor her.");

  // ========================================
  // SLIDE 3: Karpathy Tweets
  // ========================================
  slide = pptx.addSlide();
  slide.background = { color: COLORS.cream };

  slide.addText("LLM og kode, i to tweets", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 36,
    bold: true,
    color: COLORS.burgundy,
    fontFace: "Calibri",
  });

  slide.addText("(med ett års mellomrom)", {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.4,
    fontSize: 20,
    color: COLORS.deepRed,
    fontFace: "Calibri",
    italic: true,
  });

  // Tweet references
  slide.addText([
    { text: "Andrej Karpathy:\n\n", options: { bold: true, fontSize: 18 } },
    { text: "Tweet 1 (2024): ", options: { bold: true, fontSize: 14 } },
    { text: "x.com/karpathy/status/2015883857489522876\n\n", options: { fontSize: 12, color: COLORS.darkTeal } },
    { text: "Tweet 2 (2025): ", options: { bold: true, fontSize: 14 } },
    { text: "x.com/karpathy/status/2019137879310836075", options: { fontSize: 12, color: COLORS.darkTeal } },
  ], {
    x: 0.5,
    y: 2,
    w: 9,
    h: 2.5,
    color: COLORS.burgundy,
    fontFace: "Calibri",
    valign: "top",
  });

  // ========================================
  // SLIDE 4: Jevons Paradox
  // ========================================
  slide = pptx.addSlide();
  slide.background = { color: COLORS.darkTeal };

  slide.addText("Jevons Paradox", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 36,
    bold: true,
    color: COLORS.cream,
    fontFace: "Calibri",
  });

  // Quote
  slide.addText([
    { text: "\"It is a confusion of ideas to suppose that the economical use of fuel is equivalent to diminished consumption. The very contrary is the truth.\"\n\n", options: { fontSize: 20, italic: true } },
    { text: "— William Stanley Jevons (1865)", options: { fontSize: 16, bold: true } },
  ], {
    x: 1,
    y: 1.8,
    w: 8,
    h: 2,
    color: COLORS.yellow,
    fontFace: "Calibri",
    valign: "middle",
    align: "center",
  });

  slide.addNotes("At det blir billigere og lettere å produsere kode, betyr _ikke nødvendigvis_ at vi trenger færre programmerere.");

  // ========================================
  // SLIDE 5: Art & Fear - Keramikk-historien
  // ========================================
  slide = pptx.addSlide();
  slide.background = { color: COLORS.cream };

  slide.addText("\"Art & Fear\": En historie om keramikk", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 36,
    bold: true,
    color: COLORS.burgundy,
    fontFace: "Calibri",
  });

  slide.addText([
    { text: "En keramikklærer delte klassen i to:\n\n", options: { fontSize: 18 } },
    { text: "• Gruppe A (kvantitet): ", options: { bold: true, fontSize: 16 } },
    { text: "Vurdering basert på vekt\n", options: { fontSize: 16 } },
    { text: "• Gruppe B (kvalitet): ", options: { bold: true, fontSize: 16 } },
    { text: "Én perfekt vase\n\n", options: { fontSize: 16 } },
    { text: "Resultat: ", options: { bold: true, fontSize: 18, color: COLORS.milesRed } },
    { text: "Kvantitetsgruppen produserte høyest kvalitet!", options: { fontSize: 16 } },
  ], {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 3,
    color: COLORS.burgundy,
    fontFace: "Calibri",
    valign: "top",
  });

  slide.addNotes("Historien fra \"Art & Fear\" av David Bayles og Ted Orland viser hvordan learning by doing, iterativ utvikling og mange små eksperimenter gir bedre resultater enn teoretisering om perfeksjon. Mens kvalitetsgruppen planla, lærte kvantitetsgruppen gjennom praksis og ble gradvis bedre. Dette passer perfekt til agile prinsipper, MVP-mentalitet og moderne programvareutvikling.");

  // ========================================
  // SLIDE 6: AI Commits (Dylan tweet reference)
  // ========================================
  slide = pptx.addSlide();
  slide.background = { color: COLORS.white };

  slide.addText("Stadig mer sjekkes inn av AI", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 36,
    bold: true,
    color: COLORS.burgundy,
    fontFace: "Calibri",
  });

  slide.addText([
    { text: "Dataene viser en klar trend:\n\n", options: { fontSize: 18 } },
    { text: "AI-generert kode utgjør en økende andel av commits\n\n", options: { fontSize: 16 } },
    { text: "Kilde: ", options: { fontSize: 14, bold: true } },
    { text: "x.com/dylan522p/status/2019490550911766763", options: { fontSize: 12, color: COLORS.darkTeal } },
  ], {
    x: 0.5,
    y: 1.8,
    w: 9,
    h: 2.5,
    color: COLORS.burgundy,
    fontFace: "Calibri",
    valign: "top",
  });

  // ========================================
  // SLIDE 7: Spesialist vs Generalist
  // ========================================
  slide = pptx.addSlide();
  slide.background = { color: COLORS.yellow };

  slide.addText("Spesialist vs Generalist", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 36,
    bold: true,
    color: COLORS.burgundy,
    fontFace: "Calibri",
  });

  slide.addText([
    { text: "To sannheter som eksisterer samtidig:\n\n", options: { fontSize: 18, bold: true } },
    { text: "1. ", options: { fontSize: 16, bold: true, color: COLORS.milesRed } },
    { text: "En enkeltutvikler kan bygge omfattende løsninger alene\n\n", options: { fontSize: 16 } },
    { text: "2. ", options: { fontSize: 16, bold: true, color: COLORS.milesRed } },
    { text: "Kravene til spesialkompetanse (sikkerhet, design, UU, domene) øker", options: { fontSize: 16 } },
  ], {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 3,
    color: COLORS.burgundy,
    fontFace: "Calibri",
    valign: "top",
  });

  slide.addNotes("For noen år siden kunne du drifte en webside med en ensom web-master, i dag får du til det samme med et lite team på fem personer. Med våre nye verktøy kan en enkeltutvikler bygge ganske omfattende og velfungerende løsninger på egenhånd. SAMTIDIG er kravene til domenekunskap, sikkerhet, design, UU, forvaltning over tid, etc. slik at vi ofte trenger tung spesialkompetanse for å bygge det vi reelt sett trenger. Disse to datapunktene er sanne samtidig.");

  // ========================================
  // SLIDE 8: Hva skal vi overlate til maskinene?
  // ========================================
  slide = pptx.addSlide();
  slide.background = { color: COLORS.milesRed };

  slide.addText("Hva skal vi overlate til maskinene?", {
    x: 0.5,
    y: 2,
    w: 9,
    h: 1,
    fontSize: 40,
    bold: true,
    color: COLORS.white,
    fontFace: "Calibri",
    align: "center",
    valign: "middle",
  });

  slide.addText("AI er til veldig lite hjelp hvis det blir stående som et verktøy for å gjøre oss dummere.", {
    x: 1,
    y: 3.5,
    w: 8,
    h: 0.8,
    fontSize: 18,
    color: COLORS.white,
    fontFace: "Calibri",
    align: "center",
    italic: true,
  });

  // ========================================
  // SLIDE 9: Motstemmer - Gorman
  // ========================================
  slide = pptx.addSlide();
  slide.background = { color: COLORS.cream };

  slide.addText("Motstemmer (som har helt rett)", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 36,
    bold: true,
    color: COLORS.burgundy,
    fontFace: "Calibri",
  });

  slide.addText("Har Gorman noen gode poeng?", {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.5,
    fontSize: 24,
    color: COLORS.deepRed,
    fontFace: "Calibri",
    italic: true,
  });

  slide.addText([
    { text: "LinkedIn-innlegg fra Gorman\n\n", options: { fontSize: 16, bold: true } },
    { text: "Se: linkedin.com/feed/update/urn:li:share:7419632629202960384", options: { fontSize: 12, color: COLORS.darkTeal } },
  ], {
    x: 0.5,
    y: 2.5,
    w: 9,
    h: 1.5,
    color: COLORS.burgundy,
    fontFace: "Calibri",
  });

  // ========================================
  // SLIDE 10: Miljøaspektet
  // ========================================
  slide = pptx.addSlide();
  slide.background = { color: COLORS.darkTeal };

  slide.addText("Angående miljøet", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 36,
    bold: true,
    color: COLORS.cream,
    fontFace: "Calibri",
  });

  slide.addText([
    { text: "Det viktigste miljøaspektet av vår kode er ikke ", options: { fontSize: 20 } },
    { text: "hvordan ", options: { fontSize: 20, italic: true } },
    { text: "vi bygger det, men ", options: { fontSize: 20 } },
    { text: "hva ", options: { fontSize: 20, italic: true, bold: true } },
    { text: "vi bygger.", options: { fontSize: 20 } },
  ], {
    x: 0.5,
    y: 2,
    w: 9,
    h: 1,
    color: COLORS.yellow,
    fontFace: "Calibri",
    align: "center",
    valign: "middle",
  });

  slide.addNotes("Det viktigste miljøaspektet av vår kode er ikke hvordan vi bygger det, men hva vi bygger. Den virkelige verdien av Kolumbus-teamet vårt er at flere folk i Rogaland tar bussen (for å ta et lavthengende eksempel).");

  // ========================================
  // SLIDE 11: Bruk AI som verktøy for tenkning
  // ========================================
  slide = pptx.addSlide();
  slide.background = { color: COLORS.cream };

  slide.addText("Du må lære å bruke AI som verktøy for egen tenkning", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.9,
    fontSize: 32,
    bold: true,
    color: COLORS.burgundy,
    fontFace: "Calibri",
  });

  slide.addText([
    { text: "\"Du må enten lære å bruke KI som et verktøy for egen tenkning, eller akseptere at andres tenkning, systemer og prioriteringer gradvis vil styre arbeidet ditt.\"\n\n", options: { fontSize: 18, italic: true } },
    { text: "Kilde: ", options: { fontSize: 14, bold: true } },
    { text: "DN-artikkel - \"Du bruker KI feil\"", options: { fontSize: 14 } },
  ], {
    x: 0.5,
    y: 2,
    w: 9,
    h: 2.5,
    color: COLORS.burgundy,
    fontFace: "Calibri",
    valign: "top",
  });

  slide.addNotes("Artikkel fra DN om hvordan man skal bruke KI som et verktøy for egen tenkning, ikke bare som en erstatning for tenkning. Ellers vil andres systemer og prioriteringer gradvis styre arbeidet ditt.");

  // ========================================
  // SLIDE 12: Diskusjon
  // ========================================
  slide = pptx.addSlide();
  slide.background = { color: COLORS.burgundy };

  slide.addText("Vi åpner rommet for diskusjon", {
    x: 0.5,
    y: 2.3,
    w: 9,
    h: 1,
    fontSize: 44,
    bold: true,
    color: COLORS.cream,
    fontFace: "Calibri",
    align: "center",
    valign: "middle",
  });

  // Save the presentation
  const fileName = "AI-Tooling-2026-Miles.pptx";
  pptx.writeFile({ fileName });
  console.log(`✅ PowerPoint created: ${fileName}`);
}

// Run the generation
createPresentation();
