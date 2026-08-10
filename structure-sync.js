(() => {
  const structureInput = document.getElementById("structureInput");
  const chordsInput = document.getElementById("chordsInput");

  if (!structureInput || !chordsInput) return;

  const headingPattern = /^\s*[\[［【](.+?)[\]］】]\s*$/;

  function parseStructure(value) {
    return value
      .replace(/\r/g, "")
      .split(/\s*(?:→|⇒|＞|>|,|、|\/|\n)+\s*/)
      .map(section => section.replace(/^[\[［【]|[\]］】]$/g, "").trim())
      .filter(Boolean);
  }

  function parseChordBlocks(value) {
    const lines = value.replace(/\r/g, "").split("\n");
    const preamble = [];
    const blocks = [];
    let current = null;

    lines.forEach(line => {
      const match = line.match(headingPattern);
      if (match) {
        current = { name: match[1].trim(), body: [] };
        blocks.push(current);
      } else if (current) {
        current.body.push(line);
      } else {
        preamble.push(line);
      }
    });

    return { preamble: preamble.join("\n").trim(), blocks };
  }

  function buildChordTemplate(sections, parsed) {
    const pools = new Map();
    parsed.blocks.forEach(block => {
      if (!pools.has(block.name)) pools.set(block.name, []);
      pools.get(block.name).push(block.body.join("\n").trim());
    });
    const useCount = new Map();
    const output = [];
    if (parsed.preamble) output.push(parsed.preamble);
    sections.forEach(section => {
      const index = useCount.get(section) || 0;
      const savedBodies = pools.get(section) || [];
      const body = savedBodies[index] || "";
      useCount.set(section, index + 1);
      output.push(`［${section}］${body ? `\n${body}` : ""}`);
    });
    return output.join("\n\n").trim();
  }

  function syncChordSections() {
    const sections = parseStructure(structureInput.value);
    if (!sections.length) return;
    const current = chordsInput.value;
    const parsed = parseChordBlocks(current);
    if (current.trim() && parsed.blocks.length === 0) return;
    const nextValue = buildChordTemplate(sections, parsed);
    if (nextValue === current.trim()) return;
    chordsInput.value = nextValue;
    chordsInput.dispatchEvent(new Event("input", { bubbles: true }));
  }

  structureInput.addEventListener("input", syncChordSections);
  structureInput.addEventListener("change", syncChordSections);
})();

(()=>{
  if(document.querySelector('script[data-neet-home-dashboard]'))return;
  const s=document.createElement('script');
  s.src='home-dashboard.js?v=20260811-3';
  s.dataset.neetHomeDashboard='1';
  document.body.appendChild(s);
})();