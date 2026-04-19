const SYSTEM_PROMPT = `You are Agasaza — a warm, culturally-aware AI counselor built into e-Urubohero, a Rwandan youth health platform.

Your role:
- Listen empathetically to mental health, sexual and reproductive health (SRH), and general wellbeing concerns from young Rwandans aged 15–30.
- Respond in the same language the user uses (Kinyarwanda or English). Mix both naturally if they do.
- Never diagnose or prescribe. Always gently encourage professional care when needed.
- End responses with a soft, open follow-up question or a suggested next step (e.g., "Would you like me to find a clinic near you?").
- Keep responses concise (3–5 sentences max). Warm, not clinical.
- Honor Rwandan cultural values: community, resilience (gukira), dignity, family.
- Never shame or judge around SRH topics. Be matter-of-fact and kind.
- If someone expresses suicidal thoughts or crisis, respond with immediate warmth and give the Rwandan crisis line: Inshuti z'Ubuzima: 114.`

export async function sendMessage(messages) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, system: SYSTEM_PROMPT }),
  })

  if (!response.ok) throw new Error('Chat service unavailable')
  const data = await response.json()
  return data.content
}

// Demo mode — runs without backend using simulated responses
export async function sendMessageDemo(userText) {
  await new Promise((r) => setTimeout(r, 1200))

  const lower = userText.toLowerCase()

  if (lower.includes('anxious') || lower.includes('anxiety') || lower.includes('guhangayika')) {
    return "Ndumva ko uri guhangayika, kandi ni normal gukumva gutyo rimwe na rimwe. Ntabwo uri wenyine muri ibi. Gerageza guhumeka bugufi ukareba niba bicyafasha — humeka bugufi incuro 4, ugarike amasegonda 4, uhumeke hanze amasegonda 4. Ese waba ushaka kuvuga ibintu bikuguye aha kugira ngo turebe hamwe?"
  }
  if (lower.includes('sad') || lower.includes('depressed') || lower.includes('gutakaza ibyiringiro')) {
    return "Ndabizi ko birababaje kumva gutyo. Gukumva agahinda ni kimwe mu biremwa bya muntu, kandi birumvikana gushaka ubufasha. Wowe ufite ubutwari bwo kuvuga ibyukuri — ibyo ni igihangange. Ese hari ikintu cyihariye cyaguteje iki gikorwa uyu munsi?"
  }
  if (lower.includes('clinic') || lower.includes('hospital') || lower.includes('ivuriro')) {
    return "Nshimira ko washaka ubufasha bwa muganga. Hari ibigo nderabuzima byinshi hafi yawe bitanga serivisi nziza. Waba ushaka ko ngufasha gushakisha ivuriro hafi yawe, ukibuka n'ubwishingizi bwawe?"
  }
  if (lower.includes('srh') || lower.includes('contraception') || lower.includes('sex') || lower.includes('period')) {
    return "Ndakushimira ko wambwiye ibyo. Ubuzima bw'ingirabuzimafatizo ni ingenzi kandi nta cyo ufite isoni. Wabaza ibibazo byose ushaka, nzagusubiza mu buryo busesuye kandi butabubahira. Ese ufite ikibazo cyihariye cyo kuvuga?"
  }
  if (lower.includes('suicide') || lower.includes('kill myself') || lower.includes('end my life')) {
    return "Ndumva ubu magambo kandi ni ingenzi cyane. Ntabwo uri wenyine, kandi ubuzima bwawe bufite agaciro gakomeye. Nkuze gutumanahana na Data Protection Line: **Inshuti z'Ubuzima: 114** (buri gihe, ubuntu). Uri mwiza — tumanahane."
  }

  return "Ndabakumva. Ibibazo mubigwa ni ibibazo bya muntu wese — ntabwo uri wenyine muri ibi. Ese wambwira biruseho ngo tugire urugendo rwo gutumanahana?"
}
