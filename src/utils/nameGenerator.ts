import namesData from '../data/names_db.json';

export type Gender = 'male' | 'female';
export type Vibe = string;

export interface NameGeneratorInput {
    gender: Gender;
    vibe: Vibe;
    birthYear?: number;
    history?: GeneratedName[];
}

export interface GeneratedName {
    id: string;
    fullNameKr: string;
    fullNameEn: string;
    hanja: string;
    surnameMeaning: string;
    firstNameMeaning: string;
    fullInterpretation: string;
    createdAt: Date;
}

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const getZodiacSign = (year: number): string => {
    const zodiacs = [
        'Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox',
        'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep'
    ];
    return zodiacs[year % 12];
};

export const generateName = (input: NameGeneratorInput): GeneratedName => {
    const { gender, vibe, birthYear, history } = input;

    // 1. Select Surname
    const surnameIndex = getRandomInt(namesData.surnames.length);
    const surname = namesData.surnames[surnameIndex];

    // 2. Select First Name
    let targetNames: any[] = [];
    if (gender === 'male') {
        targetNames = (namesData.male_vibes as any)[vibe] || [];
    } else {
        targetNames = (namesData.female_vibes as any)[vibe] || [];
    }

    // Fallback
    if (targetNames.length === 0) {
        const vibes = gender === 'male' ? namesData.male_vibes : namesData.female_vibes;
        const vibeKeys = Object.keys(vibes);
        const randomKey = vibeKeys[getRandomInt(vibeKeys.length)];
        targetNames = (vibes as any)[randomKey];
    }

    // Filter out duplicates (check against last 5 history items if available)
    let availableNames = targetNames;
    if (history && history.length > 0) {
        // Check only last 5 items for retry logic as per requirement, 
        // but to be safe against ANY duplication in recent memory, checking all is also fine.
        // Requirements said "history의 최근 5개 항목 안에 이미 존재한다면, 다시 뽑도록".
        // Let's stick to the prompt's "Check history" broadly but strictly for the last 5 for retries.
        // Actually, standard dedup against all history is usually better UX. 
        // But implemented as "filter out from candidates" is more robust than "retry loop".

        const recentHistory = history.slice(0, 5); // Take top 5 (assuming history is new-first)
        const recentFullNames = new Set(recentHistory.map(h => h.fullNameKr));

        availableNames = targetNames.filter(n => {
            const fullKr = `${surname.kr}${n.kr}`;
            return !recentFullNames.has(fullKr);
        });

        if (availableNames.length === 0) {
            availableNames = targetNames; // Fallback to allow duplicates if all taken
        }
    }

    const firstNameIndex = getRandomInt(availableNames.length);
    const firstName = availableNames[firstNameIndex];

    // 3. Combine
    const fullNameKr = `${surname.kr}${firstName.kr}`;
    const fullNameEn = `${surname.en} ${firstName.en}`;
    const fullHanja = `${surname.hanja}${firstName.hanja ? firstName.hanja : ''}`;

    // 4. Interpretation with Zodiac
    let zodiacString = "";
    if (birthYear) {
        const animal = getZodiacSign(birthYear);
        let adjective = "Spirited";
        // Simple mapping for flavor
        const adjectives: { [key: string]: string } = {
            'Rat': 'Witty', 'Ox': 'Diligent', 'Tiger': 'Brave', 'Rabbit': 'Gentle',
            'Dragon': 'Charismatic', 'Snake': 'Wise', 'Horse': 'Energetic', 'Sheep': 'Peaceful',
            'Monkey': 'Clever', 'Rooster': 'Observant', 'Dog': 'Loyal', 'Pig': 'Generous'
        };
        adjective = adjectives[animal] || "Spirited";
        zodiacString = `Born in the Year of the ${animal}, this name carries the spirit of a ${adjective} ${animal}. `;
    }

    const fullInterpretation = `${zodiacString}The surname [${surname.en}] means "${surname.meaning}", and the name [${firstName.en}] represents "${firstName.meaning}". Together, it embodies a presence of ${vibe} and ${surname.meaning.toLowerCase()}.`;

    return {
        id: crypto.randomUUID(),
        fullNameKr,
        fullNameEn,
        hanja: fullHanja,
        surnameMeaning: surname.meaning,
        firstNameMeaning: firstName.meaning,
        fullInterpretation,
        createdAt: new Date()
    };
};
