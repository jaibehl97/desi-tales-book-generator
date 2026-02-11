export const sampleBook = {
    title: "Ayaan's First Diwali in London",
    subtitle: "A Desi Tales Original",
    lifeStage: "newParent" as const,
    characters: [
        { name: "Ayaan", role: "Our little star", avatar: "👶" },
        { name: "Dadi", role: "The storyteller", avatar: "👵" },
        { name: "Pooja", role: "Mama bear", avatar: "👩" },
        { name: "Rahul", role: "Papa bear", avatar: "👨" },
    ],
    chapters: [
        {
            number: 1,
            title: "The Morning of Lights",
            summary: "The family prepares for baby Ayaan's very first Diwali celebration in their London flat.",
            content: `The London fog hung low over Brick Lane, but inside flat 4B, a warmth that had nothing to do with central heating filled every corner. Marigold garlands — shipped express from Chandni Chowk by Dadi herself — draped the doorway in cascades of orange and gold.

"Ayaan beta, today is your first Diwali," Dadi whispered, lifting the baby from his crib. At five months old, Ayaan responded to everything with the same wide-eyed wonder, but Dadi was certain he understood.

Pooja had been up since dawn, her kitchen transformed into a miniature halwai shop. The countertop was dusted in besan flour, and the air was thick with the caramelized sweetness of fresh gulab jamun sizzling in ghee. Beside the stove, a tray of precisely round ladoos waited — each one a golden planet in her own expanding universe.

Rahul appeared in the doorway, holding his phone. "My mum wants a video of everything. She says the rangoli better be symmetrical this year."

"Tell your mother," Pooja said without looking up, "that my rangoli has always been symmetrical. It's her son's opinions that are crooked."

Dadi laughed — a sound like temple bells in a courtyard.`,
            imageNotes: "Warm kitchen scene, marigolds on doorway, baby in grandmother's arms, London skyline through window"
        },
        {
            number: 2,
            title: "The Silk Kurta",
            summary: "Dadi dresses Ayaan in a tiny silk kurta that carries three generations of tradition.",
            content: `The kurta was the color of a Jaipur sunset — burnt orange with delicate gold threadwork along the collar. It had arrived three weeks ago in a box wrapped in old newspaper from The Times of India, alongside a handwritten note in Dadi's precise Devanagari script.

"This fabric is from the same shop in Chandni Chowk where I bought your father's first kurta," Dadi told Pooja as she carefully unfolded the silk. "The same family has been weaving there since before Partition."

Ayaan, for his part, tried to eat the collar.

Dadi held him up to the mirror — grandmother and grandson reflected together. Ayaan in miniature finery, Dadi in her best salwar kameez, the peacock blue one with silver border that she wore for every occasion she deemed genuinely important.

"Look," she said, pointing at their reflection. "This is who you are, beta. Half of you is these streets of London, and half of you is the streets of Chandni Chowk. And both halves are magnificent."

Ayaan gurgled approvingly.

Pooja watched from the doorway, phone forgotten in her hand, a lump forming in her throat that she would later blame on the onions she'd been chopping.`,
            imageNotes: "Grandmother dressing baby in traditional silk kurta, warm golden tones, mirror reflection, emotional moment"
        },
        {
            number: 3,
            title: "A Sky Full of Diyas",
            summary: "As night falls, the family lights diyas together, and Ayaan sees his first Diwali lights.",
            content: `Evening came the way it does in London in November: suddenly, completely, like someone turning off a switch. But inside flat 4B, an opposite magic was happening — the lights were being turned on.

Rahul had lined the windowsills with clay diyas, each one filled with mustard oil and a cotton wick. Pooja arranged her electric fairy lights (the diya-shaped ones from Amazon, a compromise between tradition and the smoke alarm). And Dadi, with the ceremony of someone performing a sacred act, lit the first diya with a long matchstick.

Then she placed Ayaan on Rahul's lap, took the baby's tiny hand in hers, and together they lit the second diya.

What happened next would be replayed on the family WhatsApp group approximately 847 times: Ayaan saw the flame.

His eyes — already cartoonishly large — grew wider. The golden light danced in his pupils like two tiny suns being born. His mouth formed a perfect 'O'. And then he laughed. Not a polite chuckle, but a full-body, belly-deep laugh that shook his tiny silk kurta and rattled the bells on his anklet.

"He sees it," Dadi said, her voice catching. "He sees the light."

Outside, across London, fireworks had begun to bloom in the November sky — not for Diwali, most of them, but for Guy Fawkes Night a few days delayed. But in flat 4B, the family chose to believe every single spark was for them.

Pooja finally let the tears come. "It's the onions," she said.

Nobody corrected her.`,
            imageNotes: "Family gathered around diyas, baby's face lit by golden candlelight, London night through window with distant fireworks, warm intimate moment"
        },
    ],
    metadata: {
        tone: "whimsical",
        imageStyle: "illustrated",
        region: "Punjab",
        pageCount: 48,
        generatedAt: "2025-11-14T10:30:00Z"
    }
};

export const lifeStages = [
    {
        id: 'newParent' as const,
        title: 'The New Parent',
        tagline: "My First Desi Adventure",
        description: "Transform your baby's milestones into a magical storybook celebrating their cultural heritage.",
        emoji: '👶',
        color: '#E8932A',
        bgGradient: 'linear-gradient(135deg, #FFF5E6, #FFE8CC)',
    },
    {
        id: 'couple' as const,
        title: 'The Couple',
        tagline: "Our Big Fat Diaspora Wedding",
        description: "Turn your love story into a stunning keepsake — from biodata to baraat to forever after.",
        emoji: '💕',
        color: '#A6306B',
        bgGradient: 'linear-gradient(135deg, #FFF0F5, #FFE0EE)',
    },
    {
        id: 'founder' as const,
        title: 'The Founder',
        tagline: "The Immigrant Hustle",
        description: "Your entrepreneurial journey as a premium coffee-table book. The perfect corporate gift.",
        emoji: '🚀',
        color: '#2A8F8F',
        bgGradient: 'linear-gradient(135deg, #E6F7F7, #CCF0F0)',
    },
    {
        id: 'elder' as const,
        title: 'The Elder',
        tagline: "Dadi's Kitchen & Life",
        description: "Preserve the stories of a generation before they fade. Recipes, wisdom, and a lifetime of love.",
        emoji: '📖',
        color: '#C45E3E',
        bgGradient: 'linear-gradient(135deg, #FFF0EB, #FFE0D5)',
    },
];

export const howItWorks = [
    {
        step: 1,
        title: "Share Your Memories",
        description: "Tell us about the moments, people, and traditions that matter most to your family.",
        icon: "✨",
    },
    {
        step: 2,
        title: "AI Crafts Your Story",
        description: "Seven specialist AI agents collaborate to weave your memories into a cohesive, beautiful narrative.",
        icon: "🤖",
    },
    {
        step: 3,
        title: "Receive Your Heirloom",
        description: "A museum-quality book arrives at your door — a legacy your family will treasure for generations.",
        icon: "📚",
    },
];

export const testimonials = [
    {
        name: "Priya & Arjun",
        location: "San Francisco, CA",
        text: "We gave this to our parents for their 40th anniversary. My mom couldn't stop crying. It captured every story she'd ever told us, woven together like a tapestry.",
        avatar: "👨‍👩‍👧‍👦",
        product: "Dadi's Kitchen & Life",
    },
    {
        name: "Neha M.",
        location: "London, UK",
        text: "My daughter's 'First Diwali' book is now her favourite bedtime story. She points at the illustrations of her dadi and says 'Nani!' — and yes, I cry every time.",
        avatar: "👩‍👧",
        product: "My First Desi Adventure",
    },
    {
        name: "Raj & Simran",
        location: "Toronto, CA",
        text: "We turned our entire wedding journey into a book — from the awkward biodata exchange to the sangeet dance-off. Our guests couldn't believe it was AI-generated.",
        avatar: "💑",
        product: "Our Big Fat Diaspora Wedding",
    },
];

export const formats = [
    {
        id: "hardcover",
        name: "Heritage Hardcover",
        description: "Linen-bound with foil-stamped cover, acid-free archival paper, lay-flat binding",
        price: 89,
        icon: "📕",
        popular: true,
    },
    {
        id: "softcover",
        name: "Classic Softcover",
        description: "Premium matte cover, thick uncoated paper, perfect binding",
        price: 49,
        icon: "📓",
        popular: false,
    },
    {
        id: "digital",
        name: "Digital Heirloom",
        description: "Interactive PDF with animations, shareable link, printable at any time",
        price: 29,
        icon: "💻",
        popular: false,
    },
];

export const agentSteps = [
    { id: 'plan', name: 'Story Planner', description: 'Creating narrative arc...', icon: '📋', duration: 3000 },
    { id: 'chapter1', name: 'Chapter Writer', description: 'Writing Chapter 1...', icon: '✍️', duration: 4000 },
    { id: 'chapter2', name: 'Chapter Writer', description: 'Writing Chapter 2...', icon: '✍️', duration: 4000 },
    { id: 'chapter3', name: 'Chapter Writer', description: 'Writing Chapter 3...', icon: '✍️', duration: 4000 },
    { id: 'coherence', name: 'Coherence Auditor', description: 'Checking continuity...', icon: '🔍', duration: 2500 },
    { id: 'visuals', name: 'Visual Director', description: 'Designing illustrations...', icon: '🎨', duration: 3500 },
    { id: 'cultural', name: 'Cultural Custodian', description: 'Validating authenticity...', icon: '🪷', duration: 2500 },
    { id: 'polish', name: 'Chief Editor', description: 'Final editorial polish...', icon: '✨', duration: 3000 },
];
