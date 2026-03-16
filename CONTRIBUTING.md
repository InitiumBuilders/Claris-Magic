# 🤝 Contributing to The Motus Magic System

Welcome, mage. The Grimoire grows through collective wisdom.

## Ways to Contribute

### 🔮 Propose a New Spell

The most impactful contribution. Every cybersecurity capability deserves a name.

**Step 1:** Open an Issue using the "Spell Proposal" template

**Step 2:** Fill in these fields:
- **Spell Name** — Evocative, not technical. "Veil of Transit" not "TLS Encryption"
- **School** — Lux (defensive), Dark Arts (offensive), Motus (adaptive), Claw (AI agent), or Wicked (unsolved)
- **Buildability** — 🟢 BUILT / 🔵 BUILDABLE / 🟡 EMERGING / 🔴 ARCANE
- **Description** — 2-4 sentences. Poetic AND true. What does this spell do and why does it matter?
- **Real-World Mapping** — What technology, technique, or practice does this represent?
- **Could This Be Real?** — (for Wicked spells) Honest analysis of where the technology actually stands
- **Discussion Question** — What should the community think about?

**Step 3:** Community votes for 7 days (see Voting Process below)

**Step 4:** If accepted, submit a PR adding:
- Your spell to `js/spells-data.js` in the appropriate school array
- A JSON file in `spells/your-spell-name.json`

### 📝 Submit a PR Directly

For smaller contributions:
1. Fork the repo
2. Create a branch: `git checkout -b spell/your-spell-name`
3. Add your spell to the data + JSON
4. Submit a PR

### 🗳️ Vote on Proposals

Browse open "Spell Proposal" issues and vote:
- 👍 Support
- 👎 Oppose (explain why)
- 💡 Suggest changes

Your vote matters. 5 thumbs-up with no unresolved objections = spell accepted.

### 🐛 Report Issues

Found a bug? A broken link? A typo in a spell? Open an issue.

### 🎨 Improve the Design

The Grimoire should be breathtaking. PRs improving design, animations, accessibility, or mobile experience are always welcome.

### 🌍 Translate

Imagine this grimoire available in every language. Translation PRs are deeply valued.

---

## Voting Process

### How Spell Voting Works

1. A spell proposal is opened as a GitHub Issue using the template
2. Community members vote with emoji reactions on the issue body:
   - 👍 = Support this spell
   - 👎 = Oppose (must explain why in a comment)
   - 💡 = Suggest modification
3. Discussion happens in the comments
4. After 7 days, the vote is tallied

### Voting Thresholds

| Threshold | Result |
|-----------|--------|
| **5+ 👍** with no unresolved objections | ✅ Spell is added |
| **3+ 👍** with modifications accepted | ✅ Modified spell is added |
| **More 👎 than 👍** after 7 days | ❌ Spell returned for rework |
| **No votes** after 14 days | 🔄 Auto-closed, can be re-proposed |

### Wicked Problems Priority Voting

Every quarter, we run a **Wicked Problems Priority Vote**:
- Community ranks which unsolved problems deserve the most attention
- Top 3 become "Active Research Targets" highlighted on the site
- Anyone working on solutions can submit progress updates as comments

### Contributor Levels

| Level | Title | How to Earn |
|-------|-------|-------------|
| 🌱 | Apprentice | First accepted spell proposal |
| ⚔️ | Practitioner | 3+ accepted spells |
| 🔮 | Mage | 5+ spells + 1 wicked problem contribution |
| 👑 | Archmage | 10+ spells + active mentoring of others |

---

## Spell JSON Format

```json
{
  "name": "Your Spell Name",
  "school": "lux|shadow|motus|wicked|claw",
  "mapping": "Real-world technology or technique",
  "rating": "built|buildable|emerging|arcane",
  "desc": "Poetic description of what this spell does and why it matters.",
  "category": "Optional category for wicked spells",
  "analysis": "Optional: Could This Be Real? assessment",
  "question": "Optional: Discussion question for the community"
}
```

## The Naming Convention

Spell names should:
- ✅ Evoke the **feeling** of the capability
- ✅ Be memorable and speakable
- ✅ Work in conversation ("We need to cast the Beacon of Anomaly")
- ❌ NOT be technical jargon ("Implement SIEM/SOAR Integration")
- ❌ NOT be too generic ("The Shield")

## Code of Conduct

Be excellent to each other. This is a community of practitioners — beginners and archmages alike. Every question is valid. Every contribution matters.

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for full details.

---

*The best mages don't stop attacks. They make attacks impossible to imagine.*
