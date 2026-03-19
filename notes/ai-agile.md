Title: AI & Agile
Location: Stavanger
Subtitle: Lokal camp 2026

# opening slide
(standard Miles-presentasjon)

# Agile Manifesto
background: 
    /presentations/public/agile-manifesto.jpg

text: 
    "We are uncovering better ways of developing software by doing it and helping others do it."

notes:
    https://agilemanifesto.org/
    We are uncovering better ways of developing
software by doing it and helping others do it.
Through this work we have come to value:

Individuals and interactions over processes and tools
Working software over comprehensive documentation
Customer collaboration over contract negotiation
Responding to change over following a plan

That is, while there is value in the items on
the right, we value the items on the left more.

# timeline
copy from /Users/petter/github/petter/slides/presentations/ai-tooling-2026.html

# Karpathy: two tweets
copy from /Users/petter/github/petter/slides/presentations/ai-tooling-2026.html


# AI as an accelerator
background: /Users/petter/github/petter/slides/presentations/public/unsplash/jon-tyson-kSCxSeLagDg-unsplash.jpg


# Where do we go from here?
background: 
    /Users/petter/github/petter/slides/presentations/public/unsplash/adrian-mag-USWGg0oUAsI-unsplash.jpg
    Photo by <a href="https://unsplash.com/@jontyson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jon Tyson</a> on <a href="https://unsplash.com/photos/a-speed-limit-sign-is-posted-on-a-pole-kSCxSeLagDg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
text:
    hvor går veien nå?
    fragment: cutout of the picture of martin fowler (/Users/petter/github/petter/slides/presentations/public/martin fowler.png) with a thick white border.

notes:
    vibes til agentisk koding har nå skjedd på ett år.
    vi har så smått hørt om LLM-er til nå er seks år.
    hvor er vi i 2027? i 2032?

    Retreat. same place, some new people. Blant deltakerne var Martin Fowler, Kent Beck, Steve Yegge, Gene Kim og Annie Vella.

# Some thoughtworks

text: Underlaget kan leses i rapporten [Takeaways from the future of software development](https://www.thoughtworks.com/content/dam/thoughtworks/documents/report/tw_future%20_of_software_development_retreat_%20key_takeaways.pdf).

# Where does the rigor go?
horizon: Now
text:  (to claude: draw the arrows as a mental map more than a list of bulletpoints)
    heading: Where does the rigor go?
    Engineering Quality -> specs
                        -> tests
                        -> constraints
                        -> Risk Management

note: Engineering quality doesn't disappear when AI writes code. It migrates to specs, tests, constraints, and risk management. The Thoughtworks retreat spent more time on this than any other question.

"pre-reviewing the plans and post-reviewing engineering"

# From code review to risk tiering
horizon: Now
text: From code review to risk tiering
note: Code review is being unbundled. Its four functions (mentorship, consistency, correctness, trust) each need a new home.

# The productivity/experience paradox
horizon: Now
text: The productivity/experience paradox
note: Developer productivity and developer experience are decoupling. Organizations face hard choices about which to optimize.

# TDD FTW
text: 
    "One of the retreat's most shareable insights was that test-driven development produces dramatically better results from AI coding agents."
background: green color
note:
    test-suites as first-class artifacts. TDD -> engineering. 
    The mechanism is specific: TDD prevents a failure mode where agents write tests that verify broken behavior. When the tests exist before the code, agents cannot cheat by writing a test that simply confirms whatever incorrect implementation they produced.

# Security as afterthought
horizon: Now
text: heading: Security is afterthought
      quote: "The retreat noted with concern that the security session had low attendance"
note: Agent security is woefully underdeveloped. Email access alone can enable full account takeover.

# The middle loop
horizon: Now–1 yr
text: The middle loop
background: 
    /presentations/public/unsplash/les-taylor-99hZ8MfNWiI-unsplash.jpg
    Photo by <a href="https://unsplash.com/@taymaster?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Les Taylor</a> on <a href="https://unsplash.com/photos/three-people-smoking-and-gesturing-at-the-camera-99hZ8MfNWiI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
note: 
    A new category of supervisory engineering work is forming between inner-loop coding and outer-loop delivery. Nobody has named it yet.

    Software development has long been described in terms of two loops. The inner loop is the developer's personal cycle of writing, testing and debugging code. The outer loop is the broader delivery cycle of CI/CD, deployment and operations. The retreat identified a third: a middle loop of supervisory engineering work that sits between them.

# Cognitive debt
horizon: Now–1 yr
text: Continous Comprehension fights Cognitive Debt
subtitle: Pair programming with 🙋🏼‍♂️🙋🏾‍♀️🤖
note:
    Technical debt is becoming cognitive debt: the gap between system complexity and human understanding.

# Agent topologies
horizon: 1–3 yrs
text: Team Topologies 🤝🏻 Agent topologies
    subtitle: Conway's Law didn't retire. It got more complicated.
note: Conway's Law applies to agents too. Enterprise architecture must now account for agent mobility, specialization, and *agent drift*.
if organizations design systems that mirror their communication structures, what happens when agents become first-class participants in those structures?

Hva betyr det når vi skal organisere oss, ikke bare for mennesker, men også mer eller mindre autonome agenter som jobber i organisasjonen?

# Decision Fatigue
text: Decision Fatigue
background: 
    /presentations/public/unsplash/joel-timothy-Meqj68Yjp3k-unsplash.jpg
    Photo by <a href="https://unsplash.com/@toeljimothy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Joel Timothy</a> on <a href="https://unsplash.com/photos/man-in-black-crew-neck-shirt-wearing-black-framed-eyeglasses-Meqj68Yjp3k?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
notes:
    If agents can produce work faster than leaders can review and approve it, the constraint shifts from production capacity to decision-making capacity. Middle managers who previously served as coordination points now become approval bottlenecks. Several practitioners reported this already happening at their organizations: agents generating job specifications, code fixes and feature implementations faster than anyone can say yes.

    The retreat asked a pointed question: if humans have capacity limits for understanding systems but agents do not, do we need as many middle managers? The group did not reach consensus, but the question itself signals a significant organizational challenge ahead.
# Knowledge graphs & semantic layers
horizon: 1–3 yrs
text: Knowledge graphs & semantic layers
note: Decades-old technologies are suddenly relevant again as the grounding layer for domain-aware agents.

# The future of roles
horizon: 1–3 yrs
text: The future of roles
note: PM, developer, and designer roles are converging. Staff engineers face new expectations. Juniors are more valuable than ever.

# Self-healing systems
horizon: 2–5 yrs
text: Self-healing systems
    subtitle: .. self-improving (?)
note: 
    Moving from human incident response to agent-assisted healing requires solving the 'latent knowledge' problem first.

    seniorutvikleren som drikker te og sier "nei, dette kan gå galt" er i sin personlighet langt fra dagens språkmodeller.

# AI will not replace us
text: title: AI will not replace us, but shift what we do
      quote: "Nobody at the retreat could define what product managers will do in an AI-driven world."
background: green
notes:
    Knowledge fragmentation, cultural gaps between disciplines and unclear role boundaries existed before AI. AI is simply making them more expensive to ignore.

# the agentic operating system
text: chatGPT -> agent harness -> agentic operating system
background: green
notes:
    The retreat explored what an operating system for agents would need to include:
    ● Agent identity and permission management.
    ● Memory and context-window management.
    ● A work ledger that captures future, current and past work with attributes like
    required skills, acceptance criteria, SLOs and cost constraints.
    ● Governance paths through a graph of agent capabilities and compliance
    requirements.
    A central insight was that an agent is more than its persona, goals or current context; it includes the history of work it has performed. While models are fungible within an agent (you can swap one LLM for another), changing a model fundamentally alters the agent's behavior and must be tracked. The work ledger emerged as the core primitive of this new operating system, analogous to a financial blockchain: searchable, auditable and enabling agents to discover and bid for work.

# evolving not dying
text: Agile is evolving, not dying
    fragments: 
        - CI / CD
        - TDD
        - Pair Programming
        - Ensemble Development
        - ~Ceremonies~ ?

background: 
    /presentations/public/agile-manifesto.jpg

notes: 
    The retreat pushed back hard on the "agile is dead" narrative. What is happening is more nuanced. Some teams are compressing sprint cadences to one week, using AI to automate end-of-sprint ceremonies like demos, reporting and status summaries. Others are rediscovering XP practices (pair programming, ensemble development, continuous integration) because these practices create the tight feedback loops and shared understanding that agent-assisted development requires.

# Agile and Agents vs Organizational Goverance
background:
    presentations/public/unsplash/david-clode-RyJAmuH9GMk-unsplash.jpg
    Photo by <a href="https://unsplash.com/@davidclode?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">David Clode</a> on <a href="https://unsplash.com/photos/two-colorful-macaws-face-each-other-RyJAmuH9GMk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

text:
      AI hjelper ikke når organisasjonen bruker tiden på politikk

notes:
    The real threat to agile is governance. Teams that adopt AI tools and work faster still run into the same approval processes, compliance gates and organizational dependencies. Without reforming governance alongside development practices, faster teams just hit the same walls sooner. The retreat emphasized involving internal audit and governance functions early when rethinking team practices, rather than treating them as obstacles to be navigated later.

# Ombygging av fabrikken
text: 
    title: Må vi bygge om? I så fall, hva?
    subtitle: Verdien kommer med bedre prosesser
bakgrunn:
    presentations/public/unsplash/the-royal-danish-library-EXMSsg40Jvo-unsplash.jpg
    Photo by <a href="https://unsplash.com/@danishlibrary?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">The Royal Danish Library</a> on <a href="https://unsplash.com/photos/a-black-and-white-photo-of-a-construction-site-EXMSsg40Jvo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

notes:
    den virkelige verdien av ny teknologi kommer gjerne først når vi bygger om våre arbeidsprosesser, og tenker på helt nye måter. Elektrifiseringen av fabrikk-gulvet ga verdi da vi bygde om fabrikken, det holdt ikke å bare bytte kull med strøm.

# Åpne Spørsmål
text: 
    fragments: (replace them as one fades into the other) 
    - On Work and identity
    - On organizational design
    - On trust and verification
    - On knowledge and comprehension
    - On Speed and stability

notes:
# Open questions
The retreat surfaced more questions than answers. These are the ones that kept the
room awake.
## On work and identity
How do we help engineers who love writing code find meaning and satisfaction in
supervisory engineering work? What professional development pathways lead to the
middle loop? If the product manager role and developer role are converging, what is the
resulting role called and who owns it?
## On organizational design
If agents make middle management bottlenecks more visible, does the organizational
response involve fewer managers, differently-skilled managers or a fundamentally
different coordination model? How do you redesign enterprise architecture when agents
can move across team boundaries but governance structures cannot?
## On trust and verification
What would need to be true for organizations to stop reviewing AI-generated code
entirely? Is there a world where test suites and constraints provide sufficient verification
without human inspection? How do we build trust in systems that are fundamentally
non-deterministic, where rerunning the same inputs produces different outputs?
## On knowledge and comprehension
If code changes faster than humans can comprehend it, do we need a new model for
maintaining institutional knowledge? Can knowledge graphs and semantic layers truly
replace the human intuition that comes from years of working in a codebase? What is the
right investment level for "agent subconscious" systems that most organizations do not
yet build?
## On speed and stability
Are we currently in a regression where AI-enabled productivity gains are being offset by
stability losses from larger batch sizes? Will development need to slow down because the
volume of decisions is overwhelming human capacity to evaluate them? How do we
measure the real cost of cognitive debt as it accumulates?

# You know nothing john snow
background: presentations/public/unsplash/adrian-mag-USWGg0oUAsI-unsplash.jpg
    Photo by <a href="https://unsplash.com/@l2space?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Adrian Mag</a> on <a href="https://unsplash.com/photos/an-empty-road-in-the-middle-of-a-forest-USWGg0oUAsI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>  

text: 
    "the map is being redrawn and the people best positioned to draw it are the ones willing to admit how much they don't yet know."

# Robert-frost
background: presentations/public/unsplash/adrian-mag-USWGg0oUAsI-unsplash.jpg
    Photo by <a href="https://unsplash.com/@l2space?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Adrian Mag</a> on <a href="https://unsplash.com/photos/an-empty-road-in-the-middle-of-a-forest-USWGg0oUAsI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>  
text:
    the best way out is always trough. — Robert Frost
notes:
    the best way out is always trough.

    ... Claude blir bare bedre.

    Maskinene er i ferd med å bli _veldig_ gode på å være maskiner. Jeg synes vi skal være veldig gode på å være mennesker.


# closing — Miles logo (logo-center)


__UNDERLAG__

# Det originale innspillet
Tittel: Om Smidig og AI-agenter: nye verktøy og eviggrønne sannheter
Beskrivelse:
Premiss én: Agentisk koding er en dyp omveltning i hva det vil si å være utvikler, og vil ha langtrekkende konsekvenser for hvordan vi utfører vårt arbeid.

Premiss to: Smidig-manifestet, og viktigheten av å bygge trygge og smidige organisasjoner har aldri vært viktigere. Stødige teknologer, designere, organisasjons- og produktfolk som klarer å omgjøre hurtighet i utførelse til reell læring i organisasjonen er helt sentralt for å lykkes.

Det hjelper ingenting å løpe fort hvis du løper i feil retning, og det hjelper ingenting å kunne programmere raskere hvis det du _egentlig_ bruker tid på er den interne politiske drakampen mellom forretningsenheter og funksjonsenheter.

Å bli veldig gode på agentiske verktøy som Claude og lignende er table-stakes for Miles. Min hot-take: flest mulig av våre konsulenter bør komme opp på et nivå hvor de trenger Claude Max-abonnement til 1000-2000 kroner i måneden, og vi trenger å bruke disse verktøyene agressivt. Dette har konsekvenser både for vårt faglige arbeid, og hvordan vi priser oss i markedet. Jeg vil aller helst ha fullt AI-dopa Miles-konsulenter til 1900,- i timen — helst i løpet av 2026. (mulig hele denne siste setningen trenger en slags round-table diskusjon med Sveinung tilstede)

Men: Claude Code skaper jo ikke i seg selv verdi for kundene våre. Når vi setter opp utviklere med verktøy som gjør det mulig å teste idéer ekstremt raskt, og kanskje reelt skru opp endringskapasiteten i utviklingsavdelingen, setter det høyere krav til hvordan vi jobber med bruker- og forretningsinvolvering. Her tror jeg, heldigvis, noen grunnleggende smidig- og DevOps-føringer står seg svært godt. En CI/CD-pipeline som skaper trygge muligheter for å teste mot produksjonsnær data øker i verdi. En organisasjon hvor feedback-loop fra idé til sluttbruker og tilbake til utvikler øker i verdi. Når alle kan løpe litt fortere, er det enda viktigere med trygghet i laget til å kunne si ifra at vi i er på vei i feil retning.

Å bygge en organisasjon som klarer å bruke AI, handler kanskje egentlig om å bygge en smidig og menneskesentrert organisasjon.

Skulle jeg få lov til å ta ordet på camp vil jeg gjerne også fremføre noen tanker på hvordan jeg tror dette treffer oss i Miles (gitt vår måte å jobbe på, og sånn jeg opplever vår posisjon i markedet). Noe av dette foredraget er _egentlig_ en samtale jeg vil ha for kundene våre, enda mer enn dere, men håper det kan bli et innlegg som også treffer publikum hos mine gode kollegaer i Miles Rogaland.

Dette er et klassisk spørsmål innen økonomi, og svaret er litt kontraintuitivt: **de omkringliggende stegene blir relativt mer verdifulle og tiltrekker seg mer ressurser.**

## Baumols kostnadssjukdom og komplementær verdistigning

Når ett ledd i en verdikjede blir dramatisk billigere, skjer det typisk to ting:

**1. Flaskehalsen flytter seg**
Det billige leddet slutter å være begrensningen. Verdikjedens throughput begrenses nå av nabostegene. I Theory of Constraints-terminologi: constraints vandrer oppover i kjeden mot det som fremdeles er dyrt eller tidkrevende.

**2. Etterspørselen etter omkringliggende steg eksploderer**
Fordi det billige leddet nå kan prosessere *mye mer*, trenger du tilsvarende mer input og kan produsere mye mer output – men bare hvis de andre leddene henger med. Resultatet: etterspørselen (og dermed verdien) av nabostegene stiger kraftig.

## Det klassiske eksempelet: dampkraft → kanaler

Da dampmaskinen gjorde transport billigere, ble ikke kanalarbeiderne arbeidsledige – det ble bygget *flere* kanaler i noen tiår, fordi det plutselig var lønnsomt å frakte enda mer gods.

## Relevansen for AI og programvareutvikling

Dette er direkte relevant for det du selv har forsket på: når AI gjør *kodegenerering* dramatisk billigere, hva skjer da?

- **Kravspesifisering og domeneforståelse** (ledd before) – blir flaskehalsen, og dermed mer verdifullt
- **Arkitektur og systemdesign** – likeså
- **Testing, validering og review** (ledd after) – explosjonen av generert kode skaper eksplosiv etterspørsel etter QA
- **Deployment og drift** – mer software betyr mer infrastruktur

Det er derfor paradokset oppstår: AI gjør programmering billigere, men behovet for *gode programmerere* som kan håndtere de omkringliggende stegene øker.

## Den generelle regelen

> Når kostnadene i ett ledd faller med en faktor X, øker gjerne verdien av komplementære ledd proporsjonalt – inntil de også automatiseres.